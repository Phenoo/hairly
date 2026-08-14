import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/store-data";
import { BlogArticle } from "@/components/route-ui";
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!blogPosts.some((post) => post.slug === slug)) notFound();
  return <BlogArticle slug={slug} />;
}
