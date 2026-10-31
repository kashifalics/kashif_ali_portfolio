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
  /**
   * Where the capture came from, shown in the frame's title bar: a real URL,
   * "localhost:8502 · Streamlit", "Tkinter window" and so on. Never invented.
   */
  origin?: string;
};

/** A flow read from the project's source code, not an illustration of it. */
export type SourceDiagram = {
  /** Files the diagram was read from, shown as its source. */
  source: string;
  steps: { label: string; detail?: string }[];
  /** Services the flow reads from or writes to, drawn under the steps. */
  stores?: { label: string; detail?: string }[];
};

/** A verbatim excerpt of the project's code, optionally with its real output. */
export type CodeExcerpt = {
  file: string;
  code: string;
  output?: string;
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
  /** A real capture of the product. Cards fall back to `diagram`, then `code`, then a placeholder. */
  cover?: Screenshot;
  diagram?: SourceDiagram;
  code?: CodeExcerpt;
  /** Kept in the data but left off the site. */
  hidden?: boolean;
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
