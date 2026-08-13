import { notFound } from "next/navigation";
import { brands, products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.toLowerCase().replaceAll(" ", "-") })); }
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const brand = brands.find((item) => item.toLowerCase().replaceAll(" ", "-") === slug); if (!brand) notFound(); const items = products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase()); return <ShopCatalog items={items.length ? items : products.slice(0, 4)} eyebrow={`${brand} · Aglory brand page`} title={<>{brand} <em>edit.</em></>} />; }
