import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
        title: project.title,
        description: project.shortDescription,
    };
}

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-br from-navy/5 to-cyan/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:pt-36">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="mb-4 inline-block rounded-full bg-cyan/15 px-4 py-1 text-sm font-medium text-cyan">
                        {project.category}
                    </span>
                    <h1 className="mb-4 text-3xl font-bold text-navy sm:text-4xl md:text-6xl">
                        {project.title}
                    </h1>
                    <p className="text-lg text-muted">{project.shortDescription}</p>
                </div>
            </section>

            {/* Challenge */}
            <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <ScrollReveal>
                        <h2 className="mb-4 text-2xl font-bold text-navy">The Challenge</h2>
                        <p className="text-base text-muted leading-relaxed">
                            {project.challenge}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Solution */}
            <section className="bg-bg px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <ScrollReveal>
                        <h2 className="mb-4 text-2xl font-bold text-navy">The Solution</h2>
                        <p className="text-base text-muted leading-relaxed">
                            {project.solution}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <ScrollReveal>
                        <h2 className="mb-6 text-2xl font-bold text-navy">Tech Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-lg border border-light-grey bg-bg px-4 py-2 text-sm font-medium text-navy"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Results */}
            <section className="bg-navy px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <ScrollReveal>
                        <h2 className="mb-8 text-2xl font-bold text-white">Results</h2>
                        <div className="space-y-4">
                            {project.results.map((result) => (
                                <div
                                    key={result}
                                    className="flex items-center gap-3 text-white/90"
                                >
                                    <CheckCircle size={20} className="shrink-0 text-cyan" />
                                    <span className="text-base">{result}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Next Project */}
            <section className="bg-bg px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal>
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted">
                            Next Project
                        </p>
                        <h3 className="mb-6 text-2xl font-bold text-navy">
                            {nextProject.title}
                        </h3>
                        <Link
                            href={`/work/${nextProject.slug}`}
                            className="inline-flex items-center gap-2 text-cyan font-semibold transition-all hover:gap-3"
                        >
                            View Case Study <ArrowRight size={16} />
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
