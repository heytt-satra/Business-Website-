"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { BlogPost } from "@/lib/blog";

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.category)))], [posts]);
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (featuredPost && post.slug === featuredPost.slug) {
        return false;
      }

      return activeCategory === "All" || post.category === activeCategory;
    });
  }, [activeCategory, featuredPost, posts]);

  return (
    <>
      {featuredPost ? (
        <section className="bg-bg px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-8 md:pt-36">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <Link href={`/blog/${featuredPost.slug}`}>
                <article className="group overflow-hidden rounded-[32px] border border-light-grey bg-white shadow-[0_24px_60px_rgba(12,35,64,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(12,35,64,0.12)]">
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(91,192,235,0.18),transparent_40%),linear-gradient(135deg,#0C2340_0%,#16395F_55%,#1B6B9A_100%)] px-6 py-16 sm:px-10 sm:py-20">
                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
                    <div className="relative z-10 max-w-3xl">
                      <span className="mb-4 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-white/70">
                        Featured Insight
                      </span>
                      <h1 className="max-w-2xl text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                        {featuredPost.title}
                      </h1>
                      <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                        <span className="rounded-full bg-white/10 px-3 py-1.5">{featuredPost.category}</span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} />
                          {featuredPost.readTime}
                        </span>
                        <span>
                          {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      ) : null}

      <section className="sticky top-[74px] z-30 border-b border-light-grey bg-white/95 px-5 py-4 backdrop-blur-xl sm:top-[80px] sm:px-6 sm:py-5">
        <div className="mx-auto max-w-5xl overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex w-max min-w-full justify-start gap-2 sm:justify-center sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                  activeCategory === category ? "text-navy" : "text-muted hover:text-navy"
                }`}
              >
                {activeCategory === category ? (
                  <motion.span
                    layoutId="blog-category-filter"
                    className="absolute inset-0 rounded-full border border-cyan/25 bg-cyan/15"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 0.08}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-light-grey bg-white shadow-[0_14px_36px_rgba(12,35,64,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(12,35,64,0.1)]">
                      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(91,192,235,0.24),transparent_40%),linear-gradient(135deg,#F4F8FB_0%,#EAF2F8_46%,#D6EBF5_100%)] px-6 py-8">
                        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(12,35,64,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,35,64,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
                        <div className="relative z-10">
                          <span className="inline-flex rounded-full border border-white/80 bg-white/85 px-3 py-1 text-xs font-medium text-cyan shadow-sm">
                            {post.category}
                          </span>
                          <div className="mt-8 text-5xl font-bold tracking-[-0.06em] text-navy/12">
                            {post.title.slice(0, 1)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-xl font-bold leading-tight text-navy transition-colors group-hover:text-cyan">
                          {post.title}
                        </h2>
                        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
                        <div className="mt-5 flex items-center justify-between text-xs text-muted">
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-semibold text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Read article
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 ? (
            <p className="py-20 text-center text-muted">No posts in this category yet. Check back soon.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
