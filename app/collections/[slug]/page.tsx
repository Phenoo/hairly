import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { collections, products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";

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
  const items = products.filter((product) => collection.productIds.includes(product.id));
  return (
    <Suspense fallback={<div className="route-page container section-space"><p>Loading collection…</p></div>}>
      <ShopCatalog
        items={items}
        eyebrow={`The Aglory Edit · ${collection.name}`}
        title={<>{collection.name} <em>for your routine.</em></>}
      />
    </Suspense>
  );
}
