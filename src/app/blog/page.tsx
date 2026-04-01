import type { Metadata } from "next";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on MVP strategy, AI systems, automation, web performance, and premium product execution.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | TeraIndustries",
    description: "Insights on MVP strategy, AI systems, automation, web performance, and premium product execution.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogIndexClient posts={posts} />;
}
