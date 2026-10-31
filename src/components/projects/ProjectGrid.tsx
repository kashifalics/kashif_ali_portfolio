"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/site";
import { Animate, type Effect } from "@/components/ui/Animate";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

/* Columns enter from their own side, as on the reference: left, up, right. */
const columnEffect: Effect[] = ["fadeInLeft", "fadeInUp", "fadeInRight"];

export function ProjectGrid({
  projects,
  categories,
  headingLevel,
}: {
  projects: Project[];
  categories?: ProjectCategory[];
  /** 2 when the grid sits directly under the page title. */
  headingLevel?: 2 | 3;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects],
  );

  return (
    <div>
      {categories && (
        <div role="group" aria-label="Filter projects by area" className="-mx-4 mb-10 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {(["All", ...categories] as Filter[]).map((f) => {
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors",
                    on ? "border-blue bg-blue text-white" : "border-line text-fg-2 hover:border-line-strong hover:text-fg",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Animate key={`${filter}-${p.slug}`} as="li" effect={columnEffect[i % 3]} delay={(Math.floor(i / 3) % 2) * 0.2}>
            <ProjectCard project={p} headingLevel={headingLevel} />
          </Animate>
        ))}
      </ul>
    </div>
  );
}
