"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "./store-data";
import type { ShopifyCart, ShopifyCartLine } from "./shopify-types";
import { trackCommerceEvent } from "./analytics";

export type CartLine = ShopifyCartLine;

type StorefrontContextValue = {
  catalog: Product[];
  cart: CartLine[];
  wishlist: Product[];
  cartCount: number;
  cartId?: string;
  cartTotal: number;
  cartCurrency: string;
  checkoutUrl?: string;
  cartError?: string;
  isCartUpdating: boolean;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variantId?: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  changeQuantity: (lineId: string, quantity: number) => Promise<void>;
  beginCheckout: () => Promise<string | undefined>;
  adoptCart: (cart: ShopifyCart) => void;
  toggleWishlist: (product: Product) => void;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);
const CART_STORAGE_KEY = "aglory-cart:v4";
const WISHLIST_STORAGE_KEY = "aglory-wishlist:v2";
type StoredCart = { cartId?: string; lines: { merchandiseId: string; quantity: number }[] };

async function cartRequest(path: string, init?: RequestInit) {
  const response = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...init?.headers }, cache: "no-store" });
  const body = await response.json() as { cart?: ShopifyCart; error?: string };
  if (!response.ok || !body.cart) throw new Error(body.error || "Your bag could not be updated.");
  return body.cart;
}

