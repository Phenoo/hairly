import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // `NODE_ENV` is "production" for preview builds too. Set DEPLOYMENT_ENV to
  // production only on the live site when the host does not provide VERCEL_ENV.
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.DEPLOYMENT_ENV === "production";
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/account", "/login", "/signup", "/wishlist", "/search", "/track-order"] }],
    sitemap: "https://www.agloryhairandcosmetics.co.uk/sitemap.xml",
  };
}
