import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aglory Hair & Cosmetics — Beauty, made brilliantly personal.",
  description: "Discover expertly curated hair, skin and beauty essentials for every texture, tone and ritual.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
