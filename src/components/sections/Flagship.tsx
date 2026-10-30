import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { Container, Section, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { StatusBadge, OwnershipBadge } from "@/components/projects/Badges";

export function Flagship({ project }: { project: Project }) {
  const implemented = project.features?.filter((f) => f.state === "implemented").length ?? 0;
  return (
    <Section id="flagship" labelledBy="flagship-title" className="pt-16 md:pt-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <p className="label mr-2">Flagship project</p>
            <StatusBadge status={project.status} />
            <OwnershipBadge ownership={project.ownership} />
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h2 id="flagship-title" className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                {project.name}
              </h2>
              <p className="mt-3 font-mono text-sm text-fg-3">AI Agents | Full-Stack Development</p>
              <p className="prose-body mt-5 max-w-2xl">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/projects/${project.slug}`}>
                View Case Study <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
                >
                  Open the live app <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.name} case study`}
            className="group relative mt-12 block rounded-[22px] border border-line-strong bg-gradient-to-b from-elevated to-bg-2 p-2 shadow-[0_40px_120px_-40px_rgba(56,189,248,0.35)] transition-colors hover:border-cyan/60 sm:p-3"
          >
            <ProjectMedia
              project={project}
              priority
              natural
              sizes="(min-width: 1200px) 1150px, 100vw"
              className="aspect-[16/8] rounded-[14px] border border-line"
            />
            <span className="pointer-events-none absolute inset-2 rounded-[14px] bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inset-3" />
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { k: `${implemented} features`, v: "implemented and checked against the code" },
            { k: "Human approval", v: "enforced by a database trigger, not a prompt" },
            { k: "Evidence-cited", v: "every generated claim traces to a confirmed fact" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={0.05 * i} className="card p-5">
              <p className="font-display text-lg font-semibold text-fg">{s.k}</p>
              <p className="mt-1 text-sm text-fg-2">{s.v}</p>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md border border-line bg-bg-2/70 px-2.5 py-1 font-mono text-xs text-fg-2">
              {s}
            </li>
          ))}
        </ul>

        {project.architecture && project.architectureFlow && (
          <Reveal className="mt-14">
            <h3 className="text-2xl font-semibold">How it fits together</h3>
            <p className="mt-2 max-w-2xl text-fg-2">
              From the person to a downloadable document, with the browser extension alongside. Select any part to see what it does.
            </p>
            <div className="mt-6">
              <ArchitectureDiagram nodes={project.architecture} flow={project.architectureFlow} title="job-apply-agent / architecture" />
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
