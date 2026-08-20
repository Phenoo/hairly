import { notFound } from "next/navigation";
import { Suspense } from "react";
import { brands, slugify } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import type { Metadata } from "next";
import { getCatalogProducts } from "@/lib/catalog";
import { ProductGridSkeleton } from "@/components/product-card";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: slugify(brand) }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((item) => slugify(item) === slug);
  return brand
    ? { title: `${brand} | Aglory Hair and Cosmetics`, description: `Shop ${brand} products at Aglory Hair and Cosmetics.` }
    : { title: "Brand | Aglory Hair and Cosmetics" };
}
export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = brands.find((item) => slugify(item) === slug);
  if (!brand) notFound();
  const products = await getCatalogProducts({ first: 48, query: `vendor:${JSON.stringify(brand)}` });
  const items = products.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase(),
  );
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
      <ShopCatalog
        items={items}
        eyebrow={`${brand} · Aglory brand page`}
        title={
          <>
            {brand} <em>collection.</em>
          </>
        }
      />
    </Suspense>
  );
}

