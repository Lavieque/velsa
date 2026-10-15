import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { ServiceBanner } from "@/components/ServiceBanner";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  findServiceBySlug,
  getContent,
  getProjectById,
  getServices,
  serviceSlugs,
  type Locale,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getServices(locale).map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = findServiceBySlug(locale, slug);
  if (!service) return {};

  const slugs = serviceSlugs[service.id];
  return buildMetadata({
    locale,
    title: service.title,
    description: service.description,
    hrefs: {
      pt: { pathname: "/services/[slug]", params: { slug: slugs.pt } },
      en: { pathname: "/services/[slug]", params: { slug: slugs.en } },
    },
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = findServiceBySlug(locale, slug);
  if (!service) notFound();

  const content = getContent(locale);
  const { ui } = content;
  const relatedProject = service.relatedProject
    ? getProjectById(locale, service.relatedProject)
    : undefined;

  return (
    <section className="shell max-w-6xl pb-28 pt-36 sm:pt-44">
      <Reveal>
        <Link href="/services" className="group inline-flex items-center gap-2 text-sm text-parchment-dim transition-colors hover:text-parchment">
          <ArrowLeft
            aria-hidden
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          {ui.backToServices}
        </Link>
      </Reveal>

      <Reveal className="mt-6 aspect-[21/9] rounded-2xl border border-line">
        <ServiceBanner
          icon={service.icon}
          image={service.image}
          title={service.title}
          alt={ui.alt}
          priority
          className="h-full w-full rounded-2xl"
        />
      </Reveal>

      <Reveal className="mt-10">
        <h1 className="font-display text-4xl leading-tight text-parchment sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-5 max-w-[58ch] text-pretty text-lg leading-relaxed text-parchment-dim">
          {service.description}
        </p>
      </Reveal>

      <Reveal className="mt-10 max-w-2xl">
        <p className="leading-relaxed text-parchment-dim">{service.detail}</p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.whatsIncluded}</h2>
        <ul className="mt-4 space-y-2">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-4 text-pretty leading-relaxed text-parchment-dim">
              <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-amber" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="font-display text-xl text-parchment">{ui.advantages}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-xl border border-line bg-ink-soft/50 px-4 py-3 text-sm text-parchment-dim"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </Reveal>

      {relatedProject && (
        <Reveal className="mt-14 rounded-2xl border border-line p-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-amber-soft">
            {ui.caseStudy}
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

      <Reveal className="mt-14 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <p className="text-parchment-dim">{ui.needHelpWith(service.title)}</p>
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
