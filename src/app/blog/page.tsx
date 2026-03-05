"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = ["All", "AI", "Automation", "SaaS", "Web Design", "Business Tech"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const featured = blogPosts.find((p) => p.featured);
    const filtered =
        activeCategory === "All"
            ? blogPosts.filter((p) => !p.featured)
            : blogPosts.filter(
                (p) => p.category === activeCategory && !p.featured
            );

    return (
        <>
            {/* Featured Post */}
            {featured && (
                <section className="bg-bg px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-8 md:pt-36">
                    <div className="mx-auto max-w-5xl">
                        <ScrollReveal>
                            <Link href={`/blog/${featured.slug}`}>
                                <div className="group overflow-hidden rounded-2xl border border-light-grey bg-white shadow-sm transition-all hover:shadow-xl">
                                    {/* Image placeholder */}
                                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-navy/5 to-cyan/10 sm:h-56 md:h-80">
                                        <span className="text-5xl font-bold text-navy/10 sm:text-6xl">
                                            {featured.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="p-5 sm:p-8">
                                        <span className="mb-3 inline-block rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-cyan">
                                            {featured.category}
                                        </span>
                                        <h1 className="mb-3 text-2xl font-bold text-navy transition-colors group-hover:text-cyan sm:text-3xl md:text-4xl">
                                            {featured.title}
                                        </h1>
                                        <p className="mb-4 text-base text-muted line-clamp-2">
                                            {featured.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} /> {featured.readTime}
                                            </span>
                                            <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* Category Filter */}
            <section className="sticky top-[74px] z-30 border-b border-light-grey bg-white px-5 py-4 sm:top-[80px] sm:px-6 sm:py-5">
                <div
                    className="mx-auto max-w-5xl overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                >
                    <div className="flex w-max min-w-full justify-start gap-2 sm:justify-center sm:gap-3">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${activeCategory === c ? "text-navy" : "text-muted hover:text-navy"
                                }`}
                        >
                            {activeCategory === c && (
                                <motion.div
                                    layoutId="blogFilter"
                                    className="absolute inset-0 rounded-full bg-cyan/15 border border-cyan/30"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{c}</span>
                        </button>
                    ))}
                    </div>
                </div>
            </section>

            {/* Post Grid */}
            <section className="bg-white px-5 py-14 sm:px-6 sm:py-16">
                <div className="mx-auto max-w-6xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {filtered.map((post, i) => (
                                <ScrollReveal key={post.slug} delay={i * 0.1}>
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="group overflow-hidden rounded-2xl border border-light-grey bg-white shadow-sm transition-all duration-300 hover:shadow-xl md:hover:scale-[1.02]">
                                            <div className="h-44 overflow-hidden bg-gradient-to-br from-navy/5 to-cyan/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.04]">
                                                <span className="text-4xl font-bold text-navy/10">
                                                    {post.title.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <span className="mb-2 inline-block rounded-full bg-bg px-3 py-1 text-xs font-medium text-cyan">
                                                    {post.category}
                                                </span>
                                                <h3 className="mb-2 text-lg font-bold text-navy line-clamp-2 group-hover:text-cyan transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="mb-3 text-sm text-muted line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-muted">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} /> {post.readTime}
                                                    </span>
                                                    <span className="flex items-center gap-1 font-semibold text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Read <ArrowRight size={12} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <p className="py-20 text-center text-muted">
                            No posts in this category yet. Check back soon!
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
