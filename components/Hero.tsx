import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { SplitWords } from "./SplitWords";

/**
 * The first screen plays on a clock: it is already inside the viewport when
 * the page loads, so a scroll-driven entrance would be over before the first
 * paint. The indices below are one sequence, which is why the headline words
 * and the elements around them read as a single movement rather than four.
 */
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
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mesh-a absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber/25 blur-[120px]" />
        <div className="mesh-b absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-amber-soft/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_var(--color-ink)_75%)]" />
      </div>

      <div className="shell">
        <Reveal
          as="p"
          reveal="load"
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-soft/60 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-parchment-dim"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          {availability}
        </Reveal>

        <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.03] tracking-[-0.04em] text-parchment sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          <SplitWords text={headline} startIndex={1} />
        </h1>

        <Reveal
          as="p"
          reveal="load"
          style={{ "--reveal-index": 4 } as CSSProperties}
          className="mt-8 max-w-[52ch] text-pretty text-lg leading-relaxed text-parchment-dim"
        >
          {subhead}
        </Reveal>

        <Reveal
          as="div"
          reveal="load"
          style={{ "--reveal-index": 5 } as CSSProperties}
          className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <Link
            href="/contact"
            className="btn-glow group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            {ctaPrimary}
            <ArrowRight
              aria-hidden
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link href="/projects" className="underline-draw text-sm text-parchment">
            {ctaSecondary}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
