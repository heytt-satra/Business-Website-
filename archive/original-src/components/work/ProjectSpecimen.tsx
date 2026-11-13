"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, Heart, Globe, Sparkles, ShieldCheck, TrendingUp, Scale, FileText, Search } from "lucide-react";

/*
 * Per-project hero specimen. Compact visual that reflects the actual product.
 * All specimens live on the site palette: navy, ocean, cyan, ice, light bg.
 * Consistent aspect ratio and rounded surface, differentiated by content.
 */

const containerBase =
    "relative w-full overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgba(12,35,64,0.35)]";

export default function ProjectSpecimen({ slug }: { slug: string }) {
    return (
        <div className="relative w-full">
            {/* Soft glow behind the specimen */}
            <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-60 blur-3xl"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 30%, rgba(91,192,235,0.25) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(27,107,154,0.18) 0%, transparent 55%)",
                }}
            />
            <motion.div
                initial={{ opacity: 0, y: 30, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
            >
                {renderSpecimen(slug)}
            </motion.div>
        </div>
    );
}

function renderSpecimen(slug: string) {
    switch (slug) {
        case "peerclub":
            return <PeerClubSpecimen />;
        case "swarna-palace":
            return <SwarnaSpecimen />;
        case "profitpulse":
            return <ProfitPulseSpecimen />;
        case "teraindustries":
            return <TeraSpecimen />;
        case "scale-your-dreams":
            return <ScaleSpecimen />;
        case "advocate-prateek":
            return <AdvocateSpecimen />;
        case "blackboard-communications":
            return <BlackboardSpecimen />;
        case "ssbe":
            return <SSBESpecimen />;
        default:
            return <TeraSpecimen />;
    }
}

/* ───────────── PeerClub: member verification card ───────────── */
function PeerClubSpecimen() {
    return (
        <div
            className={`${containerBase} aspect-[4/5] bg-primary p-6 sm:p-8`}
            style={{
                backgroundImage:
                    "radial-gradient(ellipse at 80% 0%, rgba(91,192,235,0.2) 0%, transparent 55%), linear-gradient(180deg, #0C2340 0%, #081A30 100%)",
            }}
        >
            {/* Chrome row */}
            <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                    PeerClub / Profile
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan">
                    <Check size={10} strokeWidth={3} />
                    Verified
                </span>
            </div>

            {/* Avatar + name */}
            <div className="mb-8 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-cyan to-ocean ring-4 ring-white/5">
                    <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-black text-white">
                        H
                    </span>
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan ring-2 ring-primary">
                        <Check size={10} className="text-primary" strokeWidth={3} />
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="text-base font-semibold text-white">Heytt Satra</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                        Founder / Series A
                    </p>
                </div>
            </div>

            {/* Credit row */}
            <div className="mb-6 grid grid-cols-3 gap-2 border-y border-white/10 py-4">
                <Stat label="Credits" value="12" />
                <Stat label="Events" value="05" />
                <Stat label="Experts" value="03" />
            </div>

            {/* Message peek */}
            <div className="rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                        Live Message
                    </span>
                    <MessageCircle size={12} className="text-white/40" />
                </div>
                <p className="text-xs leading-relaxed text-white/75">
                    Hey. Saw you booked the founder roundtable, grabbed the seat next to yours.
                </p>
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/45">{label}</p>
            <p className="mt-0.5 font-heading text-lg font-bold text-white">{value}</p>
        </div>
    );
}

