import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AnimatedItem, AnimatedSection } from "@/components/AnimatedSection";
import { ProductVisual } from "@/components/ProductVisual";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  findProjectBySlug,
  getContent,
  getProductById,
  getProjects,
  projectSlugs,
  type Locale,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = findProjectBySlug(locale, slug);
  if (!project) return {};

  const slugs = projectSlugs[project.id];
  return buildMetadata({
    locale,
    title: project.title,
    description: project.summary,
    hrefs: {
      pt: { pathname: "/projects/[slug]", params: { slug: slugs.pt } },
      en: { pathname: "/projects/[slug]", params: { slug: slugs.en } },
    },
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = findProjectBySlug(locale, slug);
  if (!project) notFound();

  const { ui } = getContent(locale);
  const relatedProduct = project.relatedProduct
    ? getProductById(locale, project.relatedProduct)
    : undefined;

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40" stagger={0.12}>
      <AnimatedItem>
        <Link href="/projects" className="underline-draw text-sm text-parchment-dim">
          ← {ui.backToProjects}
        </Link>

        <span className="mt-6 block text-xs uppercase tracking-[0.16em] text-amber-soft">
          {project.category}
        </span>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2"
        >
          <h1 className="font-display text-4xl leading-tight text-parchment transition-colors group-hover:text-amber-soft sm:text-5xl">
            {project.title}
          </h1>
          <ArrowUpRight
            aria-hidden
            className="h-6 w-6 text-parchment-dim transition-colors group-hover:text-amber-soft"
          />
        </a>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-parchment-dim">
          {project.description}
        </p>
      </AnimatedItem>

      <AnimatedItem className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-line">
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
          <ProjectMedia project={project} priority allowVideo alt={ui.alt} />
        </a>
      </AnimatedItem>

      <AnimatedItem className="mt-14 max-w-2xl border-l-2 border-line pl-6 text-parchment-dim">
        {project.clientIntro}
      </AnimatedItem>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <AnimatedItem>
          <h2 className="font-display text-xl text-parchment">{project.challengeHeading}</h2>
          <p className="mt-3 leading-relaxed text-parchment-dim">{project.problem}</p>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="font-display text-xl text-parchment">{ui.theSolution}</h2>
          <p className="mt-3 leading-relaxed text-parchment-dim">{project.solution}</p>
        </AnimatedItem>
      </div>

      <AnimatedItem className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.responsibility}</h2>
        <ul className="mt-4 space-y-2">
          {project.responsibilities.map((item) => (
            <li key={item} className="flex gap-3 text-parchment-dim">
              <span aria-hidden className="text-amber-soft">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </AnimatedItem>

      <AnimatedItem className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.technologies}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-parchment-dim"
            >
              {tag}
            </li>
          ))}
        </ul>
      </AnimatedItem>

      <AnimatedItem className="mt-14 rounded-2xl border border-line bg-ink-soft p-8">
        <h2 className="font-display text-xl text-parchment">{ui.result}</h2>
        <p className="mt-3 leading-relaxed text-amber-soft">{project.result}</p>
      </AnimatedItem>

      {relatedProduct && (
        <AnimatedItem className="mt-14 flex flex-col gap-6 rounded-2xl border border-line p-8 sm:flex-row sm:items-center">
          {(relatedProduct.logoKey || relatedProduct.logoImage) && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <ProductVisual product={relatedProduct} alt={ui.alt} />
            </div>
          )}
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
              {ui.ownProductUsedHere}
            </span>
            <h2 className="mt-3 font-display text-xl text-parchment">{relatedProduct.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment-dim">
              {relatedProduct.headline}
            </p>
            <Link
              href={{ pathname: "/products/[slug]", params: { slug: relatedProduct.slug } }}
              className="underline-draw mt-4 inline-flex items-center gap-2 text-sm text-parchment"
            >
              {ui.discover(relatedProduct.name)} <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimatedItem>
      )}

      <AnimatedItem className="mt-14">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-draw inline-flex items-center gap-2 text-sm text-parchment"
        >
          {ui.viewProjectLive} <span aria-hidden>→</span>
        </a>
      </AnimatedItem>
    </AnimatedSection>
  );
}
