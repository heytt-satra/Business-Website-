"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GLSLHills } from "@/components/ui/glsl-hills";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-primary px-5 pb-14 pt-28 sm:px-8 sm:pt-32 md:h-screen md:px-0 md:pb-0 md:pt-0">
      {/* ── GLSL Hills — full background ── */}
      <div className="absolute inset-0 z-0">
        <GLSLHills width="100%" height="100%" />
      </div>

      {/* ── Content overlay ── */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center gap-5 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="font-heading max-w-[860px] text-balance whitespace-pre-wrap text-[clamp(38px,12vw,90px)] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-[clamp(44px,9vw,90px)] md:leading-[1.08] md:tracking-[-0.025em]"
        >
          Crafted With Purpose
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          className="max-w-[560px] text-[clamp(14px,3.8vw,16px)] leading-[1.65] text-white/55 sm:text-[clamp(14px,2.4vw,16px)] md:leading-[1.7]"
        >
          Elevate your brand with custom design, strategic development,
          and&nbsp;digital experiences that connect with your audience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: EASE_OUT }}
          className="pointer-events-auto mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-primary transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-90 active:scale-[0.97] sm:w-auto"
          >
            Get Started Now
          </Link>
          <Link
            href="/work"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-[transform,border-color,background] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/35 hover:bg-white/10 active:scale-[0.97] sm:w-auto"
          >
            See Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
