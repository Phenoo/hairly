"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { ProductCard } from "@/components/product-card";

const STORAGE_KEY = "aglory-recent-views:v1";

export function RecentlyViewedTracker({ currentProduct }: { currentProduct?: Product }) {
  useEffect(() => {
    if (!currentProduct) return;
    try {
      const existing = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || "[]"
      ) as string[];
      const updated = [
        currentProduct.id,
        ...existing.filter((id) => id !== currentProduct.id),
      ].slice(0, 8);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  }, [currentProduct]);

  return null;
}

export function RecentlyViewedSection({ excludeId }: { excludeId?: string }) {
  const { catalog } = useStorefront();
  const [recentItems, setRecentItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const savedIds = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || "[]"
      ) as string[];
      const filteredIds = savedIds.filter((id) => id !== excludeId);
      const items = filteredIds
        .map((id) => catalog.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);
      // Reading browser storage is an external event; defer the update so this
      // effect does not force a second synchronous render during hydration.
      const timer = window.setTimeout(() => setRecentItems(items), 0);
      return () => window.clearTimeout(timer);
    } catch {
      // safe fallback
    }
  }, [catalog, excludeId]);

  if (recentItems.length === 0) return null;

  return (
    <section className="recently-viewed-section my-16 border-t border-[#dedfe8] pt-12">
      <div className="section-heading mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-[#9f70a5]" />
          <h2 className="font-serif text-xl font-bold text-[#0d125d]">
            Recently Viewed
          </h2>
        </div>
        <Link className="text-button text-xs" href="/shop">
          Browse full store
        </Link>
      </div>

      <div className="product-grid shop-grid grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {recentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
