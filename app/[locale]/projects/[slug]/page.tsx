import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
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
    <section className="shell max-w-6xl pb-28 pt-36 sm:pt-44">
      <Reveal>
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-parchment-dim transition-colors hover:text-parchment">
          <ArrowLeft
            aria-hidden
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          {ui.backToProjects}
        </Link>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2"
        >
          <h1 className="max-w-[18ch] text-balance font-display text-4xl leading-[1.05] tracking-[-0.035em] text-parchment transition-colors duration-300 group-hover:text-amber-soft sm:text-5xl">
            {project.title}
          </h1>
          <ArrowUpRight
            aria-hidden
            className="h-6 w-6 text-parchment-dim transition-colors group-hover:text-amber-soft"
          />
        </a>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-amber-soft">{project.category}</p>
        <p className="mt-5 max-w-[58ch] text-pretty text-lg leading-relaxed text-parchment-dim">
          {project.description}
        </p>
      </Reveal>

      <Reveal className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-line">
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
          <ProjectMedia project={project} priority allowVideo alt={ui.alt} />
        </a>
      </Reveal>

      <Reveal className="mt-14 max-w-[58ch] border-l border-amber/50 pl-6 text-pretty font-display text-lg leading-relaxed text-parchment-dim">
        {project.clientIntro}
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-xl text-parchment">{project.challengeHeading}</h2>
          <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-parchment-dim">{project.problem}</p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-parchment">{ui.theSolution}</h2>
          <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-parchment-dim">{project.solution}</p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.responsibility}</h2>
        <ul className="mt-4 space-y-2">
          {project.responsibilities.map((item) => (
            <li key={item} className="flex gap-4 text-pretty leading-relaxed text-parchment-dim">
              <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-amber" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
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
      </Reveal>

      <Reveal className="mt-14 rounded-2xl border border-line bg-ink-soft p-8">
        <h2 className="font-display text-xl text-parchment">{ui.result}</h2>
        <p className="mt-3 leading-relaxed text-amber-soft">{project.result}</p>
      </Reveal>

      {relatedProduct && (
        <Reveal className="mt-14 flex flex-col gap-6 rounded-2xl border border-line p-8 sm:flex-row sm:items-center">
          {(relatedProduct.logoKey || relatedProduct.logoImage) && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <ProductVisual product={relatedProduct} alt={ui.alt} />
            </div>
          )}
          <div>
            <h2 className="text-xs uppercase tracking-[0.16em] text-amber-soft">
              {ui.ownProductUsedHere}
            </h2>
            <p className="mt-3 font-display text-xl text-parchment">{relatedProduct.name}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment-dim">
              {relatedProduct.headline}
            </p>
            <Link
              href={{ pathname: "/products/[slug]", params: { slug: relatedProduct.slug } }}
              className="underline-draw group mt-4 inline-flex items-center gap-2 text-sm text-parchment"
            >
              {ui.discover(relatedProduct.name)}
          <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      )}

      <Reveal className="mt-14">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-draw group inline-flex items-center gap-2 text-sm text-parchment"
        >
          {ui.viewProjectLive}
          <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </section>
  );
}
