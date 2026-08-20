import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/store-data";
import { BlogArticle } from "@/components/blog-ui";
import type { Metadata } from "next";
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post
    ? { title: `${post.title} | Aglory Hair and Cosmetics`, description: post.excerpt }
    : { title: "Beauty Journal | Aglory Hair and Cosmetics" };
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
