import Image from "next/image";
import Link from "next/link";
import { AppWindow, ArrowUpRight, Bot, Boxes, Briefcase, ExternalLink, Globe } from "lucide-react";
import { kashzo } from "@/data/experience";
import { sortedProjects as projects } from "@/data/projects";
import { cn } from "@/lib/site";
import { Container, Section } from "@/components/ui/primitives";
import { Animate } from "@/components/ui/Animate";
import { FlipCard } from "@/components/ui/FlipCard";
import { StatusText } from "@/components/projects/Badges";

const serviceIcons = [Globe, AppWindow, Bot, Briefcase, Boxes];

export function Kashzo() {
  const selected = kashzo.projectSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Section id="kashzo" labelledBy="kashzo-title" className="bg-bg-2">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Animate effect="zoomIn">
              <Image src={kashzo.logo.src} alt={kashzo.logo.alt} width={kashzo.logo.width} height={kashzo.logo.height} sizes="200px" className="h-auto w-[180px]" />
            </Animate>
            <Animate effect="fadeInLeft">
              <h2 id="kashzo-title" className="mt-10 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl">
                {kashzo.headline}
              </h2>
            </Animate>
            <Animate delay={0.3}>
              <p className="prose-body mt-6 max-w-xl">{kashzo.description}</p>
              <p className="mt-4 text-sm text-fg-3">
                {kashzo.role}, {kashzo.name}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="My role in the company">
                {kashzo.founderRole.map((r) => (
                  <li key={r} className="rounded-full border border-line bg-card px-3 py-1.5 text-[13px] text-fg-2">
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <a href={kashzo.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:underline">
                  kashzo.com <ExternalLink size={14} />
                </a>
                {kashzo.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg-2 hover:text-cyan">
                    {s.label}
                  </a>
                ))}
              </div>
            </Animate>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2" aria-label="Services">
            {kashzo.services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <Animate
                  key={s.title}
                  as="li"
                  effect={i % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
                  delay={i % 2 === 0 ? 0 : 0.3}
                  className={cn(i % 2 === 1 && "sm:translate-y-8")}
                >
                  <FlipCard
                    className="h-[190px]"
                    label={`${s.title}: ${s.body}`}
                    front={
                      <div className="flex h-full flex-col justify-end p-6">
                        <Icon size={32} strokeWidth={1.8} className="mb-auto text-cyan" aria-hidden />
                        <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                      </div>
                    }
                    backClassName="px-6"
                    back={
                      <>
                        <Icon size={28} strokeWidth={1.8} aria-hidden />
                        <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/90">{s.body}</p>
                      </>
                    }
                  />
                </Animate>
              );
            })}
          </ul>
        </div>

        <div className="mt-20">
          <Animate effect="fadeInLeft">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Work delivered through Kashzo</h3>
          </Animate>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {selected.map((p, i) => (
              <Animate key={p.slug} as="li" effect="fadeInUp" delay={0.1 * i}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-line bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong"
                >
                  <span className="flex items-start justify-between gap-2 font-medium text-fg group-hover:text-cyan">
                    {p.name}
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  <StatusText status={p.status} />
                </Link>
              </Animate>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
