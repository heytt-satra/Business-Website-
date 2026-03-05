"use client";

import { CheckCircle, X, Minus } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const rows = [
    {
        feature: "Turnaround Speed",
        tera: "Weeks",
        agency: "Months",
        freelancer: "Variable",
    },
    {
        feature: "Full-stack capability",
        tera: "Yes",
        agency: "Partial",
        freelancer: "Rare",
    },
    {
        feature: "AI & Automation",
        tera: "Yes — Native",
        agency: "No — Outsourced",
        freelancer: "No",
    },
    {
        feature: "Fixed pricing",
        tera: "Yes",
        agency: "No — Hourly",
        freelancer: "Variable",
    },
    {
        feature: "Ongoing support",
        tera: "Yes",
        agency: "Paid retainer",
        freelancer: "Unreliable",
    },
    {
        feature: "Single point of contact",
        tera: "Yes",
        agency: "Account manager chain",
        freelancer: "Yes",
    },
];

function CellIcon({ value }: { value: string }) {
    if (value.startsWith("Yes")) {
        return (
            <span className="flex items-center gap-1.5 text-cyan font-semibold">
                <CheckCircle size={16} /> {value}
            </span>
        );
    }
    if (value.startsWith("No")) {
        return (
            <span className="flex items-center gap-1.5 text-red-400">
                <X size={16} /> {value}
            </span>
        );
    }
    return (
        <span className="flex items-center gap-1.5 text-muted">
            <Minus size={16} /> {value}
        </span>
    );
}

export default function ComparisonTable() {
    return (
        <section className="bg-bg py-24 px-6">
            <div className="mx-auto max-w-5xl">
                <SectionHeading title="Why Tera vs. The Alternatives" />

                <ScrollReveal>
                    <div className="overflow-x-auto rounded-2xl border border-light-grey bg-white shadow-sm">
                        <table className="w-full min-w-[600px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-light-grey bg-bg">
                                    <th className="px-6 py-4 font-semibold text-navy">Feature</th>
                                    <th className="px-6 py-4 font-semibold text-cyan">
                                        Tera Industries
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-muted">
                                        Typical Agency
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-muted">
                                        Freelancer
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr
                                        key={row.feature}
                                        className={i % 2 === 0 ? "" : "bg-bg/50"}
                                    >
                                        <td className="px-6 py-4 font-medium text-navy">
                                            {row.feature}
                                        </td>
                                        <td className="px-6 py-4">
                                            <CellIcon value={row.tera} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <CellIcon value={row.agency} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <CellIcon value={row.freelancer} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
