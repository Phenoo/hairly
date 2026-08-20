import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import type { Metadata } from "next";
import { getCatalogProduct } from "@/lib/catalog";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  return product
    ? { title: `${product.name} | Aglory Hair and Cosmetics`, description: product.description, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: `${product.name} | Aglory Hair and Cosmetics`, description: product.description, images: [{ url: product.image, alt: product.imageAlt }] } }
    : { title: "Product | Aglory Hair and Cosmetics" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
