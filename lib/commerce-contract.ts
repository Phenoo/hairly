import type { Product } from "./store-data";

/** Keeps product and cart code separate from the service used to power it. */
export type CommerceCatalog = {
  listProducts: (input?: {
    collection?: string;
    query?: string;
    category?: string;
  }) => Promise<Product[]>;
  getProductByHandle: (handle: string) => Promise<Product | undefined>;
};

export type CommerceCart = {
  addLine: (input: {
    merchandiseId: string;
    quantity: number;
  }) => Promise<void>;
  updateLine: (input: { lineId: string; quantity: number }) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};
