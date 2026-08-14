import { notFound } from "next/navigation";
import { Suspense } from "react";
import { brands, products, slugify } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import type { Metadata } from "next";
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
  const items = products.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase(),
  );
  return (
    <Suspense
      fallback={
        <div className="route-page container section-space">
          <p>Loading products…</p>
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
