"use client";

import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { staggerContainer } from "@/lib/motion";
import { AnimatedItem } from "./AnimatedSection";

export function Hero({
  availability,
  headline,
  subhead,
  ctaPrimary,
  ctaSecondary,
}: {
  availability: string;
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mesh-a absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber/25 blur-[120px]" />
        <div className="mesh-b absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-amber-soft/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_var(--color-ink)_75%)]" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.14, 0.1)}
        className="mx-auto max-w-5xl px-6 sm:px-10"
      >
        <AnimatedItem
          as="p"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-parchment-dim"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          {availability}
        </AnimatedItem>

        <AnimatedItem
          as="h1"
          className="text-balance font-display text-5xl leading-[1.05] tracking-tight text-parchment sm:text-6xl md:text-7xl"
        >
          {headline}
        </AnimatedItem>

        <AnimatedItem
          as="p"
          className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-parchment-dim"
        >
          {subhead}
        </AnimatedItem>

        <AnimatedItem as="div" className="mt-11 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="btn-glow group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            {ctaPrimary}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link href="/projects" className="underline-draw text-sm text-parchment">
            {ctaSecondary}
          </Link>
        </AnimatedItem>
      </motion.div>
    </section>
  );
}
