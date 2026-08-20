import { unstable_cache } from "next/cache";
import type { Product, ProductType, ProductVariant } from "./store-data";
import type { CatalogPage, Money, ShopifyCart } from "./shopify-types";

const FALLBACK_DOMAIN = "aglory-hair-and-cosmetics.myshopify.com";
const API_VERSION = "2026-07";

function getConfig() {
  const domain = (process.env.SHOPIFY_STORE_DOMAIN || FALLBACK_DOMAIN)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  return { domain, token };
}

export function isShopifyConfigured() {
  return Boolean(getConfig().token);
}

type ShopifyResponse<T> = { data?: T; errors?: { message: string }[] };

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  const { domain, token } = getConfig();
  if (!token) throw new Error("Shopify Storefront API is not configured.");
  const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = (await response.json()) as ShopifyResponse<T>;
  if (!response.ok || result.errors?.length || !result.data) {
    throw new Error(result.errors?.map((error) => error.message).join("; ") || "Shopify request failed.");
  }
  return result.data;
}

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  sku: string | null;
  selectedOptions: { name: string; value: string }[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: { url: string; altText: string | null } | null;
};
type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  options: { name: string; values: string[] }[];
  variants: { nodes: ShopifyVariant[] };
};

const PRODUCT_FIELDS = `
  id handle title description productType vendor tags
  featuredImage { url altText }
  options { name values }
  variants(first: 250) {
    nodes {
      id title availableForSale sku selectedOptions { name value }
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      image { url altText }
    }
  }
`;

function productType(value: string, tags: string[] = []): ProductType {
  const normalized = `${value} ${tags.join(" ")}`.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  if (/(^|\s)men(?:s)?(?:\s|$)/.test(normalized)) return "Men";
  if (/(make\s*up|makeup|cosmetic|foundation|lip|eye|mascara|lash|face care)/.test(normalized)) return "Makeup";
  if (/(wig|extension|braid|weave|crochet|pony|hair attachment)/.test(normalized)) return "Wigs";
  if (/(tool|accessor|electrical)/.test(normalized)) return "Tools";
  if (/(skin|body|bath|health|beauty|face|soap|lotion|serum)/.test(normalized)) return "Skin";
  return "Hair";
}

function categoryName(type: ProductType) {
  return type === "Wigs"
    ? "Wigs & extensions"
    : type === "Skin"
      ? "Skin & body"
      : type === "Makeup"
        ? "Makeup"
        : type === "Tools"
          ? "Tools"
          : type === "Men"
            ? "Men’s grooming"
            : "Hair care";
}

function mapMoney(money: ShopifyMoney): Money {
  return { amount: Number(money.amount), currencyCode: money.currencyCode };
}

function mapVariant(variant: ShopifyVariant): ProductVariant {
  return {
    id: variant.id,
    title: variant.title,
    availableForSale: variant.availableForSale,
    price: Number(variant.price.amount),
    compareAt: variant.compareAtPrice ? Number(variant.compareAtPrice.amount) : undefined,
    selectedOptions: variant.selectedOptions,
    image: variant.image?.url,
  };
}

export function mapShopifyProduct(item: ShopifyProduct): Product {
  const variants = item.variants.nodes.map(mapVariant);
  const defaultVariant = variants.find((variant) => variant.availableForSale) || variants[0];
  const hasOptions = item.options.some((option) => !(option.name === "Title" && option.values.length === 1));
  const type = productType(item.productType, item.tags);
  const category = categoryName(type);
  return {
    id: item.id,
    slug: item.handle,
    brand: item.vendor || "Aglory",
    name: item.title,
    price: defaultVariant?.price || 0,
    compareAt: defaultVariant?.compareAt,
    currencyCode: item.variants.nodes[0]?.price.currencyCode || "GBP",
    category,
    type,
    image: item.featuredImage?.url || "/unavailable_product.png",
    imageAlt: item.featuredImage?.altText || item.title,
    tag: item.tags.find((tag) => /new|best|sale|popular/i.test(tag)),
    description: item.description || "Discover this Aglory beauty essential.",
    options: hasOptions ? item.options.flatMap((option) => option.values) : undefined,
    optionGroups: hasOptions ? item.options : undefined,
    // Shopify keeps authoritative stock enforcement in Cart mutations and checkout.
    // Storefront API availability is authoritative; it does not expose a
    // reliable sellable quantity for every shop, so never display fake counts.
    inventory: defaultVariant?.availableForSale ? 10 : 0,
    sku: item.variants.nodes[0]?.sku || "—",
    defaultVariantId: defaultVariant?.id,
    variants,
  };
}

