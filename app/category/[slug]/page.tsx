import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, categorySlug, products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import type { Metadata } from "next";
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
  const items = products.filter(
    (product) => categorySlug(product.category) === slug,
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
