import type { FeatureState, Ownership, ProjectStatus } from "@/types";
import { cn } from "@/lib/site";

const statusTone: Record<ProjectStatus, string> = {
  Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Completed: "border-cyan/30 bg-cyan/10 text-cyan",
  "In Progress": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Prototype: "border-sky-300/25 bg-sky-300/5 text-sky-200",
  Academic: "border-indigo-300/30 bg-indigo-300/10 text-indigo-200",
  Concept: "border-slate-300/25 bg-slate-300/5 text-slate-300",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs",
        statusTone[status],
        className,
      )}
    >
      {status === "Live" && <span className="size-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" />}
      {status}
    </span>
  );
}

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-emerald-400",
  Completed: "bg-cyan",
  "In Progress": "bg-amber-300",
  Prototype: "bg-sky-300/70",
  Academic: "bg-indigo-300",
  Concept: "bg-slate-400",
};

/** Status as plain text with a coloured dot, for lists. */
export function StatusText({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs whitespace-nowrap text-fg-2">
      <span className={cn("size-1.5 rounded-full", statusDot[status])} aria-hidden />
      {status}
    </span>
  );
}

export function OwnershipBadge({ ownership }: { ownership: Ownership }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-bg-2/80 px-2.5 py-1 text-xs text-fg-2">
      {ownership}
    </span>
  );
}

const featureTone: Record<FeatureState, { label: string; className: string }> = {
  implemented: { label: "Implemented", className: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
  "in-progress": { label: "In progress", className: "text-amber-200 border-amber-300/30 bg-amber-300/10" },
  planned: { label: "Planned", className: "text-slate-300 border-slate-300/25 bg-slate-300/5" },
  experimental: { label: "Experimental", className: "text-sky-200 border-sky-300/25 bg-sky-300/5" },
};

export function FeatureStateBadge({ state }: { state: FeatureState }) {
  const t = featureTone[state];
  return (
    <span className={cn("inline-flex shrink-0 rounded-full border px-2 py-0.5 font-mono text-xs", t.className)}>
      {t.label}
    </span>
  );
}
