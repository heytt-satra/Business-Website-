"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

import { Linkedin, Github } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const pageLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
];

const serviceLinks = [
    "MVP Development",
    "SaaS Platforms",
    "AI Integrations",
    "Web & App Design",
    "Product Strategy",
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        const divider = dividerRef.current;
        const bigText = bigTextRef.current;
        if (!footer || !divider || !bigText) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                divider,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: { trigger: divider, start: "top 90%" },
                }
            );

            gsap.fromTo(
                bigText,
                { y: "100%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1] as unknown as string,
                    scrollTrigger: { trigger: bigText, start: "top 95%" },
                }
            );
        }, footer);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-dark-surface text-bg" style={{ borderTop: "1px solid #1E3A5F" }}>
            <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-20 pb-10 pt-16 sm:pt-20">
                {/* Top Grid */}
                <div className="grid grid-cols-1 gap-y-12 gap-x-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] lg:items-start">
                    {/* Col 1: Brand */}
                    <div className="max-w-sm">
                        <div className="mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo-horizontal.png"
                                alt="Tera Industries"
                                className="h-12 w-auto object-contain brightness-0 invert sm:h-14"
                            />
                        </div>
                        <p className="mb-4 text-xl font-extrabold sm:text-2xl">Build. Ship. Scale.</p>
                        <p className="text-sm text-muted-light mb-6 leading-relaxed">
                            A product studio that builds MVPs, SaaS platforms, and AI products. From zero to deployed, fast.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <span className="text-base font-bold">X</span>, href: "#" },
                                { icon: <Linkedin size={20} />, href: "#" },
                                { icon: <Github size={20} />, href: "#" },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-bg transition-colors duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Pages */}
                    <div>
                        <h4 className="label-mono mb-6 text-muted">Pages</h4>
                        <ul className="space-y-3">
                            {pageLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-light hover:text-bg hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 className="label-mono mb-6 text-muted">Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((s) => (
                                <li key={s}>
                                    <Link
                                        href="/services"
                                        className="text-sm text-muted-light hover:text-bg hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Contact */}
                    <div>
                        <h4 className="label-mono mb-6 text-muted">Let&apos;s Talk</h4>
                        <a
                            href="mailto:heyttsatra@teraindustries.com"
                            className="text-base font-semibold text-bg hover:underline mb-4 block"
                        >
                            heyttsatra@teraindustries.com
                        </a>
                        <Link
                            href="/contact"
                            className="inline-block w-full rounded-full border border-dark-border px-5 py-2.5 text-center text-sm font-medium text-bg transition-all duration-300 hover:border-accent-2 hover:bg-accent hover:text-white sm:w-auto"
                        >
                            Book a 30-min Call
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div ref={dividerRef} className="my-10 h-px bg-dark-border" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center sm:gap-4">
                    <span>(c) 2025 TeraIndustries. All rights reserved.</span>
                    <span>Made with care by Tera Industries</span>
                </div>
            </div>

            {/* Big Display Text */}
            <div className="hidden overflow-hidden px-8 pb-8 md:block md:px-20">
                <div ref={bigTextRef} className="text-display text-dark-surface-alt" style={{ letterSpacing: "-0.04em" }}>
                    TERA INDUSTRIES
                </div>
            </div>
        </footer>
    );
}

