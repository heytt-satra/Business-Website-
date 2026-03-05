"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: "01", title: "MVP Development", headline: "Your idea. Live in 6 weeks.",
        desc: "We scope, design, build, and deploy your MVP end-to-end. No agency bloat. You get a real, usable product in the hands of real users, fast.",
        items: ["Detailed scope + technical architecture", "Full Figma design file", "Production-ready TypeScript codebase", "CI/CD pipeline", "Staging + production environment", "2-week post-launch support", "Full documentation"],
        timeline: "4–6 weeks", price: "$8,000",
        tags: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
        ideal: "Founders with validated ideas who need to move fast"
    },
    {
        number: "02", title: "SaaS Platform Development", headline: "Recurring revenue, engineered.",
        desc: "Multi-tenant SaaS platforms with subscription billing, dashboards, admin panels, and analytics from day one.",
        items: ["Multi-tenant database architecture", "Stripe billing", "Complete auth system", "User dashboard + admin panel", "Analytics and tracking", "Email notifications (Resend)", "API documentation"],
        timeline: "6–10 weeks", price: "$15,000",
        tags: ["Stripe", "Auth.js", "Prisma", "Redis", "PostgreSQL", "Resend"],
        ideal: "SaaS founders ready to build a scalable platform"
    },
    {
        number: "03", title: "AI Integration & Solutions", headline: "Make your product 10x smarter.",
        desc: "We embed AI where it creates genuine, measurable value — LLM features, computer vision, voice AI, RAG pipelines.",
        items: ["AI opportunity audit", "LLM integration", "Vector database setup", "Custom prompt engineering", "Streaming UI", "Cost optimization + caching", "AI feature analytics"],
        timeline: "2–6 weeks", price: "$5,000",
        tags: ["OpenAI GPT-4o", "Claude 3.5", "LangChain", "Pinecone", "Whisper"],
        ideal: "Products that need an intelligent edge"
    },
    {
        number: "04", title: "Website Design & Development", headline: "Websites that convert, not just impress.",
        desc: "Marketing sites, landing pages, and web apps with scroll animations, perfect performance, and conversion-focused layouts.",
        items: ["Full Figma mockups", "Framer Motion animation system", "CMS integration", "SEO setup", "Lighthouse 90+ scores", "Analytics integration", "Domain + deployment"],
        timeline: "2–4 weeks", price: "$4,000",
        tags: ["Next.js", "Framer Motion", "Tailwind CSS", "GSAP", "Sanity CMS"],
        ideal: "Brands that need a web presence that converts"
    },
    {
        number: "05", title: "Mobile App Development", headline: "iOS + Android without the complexity.",
        desc: "Cross-platform mobile apps using React Native and Expo. One codebase, native performance, shipped to both stores.",
        items: ["Complete UI/UX design", "React Native + Expo codebase", "App Store + Google Play submission", "Push notifications", "Deep linking", "OTA update capability", "Analytics (Posthog)"],
        timeline: "6–12 weeks", price: "$12,000",
        tags: ["React Native", "Expo", "TypeScript", "Supabase", "Expo Router"],
        ideal: "Teams that need mobile without doubling engineering"
    },
    {
        number: "06", title: "Product Strategy & Consulting", headline: "Build the right thing, not just things.",
        desc: "A focused 1-week intensive to validate your idea, define MVP scope, select the right tech stack, and produce an actionable roadmap.",
        items: ["Market + competitor analysis", "User personas", "MVP feature priority list", "Tech stack recommendation", "Wireframe sketches", "Full project roadmap", "Cost estimate for build"],
        timeline: "1 week", price: "$2,000",
        tags: ["Strategy", "Figma", "Notion", "Miro", "User Research"],
        ideal: "Anyone about to invest in building a product"
    },
];

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <ServicesAccordion />
            <ContactSplit />
        </>
    );
}

