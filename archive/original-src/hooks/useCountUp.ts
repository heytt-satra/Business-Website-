"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const easeOutExpo = (t: number): number =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

interface CountUpOptions {
    from?: number;
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}

/**
 * Count-up animation hook with easeOutExpo easing.
 * Triggers when the element enters the viewport.
 *
 * @returns [ref, displayValue]
 */
export function useCountUp<T extends HTMLElement>({
    from = 0,
    to,
    duration = 2000,
    prefix = "",
    suffix = "",
}: CountUpOptions): [React.RefObject<T | null>, string] {
    const ref = useRef<T>(null);
    const [display, setDisplay] = useState(`${prefix}${from}${suffix}`);
    const hasRun = useRef(false);

    const animate = useCallback(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const startTime = performance.now();

        const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const value = Math.round(from + (to - from) * easedProgress);
            setDisplay(`${prefix}${value}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }, [from, to, duration, prefix, suffix]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    return [ref, display];
}
