"use client";

import { motion } from "framer-motion";

interface FilterPillGroupProps {
    filters: string[];
    active: string;
    onSelect: (filter: string) => void;
}

/**
 * Filter pill group with a shared layoutId background for smooth active state transitions.
 */
export default function FilterPillGroup({
    filters,
    active,
    onSelect,
}: FilterPillGroupProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onSelect(filter)}
                    className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200"
                    style={{
                        color: active === filter ? "var(--color-bg)" : "var(--color-muted)",
                    }}
                >
                    {active === filter && (
                        <motion.span
                            layoutId="filter-active-pill"
                            className="absolute inset-0 rounded-full bg-primary"
                            style={{ zIndex: -1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    {active !== filter && (
                        <span
                            className="absolute inset-0 rounded-full border border-border"
                            style={{ zIndex: -1 }}
                        />
                    )}
                    <span className="relative z-10">{filter}</span>
                </button>
            ))}
        </div>
    );
}
