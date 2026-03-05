"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSnapshot() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // No horizontal scroll on mobile

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            const totalScroll = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Stagger fade-in for each card as it enters
            const cards = track.querySelectorAll(".service-card");
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: gsap.getById?.("horiz") || undefined,
                            start: "left 80%",
                            end: "left 40%",
                            scrub: 1,
                            // Use the main section as scroller trigger
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white"
        >
            {/* Heading (stays visible at top) */}
            <div className="px-6 pt-24 pb-8">
                <SectionHeading eyebrow="Our Expertise" title="What We Do" />
            </div>

            {/* Mobile: Normal grid */}
            {isMobile ? (
                <div className="grid gap-6 px-6 pb-24 sm:grid-cols-2">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            ) : (
                /* Desktop: Horizontal scroll track */
                <div
                    ref={trackRef}
                    className="flex gap-8 px-12 pb-24"
                    style={{ width: `${services.length * 420 + 100}px` }}
                >
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            className="service-card shrink-0"
                            style={{ width: "380px" }}
                        >
                            <ServiceCard service={service} index={i} />
                        </div>
                    ))}
                </div>
            )}

            {/* Scroll progress bar */}
            {!isMobile && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full bg-light-grey overflow-hidden">
                    <ScrollProgressBar sectionRef={sectionRef} />
                </div>
            )}
        </section>
    );
}

function ScrollProgressBar({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const bar = barRef.current;
        if (!section || !bar) return;

        const ctx = gsap.context(() => {
            gsap.to(bar, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, [sectionRef]);

    return (
        <div
            ref={barRef}
            className="h-full w-full origin-left bg-cyan rounded-full"
            style={{ transform: "scaleX(0)" }}
        />
    );
}

function ServiceCard({
    service,
    index = 0,
}: {
    service: (typeof services)[number];
    index?: number;
}) {
    const [flipped, setFlipped] = useState(false);
    const Icon = service.icon;

    return (
        <div
            className="group relative h-72 cursor-pointer"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div
                className="relative h-full w-full transition-transform duration-500"
                style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-light-grey bg-white p-8 text-center shadow-sm"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg text-cyan transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan/10">
                        <Icon size={32} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-navy">{service.title}</h3>
                    <p className="text-sm text-muted">{service.shortDescription}</p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-navy p-8 text-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-cyan">
                        <Icon size={32} />
                    </div>
                    <p className="text-sm font-medium text-white">{service.proofPoint}</p>
                </div>
            </div>
        </div>
    );
}
