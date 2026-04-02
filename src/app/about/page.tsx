"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const missionBlocks = [
    { heading: "We obsess over execution.", body: "Ideas are cheap. Execution is everything. We've built internal systems to go from concept to shipped product faster than most teams write their first spec document." },
    { heading: "We think in systems.", body: "Every product we build is designed to grow. Clean architecture, zero shortcuts, documentation that doesn't make engineers cry." },
    { heading: "We stay after launch.", body: "Shipping is the beginning. We measure success by your conversion rates, user retention, and growth trajectory after deployment." },
];

const values = [
    {
        title: "Speed without chaos",
        desc: "Move fast, but build right. Every fast decision is also architecturally sound.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 4L8 18h8l-2 10L26 14h-8l2-10z" />
            </svg>
        ),
        span: "col-span-2", bg: "bg-white", accent: "#5B4CF5"
    },
    {
        title: "Radical transparency",
        desc: "Daily updates. No surprises. You always know exactly where the project stands.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="16" r="8" />
                <circle cx="16" cy="16" r="3" />
                <path d="M2 16h4M26 16h4M16 2v4M16 26v4" opacity={0.4} />
            </svg>
        ),
        span: "col-span-1", bg: "bg-accent-light"
    },
    {
        title: "First-principles thinking",
        desc: "We reason from the ground up. No copy-paste solutions.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4C10 4 8 10 8 14c0 3 2 5 3 6v4h10v-4c1-1 3-3 3-6 0-4-2-10-8-10z" />
                <path d="M12 28h8M14 24v-4M18 24v-4" opacity={0.4} />
            </svg>
        ),
        span: "col-span-1", bg: "bg-white"
    },
    {
        title: "Craft over quantity",
        desc: "Three exceptional products over thirty mediocre ones. Every single time.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2z" />
            </svg>
        ),
        span: "col-span-1", bg: "bg-accent-2-light"
    },
    {
        title: "AI-native mindset",
        desc: "Every product gets the AI audit — where can intelligence genuinely multiply value?",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="8" width="20" height="16" rx="4" />
                <circle cx="12" cy="16" r="2" />
                <circle cx="20" cy="16" r="2" />
                <path d="M10 4v4M22 4v4M16 24v4" opacity={0.4} />
            </svg>
        ),
        span: "col-span-1", bg: "bg-white"
    },
    {
        title: "Client as co-builder",
        desc: "You're not a client. You're a collaborator. We build products together.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 16c0-2 4-6 10-6s10 4 10 6" />
                <path d="M10 22l-4-2v-4M22 22l4-2v-4" />
                <path d="M12 14l4 4 4-4" opacity={0.5} />
            </svg>
        ),
        span: "col-span-2", bg: "bg-dark-surface", dark: true
    },
];

const team = [
    { name: "Taha Khan", role: "Founder & CEO", bio: "Full-stack dev obsessed with product, design, and shipping things people love.", tags: ["Strategy", "Product", "Next.js"] },
    { name: "Arjun M.", role: "Lead Engineer", bio: "Backend wizard. Makes databases sing and APIs fly.", tags: ["Node.js", "PostgreSQL", "Redis"] },
    { name: "Maya S.", role: "Design Lead", bio: "Pixel-perfect designer who never ships a page without testing on 5 devices.", tags: ["Figma", "Framer", "UX"] },
    { name: "Dev P.", role: "AI Engineer", bio: "LLM whisperer. Turns complex AI into simple, powerful product features.", tags: ["Python", "OpenAI", "LangChain"] },
];

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <MissionSection />
            <ValuesSection />
            <TeamSection />
            <AboutCTA />
        </>
    );
}

