"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
    { number: "01", title: "DataSentry", category: "SaaS Platform + AI", desc: "Real-time data monitoring with AI anomaly detection", tags: ["Next.js", "OpenAI", "PostgreSQL"], stat: { metric: "3×", label: "faster anomaly detection" }, size: "large" as const, accent: "#5B4CF5", href: "/work/datasentry" },
    { number: "02", title: "Lumina Jewels", category: "Web Design", desc: "Luxury jewelry e-commerce with 3D product viewer", tags: ["Three.js", "Shopify"], stat: { metric: "+68%", label: "conversion rate" }, size: "medium" as const, accent: "#D4AF37", href: "/work/lumina" },
    { number: "03", title: "BriefAI", category: "AI Product", desc: "LLM-powered creative brief generator for agencies", tags: ["OpenAI", "LangChain"], stat: { metric: "10×", label: "faster briefs" }, size: "medium" as const, accent: "#00D4AA", href: "/work/briefai" },
    { number: "04", title: "Nexa Community", category: "MVP / SaaS", desc: "Networking and marketplace for creative professionals", tags: ["TypeScript", "Auth.js", "Prisma"], stat: { metric: "4 wks", label: "idea to launch" }, size: "large" as const, accent: "#5B4CF5", href: "/work/nexa" },
];

export default function WorkPreview() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll(".project-card");
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.96 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: card, start: "top 85%" },
                        delay: i * 0.12
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface-alt py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-20">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="label-mono mb-4">Featured Work</p>
                        <h2 className="heading-lg">Products built.{"\n"}Problems solved.</h2>
                    </div>
                    <Link href="/work" className="text-base font-medium text-primary hover:text-accent transition-colors hover:underline">
                        View All Work →
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.number}
                            href={project.href}
                            className={`project-card group relative overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] ${project.size === "large" ? "md:col-span-2" : ""
                                }`}
                            data-cursor="image"
                        >
                            {/* Thumbnail */}
                            <div
                                className="relative h-48 overflow-hidden transition-transform duration-500 group-hover:scale-[1.03] sm:h-56 md:h-72"
                                style={{
                                    background: `linear-gradient(135deg, ${project.accent}15, ${project.accent}05)`,
                                }}
                            >
                                <div className="flex h-full items-center justify-center">
                                    <span className="text-5xl font-black sm:text-6xl" style={{ color: `${project.accent}15` }}>
                                        {project.title.charAt(0)}
                                    </span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-8">
                                    <span className="font-mono text-xs text-white/70 mb-2">{project.number}</span>
                                    <span className="text-xl font-bold text-white mb-1">{project.title}</span>
                                    <span className="text-2xl font-extrabold text-white">
                                        {project.stat.metric} <span className="text-sm font-normal text-white/70">{project.stat.label}</span>
                                    </span>
                                </div>

                                {/* Arrow */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight size={20} className="text-white" />
                                </div>

                                {/* Category badge */}
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ background: project.accent, color: "#FFF" }}>
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 sm:p-6">
                                <h3 className="text-xl font-bold text-primary mb-1">{project.title}</h3>
                                <p className="text-sm text-muted">{project.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
