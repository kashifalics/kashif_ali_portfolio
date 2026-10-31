"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/site";

/**
 * A card that turns over to the right (3D, 0.5s) on hover or keyboard focus,
 * or on a tap, revealing its back. Styles live in globals.css (.flip-*).
 */
export function FlipCard({
  front,
  back,
  label,
  className,
  backClassName,
}: {
  front: ReactNode;
  back: ReactNode;
  /** Full text of both faces, for screen readers. */
  label: string;
  className?: string;
  backClassName?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      data-flipped={flipped}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      className={cn("flip-card cursor-pointer rounded-[10px] outline-offset-4", className)}
    >
      <div className="flip-inner">
        <div className="flip-face flex flex-col border border-line bg-card shadow-[0_0_18px_2px_rgba(0,0,0,0.45)]">{front}</div>
        <div className={cn("flip-face flip-back flex flex-col items-center justify-center bg-blue text-center text-white", backClassName)}>{back}</div>
      </div>
    </div>
  );
}
