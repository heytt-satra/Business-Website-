"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CtaBanner() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const bg = section.querySelector(".cta-bg");
            const text = section.querySelector(".cta-text");

            // Background wipe from left
            if (bg) {
                gsap.fromTo(
                    bg,
                    { scaleX: 0, transformOrigin: "left center" },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Text slides in from right
            if (text) {
                gsap.fromTo(
                    text,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 60%",
                        },
                    }
                );
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-28 px-6">
            {/* Animated background */}
            <div className="cta-bg absolute inset-0 bg-navy" />

            {/* Content */}
            <div className="cta-text relative z-10 mx-auto max-w-3xl text-center">
                <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
                    Ready to build something{" "}
                    <span className="text-cyan">extraordinary</span>?
                </h2>
                <Button label="Let's Talk" href="/contact" variant="primary" glow />
            </div>
        </section>
    );
}
