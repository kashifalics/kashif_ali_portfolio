import Link from "next/link";
import { ArrowRight, ExternalLink, FlaskConical, GitCommitHorizontal, NotebookPen, ShieldCheck } from "lucide-react";
import type { Project } from "@/types";
import { Container, Section, ButtonLink } from "@/components/ui/primitives";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { StatusText } from "@/components/projects/Badges";
import { Animate } from "@/components/ui/Animate";

/* Counted from the private repository on 2026-10-30; update when they change. */
const evidence = [
  { figure: "622", label: "backend tests", v: "Run in CI against a real Postgres on every push.", Icon: FlaskConical },
  { figure: "21", label: "recorded decisions", v: "Each with its reasoning, in the architecture document.", Icon: NotebookPen },
  { figure: "78", label: "commits in 13 days", v: "From foundation to a live product, 14–26 October 2026.", Icon: GitCommitHorizontal },
  { figure: "0", label: "auto-submissions", v: "Approval is enforced by a database trigger, not a prompt.", Icon: ShieldCheck },
];

export function Flagship({ project }: { project: Project }) {
  return (
    <Section id="flagship" labelledBy="flagship-title">
      <Container>
        <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-12">
          <Animate effect="fadeInLeft">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-3">
              <span>Flagship · {project.ownership}</span>
              <StatusText status={project.status} />
            </p>
            <h2 id="flagship-title" className="mt-4 text-5xl leading-[0.98] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {project.name}
            </h2>
            {project.categoryLine && <p className="mt-4 font-mono text-xs text-fg-3 sm:text-[13px]">{project.categoryLine}</p>}
          </Animate>
          <Animate effect="fadeInRight" delay={0.3}>
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
          </Animate>
        </div>

        <Animate effect="zoomIn" className="mt-12">
          <Link href={`/projects/${project.slug}`} aria-label={`${project.name} case study`} className="group block transition-transform duration-500 hover:-translate-y-1">
            <ProjectMedia project={project} natural sizes="(min-width: 1200px) 1150px, 100vw" />
          </Link>
        </Animate>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map(({ figure, label, v, Icon }, i) => (
            <Animate
              key={label}
              as="li"
              effect="fadeInUp"
              delay={0.5 + i * 0.1}
            >
              <div className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_24px_50px_-28px_rgba(56,189,248,0.45)]">
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-blue/15 text-cyan transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                  <Icon size={20} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight text-fg">{figure}</span>
                  <span className="text-[15px] font-medium text-fg">{label}</span>
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{v}</p>
              </div>
            </Animate>
          ))}
        </ul>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.map((s, i) => (
            <Animate key={s} as="li" effect="zoomIn" delay={0.05 * i}>
              <span className="inline-block rounded-full border border-line bg-bg-2 px-3.5 py-1.5 font-mono text-xs text-fg-2 transition-colors hover:border-cyan hover:text-cyan">
                {s}
              </span>
            </Animate>
          ))}
        </ul>

        {project.architecture && project.architectureFlow && (
          <Animate effect="fadeInUp" className="mt-16">
            <h3 className="text-2xl font-semibold">How it fits together</h3>
            <p className="mt-2 max-w-2xl text-fg-2">
              From the person to a downloadable document, with the browser extension alongside. Select any part to see what it does.
            </p>
            <div className="mt-6">
              <ArchitectureDiagram nodes={project.architecture} flow={project.architectureFlow} title="job-apply-agent / architecture" />
            </div>
          </Animate>
        )}
      </Container>
    </Section>
  );
}
