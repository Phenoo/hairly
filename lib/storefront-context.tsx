"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./store-data";
import { products } from "./store-data";

export type CartLine = { product: Product; quantity: number; option?: string };

type StorefrontContextValue = {
  cart: CartLine[];
  wishlist: Product[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, option?: string, quantity?: number) => void;
  removeFromCart: (productId: string, option?: string) => void;
  changeQuantity: (productId: string, delta: number, option?: string) => void;
  toggleWishlist: (product: Product) => void;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);
const CART_STORAGE_KEY = "aglory-cart:v2";
const WISHLIST_STORAGE_KEY = "aglory-wishlist:v2";

type StoredCartLine = { productId: string; quantity: number; option?: string };

export function StorefrontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const savedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      // Restore the browser-only bag after hydration so the server and client render the same shell.
      if (savedCart) {
        const storedLines = JSON.parse(savedCart) as StoredCartLine[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(
          storedLines.flatMap((line) => {
            const product = products.find((item) => item.id === line.productId);
            return product ? [{ product, quantity: line.quantity, option: line.option }] : [];
          }),
        );
      }
      if (savedWishlist) {
        const productIds = JSON.parse(savedWishlist) as string[];
        setWishlist(products.filter((product) => productIds.includes(product.id)));
      }
    } catch {
      // Start with an empty bag if saved data cannot be read.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const storedCart: StoredCartLine[] = cart.map((line) => ({
        productId: line.product.id,
        quantity: line.quantity,
        option: line.option,
      }));
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.map((product) => product.id)));
    } catch {
      // Shopping still works for the current visit if browser storage is unavailable.
    }
  }, [cart, wishlist, hydrated]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      cartTotal: cart.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0,
      ),
      addToCart: (product: Product, option?: string, quantity = 1) =>
        setCart((current) => {
          if (product.inventory <= 0) return current;
          const requestedQuantity = Math.max(1, Math.min(quantity, product.inventory));
          const existing = current.find(
            (line) => line.product.id === product.id && line.option === option,
          );
          return existing
            ? current.map((line) =>
                line === existing
                  ? { ...line, quantity: Math.min(product.inventory, line.quantity + requestedQuantity) }
                  : line,
              )
            : [...current, { product, quantity: requestedQuantity, option }];
        }),
      removeFromCart: (productId: string, option?: string) =>
        setCart((current) =>
          current.filter(
            (line) =>
              !(line.product.id === productId && line.option === option),
          ),
        ),
      changeQuantity: (productId: string, delta: number, option?: string) =>
        setCart((current) =>
          current.map((line) =>
            line.product.id === productId && line.option === option
              ? { ...line, quantity: Math.min(line.product.inventory, Math.max(1, line.quantity + delta)) }
              : line,
          ),
        ),
      toggleWishlist: (product: Product) =>
        setWishlist((current) =>
          current.some((item) => item.id === product.id)
            ? current.filter((item) => item.id !== product.id)
            : [...current, product],
        ),
    }),
    [cart, wishlist],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context)
    throw new Error("useStorefront must be used inside StorefrontProvider");
  return context;
}
