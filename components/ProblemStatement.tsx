import { getContent, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export function ProblemStatement({ locale }: { locale: Locale }) {
  const { problems } = getContent(locale);

  return (
    <AnimatedSection className="border-y border-line bg-ink-soft/50" stagger={0.1}>
      <div className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32">
        <AnimatedItem className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl leading-tight text-parchment sm:text-4xl">
            {problems.headline}
          </h2>
        </AnimatedItem>

        <div className="mt-12 divide-y divide-line border-t border-line">
          {problems.items.map((item) => (
            <AnimatedItem
              key={item.problem}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <p className="text-parchment-dim">&ldquo;{item.problem}&rdquo;</p>
              <p className="flex items-center gap-2 font-display text-lg text-amber-soft">
                <span aria-hidden>→</span>
                {item.solution}
              </p>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
