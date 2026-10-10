import Image from "next/image";
import type { Content, Project } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectMedia({
  project,
  priority,
  allowVideo = false,
  alt,
}: {
  project: Project;
  priority?: boolean;
  /** Only the project detail page plays the video; listings use the poster image. */
  allowVideo?: boolean;
  alt: Content["ui"]["alt"];
}) {
  if (allowVideo && project.video) {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={project.image}
        aria-label={alt.projectVideo(project.title)}
      >
        <source src={project.video} type="video/mp4" />
      </video>
    );
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={alt.projectScreenshot(project.title)}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        priority={priority}
      />
    );
  }

  return (
    <ProjectVisual
      visual={{
        slug: project.slug,
        title: project.title,
        label: project.year,
        tag: project.tags[0],
        palette: project.palette,
        pattern: project.pattern,
      }}
      alt={alt}
    />
  );
}
