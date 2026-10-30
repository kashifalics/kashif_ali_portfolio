"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Boxes, Braces, Database, Layers, LayoutTemplate, Library, Network, Server, Workflow } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/site";

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

export function SkillsDashboard() {
  const [active, setActive] = useState(skillGroups[0].key);
  const reduce = useReducedMotion();
  const group = skillGroups.find((g) => g.key === active)!;
  const Icon = icons[group.key];

  return (
    <div className="card grid overflow-hidden lg:grid-cols-[280px_1fr]">
      <div role="tablist" aria-label="Skill areas" aria-orientation="vertical" className="flex gap-1 overflow-x-auto border-b border-line p-2 lg:flex-col lg:border-r lg:border-b-0 lg:p-3">
        {skillGroups.map((g) => {
          const GIcon = icons[g.key];
          const on = g.key === active;
          return (
            <button
              key={g.key}
              role="tab"
              id={`tab-${g.key}`}
              aria-selected={on}
              aria-controls="skill-panel"
              onClick={() => setActive(g.key)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm whitespace-nowrap transition-colors",
                on ? "bg-elevated text-fg" : "text-fg-2 hover:bg-elevated/50 hover:text-fg",
              )}
            >
              <GIcon size={16} className={on ? "text-cyan" : "text-fg-3"} aria-hidden />
              {g.title}
              <span className="ml-auto hidden font-mono text-[11px] text-fg-3 lg:inline">{g.items.length}</span>
            </button>
          );
        })}
      </div>

      <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${group.key}`} className="min-h-[340px] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={group.key}
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-line-strong text-cyan">
                <Icon size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="text-sm text-fg-2">{group.blurb}</p>
              </div>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {group.items.map((s) => (
                <li
                  key={s.name}
                  className="group rounded-xl border border-line bg-bg-2/60 px-4 py-3.5 transition-colors hover:border-line-strong"
                >
                  <p className="font-medium text-fg transition-colors group-hover:text-cyan">{s.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-fg-3">{s.usedIn ? `Used in: ${s.usedIn}` : "Studied and practised"}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
