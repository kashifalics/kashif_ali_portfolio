import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { certifications, education, experience } from "@/data/experience";

/** Roles and education as one list: when on the left, what on the right. */
export function ExperienceTimeline({ withEducation = true }: { withEducation?: boolean }) {
  return (
    <ol className="border-t border-line">
      {experience.map((e) => (
        <li key={e.organisation} className="grid gap-3 border-b border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10">
          <div className="text-sm">
            <p className="font-mono text-xs text-fg-2">{e.period ?? "Ongoing"}</p>
            <p className="mt-1 text-fg-3">{e.kind}</p>
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight">{e.organisation}</h3>
            <p className="mt-1 text-fg">{e.role}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">{e.description}</p>
            {e.related && (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {e.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-flex items-center gap-1 text-cyan hover:underline">
                      {r.label} <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
      {withEducation && (
        <li className="grid gap-3 border-b border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10">
          <div className="text-sm">
            <p className="font-mono text-xs text-fg-2">{education.period}</p>
            <p className="mt-1 text-fg-3">Education</p>
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight">{education.institution}</h3>
            <p className="mt-1 text-fg">{education.degree}</p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
                  <span className="text-fg-2">
                    {c.title} <span className="text-fg-3">· {c.issuer}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-fg-3">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      )}
    </ol>
  );
}
