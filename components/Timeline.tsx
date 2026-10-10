import { getContent, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export function Timeline({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <AnimatedSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10 sm:py-32" stagger={0.1}>
      <AnimatedItem>
        <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
          {about.timelineEyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
          {about.timelineHeadline}
        </h2>
      </AnimatedItem>

      <div className="mt-12 space-y-10 border-l border-line pl-8">
        {about.timeline.map((item) => (
          <AnimatedItem key={item.period} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-amber"
            />
            <span className="text-sm text-parchment-dim">{item.period}</span>
            <h3 className="mt-1 font-display text-xl text-parchment">
              {item.role} — {item.org}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-parchment-dim">
              {item.description}
            </p>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
