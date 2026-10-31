import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { kashzo } from "@/data/experience";
import { sortedProjects as projects } from "@/data/projects";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/projects/Badges";

export function Kashzo() {
  const selected = kashzo.projectSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Section id="kashzo" labelledBy="kashzo-title" className="border-t border-line">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-elevated via-card to-bg-2">
          <div aria-hidden className="absolute -top-40 -right-40 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_65%)]" />
          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
            <Reveal>
              <p className="label">{kashzo.role}, {kashzo.name}</p>
              <h2 id="kashzo-title" className="mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
                {kashzo.headline}
              </h2>
              <p className="prose-body mt-5 max-w-xl">{kashzo.description}</p>

              <div className="mt-8 inline-flex rounded-2xl border border-line bg-bg/60 px-6 py-5">
                <Image src={kashzo.logo.src} alt={kashzo.logo.alt} width={kashzo.logo.width} height={kashzo.logo.height} sizes="240px" className="h-auto w-[220px]" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={kashzo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  Visit kashzo.com <ExternalLink size={15} />
                </a>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {kashzo.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg-2 transition-colors hover:text-cyan">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-sm font-medium text-fg-2">Services</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {kashzo.services.map((s) => (
                  <li key={s.title} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="font-medium text-fg">{s.title}</span>
                    <span className="text-right text-sm text-fg-3">{s.body}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-sm font-medium text-fg-2">Selected projects</h3>
              <ul className="mt-4 grid gap-2.5">
                {selected.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-bg/40 px-4 py-3 transition-colors hover:border-line-strong"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-fg group-hover:text-cyan">{p.name}</span>
                        <span className="block text-xs text-fg-3">{p.ownership}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={p.status} />
                        <ArrowUpRight size={15} className="text-fg-3 group-hover:text-cyan" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
