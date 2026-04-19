"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Custom SVG icons for each step */
const stepIcons = [
    /* 01 - Discovery */
    <svg key="01" viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="12" />
        <path d="M28.5 28.5L40 40" strokeWidth="2.5" />
        <path d="M20 14v6M17 17h6" opacity={0.5} />
    </svg>,
    /* 02 - Design */
    <svg key="02" viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="6" />
        <path d="M6 16h36" />
        <path d="M16 6v36" />
        <circle cx="32" cy="32" r="5" opacity={0.4} />
    </svg>,
    /* 03 - Build */
    <svg key="03" viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 12L6 24l10 12" strokeWidth="2" />
        <path d="M32 12l10 12-10 12" strokeWidth="2" />
        <path d="M28 8L20 40" opacity={0.4} />
    </svg>,
    /* 04 - Test and Ship */
    <svg key="04" viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6c-4 7-6 16-6 22a6 6 0 1012 0c0-6-2-15-6-22z" strokeWidth="1.5" />
        <path d="M18 32l-6 6 3 4M30 32l6 6-3 4" opacity={0.5} />
        <circle cx="24" cy="24" r="3" />
    </svg>,
    /* 05 - Grow */
    <svg key="05" viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 40L18 26l8 8L42 14" strokeWidth="2" />
        <path d="M34 14h8v8" />
        <path d="M6 44h36" opacity={0.3} />
    </svg>,
];

const steps = [
    {
        number: "01",
        title: "Discovery Sprint",
        duration: "1 Week",
        desc: "We map your idea, users, market, and constraints. Output: clear scope, technical direction, and execution roadmap.",
        deliverables: ["Competitor analysis", "User persona map", "Tech stack decision doc", "Feature priority matrix"],
    },
    {
        number: "02",
        title: "Design and Prototype",
        duration: "1-2 Weeks",
        desc: "High-fidelity interface design and interactive prototype. You approve flow and UX before engineering starts.",
        deliverables: ["Full Figma file", "Interactive prototype", "Design system tokens", "Responsive mockups"],
    },
    {
        number: "03",
        title: "Build and Integrate",
        duration: "2-4 Weeks",
        desc: "Full-stack build with transparent progress. You get repo access and regular demos while features ship in sprints.",
        deliverables: ["Weekly progress demos", "GitHub repo access", "Staging environment", "Core integrations"],
    },
    {
        number: "04",
        title: "Test and Ship",
        duration: "3-5 Days",
        desc: "QA, performance checks, accessibility pass, and production deployment with complete handoff documentation.",
        deliverables: ["QA checklist", "Performance audit", "Production deployment", "Handoff documentation"],
    },
    {
        number: "05",
        title: "Grow and Iterate",
        duration: "Ongoing",
        desc: "After launch we optimize using analytics and feedback loops. Iteration sprints keep growth momentum.",
        deliverables: ["Analytics review", "Conversion improvements", "Monthly sprint planning", "Priority support"],
    },
];

export default function ProcessSteps() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinWrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinWrap = pinWrapRef.current;
        const track = trackRef.current;
        if (!section || !pinWrap || !track) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const getTravel = () => Math.max(0, track.scrollWidth - pinWrap.clientWidth);

            gsap.set(track, { x: 0, force3D: true });

            const tween = gsap.to(track, {
                x: () => -getTravel(),
                ease: "none",
                scrollTrigger: {
                    trigger: pinWrap,
                    start: "top top+=92",
                    end: () => {
                        const travel = getTravel();
                        return `+=${travel * 1.22 + 180}`;
                    },
                    scrub: 0.9,
                    pin: true,
                    pinType: "transform",
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    fastScrollEnd: true,
                },
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
                gsap.set(track, { clearProps: "x" });
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-bg py-12 sm:py-14 md:py-16">
            <div className="w-full px-5 sm:px-6 md:px-20">
                <div className="mb-6 sm:mb-8 md:mb-10">
                    <p className="label-mono mb-4">How We Work</p>
                    <h2 className="heading-lg text-[clamp(26px,6vw,48px)]">From idea to live product, one focused system.</h2>
                </div>

                <div className="space-y-4 md:hidden">
                    {steps.map((step, i) => (
                        <ProcessStepCard
                            key={step.number}
                            step={step}
                            index={i}
                            className="min-h-[340px] w-full rounded-[22px] p-5"
                        />
                    ))}
                </div>
            </div>

            <div className="relative left-1/2 hidden w-screen -translate-x-1/2 md:block">
                <div ref={pinWrapRef} className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="process-track flex gap-4 px-5 pb-2 pt-2 [will-change:transform] sm:gap-5 sm:px-6 md:gap-7 md:px-20 md:pb-5"
                        style={{ scrollbarWidth: "none", transform: "translate3d(0,0,0)" }}
                        data-cursor="drag"
                    >
                        {steps.map((step, i) => (
                            <ProcessStepCard
                                key={step.number}
                                step={step}
                                index={i}
                                className="process-card h-[min(420px,calc(100vh-15rem))] w-[340px] shrink-0 rounded-[26px] p-6 transition-all duration-300 active:scale-[0.98] md:hover:-translate-y-1 md:hover:border-accent/45 md:hover:shadow-[0_18px_45px_rgba(12,35,64,0.16)]"
                            />
                        ))}
                    </div>

                    <div className="px-5 sm:px-6 md:px-20">
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
                            Scroll to reveal each step
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .process-track::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

function ProcessStepCard({
    step,
    index,
    className,
}: {
    step: (typeof steps)[number];
    index: number;
    className: string;
}) {
    return (
        <article
            className={`relative flex flex-col overflow-hidden border border-border/85 bg-gradient-to-b from-white to-surface-alt/55 shadow-[0_10px_24px_rgba(12,35,64,0.08)] ${className}`}
        >
            <div className="pointer-events-none absolute -right-16 top-14 h-36 w-36 rounded-full bg-accent/10 blur-2xl" />
            <p className="pointer-events-none absolute right-4 top-4 select-none text-[64px] font-black leading-none tracking-[-0.03em] text-primary/[0.06]">
                {step.number}
            </p>

            <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-white text-accent shadow-[0_4px_16px_rgba(12,35,64,0.08)]">
                    {stepIcons[index]}
                </div>
                <span className="rounded-full border border-accent/20 bg-accent-light/80 px-3 py-1 text-xs font-semibold text-accent">
                    {step.duration}
                </span>
            </div>

            <div className="relative z-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Step {step.number}
                </p>
                <h3 className="mt-2 text-[clamp(22px,6vw,30px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-primary">
                    {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.desc}
                </p>
            </div>

            <div className="relative z-10 mt-auto space-y-2 border-t border-border/70 pt-3">
                {step.deliverables.map((deliverable) => (
                    <div key={deliverable} className="flex items-start gap-2 text-[13px] leading-snug text-primary sm:text-sm">
                        <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-accent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8l4 4 6-6" />
                        </svg>
                        {deliverable}
                    </div>
                ))}
            </div>

            <div className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(91,192,235,0.2)]" />
        </article>
    );
}
