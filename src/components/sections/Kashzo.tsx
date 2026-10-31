import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { kashzo } from "@/data/experience";
import { sortedProjects as projects } from "@/data/projects";
import { Container, Section } from "@/components/ui/primitives";
import { StatusText } from "@/components/projects/Badges";

export function Kashzo() {
  const selected = kashzo.projectSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Section id="kashzo" labelledBy="kashzo-title" className="bg-bg-2">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Image src={kashzo.logo.src} alt={kashzo.logo.alt} width={kashzo.logo.width} height={kashzo.logo.height} sizes="200px" className="h-auto w-[180px]" />
            <h2 id="kashzo-title" className="mt-10 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl">
              {kashzo.headline}
            </h2>
            <p className="prose-body mt-6 max-w-xl">{kashzo.description}</p>
            <p className="mt-4 text-sm text-fg-3">
              {kashzo.role}, {kashzo.name}
            </p>
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
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="label">Services</h3>
              <ul className="mt-3 border-t border-line">
                {kashzo.services.map((s) => (
                  <li key={s.title} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <span className="text-fg">{s.title}</span>
                    <span className="text-sm text-fg-3">{s.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label">Work</h3>
              <ul className="mt-3 border-t border-line">
                {selected.map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link href={`/projects/${p.slug}`} className="group flex items-center justify-between gap-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-fg group-hover:text-cyan">
                        {p.name}
                        <ArrowUpRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                      </span>
                      <StatusText status={p.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
