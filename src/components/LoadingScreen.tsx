"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loading screen with Delta Arrow SVG stroke draw animation,
 * progress bar, and scale-out exit. Gates all page entry animations.
 */
export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar
        const duration = 1400;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const p = Math.min(elapsed / duration, 1);
            setProgress(p * 100);

            if (p < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);

        // Exit after 2s
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
                >
                    {/* Progress bar at top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-border">
                        <motion.div
                            className="h-full bg-accent"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Delta Arrow logo icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="Loading..."
                            className="w-20 h-20 object-contain"
                        />
                    </motion.div>

                    {/* Brand name */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
                    >
                        Tera Industries
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
