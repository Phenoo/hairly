import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { collections } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import { getCatalogCollection } from "@/lib/catalog";
import { ProductGridSkeleton } from "@/components/product-card";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  return collection
    ? { title: `${collection.name} | Aglory Hair and Cosmetics`, description: collection.description }
    : { title: "The Aglory Edit | Aglory Hair and Cosmetics" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const catalog = await getCatalogCollection(collection.shopifyHandle || slug, collection.productIds, collection.shopifyQuery);
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
        items={catalog.products}
        eyebrow={`The Aglory Edit · ${collection.name}`}
        title={<>{collection.name} <em>for your routine.</em></>}
      />
    </Suspense>
  );
}