type ProductConnection = { nodes: ShopifyProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
type ProductSortKey = "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE" | "TITLE" | "UPDATED_AT";
const PRODUCTS_QUERY = `query Products($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean!) {
  products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
    nodes { ${PRODUCT_FIELDS} }
    pageInfo { hasNextPage endCursor }
  }
}`;

export async function getShopifyProducts({ first = 24, after, query, sortKey, reverse = false }: { first?: number; after?: string | null; query?: string; sortKey?: ProductSortKey; reverse?: boolean } = {}): Promise<CatalogPage> {
  const cacheKey = ["shopify-products", String(first), after || "first", query || "all", sortKey || "RELEVANCE", String(reverse)];
  return unstable_cache(async () => {
    const data = await shopifyFetch<{ products: ProductConnection }>(PRODUCTS_QUERY, { first, after: after || null, query: query || null, sortKey: sortKey || null, reverse });
    return { products: data.products.nodes.map(mapShopifyProduct), pageInfo: data.products.pageInfo };
  }, cacheKey, { revalidate: 300, tags: ["products"] })();
}

export async function getShopifyProduct(handle: string) {
  return unstable_cache(async () => {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
      `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
      { handle },
    );
    return data.product ? mapShopifyProduct(data.product) : undefined;
  }, ["shopify-product", handle], { revalidate: 300, tags: ["products", `product:${handle}`] })();
}

export async function getShopifyCollectionProducts(handle: string, after?: string | null, fallbackQuery?: string): Promise<CatalogPage> {
  return unstable_cache(async () => {
    const data = await shopifyFetch<{ collection: { products: ProductConnection } | null }>(
      `query Collection($handle: String!, $after: String) {
        collection(handle: $handle) { products(first: 24, after: $after) { nodes { ${PRODUCT_FIELDS} } pageInfo { hasNextPage endCursor } } }
      }`,
      { handle, after: after || null },
    );
    const products = data.collection?.products;
    if (products && (products.nodes.length > 0 || !fallbackQuery)) {
      return { products: products.nodes.map(mapShopifyProduct), pageInfo: products.pageInfo };
    }
    if (!fallbackQuery) return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
    const fallback = await shopifyFetch<{ products: ProductConnection }>(PRODUCTS_QUERY, { first: 24, after: after || null, query: fallbackQuery, sortKey: null, reverse: false });
    return { products: fallback.products.nodes.map(mapShopifyProduct), pageInfo: fallback.products.pageInfo };
  }, ["shopify-collection", handle, after || "first", fallbackQuery || "none"], { revalidate: 300, tags: ["collections", `collection:${handle}`] })();
}

const CART_FIELDS = `
  id checkoutUrl
  cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
  lines(first: 250) {
    nodes {
      id quantity
      cost { amountPerQuantity { amount currencyCode } compareAtAmountPerQuantity { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id title availableForSale sku selectedOptions { name value }
          price { amount currencyCode } compareAtPrice { amount currencyCode }
          image { url altText }
          product { id handle title description productType vendor tags featuredImage { url altText } options { name values } }
        }
      }
    }
  }
`;

type ShopifyCartResponse = {
  id: string;
  checkoutUrl: string;
  cost: { subtotalAmount: ShopifyMoney; totalAmount: ShopifyMoney };
  lines: { nodes: { id: string; quantity: number; cost: { amountPerQuantity: ShopifyMoney; compareAtAmountPerQuantity: ShopifyMoney | null }; merchandise: ShopifyVariant & { product: Omit<ShopifyProduct, "variants"> } }[] };
};
type CartResponse = { cart: ShopifyCartResponse | null; userErrors: { message: string }[] };

function normalizeCart(cart: ShopifyCartResponse): ShopifyCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    subtotal: mapMoney(cart.cost.subtotalAmount),
    total: mapMoney(cart.cost.totalAmount),
    lines: cart.lines.nodes.map((line) => {
      const product = mapShopifyProduct({ ...line.merchandise.product, variants: { nodes: [line.merchandise] } });
      return {
        id: line.id,
        merchandiseId: line.merchandise.id,
        quantity: line.quantity,
        product,
        variantTitle: line.merchandise.title === "Default Title" ? "" : line.merchandise.title,
        unitPrice: mapMoney(line.cost.amountPerQuantity),
        compareAtPrice: line.cost.compareAtAmountPerQuantity ? mapMoney(line.cost.compareAtAmountPerQuantity) : undefined,
      };
    }),
  };
}

function assertCart(response: CartResponse) {
  if (response.userErrors.length || !response.cart) throw new Error(response.userErrors.map((error) => error.message).join("; ") || "Unable to update your bag.");
  return normalizeCart(response.cart);
}

export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartCreate: CartResponse }>(`mutation CartCreate($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } } }`, { input: { lines } });
  return assertCart(data.cartCreate);
}

export async function addShopifyCartLine(cartId: string, merchandiseId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesAdd: CartResponse }>(`mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lines: [{ merchandiseId, quantity }] });
  return assertCart(data.cartLinesAdd);
}

export async function addShopifyCartLines(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartLinesAdd: CartResponse }>(`mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lines });
  return assertCart(data.cartLinesAdd);
}

export async function getShopifyVariantAvailability(ids: string[]) {
  const data = await shopifyFetch<{ nodes: ({ id: string; availableForSale: boolean } | null)[] }>(`query VariantAvailability($ids: [ID!]!) {
    nodes(ids: $ids) { ... on ProductVariant { id availableForSale } }
  }`, { ids });
  return data.nodes.filter((node): node is { id: string; availableForSale: boolean } => Boolean(node));
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesUpdate: CartResponse }>(`mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lines: [{ id: lineId, quantity }] });
  return assertCart(data.cartLinesUpdate);
}

export async function removeShopifyCartLine(cartId: string, lineId: string) {
  const data = await shopifyFetch<{ cartLinesRemove: CartResponse }>(`mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`, { cartId, lineIds: [lineId] });
  return assertCart(data.cartLinesRemove);
}

export async function getShopifyCart(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCartResponse | null }>(`query Cart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: cartId });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function getShopifySitemapEntries() {
  return unstable_cache(async () => {
    const entries: { handle: string; updatedAt: string }[] = [];
    let after: string | null = null;
    let hasNextPage = true;
    while (hasNextPage) {
      type SitemapResponse = { products: { nodes: { handle: string; updatedAt: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } };
      const data: SitemapResponse = await shopifyFetch<SitemapResponse>(
        `query SitemapProducts($after: String) { products(first: 250, after: $after) { nodes { handle updatedAt } pageInfo { hasNextPage endCursor } } }`,
        { after },
      );
      entries.push(...data.products.nodes);
      hasNextPage = data.products.pageInfo.hasNextPage;
      after = data.products.pageInfo.endCursor;
    }
    return entries;
  }, ["shopify-sitemap-products"], { revalidate: 3600, tags: ["products"] })();
}