/* ───────────── Swarna Palace: product card ───────────── */
function SwarnaSpecimen() {
    return (
        <div className={`${containerBase} aspect-[4/5] bg-white p-6 sm:p-8`}>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-lg font-black tracking-tight text-primary">
                    SP
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    22KT / Handcrafted
                </span>
            </div>

            {/* Product frame */}
            <div className="relative mx-auto mb-8 aspect-square w-[70%] overflow-hidden rounded-2xl bg-gradient-to-br from-[#F8F5EB] via-[#EFE7D2] to-[#DCCEA5]">
                {/* Ring SVG */}
                <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="goldband" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#C9A357" />
                            <stop offset="50%" stopColor="#F0D890" />
                            <stop offset="100%" stopColor="#8B6A2D" />
                        </linearGradient>
                    </defs>
                    <ellipse cx="100" cy="130" rx="52" ry="14" fill="none" stroke="url(#goldband)" strokeWidth="12" />
                    <ellipse cx="100" cy="128" rx="52" ry="14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                    <circle cx="100" cy="80" r="22" fill="url(#goldband)" />
                    <path d="M 88 80 L 100 66 L 112 80 L 100 94 Z" fill="#5BC0EB" opacity="0.95" />
                    <path d="M 94 80 L 100 73 L 106 80 L 100 87 Z" fill="white" opacity="0.6" />
                </svg>

                <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-widest text-primary/50">
                    Aurora Signature
                </span>
            </div>

            {/* Product info */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted">Shop by Bond</p>
                    <p className="mt-1 font-heading text-lg font-bold text-primary">For Her</p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">From</p>
                    <p className="font-heading text-lg font-black text-primary">₹84,000</p>
                </div>
            </div>
        </div>
    );
}

/* ───────────── ProfitPulse: dashboard with AI chat ───────────── */
function ProfitPulseSpecimen() {
    const bars = [42, 58, 36, 64, 46, 72, 55, 80];
    return (
        <div
            className={`${containerBase} aspect-[4/5] bg-primary p-6 sm:p-8`}
            style={{
                backgroundImage:
                    "radial-gradient(ellipse at 0% 0%, rgba(91,192,235,0.18) 0%, transparent 55%), linear-gradient(180deg, #0C2340 0%, #071529 100%)",
            }}
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    ProfitPulse / April
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                </span>
            </div>

            {/* Big KPI */}
            <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Net Profit (28d)
                </p>
                <p className="mt-1 font-heading text-4xl font-black tracking-tight text-white">
                    $248.6K
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                    <TrendingUp size={12} />
                    +18.2% vs. last month
                </p>
            </div>

            {/* Bars */}
            <div className="mb-6 flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{
                            height: `${h}%`,
                            background:
                                i === bars.length - 1
                                    ? "linear-gradient(180deg, #5BC0EB 0%, #1B6B9A 100%)"
                                    : "linear-gradient(180deg, rgba(91,192,235,0.45) 0%, rgba(27,107,154,0.35) 100%)",
                        }}
                    />
                ))}
            </div>

            {/* AI chat bubble */}
            <div className="rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                <div className="mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-cyan" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                        AI Analyst
                    </span>
                </div>
                <p className="text-xs leading-relaxed text-white/75">
                    Shopify margin grew 6.4% while Meta Ads CPA dropped 11. Shift more spend there.
                </p>
            </div>
        </div>
    );
}

