import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/store-data";
import { ProductDetail } from "@/components/product-detail";
import type { Metadata } from "next";
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product
    ? { title: `${product.name} | A-Glory Hair and Cosmetics`, description: product.description }
    : { title: "Product | A-Glory Hair and Cosmetics" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
