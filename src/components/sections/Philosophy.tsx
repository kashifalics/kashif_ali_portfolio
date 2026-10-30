"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { philosophy } from "@/data/profile";
import { cn } from "@/lib/site";

/** A four-stage process: select a stage to see how it plays out in practice. */
export function Philosophy() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="relative">
        <div aria-hidden className="absolute top-[22px] right-[12.5%] left-[12.5%] hidden h-px bg-line md:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-cyan to-cyan-2"
            animate={{ scaleX: active / (philosophy.length - 1) }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <ol className="relative grid gap-3 md:grid-cols-4 md:gap-5">
          {philosophy.map((s, i) => {
            const on = i === active;
            const done = i <= active;
            return (
              <li key={s.step}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={on}
                  className="group flex w-full items-start gap-4 text-left md:flex-col md:items-center md:text-center"
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full border bg-bg font-mono text-sm transition-colors",
                      done ? "border-cyan text-cyan" : "border-line text-fg-3",
                      on && "shadow-[0_0_0_6px_rgba(56,189,248,0.1)]",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="md:mt-4">
                    <span className={cn("block font-display text-xl font-semibold transition-colors", on ? "text-fg" : "text-fg-2")}>{s.step}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-2">{s.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <motion.p
        key={active}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-auto mt-10 max-w-2xl px-6 py-5 text-center text-fg-2"
        aria-live="polite"
      >
        <span className="text-fg">{philosophy[active].step}: </span>
        {philosophy[active].detail}
      </motion.p>
    </div>
  );
}
