/**
 * Personal details and links: the one place to change them.
 * Every other part of the site reads from here.
 */
export const profile = {
  name: "Muhammad Kashif Ali",
  shortName: "Kashif Ali",
  initials: "KA",
  title: "AI Engineer & Entrepreneur",
  subtitle: "AI Engineer | Software Developer | Product Builder",
  eyebrow: "AI Engineer · Entrepreneur · Software Developer",
  location: "Lahore, Pakistan",
  headline: ["Engineering Intelligent Systems.", "Building Products That Matter."],
  intro:
    "I'm Muhammad Kashif Ali — an AI engineer and entrepreneur passionate about building intelligent applications, autonomous workflows, and digital products that solve real-world problems.",
  positioning:
    "I build AI-powered applications, intelligent agents, automation workflows, and full-stack products that transform complex ideas into practical digital solutions.",

  /** Personal contact address. Set to "" to hide it everywhere. */
  email: "kashifalii3850@gmail.com",

  /** Set any link to "" to hide it. */
  social: {
    github: "https://github.com/kashifalics",
    linkedin: "https://www.linkedin.com/in/muhammad-kashif-ali-7940a9310",
  },

  /** Replace the file in /public/documents to update the resume. Set to "" to hide the button. */
  resume: {
    href: "/documents/muhammad-kashif-ali-resume.pdf",
    fileName: "Muhammad-Kashif-Ali-Resume.pdf",
  },

  /**
   * Profile photograph. Replace the file in /public/images/profile and keep the
   * name, or point `src` at a new file. Set `src` to "" to show the placeholder.
   * `focus` is the CSS object-position used for every crop of the photo.
   */
  photo: {
    src: "/images/profile/kashif-ali.jpg",
    alt: "Portrait of Muhammad Kashif Ali",
    width: 1000,
    height: 1000,
    focus: "50% 28%",
  },
} as const;

export const focusAreas = [
  "AI Engineering",
  "Agentic AI",
  "Full-Stack Development",
  "AI Automation",
  "Product Development",
] as const;

export const dimensions = [
  {
    key: "engineer",
    title: "Engineer",
    body: "I develop software applications, AI systems, intelligent agents, and technical solutions.",
    proof: "Multi-tenant FastAPI backend, LangGraph workflows, RAG pipelines.",
  },
  {
    key: "builder",
    title: "Product builder",
    body: "I turn technical ideas into usable products with real workflows, architecture, and interfaces.",
    proof: "Job Apply Agent: live web app, browser extension and a human-approval workflow.",
  },
  {
    key: "entrepreneur",
    title: "Entrepreneur",
    body: "I build digital businesses and explore opportunities at the intersection of technology and business.",
    proof: "Founder of Kashzo Solutions Ltd., delivering websites and AI automation.",
  },
] as const;

export const interests = [
  { title: "Forex & quantitative trading", note: "Process, risk and discipline over prediction." },
  { title: "Financial markets", note: "How capital moves, and why." },
  { title: "Entrepreneurship", note: "Building things people pay for." },
  { title: "Technology research", note: "Reading papers and trying new tools early." },
  { title: "History & historical places", note: "The long view of how societies work." },
  { title: "Travel", note: "New places, new perspectives." },
  { title: "Continuous learning", note: "Courses, certifications and side projects." },
] as const;

export const philosophy = [
  {
    step: "Understand",
    body: "Understand the actual problem and user requirements.",
    detail: "Who uses it, what they do today, what must never go wrong.",
  },
  {
    step: "Architect",
    body: "Design the architecture, data flow, APIs, and integrations.",
    detail: "Decide what is deterministic code and what is an LLM's job.",
  },
  {
    step: "Engineer",
    body: "Develop robust, maintainable, and functional solutions.",
    detail: "Typed boundaries, tests around the rules, migrations that roll back.",
  },
  {
    step: "Deliver",
    body: "Test, deploy, measure, and continuously improve.",
    detail: "CI, health checks, handover notes, then iterate on real use.",
  },
] as const;
