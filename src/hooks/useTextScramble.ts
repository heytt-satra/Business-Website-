"use client";

import { useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleOptions {
    cycles?: number;
    intervalMs?: number;
}

/**
 * Text scramble effect. Returns [displayText, triggerScramble, resetText].
 * On trigger, text cycles through random characters before resolving.
 */
export function useTextScramble(
    text: string,
    { cycles = 3, intervalMs = 30 }: TextScrambleOptions = {}
): [string, () => void, () => void] {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const trigger = useCallback(() => {
        let iteration = 0;
        const maxIterations = text.length * cycles;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, i) => {
                        if (i < (iteration / maxIterations) * text.length) return text[i];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            iteration++;
            if (iteration > maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
            }
        }, intervalMs);
    }, [text, cycles, intervalMs]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    }, [text]);

    return [displayText, trigger, reset];
}
