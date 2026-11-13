"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";



if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function HomeCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const headline = headlineRef.current;
        if (!headline) return;

        const ctx = gsap.context(() => {
            const chars = headline.querySelectorAll(".cta-char");
            gsap.fromTo(chars,
                { opacity: 0, y: 30, scale: 0 },
                {
                    opacity: 1, y: 0, scale: 1,
                    stagger: 0.025,
                    ease: "back.out(1.7)",
                    scrollTrigger: { trigger: headline, start: "top 75%" },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const text = "Ready to build\nsomething great?";
    const lines = text.split("\n");

    /* Split into words so natural word-wrap is preserved on narrow screens */
    let charIndex = 0;
    const lineWords = lines.map((line) =>
        line.split(" ").map((word) => {
            const chars = word.split("").map((char) => ({ char, index: charIndex++ }));
            charIndex++; // account for the space
            return chars;
        })
    );

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-bg px-5 py-20 sm:px-6 sm:py-28 md:px-20 md:py-40">
            {/* Background Delta Arrow */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] select-none"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="" className="h-auto w-[clamp(180px,35vw,500px)]" />
            </motion.div>

            <div className="relative z-10 mx-auto max-w-5xl text-center">
                <h2 ref={headlineRef} className="heading-xl mb-6 text-[clamp(32px,8vw,64px)]">
                    {lineWords.map((words, li) => (
                        <span key={li} className="block">
                            {words.map((chars, wi) => (
                                <span key={`${li}-${wi}`} className="inline-block whitespace-nowrap">
                                    {chars.map(({ char, index }) => (
                                        <span key={index} className="cta-char inline-block">
                                            {char}
                                        </span>
                                    ))}
                                    {wi < words.length - 1 && <span className="cta-char inline-block">&nbsp;</span>}
                                </span>
                            ))}
                        </span>
                    ))}
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-base text-muted sm:mb-12 sm:text-lg"
                >
                    We take on 3 new projects every month. Spots fill fast.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
                >
                    <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all group hover:scale-[1.03] hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                    >
                        Start a Project
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/work"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-border-dark px-7 py-3.5 text-base font-medium text-primary transition-all hover:border-accent hover:bg-accent-light hover:text-accent sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                    >
                        Explore Our Work
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
