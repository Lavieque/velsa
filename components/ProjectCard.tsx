import { Link } from "@/i18n/navigation";
import type { Content, Project } from "@/lib/content";
import { AnimatedItem } from "./AnimatedSection";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectCard({
  project,
  reversed,
  viewCaseStudy,
  alt,
}: {
  project: Project;
  reversed?: boolean;
  viewCaseStudy: string;
  alt: Content["ui"]["alt"];
}) {
  return (
    <AnimatedItem
      as="article"
      className={`grid items-center gap-8 border-b border-line py-14 last:border-b-0 md:grid-cols-2 md:gap-14 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
        className="relative block aspect-[3/2] overflow-hidden rounded-xl border border-line transition-opacity hover:opacity-90"
      >
        <ProjectMedia project={project} alt={alt} />
      </Link>

      <div>
        <span className="text-xs uppercase tracking-[0.14em] text-amber-soft">
          {project.category}
        </span>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl text-parchment sm:text-3xl">{project.title}</h3>
          <span className="shrink-0 text-sm text-parchment-dim">{project.year}</span>
        </div>

        <p className="mt-3 text-parchment-dim">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-parchment-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
          className="underline-draw mt-5 inline-flex items-center gap-2 text-sm text-parchment"
        >
          {viewCaseStudy} <span aria-hidden>→</span>
        </Link>
      </div>
    </AnimatedItem>
  );
}
