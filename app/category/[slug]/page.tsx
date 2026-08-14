import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, categorySlug, products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
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
