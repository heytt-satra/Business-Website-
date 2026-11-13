"use client";

import {
    Users,
    Calendar,
    Award,
    MessageSquare,
    Wallet,
    Settings,
    Search,
    TrendingUp,
    Sparkles,
    Bell,
    Globe,
    Scale,
    BookOpen,
    Briefcase,
    ShieldCheck,
    FileText,
    Heart,
    MessageCircle,
    Plus,
    Check,
} from "lucide-react";

/*
 * Large browser-framed showcase shown below the hero.
 * One unique mockup per project. All on-palette (navy/ocean/cyan/light).
 */

const frameBase =
    "relative w-full overflow-hidden rounded-3xl border border-border bg-white shadow-[0_40px_100px_-40px_rgba(12,35,64,0.4)]";

export default function ProjectShowcase({ slug, title }: { slug: string; title: string }) {
    return (
        <div className="relative">
            {/* Ambient glow */}
            <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
                style={{
                    background:
                        "radial-gradient(ellipse at 30% 20%, rgba(91,192,235,0.22) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(27,107,154,0.18) 0%, transparent 55%)",
                }}
            />

            <div className={frameBase}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-bg px-3 py-2 sm:gap-3 sm:px-5 sm:py-4">
                    <div className="flex gap-1 sm:gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#FF5F57] sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-[#FEBC2E] sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-[#28C840] sm:h-2.5 sm:w-2.5" />
                    </div>
                    <div className="flex-1 truncate rounded-md bg-white px-2 py-1 text-center font-mono text-[9px] text-muted ring-1 ring-border sm:px-3 sm:py-1.5 sm:text-xs">
                        {urlFor(slug)}
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:inline">
                        {title}
                    </span>
                </div>

                {/* Body: taller on mobile so content has room, widescreen on desktop */}
                <div className="aspect-[4/5] w-full sm:aspect-[4/3] md:aspect-[16/10]">
                    {renderShowcase(slug)}
                </div>
            </div>
        </div>
    );
}

function urlFor(slug: string) {
    const map: Record<string, string> = {
        peerclub: "peerclub.community",
        "swarna-palace": "swarnapalace.com",
        profitpulse: "profitpulse.io",
        teraindustries: "teraindustries.com",
        "scale-your-dreams": "scaleyourdreams.com",
        "advocate-prateek": "advocateprateek.com",
        "blackboard-communications": "blackboard.co",
        ssbe: "ssbusinessenablers.com",
    };
    return map[slug] ?? "project.com";
}

function renderShowcase(slug: string) {
    switch (slug) {
        case "peerclub":
            return <PeerClubShowcase />;
        case "swarna-palace":
            return <SwarnaShowcase />;
        case "profitpulse":
            return <ProfitPulseShowcase />;
        case "teraindustries":
            return <TeraShowcase />;
        case "scale-your-dreams":
            return <ScaleShowcase />;
        case "advocate-prateek":
            return <AdvocateShowcase />;
        case "blackboard-communications":
            return <BlackboardShowcase />;
        case "ssbe":
            return <SSBEShowcase />;
        default:
            return <TeraShowcase />;
    }
}

