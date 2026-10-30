import type { Project, ProjectCategory } from "@/types";

/**
 * Project inventory. Every fact here was checked against the project's code,
 * README, handover notes or public repository (see docs/PROJECT_INVENTORY.md).
 * Leave a field out rather than guessing: empty sections are hidden on the page.
 */
export const projects: Project[] = [
  {
    slug: "ai-job-apply-agent",
    name: "AI Job Apply Agent",
    tagline: "An AI job-search assistant that never claims what you can't prove.",
    summary:
      "An AI-powered job application platform: job discovery, job-description analysis, resume matching, evidence-cited resumes and cover letters, and a browser extension that fills employer forms for human review.",
    categories: ["AI & Agentic Systems", "Full-Stack Development", "SaaS & Products"],
    status: "Live",
    ownership: "Independent Project",
    featured: true,
    order: 1,
    year: "2026",
    role: "Sole engineer: product design, architecture, backend, frontend, extension and deployment",
    stack: ["Next.js", "TypeScript", "FastAPI", "LangGraph", "Supabase", "PostgreSQL", "OpenAI", "Railway"],
    stackGroups: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Supabase Auth (client)"] },
      { label: "Backend", items: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic"] },
      { label: "AI", items: ["OpenAI", "LangGraph", "Postgres checkpointer", "Evidence grounding validator"] },
      { label: "Data", items: ["Supabase", "PostgreSQL", "Row-level security", "Background task queue"] },
      { label: "Infrastructure", items: ["Vercel", "Railway", "Docker", "GitHub Actions CI"] },
      { label: "Integrations", items: ["Chrome extension (Manifest V3)", "Greenhouse", "Lever", "Ashby", "Himalayas"] },
    ],
    visual: "browser",
    liveUrl: "https://job-agent-langgraph.vercel.app",
    linkNote: "Source code is in a private repository. A walkthrough is available on request.",
    // The real dashboard screenshot. Until the file exists, a neutral frame is drawn instead.
    cover: {
      src: "/images/projects/job-apply-agent/dashboard.png",
      alt: "Job Apply Agent overview dashboard: sidebar with Overview, Profile, Jobs, Matches, Applications, Documents and Settings, a resume import prompt, quick actions and application statistics",
      width: 1628,
      height: 765,
    },
    overview:
      "Job Apply Agent is a multi-user web product for people applying to jobs across Pakistan, the UK, the US, the UAE, Saudi Arabia and remote roles. It finds jobs from permitted sources, analyses each description once, matches it against the person's verified profile, drafts tailored documents that cite that evidence, and prepares the application for the person to approve. Nothing is ever submitted for them.",
    problem:
      "Applying well is slow: every role needs its own reading of the description, a matched resume and a cover letter. Generic AI tools speed this up by inventing experience, which is worse than not applying. And most job boards forbid scraping, so a tool that 'applies everywhere' breaks the rules it depends on.",
    objective:
      "Cut the time spent per application without ever putting an unproven claim in front of an employer, and without breaking any job source's terms.",
    solution:
      "LLMs do language work at the edges (reading job descriptions, writing bullets and letters); plain, tested code does everything that must be reproducible: scoring, deduplication, grounding checks and application status. Every claim in a generated document must cite a profile fact the person has confirmed, and a database trigger refuses any application that skips human approval.",
    contribution: [
      "Designed the product scope, data model and the 21 recorded architecture decisions.",
      "Built the FastAPI backend in layers (domain, API, persistence, auth, sources) with Alembic migrations and row-level security on Supabase Postgres.",
      "Implemented the LangGraph per-job workflow with approval interrupts and durable Postgres checkpoints.",
      "Built the Next.js frontend: sign-in, profile and evidence confirmation, jobs, matching, documents and applications.",
      "Wrote the Chrome extension that fills Greenhouse, Lever and Ashby forms from an approved application.",
      "Set up CI (lint, types, tests against Postgres, Docker build) and deployed to Vercel and Railway.",
    ],
    features: [
      { title: "Individual accounts", description: "Email sign-up confirmed by code, through Supabase Auth.", state: "implemented" },
      { title: "Private, isolated data", description: "Profiles, matches, documents and applications are per user, enforced by Postgres row-level security as well as the API.", state: "implemented" },
      { title: "Resume import", description: "Upload a PDF or Word resume; facts are extracted as unverified evidence and the original is kept privately.", state: "implemented" },
      { title: "Evidence confirmation", description: "The person confirms each extracted fact before it can be cited in any generated document.", state: "implemented" },
      { title: "Job import and discovery", description: "Import a job by link (Greenhouse, Lever, Ashby) or search a shared catalog fed by company boards and remote-job feeds.", state: "implemented" },
      { title: "Job-description analysis", description: "Each job is analysed once by the LLM into a structured, validated analysis shared by every user.", state: "implemented" },
      { title: "Resume-to-job matching", description: "Deterministic scoring against the analysis, showing which of the job's skills are matched.", state: "implemented" },
      { title: "Tailored resume and cover letter", description: "Every bullet cites evidence IDs; a validator rejects any draft that cites unverified or missing evidence.", state: "implemented" },
      { title: "Document downloads", description: "Versioned documents downloadable as files.", state: "implemented" },
      { title: "Human-approval workflow", description: "Applications move through review, approval and hand-off; a database trigger refuses any shortcut.", state: "implemented" },
      { title: "Browser extension", description: "Fills the employer's form from the approved package. The person checks it and presses Submit; the extension never submits or touches a CAPTCHA.", state: "implemented" },
      { title: "Chrome Web Store listing", description: "Store build, privacy policy and listing are prepared; publication is pending.", state: "in-progress" },
      { title: "LinkedIn job search", description: "Optional paid search through a third-party provider, off unless configured. No LinkedIn API access and no scraping.", state: "experimental" },
      { title: "Sending applications by email", description: "For postings that ask for email applications, after approval. Needs a verified Google OAuth app.", state: "planned" },
    ],
    architecture: [
      { id: "user", label: "User", detail: "Signs in, confirms evidence, reviews matches and approves every application.", lane: 0, kind: "client" },
      { id: "ext", label: "Browser extension", tech: "Chrome MV3", detail: "Opens the employer's form in a tab the dashboard opened and fills it from the approved package. Only the dashboard's site may message it.", lane: 0, kind: "external" },
      { id: "web", label: "Next.js frontend", tech: "Vercel", detail: "Sign-in, profile, jobs, matching, documents and applications. Holds only public configuration; never a database or LLM key.", lane: 1, kind: "client" },
      { id: "api", label: "FastAPI backend", tech: "Railway", detail: "HTTP concerns only: routing, quotas, rate limits, error mapping. Verifies each request's Supabase token and enqueues AI work.", lane: 2, kind: "service" },
      { id: "auth", label: "Authentication", tech: "Supabase Auth", detail: "JWTs verified against the project's public keys; each request runs as that user under row-level security.", lane: 2, kind: "service" },
      { id: "db", label: "PostgreSQL", tech: "Supabase", detail: "Shared job catalog and analyses; per-user profiles, evidence, matches, documents and applications. A trigger enforces the application state machine.", lane: 3, kind: "data" },
      { id: "jobs", label: "Job processing", tech: "Worker", detail: "Reads company boards and remote feeds into the shared catalog, normalises and de-duplicates them, and closes expired jobs.", lane: 3, kind: "service" },
      { id: "match", label: "AI matching", tech: "OpenAI + code", detail: "The LLM turns a job description into a structured analysis once; deterministic code scores it against verified evidence.", lane: 4, kind: "ai" },
      { id: "gen", label: "Resume generation", tech: "LangGraph", detail: "Drafts resume bullets and cover letters that cite evidence IDs, then a grounding check, then a pause for human approval.", lane: 4, kind: "ai" },
      { id: "doc", label: "Document download", tech: "DOCX / PDF", detail: "Versioned, reproducible documents. What was approved is exactly what is sent.", lane: 5, kind: "data" },
    ],
    architectureFlow: [
      ["user", "web"],
      ["web", "api"],
      ["api", "auth"],
      ["api", "db"],
      ["jobs", "db"],
      ["db", "match"],
      ["match", "gen"],
      ["gen", "doc"],
      ["web", "ext"],
    ],
    workflow: [
      { title: "Import your resume", detail: "Upload a PDF or Word file. Facts arrive as unverified evidence." },
      { title: "Confirm your evidence", detail: "Confirm each role, project and highlight. Only confirmed facts can be cited." },
      { title: "Find jobs", detail: "Instant matches from the shared catalog, then a background search adds more." },
      { title: "Read the match", detail: "See which of the job's skills you have evidence for, and which you don't." },
      { title: "Generate documents", detail: "A tailored resume and cover letter, every line traceable to your evidence." },
      { title: "Approve and apply", detail: "Approve the package; the extension fills the employer's form; you press Submit." },
    ],
    challenges: [
      { title: "Stopping AI from inventing experience", detail: "Grounding is a data-model rule, not a prompt. Every claim cites an evidence ID and a deterministic validator rejects anything unverified. This also defends against prompt injection in job descriptions." },
      { title: "Approval that a prompt cannot bypass", detail: "The application state machine lives in a Postgres trigger, so even direct SQL as the API role cannot mark an application submitted without approval and proof." },
      { title: "Multi-tenancy on a shared catalog", detail: "Jobs and analyses are shared to save LLM cost; everything personal is per user under row-level security, tested by cross-tenant read and write attempts." },
      { title: "Respecting job-source terms", detail: "Each source adapter declares reviewed terms and cannot be enabled without them. LinkedIn and local boards are not scraped; people paste the job or its company link instead." },
      { title: "Least-privilege deployment", detail: "One container image runs as three processes, and each holds only the credentials it uses: the API has no LLM key, the workers have no Supabase key." },
    ],
    sections: [
      {
        heading: "The interface",
        body: [
          "The dashboard is a sidebar workspace. Overview greets the person and starts with one job: import a resume. A step tracker shows where they are in a seven-step journey, and quick actions lead to importing a resume, finding jobs, reviewing matches, tracking applications and opening documents.",
          "Below, four counters summarise the pipeline: matched jobs, jobs the person is eligible for, applications that need their review, and applications submitted.",
        ],
        bullets: [
          "Resume import: PDF or Word, read into roles, skills and education.",
          "Profile: confirm each fact before it can be used.",
          "Jobs: imported by link or found through discovery.",
          "Matches: a score per job with the evidence behind it.",
          "Applications: review, approve, apply, record the outcome.",
          "Documents: tailored resumes and cover letters, per job.",
        ],
      },
      {
        heading: "Database and authentication",
        body: [
          "Supabase provides Postgres and sign-in. Tables live in an app schema with row-level security, and the API connects as a restricted role rather than the owner.",
          "The browser signs in with Supabase Auth and sends its access token to the API, which verifies it against the project's public keys and runs every query as that user.",
        ],
        bullets: [
          "Shared tables: job catalog, job analyses, companies.",
          "Per-user tables: profiles, evidence, matches, documents, applications, usage ledger.",
          "Migrations with Alembic, rehearsed up and down on a copy with data before release.",
        ],
      },
      {
        heading: "AI processing pipeline",
        body: [
          "LLMs are used for two jobs only: understanding language (a job description into a structured analysis) and writing it (resume bullets, cover letters, answers). All output is parsed into strict Pydantic models.",
          "Scoring, de-duplication, grounding checks and status changes are ordinary code, so they are reproducible and testable.",
        ],
      },
      {
        heading: "Resume generation workflow",
        body: [
          "A LangGraph workflow runs per job in the background worker: analyse, score, draft documents with evidence citations, check grounding, then pause for the person's approval. Checkpoints are stored in Postgres, so the workflow resumes after a restart.",
        ],
      },
      {
        heading: "Browser extension integration",
        body: [
          "For jobs with a Greenhouse, Lever or Ashby form, 'Apply with one click' opens the employer's form already filled from the approved application: contact details, links, the approved CV and cover letter. Nothing the person typed is overwritten.",
          "The person checks the form and presses the employer's own Submit button. When the employer confirms, the dashboard records the submission with the confirmation page as evidence.",
        ],
      },
    ],
    screenshots: [
      {
        src: "/images/projects/job-agent-extension-filled.png",
        alt: "A sample careers form with six fields filled by the extension and a notice saying nothing is submitted automatically",
        caption: "The extension fills a demo employer form and tells the person exactly what it filled. Demo data.",
        width: 1280,
        height: 800,
      },
      {
        src: "/images/projects/job-agent-extension-recorded.png",
        alt: "Confirmation that the application was recorded in the dashboard after the employer confirmed it",
        caption: "After the employer confirms, the submission is recorded with the confirmation page as proof. Demo data.",
        width: 1280,
        height: 800,
      },
    ],
  },

  {
    slug: "rag-multi-pdf-chatbot",
    name: "Multi-PDF RAG Chatbot",
    tagline: "Ask questions across many PDFs and get answers with page citations.",
    summary:
      "A retrieval-augmented chatbot that answers only from uploaded PDFs, with filename and page citations, persistent vectors, multi-conversation history and an honest 'not found' fallback.",
    categories: ["Generative AI & RAG"],
    status: "Completed",
    ownership: "Independent Project",
    order: 2,
    year: "2026",
    role: "Sole developer",
    stack: ["Python", "LangChain", "OpenAI", "ChromaDB", "FAISS", "SQLite", "Streamlit"],
    visual: "pipeline",
    repoUrl: "https://github.com/kashifalics/rag-multi-pdf-chatbot",
    overview:
      "Upload one or more PDFs and ask questions about them. The app retrieves the most relevant passages from a persistent vector store and asks an OpenAI model to answer only from that context.",
    problem:
      "General chatbots answer confidently from memory, which is useless when the answer must come from your own documents.",
    solution:
      "A RAG pipeline with validation, de-duplication, page-level chunking, relevance thresholds and citations, with retrieved text treated as untrusted data rather than instructions.",
    features: [
      { title: "Multi-PDF upload with validation", description: "Extension, size, empty-file, malformed-PDF and no-text checks.", state: "implemented" },
      { title: "Duplicate detection", description: "SHA-256 hashing per conversation.", state: "implemented" },
      { title: "Persistent embeddings", description: "ChromaDB survives restarts; an in-memory FAISS fallback in one version.", state: "implemented" },
      { title: "Cited answers", description: "Filename, page, relevance score and a text preview for every source.", state: "implemented" },
      { title: "Conversation history", description: "Multiple conversations in SQLite with scoped retrieval, so nothing leaks between them.", state: "implemented" },
      { title: "Prompt-injection resistance", description: "Retrieved text is treated as untrusted data, never as instructions.", state: "implemented" },
    ],
    workflow: [
      { title: "Validate", detail: "File checks and SHA-256 duplicate detection." },
      { title: "Extract", detail: "PyPDFLoader, page by page, with metadata." },
      { title: "Chunk", detail: "Recursive splitter, 1000 characters with 200 overlap." },
      { title: "Embed", detail: "OpenAI text-embedding-3-small into ChromaDB." },
      { title: "Retrieve", detail: "Conversation-scoped search with a relevance threshold." },
      { title: "Answer", detail: "Grounded answer with citations, or an honest 'not found'." },
    ],
  },

  {
    slug: "langgraph-pdf-query-system",
    name: "LangGraph PDF Query System",
    tagline: "A graph-orchestrated RAG service over Astra DB.",
    summary:
      "PDF question answering built as a LangGraph state graph (retrieve, then generate) with Astra DB vector storage and an OpenAI model, exposed through FastAPI.",
    categories: ["AI & Agentic Systems", "Generative AI & RAG"],
    status: "Prototype",
    ownership: "Independent Project",
    order: 3,
    year: "2026",
    role: "Sole developer",
    stack: ["Python", "LangGraph", "LangChain", "OpenAI", "Astra DB", "FastAPI"],
    visual: "graph",
    linkNote: "The public repository has not been populated yet.",
    overview:
      "An ingestion script loads PDFs into Astra DB; a LangGraph graph with typed state retrieves context and generates an answer that refuses to go beyond it.",
    workflow: [
      { title: "Ingest", detail: "Load PDFs, split and embed them into Astra DB." },
      { title: "Retrieve node", detail: "Fetch the most relevant chunks into the graph state." },
      { title: "Generate node", detail: "Answer only from context, or say the document doesn't contain it." },
      { title: "Serve", detail: "Expose the graph behind a FastAPI endpoint." },
    ],
    pending: ["Confirm the AWS EC2 deployment before listing it."],
  },

  {
    slug: "ai-room-service-voice-agent",
    name: "AI Room Service Voice Agent",
    tagline: "A phone agent that takes hotel room-service orders.",
    summary:
      "A voice agent for hotel room service: guests call, the agent answers menu questions from a RAG knowledge base and places validated orders through a FastAPI backend, with an n8n workflow and a staff dashboard.",
    categories: ["AI Automation", "AI & Agentic Systems"],
    status: "Prototype",
    ownership: "Internship Project",
    order: 4,
    year: "2026",
    role: "Built during the Spadasoft internship",
    stack: ["Python", "FastAPI", "VAPI", "OpenAI", "Supabase", "n8n", "Streamlit"],
    visual: "voice",
    repoUrl: "https://github.com/kashifalics/order-taking-voice-agent",
    overview:
      "The voice platform calls the backend's tools during a conversation. The backend validates each order against the menu, prevents duplicate submissions with a request fingerprint, stores it in Supabase and notifies staff through an n8n webhook.",
    workflow: [
      { title: "Guest calls", detail: "Voice AI handles the conversation and telephony." },
      { title: "Answers questions", detail: "Menu and service questions go to a RAG lookup." },
      { title: "Places the order", detail: "Typed, validated tool calls with exact money handling." },
      { title: "Notifies staff", detail: "An n8n webhook and a Streamlit dashboard for orders." },
    ],
  },

  {
    slug: "pdf-qa-pinecone",
    name: "AI-Powered PDF Query System",
    tagline: "PDF question answering with Pinecone and source references.",
    summary:
      "Upload PDFs, ask questions, and get answers with document references, using OpenAI embeddings stored in Pinecone and a Streamlit interface.",
    categories: ["Generative AI & RAG"],
    status: "Completed",
    ownership: "Independent Project",
    order: 5,
    year: "2026",
    stack: ["Python", "LangChain", "OpenAI", "Pinecone", "Streamlit"],
    visual: "pipeline",
    repoUrl: "https://github.com/kashifalics/PDF-Q-A-System",
  },

  {
    slug: "real-time-emotion-analysis",
    name: "Real-Time Emotion Analysis",
    tagline: "Reads facial expressions and answers with empathy, out loud.",
    summary:
      "Captures webcam video with OpenCV, interprets the person's emotional state with Google Gemini, and speaks an empathetic response with text-to-speech in a Streamlit app.",
    categories: ["AI & Agentic Systems", "Machine Learning"],
    status: "Prototype",
    ownership: "Independent Project",
    order: 6,
    year: "2026",
    stack: ["Python", "OpenCV", "Google Gemini", "pyttsx3", "Streamlit"],
    visual: "network",
    repoUrl: "https://github.com/kashifalics/AI-Powered-Real-Time-Emotion-Analysis-System",
  },

  {
    slug: "kashzo-solutions-website",
    name: "Kashzo Solutions Website",
    tagline: "The company site for my technology business.",
    summary:
      "The production marketing website for Kashzo Solutions Ltd.: services, project work, industries and enquiry flows, built with Next.js and a focus on technical SEO.",
    categories: ["Business & Entrepreneurship", "Full-Stack Development"],
    status: "Live",
    ownership: "Kashzo Solutions",
    order: 7,
    year: "2026",
    role: "Founder; designed and built the site",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Playwright"],
    visual: "browser",
    liveUrl: "https://www.kashzo.com",
    cover: {
      src: "/images/kashzo/kashzo-logo.png",
      alt: "Kashzo Solutions logo",
      width: 1838,
      height: 475,
    },
  },

  {
    slug: "kashzo-client-websites",
    name: "Kashzo Client Websites",
    tagline: "Live websites delivered through Kashzo Solutions.",
    summary:
      "Websites for Devnique, TrendBox, Valorin and Saqinova, delivered through Kashzo Solutions and listed in its public portfolio.",
    categories: ["Business & Entrepreneurship", "Full-Stack Development"],
    status: "Live",
    ownership: "Kashzo Solutions",
    order: 8,
    stack: ["Web design", "Web development"],
    cover: {
      src: "/images/projects/saqinova-home.png",
      alt: "Saqinova website homepage",
      width: 1920,
      height: 1080,
    },
    liveUrl: "https://www.kashzo.com",
    overview:
      "A selection of client websites from the Kashzo Solutions portfolio. Each one is live on the client's own domain.",
    screenshots: [
      { src: "/images/projects/saqinova-home.png", alt: "Saqinova website homepage", caption: "Saqinova · saqinova.com", width: 1920, height: 1080 },
      { src: "/images/projects/devnique.png", alt: "Devnique website homepage: AI and digital transformation services", caption: "Devnique · devnique.com", width: 1920, height: 1080 },
      { src: "/images/projects/valorin.png", alt: "Valorin corporate website for financial advisory services", caption: "Valorin · valorin.uk", width: 1920, height: 1080 },
      { src: "/images/projects/trendbox.png", alt: "TrendBox online shop homepage showing featured products", caption: "TrendBox · trendbox.uk", width: 1920, height: 1080 },
    ],
    pending: ["Add each site's stack and your exact role on it."],
  },

  {
    slug: "kashzo-outreach",
    name: "Kashzo Outreach",
    tagline: "Evidence-based B2B outreach where a person approves every email.",
    summary:
      "An internal tool that researches prospects' public websites, scores the opportunity, drafts short personalised emails and puts each one in front of a person for approval before anything is sent.",
    categories: ["AI Automation", "Business & Entrepreneurship", "Full-Stack Development"],
    status: "In Progress",
    ownership: "Kashzo Solutions",
    order: 9,
    year: "2026",
    role: "Founder; sole engineer",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "LLM drafting"],
    visual: "pipeline",
    linkNote: "Internal tool; code-complete for a supervised pilot, not yet in production.",
    overview:
      "Safe by default: importing never drafts or sends, every email needs approval of its exact content plus a separate typed confirmation, and live sending stays off until the owner activates it.",
  },

  {
    slug: "jap-roofing-concept",
    name: "JAP Roofing Homepage Concept",
    tagline: "A responsive homepage concept for a UK roofing contractor.",
    summary:
      "An original homepage concept prepared by Kashzo Solutions to show a roofing contractor what a redesign could look like. It is a preview, not the company's live website.",
    categories: ["Business & Entrepreneurship"],
    status: "Concept",
    ownership: "Client Demonstration",
    order: 10,
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/kashifalics/demos",
    cover: {
      src: "/images/projects/jap-roofing-hero.webp",
      alt: "Concept imagery of a roofer at work, used in the homepage concept",
      width: 1600,
      height: 1067,
    },
  },

  {
    slug: "the-apex-trader",
    name: "The Apex Trader",
    tagline: "A personal trading brand and market-research platform.",
    summary:
      "Forex, gold, indices and stock analysis, trading education and a documented journal, built around a process-driven, risk-first approach.",
    categories: ["Business & Entrepreneurship", "Full-Stack Development"],
    status: "In Progress",
    ownership: "Independent Project",
    order: 11,
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Playwright", "Vitest"],
    visual: "chart",
  },

  {
    slug: "california-house-price-prediction",
    name: "House Price Prediction",
    tagline: "Regression on the California housing dataset.",
    summary:
      "A trained regression model for California house prices with a training script, saved model and a Streamlit interface for predictions.",
    categories: ["Machine Learning"],
    status: "Completed",
    ownership: "Independent Project",
    order: 12,
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
    visual: "chart",
  },

  {
    slug: "loan-approval-prediction",
    name: "Loan Approval Prediction",
    tagline: "Classifying loan applications from applicant data.",
    summary: "A classification model built in a Jupyter notebook to predict loan approval, with the trained model saved for reuse.",
    categories: ["Machine Learning"],
    status: "Completed",
    ownership: "Independent Project",
    order: 13,
    stack: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    visual: "chart",
    repoUrl: "https://github.com/kashifalics/Loan-approval-prediction",
  },

  {
    slug: "weather-prediction",
    name: "Weather Condition Prediction",
    tagline: "A support-vector classifier for weather conditions.",
    summary:
      "Predicts cloudy, sunny, rainy or snowy conditions from temperature, humidity, wind speed and precipitation with an SVC model and a Streamlit interface.",
    categories: ["Machine Learning"],
    status: "Completed",
    ownership: "Independent Project",
    order: 14,
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    visual: "chart",
    repoUrl: "https://github.com/kashifalics/Weather-Forcast-Prediction",
  },

  {
    slug: "review-sentiment-analyzer",
    name: "Product Review Sentiment Analyzer",
    tagline: "Positive, neutral or negative, from TF-IDF features.",
    summary: "A multi-class logistic regression over TF-IDF features that classifies product reviews, served through Streamlit.",
    categories: ["Machine Learning"],
    status: "Prototype",
    ownership: "Independent Project",
    order: 15,
    stack: ["Python", "Scikit-learn", "TF-IDF", "Streamlit"],
    visual: "network",
  },
];

export const categories: ProjectCategory[] = [
  "AI & Agentic Systems",
  "Generative AI & RAG",
  "AI Automation",
  "Full-Stack Development",
  "Machine Learning",
  "SaaS & Products",
  "Business & Entrepreneurship",
  "Academic Projects",
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Only categories that have at least one project, so no filter leads nowhere. */
export const usedCategories = categories.filter((c) =>
  projects.some((p) => p.categories.includes(c)),
);
