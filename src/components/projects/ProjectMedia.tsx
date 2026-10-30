import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/site";
import { ProjectVisual } from "./ProjectVisual";

/** The project's cover image, or its drawn visual when no image is available. */
export function ProjectMedia({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const cover = project.cover;
  const isLogo = cover?.src.includes("logo");
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {cover ? (
        isLogo ? (
          <div className="grid size-full place-items-center bg-[radial-gradient(ellipse_at_50%_30%,#152238,#070b14_75%)] p-10">
            <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="320px" className="h-auto w-[70%] max-w-[300px]" />
          </div>
        ) : (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )
      ) : (
        <ProjectVisual kind={project.visual} label={`Diagram representing ${project.name}`} />
      )}
    </div>
  );
}
