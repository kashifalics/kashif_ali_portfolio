import { Code2, Rocket, Search, Workflow } from "lucide-react";
import { philosophy } from "@/data/profile";
import { cn } from "@/lib/site";
import { Animate } from "@/components/ui/Animate";
import { FlipCard } from "@/components/ui/FlipCard";

const icons = [Search, Workflow, Code2, Rocket];

/**
 * The four stages as flip cards: the front states the stage, the back shows
 * the decision it led to in the Job Apply Agent.
 */
export function Philosophy() {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {philosophy.map((s, i) => {
        const Icon = icons[i];
        const example = s.example.charAt(0).toUpperCase() + s.example.slice(1);
        return (
          <Animate key={s.step} as="li" effect={i % 2 === 0 ? "fadeInLeft" : "fadeInRight"} delay={i % 2 === 0 ? 0 : 0.3} className={cn(i % 2 === 1 && "sm:translate-y-8")}>
            <FlipCard
              className="h-[300px]"
              label={`${s.step}: ${s.body} In the Job Apply Agent: ${example}`}
              front={
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <Icon size={34} strokeWidth={1.8} className="text-cyan" aria-hidden />
                    <span className="font-mono text-xs text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight">{s.step}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
                </div>
              }
              backClassName="px-6"
              back={
                <>
                  <Icon size={30} strokeWidth={1.8} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-semibold">{s.step}</h3>
                  <p className="mt-1 text-[12.5px] text-white/75">In the Job Apply Agent</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed">{example}</p>
                </>
              }
            />
          </Animate>
        );
      })}
    </ol>
  );
}
