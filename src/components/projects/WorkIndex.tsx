"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/site";
import { ProjectMedia } from "./ProjectMedia";
import { StatusText } from "./Badges";

type Filter = "All" | ProjectCategory;

/**
 * Every project as one row of facts. On wide screens the row under the pointer
 * (or keyboard focus) shows its genuine visual in a pinned preview beside the list.
 */
export function WorkIndex({ projects, categories }: { projects: Project[]; categories?: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects],
  );
  const [activeSlug, setActiveSlug] = useState<string | undefined>(projects[0]?.slug);
  const active = visible.find((p) => p.slug === activeSlug) ?? visible[0];

  return (
    <div>
      {categories && (
        <div role="group" aria-label="Filter projects by area" className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-x-5 gap-y-2 sm:w-auto sm:flex-wrap">
            {(["All", ...categories] as Filter[]).map((f) => {
              const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setFilter(f);
                    setActiveSlug(undefined);
                  }}
                  className={cn(
                    "py-1.5 text-sm whitespace-nowrap underline-offset-[6px] transition-colors",
                    on ? "text-fg underline decoration-cyan" : "text-fg-3 hover:text-fg",
                  )}
                >
                  {f} <span className="font-mono text-[11px] text-fg-3">{count}</span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
        </div>
      )}

      <div className={cn("grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]", categories && "mt-8")}>
        <ol className="border-t border-line">
          {visible.map((p) => {
            const on = p.slug === active?.slug;
            return (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/projects/${p.slug}`}
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onFocus={() => setActiveSlug(p.slug)}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,1fr)_10rem_7rem_2.5rem] lg:grid-cols-[minmax(0,1fr)_7rem_2.5rem]"
                >
                  <span className="min-w-0">
                    <span className={cn("flex items-center gap-2 font-display text-xl font-medium tracking-tight transition-colors sm:text-[1.375rem]", on ? "text-cyan" : "text-fg group-hover:text-cyan")}>
                      {p.name}
                      <ArrowUpRight size={17} className={cn("shrink-0 transition-opacity", on ? "opacity-100" : "opacity-0 group-hover:opacity-100")} aria-hidden />
                    </span>
                    <span className="mt-1 block text-[14.5px] leading-snug text-fg-2">{p.tagline}</span>
                    <span className="mt-1 hidden text-[12.5px] text-fg-3 lg:block">{p.categories[0]}</span>
                  </span>
                  <span className="hidden text-[13px] text-fg-3 md:block lg:hidden">{p.categories[0]}</span>
                  <StatusText status={p.status} />
                  <span className="hidden text-right font-mono text-xs text-fg-3 md:block">{p.year ?? ""}</span>
                </Link>
              </li>
            );
          })}
        </ol>

        {active && (
          <aside aria-label="Preview" className="hidden lg:block">
            <div className="sticky top-24">
              <div key={active.slug} className="motion-safe:animate-[fade-in_0.25s_ease-out]">
                <div className="relative aspect-[16/10]">
                  <div className="absolute inset-0">
                    <ProjectMedia project={active} sizes="28rem" />
                  </div>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-fg-2">{active.summary}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] text-fg-3">
                  {active.stack.slice(0, 5).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
                <p className="mt-3 text-[13px] text-fg-3">{active.ownership}</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
