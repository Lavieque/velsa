import Image from "next/image";
import { getContent, profile, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SplitWords } from "./SplitWords";

export function AboutBrand({ locale }: { locale: Locale }) {
  const { about } = getContent(locale);

  return (
    <section className="shell pt-36 pb-16 sm:pt-44">
      <h1 className="max-w-[20ch] text-balance font-display text-4xl leading-[1.05] tracking-[-0.035em] text-parchment sm:text-5xl lg:text-6xl">
        <SplitWords text={about.brandHeadline} />
      </h1>

      <div className="mt-10 max-w-[65ch] space-y-5">
        {about.brandParagraphs.map((p, i) => (
          <Reveal key={i} as="p" className="text-pretty leading-relaxed text-parchment-dim">
            {p}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutFounder({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { about } = content;

  return (
    <section className="border-t border-line bg-ink-soft/50">
      <div className="shell py-24 sm:py-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,2fr)] md:gap-16 md:items-start">
          <Reveal className="relative aspect-square w-40 overflow-hidden rounded-2xl border border-line md:w-full">
            <Image
              src="/sobre/virgilio.jpg"
              alt={profile.founderName}
              fill
              sizes="(min-width: 768px) 16rem, 160px"
              className="object-cover object-top"
              priority
            />
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
                {profile.founderName}
              </h2>
              <p className="mt-2 text-parchment-dim">{content.profile.founderRole}</p>
            </Reveal>

            <div className="mt-8 max-w-[65ch] space-y-5">
              {about.founderParagraphs.map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  className="text-pretty leading-relaxed text-parchment-dim"
                >
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
