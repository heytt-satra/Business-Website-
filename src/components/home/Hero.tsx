"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const words = ["We Build Things", "That Actually", "Ship."];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-svh items-center overflow-hidden bg-bg px-5 sm:px-6 md:px-20"
        >
            {/* Single accent shape */}
            <div
                className="pointer-events-none absolute -right-20 top-[-80px] h-[280px] w-[280px] rounded-[28%] sm:h-[340px] sm:w-[340px] md:-right-28 md:top-[-110px] md:h-[420px] md:w-[420px]"
                style={{
                    background: "linear-gradient(140deg, rgba(27,107,154,0.95) 0%, rgba(91,192,235,0.9) 100%)",
                    transform: "rotate(16deg)",
                    opacity: 0.16,
                }}
            />

            <motion.div
                className="relative z-10 mx-auto w-full max-w-6xl pb-14 pt-24 sm:pb-16 sm:pt-28 md:pt-32"
                style={{ scale: heroScale, opacity: heroOpacity }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    className="label-mono mb-6"
                >
                    Product Studio
                </motion.p>

                <h1
                    className="mb-7 font-heading font-black text-primary tracking-[-0.045em]"
                    style={{
                        fontSize: "clamp(44px, 12vw, 132px)",
                        lineHeight: 0.95,
                        maxWidth: "11ch",
                    }}
                >
                    {words.map((line, i) => (
                        <span key={i} className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "104%" }}
                                animate={{ y: "0%" }}
                                transition={{
                                    delay: 0.15 + i * 0.12,
                                    duration: 0.75,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="inline-block"
                            >
                                {i === words.length - 1 ? (
                                    <>
                                        Ship<span className="text-accent">.</span>
                                    </>
                                ) : (
                                    line
                                )}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-9 text-[clamp(18px,4.8vw,40px)] text-muted sm:mb-11"
                    style={{ maxWidth: "20ch", lineHeight: 1.24 }}
                >
                    Launch-ready products for teams that need speed, clarity, and zero agency chaos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.62, duration: 0.55 }}
                    className="mb-12 flex flex-wrap items-center gap-4"
                >
                    <Link
                        href="/work"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_36px_rgba(12,35,64,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                    >
                        See Our Work
                        <ArrowRight size={18} />
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-base font-semibold text-primary transition-colors duration-200 hover:text-accent sm:w-auto sm:border-0 sm:px-6 sm:py-3.5"
                    >
                        Book a Call
                    </Link>
                </motion.div>

            </motion.div>
        </section>
    );
}
