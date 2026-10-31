import type { ReactNode } from "react";
import { cn } from "@/lib/site";

/**
 * A quiet dark window around a real capture. The title bar shows where the
 * capture came from (a URL, "localhost · Streamlit", "Tkinter window"), so the
 * frame adds context without imitating any particular browser.
 */
export function ScreenFrame({
  origin,
  className,
  children,
}: {
  origin?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-line-strong/50 bg-bg-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(56,189,248,0.04)] transition-colors duration-300 group-hover:border-line-strong",
        className,
      )}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line bg-elevated/70 px-3">
        <span className="size-2 rounded-full bg-fg-3/30" />
        <span className="size-2 rounded-full bg-fg-3/30" />
        <span className="size-2 rounded-full bg-fg-3/30" />
        {origin && <span className="ml-2 truncate font-mono text-[10.5px] text-fg-3">{origin}</span>}
      </div>
      {children}
    </div>
  );
}
