import { ArrowRight } from "lucide-react";
import { getContent, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";

export function ProblemStatement({ locale }: { locale: Locale }) {
  const { problems } = getContent(locale);

  return (
    <section className="border-y border-line bg-ink-soft/50">
      <div className="shell py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
            {problems.headline}
          </h2>
        </Reveal>

        <dl className="mt-14 border-t border-line">
          {problems.items.map((item) => (
            <Reveal
              key={item.problem}
              reveal="row"
              className="relative grid gap-x-10 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-baseline"
            >
              <span
                aria-hidden
                className="rule-draw absolute inset-x-0 bottom-0 h-px bg-line"
              />
              <dt className="max-w-[56ch] text-pretty text-parchment-dim">
                &ldquo;{item.problem}&rdquo;
              </dt>
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="hidden h-4 w-4 shrink-0 translate-y-0.5 text-amber md:block"
              />
              <dd className="font-display text-lg text-amber-soft md:text-right">
                {item.solution}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
