"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./store-data";

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
      const savedCart = window.localStorage.getItem("aglory-cart");
      const savedWishlist = window.localStorage.getItem("aglory-wishlist");
      // Restore the browser-only bag after hydration so the server and client render the same shell.
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // Start with an empty bag if saved data cannot be read.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("aglory-cart", JSON.stringify(cart));
    window.localStorage.setItem("aglory-wishlist", JSON.stringify(wishlist));
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