/* ───────────── TeraIndustries: self referential tiles ───────────── */
function TeraSpecimen() {
    return (
        <div className={`${containerBase} aspect-[4/5] bg-bg p-5 sm:p-7`}>
            {/* Grain */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* Brand mark */}
            <div className="mb-5 flex items-center justify-between">
                <span className="font-heading text-sm font-black uppercase tracking-[0.22em] text-primary">
                    Tera
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    2026
                </span>
            </div>

            {/* Tile canvas */}
            <div className="relative h-[70%] w-full">
                <MiniTile
                    className="absolute left-[6%] top-[10%] h-16 w-24 rotate-[-6deg] bg-ocean text-white"
                    label="Dashboard"
                />
                <MiniTile
                    className="absolute left-[42%] top-[4%] h-20 w-16 rotate-[4deg] bg-white text-primary border border-border"
                    label="Profile"
                />
                <MiniTile
                    className="absolute right-[4%] top-[22%] h-16 w-20 rotate-[8deg] bg-cyan text-primary"
                    label="Social"
                />
                <MiniTile
                    className="absolute left-[10%] top-[48%] h-20 w-18 rotate-[5deg] bg-navy text-white"
                    label="Portrait"
                />
                <MiniTile
                    className="absolute right-[14%] bottom-[18%] h-16 w-24 rotate-[-4deg] bg-white text-primary border border-border"
                    label="Pricing"
                />
                <MiniTile
                    className="absolute left-[38%] bottom-[6%] h-14 w-20 rotate-[-8deg] bg-primary text-white"
                    label="Studio"
                />
            </div>

            {/* Footer caption */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Featured Work</span>
                <span>09 tiles</span>
            </div>
        </div>
    );
}

function MiniTile({ className, label }: { className: string; label: string }) {
    return (
        <div
            className={`flex flex-col justify-between rounded-xl px-2 py-1.5 shadow-[0_6px_16px_-6px_rgba(12,35,64,0.35)] ${className}`}
        >
            <span className="font-mono text-[8px] uppercase tracking-wider opacity-70">
                {label}
            </span>
            <span className="self-end text-[10px] font-bold">↗</span>
        </div>
    );
}

/* ───────────── Scale Your Dreams: social post card ───────────── */
function ScaleSpecimen() {
    return (
        <div className={`${containerBase} aspect-[4/5] bg-white`}>
            {/* App chrome */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-heading text-base font-black tracking-tight text-primary">
                    SYD
                </span>
                <div className="flex gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                </div>
            </div>

            {/* Post header */}
            <div className="flex items-center gap-3 px-5 pt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan to-ocean">
                    <div className="flex h-full w-full items-center justify-center font-heading text-sm font-black text-white">
                        S
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-primary">scaleyourdreams</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Personal Branding / Agency
                    </p>
                </div>
            </div>

            {/* Post visual */}
            <div className="relative mx-5 mt-4 aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-ocean to-cyan">
                <span className="absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                    Post / 04.21
                </span>
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <p className="font-heading text-base font-black leading-tight text-white">
                        Your brand is not what you sell. It is who they remember.
                    </p>
                </div>
            </div>

            {/* Interaction row */}
            <div className="mt-4 flex items-center gap-5 px-5">
                <div className="flex items-center gap-1.5 text-muted">
                    <Heart size={14} />
                    <span className="font-mono text-xs">2.4k</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted">
                    <MessageCircle size={14} />
                    <span className="font-mono text-xs">148</span>
                </div>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-cyan">
                    Book a call →
                </span>
            </div>

            {/* Caption */}
            <p className="mt-3 px-5 pb-5 text-xs leading-relaxed text-muted">
                A preview of how founder-led brands are built inside the feed, not around it.
            </p>
        </div>
    );
}

/* ───────────── Advocate Prateek: legal crest card ───────────── */
function AdvocateSpecimen() {
    return (
        <div
            className={`${containerBase} aspect-[4/5] bg-primary p-7 sm:p-9`}
            style={{
                backgroundImage:
                    "linear-gradient(180deg, #0C2340 0%, #091B35 100%)",
            }}
        >
            {/* Border frame */}
            <div className="absolute inset-3 rounded-2xl border border-[rgba(200,163,87,0.3)]" />
            <div className="absolute inset-5 rounded-xl border border-[rgba(200,163,87,0.12)]" />

            <div className="relative flex h-full flex-col">
                {/* Top row */}
                <div className="mb-auto flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF6E]">
                        Est. 2010
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF6E]">
                        <Globe size={11} />
                        NRI Desk
                    </span>
                </div>

                {/* Crest */}
                <div className="flex flex-col items-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(200,163,87,0.45)] bg-gradient-to-br from-[rgba(200,163,87,0.18)] to-transparent">
                        <Scale size={32} className="text-[#D4AF6E]" strokeWidth={1.5} />
                    </div>
                    <p className="font-heading text-lg font-black uppercase tracking-[0.2em] text-white">
                        Advocate
                    </p>
                    <p className="mt-1 font-heading text-2xl font-black tracking-tight text-[#D4AF6E]">
                        Prateek
                    </p>
                    <p className="mt-3 max-w-[18ch] text-center text-[11px] leading-relaxed text-white/60">
                        Litigation, corporate, real estate, RERA, white collar defense.
                    </p>
                </div>

                {/* Base row */}
                <div className="mt-auto flex items-center justify-between border-t border-[rgba(200,163,87,0.18)] pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="text-white/45">Delhi / London</span>
                    <span className="text-[#D4AF6E]">Counsel</span>
                </div>
            </div>
        </div>
    );
}

/* ───────────── Blackboard: circular portfolio dial ───────────── */
function BlackboardSpecimen() {
    const segments = 10;
    return (
        <div
            className={`${containerBase} aspect-[4/5] bg-primary p-7 sm:p-9`}
            style={{
                backgroundImage:
                    "radial-gradient(ellipse at 50% 100%, rgba(91,192,235,0.2) 0%, transparent 60%), linear-gradient(180deg, #0A1C30 0%, #050E1B 100%)",
            }}
        >
            {/* Top row */}
            <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Blackboard / Portfolio
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                    10 Campaigns
                </span>
            </div>

            {/* Dial */}
            <div className="relative mx-auto aspect-square w-[82%]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-6 rounded-full border border-white/5" />

                {/* Dots around the ring */}
                {Array.from({ length: segments }).map((_, i) => {
                    const angle = (i / segments) * 360 - 90;
                    const active = i === 2;
                    return (
                        <div
                            key={i}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                transform: `rotate(${angle}deg) translateX(45%) rotate(${-angle}deg)`,
                            }}
                        >
                            <div
                                className={`h-3 w-3 rounded-full ${active ? "bg-cyan shadow-[0_0_18px_2px_rgba(91,192,235,0.6)]" : "bg-white/20"}`}
                            />
                        </div>
                    );
                })}

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                        Now Showing
                    </span>
                    <p className="mt-1 font-heading text-base font-black leading-tight text-white">
                        Activation 03
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-cyan">
                        Unboxed / 2025
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span>Brand Experience</span>
                <span className="text-cyan">Scroll →</span>
            </div>
        </div>
    );
}

