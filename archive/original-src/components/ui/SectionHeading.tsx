import ScrollReveal from "@/components/ui/ScrollReveal";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    centered = true,
    className = "",
}: SectionHeadingProps) {
    return (
        <ScrollReveal className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
            {eyebrow && (
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-cyan">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-3xl font-bold text-navy md:text-5xl">{title}</h2>
            {subtitle && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted md:text-lg">
                    {subtitle}
                </p>
            )}
        </ScrollReveal>
    );
}
