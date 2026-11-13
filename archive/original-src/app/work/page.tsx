"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "SaaS / MVP", "AI", "Web", "E-commerce", "App"];

const accentBySlug: Record<string, string> = {
    peerclub: "#5B4CF5",
    "swarna-palace": "#D4AF37",
    profitpulse: "#00D4AA",
    teraindustries: "#5BC0EB",
    "scale-your-dreams": "#FF6B35",
    "advocate-prateek": "#C9A357",
    "blackboard-communications": "#FF5E2B",
    ssbe: "#1B6B9A",
};

const sizeBySlug: Record<string, "large" | "medium"> = {
    peerclub: "large",
    "swarna-palace": "medium",
    profitpulse: "medium",
    teraindustries: "large",
    "scale-your-dreams": "medium",
    "advocate-prateek": "medium",
    "blackboard-communications": "medium",
    ssbe: "medium",
};

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeFilter));

    const lines = ["Products that", "prove the point."];

    return (
        <>
            {/* Hero */}
            <section className="bg-bg px-5 pb-10 pt-32 sm:px-6 sm:pt-36 md:px-20 md:pt-40">
                <div className="mx-auto max-w-6xl">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="label-mono mb-6">{"//"} Our Work</motion.p>
                    <h1>
                        {lines.map((line, i) => (
                            <span key={i} className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ delay: 0.3 + i * 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block heading-xl"
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                        className="text-base text-muted mt-6 mb-12" style={{ maxWidth: 520 }}>
                        Real products. Real results. Every project below is live, used by real users.
                    </motion.p>

                    {/* Filter Bar */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                        className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className="relative rounded-full border px-5 py-2.5 text-sm font-medium transition-all"
                                style={{
                                    borderColor: activeFilter === f ? "var(--color-primary)" : "var(--color-border)",
                                    background: activeFilter === f ? "var(--color-primary)" : "transparent",
                                    color: activeFilter === f ? "var(--color-bg)" : "var(--color-muted)",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="bg-bg px-5 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 md:px-20 md:pb-28">
                <div className="mx-auto max-w-6xl">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {filtered.map((project) => {
                                const accent = accentBySlug[project.slug] ?? "#1B6B9A";
                                const size = sizeBySlug[project.slug] ?? "medium";
                                const highlight = project.results[0] ?? "";

                                return (
                                    <motion.div
                                        key={project.slug}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
                                        className={size === "large" ? "md:col-span-2" : ""}
                                    >
                                        <Link
                                            href={`/work/${project.slug}`}
                                            className="group block rounded-3xl border border-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-accent"
                                            data-cursor="image"
                                        >
                                            <div className="relative h-48 overflow-hidden sm:h-56 md:h-72" style={{ background: `linear-gradient(135deg, ${accent}12, ${accent}05)` }}>
                                                <div className="flex h-full items-center justify-center">
                                                    <span className="select-none text-6xl font-black sm:text-7xl" style={{ color: `${accent}12` }}>{project.title.charAt(0)}</span>
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-8">
                                                    <span className="font-mono text-xs text-white/60 mb-1">{project.category}</span>
                                                    <span className="text-xl font-bold text-white mb-2">{project.title}</span>
                                                    <span className="text-sm text-white/80">{highlight}</span>
                                                </div>

                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowUpRight size={20} className="text-white" />
                                                </div>

                                                {/* Category badges */}
                                                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {project.tags.slice(0, 2).map((c) => (
                                                        <span key={c} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase bg-white/20 text-white backdrop-blur-sm">{c}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-primary mb-1">{project.title}</h3>
                                                <p className="text-sm text-muted mb-3">{project.shortDescription}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.slice(0, 3).map((t) => (
                                                        <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
