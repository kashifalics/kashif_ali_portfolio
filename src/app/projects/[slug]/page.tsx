import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { getProject, sortedProjects } from "@/data/projects";
import { withAvailableAssets } from "@/lib/assets";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { GitHubIcon } from "@/components/ui/icons";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ScreenFrame } from "@/components/projects/ScreenFrame";
import { SourceDiagramView } from "@/components/projects/SourceDiagramView";
import { CodeExcerptView } from "@/components/projects/CodeExcerptView";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { FeatureStateBadge, OwnershipBadge, StatusBadge } from "@/components/projects/Badges";
import { ContactCta } from "@/components/sections/ContactCta";
import type { FeatureState } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = withAvailableAssets(project).cover;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.name,
      description: project.summary,
      ...(cover && !cover.src.includes("logo") ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : {}),
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-line py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-12">
          <h2 className="text-xl font-semibold text-fg lg:text-2xl">{title}</h2>
          <div className="min-w-0">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

const stateOrder: FeatureState[] = ["implemented", "in-progress", "experimental", "planned"];

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const project = withAvailableAssets(raw);

  const index = sortedProjects.findIndex((p) => p.slug === slug);
  const prev = sortedProjects[index - 1];
  const next = sortedProjects[index + 1];

  const features = project.features
    ? [...project.features].sort((a, b) => stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state))
    : [];

  const facts = [
    { k: "Status", v: <StatusBadge status={project.status} /> },
    { k: "Ownership", v: <OwnershipBadge ownership={project.ownership} /> },
    project.role && { k: "My role", v: project.role },
    project.year && { k: "Year", v: project.year },
  ].filter(Boolean) as { k: string; v: React.ReactNode }[];

  return (
    <article>
      <header className="pt-32 md:pt-40">
        <Container>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-fg-2 transition-colors hover:text-cyan">
            <ArrowLeft size={15} /> All projects
          </Link>
          <p className="label mt-8">{project.categories.join("  /  ")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.04] font-bold sm:text-5xl lg:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-snug text-fg-2 sm:text-2xl">{project.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Live demo <ExternalLink size={15} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                <GitHubIcon className="size-4" /> Source code
              </a>
            )}
            {project.linkNote && (
              <p className="inline-flex items-center gap-2 text-sm text-fg-3">
                <Lock size={14} /> {project.linkNote}
              </p>
            )}
          </div>
        </Container>
      </header>

      <Container>
        <Reveal className="mt-12">
          <figure className={project.cover && project.cover.width / project.cover.height < 1.2 ? "mx-auto max-w-xl" : undefined}>
            <div className="shadow-[0_40px_120px_-50px_rgba(56,189,248,0.4)]">
              <ProjectMedia project={project} priority natural sizes="(min-width: 1200px) 1150px, 100vw" />
            </div>
            {project.cover?.caption && <figcaption className="mt-3 text-sm text-fg-3">{project.cover.caption}</figcaption>}
          </figure>
        </Reveal>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="bg-bg-2 p-5">
              <dt className="text-xs text-fg-3">{f.k}</dt>
              <dd className="mt-2 text-sm text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          {(project.overview || project.summary) && (
            <Block title="Overview">
              <p className="prose-body">{project.overview ?? project.summary}</p>
            </Block>
          )}

          {(project.problem || project.objective || project.solution) && (
            <Block title="Problem and solution">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["The problem", project.problem],
                  ["The objective", project.objective],
                  ["The solution", project.solution],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="card p-5">
                      <h3 className="label">{k}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{v}</p>
                    </div>
                  ))}
              </div>
            </Block>
          )}

          {project.contribution && (
            <Block title="My contribution">
              <ul className="space-y-3">
                {project.contribution.map((c) => (
                  <li key={c} className="flex gap-3 text-fg-2">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-cyan" />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Technology stack">
            {project.stackGroups ? (
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.stackGroups.map((g) => (
                  <div key={g.label} className="card p-5">
                    <dt className="label">{g.label}</dt>
                    <dd className="mt-3 flex flex-wrap gap-1.5">
                      {g.items.map((i) => (
                        <span key={i} className="rounded-md border border-line bg-bg-2/70 px-2 py-1 font-mono text-[11px] text-fg-2">
                          {i}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-bg-2/70 px-2.5 py-1 font-mono text-xs text-fg-2">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </Block>

          {project.diagram && project.cover && (
            <Block title="How it runs">
              <SourceDiagramView diagram={project.diagram} />
            </Block>
          )}

          {project.code && (project.cover || project.diagram) && (
            <Block title="From the code">
              <CodeExcerptView excerpt={project.code} />
            </Block>
          )}

          {project.architecture && project.architectureFlow && (
            <Block title="System architecture">
              <ArchitectureDiagram nodes={project.architecture} flow={project.architectureFlow} title={`${project.slug} / architecture`} />
            </Block>
          )}

          {features.length > 0 && (
            <Block title="Main functionality">
              <p className="mb-6 text-sm text-fg-3">Each feature is marked with how far it has really got, checked against the source code.</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {features.map((f) => (
                  <li key={f.title} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-fg">{f.title}</h3>
                      <FeatureStateBadge state={f.state} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">{f.description}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.workflow && (
            <Block title={project.featured ? "User journey" : "How it works"}>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.workflow.map((w, i) => (
                  <li key={w.title} className="card relative p-5">
                    <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-semibold text-fg">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{w.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {project.sections?.map((s) => (
            <Block key={s.heading} title={s.heading}>
              <div className="prose-body space-y-4">
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-fg-2">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Block>
          ))}

          {project.challenges && (
            <Block title="Technical challenges">
              <dl className="space-y-6">
                {project.challenges.map((c) => (
                  <div key={c.title} className="border-l-2 border-cyan/50 pl-5">
                    <dt className="font-semibold text-fg">{c.title}</dt>
                    <dd className="mt-1.5 leading-relaxed text-fg-2">{c.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <Block title="Screenshots">
              <div className="grid gap-6 md:grid-cols-2">
                {project.screenshots.map((s) => (
                  <figure key={s.src}>
                    <ScreenFrame origin={s.origin}>
                      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 768px) 45vw, 100vw" className="h-auto w-full" />
                    </ScreenFrame>
                    {s.caption && <figcaption className="mt-2.5 text-sm text-fg-3">{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Block>
          )}
        </div>

        <nav aria-label="More projects" className="mt-6 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="card group p-5 transition-colors hover:border-line-strong">
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-3">
                <ArrowLeft size={13} /> Previous
              </span>
              <span className="mt-2 block font-semibold text-fg group-hover:text-cyan">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="card group p-5 text-right transition-colors hover:border-line-strong">
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-3">
                Next <ArrowRight size={13} />
              </span>
              <span className="mt-2 block font-semibold text-fg group-hover:text-cyan">{next.name}</span>
            </Link>
          )}
        </nav>
      </Container>
      <ContactCta />
    </article>
  );
}
