"use client";

import { Star } from "lucide-react";

const row1 = [
    { quote: "Tera built our entire SaaS MVP in under 5 weeks. The code quality was genuinely unreal.", author: "Alex R.", role: "Founder, Buildloop" },
    { quote: "The AI integration they built doubled our user engagement within the first month.", author: "Priya S.", role: "CTO, NexaAI" },
    { quote: "Our website went from embarrassing to award-worthy. Our qualified leads tripled.", author: "James K.", role: "CEO, Vortex Labs" },
];

const row2 = [
    { quote: "They don't just execute — they think strategically. Every decision had a clear reason behind it.", author: "Sarah M.", role: "CPO, FlowStack" },
    { quote: "Fastest team I've ever worked with. Shipped and deployed before I even expected update emails.", author: "Ravi P.", role: "Founder, DevForge" },
    { quote: "Our app went from concept to App Store in 6 weeks. Absolutely mental pace, incredible quality.", author: "Chidi A.", role: "Founder, SprintKit" },
];

export default function Testimonials() {
    return (
        <section className="bg-bg py-20 sm:py-24 md:py-28 overflow-hidden">
            <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-6 md:px-20 md:mb-16">
                <p className="label-mono mb-4">Client Love</p>
                <h2 className="heading-lg text-center md:text-left">Don&apos;t take{"\n"}our word for it.</h2>
            </div>

            {/* Row 1 — Left */}
            <div className="marquee-row relative mb-6">
                <div className="marquee-left flex gap-6" style={{ "--marquee-speed": "35s" } as React.CSSProperties}>
                    {[...row1, ...row1, ...row1].map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} />
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
            </div>

            {/* Row 2 — Right */}
            <div className="marquee-row relative">
                <div className="marquee-right flex gap-6" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
                    {[...row2, ...row2, ...row2].map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} />
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial }: { testimonial: typeof row1[number] }) {
    return (
        <div className="shrink-0 w-[84vw] max-w-[380px] rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md sm:p-8">
            <div className="text-4xl text-accent-light mb-4">&ldquo;</div>
            <p className="text-base text-primary leading-relaxed mb-6">{testimonial.quote}</p>
            <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <p className="text-sm font-bold text-primary">{testimonial.author}</p>
            <p className="text-xs font-mono text-muted">{testimonial.role}</p>
        </div>
    );
}
