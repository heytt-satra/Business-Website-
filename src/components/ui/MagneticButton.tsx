"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    radius?: number;
    strength?: number;
    className?: string;
    as?: "button" | "a" | "div";
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
    as: Component = "div",
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInRange, setIsInRange] = useState(false);

    const springX = useSpring(0, { stiffness: 150, damping: 15 });
    const springY = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
            setIsInRange(true);
            springX.set(dx * strength);
            springY.set(dy * strength);
        } else {
            setIsInRange(false);
            springX.set(0);
            springY.set(0);
        }
    };

    const handleMouseLeave = () => {
        setIsInRange(false);
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
