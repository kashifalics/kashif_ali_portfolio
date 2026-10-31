"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Entrance animations, played once as the element scrolls into view. The
 * values match the reference site's: 1.25s, full-width slides, a 30% zoom.
 */
const effects = {
  fadeIn: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
  fadeInLeft: { hidden: { opacity: 0, x: "-100%" }, shown: { opacity: 1, x: 0 } },
  fadeInRight: { hidden: { opacity: 0, x: "100%" }, shown: { opacity: 1, x: 0 } },
  fadeInUp: { hidden: { opacity: 0, y: "100%" }, shown: { opacity: 1, y: 0 } },
  zoomIn: { hidden: { opacity: 0, scale: 0.3 }, shown: { opacity: 1, scale: 1 } },
} as const;

export type Effect = keyof typeof effects;

export function Animate({
  effect = "fadeIn",
  delay = 0,
  className,
  as = "div",
  children,
}: {
  effect?: Effect;
  /** Seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={effects[effect]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1.25, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </Tag>
  );
}
