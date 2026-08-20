import type { MetadataRoute } from "next";
import { getShopifySitemapEntries } from "@/lib/shopify";
import { blogPosts, categories } from "@/lib/store-data";

const site = "https://www.agloryhairandcosmetics.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/shop", "/about", "/contact", "/faq", "/brands", "/blog", "/policies/privacy", "/policies/terms", "/policies/delivery-returns"].map((path) => ({ url: `${site}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 }));
  const products = await getShopifySitemapEntries();
  return [
    ...staticPages,
    ...categories.map((category) => ({ url: `${site}/category/${category.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${site}/blog/${post.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...products.map((product) => ({ url: `${site}/products/${product.handle}`, lastModified: new Date(product.updatedAt), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
