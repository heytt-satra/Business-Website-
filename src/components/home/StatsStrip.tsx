"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Value-driven pillars instead of inflated numbers */
const pillars = [
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4c-3 5-4 12-4 16a4 4 0 108 0c0-4-1-11-4-16z" />
                <path d="M16 24l-4 4 2 4M24 24l4 4-2 4" opacity={0.5} />
                <circle cx="20" cy="18" r="2" />
            </svg>
        ),
        headline: "Idea → Live Product",
        tagline: "We ship working software, not slide decks",
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="28" height="28" rx="6" />
                <path d="M14 14l12 12M26 14L14 26" opacity={0.3} />
                <path d="M14 20l4 4 8-8" strokeWidth="2" />
            </svg>
        ),
        headline: "Quality-First Code",
        tagline: "Tested, production-grade",
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="20" cy="20" r="15" />
                <path d="M20 10v10l7 5" />
                <circle cx="20" cy="20" r="2" fill="currentColor" opacity={0.5} />
            </svg>
        ),
        headline: "Weeks, Not Months",
        tagline: "Rapid delivery without cutting corners",
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4L6 10v10c0 10 14 16 14 16s14-6 14-16V10L20 4z" />
                <path d="M14 20l4 4 8-8" />
            </svg>
        ),
        headline: "Fixed Price, No Surprises",
        tagline: "Transparent pricing, honest timelines",
    },
];

export default function StatsStrip() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Background wipe entrance
            gsap.fromTo(section,
                { clipPath: "inset(0 100% 0 0)" },
                {
                    clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.inOut",
                    scrollTrigger: { trigger: section, start: "top 80%" }
                }
            );

            // Stagger items
            const items = section.querySelectorAll(".pillar-item");
            gsap.fromTo(items,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "top 70%" }
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-dark-surface px-5 py-16 sm:px-6 sm:py-[4.5rem] md:px-20 md:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-6">
                    {pillars.map((p) => (
                        <div key={p.headline} className="pillar-item text-center group">
                            {/* SVG Icon */}
                            <div className="text-accent-2 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 flex justify-center">
                                {p.icon}
                            </div>

                            {/* Headline */}
                            <p className="mb-1 text-sm font-bold text-white sm:text-base">{p.headline}</p>

                            {/* Divider */}
                            <div className="w-8 h-px bg-white/15 mx-auto my-2.5" />

                            {/* Tagline */}
                            <p className="font-mono text-xs leading-relaxed text-white/40">{p.tagline}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
