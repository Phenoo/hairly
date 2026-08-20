import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import type { Metadata } from "next";
import { getCatalogCollection, getCatalogPage } from "@/lib/catalog";
import { ProductGridSkeleton } from "@/components/product-card";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return category
    ? { title: `${category.name} | Aglory Hair and Cosmetics`, description: `${category.name} for every texture, tone and routine at Aglory Hair and Cosmetics.` }
    : { title: "Collection | Aglory Hair and Cosmetics" };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const catalog = category.shopifyHandle
    ? await getCatalogCollection(category.shopifyHandle, [], category.shopifyQuery)
    : await getCatalogPage({ first: 24, query: category.shopifyQuery });
  return (
    <Suspense
      fallback={
        <div className="route-page container section-space">
          <div className="page-kicker">
            <div className="skeleton-line skeleton-eyebrow skeleton-shimmer" />
            <div className="skeleton-line skeleton-title-1 skeleton-shimmer" style={{ width: "280px", height: "36px" }} />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ShopCatalog
        items={catalog.products}
        pageInfo={catalog.pageInfo}
        eyebrow={category.name}
        title={
          <>
            {category.name} <em>collection.</em>
          </>
        }
      />
    </Suspense>
  );
}

