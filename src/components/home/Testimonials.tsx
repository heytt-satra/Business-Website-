"use client";

import { Star } from "lucide-react";

import { Marquee } from "@/components/3d-testimonails";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  eyebrow: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Tera built our entire SaaS MVP in under 5 weeks. The code quality was genuinely unreal.",
    author: "Alex R.",
    title: "Founder",
    company: "Buildloop",
    eyebrow: "SaaS MVP",
  },
  {
    quote: "The AI integration they built doubled our user engagement within the first month.",
    author: "Priya S.",
    title: "CTO",
    company: "NexaAI",
    eyebrow: "AI Product",
  },
  {
    quote: "Our website went from embarrassing to award-worthy. Our qualified leads tripled.",
    author: "James K.",
    title: "CEO",
    company: "Vortex Labs",
    eyebrow: "Web Rebrand",
  },
  {
    quote: "They do not just execute. They think strategically. Every decision had a clear reason behind it.",
    author: "Sarah M.",
    title: "CPO",
    company: "FlowStack",
    eyebrow: "Product Strategy",
  },
  {
    quote: "Fastest team I have ever worked with. Shipped and deployed before I even expected update emails.",
    author: "Ravi P.",
    title: "Founder",
    company: "DevForge",
    eyebrow: "Rapid Launch",
  },
  {
    quote: "Our app went from concept to the App Store in 6 weeks. Absolutely mental pace, incredible quality.",
    author: "Chidi A.",
    title: "Founder",
    company: "SprintKit",
    eyebrow: "App Build",
  },
];

const splitIndex = Math.ceil(testimonials.length / 2);
const firstRow = testimonials.slice(0, splitIndex);
const secondRow = testimonials.slice(splitIndex);

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-bg py-20 sm:py-24 md:py-28">
      <div className="relative mb-12 w-full px-5 sm:px-6 md:mb-16 md:px-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="label-mono mb-4">Client Love</p>
            <h2 className="heading-lg">
              The work moved fast. The feedback was even faster.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-muted sm:text-base md:text-right">
            Founders came to us for velocity, sharp product thinking, and launches
            that still felt premium. Here is what they said once the work shipped.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 space-y-6">
        <Marquee
          ariaRole="presentation"
          pauseOnHover
          className="w-full [--duration:32s] [--gap:1.5rem] py-2"
        >
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee
          ariaRole="presentation"
          reverse
          pauseOnHover
          className="w-full [--duration:36s] [--gap:1.5rem] py-2"
        >
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="group relative w-[min(84vw,360px)] shrink-0 overflow-hidden rounded-[30px] border border-border bg-white shadow-[0_24px_70px_-30px_rgba(12,35,64,0.28)] transition duration-500 ease-out [transform:perspective(1200px)_rotateX(6deg)_rotateY(-8deg)] [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateX(0deg)_rotateY(0deg)_translateY(-8px)]">
      <CardContent className="relative flex h-full transform-gpu flex-col gap-6 p-6 sm:p-7 [transform:translateZ(28px)]">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full border border-border bg-bg px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-accent shadow-sm">
            {testimonial.eyebrow}
          </span>

          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={12} className="fill-current" />
            ))}
          </div>
        </div>

        <p className="text-base leading-7 text-primary/90 sm:text-[1.02rem]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-primary/10 pt-5">
          <Avatar className="size-11 border border-border bg-white shadow-md">
            <AvatarFallback className="bg-accent-light font-mono text-sm font-semibold text-primary">
              {getInitials(testimonial.author)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
            <p className="text-xs font-mono text-muted">
              {testimonial.title}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
