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
        <section className="h-[118px] overflow-hidden bg-dark-surface sm:h-[138px] md:h-[160px]">
            <div className="flex h-full flex-col justify-center gap-2 sm:gap-3">
                {/* Row 1: Left */}
                <div className="marquee-row relative">
                    <div className="marquee-left flex whitespace-nowrap" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
                        {[...row1Items, ...row1Items].map((item, i) => (
                            <span key={i} className="mx-4 inline-flex items-center sm:mx-6 md:mx-8">
                                <span
                                    className="text-2xl font-bold uppercase tracking-tight sm:text-3xl md:text-[56px]"
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-dark-surface to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-dark-surface to-transparent" />
                </div>

                {/* Row 2: Right */}
                <div className="marquee-row relative">
                    <div className="marquee-right flex whitespace-nowrap" style={{ "--marquee-speed": "35s" } as React.CSSProperties}>
                        {[...row2Items, ...row2Items].map((item, i) => (
                            <span key={i} className="mx-4 inline-flex items-center sm:mx-6 md:mx-8">
                                <span className="text-2xl font-bold uppercase tracking-tight text-muted sm:text-3xl md:text-[56px]">
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-dark-surface to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-dark-surface to-transparent" />
                </div>
            </div>
        </section>
    );
}
