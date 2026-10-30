export type ProjectCategory =
  | "AI & Agentic Systems"
  | "Generative AI & RAG"
  | "AI Automation"
  | "Full-Stack Development"
  | "Machine Learning"
  | "SaaS & Products"
  | "Business & Entrepreneurship"
  | "Academic Projects";

export type ProjectStatus =
  | "Completed"
  | "Live"
  | "In Progress"
  | "Prototype"
  | "Academic"
  | "Concept";

export type Ownership =
  | "Independent Project"
  | "Kashzo Solutions"
  | "Academic Project"
  | "Client Demonstration"
  | "Collaborative Project"
  | "Internship Project";

/** How far a single feature has really got, checked against the code. */
export type FeatureState = "implemented" | "in-progress" | "planned" | "experimental";

export type Feature = {
  title: string;
  description: string;
  state: FeatureState;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  /** Short technology hint shown under the label. */
  tech?: string;
  detail: string;
  /** Visual row in the diagram: nodes on the same lane sit side by side. */
  lane: number;
  kind?: "client" | "service" | "data" | "ai" | "external";
};

export type CaseSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** One or two sentences for cards. */
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  ownership: Ownership;
  featured?: boolean;
  /** Lower numbers sort first. */
  order: number;
  stack: string[];
  /** Grouped stack for the case study page. */
  stackGroups?: { label: string; items: string[] }[];
  cover?: Screenshot;
  /** Drawn visual used when there is no screenshot. */
  visual?: "pipeline" | "graph" | "voice" | "chart" | "network" | "browser";
  repoUrl?: string;
  liveUrl?: string;
  /** Why a link is missing, e.g. a private repository. */
  linkNote?: string;
  year?: string;
  role?: string;
  overview?: string;
  problem?: string;
  objective?: string;
  solution?: string;
  contribution?: string[];
  features?: Feature[];
  architecture?: ArchitectureNode[];
  architectureFlow?: [string, string][];
  workflow?: { title: string; detail: string }[];
  challenges?: { title: string; detail: string }[];
  sections?: CaseSection[];
  screenshots?: Screenshot[];
  /** Facts the owner still needs to confirm before they are shown. */
  pending?: string[];
};
