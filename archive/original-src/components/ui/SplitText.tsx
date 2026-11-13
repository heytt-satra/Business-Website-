"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
    text: string;
    mode?: "words" | "lines" | "chars";
    className?: string;
    staggerDelay?: number;
    duration?: number;
    once?: boolean;
    delay?: number;
}

/**
 * Split text into words, lines, or characters with staggered Framer Motion reveal.
 * Each unit is wrapped in an overflow:hidden container with a clipreveal child.
 */
export default function SplitText({
    text,
    mode = "words",
    className = "",
    staggerDelay = 0.055,
    duration = 0.65,
    once = true,
    delay = 0,
}: SplitTextProps) {
    const units = useMemo(() => {
        switch (mode) {
            case "lines":
                return text.split("\n");
            case "chars":
                return text.split("");
            case "words":
            default:
                return text.split(" ");
        }
    }, [text, mode]);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const unitVariants: Variants = {
        hidden: { y: "110%", opacity: 1 },
        visible: {
            y: "0%",
            opacity: 1,
            transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.span
            className={`inline ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-80px" }}
        >
            {units.map((unit, i) => (
                <span
                    key={`${unit}-${i}`}
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: "top" }}
                >
                    <motion.span className="inline-block" variants={unitVariants}>
                        {unit}
                        {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
