import { Link } from "@/i18n/navigation";
import { getContent, getProjects, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({
  locale,
  limit,
  showCta = false,
}: {
  locale: Locale;
  limit?: number;
  showCta?: boolean;
}) {
  const content = getContent(locale);
  const all = getProjects(locale);
  const items = limit ? all.slice(0, limit) : all;

  return (
    <AnimatedSection className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32" stagger={0.08}>
      <AnimatedItem className="max-w-xl">
        <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
          {content.projects.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
          {content.projects.headline}
        </h2>
      </AnimatedItem>

      <div className="mt-8">
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
        <AnimatedItem className="mt-10">
          <Link href="/projects" className="underline-draw text-sm text-parchment">
            {content.projects.cta} →
          </Link>
        </AnimatedItem>
      )}
    </AnimatedSection>
  );
}
