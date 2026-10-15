import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import { ProblemStatement } from "@/components/ProblemStatement";
import { Process } from "@/components/Process";
import { ProductsGrid } from "@/components/ProductsGrid";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ServicesGrid } from "@/components/ServicesGrid";
import { StackStrip } from "@/components/StackStrip";
import { Link } from "@/i18n/navigation";
import { getContent, type Locale } from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale);

  return (
    <>
      <Hero
        availability={content.profile.availability}
        headline={content.hero.headline}
        subhead={content.hero.subhead}
        ctaPrimary={content.hero.ctaPrimary}
        ctaSecondary={content.hero.ctaSecondary}
      />
      <StackStrip locale={locale} />
      <ProblemStatement locale={locale} />
      <ServicesGrid locale={locale} showCta />
      <Process locale={locale} />
      <ProjectsGrid locale={locale} limit={3} showCta />
      <ProductsGrid locale={locale} showCta />

      <section className="border-t border-line">
        <div className="shell max-w-3xl py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
              {content.ctaFinal.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-balance leading-relaxed text-parchment-dim">
              {content.ctaFinal.subhead}
            </p>
          </Reveal>
          <Reveal className="mt-9">
            <Link
              href="/contact"
              className="btn-glow group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              {content.ctaFinal.cta}
              <ArrowRight
                aria-hidden
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
