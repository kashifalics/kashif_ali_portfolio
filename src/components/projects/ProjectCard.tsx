import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ProjectMedia } from "./ProjectMedia";
import { OwnershipBadge, StatusBadge } from "./Badges";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-line-strong">
      <div className="relative">
        <ProjectMedia project={project} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/9] border-b border-line" />
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} className="bg-bg/80 backdrop-blur" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label">{project.categories[0]}</p>
        <h3 className="mt-2 text-xl font-semibold text-fg">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-fg-2">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Main technologies">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-md border border-line bg-bg-2/70 px-2 py-1 font-mono text-[11px] text-fg-2">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <OwnershipBadge ownership={project.ownership} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan">
            View Case Study
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
