"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

type ServiceIconProps = {
    className?: string;
};

function MvpServiceIcon({ className }: ServiceIconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <path d="M11 37l9-9m14-14c-4 0-8 2-11 5L17 25c-3 3-4 6-5 10 4-1 7-2 10-5l6-6c3-3 5-7 5-10z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 30l-3 11 11-3-8-8z" fill="currentColor" opacity="0.22" />
            <circle cx="35.5" cy="12.5" r="2.5" fill="currentColor" />
        </svg>
    );
}

function SaasServiceIcon({ className }: ServiceIconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <rect x="8" y="10" width="32" height="8" rx="3" stroke="currentColor" strokeWidth="2.2" />
            <rect x="11" y="20" width="26" height="8" rx="3" stroke="currentColor" strokeWidth="2.2" />
            <rect x="14" y="30" width="20" height="8" rx="3" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="16" cy="14" r="1.4" fill="currentColor" />
            <circle cx="18" cy="24" r="1.4" fill="currentColor" />
            <circle cx="20" cy="34" r="1.4" fill="currentColor" />
        </svg>
    );
}

function AiServiceIcon({ className }: ServiceIconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <rect x="13" y="13" width="22" height="22" rx="6" stroke="currentColor" strokeWidth="2.2" />
            <path d="M24 8v5M24 35v5M8 24h5M35 24h5M13.5 13.5l-3.5-3.5M34.5 34.5l3.5 3.5M34.5 13.5l3.5-3.5M13.5 34.5l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 18l1.9 3.8 4.1.6-3 2.9.7 4.1-3.7-1.9-3.7 1.9.7-4.1-3-2.9 4.1-.6L24 18z" fill="currentColor" opacity="0.24" />
        </svg>
    );
}

function DesignServiceIcon({ className }: ServiceIconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <rect x="7" y="10" width="34" height="26" rx="5" stroke="currentColor" strokeWidth="2.2" />
            <path d="M7 18h34" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="12" cy="14" r="1.2" fill="currentColor" />
            <circle cx="16" cy="14" r="1.2" fill="currentColor" opacity="0.7" />
            <path d="M21 26l6 8 5-3 3 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="12" y="22" width="6" height="11" rx="2" fill="currentColor" opacity="0.2" />
        </svg>
    );
}

function MobileServiceIcon({ className }: ServiceIconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <rect x="14" y="7" width="20" height="34" rx="5" stroke="currentColor" strokeWidth="2.2" />
            <path d="M20 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="24" cy="36" r="1.6" fill="currentColor" />
            <circle cx="33" cy="30" r="7" fill="currentColor" opacity="0.16" />
            <path d="M30.5 30l1.9 1.9 3.2-3.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const services = [
    {
        number: "01",
        title: "MVP Development",
        short: "Your idea. Live in 6 weeks.",
        desc: "We take your concept from whiteboard to working, deployed product.",
        icon: MvpServiceIcon,
        tags: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
        timeline: "4-6 weeks",
    },
    {
        number: "02",
        title: "SaaS Platforms",
        short: "Recurring revenue, engineered.",
        desc: "Multi-tenant SaaS architectures with subscription billing, dashboards, and analytics.",
        icon: SaasServiceIcon,
        tags: ["Stripe", "Auth.js", "Prisma", "Redis", "PostgreSQL"],
        timeline: "6-10 weeks",
    },
    {
        number: "03",
        title: "AI Integrations",
        short: "Make your product 10x smarter.",
        desc: "LLM-powered features, computer vision, voice AI, RAG pipelines, and intelligent automations.",
        icon: AiServiceIcon,
        tags: ["OpenAI", "Anthropic", "LangChain", "Pinecone"],
        timeline: "2-6 weeks",
    },
    {
        number: "04",
        title: "Web & App Design",
        short: "Websites that convert, not just impress.",
        desc: "Marketing sites and web apps with scroll animations, perfect Lighthouse scores, and conversion-focused layouts.",
        icon: DesignServiceIcon,
        tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Sanity"],
        timeline: "2-4 weeks",
    },
    {
        number: "05",
        title: "Mobile Apps",
        short: "iOS + Android without the headache.",
        desc: "Cross-platform apps using React Native and Expo with native-feel UI.",
        icon: MobileServiceIcon,
        tags: ["React Native", "Expo", "TypeScript", "Supabase"],
        timeline: "6-12 weeks",
    },
];

