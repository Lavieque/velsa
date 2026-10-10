import { getContent, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export function Process({ locale }: { locale: Locale }) {
  const { process } = getContent(locale);

  return (
    <AnimatedSection className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32" stagger={0.08}>
      <AnimatedItem className="max-w-xl">
        <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
          {process.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
          {process.headline}
        </h2>
      </AnimatedItem>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((step) => (
          <AnimatedItem key={step.number}>
            <span className="font-display text-3xl text-amber-soft">{step.number}</span>
            <h3 className="mt-3 font-display text-xl text-parchment">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-parchment-dim">
              {step.description}
            </p>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
