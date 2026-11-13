"use client";

import { services } from "@/data/services";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function ServiceDetail({
    index,
}: {
    index: number;
}) {
    const service = services[index];
    if (!service) return null;

    const Icon = service.icon;
    const isReversed = index % 2 === 1;

    return (
        <section
            id={service.id}
            className={`py-20 px-6 ${index % 2 === 0 ? "bg-white" : "bg-bg"}`}
        >
            <div
                className={`mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                    }`}
            >
                {/* Visual / Illustration */}
                <ScrollReveal
                    direction={isReversed ? "right" : "left"}
                    className="flex w-full items-center justify-center md:w-1/2"
                >
                    <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-navy/5 to-cyan/10 md:h-80">
                        <Icon size={80} className="text-cyan/40" />
                    </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal
                    direction={isReversed ? "left" : "right"}
                    className="w-full md:w-1/2"
                >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                        <Icon size={24} />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-navy">{service.title}</h2>
                    <p className="mb-6 text-base text-muted leading-relaxed">
                        {service.description}
                    </p>
                    <ul className="mb-8 space-y-3">
                        {service.features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-3 text-sm text-body-text"
                            >
                                <CheckCircle size={18} className="shrink-0 text-cyan" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Button label={service.cta} href="/contact" variant="primary" />
                </ScrollReveal>
            </div>
        </section>
    );
}
