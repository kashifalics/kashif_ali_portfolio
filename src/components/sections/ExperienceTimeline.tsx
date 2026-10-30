import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";

export function ExperienceTimeline() {
  return (
    <ol className="relative ml-2 border-l border-line-strong/60 sm:ml-3">
      {experience.map((e, i) => (
        <Reveal key={e.organisation} delay={0.06 * i}>
          <li className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
            <span aria-hidden className="absolute top-1.5 -left-[7px] grid size-3.5 place-items-center rounded-full border border-cyan bg-bg">
              <span className="size-1.5 rounded-full bg-cyan" />
            </span>
            <div className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="label">{e.kind}</p>
                {e.period && <p className="font-mono text-xs text-fg-3">{e.period}</p>}
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{e.organisation}</h3>
              <p className="mt-1 text-fg">{e.role}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-fg-2">{e.description}</p>
              {e.related && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-cyan"
                      >
                        {r.label} <ArrowUpRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
