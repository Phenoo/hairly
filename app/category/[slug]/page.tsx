import { notFound } from "next/navigation";
import { categories, products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const category = categories.find((item) => item.slug === slug); if (!category) notFound(); const items = products.filter((product) => product.category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-").replaceAll("’", "") === slug || (slug === "hair-care" && product.type === "Hair") || (slug === "wigs-extensions" && product.type === "Wigs") || (slug === "skin-body" && product.type === "Skin")); return <ShopCatalog items={items.length ? items : products} eyebrow={category.name} title={<>{category.name} <em>collection.</em></>} />; }
