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
  eyebrow: "AI Engineer · Entrepreneur · Product Builder",
  location: "Lahore, Pakistan",
  /** Hero headline: the first line in white, the second in cyan over a hand-drawn underline. */
  headline: { first: "I Build Intelligent Systems.", second: "I Turn Ideas Into Reality." },
  intro:
    "I'm Muhammad Kashif Ali. I engineer AI-powered applications, intelligent agents, and automation systems — transforming ambitious ideas into practical digital products.",
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
    /** The same photo with its white backdrop removed, for the hero's painted circle. */
    cutout: "/images/profile/kashif-ali-cutout.png",
  },
} as const;

/** The row under the hero: where things stand, each item checkable. */
export const facts: { term: string; value: string; href?: string }[] = [
  { term: "Building", value: "Job Apply Agent, live in production", href: "/projects/job-apply-agent" },
  { term: "Running", value: "Kashzo Solutions Ltd., as founder", href: "/#kashzo" },
  { term: "Most recently", value: "AI Engineer Intern, Spadasoft (Jun–Aug 2026)", href: "/experience" },
  { term: "Studying", value: "BS Computer Science, Virtual University (2023–2027)" },
];

/** Personal interests, as the owner listed them. */
export const interests = [
  "Forex trading",
  "Quantitative trading",
  "Financial markets",
  "Entrepreneurship",
  "Technology research",
  "History",
  "Historical places",
  "Travel",
  "Continuous learning",
] as const;

/** The owner's four stages, each shown through a real decision in the Job Apply Agent. */
export const philosophy = [
  {
    step: "Understand",
    body: "Understand the real problem, users, and requirements.",
    example: "job boards that forbid scraping are never read automatically; people paste the job or its company link instead.",
  },
  {
    step: "Architect",
    body: "Design system architecture, data flows, APIs, and integrations.",
    example: "LLMs only read and write language; scoring, grounding checks and application status are plain, testable code.",
  },
  {
    step: "Engineer",
    body: "Build maintainable software, intelligent systems, and functional applications.",
    example: "a Postgres trigger refuses any application that skips approval, tested with direct SQL as the API role.",
  },
  {
    step: "Deliver",
    body: "Test, deploy, measure, and continuously improve.",
    example: "CI on every push, deploys gated on a /ready health check, and a written handover with rollback steps.",
  },
] as const;
