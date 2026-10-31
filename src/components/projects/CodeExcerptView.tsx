import type { CodeExcerpt } from "@/types";
import { cn } from "@/lib/site";

const token = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|\b(?:class|def|return|from|import|print|async|await|if|else|for|in)\b|\b\d+(?:\.\d+)?\b)/g;

/** Light Python-ish highlighting: keywords, strings, numbers, comments. */
function Line({ text }: { text: string }) {
  const parts = text.split(token);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (i % 2 === 0) return <span key={i}>{p}</span>;
        const cls = p.startsWith("#")
          ? "text-fg-3"
          : p.startsWith('"') || p.startsWith("'")
            ? "text-amber-200/90"
            : /^\d/.test(p)
              ? "text-emerald-300/90"
              : "text-cyan";
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
    </>
  );
}

/** A verbatim excerpt of the project's code, with its real output when there is one. */
export function CodeExcerptView({ excerpt, compact }: { excerpt: CodeExcerpt; compact?: boolean }) {
  const lines = excerpt.code.split("\n");
  return (
    <div className={cn("flex flex-col overflow-hidden bg-[#0a1220] font-mono", compact ? "size-full text-[11px]" : "rounded-xl border border-line text-[12.5px] sm:text-[13px]")}>
      <div className="flex shrink-0 items-center border-b border-line bg-elevated/60">
        <span className="border-r border-line border-b-2 border-b-cyan px-3 py-1.5 text-[11px] text-fg">{excerpt.file}</span>
      </div>
      <div className={cn("relative min-h-0 flex-1 overflow-hidden", !compact && "overflow-x-auto")}>
        <pre className={cn("leading-relaxed", compact ? "p-3" : "p-4")}>
          {lines.map((l, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 text-right text-fg-3/50 select-none">{i + 1}</span>
              <code className="whitespace-pre text-fg-2">
                <Line text={l} />
              </code>
            </div>
          ))}
        </pre>
        {compact && <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0a1220] to-transparent" />}
      </div>
      {excerpt.output && (
        <div className={cn("shrink-0 border-t border-line bg-bg/60", compact ? "px-3 py-2" : "px-4 py-3")}>
          <p className="text-[10px] text-fg-3">Output</p>
          <pre className="mt-1 whitespace-pre-wrap text-emerald-300/90">{excerpt.output}</pre>
        </div>
      )}
    </div>
  );
}
