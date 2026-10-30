export type ExperienceItem = {
  organisation: string;
  role: string;
  /** Leave empty when no dates have been confirmed. */
  period?: string;
  kind: "Internship" | "Founder" | "Independent";
  description: string;
  related?: { label: string; href: string }[];
};

export const experience: ExperienceItem[] = [
  {
    organisation: "Spadasoft",
    role: "AI Engineer Intern",
    period: "June 2026 – August 2026",
    kind: "Internship",
    description:
      "Worked on AI automation and intelligent software development, gaining practical exposure to applying AI technologies to real-world workflows.",
    related: [{ label: "AI Room Service Voice Agent", href: "/projects/ai-room-service-voice-agent" }],
  },
  {
    organisation: "Kashzo Solutions Ltd.",
    role: "Founder",
    kind: "Founder",
    description:
      "Building a technology company focused on web development, AI automation, and digital products.",
    related: [
      { label: "Saqinova", href: "/projects/saqinova-website" },
      { label: "Kashzo website", href: "/projects/kashzo-solutions-website" },
      { label: "Client websites", href: "/projects/kashzo-client-websites" },
    ],
  },
  {
    organisation: "Independent Engineering",
    role: "AI Engineer / Software Developer",
    kind: "Independent",
    description:
      "Developing independent engineering projects across agentic AI, RAG, machine learning, intelligent automation, and full-stack application development.",
    related: [{ label: "AI Job Apply Agent", href: "/projects/ai-job-apply-agent" }],
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  short: "BS Computer Science",
  institution: "Virtual University of Pakistan",
  location: "Lahore, Pakistan",
  period: "2023 – 2027",
} as const;

/** From the resume. Add a `url` to link a credential. */
export const certifications: { issuer: string; title: string; date: string; url?: string }[] = [
  { issuer: "Microsoft", title: "Fundamentals of AI and ML", date: "Feb 2026" },
  { issuer: "Great Learning", title: "Introduction to Natural Language Processing", date: "Jan 2026" },
  { issuer: "Innovista", title: "Machine Learning", date: "Dec 2025" },
  { issuer: "Cisco Networking Academy", title: "Programming Essentials in Python", date: "Sep 2025" },
];

export const kashzo = {
  name: "Kashzo Solutions Ltd.",
  role: "Founder",
  headline: "Building Technology Beyond the Code.",
  description:
    "Alongside my engineering work, I am building Kashzo Solutions — a technology business focused on helping businesses establish stronger digital experiences and adopt practical technology solutions.",
  logo: { src: "/images/kashzo/kashzo-logo.png", width: 1838, height: 475, alt: "Kashzo Solutions" },
  website: "https://www.kashzo.com",
  services: [
    { title: "Website development", body: "Fast, search-friendly marketing sites." },
    { title: "Web applications", body: "Custom tools with real workflows behind them." },
    { title: "AI automation", body: "Agents and workflows that remove repetitive work." },
    { title: "Digital business solutions", body: "The systems a small business runs on." },
    { title: "SaaS product development", body: "From first version to something people pay for." },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/kashzo-solutions/" },
    { label: "Instagram", href: "https://www.instagram.com/kashzosolutions/" },
    { label: "Facebook", href: "https://www.facebook.com/Kashzosolutions/" },
    { label: "X", href: "https://x.com/KashzoSolutions" },
  ],
  projectSlugs: ["saqinova-website", "kashzo-solutions-website", "jap-roofing-concept", "kashzo-client-websites", "kashzo-outreach"],
} as const;
