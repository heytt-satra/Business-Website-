"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Full-screen curtain wipe page transition.
 * Accent-colored overlay scales Y on route changes.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                {/* Entrance curtain */}
                <motion.div
                    className="fixed inset-0 z-[9998] pointer-events-none bg-accent"
                    initial={{ scaleY: 1, transformOrigin: "bottom" }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Page content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {children}
                </motion.div>

                {/* Exit curtain — triggers on exit */}
                <motion.div
                    className="fixed inset-0 z-[9998] pointer-events-none bg-accent"
                    initial={{ scaleY: 0, transformOrigin: "top" }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.45, ease: "easeIn" }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
