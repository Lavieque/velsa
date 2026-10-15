import { getContent, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * The first thing a technical buyer looks for is the stack. It is already
 * written for the about page; showing it under the hero answers the question
 * without making them navigate, and no new claim is introduced.
 */
export function StackStrip({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);
  const items = about.technologies.flatMap((group) => group.items);

  return (
    <section className="border-y border-line">
      <div className="shell flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-12">
        <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-parchment-dim">
          {about.stackHeadline}
        </p>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          {items.map((item, i) => (
            <Reveal as="li" key={item} className="flex items-center gap-5">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-amber/50" />
              )}
              <span className="text-sm text-parchment">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