function ServicesHero() {
    const lines = ["Services built", "around outcomes,", "not deliverables."];
    return (
        <section className="bg-bg px-5 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36 md:px-20 md:pt-40">
            <div className="mx-auto max-w-6xl">
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="label-mono mb-6">{"//"} What We Offer</motion.p>
                <h1 style={{ lineHeight: 0.93, letterSpacing: "-0.04em" }}>
                    {lines.map((line, i) => (
                        <span key={i} className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block heading-xl"
                            >
                                {line}
                            </motion.span>
                        </span>
                    ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="text-base text-muted mt-8" style={{ maxWidth: 520 }}>
                    We don&apos;t sell hours. We deliver results. Every engagement is scoped around a clear, measurable outcome.
                </motion.p>
            </div>
        </section>
    );
}

function ServicesAccordion() {
    const [openIndex, setOpenIndex] = useState(-1);
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="bg-bg px-5 pb-20 sm:px-6 sm:pb-24 md:px-20 md:pb-28">
            <div className="mx-auto max-w-5xl">
                {services.map((service, i) => (
                    <div key={service.number} className="group border-b border-border py-6 sm:py-8 md:py-9">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                            className="flex w-full items-center justify-between text-left relative"
                        >
                            {/* Ghost number */}
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 0.06, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="pointer-events-none absolute -left-3 top-1/2 hidden -translate-y-1/2 select-none text-[84px] font-black text-primary md:block lg:-left-4 lg:text-[120px]"
                                    >
                                        {service.number}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center gap-3 sm:gap-5">
                                <span className={`font-mono text-base sm:text-lg transition-colors duration-300 ${openIndex === i ? "text-accent font-semibold" : "text-muted-light"}`}>
                                    {service.number}
                                </span>
                                <span className="text-xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors" style={{ letterSpacing: "-0.02em" }}>
                                    {service.title}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="hidden md:inline font-mono text-sm text-muted">From {service.price}</span>
                                {openIndex === i ? <Minus size={22} className="text-accent" /> : <Plus size={22} className="text-muted" />}
                            </div>
                        </button>

                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 gap-8 pt-5 sm:pl-8 md:grid-cols-2 md:gap-10 md:pt-6 md:pl-12">
                                        <div>
                                            <p className="mb-3 text-lg font-bold text-primary sm:text-xl">{service.headline}</p>
                                            <p className="text-sm text-muted leading-relaxed mb-4">{service.desc}</p>
                                            <p className="text-xs text-muted italic">Ideal for: {service.ideal}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-primary mb-3">What you get</p>
                                            <ul className="space-y-2 mb-6">
                                                {service.items.map((item, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.04 }}
                                                        className="flex items-start gap-2 text-sm text-muted"
                                                    >
                                                        <span className="text-accent mt-0.5">✓</span> {item}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {service.tags.map((tag) => (
                                                    <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-primary">{tag}</span>
                                                ))}
                                            </div>
                                            <p className="font-mono text-xs text-accent">{service.timeline}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ContactSplit() {
    return (
        <section className="bg-surface-alt px-5 py-20 sm:px-6 sm:py-24 md:px-20 md:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                    <p className="label-mono mb-4">Let&apos;s Talk</p>
                    <h2 className="heading-md mb-6" style={{ maxWidth: 400 }}>
                        Every project starts with a free 30-min discovery call.
                    </h2>
                    <p className="text-sm text-muted mb-8 leading-relaxed" style={{ maxWidth: 400 }}>
                        No pitches. No decks. Just an honest conversation about what you&apos;re building.
                    </p>
                    <ul className="space-y-3">
                        {["Response within 24 hours", "Free scoping call, no commitment", "Fixed-price projects, no surprise invoices"].map((s) => (
                            <li key={s} className="flex items-center gap-2.5 text-sm text-primary">
                                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-accent shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="10" cy="10" r="8" strokeWidth="1.5" opacity={0.2} />
                                    <path d="M6.5 10l2.5 2.5 5-5" />
                                </svg>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {[
                        { name: "name", label: "Your Name", type: "text" },
                        { name: "email", label: "Email Address", type: "email" },
                    ].map((f) => (
                        <div key={f.name}>
                            <label className="block text-sm font-medium text-primary mb-1.5">{f.label}</label>
                            <input
                                type={f.type}
                                className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-primary transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(91,76,245,0.1)]"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5">Project Type</label>
                        <select className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-primary transition-all focus:outline-none focus:border-accent">
                            <option>MVP Development</option>
                            <option>SaaS Platform</option>
                            <option>AI Integration</option>
                            <option>Website</option>
                            <option>Mobile App</option>
                            <option>Strategy</option>
                            <option>Not sure yet</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5">Budget Range</label>
                        <select className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-primary transition-all focus:outline-none focus:border-accent">
                            <option>$2K–$5K</option>
                            <option>$5K–$15K</option>
                            <option>$15K–$30K</option>
                            <option>$30K+</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5">Tell us about your project</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-primary transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(91,76,245,0.1)] resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-accent text-white px-8 py-4 text-base font-semibold transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        Send Message <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </section>
    );
}
