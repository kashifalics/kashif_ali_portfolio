import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ProjectMedia } from "./ProjectMedia";
import { StatusText } from "./Badges";

/** Image-led card: the visual first, then name, one line, the main stack and who it was for. */
export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_24px_50px_-28px_rgba(56,189,248,0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <ProjectMedia project={project} sizes="(min-width: 1024px) 380px, (min-width: 640px) 48vw, 92vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-1">
        <div className="flex items-center justify-between gap-3 text-xs text-fg-3">
          <span className="truncate">{project.categories[0]}</span>
          <StatusText status={project.status} />
        </div>
        <Heading className="mt-2 font-display text-lg leading-snug font-semibold tracking-tight text-fg transition-colors group-hover:text-cyan">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 min-h-[2lh] text-sm leading-snug text-fg-2">{project.tagline}</p>
        <ul className="mt-4 mb-4 flex flex-wrap gap-1.5" aria-label="Main technologies">
          {project.stack.slice(0, 3).map((s) => (
            <li key={s} className="rounded-full bg-bg-2 px-2.5 py-1 font-mono text-xs text-fg-2">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3.5 text-xs">
          <span className="text-fg-3">{project.ownership}</span>
          <span className="inline-flex items-center gap-1 font-medium text-cyan">
            View case study <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}
