"use client";

const row1Items = [
    "/ MVP Development",
    "+ SaaS Platforms",
    "/ AI Integrations",
    "+ Web Design",
    "/ Mobile Apps",
    "+ Automation",
    "/ Product Strategy",
    "+ Ship Fast",
];

const row2Items = [
    "/ Build Different",
    "+ Think First",
    "/ Deploy Anywhere",
    "+ Code Quality",
    "/ User-Centric",
    "+ Scale Smart",
    "/ Zero to Live",
    "+ Tera Industries",
];

export default function MarqueeTicker() {
    return (
        <section className="h-[100px] overflow-hidden bg-dark-surface sm:h-[128px] md:h-[160px]">
            <div className="flex h-full flex-col justify-center gap-1.5 sm:gap-2.5 md:gap-3">
                {/* Row 1: Left */}
                <div className="marquee-row relative">
                    <div className="marquee-left flex whitespace-nowrap" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
                        {[...row1Items, ...row1Items].map((item, i) => (
                            <span key={i} className="mx-3 inline-flex items-center sm:mx-5 md:mx-8">
                                <span
                                    className="text-[clamp(18px,5vw,56px)] font-bold uppercase tracking-tight"
                                    style={{ color: item.startsWith("+") ? undefined : "#F8F7F4" }}
                                >
                                    {item.startsWith("+") ? (
                                        <>
                                            <span className="text-accent">+</span>
                                            <span className="text-bg">{item.slice(1)}</span>
                                        </>
                                    ) : (
                                        item
                                    )}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Edge masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-dark-surface to-transparent sm:w-16 md:w-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-dark-surface to-transparent sm:w-16 md:w-20" />
                </div>

                {/* Row 2: Right */}
                <div className="marquee-row relative">
                    <div className="marquee-right flex whitespace-nowrap" style={{ "--marquee-speed": "35s" } as React.CSSProperties}>
                        {[...row2Items, ...row2Items].map((item, i) => (
                            <span key={i} className="mx-3 inline-flex items-center sm:mx-5 md:mx-8">
                                <span className="text-[clamp(18px,5vw,56px)] font-bold uppercase tracking-tight text-muted">
                                    {item.startsWith("+") ? (
                                        <>
                                            <span className="text-accent-2">+</span>
                                            {item.slice(1)}
                                        </>
                                    ) : (
                                        item
                                    )}
                                </span>
                            </span>
                        ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-dark-surface to-transparent sm:w-16 md:w-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-dark-surface to-transparent sm:w-16 md:w-20" />
                </div>
            </div>
        </section>
    );
}
