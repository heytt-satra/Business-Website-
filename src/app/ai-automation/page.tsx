"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const accordionItems = [
    { problem: "Manual data entry and reporting", solution: "Automated pipelines that sync, clean, and report your data in real-time" },
    { problem: "Customer support overload", solution: "AI chatbot trained on your knowledge base handling 80% of queries" },
    { problem: "Lead follow-up falling through the cracks", solution: "CRM automation sequences triggered by behaviour" },
    { problem: "Invoice and document processing", solution: "AI document reader that extracts, validates, and files automatically" },
    { problem: "Onboarding new clients or staff", solution: "Automated onboarding flows with personalised steps and tracking" },
];

const tools = [
    { name: "OpenAI", desc: "GPT models for intelligent AI features" },
    { name: "Gemini", desc: "Google's multimodal AI platform" },
    { name: "Anthropic", desc: "Claude AI for safe, nuanced responses" },
    { name: "n8n", desc: "Self-hosted workflow automation" },
    { name: "Make", desc: "Visual no-code automation builder" },
    { name: "Zapier", desc: "Quick SaaS-to-SaaS integrations" },
    { name: "LangChain", desc: "Framework for LLM-powered apps" },
    { name: "Supabase", desc: "Open-source backend-as-a-service" },
    { name: "Airtable", desc: "Flexible database for business data" },
    { name: "Notion API", desc: "Automate your team's workspace" },
];

export default function AiAutomationPage() {
    return (
        <>
            {/* Hero with SVG lines that draw on scroll */}
            <AiHero />

            {/* Accordion */}
            <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 md:py-24">
                <div className="mx-auto max-w-3xl">
                    <SectionHeading title="What We Can Automate For You" />
                    <div className="space-y-4">
                        {accordionItems.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <AccordionItem item={item} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tool Cloud */}
            <ToolCloudSection />

            {/* ROI Calculator */}
            <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 md:py-24">
                <div className="mx-auto max-w-xl">
                    <SectionHeading title="How Much Could You Save?" />
                    <RoiCalculator />
                </div>
            </section>
        </>
    );
}

/* ── Hero with scroll-drawn SVG lines ── */
function AiHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const lines = section.querySelectorAll(".hero-line");
            lines.forEach((line, i) => {
                const length = (line as SVGLineElement).getTotalLength?.() || 200;
                gsap.set(line, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
                gsap.to(line, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 30%",
                        scrub: 1,
                    },
                });
            });

            // Hero text fade up
            const text = section.querySelector(".hero-text");
            if (text) {
                gsap.fromTo(
                    text,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                        },
                    }
                );
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-bg px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:pb-20 md:pt-36">
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line className="hero-line" x1="10%" y1="20%" x2="40%" y2="50%" stroke="#0A1A3B" strokeWidth="2" />
                <line className="hero-line" x1="40%" y1="50%" x2="70%" y2="30%" stroke="#00C2D4" strokeWidth="2" />
                <line className="hero-line" x1="70%" y1="30%" x2="90%" y2="60%" stroke="#0A1A3B" strokeWidth="2" />
                <line className="hero-line" x1="30%" y1="70%" x2="60%" y2="80%" stroke="#00C2D4" strokeWidth="2" />
                <line className="hero-line" x1="15%" y1="40%" x2="50%" y2="20%" stroke="#0A1A3B" strokeWidth="1.5" />
                <line className="hero-line" x1="55%" y1="65%" x2="85%" y2="45%" stroke="#00C2D4" strokeWidth="1.5" />
            </svg>

            <div className="hero-text relative z-10 mx-auto max-w-3xl text-center">
                <h1 className="mb-4 text-3xl font-bold text-navy sm:text-4xl md:text-6xl">
                    Work Smarter. Scale Faster.
                </h1>
                <p className="text-base text-muted sm:text-lg md:text-xl">
                    We build AI systems and automations that replace manual work and
                    supercharge your team.
                </p>
            </div>
        </section>
    );
}

/* ── Tool Cloud with radiate-from-center ── */
function ToolCloudSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const items = section.querySelectorAll(".tool-item");
            gsap.fromTo(
                items,
                { opacity: 0, scale: 0.5, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: {
                        from: "center",
                        amount: 0.6,
                    },
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-bg px-5 py-16 sm:px-6 sm:py-20 md:py-24">
            <div className="mx-auto max-w-5xl">
                <SectionHeading title="Tools We Work With" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {tools.map((tool) => (
                        <div
                            key={tool.name}
                            className="tool-item group relative flex h-20 items-center justify-center rounded-xl border border-light-grey bg-white px-3 text-center text-xs font-semibold text-navy shadow-sm transition-all hover:scale-105 hover:shadow-lg hover:border-cyan/30 sm:h-24 sm:px-4 sm:text-sm"
                        >
                            {tool.name}
                            <div className="pointer-events-none absolute -top-12 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                                {tool.desc}
                                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Accordion ── */
function AccordionItem({ item }: { item: (typeof accordionItems)[number] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-xl border border-light-grey bg-white shadow-sm overflow-hidden">
            <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5">
                <span className="text-base font-semibold text-navy">{item.problem}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className="text-muted" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="border-t border-light-grey px-5 py-4 sm:px-6 sm:py-5">
                            <p className="text-sm text-muted leading-relaxed">
                                <span className="font-semibold text-cyan">Solution: </span>
                                {item.solution}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── ROI Calculator ── */
function RoiCalculator() {
    const [hours, setHours] = useState(20);
    const [rate, setRate] = useState(500);
    const [currency, setCurrency] = useState<"INR" | "USD">("INR");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const monthlySaved = hours * 4;
    const costSaved = monthlySaved * rate;
    const symbol = currency === "INR" ? "Rs" : "$";

    return (
        <div ref={sectionRef} className="rounded-2xl border border-light-grey bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex justify-center gap-2">
                {(["INR", "USD"] as const).map((c) => (
                    <button
                        key={c}
                        onClick={() => { setCurrency(c); setRate(c === "INR" ? 500 : 25); }}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${currency === c ? "bg-cyan text-navy" : "bg-light-grey text-muted hover:text-navy"
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <label className="mb-2 block text-sm font-medium text-navy">Hours per week on manual tasks</label>
            <input type="range" min={1} max={80} value={hours} onChange={(e) => setHours(+e.target.value)} className="mb-2 w-full accent-cyan" />
            <p className="mb-6 text-right text-sm font-bold text-cyan">{hours} hrs/week</p>

            <label className="mb-2 block text-sm font-medium text-navy">Average hourly cost ({symbol})</label>
            <input
                type="number"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="input-glow mb-8 w-full rounded-lg border border-light-grey bg-bg px-4 py-3 text-sm text-body-text"
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-bg p-6 text-center">
                    <p className="text-3xl font-bold text-cyan">{monthlySaved}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">Hours saved / month</p>
                </div>
                <div className="rounded-xl bg-bg p-6 text-center">
                    <p className="text-3xl font-bold text-cyan">{symbol}{costSaved.toLocaleString()}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">Cost saved / month</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button label="Automate These Hours - Talk to Us" href="/contact" variant="primary" className="w-full sm:w-auto" />
            </div>
        </div>
    );
}
