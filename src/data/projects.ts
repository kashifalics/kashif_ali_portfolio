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
    liveUrl: "https://job-agent-langgraph.vercel.app",
    linkNote: "Source code is in a private repository. A walkthrough is available on request.",
    // The live app's Overview page, cropped to the app and with the account email removed.
    // The uncropped original is kept out of the repository in design-reference/.
    cover: {
      src: "/images/projects/job-apply-agent/dashboard.png",
      alt: "Job Apply Agent overview dashboard: sidebar with Overview, Profile, Jobs, Matches, Applications, Documents and Settings, a resume import prompt, quick actions and application statistics",
      width: 1897,
      height: 873,
      origin: "job-agent-langgraph.vercel.app",
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
        origin: "Demo employer form · Chrome extension",
      },
      {
        src: "/images/projects/job-agent-extension-recorded.png",
        alt: "Confirmation that the application was recorded in the dashboard after the employer confirmed it",
        caption: "After the employer confirms, the submission is recorded with the confirmation page as proof. Demo data.",
        width: 1280,
        height: 800,
        origin: "Demo employer form · Chrome extension",
      },
    ],
  },

  {
    slug: "saqinova-website",
    name: "Saqinova Website",
    tagline: "A wellness business website built for local discovery and bookings.",
    summary:
      "A premium massage and wellness website, delivered through Kashzo Solutions, focused on clear services, pricing, trust and easy appointment enquiries.",
    categories: ["Business & Entrepreneurship", "Full-Stack Development"],
    status: "Live",
    ownership: "Kashzo Solutions",
    order: 2,
    year: "2026",
    role: "Designed and developed the site, through Kashzo Solutions",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://saqinova.com",
    cover: {
      src: "/images/projects/saqinova-home.png",
      alt: "Saqinova website homepage for a massage and wellness business",
      width: 1920,
      height: 1080,
      origin: "saqinova.com",
    },
    overview:
      "A service-focused website for an appointment-based wellness business, where local discovery, credibility, clear treatment information and an easy way to book all matter.",
    problem:
      "A wellness business needed a digital presence where people searching locally can find it, trust it, understand each treatment and its price, and book without friction.",
    solution:
      "A responsive website that puts service pages, transparent pricing, practitioner information and social proof first, with booking paths on every page.",
    features: [
      { title: "Service-focused homepage", description: "Treatments, pricing and booking within the first screens.", state: "implemented" },
      { title: "Treatment pages", description: "An individual page with a description for each service.", state: "implemented" },
      { title: "Pricing and practitioners", description: "Transparent prices and practitioner profiles to build trust.", state: "implemented" },
      { title: "Reviews and FAQs", description: "Social proof and answers to common questions.", state: "implemented" },
      { title: "WhatsApp booking", description: "Booking and contact flows that open a conversation directly.", state: "implemented" },
      { title: "Local search structure", description: "Location content and page structure aimed at local search.", state: "implemented" },
    ],
    screenshots: [
      { src: "/images/projects/saqinova-home.png", alt: "Saqinova homepage on desktop", caption: "Homepage on desktop", width: 1920, height: 1080, origin: "saqinova.com" },
      { src: "/images/projects/saqinova-pricing-showcase.webp", alt: "Saqinova pricing section", caption: "Pricing, presented up front", width: 1180, height: 655, origin: "saqinova.com" },
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
    order: 5,
    year: "2026",
    role: "Sole developer",
    stack: ["Python", "LangChain", "OpenAI", "ChromaDB", "FAISS", "SQLite", "Streamlit"],
    diagram: {
      source: "rag_pipeline.py · app.py",
      steps: [
        { label: "Validate", detail: "type, size, PDF signature, SHA-256 duplicate check" },
        { label: "Extract", detail: "PyPDFLoader, page by page" },
        { label: "Chunk", detail: "1000 characters, 200 overlap" },
        { label: "Embed", detail: "text-embedding-3-small" },
        { label: "Retrieve", detail: "per conversation, above a relevance threshold" },
        { label: "Answer", detail: "cites filename and page, or says not found" },
      ],
      stores: [
        { label: "ChromaDB", detail: "persistent vectors" },
        { label: "SQLite", detail: "conversations and documents" },
      ],
    },
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
    order: 6,
    year: "2026",
    role: "Sole developer",
    stack: ["Python", "LangGraph", "LangChain", "OpenAI", "Astra DB", "FastAPI"],
    diagram: {
      source: "graph.py · ingest.py · app.py",
      steps: [
        { label: "START" },
        { label: "retrieve", detail: "retriever.invoke(question) → context" },
        { label: "generate", detail: "gpt-4.1-mini, temperature 0, context only" },
        { label: "END", detail: "answer" },
      ],
      stores: [
        { label: "Astra DB", detail: "collection pdf_rag_demo, similarity k=4" },
        { label: "FastAPI", detail: "POST /upload · POST /chat" },
      ],
    },
    code: {
      file: "graph.py",
      code: `class GraphState(TypedDict):
    question: str
    context: List[Document]
    answer: str

builder = StateGraph(GraphState)
builder.add_node("retrieve", retrieve)
builder.add_node("generate", generate)
builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)
return builder.compile()`,
    },
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
    order: 7,
    year: "2026",
    role: "Built during the Spadasoft internship",
    stack: ["Python", "FastAPI", "VAPI", "OpenAI", "Supabase", "n8n", "Streamlit"],
    diagram: {
      source: "app.py · models.py · rag.py",
      steps: [
        { label: "Guest call", detail: "VAPI voice assistant" },
        { label: "Tool call", detail: "/search-menu · /place-order · /check-order-status" },
        { label: "Validate", detail: "Pydantic models, prices from the menu table, one order per tool-call ID" },
        { label: "Notify staff", detail: "n8n webhook" },
        { label: "Dashboard", detail: "Streamlit: orders and their status" },
      ],
      stores: [
        { label: "Supabase", detail: "orders, menu_items" },
        { label: "pgvector", detail: "menu answers: match_hotel_documents → gpt-4.1-mini" },
      ],
    },
    code: {
      file: "models.py",
      code: `class PlaceOrderArguments(BaseModel):
    model_config = ConfigDict(extra="ignore")

    room_number: str = Field(min_length=1, max_length=20)
    customer_name: str = Field(default="Guest", min_length=1, max_length=100)
    items: list[OrderItem] = Field(min_length=1, max_length=50)`,
    },
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
    order: 8,
    year: "2026",
    stack: ["Python", "LangChain", "OpenAI", "Pinecone", "Streamlit"],
    diagram: {
      source: "app.py",
      steps: [
        { label: "Upload", detail: "Streamlit sidebar, several PDFs" },
        { label: "Extract", detail: "PyPDFLoader" },
        { label: "Chunk", detail: "1000 characters, 100 overlap" },
        { label: "Embed", detail: "OpenAI embeddings" },
        { label: "Answer", detail: "RetrievalQA, with references" },
      ],
      stores: [{ label: "Pinecone", detail: "serverless index langchainvector" }],
    },
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
    order: 9,
    year: "2026",
    stack: ["Python", "OpenCV", "Google Gemini", "pyttsx3", "Streamlit"],
    diagram: {
      source: "app.py",
      steps: [
        { label: "Webcam frame", detail: "OpenCV VideoCapture" },
        { label: "Image", detail: "BGR → RGB, PIL" },
        { label: "Gemini 1.5 Flash", detail: "reads the expression, writes a reply" },
        { label: "Speech", detail: "pyttsx3 text-to-speech" },
      ],
    },
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
    order: 3,
    year: "2026",
    role: "Founder; designed and built the site",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Playwright"],
    liveUrl: "https://www.kashzo.com",
    cover: {
      src: "/images/projects/kashzo-website/home.png",
      alt: "Kashzo Solutions homepage: website design and development for UK businesses",
      width: 1440,
      height: 900,
      origin: "www.kashzo.com",
    },
  },

  {
    slug: "kashzo-client-websites",
    name: "Kashzo Client Websites",
    tagline: "Live websites delivered through Kashzo Solutions.",
    summary:
      "Websites for Devnique, Valorin and TrendBox, delivered through Kashzo Solutions and listed in its public portfolio.",
    categories: ["Business & Entrepreneurship", "Full-Stack Development"],
    status: "Live",
    ownership: "Kashzo Solutions",
    order: 10,
    stack: ["Web design", "Web development"],
    cover: {
      src: "/images/projects/devnique.png",
      alt: "Devnique website homepage: AI and digital transformation services",
      width: 1920,
      height: 1080,
      origin: "devnique.com",
    },
    liveUrl: "https://www.kashzo.com",
    overview:
      "A selection of client websites from the Kashzo Solutions portfolio. Each one is live on the client's own domain.",
    screenshots: [
      { src: "/images/projects/devnique.png", alt: "Devnique website homepage: AI and digital transformation services", caption: "Devnique", width: 1920, height: 1080, origin: "devnique.com" },
      { src: "/images/projects/valorin.png", alt: "Valorin corporate website for financial advisory services", caption: "Valorin", width: 1920, height: 1080, origin: "valorin.uk" },
      { src: "/images/projects/trendbox.png", alt: "TrendBox online shop homepage showing featured products", caption: "TrendBox", width: 1920, height: 1080, origin: "trendbox.uk" },
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
    order: 11,
    year: "2026",
    role: "Founder; sole engineer",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "LLM drafting"],
    diagram: {
      source: "README.md · src/kashzo_outreach/",
      steps: [
        { label: "Import", detail: "prospect spreadsheets; never drafts or sends" },
        { label: "Research", detail: "each business's public website" },
        { label: "Score", detail: "the opportunity" },
        { label: "Draft", detail: "a short, personalised email" },
        { label: "Approve", detail: "a person approves the exact content" },
        { label: "Send", detail: "only after a typed confirmation" },
      ],
    },
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
    order: 4,
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/kashifalics/demos",
    liveUrl: "https://jap-roofing-concept.vercel.app",
    cover: {
      src: "/images/projects/jap-roofing/home.png",
      alt: "JAP Roofing homepage concept: roofing services hero with a request-a-quote button, marked as a concept prepared by Kashzo Solutions",
      width: 1440,
      height: 900,
      origin: "jap-roofing-concept.vercel.app",
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
    order: 12,
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Playwright", "Vitest"],
    liveUrl: "https://the-apex-trader.vercel.app",
    cover: {
      src: "/images/projects/apex-trader/home.png",
      alt: "The Apex Trader homepage: the headline Discipline over prediction, a description of price-action and risk-managed trading, and a globe marking the New York, London, Tokyo and Sydney sessions",
      width: 1897,
      height: 889,
      origin: "the-apex-trader.vercel.app",
    },
  },

  {
    slug: "california-house-price-prediction",
    name: "House Price Prediction",
    tagline: "Regression on the California housing dataset.",
    summary:
      "A regression model for California house prices, with a training script, a saved model and a Tkinter desktop app that estimates a price from eight inputs and ocean proximity.",
    categories: ["Machine Learning"],
    status: "Completed",
    ownership: "Independent Project",
    order: 13,
    stack: ["Python", "Pandas", "Scikit-learn", "Joblib", "Tkinter"],
    cover: {
      src: "/images/projects/house-price/app.png",
      alt: "California House Price Prediction desktop app with the first row of the housing dataset entered and an estimated price of $429,307.83",
      caption: "The first row of housing.csv entered: the model estimates $429,308 against a recorded value of $452,600.",
      width: 700,
      height: 700,
      origin: "Tkinter window · ui.py",
    },
  },

  {
    slug: "loan-approval-prediction",
    name: "Loan Approval Prediction",
    tagline: "Classifying loan applications from applicant data.",
    summary: "A random forest classifier, built in a Jupyter notebook, that predicts loan approval: 81.8% accuracy on the held-out test set and an 82.9% mean cross-validation score.",
    categories: ["Machine Learning"],
    status: "Completed",
    ownership: "Independent Project",
    order: 14,
    stack: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    code: {
      file: "Loan Approval Prediction.ipynb",
      code: `from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

model.score(X_test,y_test)

cv_scores = cross_val_score(model, X_train, y_train, cv=2)
print("Mean CV score: ", cv_scores.mean())`,
      output: `0.8181818181818182
Mean CV score:  0.8293832823649337`,
    },
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
    order: 15,
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    repoUrl: "https://github.com/kashifalics/Weather-Forcast-Prediction",
    cover: {
      src: "/images/projects/weather/app.png",
      alt: "Weather Predictor app with summer, 45% humidity, 8.5 km/h wind, 10% precipitation and 40°C entered, predicting Sunny",
      caption: "Inputs for a hot summer day; the SVC model predicts Sunny.",
      width: 1280,
      height: 800,
      origin: "localhost · Streamlit app.py",
    },
  },

  {
    slug: "review-sentiment-analyzer",
    name: "Product Review Sentiment Analyzer",
    tagline: "Positive, neutral or negative, from TF-IDF features.",
    summary: "A multi-class logistic regression over TF-IDF features that classifies product reviews, served through Streamlit.",
    categories: ["Machine Learning"],
    status: "Prototype",
    ownership: "Independent Project",
    order: 16,
    // Trains on 12 built-in reviews and its own sidebar reports 0% test accuracy.
    hidden: true,
    stack: ["Python", "Scikit-learn", "TF-IDF", "Streamlit"],
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

/** Projects shown on the site, in display order. */
export const sortedProjects = projects.filter((p) => !p.hidden).sort((a, b) => a.order - b.order);

export function getProject(slug: string) {
  return sortedProjects.find((p) => p.slug === slug);
}

/** Only categories that have at least one project, so no filter leads nowhere. */
export const usedCategories = categories.filter((c) =>
  sortedProjects.some((p) => p.categories.includes(c)),
);
