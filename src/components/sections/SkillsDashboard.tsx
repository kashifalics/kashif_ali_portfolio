import { skillGroups } from "@/data/skills";

/** Skills grouped by area; each names where it was used, if anywhere on this site. */
export function SkillsDashboard() {
  return (
    <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((g) => (
        <div key={g.key}>
          <dt className="border-b border-line pb-3 font-display text-lg font-medium text-fg">{g.title}</dt>
          <dd>
            <ul className="mt-3 space-y-2.5">
              {g.items.map((s) => (
                <li key={s.name} className="grid grid-cols-[minmax(0,auto)_1fr] items-baseline gap-3 text-sm">
                  <span className="text-fg">{s.name}</span>
                  <span className="truncate text-right text-[12.5px] text-fg-3">{s.usedIn ?? ""}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
