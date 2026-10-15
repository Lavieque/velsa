import { getContent, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Process({ locale }: { locale: Locale }) {
  const { process } = getContent(locale);

  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
          {process.headline}
        </h2>
      </Reveal>

      {/*
        The numbers stay because the order is the point: each step consumes
        what the one before it produced. They sit on a continuous rule so the
        section reads as a track rather than as six unrelated notes.
      */}
      <ol className="mt-16 grid gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((step) => (
          <Reveal
            as="li"
            key={step.number}
            reveal="row"
            className="group relative pt-7 sm:pr-10"
          >
            <span
              aria-hidden
              className="rule-draw absolute inset-x-0 top-0 h-px bg-line"
            />
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-10 bg-amber transition-[width] duration-500 group-hover:w-20"
            />
            <span className="tnum font-display text-sm tracking-[0.18em] text-amber-soft">
              {step.number}
            </span>
            <h3 className="mt-4 font-display text-xl text-parchment">{step.title}</h3>
            <p className="mt-2 max-w-[44ch] text-pretty text-sm leading-relaxed text-parchment-dim">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
