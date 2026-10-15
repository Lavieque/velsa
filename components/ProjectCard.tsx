import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Content, Project } from "@/lib/content";
import { Reveal } from "./Reveal";
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
    <Reveal
      as="article"
      className={`group grid items-center gap-8 border-b border-line py-16 last:border-b-0 md:grid-cols-2 md:gap-16 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[3/2] overflow-hidden rounded-xl border border-line"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProjectMedia project={project} alt={alt} />
        </div>
      </Link>

      <div>
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="font-display text-2xl tracking-[-0.02em] text-parchment transition-colors duration-300 group-hover:text-amber-soft sm:text-3xl">
            {project.title}
          </h3>
          <span className="tnum shrink-0 text-sm text-parchment-dim">{project.year}</span>
        </div>

        <p className="mt-4 max-w-[58ch] text-pretty text-parchment-dim">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          <li className="rounded-full border border-amber/40 px-3 py-1 text-xs uppercase tracking-[0.1em] text-amber-soft">
            {project.category}
          </li>
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
          className="mt-7 inline-flex items-center gap-2 text-sm text-parchment"
        >
          <span className="underline-draw">{viewCaseStudy}</span>
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Reveal>
  );
}
