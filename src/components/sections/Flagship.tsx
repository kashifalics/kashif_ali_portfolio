import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { Container, Section, ButtonLink } from "@/components/ui/primitives";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { StatusText } from "@/components/projects/Badges";

/* Counted from the private repository on 2026-10-30; update when they change. */
const evidence = [
  { k: "622 backend tests", v: "run in CI against a real Postgres on every push" },
  { k: "21 recorded decisions", v: "each with its reasoning, in the architecture document" },
  { k: "78 commits in 13 days", v: "from foundation to a live product, 14–26 October 2026" },
  { k: "Never submits for you", v: "approval is enforced by a database trigger, not a prompt" },
];

export function Flagship({ project }: { project: Project }) {
  return (
    <Section id="flagship" labelledBy="flagship-title">
      <Container>
        <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-12">
          <div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-3">
              <span>Flagship · {project.ownership}</span>
              <StatusText status={project.status} />
            </p>
            <h2 id="flagship-title" className="mt-4 text-5xl leading-[0.98] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {project.name}
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-fg-2">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={`/projects/${project.slug}`}>
                Read the case study <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
                >
                  Open the live app <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        <Link href={`/projects/${project.slug}`} aria-label={`${project.name} case study`} className="group mt-12 block">
          <ProjectMedia project={project} priority natural sizes="(min-width: 1200px) 1150px, 100vw" />
        </Link>

        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map((e) => (
            <div key={e.k} className="border-t border-line pt-4">
              <dt className="font-display text-lg font-medium text-fg">{e.k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-fg-2">{e.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-fg-3">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>

        {project.architecture && project.architectureFlow && (
          <div className="mt-16">
            <h3 className="text-2xl font-semibold">How it fits together</h3>
            <p className="mt-2 max-w-2xl text-fg-2">
              From the person to a downloadable document, with the browser extension alongside. Select any part to see what it does.
            </p>
            <div className="mt-6">
              <ArchitectureDiagram nodes={project.architecture} flow={project.architectureFlow} title="job-apply-agent / architecture" />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
