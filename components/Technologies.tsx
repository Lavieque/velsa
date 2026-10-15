import { getContent, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Technologies({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <section className="border-t border-line bg-ink-soft/50">
      <div className="shell py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
            {about.stackHeadline}
          </h2>
        </Reveal>

        <dl className="mt-14 border-t border-line">
          {about.technologies.map((group) => (
            <Reveal
              key={group.category}
              reveal="row"
              className="relative grid gap-x-10 gap-y-2 py-6 md:grid-cols-[14rem_minmax(0,1fr)]"
            >
              <span
                aria-hidden
                className="rule-draw absolute inset-x-0 bottom-0 h-px bg-line"
              />
              <dt className="text-sm uppercase tracking-[0.14em] text-parchment-dim">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-sm text-parchment"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