/* ═══════════════════════ PEER CLUB ═══════════════════════ */
function PeerClubShowcase() {
    const nav = [
        { icon: Users, label: "Members" },
        { icon: Calendar, label: "Events", active: true },
        { icon: Award, label: "Experts" },
        { icon: MessageSquare, label: "Inbox" },
        { icon: Wallet, label: "Wallet" },
    ];
    const events = [
        { title: "Founder Roundtable", time: "Thu, 6:30pm", tag: "Invite Only", seats: "12 / 20" },
        { title: "AI Ops Deep Dive", time: "Sat, 4:00pm", tag: "Workshop", seats: "18 / 24" },
        { title: "Seed to Series A", time: "Mon, 7:00pm", tag: "Panel", seats: "Waitlist" },
    ];

    return (
        <div className="flex h-full w-full bg-bg">
            {/* Side nav */}
            <aside className="hidden w-44 flex-col border-r border-border bg-white p-4 md:flex">
                <div className="mb-6 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-ocean to-navy text-white">
                        <div className="flex h-full w-full items-center justify-center font-heading text-xs font-black">
                            PC
                        </div>
                    </div>
                    <span className="font-heading text-sm font-bold text-primary">PeerClub</span>
                </div>
                <nav className="flex flex-col gap-1">
                    {nav.map((item) => (
                        <div
                            key={item.label}
                            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${
                                item.active
                                    ? "bg-ocean/10 text-ocean"
                                    : "text-muted hover:bg-bg"
                            }`}
                        >
                            <item.icon size={14} />
                            {item.label}
                        </div>
                    ))}
                </nav>
                <div className="mt-auto rounded-xl bg-primary p-3 text-white">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-cyan">
                        Status
                    </p>
                    <p className="mt-1 text-xs font-semibold">Verified Founder</p>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 overflow-hidden p-3 sm:p-5 md:p-6">
                {/* Top bar */}
                <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4 sm:gap-3">
                    <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 ring-1 ring-border sm:gap-2 sm:px-3 sm:py-2">
                        <Search size={10} className="shrink-0 text-muted sm:h-3 sm:w-3" />
                        <span className="truncate text-[10px] text-muted sm:text-xs">Search events, experts</span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan/15 px-2 py-0.5 text-[9px] font-semibold text-ocean sm:px-2.5 sm:py-1 sm:text-[10px]">
                        <Check size={9} strokeWidth={3} />
                        <span className="hidden sm:inline">Verified</span>
                    </span>
                </div>

                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
                    Curated for you
                </p>
                <h3 className="mb-3 font-heading text-base font-black tracking-tight text-primary sm:mb-4 sm:text-xl md:text-2xl">
                    Upcoming events.
                </h3>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                    {events.slice(0, 3).map((e, i) => (
                        <div
                            key={e.title}
                            className={`rounded-lg border border-border bg-white p-2.5 transition-colors hover:border-ocean sm:rounded-xl sm:p-3 ${
                                i === 2 ? "hidden sm:block" : ""
                            }`}
                        >
                            <span className="font-mono text-[8px] uppercase tracking-wider text-ocean sm:text-[9px]">
                                {e.tag}
                            </span>
                            <p className="mt-0.5 text-xs font-bold leading-tight text-primary sm:mt-1 sm:text-sm">
                                {e.title}
                            </p>
                            <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-[11px]">{e.time}</p>
                            <div className="mt-2 flex items-center justify-between border-t border-border pt-1.5 sm:mt-3 sm:pt-2">
                                <span className="font-mono text-[8px] uppercase tracking-wider text-muted sm:text-[9px]">
                                    {e.seats}
                                </span>
                                <span className="text-[9px] font-semibold text-primary sm:text-[10px]">Book →</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-dashed border-border bg-white/60 p-2.5 sm:mt-4 sm:rounded-xl sm:p-3">
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <Sparkles size={12} className="shrink-0 text-cyan sm:h-3.5 sm:w-3.5" />
                        <p className="truncate text-[10px] text-primary sm:text-xs">
                            <span className="font-semibold">3 experts</span>
                            <span className="text-muted"> matched this week</span>
                        </p>
                    </div>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-ocean sm:text-[10px]">
                        View →
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════ SWARNA PALACE ═══════════════════════ */
function SwarnaShowcase() {
    const cats = ["Rings", "Necklaces", "Bracelets", "Earrings", "Pendants"];
    const products = [
        { label: "Aurora", price: "₹84,000", grad: "from-[#F4E9C6] to-[#D9C07C]" },
        { label: "Maharani", price: "₹1,24,000", grad: "from-[#E8D7A8] to-[#B08D3F]" },
        { label: "Sitara", price: "₹68,500", grad: "from-[#F7EEDA] to-[#C9A357]" },
        { label: "Paramjyoti", price: "₹98,000", grad: "from-[#EAD89A] to-[#8B6A2D]" },
    ];

    return (
        <div className="flex h-full w-full flex-col bg-[#FDFBF5]">
            {/* Top nav */}
            <div className="flex items-center justify-between border-b border-[#E8DCBE] px-3 py-2 sm:px-5 sm:py-3">
                <span className="font-heading text-xs font-black tracking-[0.18em] text-primary sm:text-base">
                    SWARNA
                </span>
                <div className="hidden items-center gap-5 md:flex">
                    {cats.map((c) => (
                        <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
                        >
                            {c}
                        </span>
                    ))}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary sm:text-[10px]">
                    0 Cart
                </span>
            </div>

            {/* Editorial hero */}
            <div className="flex-1 px-3 py-4 sm:px-5 sm:py-6">
                <div className="mb-4 flex items-end justify-between sm:mb-6">
                    <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#B08D3F] sm:text-[10px]">
                            Shop by Bond
                        </span>
                        <h3 className="mt-1 font-heading text-lg font-black leading-[1.05] tracking-tight text-primary sm:text-2xl md:text-3xl">
                            For the women <br className="hidden sm:inline" />{" "}
                            <span className="sm:hidden">who became</span>
                            <span className="hidden sm:inline">who became mothers.</span>
                            <span className="sm:hidden"> mothers.</span>
                        </h3>
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted sm:inline">
                        24 Pieces
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {products.map((p, i) => (
                        <div
                            key={p.label}
                            className={`aspect-[3/4] rounded-xl bg-gradient-to-br p-2 ring-1 ring-[#E8DCBE] sm:rounded-2xl sm:p-3 ${p.grad}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[8px] uppercase tracking-wider text-primary/60 sm:text-[9px]">
                                    0{i + 1}
                                </span>
                                {i === 0 && (
                                    <span className="rounded-full bg-primary px-1 py-0.5 text-[7px] font-semibold uppercase text-white sm:px-1.5 sm:text-[8px]">
                                        New
                                    </span>
                                )}
                            </div>
                            <svg viewBox="0 0 60 60" className="mx-auto my-1 h-8 w-8 sm:my-2 sm:h-10 sm:w-10" fill="none">
                                <circle cx="30" cy="38" r="14" stroke="#8B6A2D" strokeWidth="4" />
                                <path d="M22 22 L30 14 L38 22 L30 30 Z" fill="#5BC0EB" />
                            </svg>
                            <p className="mt-auto text-[10px] font-bold text-primary sm:text-[11px]">{p.label}</p>
                            <p className="font-mono text-[9px] text-primary/70 sm:text-[10px]">{p.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════ PROFITPULSE ═══════════════════════ */
function ProfitPulseShowcase() {
    const kpis = [
        { label: "Revenue", value: "$1.24M", change: "+12.4%", up: true },
        { label: "Net Profit", value: "$248K", change: "+18.2%", up: true },
        { label: "Avg ROAS", value: "3.8x", change: "+0.6", up: true },
        { label: "CAC", value: "$42", change: "-11%", up: true },
    ];
    const bars = [42, 56, 38, 62, 46, 72, 55, 81, 68, 79];

    return (
        <div className="flex h-full w-full bg-primary text-white">
            {/* Side nav */}
            <aside className="hidden w-44 flex-col border-r border-white/10 p-4 md:flex">
                <div className="mb-6 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan to-ocean">
                        <div className="flex h-full w-full items-center justify-center font-heading text-[10px] font-black text-white">
                            PP
                        </div>
                    </div>
                    <span className="font-heading text-xs font-bold">ProfitPulse</span>
                </div>
                <nav className="flex flex-col gap-1 text-xs">
                    {["Overview", "Integrations", "AI Analyst", "Reports", "Workspaces", "Settings"].map(
                        (item, i) => (
                            <div
                                key={item}
                                className={`rounded-lg px-2.5 py-1.5 ${
                                    i === 0 ? "bg-white/8 text-white" : "text-white/50"
                                }`}
                            >
                                {item}
                            </div>
                        ),
                    )}
                </nav>
                <div className="mt-auto rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-cyan">
                        Synced
                    </p>
                    <p className="mt-1 text-[10px]">Stripe · Shopify · Meta · Google</p>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 p-3 sm:p-5 md:p-6">
                <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
                    <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-[10px]">
                            Last 28 days
                        </p>
                        <h3 className="mt-0.5 font-heading text-base font-black tracking-tight text-white sm:mt-1 sm:text-xl md:text-2xl">
                            Morning Pulse.
                        </h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-1 ring-1 ring-white/10 sm:gap-2 sm:px-3 sm:py-1.5">
                        <Bell size={10} className="text-cyan sm:h-3 sm:w-3" />
                        <span className="hidden font-mono text-[10px] uppercase tracking-wider text-white/70 sm:inline">
                            Daily Digest
                        </span>
                    </div>
                </div>

                {/* KPI grid: 2 on mobile, 4 on md */}
                <div className="mb-3 grid grid-cols-2 gap-1.5 sm:mb-4 sm:gap-2 md:grid-cols-4 md:gap-3">
                    {kpis.map((k) => (
                        <div
                            key={k.label}
                            className="rounded-lg bg-white/[0.04] p-2 ring-1 ring-white/10 sm:rounded-xl sm:p-3"
                        >
                            <p className="font-mono text-[8px] uppercase tracking-wider text-white/45 sm:text-[9px]">
                                {k.label}
                            </p>
                            <p className="mt-0.5 font-heading text-sm font-black tracking-tight sm:mt-1 sm:text-lg">
                                {k.value}
                            </p>
                            <p className="mt-0.5 inline-flex items-center gap-0.5 text-[9px] font-medium text-emerald-300 sm:text-[10px]">
                                <TrendingUp size={9} />
                                {k.change}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-2 sm:gap-3">
                    {/* Chart */}
                    <div className="col-span-12 rounded-lg bg-white/[0.04] p-2 ring-1 ring-white/10 sm:rounded-xl sm:p-3 md:col-span-8">
                        <div className="mb-2 flex items-center justify-between sm:mb-3">
                            <p className="font-mono text-[9px] uppercase tracking-wider text-white/50 sm:text-[10px]">
                                Profit trend
                            </p>
                            <span className="font-mono text-[9px] text-cyan sm:text-[10px]">+18.2%</span>
                        </div>
                        <div className="flex h-12 items-end gap-1 sm:h-20 sm:gap-1.5">
                            {bars.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-t"
                                    style={{
                                        height: `${h}%`,
                                        background:
                                            i >= bars.length - 2
                                                ? "linear-gradient(180deg,#5BC0EB 0%, #1B6B9A 100%)"
                                                : "rgba(91,192,235,0.25)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {/* AI analyst */}
                    <div className="col-span-12 rounded-lg bg-white/[0.04] p-2 ring-1 ring-white/10 sm:rounded-xl sm:p-3 md:col-span-4">
                        <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2">
                            <Sparkles size={10} className="text-cyan sm:h-3 sm:w-3" />
                            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan sm:text-[10px]">
                                AI Analyst
                            </span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/75 sm:text-[11px]">
                            Shopify margin grew 6.4% while Meta CPA dropped 11. Shift $8k from
                            Google to Meta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════ TERAINDUSTRIES ═══════════════════════ */
function TeraShowcase() {
    return (
        <div className="relative flex h-full w-full bg-bg">
            {/* Grain */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* Top nav */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-border px-3 py-2 sm:px-5 sm:py-3">
                <span className="font-heading text-xs font-black uppercase tracking-[0.2em] text-primary sm:text-sm">
                    Tera
                </span>
                <div className="hidden items-center gap-6 md:flex">
                    {["Work", "Services", "About", "Blog"].map((i) => (
                        <span
                            key={i}
                            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
                        >
                            {i}
                        </span>
                    ))}
                </div>
                <span className="rounded-full bg-primary px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white sm:px-3 sm:py-1.5 sm:text-[10px]">
                    Start
                </span>
            </div>

            {/* Hero */}
            <div className="relative flex flex-1 flex-col items-center justify-center px-3 sm:px-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ocean sm:text-[10px]">
                    Featured Work
                </span>
                <h3 className="mt-2 text-center font-heading text-lg font-black leading-[0.98] tracking-tight text-primary sm:text-2xl md:text-3xl lg:text-4xl">
                    Products built.
                    <br />
                    Problems solved.
                </h3>

                {/* Mini tiles scattered: hide the middle one on very narrow screens */}
                <div className="relative mt-4 h-20 w-full max-w-xl sm:mt-6 sm:h-24">
                    <MiniTileT className="absolute left-[2%] top-0 h-10 w-14 rotate-[-5deg] bg-ocean text-white sm:h-14 sm:w-20" label="Dash" />
                    <MiniTileT className="absolute left-[24%] top-3 hidden h-12 w-10 rotate-[4deg] bg-white text-primary sm:block sm:h-16 sm:w-14" label="Profile" />
                    <MiniTileT className="absolute left-[30%] top-1 h-10 w-14 rotate-[-3deg] bg-cyan text-primary sm:left-[44%] sm:h-14 sm:w-20" label="Social" />
                    <MiniTileT className="absolute left-[58%] top-3 hidden h-10 w-12 rotate-[6deg] bg-primary text-white sm:block sm:h-14 sm:w-16" label="Portrait" />
                    <MiniTileT className="absolute right-[2%] top-0 h-10 w-14 rotate-[-4deg] bg-white text-primary sm:h-14 sm:w-20" label="Pricing" />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-wider text-muted sm:mt-4 sm:text-[10px]">
                    <span>09 Projects</span>
                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                    <span>Physics</span>
                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                    <span>GLSL</span>
                </div>
            </div>
        </div>
    );
}

function MiniTileT({ className, label }: { className: string; label: string }) {
    return (
        <div
            className={`flex flex-col justify-between rounded-lg border border-border px-2 py-1.5 shadow-[0_8px_20px_-8px_rgba(12,35,64,0.25)] ${className}`}
        >
            <span className="font-mono text-[8px] uppercase tracking-wider opacity-70">
                {label}
            </span>
            <span className="self-end text-[9px] font-bold">↗</span>
        </div>
    );
}

/* ═══════════════════════ SCALE YOUR DREAMS ═══════════════════════ */
function ScaleShowcase() {
    return (
        <div className="flex h-full w-full bg-bg">
            {/* Left sidebar */}
            <aside className="hidden w-40 flex-col border-r border-border bg-white p-4 md:flex">
                <span className="mb-6 font-heading text-sm font-black tracking-tight text-primary">
                    SYD
                </span>
                <nav className="flex flex-col gap-2 text-xs">
                    {["Feed", "Explore", "Book", "Testimonials", "About"].map((i, idx) => (
                        <span
                            key={i}
                            className={`rounded-lg px-2.5 py-1.5 ${
                                idx === 0 ? "bg-primary text-white" : "text-muted"
                            }`}
                        >
                            {i}
                        </span>
                    ))}
                </nav>
            </aside>

            {/* Feed */}
            <main className="flex-1 space-y-2.5 overflow-hidden p-3 sm:space-y-3 sm:p-5">
                <div className="flex items-center justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
                        Your Feed
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold text-white sm:px-2.5 sm:py-1 sm:text-[10px]">
                        <Plus size={10} />
                        Post
                    </span>
                </div>

                {/* Post card */}
                <article className="rounded-xl border border-border bg-white p-3 sm:rounded-2xl sm:p-4">
                    <div className="mb-2 flex items-center gap-2 sm:mb-3">
                        <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-cyan to-ocean sm:h-8 sm:w-8">
                            <div className="flex h-full w-full items-center justify-center font-heading text-[10px] font-black text-white">
                                S
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-primary">scaleyourdreams</p>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-muted">
                                2h · Agency
                            </p>
                        </div>
                    </div>
                    <p className="mb-2 text-xs font-semibold leading-snug text-primary sm:mb-3 sm:text-sm">
                        Your brand is not what you sell. It is who they remember.
                    </p>
                    <div className="aspect-[16/7] w-full rounded-lg bg-gradient-to-br from-primary via-ocean to-cyan sm:rounded-xl" />
                    <div className="mt-2.5 flex items-center justify-between text-muted sm:mt-3">
                        <div className="flex items-center gap-3 text-[11px] sm:gap-4 sm:text-xs">
                            <span className="inline-flex items-center gap-1">
                                <Heart size={11} className="sm:h-3 sm:w-3" /> 2.4k
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <MessageCircle size={11} className="sm:h-3 sm:w-3" /> 148
                            </span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-ocean sm:text-[10px]">
                            Book →
                        </span>
                    </div>
                </article>

                {/* Testimonial thread */}
                <div className="rounded-xl border border-dashed border-border bg-white/60 p-2.5 sm:rounded-2xl sm:p-3">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ocean sm:text-[10px]">
                        Testimonial thread · 12 replies
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted sm:text-xs">
                        &quot;They rebuilt our personal brand from positioning to feed. 3x inbound in
                        60 days.&quot;
                    </p>
                </div>
            </main>

            {/* Right rail */}
            <aside className="hidden w-40 border-l border-border bg-white p-4 lg:block">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Open slots
                </p>
                {["Discovery", "Audit", "Sprint"].map((s) => (
                    <div key={s} className="mb-2 rounded-lg bg-bg p-2">
                        <p className="text-[11px] font-semibold text-primary">{s}</p>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-ocean">
                            Book →
                        </p>
                    </div>
                ))}
            </aside>
        </div>
    );
}

/* ═══════════════════════ ADVOCATE PRATEEK ═══════════════════════ */
function AdvocateShowcase() {
    const practiceAreas = [
        { icon: Scale, label: "Litigation" },
        { icon: Briefcase, label: "Corporate Law" },
        { icon: Globe, label: "NRI Desk" },
        { icon: BookOpen, label: "RERA" },
        { icon: ShieldCheck, label: "White Collar" },
        { icon: FileText, label: "Real Estate" },
    ];
    return (
        <div
            className="flex h-full w-full flex-col text-white"
            style={{
                background:
                    "linear-gradient(180deg, #07182F 0%, #0C2340 100%), radial-gradient(ellipse at 80% 0%, rgba(200,163,87,0.15) 0%, transparent 55%)",
            }}
        >
            {/* Top nav */}
            <div className="flex items-center justify-between border-b border-[rgba(200,163,87,0.18)] px-3 py-2 sm:px-5 sm:py-3">
                <span className="font-heading text-xs font-black tracking-[0.2em] text-[#D4AF6E] sm:text-base">
                    PRATEEK
                </span>
                <div className="hidden items-center gap-5 md:flex">
                    {["Practice", "Team", "NRI", "Offices", "Grievance"].map((c) => (
                        <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60"
                        >
                            {c}
                        </span>
                    ))}
                </div>
                <span className="rounded-full border border-[#D4AF6E] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#D4AF6E] sm:px-3 sm:py-1 sm:text-[10px]">
                    Consult
                </span>
            </div>

            {/* Hero */}
            <div className="relative flex-1 p-3 sm:p-6">
                <div className="absolute inset-3 rounded-xl border border-[rgba(200,163,87,0.2)] sm:inset-6 sm:rounded-2xl" />
                <div className="relative px-2 pt-1 sm:px-0 sm:pt-0">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D4AF6E] sm:text-[10px]">
                        Est. 2010 · Delhi · London
                    </span>
                    <h3 className="mt-2 max-w-2xl font-heading text-lg font-black leading-[0.98] tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">
                        Counsel that travels <br className="hidden sm:block" />
                        with you.
                    </h3>
                    <p className="mt-2 max-w-md text-[11px] leading-relaxed text-white/60 sm:mt-3 sm:text-xs">
                        NRI legal representation, property disputes, and zero travel consultation.
                    </p>

                    {/* Practice area grid */}
                    <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-2 md:grid-cols-6">
                        {practiceAreas.map((p) => (
                            <div
                                key={p.label}
                                className="flex flex-col items-center gap-1 rounded-lg border border-[rgba(200,163,87,0.18)] bg-white/[0.03] p-2 sm:gap-1.5 sm:rounded-xl sm:p-3"
                            >
                                <p.icon size={14} className="text-[#D4AF6E] sm:h-4 sm:w-4" strokeWidth={1.5} />
                                <span className="text-center font-mono text-[8px] uppercase tracking-wider text-white/70 sm:text-[9px]">
                                    {p.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════ BLACKBOARD ═══════════════════════ */
function BlackboardShowcase() {
    const services = ["Experiential", "Events", "Promotions", "Exhibitions"];
    return (
        <div
            className="relative h-full w-full text-white"
            style={{
                background:
                    "radial-gradient(ellipse at 50% 100%, rgba(255,94,43,0.2) 0%, transparent 55%), linear-gradient(180deg, #0A1C30 0%, #040912 100%)",
            }}
        >
            {/* Top nav */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 sm:px-5 sm:py-3">
                <span className="font-heading text-xs font-black uppercase tracking-[0.22em] text-white sm:text-sm">
                    Blackboard
                </span>
                <div className="hidden items-center gap-5 md:flex">
                    {["Work", "Services", "Team", "Contact"].map((c) => (
                        <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55"
                        >
                            {c}
                        </span>
                    ))}
                </div>
                <span className="rounded-full bg-[#FF5E2B] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white sm:px-3 sm:py-1.5 sm:text-[10px]">
                    Brief Us
                </span>
            </div>

            {/* Hero with dial */}
            <div className="flex h-[calc(100%-40px)] items-center gap-4 px-3 sm:h-[calc(100%-45px)] sm:gap-6 sm:px-6">
                <div className="flex-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF8D6B] sm:text-[10px]">
                        Brand Experience
                    </span>
                    <h3 className="mt-1.5 font-heading text-xl font-black leading-[0.95] tracking-tight text-white sm:mt-2 sm:text-2xl md:text-3xl lg:text-4xl">
                        We build
                        <br />
                        moments.
                    </h3>
                    <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-white/60 sm:mt-3 sm:text-xs">
                        Experiential marketing, events, and exhibitions for brands that want to be
                        remembered.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                        {services.map((s) => (
                            <span
                                key={s}
                                className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/70 sm:px-2.5 sm:py-1 sm:text-[10px]"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Circular dial */}
                <div className="relative hidden aspect-square w-44 sm:block md:w-64">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="absolute inset-6 rounded-full border border-white/5" />
                    {Array.from({ length: 10 }).map((_, i) => {
                        const angle = (i / 10) * 360 - 90;
                        const active = i === 3;
                        return (
                            <div
                                key={i}
                                className="absolute left-1/2 top-1/2"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(45%) rotate(${-angle}deg)`,
                                }}
                            >
                                <div
                                    className={`h-3 w-3 rounded-full ${
                                        active
                                            ? "bg-[#FF5E2B] shadow-[0_0_18px_3px_rgba(255,94,43,0.5)]"
                                            : "bg-white/20"
                                    }`}
                                />
                            </div>
                        );
                    })}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                            Activation
                        </span>
                        <p className="mt-1 font-heading text-base font-black text-white">
                            Unboxed 25
                        </p>
                        <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#FF8D6B]">
                            Live Now
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════ SSBE ═══════════════════════ */
function SSBEShowcase() {
    const services = [
        { icon: FileText, label: "Document Scanning" },
        { icon: BookOpen, label: "DMS" },
        { icon: Briefcase, label: "Data Processing" },
        { icon: ShieldCheck, label: "Health Claims" },
        { icon: Users, label: "Manpower" },
        { icon: Award, label: "Government" },
    ];
    return (
        <div className="flex h-full w-full flex-col bg-white">
            {/* Top nav */}
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-5 sm:py-3">
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                    <div className="h-6 w-6 shrink-0 rounded-md bg-ocean text-white sm:h-7 sm:w-7">
                        <div className="flex h-full w-full items-center justify-center font-heading text-[9px] font-black sm:text-[10px]">
                            SS
                        </div>
                    </div>
                    <span className="truncate font-heading text-xs font-black text-primary sm:text-sm">
                        <span className="sm:hidden">SSBE</span>
                        <span className="hidden sm:inline">SS Business Enablers</span>
                    </span>
                </div>
                <div className="hidden items-center gap-5 md:flex">
                    {["Home", "Services", "Sectors", "About", "Contact"].map((c) => (
                        <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
                        >
                            {c}
                        </span>
                    ))}
                </div>
                <span className="shrink-0 rounded-full bg-primary px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white sm:px-3 sm:py-1.5 sm:text-[10px]">
                    Enquire
                </span>
            </div>

            <div className="flex-1 px-3 py-3 sm:px-6 sm:py-5">
                {/* Hero copy + badge */}
                <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4">
                    <div className="min-w-0">
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ocean sm:text-[10px]">
                            Digital Transformation
                        </span>
                        <h3 className="mt-1 max-w-lg font-heading text-lg font-black leading-[0.98] tracking-tight text-primary sm:mt-2 sm:text-2xl md:text-3xl">
                            Paper to data. <br className="hidden sm:block" /> Without the chaos.
                        </h3>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2 rounded-2xl border border-border bg-bg px-3 py-2 sm:flex">
                        <ShieldCheck size={14} className="text-ocean" />
                        <div>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-muted">
                                ISO 27001
                            </p>
                            <p className="text-xs font-semibold text-primary">Certified</p>
                        </div>
                    </div>
                </div>

                {/* Services grid: 3 on mobile, 6 on desktop */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-6">
                    {services.map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center gap-1 rounded-lg border border-border bg-bg p-2 transition-colors hover:border-ocean sm:gap-1.5 sm:rounded-xl sm:p-3"
                        >
                            <s.icon size={14} className="text-ocean sm:h-4 sm:w-4" strokeWidth={1.5} />
                            <span className="text-center font-mono text-[8px] uppercase tracking-wider text-primary sm:text-[9px]">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Stat strip */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
                    <div>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-muted sm:text-[9px]">
                            Documents
                        </p>
                        <p className="font-heading text-sm font-black text-primary sm:text-lg">2.8M+</p>
                    </div>
                    <div>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-muted sm:text-[9px]">
                            Sectors
                        </p>
                        <p className="font-heading text-sm font-black text-primary sm:text-lg">12</p>
                    </div>
                    <div>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-muted sm:text-[9px]">
                            SLA Met
                        </p>
                        <p className="font-heading text-sm font-black text-primary sm:text-lg">99.4%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
