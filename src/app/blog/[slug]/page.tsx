import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { Clock, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    const relatedPosts = blogPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 3);

    return (
        <>
            {/* Hero */}
            <section className="bg-bg px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-4 inline-block rounded-full bg-cyan/15 px-4 py-1 text-sm font-medium text-cyan">
                        {post.category}
                    </span>
                    <h1 className="mb-4 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted">
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> {post.readTime}
                        </span>
                        <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white px-5 py-12 sm:px-6 sm:py-14 md:py-16">
                <div className="mx-auto max-w-3xl">
                    <article className="prose prose-base max-w-none prose-headings:font-heading prose-headings:text-navy prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted prose-p:leading-relaxed prose-strong:text-navy prose-li:text-muted prose-ul:text-muted sm:prose-lg">
                        {post.content.split("\n").map((line, i) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <br key={i} />;
                            if (trimmed.startsWith("## "))
                                return (
                                    <h2 key={i} className="mt-10 mb-4">
                                        {trimmed.replace("## ", "")}
                                    </h2>
                                );
                            if (trimmed.startsWith("### "))
                                return (
                                    <h3 key={i} className="mt-8 mb-3">
                                        {trimmed.replace("### ", "")}
                                    </h3>
                                );
                            if (trimmed.startsWith("- "))
                                return (
                                    <li key={i} className="ml-6 list-disc">
                                        {trimmed.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                                    </li>
                                );
                            const parts = trimmed.split(/\*\*(.*?)\*\*/g);
                            return (
                                <p key={i}>
                                    {parts.map((part, j) =>
                                        j % 2 === 1 ? (
                                            <strong key={j}>{part}</strong>
                                        ) : (
                                            <span key={j}>{part}</span>
                                        )
                                    )}
                                </p>
                            );
                        })}
                    </article>
                </div>
            </section>

            {/* Related Posts */}
            <section className="bg-bg px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-navy">
                        Related Posts
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map((rp, i) => (
                            <ScrollReveal key={rp.slug} delay={i * 0.1}>
                                <Link href={`/blog/${rp.slug}`}>
                                    <div className="group rounded-xl border border-light-grey bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                                        <span className="mb-2 inline-block text-xs font-medium text-cyan">
                                            {rp.category}
                                        </span>
                                        <h3 className="mb-2 text-base font-bold text-navy line-clamp-2 group-hover:text-cyan transition-colors">
                                            {rp.title}
                                        </h3>
                                        <span className="text-xs text-muted flex items-center gap-1">
                                            <Clock size={12} /> {rp.readTime}
                                        </span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
