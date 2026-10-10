import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AnimatedItem, AnimatedSection } from "@/components/AnimatedSection";
import { ProductVisual } from "@/components/ProductVisual";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  findProductBySlug,
  getContent,
  getProducts,
  getProjectById,
  productSlugs,
  type Locale,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProducts(locale).map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = findProductBySlug(locale, slug);
  if (!product) return {};

  const slugs = productSlugs[product.id];
  return buildMetadata({
    locale,
    title: product.name,
    description: product.headline,
    hrefs: {
      pt: { pathname: "/products/[slug]", params: { slug: slugs.pt } },
      en: { pathname: "/products/[slug]", params: { slug: slugs.en } },
    },
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = findProductBySlug(locale, slug);
  if (!product) notFound();

  const content = getContent(locale);
  const { ui } = content;
  const relatedProject = product.relatedProject
    ? getProjectById(locale, product.relatedProject)
    : undefined;

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40" stagger={0.12}>
      <AnimatedItem>
        <Link href="/products" className="underline-draw text-sm text-parchment-dim">
          ← {ui.backToProducts}
        </Link>

        <span className="mt-6 block text-xs uppercase tracking-[0.16em] text-amber-soft">
          {product.category}
        </span>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2"
        >
          <h1 className="font-display text-4xl leading-tight text-parchment transition-colors group-hover:text-amber-soft sm:text-5xl">
            {product.name}
          </h1>
          <ArrowUpRight
            aria-hidden
            className="h-6 w-6 text-parchment-dim transition-colors group-hover:text-amber-soft"
          />
        </a>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-parchment-dim">
          {product.headline}
        </p>
      </AnimatedItem>

      <AnimatedItem className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-line">
        <a href={product.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
          <ProductVisual product={product} alt={ui.alt} />
        </a>
      </AnimatedItem>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <AnimatedItem>
          <h2 className="font-display text-xl text-parchment">{ui.theProblem}</h2>
          <p className="mt-3 leading-relaxed text-parchment-dim">{product.problem}</p>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="font-display text-xl text-parchment">{ui.valueProposition}</h2>
          <p className="mt-3 leading-relaxed text-parchment-dim">{product.valueProposition}</p>
        </AnimatedItem>
      </div>

      <AnimatedItem className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.keyFeatures}</h2>
        <ul className="mt-4 space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-parchment-dim">
              <span aria-hidden className="text-amber-soft">
                →
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </AnimatedItem>

      <AnimatedItem className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.technologies}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-parchment-dim"
            >
              {tag}
            </li>
          ))}
        </ul>
      </AnimatedItem>

      {relatedProject && (
        <AnimatedItem className="mt-14 rounded-2xl border border-line p-8">
          <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
            {ui.usedInProduction}
          </span>
          <h2 className="mt-3 font-display text-xl text-parchment">{relatedProject.title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment-dim">
            {relatedProject.summary}
          </p>
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: relatedProject.slug } }}
            className="underline-draw mt-4 inline-flex items-center gap-2 text-sm text-parchment"
          >
            {ui.viewCaseStudy} <span aria-hidden>→</span>
          </Link>
        </AnimatedItem>
      )}

      <AnimatedItem className="mt-14">
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-draw inline-flex items-center gap-2 text-sm text-parchment"
        >
          {ui.viewProductLive} <span aria-hidden>→</span>
        </a>
      </AnimatedItem>

      <AnimatedItem className="mt-14 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <p className="text-parchment-dim">{ui.interestedIn(product.name)}</p>
        <Link
          href="/contact"
          className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          {content.ctaLabel} <span aria-hidden>→</span>
        </Link>
      </AnimatedItem>
    </AnimatedSection>
  );
}
