import { Suspense } from "react";
import { ShopCatalog } from "@/components/route-ui";
import { BrandMarquee } from "@/components/brand-marque";
import { getCatalogPage } from "@/lib/catalog";
import { ProductGridSkeleton } from "@/components/product-card";

export const metadata = { title: "Shop | Aglory Hair and Cosmetics" };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection } = await searchParams;
  const catalog = await getCatalogPage({
    first: 24,
    sortKey: collection === "new-arrivals" ? "CREATED_AT" : collection === "best-sellers" ? "BEST_SELLING" : undefined,
    reverse: collection === "new-arrivals" || collection === "best-sellers",
  });
  return (
    <Suspense
      fallback={
        <div className="route-page container section-space">
          <div className="page-kicker">
            <div className="skeleton-line skeleton-eyebrow skeleton-shimmer" />
            <div className="skeleton-line skeleton-title-1 skeleton-shimmer" style={{ width: "260px", height: "36px" }} />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ShopCatalog items={catalog.products} pageInfo={catalog.pageInfo} />
      <BrandMarquee />
    </Suspense>
  );
}

