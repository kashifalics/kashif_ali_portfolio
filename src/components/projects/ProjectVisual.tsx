import type { Project } from "@/types";

/**
 * A drawn diagram that stands in for a project with no screenshot. Each kind
 * hints at what the project is (a pipeline, a graph, a voice call, a chart),
 * so cards stay distinct without inventing an interface.
 */
export function ProjectVisual({ kind = "network", label }: { kind?: Project["visual"]; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#152238,#0b1220_70%)]"
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(148,178,214,0.10)" />
          </pattern>
          <linearGradient id="cy" x1="0" x2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#dots)" />
        {kind === "pipeline" && <Pipeline />}
        {kind === "graph" && <Graph />}
        {kind === "voice" && <Voice />}
        {kind === "chart" && <Chart />}
        {kind === "network" && <Network />}
        {kind === "browser" && <Browser />}
      </svg>
    </div>
  );
}

const node = "fill-[#101b2d] stroke-[rgba(56,189,248,0.45)]";

function Pipeline() {
  const steps = ["PDF", "Chunk", "Embed", "Store", "Answer"];
  return (
    <g>
      <path d="M48 112 H352" stroke="rgba(56,189,248,0.35)" className="flow-dash" fill="none" />
      {steps.map((s, i) => (
        <g key={s} transform={`translate(${28 + i * 76} 92)`}>
          <rect width="52" height="40" rx="9" className={node} strokeWidth="1" />
          <text x="26" y="25" textAnchor="middle" fontSize="10" fill="#a8b5c7" fontFamily="monospace">
            {s}
          </text>
        </g>
      ))}
      <circle cx="352" cy="112" r="4" fill="url(#cy)" />
    </g>
  );
}

function Graph() {
  const pts: [number, number, string][] = [
    [80, 112, "START"],
    [180, 62, "retrieve"],
    [180, 162, "state"],
    [280, 112, "generate"],
    [350, 112, "END"],
  ];
  return (
    <g>
      {[
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        [3, 4],
      ].map(([a, b]) => (
        <line key={`${a}${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(56,189,248,0.35)" className="flow-dash" />
      ))}
      {pts.map(([x, y, t]) => (
        <g key={t}>
          <circle cx={x} cy={y} r="20" className={node} strokeWidth="1" />
          <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fill="#a8b5c7" fontFamily="monospace">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

function Voice() {
  return (
    <g>
      {Array.from({ length: 36 }, (_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7) * 60) + (i % 5) * 4;
        return <rect key={i} x={56 + i * 8} y={112 - h / 2} width="4" height={h} rx="2" fill="url(#cy)" opacity={0.35 + (i % 4) * 0.15} />;
      })}
    </g>
  );
}

function Chart() {
  return (
    <g>
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1="40" x2="360" y1={y} y2={y} stroke="rgba(148,178,214,0.08)" />
      ))}
      <path d="M40 170 L90 150 L130 158 L170 120 L210 128 L250 92 L290 100 L330 70 L360 62" fill="none" stroke="url(#cy)" strokeWidth="2" />
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx={50 + i * 14} cy={175 - i * 4.5 + Math.sin(i * 1.7) * 14} r="2.2" fill="rgba(168,181,199,0.45)" />
      ))}
    </g>
  );
}

function Network() {
  const layers = [3, 5, 5, 2];
  const pos = layers.map((n, li) => Array.from({ length: n }, (_, i) => [90 + li * 75, 112 + (i - (n - 1) / 2) * 30] as const));
  return (
    <g>
      {pos.slice(0, -1).map((layer, li) =>
        layer.flatMap(([x1, y1], a) =>
          pos[li + 1].map(([x2, y2], b) => (
            <line key={`${li}-${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(56,189,248,0.14)" />
          )),
        ),
      )}
      {pos.flat().map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className={node} strokeWidth="1" />
      ))}
    </g>
  );
}

function Browser() {
  return (
    <g>
      <rect x="60" y="34" width="280" height="160" rx="10" className={node} strokeWidth="1" />
      <line x1="60" x2="340" y1="56" y2="56" stroke="rgba(148,178,214,0.15)" />
      {[74, 84, 94].map((x) => (
        <circle key={x} cx={x} cy="45" r="3" fill="rgba(148,178,214,0.3)" />
      ))}
      <rect x="72" y="68" width="60" height="114" rx="5" fill="rgba(56,189,248,0.06)" />
      <rect x="142" y="68" width="186" height="40" rx="5" fill="rgba(56,189,248,0.08)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={142 + i * 64} y="116" width="58" height="66" rx="5" fill="rgba(148,178,214,0.06)" stroke="rgba(148,178,214,0.1)" />
      ))}
    </g>
  );
}