/* ───────────── SSBE: document stack with scan verify ───────────── */
function SSBESpecimen() {
    return (
        <div className={`${containerBase} aspect-[4/5] bg-bg p-6 sm:p-8`}>
            {/* Chrome */}
            <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-sm font-black uppercase tracking-[0.22em] text-primary">
                    SSBE
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-ocean/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ocean">
                    <ShieldCheck size={10} />
                    ISO Certified
                </span>
            </div>

            {/* Document stack */}
            <div className="relative mb-6 h-44">
                {/* Back doc */}
                <div className="absolute left-4 top-4 h-40 w-full max-w-[78%] rotate-[-3deg] rounded-xl border border-border bg-white shadow-[0_10px_30px_-10px_rgba(12,35,64,0.18)]" />
                {/* Middle doc */}
                <div className="absolute left-2 top-2 h-40 w-full max-w-[86%] rotate-[2deg] rounded-xl border border-border bg-white shadow-[0_10px_30px_-10px_rgba(12,35,64,0.18)]" />
                {/* Front doc */}
                <div className="relative h-40 w-full max-w-[94%] rounded-xl border border-border bg-white p-4 shadow-[0_16px_40px_-14px_rgba(12,35,64,0.25)]">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ocean">
                            DMS / Record 00842
                        </span>
                        <FileText size={12} className="text-muted" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-primary/10" />
                        <div className="h-1.5 w-[90%] rounded-full bg-primary/10" />
                        <div className="h-1.5 w-[76%] rounded-full bg-primary/10" />
                        <div className="h-1.5 w-full rounded-full bg-primary/10" />
                        <div className="h-1.5 w-[82%] rounded-full bg-primary/10" />
                    </div>

                    {/* Scan line */}
                    <div className="pointer-events-none absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
                </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                <DocStat label="Scanned" value="2.8M" />
                <DocStat label="Sectors" value="12" />
                <DocStat label="SLAs" value="99.4%" />
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <Search size={11} />
                Ready for audit
            </div>
        </div>
    );
}

function DocStat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-0.5 font-heading text-base font-black text-primary">{value}</p>
        </div>
    );
}