export default function ServicesOverview() {
    const [active, setActive] = useState(0);
    const activeService = services[active] ?? services[0];

    return (
        <section className="bg-bg py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-20">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-10 lg:gap-16">
                {/* Left - Sticky */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="label-mono mb-4">What We Do</p>
                    <h2 className="heading-lg mb-4 max-w-[420px] text-[clamp(26px,6vw,48px)]">
                        Every tool you need to go from idea to product.
                    </h2>
                    <p className="text-base text-muted mb-6">Six services. One focused team. Delivered fast.</p>
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group">
                        See all services
                        <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
                    </Link>

                    {/* Desktop Global Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService.number}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-10 hidden rounded-3xl border border-border bg-white p-8 shadow-md lg:block"
                            style={{ perspective: "1000px" }}
                        >
                            <div className="mb-4 flex items-center gap-4">
                                {(() => {
                                    const Icon = activeService.icon;
                                    return (
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent-light">
                                            <Icon className="h-7 w-7 text-accent" />
                                        </span>
                                    );
                                })()}
                                <span className="text-xl font-bold text-primary">{activeService.title}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeService.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 text-xs font-mono text-muted">
                                <span>{activeService.timeline}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right - Accordion */}
                <div>
                    {services.map((service, i) => (
                        <ServiceAccordionItem
                            key={service.number}
                            service={service}
                            isOpen={active === i}
                            onToggle={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceAccordionItem({
    service,
    isOpen,
    onToggle,
}: {
    service: (typeof services)[number];
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="group border-b border-border py-5 sm:py-7">
            <button
                onClick={onToggle}
                className="relative flex w-full items-start justify-between gap-3 pr-1 text-left"
            >
                {/* Ghost number */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.06, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 select-none text-[96px] font-black text-primary md:block"
                        >
                            {service.number}
                        </motion.span>
                    )}
                </AnimatePresence>

                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? "text-accent font-semibold" : "text-muted-light"}`}>
                        {service.number}
                    </span>
                    <span className={`min-w-0 text-lg leading-tight text-balance sm:text-xl md:text-2xl transition-colors duration-200 ${isOpen ? "font-bold" : "font-semibold"} text-primary group-hover:text-accent`}>
                        {service.title}
                    </span>
                </div>

                <div className="flex shrink-0 items-center pt-1">
                    {isOpen ? <Minus size={18} className="text-accent sm:h-5 sm:w-5" /> : <Plus size={18} className="text-muted sm:h-5 sm:w-5" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 sm:pl-10">
                            {/* Mobile Inline Card */}
                            <div className="mb-4 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6 lg:hidden">
                                <div className="mb-3 flex items-center gap-3">
                                    {(() => {
                                        const Icon = service.icon;
                                        return (
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent-light">
                                                <Icon className="h-6 w-6 text-accent" />
                                            </span>
                                        );
                                    })()}
                                    <span className="text-lg font-bold leading-tight text-primary sm:text-xl">{service.title}</span>
                                </div>

                                <p className="mb-3 text-sm font-medium text-primary/90">{service.short}</p>

                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-3 font-mono text-xs text-accent">{service.timeline}</p>
                            </div>

                            <p className="mb-2 text-base font-semibold text-primary sm:text-lg">{service.short}</p>
                            <p className="text-sm leading-relaxed text-muted mb-4 max-w-[480px]">{service.desc}</p>
                            <div className="hidden flex-wrap gap-2 lg:flex">
                                {service.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-3 hidden font-mono text-xs text-accent lg:block">{service.timeline}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
