"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll(".work-card");

            cards.forEach((card, i) => {
                const fromX = i % 2 === 0 ? -80 : 80;

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        x: fromX,
                        scale: 0.85,
                        rotateY: i % 2 === 0 ? -8 : 8,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1,
                        },
                    }
                );
            });

            // CTA button flies up
            const cta = section.querySelector(".work-cta");
            if (cta) {
                gsap.fromTo(
                    cta,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: cta,
                            start: "top 90%",
                        },
                    }
                );
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-bg py-24 px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Portfolio" title="Featured Work" />

                <div className="grid gap-8 md:grid-cols-2">
                    {featured.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={i} />
                    ))}
                </div>

                <div className="work-cta mt-12 text-center">
                    <Button label="View All Work" href="/work" variant="secondary" />
                </div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[number];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

    return (
        <Link href={`/work/${project.slug}`}>
            <div
                ref={cardRef}
                className="work-card group relative overflow-hidden rounded-2xl border border-light-grey bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "1000px" }}
            >
                {/* Thumbnail with parallax */}
                <div className="relative h-56 overflow-hidden bg-light-grey">
                    <div
                        className="flex h-full w-full items-center justify-center bg-linear-to-br from-navy/5 to-cyan/10 transition-transform duration-300"
                        style={{
                            transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
                        }}
                    >
                        <span className="text-4xl font-bold text-navy/10">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <span className="mb-2 inline-block rounded-full bg-bg px-3 py-1 text-xs font-medium text-cyan">
                        {project.category}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-navy">{project.title}</h3>
                    <p className="mb-4 text-sm text-muted line-clamp-2">
                        {project.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-all group-hover:gap-2">
                        View Case Study <ArrowRight size={14} />
                    </span>
                </div>

                {/* Hover glow effect */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(0,194,212,0.06) 0%, transparent 60%)`,
                    }}
                />
            </div>
        </Link>
    );
}
