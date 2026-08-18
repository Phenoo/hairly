import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { StorefrontProvider } from "@/lib/storefront-context";
import { SiteChrome } from "@/components/site-chrome";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agloryhairandcosmetics.co.uk"),
  title: "A-Glory Hair & Cosmetics — Hair care for every texture",
  description:
    "Shop hair care, wigs and extensions, skincare, cosmetics and grooming products from A-Glory in Erith.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "A-Glory Hair & Cosmetics",
    title: "A-Glory Hair & Cosmetics — Hair care for every texture",
    description: "Hair, beauty and grooming essentials with expert help from the A-Glory store team in Erith.",
    images: [{ url: "/aglory-social-card.png", width: 1200, height: 630, alt: "A-Glory Hair & Cosmetics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A-Glory Hair & Cosmetics",
    description: "Hair care for every texture.",
    images: ["/aglory-social-card.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "A-Glory Hair and Cosmetics",
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
