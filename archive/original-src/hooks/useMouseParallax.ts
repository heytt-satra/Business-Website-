"use client";

import { useRef, useEffect, useCallback } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface MouseParallaxOptions {
    strength?: number;
    invert?: boolean;
    ease?: number;
}

/**
 * Mouse-driven parallax effect. Applies transform directly to DOM
 * (no React state) for buttery 60fps performance.
 *
 * @param strength - Max pixel displacement (default 15)
 * @param invert - Move opposite to cursor (default false)
 * @param ease - Lerp factor 0-1, lower = smoother (default 0.08)
 * @returns ref to attach to target element
 */
export function useMouseParallax<T extends HTMLElement>({
    strength = 15,
    invert = false,
    ease = 0.08,
}: MouseParallaxOptions = {}) {
    const ref = useRef<T>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            // Normalize to -1 → +1 range from center
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            const dir = invert ? -1 : 1;
            mouseRef.current.x = nx * strength * dir;
            mouseRef.current.y = ny * strength * dir;
        },
        [strength, invert]
    );

    useEffect(() => {
        // Bail on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        window.addEventListener("mousemove", onMouseMove, { passive: true });

        const tick = () => {
            currentRef.current.x = lerp(currentRef.current.x, mouseRef.current.x, ease);
            currentRef.current.y = lerp(currentRef.current.y, mouseRef.current.y, ease);

            if (ref.current) {
                ref.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [onMouseMove, ease]);

    return ref;
}
