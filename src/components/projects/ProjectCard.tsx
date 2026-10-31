import Link from "next/link";
import type { Project } from "@/types";
import { ProjectMedia } from "./ProjectMedia";
import { StatusText } from "./Badges";

/** Image-led card: the project's visual, its name, one line, and its status. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full rounded-2xl border border-line bg-card p-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_24px_50px_-28px_rgba(56,189,248,0.45)]">
      <div className="relative aspect-[16/10]">
        <div className="absolute inset-0">
          <ProjectMedia project={project} sizes="(min-width: 1024px) 380px, (min-width: 640px) 48vw, 92vw" />
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 px-2 pt-4 pb-2">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-fg transition-colors group-hover:text-cyan">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-fg-2">{project.tagline}</p>
        </div>
        <span className="mt-1 shrink-0">
          <StatusText status={project.status} />
        </span>
      </div>
    </article>
  );
}
