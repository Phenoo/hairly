import type { Metadata } from "next";
import "./globals.css";
import { StorefrontProvider } from "@/lib/storefront-context";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agloryhairandcosmetics.co.uk"),
  title: "Aglory Hair and Cosmetics — Beauty, made brilliantly personal.",
  description:
    "Discover expertly curated hair, skin and beauty essentials for every texture, tone and ritual.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Aglory Hair and Cosmetics",
    url: "https://www.agloryhairandcosmetics.co.uk",
    telephone: "+44 1322 333305",
    email: "info@agloryhairandcosmetics.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 Cross Street",
      addressLocality: "Erith",
      addressRegion: "Kent",
      postalCode: "DA8 1RB",
      addressCountry: "GB",
    },
    openingHours: ["Mo-Sa 09:00-19:00", "Su 11:00-16:00"],
  };
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <StorefrontProvider>
          <SiteChrome>{children}</SiteChrome>
        </StorefrontProvider>
      </body>
    </html>
  );
}
