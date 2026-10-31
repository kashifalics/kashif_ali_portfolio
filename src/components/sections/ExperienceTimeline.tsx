import Link from "next/link";
import { Award, Briefcase, Code2, GraduationCap, Rocket } from "lucide-react";
import { certifications, education, experience } from "@/data/experience";
import { Animate, type Effect } from "@/components/ui/Animate";

const kindIcon = { Internship: Briefcase, Founder: Rocket, Independent: Code2 } as const;
const columnEffect: Effect[] = ["fadeInLeft", "fadeInUp", "fadeInRight"];

/** Roles as cards, then education with its certifications. */
export function ExperienceTimeline({ withEducation = true }: { withEducation?: boolean }) {
  return (
    <div className="space-y-6">
      <ol className="grid gap-5 md:grid-cols-3">
        {experience.map((e, i) => {
          const Icon = kindIcon[e.kind];
          return (
            <Animate
              key={e.organisation}
              as="li"
              effect={columnEffect[i % 3]}
              delay={i * 0.15}
            >
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_24px_50px_-28px_rgba(56,189,248,0.45)]">
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-blue/15 text-cyan transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                  <Icon size={20} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-2">{e.period ?? "Ongoing"}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{e.organisation}</h3>
              <p className="mt-1 text-[15px] text-cyan">{e.role}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-2">{e.description}</p>
              {e.related && (
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {e.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="inline-block rounded-full bg-bg-2 px-3 py-1.5 text-xs text-fg-2 transition-colors hover:bg-blue hover:text-white">
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              </div>
            </Animate>
          );
        })}
      </ol>

      {withEducation && (
        <Animate effect="fadeInUp" className="rounded-2xl border border-line bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue/15 text-cyan">
                <GraduationCap size={20} strokeWidth={1.8} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{education.institution}</h3>
                <p className="mt-1 text-[15px] text-cyan">{education.degree}</p>
              </div>
            </div>
            {education.period && <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-2">{education.period}</span>}
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Certifications">
            {certifications.map((c, i) => (
              <Animate key={c.title} as="li" effect="zoomIn" delay={0.1 * i} className="rounded-xl border border-line bg-bg-2 p-4">
                <Award size={18} strokeWidth={1.8} className="text-cyan" aria-hidden />
                <p className="mt-3 text-sm leading-snug font-medium text-fg">{c.title}</p>
                <p className="mt-1 text-xs text-fg-3">
                  {c.issuer} · {c.date}
                </p>
              </Animate>
            ))}
          </ul>
        </Animate>
      )}
    </div>
  );
}
