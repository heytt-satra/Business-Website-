"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import TeraLogo from "@/components/ui/TeraLogo";
import Button from "@/components/ui/Button";

const serviceOptions = [
    "SaaS MVP Design",
    "Website Development",
    "Business App",
    "AI Implementation",
    "Business Automation",
    "MVP Build",
];

const timelineOptions = ["ASAP", "1 month", "2-3 months", "Flexible"];
const budgetOptions = [
    "Under 1L INR",
    "1L-5L INR",
    "5L-15L INR",
    "15L+ INR",
    "Let's discuss",
];

interface FormData {
    services: string[];
    project_description: string;
    timeline: string;
    budget: string;
    name: string;
    email: string;
    company: string;
    phone: string;
}

export default function ContactPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const progress = (step / 3) * 100;

    const toggleService = (s: string) => {
        setSelectedServices((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    };

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", { ...data, services: selectedServices });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="flex min-h-[calc(100svh-72px)] items-center justify-center bg-bg px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mx-auto mb-6 w-20"
                    >
                        <TeraLogo variant="icon" className="h-20 w-20" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <CheckCircle size={48} className="mx-auto mb-4 text-cyan" />
                        <h2 className="mb-3 text-3xl font-bold text-navy">Brief Received!</h2>
                        <p className="text-base text-muted">
                            We have received your brief! Expect to hear from us within 24 hours.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="min-h-[calc(100svh-72px)] bg-bg">
            <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl lg:grid-cols-2">
                {/* Left Panel */}
                <div className="relative flex flex-col justify-center overflow-hidden bg-[#EEF1F8] p-6 sm:p-10 lg:p-16">
                    {/* Floating deltas */}
                    <div className="pointer-events-none absolute inset-0">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute opacity-[0.04]"
                                style={{
                                    top: `${20 + i * 20}%`,
                                    left: `${15 + ((i * 40) % 70)}%`,
                                    width: `${24 + i * 8}px`,
                                    height: `${24 + i * 8}px`,
                                }}
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 6 + i * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <TeraLogo variant="icon" className="h-full w-full" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10">
                        <TeraLogo variant="horizontal" className="mb-8 h-10" />
                        <h2 className="mb-6 text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
                            Let us build your next big thing.
                        </h2>
                        <div className="space-y-4 text-sm text-body-text">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-cyan" />
                                hello@teraindustries.com
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-cyan" />
                                +91 98765 43210
                            </div>
                            <div className="flex items-center gap-3">
                                <Linkedin size={18} className="text-cyan" />
                                linkedin.com/company/teraindustries
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-cyan" />
                                Remote-first · Global
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-16">
                    {/* Progress Bar */}
                    <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-light-grey">
                        <motion.div
                            className="h-full rounded-full bg-cyan"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="mb-6 text-2xl font-bold text-navy">
                                        What do you need?
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {serviceOptions.map((s) => (
                                            <button
                                                type="button"
                                                key={s}
                                                onClick={() => toggleService(s)}
                                                className={`rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${selectedServices.includes(s)
                                                        ? "border-cyan bg-cyan/10 text-navy"
                                                        : "border-light-grey bg-white text-muted hover:border-cyan/50"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex">
                                        <Button
                                            label="Next"
                                            onClick={() => setStep(2)}
                                            variant="primary"
                                            className="w-full sm:ml-auto sm:w-auto"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="mb-6 text-2xl font-bold text-navy">
                                        Tell us about it
                                    </h3>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy">
                                                Project Description
                                            </label>
                                            <textarea
                                                {...register("project_description")}
                                                placeholder="Describe your project or idea..."
                                                rows={4}
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text resize-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy">
                                                Timeline
                                            </label>
                                            <select
                                                {...register("timeline")}
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            >
                                                <option value="">Select timeline</option>
                                                {timelineOptions.map((t) => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy">
                                                Budget
                                            </label>
                                            <select
                                                {...register("budget")}
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            >
                                                <option value="">Select budget range</option>
                                                {budgetOptions.map((b) => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                                        <Button
                                            label="Back"
                                            onClick={() => setStep(1)}
                                            variant="secondary"
                                            className="w-full sm:w-auto"
                                        />
                                        <Button
                                            label="Next"
                                            onClick={() => setStep(3)}
                                            variant="primary"
                                            className="w-full sm:w-auto"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="mb-6 text-2xl font-bold text-navy">
                                        Your details
                                    </h3>
                                    <div className="space-y-5">
                                        <div>
                                            <input
                                                {...register("name", { required: true })}
                                                placeholder="Your full name"
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">Name is required</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                {...register("email", {
                                                    required: true,
                                                    pattern: /^\S+@\S+$/i,
                                                })}
                                                placeholder="your@email.com"
                                                type="email"
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">Valid email is required</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                {...register("company")}
                                                placeholder="Company name (optional)"
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                {...register("phone")}
                                                placeholder="Phone number (optional)"
                                                type="tel"
                                                className="input-glow w-full rounded-xl border border-light-grey bg-white px-4 py-3 text-sm text-body-text transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                                        <Button
                                            label="Back"
                                            onClick={() => setStep(2)}
                                            variant="secondary"
                                            className="w-full sm:w-auto"
                                        />
                                        <Button
                                            label="Send My Brief"
                                            type="submit"
                                            variant="primary"
                                            glow
                                            className="w-full sm:w-auto"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
}
