"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Rocket, Search, Workflow } from "lucide-react";
import { philosophy } from "@/data/profile";
import { cn } from "@/lib/site";

const icons = [Search, Workflow, Code2, Rocket];

/**
 * The four stages as flip cards: the front states the stage, the back shows
 * the decision it led to in the Job Apply Agent. Hover or keyboard focus turns
 * a card; on touch screens a tap does.
 */
export function Philosophy() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {philosophy.map((s, i) => {
        const Icon = icons[i];
        return (
          <motion.li
            key={s.step}
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={cn(i % 2 === 1 && "sm:translate-y-8")}
          >
            <div
              role="button"
              tabIndex={0}
              aria-pressed={flipped === i}
              aria-label={`${s.step}: ${s.body} In the Job Apply Agent: ${s.example}`}
              data-flipped={flipped === i}
              onClick={() => setFlipped((f) => (f === i ? null : i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped((f) => (f === i ? null : i));
                }
              }}
              className="flip-card h-[300px] cursor-pointer rounded-[10px] outline-offset-4"
            >
              <div className="flip-inner">
                <div className="flip-face flex flex-col border border-line bg-card p-7 shadow-[0_0_18px_2px_rgba(0,0,0,0.45)]">
                  <div className="flex items-start justify-between">
                    <Icon size={34} strokeWidth={1.8} className="text-cyan" aria-hidden />
                    <span className="font-mono text-xs text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight">{s.step}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
                </div>

                <div className="flip-face flip-back flex flex-col items-center justify-center bg-blue px-6 text-center text-white">
                  <Icon size={30} strokeWidth={1.8} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-semibold">{s.step}</h3>
                  <p className="mt-1 text-[12.5px] text-white/75">In the Job Apply Agent</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed">{s.example.charAt(0).toUpperCase() + s.example.slice(1)}</p>
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
