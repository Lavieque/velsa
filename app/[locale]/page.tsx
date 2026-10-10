import { setRequestLocale } from "next-intl/server";
import { AnimatedItem, AnimatedSection } from "@/components/AnimatedSection";
import { Hero } from "@/components/Hero";
import { ProblemStatement } from "@/components/ProblemStatement";
import { Process } from "@/components/Process";
import { ProductsGrid } from "@/components/ProductsGrid";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ServicesGrid } from "@/components/ServicesGrid";
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
      <ProblemStatement locale={locale} />
      <ServicesGrid locale={locale} showCta />
      <Process locale={locale} />
      <ProjectsGrid locale={locale} limit={3} showCta />
      <ProductsGrid locale={locale} showCta />

      <AnimatedSection className="border-t border-line" stagger={0.12}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 sm:py-32">
          <AnimatedItem>
            <h2 className="text-balance font-display text-3xl leading-tight text-parchment sm:text-4xl">
              {content.ctaFinal.headline}
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-parchment-dim">
              {content.ctaFinal.subhead}
            </p>
          </AnimatedItem>
          <AnimatedItem className="mt-8">
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              {content.ctaFinal.cta} <span aria-hidden>→</span>
            </Link>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </>
  );
}
