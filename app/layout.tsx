import type { Metadata } from "next";
import "./globals.css";
import { StorefrontProvider } from "@/lib/storefront-context";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
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
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StorefrontProvider>
          <SiteChrome>{children}</SiteChrome>
        </StorefrontProvider>
      </body>
    </html>
  );
}
