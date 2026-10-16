import Image from "next/image";
import type { Content, Project } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";

/** Listing card: half-width 3:2 frame, 2.17:1 source covered into it (~1.45x the frame). */
const cardSizes = "(min-width: 1600px) 1020px, (min-width: 768px) 72vw, 145vw";

export function ProjectMedia({
  project,
  priority,
  allowVideo = false,
  alt,
  sizes = cardSizes,
}: {
  project: Project;
  priority?: boolean;
  /** Only the project detail page plays the video; listings use the poster image. */
  allowVideo?: boolean;
  alt: Content["ui"]["alt"];
  /**
   * Width the image is actually drawn at, not the frame's. The screenshots are
   * wider than their frame, so object-cover scales them past it and the browser
   * needs a larger file than the frame width suggests.
   */
  sizes?: string;
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
        sizes={sizes}
        quality={90}
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
