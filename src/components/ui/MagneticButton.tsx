"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    radius?: number;
    strength?: number;
    className?: string;
    [key: string]: unknown;
}

/**
 * Magnetic button wrapper — cursor attracts the button within a radius.
 * Uses Framer Motion springs for smooth return.
 */
export default function MagneticButton({
    children,
    radius = 80,
    strength = 0.35,
    className = "",
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const springX = useSpring(0, { stiffness: 150, damping: 15 });
    const springY = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
            springX.set(dx * strength);
            springY.set(dy * strength);
        } else {
            springX.set(0);
            springY.set(0);
        }
    };

    const handleMouseLeave = () => {
        springX.set(0);
        springY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
