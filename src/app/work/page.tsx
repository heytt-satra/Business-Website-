"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "MVP", "SaaS", "AI", "Web Design", "Mobile Apps"];

const projects = [
    {
        id: "datasentry", title: "DataSentry", categories: ["SaaS", "AI"], year: "2025",
        headline: "Real-time data monitoring SaaS with AI-powered anomaly detection",
        desc: "Built complete multi-tenant SaaS with real-time WebSocket data streams, AI anomaly detection, and dashboard system.",
        tech: ["Next.js", "OpenAI", "WebSockets", "PostgreSQL", "Stripe"],
        result: "3× faster anomaly detection, $180K ARR in 6 months", size: "large" as const, accent: "#5B4CF5",
    },
    {
        id: "lumina", title: "Lumina Jewels", categories: ["Web Design"], year: "2025",
        headline: "Luxury jewelry e-commerce with interactive 3D product configurator",
        desc: "Complete redesign with Three.js 3D product viewer for custom jewelry configuration.",
        tech: ["Next.js", "Three.js", "Shopify Storefront API", "Framer Motion"],
        result: "+68% conversion rate, +240% session duration", size: "medium" as const, accent: "#D4AF37",
    },
    {
        id: "briefai", title: "BriefAI", categories: ["AI", "MVP"], year: "2024",
        headline: "AI-powered creative brief generator for marketing agencies",
        desc: "Shipped MVP in 3.5 weeks. LangChain pipeline with streaming UI.",
        tech: ["OpenAI GPT-4o", "LangChain", "Next.js", "Supabase"],
        result: "10× faster brief creation, 800 signups week 1", size: "medium" as const, accent: "#00D4AA",
    },
    {
        id: "nexa", title: "Nexa Community", categories: ["MVP", "SaaS"], year: "2024",
        headline: "Networking and marketplace platform for creative professionals",
        desc: "Full social + marketplace with profiles, DMs, job board, and digital asset marketplace.",
        tech: ["TypeScript", "Next.js", "Prisma", "Auth.js", "PostgreSQL"],
        result: "MVP in 4 weeks, 1200 signups on launch day", size: "large" as const, accent: "#5B4CF5",
    },
    {
        id: "sprintkit", title: "SprintKit Mobile", categories: ["Mobile Apps"], year: "2025",
        headline: "Lean project sprint tracker for fast-moving teams",
        desc: "Cross-platform mobile app: Kanban sprints, real-time collaboration, offline-first.",
        tech: ["React Native", "Expo", "Supabase Realtime", "TypeScript"],
        result: "4.8★ App Store, featured in 'Apps We Love'", size: "medium" as const, accent: "#FF6B35",
    },
];

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(activeFilter));

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
                            {filtered.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
                                    className={project.size === "large" ? "md:col-span-2" : ""}
                                >
                                    <Link
                                        href={`/work/${project.id}`}
                                        className="group block rounded-3xl border border-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-accent"
                                        data-cursor="image"
                                    >
                                        <div className="relative h-48 overflow-hidden sm:h-56 md:h-72" style={{ background: `linear-gradient(135deg, ${project.accent}12, ${project.accent}05)` }}>
                                            <div className="flex h-full items-center justify-center">
                                                <span className="select-none text-6xl font-black sm:text-7xl" style={{ color: `${project.accent}12` }}>{project.title.charAt(0)}</span>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-8">
                                                <span className="font-mono text-xs text-white/60 mb-1">{project.year}</span>
                                                <span className="text-xl font-bold text-white mb-2">{project.title}</span>
                                                <span className="text-sm text-white/80">{project.result}</span>
                                            </div>

                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight size={20} className="text-white" />
                                            </div>

                                            {/* Category badges */}
                                            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.categories.map((c) => (
                                                    <span key={c} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase bg-white/20 text-white backdrop-blur-sm">{c}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-primary mb-1">{project.title}</h3>
                                            <p className="text-sm text-muted mb-3">{project.headline}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.slice(0, 3).map((t) => (
                                                    <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