export function StorefrontProvider({ children, catalog }: { children: React.ReactNode; catalog: Product[] }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cartId, setCartId] = useState<string>();
  const [checkoutUrl, setCheckoutUrl] = useState<string>();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCurrency, setCartCurrency] = useState("GBP");
  const [hydrated, setHydrated] = useState(false);
  const [cartError, setCartError] = useState<string>();
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartIdRef = useRef<string | undefined>(undefined);
  const cartRef = useRef<CartLine[]>([]);
  const queueRef = useRef<Promise<void>>(Promise.resolve());

  const applyCart = useCallback((nextCart: ShopifyCart) => {
    cartIdRef.current = nextCart.id;
    cartRef.current = nextCart.lines;
    setCartId(nextCart.id);
    setCheckoutUrl(nextCart.checkoutUrl);
    setCart(nextCart.lines);
    setCartTotal(nextCart.subtotal.amount);
    setCartCurrency(nextCart.subtotal.currencyCode);
  }, []);

  const enqueueMutation = useCallback(async (operation: () => Promise<ShopifyCart>) => {
    const task = queueRef.current.catch(() => undefined).then(async () => {
      setCartError(undefined);
      setIsCartUpdating(true);
      try {
        applyCart(await operation());
      } catch (error) {
        const message = error instanceof Error ? error.message : "Your bag could not be updated.";
        setCartError(message);
        throw error;
      } finally {
        setIsCartUpdating(false);
      }
    });
    queueRef.current = task;
    return task;
  }, [applyCart]);

  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "null") as StoredCart | null;
        const wishlistIds = JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]") as string[];
        if (!cancelled) setWishlist(catalog.filter((product) => wishlistIds.includes(product.id)));
        if (!saved?.cartId) return;
        try {
          const currentCart = await cartRequest(`/api/cart?id=${encodeURIComponent(saved.cartId)}`);
          if (!cancelled) applyCart(currentCart);
        } catch {
          const validLines = saved.lines.filter((line) => line.merchandiseId.startsWith("gid://shopify/ProductVariant/") && line.quantity > 0);
          if (validLines.length) {
            try {
              const recovered = await cartRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "create", lines: validLines }) });
              if (!cancelled) applyCart(recovered);
            } catch {
              if (!cancelled) setCartError("Your previous bag could not be restored. Please add the items again.");
            }
          }
        }
      } catch {
        if (!cancelled) setCartError("Your bag could not be restored on this device.");
      } finally {
        if (!cancelled) setHydrated(true);
      }
    };
    void restore();
    return () => { cancelled = true; };
  }, [applyCart, catalog]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ cartId, lines: cart.map((line) => ({ merchandiseId: line.merchandiseId, quantity: line.quantity })) }));
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.map((product) => product.id)));
    } catch {
      // A Shopify cart remains available for this session when storage is disabled.
    }
  }, [cart, cartId, hydrated, wishlist]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<StorefrontContextValue>(() => ({
    catalog, cart, wishlist,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0), cartId,
    cartTotal, cartCurrency, checkoutUrl, cartError, isCartUpdating,
    isCartOpen, setIsCartOpen, openCart, closeCart,
    addToCart: async (product, variantId, quantity = 1) => {
      const variant = product.variants?.find((item) => item.id === variantId) || (!product.optionGroups?.length ? product.variants?.find((item) => item.id === product.defaultVariantId) : undefined);
      if (!variant) throw new Error("Please select all product options before adding this item.");
      if (!variant.availableForSale) throw new Error("This option is currently sold out.");
      const requestedQuantity = Math.min(Math.max(1, quantity), 99);
      await enqueueMutation(() => {
        const currentId = cartIdRef.current;
        return currentId
          ? cartRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "add", cartId: currentId, merchandiseId: variant.id, quantity: requestedQuantity }) })
          : cartRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "create", lines: [{ merchandiseId: variant.id, quantity: requestedQuantity }] }) });
      });
      trackCommerceEvent("add_to_cart", {
        currency: variant.price ? product.currencyCode || "GBP" : "GBP",
        value: variant.price * requestedQuantity,
        items: [{ item_id: product.id, item_name: product.name, item_variant: variant.title, price: variant.price, quantity: requestedQuantity }],
      });
      setIsCartOpen(true);
    },
    removeFromCart: async (lineId) => {
      const existingLine = cartRef.current.find((line) => line.id === lineId);
      await enqueueMutation(() => {
        const currentId = cartIdRef.current;
        if (!currentId) throw new Error("Your bag is no longer available. Please refresh and try again.");
        return cartRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "remove", cartId: currentId, lineId }) });
      });
      if (existingLine) trackCommerceEvent("remove_from_cart", {
        currency: existingLine.unitPrice.currencyCode,
        value: existingLine.unitPrice.amount * existingLine.quantity,
        items: [{ item_id: existingLine.product.id, item_name: existingLine.product.name, item_variant: existingLine.variantTitle, price: existingLine.unitPrice.amount, quantity: existingLine.quantity }],
      });
    },
    changeQuantity: async (lineId, quantity) => {
      const nextQuantity = Math.min(Math.max(1, quantity), 99);
      await enqueueMutation(() => {
        const currentId = cartIdRef.current;
        if (!currentId) throw new Error("Your bag is no longer available. Please refresh and try again.");
        return cartRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "update", cartId: currentId, lineId, quantity: nextQuantity }) });
      });
    },
    beginCheckout: async () => {
      const currentId = cartIdRef.current;
      if (!currentId) return undefined;
      const currentCart = await cartRequest(`/api/cart?id=${encodeURIComponent(currentId)}`);
      applyCart(currentCart);
      trackCommerceEvent("begin_checkout", {
        currency: currentCart.total.currencyCode,
        value: currentCart.total.amount,
        items: currentCart.lines.map((line) => ({ item_id: line.product.id, item_name: line.product.name, item_variant: line.variantTitle, price: line.unitPrice.amount, quantity: line.quantity })),
      });
      return currentCart.checkoutUrl;
    },
    adoptCart: (nextCart) => {
      applyCart(nextCart);
      setIsCartOpen(true);
    },
    toggleWishlist: (product) => setWishlist((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]),
  }), [applyCart, cart, cartCurrency, cartError, cartId, cartTotal, catalog, checkoutUrl, closeCart, enqueueMutation, isCartOpen, isCartUpdating, openCart, wishlist]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error("useStorefront must be used inside StorefrontProvider");
  return context;
}
