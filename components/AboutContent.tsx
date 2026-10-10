import Image from "next/image";
import { getContent, profile, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export function AboutBrand({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 pt-32 pb-16 sm:px-10 sm:pt-40" stagger={0.12}>
      <AnimatedItem>
        <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
          {about.brandEyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl leading-tight text-parchment sm:text-5xl">
          {about.brandHeadline}
        </h1>
      </AnimatedItem>

      <div className="mt-8 max-w-2xl space-y-5">
        {about.brandParagraphs.map((p, i) => (
          <AnimatedItem key={i} as="p" className="leading-relaxed text-parchment-dim">
            {p}
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function AboutFounder({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { about } = content;

  return (
    <AnimatedSection className="border-t border-line bg-ink-soft/50" stagger={0.12}>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-10 md:grid-cols-[0.8fr_2fr] md:items-start">
          <AnimatedItem className="relative aspect-square w-40 overflow-hidden rounded-2xl border border-line md:w-full">
            <Image
              src="/sobre/virgilio.jpg"
              alt={profile.founderName}
              fill
              sizes="(min-width: 768px) 30vw, 160px"
              className="object-cover object-top"
              priority
            />
          </AnimatedItem>

          <div>
            <AnimatedItem>
              <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
                {about.founderEyebrow}
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
                {profile.founderName}
              </h2>
              <p className="mt-2 text-parchment-dim">{content.profile.founderRole}</p>
            </AnimatedItem>

            <div className="mt-8 max-w-2xl space-y-5">
              {about.founderParagraphs.map((p, i) => (
                <AnimatedItem key={i} as="p" className="leading-relaxed text-parchment-dim">
                  {p}
                </AnimatedItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
