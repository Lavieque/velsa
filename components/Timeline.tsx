import { getContent, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Timeline({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
          {about.timelineHeadline}
        </h2>
      </Reveal>

      {/* The spine is drawn as the reader moves down it, so the section
          reads as one run rather than as separate entries. */}
      <ol className="relative mt-14 max-w-3xl space-y-12 pl-8">
        {/* A faint line always holds the column, and the drawn one runs down
            over it, so the entries are never left unanchored. */}
        <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line/40" />
        <span
          aria-hidden
          className="rule-draw-y absolute left-0 top-0 h-full w-px bg-line"
        />
        {about.timeline.map((item) => (
          <Reveal as="li" key={item.period} reveal="row" className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.3rem] top-2 h-2.5 w-2.5 rounded-full bg-amber ring-4 ring-ink"
            />
            <span className="tnum text-sm text-parchment-dim">{item.period}</span>
            <h3 className="mt-1.5 font-display text-xl text-parchment">
              {item.role} — {item.org}
            </h3>
            <p className="mt-2 max-w-[62ch] text-pretty text-sm leading-relaxed text-parchment-dim">
              {item.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
