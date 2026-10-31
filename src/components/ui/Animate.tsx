"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/site";

/**
 * Entrance animations, played once as the element scrolls into view, with the
 * reference site's values (1.25s, full-width slides, a 30% zoom). Pure CSS
 * (.anim-* in globals.css) driven by one IntersectionObserver per element;
 * with reduced motion the CSS shows everything at rest.
 */
export type Effect = "fadeIn" | "fadeInLeft" | "fadeInRight" | "fadeInUp" | "zoomIn";

export function Animate({
  effect = "fadeIn",
  delay = 0,
  className,
  as: Tag = "div",
  children,
}: {
  effect?: Effect;
  /** Seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The observed element never moves; only the inner one is offset. Watching a
  // translated element would report its shifted position, so a card sliding up
  // from 100% lower could stay hidden until the reader scrolled past it.
  return (
    <Tag
      // The ref type differs per tag; all three are HTMLElements.
      ref={ref as never}
      className={className}
    >
      <div
        className={cn("anim h-full", `anim-${effect}`, shown && "anim-in")}
        style={delay ? { transitionDelay: `${delay}s` } : undefined}
      >
        {children}
      </div>
    </Tag>
  );
}
