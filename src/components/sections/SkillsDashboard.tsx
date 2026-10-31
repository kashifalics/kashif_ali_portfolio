import Link from "next/link";
import { Bot, Boxes, Braces, Database, Layers, LayoutTemplate, Library, Network, Server, Workflow } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { sortedProjects } from "@/data/projects";
import { Animate } from "@/components/ui/Animate";

const icons: Record<string, typeof Bot> = {
  programming: Braces,
  ai: Network,
  agentic: Bot,
  rag: Layers,
  frontend: LayoutTemplate,
  backend: Server,
  data: Database,
  infra: Boxes,
  automation: Workflow,
  libraries: Library,
};

const projectName = new Map(sortedProjects.map((p) => [p.slug, p.name]));

/**
 * One card per area, skills as chips. A skill used in a project on this site
 * has a cyan dot and links to that project's case study.
 */
export function SkillsDashboard() {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((g, i) => {
        const Icon = icons[g.key] ?? Braces;
        return (
          <Animate
            key={g.key}
            as="li"
            effect="fadeInUp"
            delay={(i % 3) * 0.15}
            // A lone card on the last row of three spans it, so the grid doesn't end in a gap.
            className={i === skillGroups.length - 1 && skillGroups.length % 3 === 1 ? "lg:col-span-3" : undefined}
          >
            <div className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blue/15 text-cyan transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                <Icon size={18} strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => {
                const used = (s.projects ?? []).filter((slug) => projectName.has(slug));
                const chip = "inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-2 px-3 py-1.5 text-[13px] text-fg-2";
                return (
                  <li key={s.name}>
                    {used.length > 0 ? (
                      <Link
                        href={`/projects/${used[0]}`}
                        title={`Used in: ${used.map((u) => projectName.get(u)).join(", ")}`}
                        className={`${chip} transition-colors hover:border-cyan hover:text-fg`}
                      >
                        <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
                        {s.name}
                        <span className="sr-only">, used in {used.map((u) => projectName.get(u)).join(", ")}</span>
                      </Link>
                    ) : (
                      <span className={chip}>{s.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            </div>
          </Animate>
        );
      })}
    </ul>
  );
}
