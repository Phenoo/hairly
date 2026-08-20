import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { StorefrontProvider } from "@/lib/storefront-context";
import { SiteChrome } from "@/components/site-chrome";
import { CookieConsent } from "@/components/cookie-consent";
import { getCatalogProducts } from "@/lib/catalog";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const isLiveDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.DEPLOYMENT_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agloryhairandcosmetics.co.uk"),
  title: "Aglory Hair & Cosmetics — Hair care for every texture",
  description:
    "Shop hair care, wigs and extensions, skincare, cosmetics and grooming products from Aglory in Erith.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Aglory Hair & Cosmetics",
    title: "Aglory Hair & Cosmetics — Hair care for every texture",
    description: "Hair, beauty and grooming essentials with expert help from the Aglory store team in Erith.",
    images: [{ url: "/aglory-social-card.png", width: 1200, height: 630, alt: "Aglory Hair & Cosmetics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aglory Hair & Cosmetics",
    description: "Hair care for every texture.",
    images: ["/aglory-social-card.png"],
  },
  robots: { index: isLiveDeployment, follow: isLiveDeployment },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const catalog = await getCatalogProducts({ first: 8 });
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
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
    <html lang="en" className={`${playfair.variable} h-full antialiased`} data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <StorefrontProvider catalog={catalog}>
          <SiteChrome><div id="main-content">{children}</div></SiteChrome>
          <CookieConsent />
        </StorefrontProvider>
      </body>
    </html>
  );
}
