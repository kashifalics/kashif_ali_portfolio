import { ArrowDown, ArrowRight, Database } from "lucide-react";
import type { SourceDiagram } from "@/types";
import { cn } from "@/lib/site";

/**
 * A flow read from the project's code. `compact` is the card version: labels
 * only, sized to sit inside a 16:10 cover.
 */
export function SourceDiagramView({ diagram, compact }: { diagram: SourceDiagram; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex size-full flex-col justify-center gap-4 bg-[linear-gradient(rgba(148,178,214,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,178,214,0.05)_1px,transparent_1px)] bg-[size:22px_22px] p-5">
        <ol className="flex flex-wrap items-center gap-1.5">
          {diagram.steps.map((s, i) => (
            <li key={s.label} className="flex items-center gap-1.5">
              <span className="rounded-md border border-line-strong/70 bg-card px-2 py-1 font-mono text-xs text-fg">{s.label}</span>
              {i < diagram.steps.length - 1 && <ArrowRight size={12} className="text-cyan/70" aria-hidden />}
            </li>
          ))}
        </ol>
        {diagram.stores && (
          <ul className="flex flex-wrap gap-1.5">
            {diagram.stores.map((s) => (
              <li key={s.label} className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-line-strong/60 px-2 py-1 font-mono text-xs text-fg-2">
                <Database size={11} className="text-cyan/80" aria-hidden /> {s.label}
              </li>
            ))}
          </ul>
        )}
        <p className="font-mono text-xs text-fg-3">from {diagram.source}</p>
      </div>
    );
  }

  return (
    <figure className="rounded-xl border border-line bg-bg-2/70 p-5 sm:p-6">
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {diagram.steps.map((s, i) => (
          <li key={s.label} className="flex flex-col items-stretch gap-2 lg:min-w-0 lg:flex-1 lg:flex-row">
            <div className="flex-1 rounded-lg border border-line-strong/60 bg-card px-3.5 py-3">
              <p className="font-mono text-[13px] font-medium break-words text-fg">{s.label}</p>
              {s.detail && <p className="mt-1 text-[12.5px] leading-snug text-fg-2">{s.detail}</p>}
            </div>
            {i < diagram.steps.length - 1 && (
              <span className="flex items-center justify-center text-cyan/70" aria-hidden>
                <ArrowDown size={14} className="lg:hidden" />
                <ArrowRight size={14} className="hidden lg:block" />
              </span>
            )}
          </li>
        ))}
      </ol>
      {diagram.stores && (
        <ul className={cn("mt-4 grid grid-cols-1 gap-2 border-t border-dashed border-line pt-4", diagram.stores.length > 1 && "sm:grid-cols-2")}>
          {diagram.stores.map((s) => (
            <li key={s.label} className="flex items-start gap-3 rounded-lg border border-dashed border-line-strong/50 px-3.5 py-3">
              <Database size={15} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
              <span>
                <span className="block font-mono text-[13px] text-fg">{s.label}</span>
                {s.detail && <span className="mt-0.5 block text-[12.5px] text-fg-2">{s.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      <figcaption className="mt-4 font-mono text-xs text-fg-3">Read from {diagram.source}</figcaption>
    </figure>
  );
}
