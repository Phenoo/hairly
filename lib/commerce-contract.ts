import type { Product } from "./store-data";

/**
 * The UI depends on this small commerce contract rather than directly on a
 * vendor SDK. The current demo uses the local catalogue; a Shopify adapter
 * can implement these functions with Storefront API queries and mutations.
 */
export type CommerceCatalog = {
  listProducts: (input?: { collection?: string; query?: string; category?: string }) => Promise<Product[]>;
  getProductByHandle: (handle: string) => Promise<Product | undefined>;
};

export type CommerceCart = {
  addLine: (input: { merchandiseId: string; quantity: number }) => Promise<void>;
  updateLine: (input: { lineId: string; quantity: number }) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};
