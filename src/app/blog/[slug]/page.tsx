import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: toAbsoluteUrl(post.coverImage) || post.coverImage }] : undefined,
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = getRelatedBlogPosts(allPosts, slug, 3);
  const absoluteImage = toAbsoluteUrl(post.coverImage);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TeraIndustries",
    },
    mainEntityOfPage: `${getSiteUrl()}/blog/${post.slug}`,
    image: absoluteImage ? [absoluteImage] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-bg px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan/15 px-4 py-1 text-sm font-medium text-cyan">
            {post.category}
          </span>
          <h1 className="mb-4 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted">
            <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{post.author}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <article className="blog-rich-text" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.tags.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-light-grey pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-bg px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-navy">Related Posts</h2>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
              All posts
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => (
              <ScrollReveal key={relatedPost.slug} delay={index * 0.08}>
                <Link href={`/blog/${relatedPost.slug}`}>
                  <article className="group rounded-[24px] border border-light-grey bg-white p-6 shadow-[0_14px_32px_rgba(12,35,64,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(12,35,64,0.1)]">
                    <span className="mb-2 inline-block text-xs font-medium text-cyan">
                      {relatedPost.category}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-navy transition-colors group-hover:text-cyan">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted">{relatedPost.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted">
                      <Clock size={12} /> {relatedPost.readTime}
                    </span>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
