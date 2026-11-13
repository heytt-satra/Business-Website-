"use client";

import Image from "next/image";
import { useState } from "react";

export default function TeraLogo({
    variant = "icon",
    className = "",
}: {
    variant?: "icon" | "horizontal";
    className?: string;
}) {
    const [imgError, setImgError] = useState(false);

    if (variant === "icon") {
        if (!imgError) {
            return (
                <Image
                    src="/logo-icon.png"
                    alt="Tera Industries"
                    width={48}
                    height={48}
                    className={className}
                    onError={() => setImgError(true)}
                    priority
                />
            );
        }
        return <FallbackIcon className={className} />;
    }

    // Horizontal variant
    if (!imgError) {
        return (
            <Image
                src="/logo-horizontal.png"
                alt="Tera Industries"
                width={200}
                height={48}
                className={`object-contain object-left ${className}`}
                onError={() => setImgError(true)}
                priority
            />
        );
    }

    return <FallbackHorizontal className={className} />;
}

/* ── Fallback SVGs (used only if image files are missing) ── */

function FallbackIcon({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-label="Tera Industries">
            <defs>
                <linearGradient id="fi" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A1A3B" />
                    <stop offset="100%" stopColor="#6CD4E8" />
                </linearGradient>
            </defs>
            <path d="M6 58 L58 6 L38 26 L50 14 L28 42 L40 30 L6 58Z" fill="url(#fi)" strokeLinejoin="round" />
            <path d="M6 58 L20 38 L14 46Z" fill="url(#fi)" />
            <path d="M44 20 L58 6 L48 12Z" fill="url(#fi)" />
        </svg>
    );
}

function FallbackHorizontal({ className }: { className: string }) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <FallbackIcon className="h-8 w-8" />
            <div className="flex flex-col leading-none">
                <span className="font-heading text-[1.15rem] font-bold tracking-wide text-navy">TERA</span>
                <span className="font-heading text-[0.5rem] font-semibold tracking-[0.3em] text-navy/60">INDUSTRIES</span>
            </div>
        </div>
    );
}
