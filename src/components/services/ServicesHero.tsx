"use client";

import { motion } from "framer-motion";
import TeraLogo from "@/components/ui/TeraLogo";

export default function ServicesHero() {
    return (
        <section className="relative overflow-hidden bg-light-grey py-32 px-6">
            {/* Floating delta shapes */}
            <div className="pointer-events-none absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute opacity-[0.04]"
                        style={{
                            top: `${15 + i * 14}%`,
                            left: `${10 + ((i * 37) % 80)}%`,
                            width: `${30 + i * 10}px`,
                            height: `${30 + i * 10}px`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <TeraLogo variant="icon" className="h-full w-full" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-4xl font-bold text-navy md:text-6xl"
                >
                    Everything You Need to Build and Scale
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted md:text-xl"
                >
                    From first sketch to full automation — we do it all under one roof.
                </motion.p>
            </div>
        </section>
    );
}
