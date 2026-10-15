import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getContent, getProjects, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({
  locale,
  limit,
  showCta = false,
  headingLevel = "h2",
}: {
  locale: Locale;
  limit?: number;
  showCta?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const content = getContent(locale);
  const all = getProjects(locale);
  const items = limit ? all.slice(0, limit) : all;
  const Heading = headingLevel;

  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <Heading className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
          {content.projects.headline}
        </Heading>
      </Reveal>

      <div className="mt-10 border-t border-line">
        {items.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            reversed={i % 2 === 1}
            viewCaseStudy={content.ui.viewCaseStudy}
            alt={content.ui.alt}
          />
        ))}
      </div>

      {showCta && (
        <Reveal className="mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-parchment"
          >
            <span className="underline-draw">{content.projects.cta}</span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
