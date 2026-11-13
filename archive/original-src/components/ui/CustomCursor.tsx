"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface CursorState {
    x: number;
    y: number;
    scale: number;
    label: string;
    variant: "default" | "link" | "button" | "text" | "image" | "drag";
}

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<HTMLDivElement[]>([]);
    const pos = useRef({ x: 0, y: 0 });
    const trailPos = useRef(Array.from({ length: 8 }, () => ({ x: 0, y: 0 })));
    const [state, setState] = useState<CursorState>({
        x: 0, y: 0, scale: 1, label: "", variant: "default",
    });
    const [visible, setVisible] = useState(false);
    const rafRef = useRef<number>(0);
    const isTouch = useSyncExternalStore(
        (callback) => {
            if (typeof window === "undefined") return () => { };

            const mediaQuery = window.matchMedia("(pointer: coarse)");
            mediaQuery.addEventListener("change", callback);

            return () => mediaQuery.removeEventListener("change", callback);
        },
        () => typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0),
        () => false
    );

    useEffect(() => {
        if (isTouch) return;

        document.body.classList.add("custom-cursor-active");

        const onMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            setVisible(true);
        };

        const onMouseEnter = () => setVisible(true);
        const onMouseLeave = () => setVisible(false);

        // Detect hover targets
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a, button, [data-cursor='link']");
            const image = target.closest("[data-cursor='image']");
            const drag = target.closest("[data-cursor='drag']");

            if (drag) {
                setState((s) => ({ ...s, scale: 1, variant: "drag", label: "Drag" }));
            } else if (image) {
                setState((s) => ({ ...s, scale: 1, variant: "image", label: "View" }));
            } else if (link) {
                const isButton = target.closest("button") || target.closest("[data-cursor='button']");
                setState((s) => ({
                    ...s,
                    scale: 1,
                    variant: isButton ? "button" : "link",
                    label: "",
                }));
            } else {
                setState((s) => ({ ...s, scale: 1, variant: "default", label: "" }));
            }
        };

        const updateCursor = () => {
            if (!cursorRef.current) return;

            // Update trail positions with lag
            for (let i = trailPos.current.length - 1; i >= 0; i--) {
                const target = i === 0 ? pos.current : trailPos.current[i - 1];
                trailPos.current[i].x += (target.x - trailPos.current[i].x) * 0.12;
                trailPos.current[i].y += (target.y - trailPos.current[i].y) * 0.12;

                if (trailRefs.current[i]) {
                    trailRefs.current[i].style.transform =
                        `translate(${trailPos.current[i].x}px, ${trailPos.current[i].y}px) translate(-50%, -50%)`;
                }
            }

            // Smooth cursor follow
            cursorRef.current.style.transform =
                `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${state.scale})`;

            rafRef.current = requestAnimationFrame(updateCursor);
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseover", onMouseOver);

        rafRef.current = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseover", onMouseOver);
            document.body.classList.remove("custom-cursor-active");
            cancelAnimationFrame(rafRef.current);
        };
    }, [isTouch, state.scale]);

    if (isTouch) return null;

    const variantStyles: Record<string, string> = {
        default: "w-3 h-3 bg-accent border-none",
        link: "w-12 h-12 bg-white/15 border border-accent/50 backdrop-blur-sm",
        button: "w-14 h-14 bg-accent/12 border border-accent",
        text: "w-12 h-1 rounded-full bg-primary",
        image: "w-20 h-20 bg-primary",
        drag: "w-20 h-20 bg-accent",
    };

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,background,border] duration-150 ease-out flex items-center justify-center ${variantStyles[state.variant]}`}
                style={{ opacity: visible ? 1 : 0 }}
            >
                {state.label && (
                    <span className="text-[11px] font-semibold text-bg select-none">
                        {state.label}
                    </span>
                )}
            </div>

            {/* Trail dots */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { if (el) trailRefs.current[i] = el; }}
                    className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full bg-accent"
                    style={{
                        width: `${8 - i}px`,
                        height: `${8 - i}px`,
                        opacity: visible ? 0.4 - i * 0.05 : 0,
                        transition: "opacity 0.2s",
                    }}
                />
            ))}
        </>
    );
}
