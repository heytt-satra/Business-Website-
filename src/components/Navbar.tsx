"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const primaryLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
];

const mobileLinks = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
];

const aboutLinks = [
    {
        title: "Company",
        description: "Learn more about who we are.",
        href: "/about#company",
        icon: "company",
    },
    {
        title: "Our Team",
        description: "Meet the people behind.",
        href: "/about#team",
        icon: "team",
    },
    {
        title: "Careers",
        description: "Join and grow with us.",
        href: "/about#careers",
        icon: "careers",
    },
] as const;

const NAV_WIDTH = "min(1120px, calc(100vw - 24px))";

function CompanyMarkIcon() {
    return (
        <motion.img
            src="/tera-company-mark.png"
            alt="Tera Industries mark"
            className="h-12 w-12 object-contain"
            animate={{ rotate: [0, -4, 0, 4, 0], y: [0, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

function TeamAnimatedIcon() {
    return (
        <motion.svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-9 w-9 text-primary"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
        >
            <motion.circle
                cx="17"
                cy="18"
                r="4.5"
                stroke="currentColor"
                strokeWidth="2.2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="30.5" cy="19.5" r="3.5" stroke="currentColor" strokeWidth="2" opacity="0.82" />
            <motion.path
                d="M8.5 34.5c1.1-5.1 4.8-8.5 10.2-8.5 5.4 0 9.1 3.4 10.2 8.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0.35 }}
                animate={{ pathLength: [0.35, 1, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <path d="M25.5 34c.9-3.2 3.2-5.4 6.2-5.4 3 0 5.2 2.2 6.1 5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.82" />
        </motion.svg>
    );
}

function CareersAnimatedIcon() {
    return (
        <motion.svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-9 w-9 text-primary"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
        >
            <rect x="10" y="16" width="28" height="19" rx="5.5" stroke="currentColor" strokeWidth="2.2" />
            <motion.path
                d="M19 16v-2.2c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4V16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                animate={{ y: [0, -0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <path d="M10 24.5h28" stroke="currentColor" strokeWidth="2" opacity="0.74" />
            <motion.path
                d="M21.8 26.8l2.2 2.2 4-4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
            />
        </motion.svg>
    );
}

function AboutMenuIcon({ type }: { type: (typeof aboutLinks)[number]["icon"] }) {
    if (type === "company") return <CompanyMarkIcon />;
    if (type === "team") return <TeamAnimatedIcon />;
    return <CareersAnimatedIcon />;
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [mobileOpen]);

    const isAboutActive = pathname === "/about";
    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileAboutOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed left-1/2 top-3 z-100 flex -translate-x-1/2 items-center justify-between overflow-visible px-4 transition-all duration-400 sm:top-4 sm:px-6 md:top-5 md:px-8"
                onMouseLeave={() => setAboutOpen(false)}
                style={{
                    width: NAV_WIDTH,
                    height: "clamp(62px, 8vw, 72px)",
                    borderRadius: "999px",
                    background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(244,248,251,0.72)",
                    backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
                    border: scrolled ? "1px solid rgba(209,222,232,1)" : "1px solid rgba(209,222,232,0.86)",
                    boxShadow: scrolled
                        ? "0 6px 24px rgba(12,35,64,0.08)"
                        : "0 2px 12px rgba(12,35,64,0.04)",
                }}
            >
                {/* Logo */}
                <Link href="/" className="relative flex shrink-0 items-center gap-1 group">
                    <span className="relative inline-flex overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo-horizontal.png"
                            alt="Tera Industries"
                            className="h-auto w-[138px] object-contain sm:w-[165px] md:w-[186px]"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-white/65 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
                        />
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-3.5">
                    <NavLink label="Home" href="/" active={pathname === "/"} />

                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={() => setAboutOpen(true)}
                            onClick={() => setAboutOpen((prev) => !prev)}
                            className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[17px] font-medium leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${isAboutActive || aboutOpen
                                ? "bg-black/10 text-primary"
                                : "text-primary hover:bg-black/5"
                                }`}
                            aria-expanded={aboutOpen}
                            aria-label="Open about menu"
                        >
                            About
                            {aboutOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>

                    {primaryLinks
                        .filter((link) => link.href !== "/")
                        .map((link) => (
                            <NavLink key={link.href} {...link} active={pathname === link.href} />
                        ))}
                </div>

                <AnimatePresence>
                    {aboutOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-1/2 top-[calc(100%+8px)] z-[120] -translate-x-1/2"
                            style={{ width: NAV_WIDTH }}
                            onMouseEnter={() => setAboutOpen(true)}
                            onMouseLeave={() => setAboutOpen(false)}
                        >
                            <div className="overflow-hidden rounded-[28px] border border-[#D7E3EE] bg-[#EAF0F4] p-1.5 shadow-[0_18px_44px_rgba(12,35,64,0.12)]">
                                <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:divide-x md:divide-[#D6E1EA]">
                                    {aboutLinks.map((item) => {
                                        return (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                onClick={() => setAboutOpen(false)}
                                                className="group flex min-h-[124px] items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-200 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                                            >
                                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-[#D3DEE8] bg-white text-primary shadow-[0_2px_8px_rgba(12,35,64,0.05)]">
                                                    <AboutMenuIcon type={item.icon} />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block whitespace-nowrap text-[clamp(24px,1.8vw,34px)] font-semibold leading-[0.96] tracking-[-0.02em] text-primary transition-colors group-hover:text-accent">
                                                        {item.title}
                                                    </span>
                                                    <span className="mt-1.5 block text-[15px] leading-[1.35] text-muted">
                                                        {item.description}
                                                    </span>
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA */}
                <Link
                    href="/contact"
                    className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg transition-all duration-300 hover:bg-accent group"
                >
                    Let&apos;s Build
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => {
                        setAboutOpen(false);
                        if (mobileOpen) {
                            closeMobileMenu();
                        } else {
                            setMobileOpen(true);
                        }
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/85 text-primary shadow-sm backdrop-blur-sm md:hidden"
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait">
                        {mobileOpen ? (
                            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X size={20} />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <Menu size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[130] md:hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/12 backdrop-blur-[1px]"
                            onClick={closeMobileMenu}
                        />

                        <motion.aside
                            initial={{ x: "8%", opacity: 0.82 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "8%", opacity: 0.82 }}
                            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-y-0 right-0 w-full max-w-[420px] border-l border-[#D0DEE9] bg-[#F8FBFE] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-[-20px_0_48px_rgba(12,35,64,0.16)]"
                        >
                            <div className="flex h-full flex-col">
                                <div className="mb-5 flex items-center justify-between rounded-2xl border border-border bg-white/80 px-3 py-2 backdrop-blur-sm">
                                    <Link href="/" onClick={closeMobileMenu} className="inline-flex items-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/logo-horizontal.png"
                                            alt="Tera Industries"
                                            className="h-auto w-[138px] object-contain"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={closeMobileMenu}
                                        aria-label="Close menu"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-white text-primary"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <nav className="flex-1 overflow-y-auto pr-1">
                                    <div className="space-y-1">
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.24 }}
                                        >
                                            <Link
                                                href="/"
                                                onClick={closeMobileMenu}
                                                className={`block rounded-xl px-2 py-1.5 text-[clamp(30px,9vw,40px)] font-black leading-[0.97] tracking-[-0.03em] ${pathname === "/" ? "text-accent" : "text-primary"}`}
                                            >
                                                Home
                                            </Link>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05, duration: 0.24 }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setMobileAboutOpen((prev) => !prev)}
                                                className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left text-[clamp(30px,9vw,40px)] font-black leading-[0.97] tracking-[-0.03em] ${isAboutActive || mobileAboutOpen ? "text-accent" : "text-primary"}`}
                                            >
                                                <span>About</span>
                                                <motion.span
                                                    animate={{ rotate: mobileAboutOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="mt-1 text-primary"
                                                >
                                                    <ChevronDown size={24} />
                                                </motion.span>
                                            </button>
                                        </motion.div>

                                        <AnimatePresence initial={false}>
                                            {mobileAboutOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mb-2 mt-1 space-y-1 pl-4">
                                                        {aboutLinks.map((item, i) => (
                                                            <motion.div
                                                                key={item.href}
                                                                initial={{ opacity: 0, y: 8 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.03 + i * 0.04, duration: 0.2 }}
                                                            >
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={closeMobileMenu}
                                                                    className="flex items-center gap-2 py-1 text-[19px] font-medium leading-[1.15] tracking-[-0.015em] text-primary/92 transition-colors hover:text-accent"
                                                                >
                                                                    <span className="text-[14px] text-accent">.</span>
                                                                    <span>{item.title}</span>
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {mobileLinks.map((link, i) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + i * 0.05, duration: 0.24 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={closeMobileMenu}
                                                    className={`block rounded-xl px-2 py-1.5 text-[clamp(30px,9vw,40px)] font-black leading-[0.97] tracking-[-0.03em] ${pathname === link.href ? "text-accent" : "text-primary"}`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.24 }}
                                    className="mt-4 border-t border-border pt-4"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={closeMobileMenu}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-[18px] font-semibold leading-none tracking-[-0.015em] text-white shadow-[0_10px_24px_rgba(12,35,64,0.22)]"
                                    >
                                        Let&apos;s Build <ArrowRight size={18} />
                                    </Link>
                                    <p className="mt-4 text-center font-mono text-[14px] text-muted">
                                        hello@teraindustries.com
                                    </p>
                                </motion.div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`rounded-full px-3.5 py-2 text-[17px] font-medium leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${active
                ? "bg-black/10 text-primary"
                : "text-primary hover:bg-black/5"
                }`}
        >
            <span>
                {label}
            </span>
        </Link>
    );
}
