"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Code, Figma } from "lucide-react";

const featureChips = [
  { label: "Design systems", color: "#1B6B9A" },
  { label: "Research", color: "#5BC0EB" },
  { label: "Strategy", color: "#0C2340" },
  { label: "Web animations", color: "#2E8CE6" },
  { label: "UI/UX", color: "#1B6B9A" },
];

const timeSlots = [
  { start: "6:30pm", end: "6:45pm", active: false },
  { start: "6:45pm", end: "7:00pm", active: true },
  { start: "7:00pm", end: "7:15pm", active: false },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 22, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 22, mass: 0.4 });

  const cardOneX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const cardTwoX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const cardThreeX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const cardRotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handlePointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#F4F8FB] px-4 pb-16 pt-22 sm:px-6 sm:pb-22 sm:pt-28 md:px-10 md:pb-32 md:pt-36 lg:px-16"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(12,35,64,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(12,35,64,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[4%] top-[10%] h-16 w-16 bg-[#EAF2F8] sm:h-20 sm:w-20" />
        <div className="absolute left-[13%] top-[30%] h-12 w-12 bg-[#E6EEF5] sm:h-16 sm:w-16" />
        <div className="absolute right-[8%] top-[20%] h-16 w-16 bg-[#E7F0F7] sm:h-20 sm:w-20" />
        <div className="absolute right-[18%] top-[40%] h-12 w-12 bg-[#E9F1F8] sm:h-16 sm:w-16" />
        <div className="absolute bottom-[24%] left-[18%] h-14 w-14 bg-[#E6EEF5] sm:h-[72px] sm:w-[72px]" />
        <div className="absolute bottom-[14%] right-[24%] h-16 w-16 bg-[#E7F0F7] sm:h-20 sm:w-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -16 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0, rotate: -14 } : { opacity: 1, y: [0, -4, 0], rotate: [-14, -12, -14] }}
        transition={
          prefersReducedMotion
            ? { delay: 0.3, duration: 0.45 }
            : {
                opacity: { delay: 0.3, duration: 0.45 },
                y: { delay: 1, duration: 4.4, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: 1, duration: 4.4, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute left-[10%] top-[52%] z-10 flex h-11 w-11 items-center justify-center rounded-2xl border-[3px] border-[#1B6B9A] bg-white text-[#1B6B9A] shadow-[0_12px_24px_rgba(27,107,154,0.22)] md:hidden"
      >
        <Figma size={18} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 16 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0, rotate: 14 } : { opacity: 1, y: [0, -5, 0], rotate: [14, 12, 14] }}
        transition={
          prefersReducedMotion
            ? { delay: 0.35, duration: 0.45 }
            : {
                opacity: { delay: 0.35, duration: 0.45 },
                y: { delay: 1.1, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: 1.1, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute right-[10%] top-[50%] z-10 flex h-11 w-11 items-center justify-center rounded-2xl border-[3px] border-[#1B6B9A] bg-white text-[#1B6B9A] shadow-[0_12px_24px_rgba(27,107,154,0.22)] md:hidden"
      >
        <Code size={18} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -16 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0, rotate: -14 } : { opacity: 1, y: [0, -6, 0], rotate: [-14, -12, -14] }}
        transition={
          prefersReducedMotion
            ? { delay: 0.3, duration: 0.45 }
            : {
                opacity: { delay: 0.3, duration: 0.45 },
                y: { delay: 1.1, duration: 4.6, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: 1.1, duration: 4.6, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute left-[7%] top-[36%] z-10 hidden h-14 w-14 items-center justify-center rounded-2xl border-[4px] border-[#1B6B9A] bg-white text-[#1B6B9A] shadow-[0_14px_28px_rgba(27,107,154,0.24)] md:flex lg:left-[17%] lg:h-16 lg:w-16"
      >
        <Figma size={24} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 16 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0, rotate: 14 } : { opacity: 1, y: [0, -7, 0], rotate: [14, 12, 14] }}
        transition={
          prefersReducedMotion
            ? { delay: 0.35, duration: 0.45 }
            : {
                opacity: { delay: 0.35, duration: 0.45 },
                y: { delay: 1.15, duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: 1.15, duration: 5, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute right-[7%] top-[33%] z-10 hidden h-14 w-14 items-center justify-center rounded-2xl border-[4px] border-[#1B6B9A] bg-white text-[#1B6B9A] shadow-[0_14px_28px_rgba(27,107,154,0.24)] md:flex lg:right-[17%] lg:h-16 lg:w-16"
      >
        <Code size={24} />
      </motion.div>

      <div className="relative z-10 mx-auto mt-10 max-w-[1300px] md:mt-20">
        <div className="mx-auto max-w-[360px] text-center md:hidden">
          <div className="mb-2 flex items-end justify-between px-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base text-[#0C2340]"
              style={{
                fontFamily: '"Bradley Hand", "Comic Sans MS", cursive',
                transform: "rotate(-12deg)",
                display: "inline-block",
              }}
            >
              Deliver
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-base text-[#0C2340]"
              style={{
                fontFamily: '"Bradley Hand", "Comic Sans MS", cursive',
                transform: "rotate(10deg)",
                display: "inline-block",
              }}
            >
              Create
            </motion.span>
          </div>
          <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-[#8AA0B6]" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-2 text-[62px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#8A9CAE]"
            style={{
              textShadow: "0 2px 0 rgba(255,255,255,0.95), 0 12px 28px rgba(12,35,64,0.24)",
            }}
          >
            Premium
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -4, 0] }}
            transition={
              prefersReducedMotion
                ? { delay: 0.25, duration: 0.6 }
                : {
                    opacity: { delay: 0.25, duration: 0.6 },
                    y: { delay: 0.95, duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative mx-auto w-fit"
          >
            <motion.div
              className="pointer-events-none absolute inset-x-[8%] -bottom-5 h-8 rounded-full bg-[#1B6B9A]/30 blur-2xl"
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.28, 0.48, 0.28] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.95, duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="rounded-[999px] border-[5px] border-[#1B6B9A] bg-[#F8FBFE] px-8 py-3 shadow-[0_10px_0_rgba(27,107,154,0.95),0_24px_40px_rgba(27,107,154,0.24)]">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: [0, -2, 0] }}
                transition={{
                  opacity: { delay: 0.35, duration: 0.55 },
                  y: { delay: 0.85, duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="text-[52px] font-medium leading-[0.9] tracking-[-0.05em] text-[#0C2340]"
              >
                Solutions
              </motion.h1>
            </div>
            <motion.span
              className="absolute -left-2.5 -top-2.5 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.12, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.2, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -right-2.5 -top-2.5 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.12, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.45, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -bottom-2.5 -left-2.5 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.12, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.7, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -bottom-2.5 -right-2.5 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.12, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.95, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-5 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block text-[58px] leading-none text-[#0C2340]"
                style={{ fontFamily: '"Bradley Hand", "Comic Sans MS", cursive' }}
              >
                Click me
              </span>
              <svg width="58" height="32" viewBox="0 0 58 32" className="text-[#0C2340]" fill="none">
                <path
                  d="M2 6c10 10 20 15 44 18m0 0l-7-6m7 6l-9 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full max-w-[265px] items-center justify-center rounded-full bg-[#1B6B9A] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(27,107,154,0.33)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245F86]"
            >
              Let&apos;s Build
            </Link>
          </motion.div>
        </div>

        <div className="hidden text-center md:block">
          <div className="mb-2 flex items-end justify-between px-[14%] lg:px-[26%]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl text-[#0C2340] lg:text-2xl"
              style={{
                fontFamily: '"Bradley Hand", "Comic Sans MS", cursive',
                transform: "rotate(-12deg)",
                display: "inline-block",
              }}
            >
              Deliver
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-xl text-[#0C2340] lg:text-2xl"
              style={{
                fontFamily: '"Bradley Hand", "Comic Sans MS", cursive',
                transform: "rotate(10deg)",
                display: "inline-block",
              }}
            >
              Create
            </motion.span>
          </div>
          <span className="mx-auto mb-2 block h-3 w-3 rounded-full bg-[#8AA0B6]" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-2 text-[clamp(72px,8vw,104px)] font-semibold leading-[0.92] tracking-[-0.048em] text-[#8A9CAE]"
            style={{
              textShadow: "0 2px 0 rgba(255,255,255,0.95), 0 12px 28px rgba(12,35,64,0.24)",
            }}
          >
            Premium
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -5, 0] }}
            transition={
              prefersReducedMotion
                ? { delay: 0.25, duration: 0.6 }
                : {
                    opacity: { delay: 0.25, duration: 0.6 },
                    y: { delay: 0.95, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative mx-auto w-fit"
          >
            <motion.div
              className="pointer-events-none absolute inset-x-[7%] -bottom-5 h-8 rounded-full bg-[#1B6B9A]/30 blur-2xl"
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.26, 0.46, 0.26] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.95, duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="rounded-[999px] border-[6px] border-[#1B6B9A] bg-[#F8FBFE] px-14 py-5 shadow-[0_12px_0_rgba(27,107,154,0.95),0_28px_46px_rgba(27,107,154,0.28)] md:px-20">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: [0, -2, 0] }}
                transition={{
                  opacity: { delay: 0.35, duration: 0.55 },
                  y: { delay: 0.85, duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="text-[clamp(64px,6vw,92px)] font-medium leading-[0.9] tracking-[-0.05em] text-[#0C2340]"
              >
                Solutions
              </motion.h1>
            </div>
            <motion.span
              className="absolute -left-3 -top-3 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.15, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -right-3 -top-3 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.4, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -bottom-3 -left-3 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.65, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -bottom-3 -right-3 h-3.5 w-3.5 border-2 border-[#1B6B9A] bg-[#F8FBFE]"
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.9, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-7 flex items-center justify-center gap-5"
          >
            <span
              className="text-[44px] leading-none text-[#0C2340] lg:text-[56px]"
              style={{ fontFamily: '"Bradley Hand", "Comic Sans MS", cursive' }}
            >
              Click me
            </span>
            <svg width="74" height="24" viewBox="0 0 74 24" className="text-[#0C2340]" fill="none">
              <path d="M3 3c13 11 30 16 54 14m0 0l-8-6m8 6l-9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1B6B9A] px-8 py-3.5 text-lg font-semibold text-white shadow-[0_12px_32px_rgba(27,107,154,0.33)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245F86]"
            >
              Let&apos;s Build
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-[1300px] sm:mt-20 md:mt-24">
        <svg
          className="pointer-events-none absolute left-[24%] top-[-20px] z-10 hidden h-[74px] w-[230px] md:block"
          viewBox="0 0 230 74"
          fill="none"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 1px 2px rgba(27,107,154,0.2))" }}
        >
          <motion.path
            d="M14 60 C64 10, 154 10, 214 60"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.85, ease: "easeInOut" }}
          />
          <motion.circle
            cx="14"
            cy="60"
            r="5.8"
            fill="#F4F8FB"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.55, duration: 0.25 }}
            style={{ originX: "14px", originY: "60px" }}
          />
          <motion.circle
            cx="214"
            cy="60"
            r="5.8"
            fill="#F4F8FB"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, duration: 0.25 }}
            style={{ originX: "214px", originY: "60px" }}
          />
        </svg>

        <svg
          className="pointer-events-none absolute right-[20%] top-[72px] z-10 hidden h-[96px] w-[210px] md:block"
          viewBox="0 0 210 96"
          fill="none"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 1px 2px rgba(27,107,154,0.2))" }}
        >
          <motion.path
            d="M12 18 C10 44, 28 60, 50 56 C64 54, 68 42, 58 34 C48 26, 46 44, 60 52 C92 68, 150 56, 196 22"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.95, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="18"
            r="5.8"
            fill="#F4F8FB"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.85, duration: 0.25 }}
            style={{ originX: "12px", originY: "18px" }}
          />
          <motion.circle
            cx="196"
            cy="22"
            r="5.8"
            fill="#F4F8FB"
            stroke="#1B6B9A"
            strokeWidth="2.6"
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.9, duration: 0.25 }}
            style={{ originX: "196px", originY: "22px" }}
          />
        </svg>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10 lg:gap-12">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
            transition={
              prefersReducedMotion
                ? { delay: 0.4, duration: 0.5 }
                : {
                    opacity: { delay: 0.4, duration: 0.5 },
                    y: { delay: 1.15, duration: 5.4, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative z-20 mx-auto w-full max-w-[420px] rounded-[30px] border border-[#D5E1EB] bg-white/78 p-4 shadow-[0_18px_38px_rgba(12,35,64,0.1)] backdrop-blur-md sm:rounded-[34px] sm:p-6 md:-rotate-[4deg]"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    x: cardOneX,
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    transformPerspective: 1200,
                  }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -12 }}
          >
            <div className="relative mb-5 rounded-[18px] border border-[#D2DFEA] bg-[#EDF4FA] p-3 sm:mb-7 sm:rounded-[20px] sm:p-4">
              <div className="pointer-events-none absolute inset-x-3 top-2 -z-10 h-full rounded-[18px] border border-[#DDE7F0] bg-[#F4F8FC]" />
              <div className="pointer-events-none absolute inset-x-6 top-4 -z-20 h-full rounded-[16px] border border-[#E6EDF4] bg-[#F8FBFE]" />
              <div className="space-y-2.5">
                {timeSlots.map((slot) => (
                  <div key={slot.start} className="flex items-center gap-2.5 text-[13px] font-medium text-[#7C93A8]">
                    {slot.active ? (
                      <span className="relative h-[18px] w-[30px] shrink-0 rounded-full bg-[#BCD5E8]">
                        <span className="absolute right-[2px] top-[2px] h-[14px] w-[14px] rounded-full bg-[#1B6B9A]" />
                      </span>
                    ) : (
                      <span className="h-[16px] w-[16px] shrink-0 rounded-full border border-[#D2DEE8] bg-[#ECF2F8]" />
                    )}
                    <span className={slot.active ? "font-semibold text-[#243447]" : ""}>{slot.start}</span>
                    <span className="text-[#9AA9B8]">-</span>
                    <span>{slot.end}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.13em] text-[#859BB0]">STEP 1</p>
            <p className="text-[clamp(18px,7.2vw,36px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#243447]">
              Book a <span className="text-[#1B6B9A]">free</span> consultation call to
              learn about your needs
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }}
            transition={
              prefersReducedMotion
                ? { delay: 0.5, duration: 0.5 }
                : {
                    opacity: { delay: 0.5, duration: 0.5 },
                    y: { delay: 1.35, duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative z-20 mx-auto w-full max-w-[420px] rounded-[30px] border border-[#D5E1EB] bg-white/78 p-4 shadow-[0_18px_38px_rgba(12,35,64,0.1)] backdrop-blur-md sm:rounded-[34px] sm:p-6"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    x: cardTwoX,
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    transformPerspective: 1200,
                  }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.018, y: -10 }}
          >
            <div className="mb-5 flex flex-wrap gap-2 sm:mb-7 sm:gap-2.5">
              {featureChips.map((chip) => (
                <motion.span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#CFDCE8] bg-white px-2.5 py-1 text-[11px] font-medium text-[#243447] shadow-[0_2px_8px_rgba(12,35,64,0.16)] sm:px-3 sm:text-[12px]"
                  animate={prefersReducedMotion ? { y: 0 } : { y: [0, -2, 0] }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: 1.45 + featureChips.indexOf(chip) * 0.15, duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chip.color }} />
                  {chip.label}
                </motion.span>
              ))}
            </div>

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.13em] text-[#859BB0]">STEP 2</p>
            <p className="text-[clamp(18px,7.2vw,36px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#243447]">
              <span className="text-[#1B6B9A]">Design services</span> for all your needs
              and requirements
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -9, 0] }}
            transition={
              prefersReducedMotion
                ? { delay: 0.6, duration: 0.5 }
                : {
                    opacity: { delay: 0.6, duration: 0.5 },
                    y: { delay: 1.25, duration: 5.6, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative z-20 mx-auto w-full max-w-[420px] rounded-[30px] border border-[#D5E1EB] bg-white/78 p-4 shadow-[0_18px_38px_rgba(12,35,64,0.1)] backdrop-blur-md sm:rounded-[34px] sm:p-6 md:rotate-[4deg]"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    x: cardThreeX,
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    transformPerspective: 1200,
                  }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -12 }}
          >
            <div className="mb-5 rounded-[20px] border border-[#D2DFEA] bg-[#EDF4FA] p-3 pb-2 sm:mb-7 sm:rounded-[22px]">
              <div className="mb-1.5 flex items-start justify-between text-xs">
                <span className="rounded-full bg-[#1B6B9A]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1B6B9A]">
                  +25.5%
                </span>
                <div className="text-right leading-tight">
                  <span className="block text-[10px] text-[#7D8792]">Total Profit</span>
                  <span className="block text-sm font-semibold text-[#243447]">$2400.68</span>
                </div>
              </div>

              <svg viewBox="0 0 340 120" className="h-24 w-full sm:h-28" fill="none">
                <defs>
                  <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(27,107,154,0.22)" />
                    <stop offset="100%" stopColor="rgba(27,107,154,0.02)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 80 C30 46 60 52 90 84 C110 102 140 102 160 64 C178 32 200 8 220 26 C240 42 260 56 286 44 C310 32 328 40 340 64 L340 120 L0 120 Z"
                  fill="url(#heroChartGrad)"
                />
                <path
                  d="M0 80 C30 46 60 52 90 84 C110 102 140 102 160 64 C178 32 200 8 220 26 C240 42 260 56 286 44 C310 32 328 40 340 64"
                  stroke="#1B6B9A"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="160"
                  cy="64"
                  r="5.5"
                  fill="#1B6B9A"
                  animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.55, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "160px", originY: "64px" }}
                />
                <motion.circle
                  cx="160"
                  cy="64"
                  r="9"
                  fill="none"
                  stroke="#1B6B9A"
                  strokeWidth="1.5"
                  opacity="0.28"
                  animate={prefersReducedMotion ? { scale: 1, opacity: 0.28 } : { scale: [1, 1.45, 1], opacity: [0.28, 0.06, 0.28] }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.55, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "160px", originY: "64px" }}
                />
              </svg>
            </div>

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.13em] text-[#859BB0]">STEP 3</p>
            <p className="text-[clamp(18px,7.2vw,36px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#243447]">
              <span className="text-[#1B6B9A]">Launch your product</span> with active
              conversion rate optimisations
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