function AboutHero() {
    const lines = ["A small team", "that ships", "big products."];

    const traits = [
        {
            label: "Boutique Team",
            desc: "Small on purpose",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
            ),
        },
        {
            label: "End-to-End",
            desc: "Design to deployment",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
            ),
        },
        {
            label: "Launch-Ready",
            desc: "Ships, not slides",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c-2 4-3 9-3 12a3 3 0 106 0c0-3-1-8-3-12z" />
                    <path d="M9 17l-3 3 1.5 2M15 17l3 3-1.5 2" opacity={0.5} />
                </svg>
            ),
        },
    ];

    return (
        <section id="company" className="min-h-[72svh] scroll-mt-36 bg-bg px-5 pb-16 pt-32 sm:min-h-[85vh] sm:px-6 sm:pb-20 sm:pt-36 md:px-20 md:pt-40">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                <div>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-mono mb-6">
                        {"//"} Who We Are
                    </motion.p>
                    <h1 className="mb-8" style={{ fontSize: "clamp(40px, 13vw, 90px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                        {lines.map((line, i) => (
                            <span key={i} className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block"
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                        className="text-base text-muted leading-relaxed mb-8" style={{ maxWidth: 480 }}>
                        Founded in 2024, TeraIndustries is a focused product studio. We&apos;re not an agency. We&apos;re builders who happen to work for clients.
                    </motion.p>

                    {/* Value props instead of numbers */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                        className="flex flex-wrap gap-4 sm:gap-6">
                        {traits.map((t) => (
                            <div key={t.label} className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
                                    {t.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary">{t.label}</p>
                                    <p className="font-mono text-[10px] text-muted">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative h-[280px] sm:h-[360px] lg:h-[560px] rounded-3xl overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--color-accent-light), var(--color-accent-2-light))" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/favicon.png" alt="" className="h-32 w-32 opacity-10 select-none sm:h-40 sm:w-40 md:h-48 md:w-48" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function MissionSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            const blocks = section.querySelectorAll(".mission-block");
            blocks.forEach((block) => {
                gsap.fromTo(block,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
                        scrollTrigger: { trigger: block, start: "top 75%" }
                    }
                );
            });
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white px-5 py-20 sm:px-6 sm:py-24 md:px-20 md:py-28">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="label-mono mb-4">Our Mission</p>
                    <h2 className="heading-lg">What we{"\n"}believe in.</h2>
                </div>
                <div className="space-y-12 sm:space-y-16">
                    {missionBlocks.map((block) => (
                        <div key={block.heading} className="mission-block">
                            <h3 className="text-2xl font-extrabold text-primary mb-3">{block.heading}</h3>
                            <p className="text-base text-muted leading-relaxed">{block.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ValuesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll(".value-card");
            gsap.fromTo(cards,
                { opacity: 0, scale: 0.94 },
                {
                    opacity: 1, scale: 1, stagger: 0.08, ease: "back.out(1.7)", duration: 0.6,
                    scrollTrigger: { trigger: section, start: "top 70%" }
                }
            );
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface-alt px-5 py-20 sm:px-6 sm:py-24 md:px-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <p className="label-mono mb-4">Our Values</p>
                <h2 className="heading-lg mb-12 sm:mb-14 md:mb-16">What drives{"\n"}how we build.</h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {values.map((v) => (
                        <div
                            key={v.title}
                            className={`value-card rounded-3xl ${v.bg} border border-border p-6 transition-all hover:scale-[1.02] hover:shadow-lg sm:p-8 ${v.span.replace("col-span-", "md:col-span-")} ${v.dark ? "text-bg border-dark-border" : ""}`}
                        >
                            <div className={`mb-4 ${v.dark ? "text-accent-2" : "text-accent"}`}>{v.icon}</div>
                            <h3 className={`text-xl font-bold mb-2 ${v.dark ? "text-bg" : "text-primary"}`}>{v.title}</h3>
                            <p className={`text-sm leading-relaxed ${v.dark ? "text-muted-light" : "text-muted"}`}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll(".team-card");
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50, rotateX: 10 },
                    {
                        opacity: 1, y: 0, rotateX: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
                        scrollTrigger: { trigger: card, start: "top 85%" }
                    }
                );
            });
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} className="scroll-mt-36 bg-bg px-5 py-20 sm:px-6 sm:py-24 md:px-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 flex items-end justify-between sm:mb-14 md:mb-16">
                    <div>
                        <p className="label-mono mb-4">The Builders</p>
                        <h2 className="heading-lg">Meet the team.</h2>
                    </div>
                    <span className="font-mono text-xs text-muted hidden md:block">Drag to explore →</span>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" data-cursor="drag" style={{ scrollbarWidth: "none" }}>
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="team-card flex h-[410px] w-[82vw] max-w-[270px] shrink-0 snap-start flex-col rounded-3xl border border-border bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-lg sm:h-[440px] sm:w-[300px] sm:max-w-none sm:p-8"
                        >
                            {/* Avatar placeholder */}
                            <div className="mb-6 flex h-36 w-full items-center justify-center rounded-2xl sm:h-40" style={{ background: "linear-gradient(135deg, var(--color-accent-light), var(--color-surface-alt))" }}>
                                <span className="text-4xl font-black text-accent/30 sm:text-5xl">{member.name.charAt(0)}</span>
                            </div>

                            <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                            <p className="font-mono text-xs text-muted mb-3">{member.role}</p>
                            <p className="text-sm text-muted leading-relaxed mb-auto">{member.bio}</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {member.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AboutCTA() {
    return (
        <section id="careers" className="noise-overlay relative scroll-mt-36 overflow-hidden bg-dark-surface px-5 py-20 sm:px-6 sm:py-24 md:px-20 md:py-28">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-bg mb-8"
                    style={{ fontSize: "clamp(36px, 9vw, 80px)", fontWeight: 900, lineHeight: 1 }}
                >
                    Let&apos;s build the next{"\n"}big thing together.
                </motion.h2>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                    <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary transition-all group hover:bg-accent hover:text-white sm:w-auto"
                    >
                        Start a Conversation
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
