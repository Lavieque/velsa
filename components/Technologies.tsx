import { getContent, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export function Technologies({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <AnimatedSection className="border-t border-line bg-ink-soft/50" stagger={0.08}>
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-10 sm:py-32">
        <AnimatedItem>
          <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
            {about.stackEyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
            {about.stackHeadline}
          </h2>
        </AnimatedItem>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {about.technologies.map((group) => (
            <AnimatedItem key={group.category}>
              <h3 className="text-sm uppercase tracking-[0.14em] text-parchment-dim">
                {group.category}
              </h3>
              <p className="mt-2 text-parchment">{group.items.join(" · ")}</p>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
