import { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import CaseStudyView from "@/components/work/CaseStudyView";

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
    const currentIndex = projects.findIndex((p) => p.slug === slug);
    if (currentIndex < 0) notFound();

    const project = projects[currentIndex];
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <CaseStudyView
            project={project}
            nextProject={nextProject}
            caseNumber={currentIndex + 1}
            totalCases={projects.length}
        />
    );
}
