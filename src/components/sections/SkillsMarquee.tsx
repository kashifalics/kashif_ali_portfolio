import { marqueeSkills } from "@/data/skills";

export function SkillsMarquee() {
  const row = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="relative border-y border-line bg-bg-2/50 py-5" aria-label="Technologies I work with">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee-track flex w-max gap-3">
          {row.map((s, i) => (
            <li
              key={`${s}-${i}`}
              aria-hidden={i >= marqueeSkills.length}
              className="rounded-full border border-line bg-card/70 px-4 py-2 font-mono text-[13px] whitespace-nowrap text-fg-2"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
