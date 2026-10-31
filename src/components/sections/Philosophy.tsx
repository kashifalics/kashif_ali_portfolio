import { philosophy } from "@/data/profile";

/** Four stages, each shown as a decision actually made in the Job Apply Agent. */
export function Philosophy() {
  return (
    <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {philosophy.map((s, i) => (
        <li key={s.step} className="border-t border-line pt-5">
          <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{s.step}</h3>
          <p className="mt-2 leading-relaxed text-fg-2">{s.body}</p>
          <p className="mt-5 text-sm leading-relaxed text-fg-3">
            <span className="text-fg-2">In the Job Apply Agent: </span>
            {s.example}
          </p>
        </li>
      ))}
    </ol>
  );
}
