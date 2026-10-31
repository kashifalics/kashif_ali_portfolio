"use client";

import { useMemo, useState } from "react";
import { Bot, Database, Globe, Puzzle, Server, User } from "lucide-react";
import type { ArchitectureNode } from "@/types";
import { cn } from "@/lib/site";

const kindIcon = {
  client: Globe,
  service: Server,
  data: Database,
  ai: Bot,
  external: Puzzle,
} as const;

/**
 * Lane-based system diagram. Each lane is a row; selecting a node shows what it
 * does and highlights the nodes it talks to. Reads top to bottom on every
 * screen size, so nothing has to shrink to stay legible on a phone.
 */
export function ArchitectureDiagram({
  nodes,
  flow,
  title = "System architecture",
}: {
  nodes: ArchitectureNode[];
  flow: [string, string][];
  title?: string;
}) {
  const [selected, setSelected] = useState(nodes[0]?.id);

  const lanes = useMemo(() => {
    const byLane = new Map<number, ArchitectureNode[]>();
    nodes.forEach((n) => byLane.set(n.lane, [...(byLane.get(n.lane) ?? []), n]));
    return [...byLane.entries()].sort((a, b) => a[0] - b[0]).map(([, ns]) => ns);
  }, [nodes]);

  const neighbours = useMemo(() => {
    const set = new Set<string>();
    flow.forEach(([a, b]) => {
      if (a === selected) set.add(b);
      if (b === selected) set.add(a);
    });
    return set;
  }, [flow, selected]);

  const current = nodes.find((n) => n.id === selected);
  const connected = nodes.filter((n) => neighbours.has(n.id));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <p className="font-mono text-xs text-fg-2">{title}</p>
        <p className="hidden font-mono text-[11px] text-fg-3 sm:block">Select a component</p>
      </div>
      <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative px-4 py-6 sm:px-6">
          <ol className="relative space-y-3">
            {lanes.map((lane, li) => (
              <li key={li} className="relative">
                {li > 0 && (
                  <svg aria-hidden className="mx-auto -mt-1 mb-2 block h-5 w-3" viewBox="0 0 12 20">
                    <line x1="6" y1="0" x2="6" y2="20" stroke="rgba(56,189,248,0.5)" className="flow-dash" />
                  </svg>
                )}
                <div className={cn("grid gap-2.5", lane.length > 1 ? "grid-cols-2" : "grid-cols-1 sm:mx-auto sm:max-w-[60%]")}>
                  {lane.map((n) => {
                    const Icon = n.id === "user" ? User : kindIcon[n.kind ?? "service"];
                    const isSel = n.id === selected;
                    const isNb = neighbours.has(n.id);
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setSelected(n.id)}
                        aria-pressed={isSel}
                        // Pops in after the previous component when the diagram is revealed.
                        style={{ animationDelay: `${0.12 + nodes.indexOf(n) * 0.05}s` }}
                        className={cn(
                          "pop-item flex min-h-[64px] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                          isSel
                            ? "border-cyan bg-cyan/10 shadow-[0_0_0_4px_rgba(56,189,248,0.08)]"
                            : isNb
                              ? "border-cyan/40 bg-elevated"
                              : "border-line bg-bg-2/70 hover:border-line-strong",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg border",
                            isSel ? "border-cyan/50 text-cyan" : "border-line text-fg-2",
                          )}
                        >
                          <Icon size={15} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] leading-tight font-semibold text-fg sm:text-sm">{n.label}</span>
                          {n.tech && <span className="mt-0.5 block truncate font-mono text-[10px] text-fg-3 sm:text-[11px]">{n.tech}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-line bg-bg-2/50 p-5 sm:p-6 lg:border-t-0 lg:border-l" aria-live="polite">
          {current && (
              <div key={current.id} className="motion-safe:animate-[fade-in_0.22s_ease-out]">
                <p className="label">{current.tech ?? "Component"}</p>
                <h3 className="mt-2 text-xl font-semibold">{current.label}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{current.detail}</p>
                {connected.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs text-fg-3">Connects to</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {connected.map((c) => (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => setSelected(c.id)}
                            className="rounded-md border border-line-strong px-2 py-1 font-mono text-[11px] text-cyan hover:bg-cyan/10"
                          >
                            {c.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
