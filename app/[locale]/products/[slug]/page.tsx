import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
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
    <section className="shell max-w-6xl pb-28 pt-36 sm:pt-44">
      <Reveal>
        <Link href="/products" className="group inline-flex items-center gap-2 text-sm text-parchment-dim transition-colors hover:text-parchment">
          <ArrowLeft
            aria-hidden
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          {ui.backToProducts}
        </Link>

        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2"
        >
          <h1 className="max-w-[18ch] text-balance font-display text-4xl leading-[1.05] tracking-[-0.035em] text-parchment transition-colors duration-300 group-hover:text-amber-soft sm:text-5xl">
            {product.name}
          </h1>
          <ArrowUpRight
            aria-hidden
            className="h-6 w-6 text-parchment-dim transition-colors group-hover:text-amber-soft"
          />
        </a>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-amber-soft">{product.category}</p>
        <p className="mt-5 max-w-[58ch] text-pretty text-lg leading-relaxed text-parchment-dim">
          {product.headline}
        </p>
      </Reveal>

      <Reveal className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-line">
        <a href={product.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
          <ProductVisual product={product} alt={ui.alt} />
        </a>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-xl text-parchment">{ui.theProblem}</h2>
          <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-parchment-dim">{product.problem}</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-parchment">{ui.valueProposition}</h2>
          <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-parchment-dim">{product.valueProposition}</p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.keyFeatures}</h2>
        <ul className="mt-4 space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex gap-4 text-pretty leading-relaxed text-parchment-dim">
              <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-amber" />
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
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
      </Reveal>

      {relatedProject && (
        <Reveal className="mt-14 rounded-2xl border border-line p-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-amber-soft">
            {ui.usedInProduction}
          </h2>
          <p className="mt-3 font-display text-xl text-parchment">{relatedProject.title}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment-dim">
            {relatedProject.summary}
          </p>
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: relatedProject.slug } }}
            className="underline-draw group mt-4 inline-flex items-center gap-2 text-sm text-parchment"
          >
            {ui.viewCaseStudy}
          <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}

      <Reveal className="mt-14">
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-draw group inline-flex items-center gap-2 text-sm text-parchment"
        >
          {ui.viewProductLive}
          <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>

      <Reveal className="mt-14 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <p className="text-parchment-dim">{ui.interestedIn(product.name)}</p>
        <Link
          href="/contact"
          className="btn-glow group mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          {content.ctaLabel}
          <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
