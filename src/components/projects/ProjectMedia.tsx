import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/site";
import { ScreenFrame } from "./ScreenFrame";
import { SourceDiagramView } from "./SourceDiagramView";
import { CodeExcerptView } from "./CodeExcerptView";

/**
 * The project's main visual, always genuine: a real capture in a ScreenFrame,
 * else a flow read from its code, else a verbatim code excerpt, else a quiet
 * panel with the project's initials. `natural` keeps a capture at its own proportions (case studies);
 * without it the visual fills the box it is given (cards).
 */
export function ProjectMedia({
  project,
  sizes,
  priority,
  natural,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  natural?: boolean;
  className?: string;
}) {
  const { cover, diagram, code } = project;

  if (cover) {
    return (
      <ScreenFrame origin={cover.origin} className={cn(!natural && "h-full", className)}>
        {natural ? (
          <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={sizes} priority={priority} className="h-auto w-full" />
        ) : (
          <div className="relative min-h-0 flex-1">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        )}
      </ScreenFrame>
    );
  }

  if (diagram) {
    return natural ? (
      <div className={className}>
        <SourceDiagramView diagram={diagram} />
      </div>
    ) : (
      <div className={cn("h-full overflow-hidden rounded-xl border border-line-strong/50 bg-bg-2", className)}>
        <SourceDiagramView diagram={diagram} compact />
      </div>
    );
  }

  if (code) {
    return natural ? (
      <div className={className}>
        <CodeExcerptView excerpt={code} />
      </div>
    ) : (
      <div className={cn("h-full overflow-hidden rounded-xl border border-line-strong/50", className)}>
        <CodeExcerptView excerpt={code} compact />
      </div>
    );
  }

  const initials = project.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      aria-hidden
      className={cn("grid h-full min-h-48 place-items-center rounded-xl border border-line bg-bg-2", className)}
    >
      <span className="font-display text-4xl font-semibold text-fg-3/60">{initials}</span>
    </div>
  );
}
