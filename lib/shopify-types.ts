import type { Product } from "./store-data";

export type Money = { amount: number; currencyCode: string };

export type ShopifyCartLine = {
  id: string;
  merchandiseId: string;
  quantity: number;
  product: Product;
  variantTitle: string;
  unitPrice: Money;
  compareAtPrice?: Money;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: ShopifyCartLine[];
  subtotal: Money;
  total: Money;
};

export type CatalogPage = {
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
};
