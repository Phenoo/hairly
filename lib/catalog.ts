import { products as fallbackProducts } from "./store-data";
import type { CatalogPage } from "./shopify-types";
import { getShopifyCollectionProducts, getShopifyProduct, getShopifyProducts, isShopifyConfigured } from "./shopify";

function allowLocalFallback() {
  return process.env.NODE_ENV !== "production" && !isShopifyConfigured();
}

function requireShopify() {
  if (!isShopifyConfigured() && !allowLocalFallback()) throw new Error("Shopify storefront credentials are not configured.");
}

export async function getCatalogPage(input: { first?: number; after?: string | null; query?: string; sortKey?: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE" | "TITLE" | "UPDATED_AT"; reverse?: boolean } = {}): Promise<CatalogPage> {
  requireShopify();
  if (allowLocalFallback()) return { products: fallbackProducts.slice(0, input.first || 24), pageInfo: { hasNextPage: false, endCursor: null } };
  return getShopifyProducts(input);
}

export async function getCatalogProducts(input: { first?: number; after?: string | null; query?: string; sortKey?: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE" | "TITLE" | "UPDATED_AT"; reverse?: boolean } = {}) {
  return (await getCatalogPage(input)).products;
}

export async function getCatalogProduct(handle: string) {
  requireShopify();
  if (allowLocalFallback()) return fallbackProducts.find((product) => product.slug === handle);
  return getShopifyProduct(handle);
}

export async function getCatalogCollection(handle: string, fallbackIds: string[] = [], fallbackQuery?: string) {
  requireShopify();
  if (allowLocalFallback()) return { products: fallbackProducts.filter((product) => fallbackIds.includes(product.id)), pageInfo: { hasNextPage: false, endCursor: null } };
  return getShopifyCollectionProducts(handle, undefined, fallbackQuery);
}
