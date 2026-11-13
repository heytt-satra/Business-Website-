"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowLeft,
    Layers,
    Zap,
    Target,
    Clock,
    Quote,
    CheckCircle2,
    Circle,
} from "lucide-react";

import type { Project } from "@/data/projects";
import ProjectSpecimen from "./ProjectSpecimen";
import ProjectShowcase from "./ProjectShowcase";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function CaseStudyView({
    project,
    nextProject,
    caseNumber,
    totalCases,
}: {
    project: Project;
    nextProject: Project;
    caseNumber: number;
    totalCases: number;
}) {
    return (
        <>
            {/* ═══════════════════════ HERO ═══════════════════════ */}
            <section className="relative overflow-hidden bg-bg px-5 pb-16 pt-28 sm:px-6 sm:pt-32 md:px-20 md:pb-20 md:pt-40">
                <div aria-hidden className="hero-blueprint-grid pointer-events-none absolute inset-0" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 82% 8%, rgba(91,192,235,0.22) 0%, transparent 55%), radial-gradient(ellipse at 12% 90%, rgba(27,107,154,0.14) 0%, transparent 55%)",
                    }}
                />

                <div className="relative mx-auto max-w-6xl">
                    {/* Top bar */}
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            <Link href="/work" className="transition-colors hover:text-primary">
                                Work
                            </Link>
                            <span className="opacity-40">/</span>
                            <span className="text-primary">{project.slug}</span>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            Case {pad(caseNumber)} / {pad(totalCases)}
                        </span>
                    </div>

                    <div className="grid gap-12 md:grid-cols-12 md:gap-16">
                        <div className="md:col-span-7">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="label-mono mb-5"
                            >
                                {project.category}
                            </motion.p>

                            <div className="mb-8 overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="heading-xl"
                                >
                                    {project.title}
                                </motion.h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="max-w-xl text-lg leading-relaxed text-muted md:text-xl"
                            >
                                {project.shortDescription}
                            </motion.p>
                        </div>

                        <div className="md:col-span-5">
                            <div className="mx-auto max-w-sm md:sticky md:top-28">
                                <ProjectSpecimen slug={project.slug} />
                            </div>
                        </div>
                    </div>

                    {/* Stat pill row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4"
                    >
                        <StatPill icon={Clock} label="Year" value={project.year} />
                        <StatPill icon={Target} label="Role" value={project.role} />
                        <StatPill icon={Layers} label="Stack" value={`${project.techStack.length} tools`} />
                        <StatPill icon={Zap} label="Features" value={`${project.highlights.length} shipped`} />
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ PROJECT SHOWCASE ═══════════════════════ */}
            <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-24 md:px-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="label-mono mb-3"
                            >
                                {"// The Product"}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="heading-lg max-w-xl"
                            >
                                A closer look at the build.
                            </motion.h2>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            Live View
                        </span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <ProjectShowcase slug={project.slug} title={project.title} />
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ CONTEXT + APPROACH CARDS ═══════════════════════ */}
            <section className="relative bg-bg px-5 py-20 sm:px-6 sm:py-28 md:px-20 md:py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                        <BigCard
                            eyebrow="// Context"
                            title="Where the product needed to go."
                            body={project.challenge}
                            icon={<Circle size={28} strokeWidth={1.2} />}
                            variant="light"
                        />
                        <BigCard
                            eyebrow="// Approach"
                            title="How we actually built it."
                            body={project.solution}
                            icon={<CheckCircle2 size={28} strokeWidth={1.2} />}
                            variant="dark"
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ FEATURE CARDS GRID ═══════════════════════ */}
            <section className="relative bg-white px-5 py-20 sm:px-6 sm:py-28 md:px-20 md:py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="label-mono mb-3"
                            >
                                {"// What shipped"}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="heading-lg max-w-xl"
                            >
                                Every piece, accounted for.
                            </motion.h2>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            {pad(project.highlights.length)} features
                        </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
                        {project.highlights.map((item, i) => (
                            <FeatureCard key={item} number={i + 1} label={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ STACK CARDS ═══════════════════════ */}
            <section className="relative overflow-hidden bg-bg px-5 py-20 sm:px-6 sm:py-28 md:px-20 md:py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="label-mono mb-3"
                            >
                                {"// Stack"}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="heading-lg"
                            >
                                The tools behind it.
                            </motion.h2>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            {pad(project.techStack.length)} technologies
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
                        {project.techStack.map((tech, i) => (
                            <StackCard key={tech} name={tech} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ OUTCOME ═══════════════════════ */}
            <section className="relative overflow-hidden bg-primary px-5 py-20 text-white sm:px-6 sm:py-28 md:px-20 md:py-36">
                <div aria-hidden className="hero-blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 0%, rgba(91,192,235,0.28) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(27,107,154,0.22) 0%, transparent 55%)",
                    }}
                />

                <div className="relative mx-auto max-w-6xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-cyan"
                    >
                        {"// Outcome"}
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="heading-xl mb-12 max-w-3xl text-white md:mb-16"
                    >
                        The work that shipped.
                    </motion.h2>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10"
                    >
                        <Quote size={28} className="text-cyan" />
                        <p className="mt-4 font-heading text-2xl font-black leading-tight text-white md:text-3xl">
                            {project.shortDescription}
                        </p>
                        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan to-ocean" />
                            <div>
                                <p className="text-sm font-semibold text-white">{project.title}</p>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                                    {project.category} · {project.year}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                        {project.results.map((result, i) => (
                            <OutcomeCard
                                key={result}
                                index={i}
                                total={project.results.length}
                                text={result}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ NEXT PROJECT ═══════════════════════ */}
            <section className="bg-bg px-5 py-20 sm:px-6 sm:py-28 md:px-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-primary"
                        >
                            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                            All Work
                        </Link>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                            Next Case
                        </span>
                    </div>

                    <Link
                        href={`/work/${nextProject.slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-border bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(12,35,64,0.3)] sm:rounded-3xl sm:p-8 md:p-10"
                        data-cursor="image"
                    >
                        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
                            {/* Specimen shows first on mobile, second on desktop */}
                            <div className="order-1 md:order-2 md:col-span-5">
                                <div className="mx-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
                                    <ProjectSpecimen slug={nextProject.slug} />
                                </div>
                            </div>

                            <div className="order-2 md:order-1 md:col-span-7">
                                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ocean sm:mb-3 md:text-xs">
                                    {nextProject.category}
                                </p>
                                <h3 className="font-heading text-[clamp(28px,7vw,78px)] font-black leading-[0.95] tracking-tight text-primary transition-colors group-hover:text-ocean">
                                    {nextProject.title}
                                </h3>
                                <p className="mt-3 max-w-lg text-sm text-muted sm:mt-4 md:text-base">
                                    {nextProject.shortDescription}
                                </p>

                                <div className="mt-5 flex items-center gap-3 sm:mt-6">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
                                        View Case Study
                                    </span>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary sm:h-10 sm:w-10">
                                        <ArrowUpRight
                                            size={14}
                                            className="text-primary transition-all group-hover:text-white sm:h-4 sm:w-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
}

/* ─────────── Building blocks ─────────── */

function StatPill({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-3 transition-colors hover:border-ocean sm:rounded-2xl sm:p-4">
            <div className="mb-2 flex items-center justify-between sm:mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ocean/10 text-ocean transition-colors group-hover:bg-ocean group-hover:text-white sm:h-8 sm:w-8 sm:rounded-lg">
                    <Icon size={12} className="sm:h-3.5 sm:w-3.5" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                    {label}
                </span>
            </div>
            <p className="font-heading text-base font-black leading-tight tracking-tight text-primary sm:text-lg md:text-xl">
                {value}
            </p>
        </div>
    );
}

function BigCard({
    eyebrow,
    title,
    body,
    icon,
    variant,
}: {
    eyebrow: string;
    title: string;
    body: string;
    icon: React.ReactNode;
    variant: "light" | "dark";
}) {
    const isDark = variant === "dark";
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className={`relative overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-8 md:p-10 ${
                isDark
                    ? "bg-primary text-white"
                    : "bg-white text-primary ring-1 ring-border"
            }`}
        >
            {isDark && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 80% 0%, rgba(91,192,235,0.25) 0%, transparent 55%)",
                    }}
                />
            )}
            <div className="relative">
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <span
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs ${
                            isDark ? "text-cyan" : "text-ocean"
                        }`}
                    >
                        {eyebrow}
                    </span>
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                            isDark ? "bg-white/10 text-cyan" : "bg-ocean/10 text-ocean"
                        }`}
                    >
                        {icon}
                    </div>
                </div>
                <h3 className="mb-4 font-heading text-xl font-black leading-[1.05] tracking-tight sm:mb-6 sm:text-2xl md:text-3xl">
                    {title}
                </h3>
                <p
                    className={`text-sm leading-relaxed sm:text-base md:text-lg ${
                        isDark ? "text-white/75" : "text-muted"
                    }`}
                >
                    {body}
                </p>
            </div>
        </motion.div>
    );
}

function FeatureCard({ number, label }: { number: number; label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: number * 0.04 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-ocean hover:shadow-[0_20px_50px_-20px_rgba(12,35,64,0.2)] sm:rounded-2xl sm:p-6"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(91,192,235,0.06) 0%, transparent 100%)",
                }}
            />

            <div className="relative">
                <div className="mb-3 flex items-start justify-between sm:mb-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
                        Feature {pad(number)}
                    </span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ocean/10 transition-colors group-hover:bg-ocean sm:h-7 sm:w-7">
                        <CheckCircle2
                            size={12}
                            className="text-ocean transition-colors group-hover:text-white sm:h-3.5 sm:w-3.5"
                        />
                    </div>
                </div>
                <p className="text-sm font-semibold leading-snug text-primary sm:text-base md:text-lg">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

function StackCard({ name, index }: { name: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-white px-5 py-6 transition-all hover:-translate-y-1 hover:border-ocean hover:shadow-[0_16px_40px_-16px_rgba(12,35,64,0.15)]"
        >
            <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ocean to-navy text-white">
                    <span className="font-heading text-[10px] font-black">
                        {name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {pad(index + 1)}
                </span>
            </div>
            <p className="text-base font-semibold text-primary">{name}</p>
            <div className="mt-3 h-1 w-8 rounded-full bg-gradient-to-r from-ocean to-cyan transition-all group-hover:w-full" />
        </motion.div>
    );
}

function OutcomeCard({ index, total, text }: { index: number; total: number; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/[0.07] md:p-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-4xl font-black tracking-tight text-cyan md:text-5xl">
                    {pad(index + 1)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    of {pad(total)}
                </span>
            </div>
            <div className="mb-4 h-px bg-gradient-to-r from-cyan/60 via-white/20 to-transparent" />
            <p className="text-lg font-semibold leading-snug text-white md:text-xl">{text}</p>
        </motion.div>
    );
}
