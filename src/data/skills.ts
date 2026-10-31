/**
 * Technical skills. `usedIn` names projects on this site that use the skill,
 * so every entry points at evidence rather than a self-rated percentage.
 */
export type SkillGroup = {
  key: string;
  title: string;
  blurb: string;
  items: { name: string; usedIn?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "programming",
    title: "Programming",
    blurb: "Typed, tested code across backend, frontend and data work.",
    items: [
      { name: "Python", usedIn: "Job Apply Agent backend" },
      { name: "TypeScript", usedIn: "Job Apply Agent frontend" },
      { name: "JavaScript", usedIn: "Browser extension" },
      { name: "SQL", usedIn: "Postgres triggers and RLS policies" },
    ],
  },
  {
    key: "ai",
    title: "AI & Machine Learning",
    blurb: "From classic models to LLM-powered features.",
    items: [
      { name: "Machine Learning", usedIn: "House price, loan approval" },
      { name: "Deep Learning" },
      { name: "NLP" },
      { name: "Generative AI", usedIn: "Resume and cover letter drafting" },
      { name: "LLMs", usedIn: "OpenAI, Gemini" },
      { name: "Computer Vision", usedIn: "Emotion analysis" },
    ],
  },
  {
    key: "agentic",
    title: "Agentic AI",
    blurb: "Agents with tools, state and a human in the loop.",
    items: [
      { name: "LangGraph", usedIn: "Job Apply Agent workflow" },
      { name: "LangChain", usedIn: "RAG chatbots" },
      { name: "Tool calling", usedIn: "Voice agent order tools" },
      { name: "AI agents", usedIn: "Room service voice agent" },
    ],
  },
  {
    key: "rag",
    title: "RAG",
    blurb: "Grounded answers with citations, not guesses.",
    items: [
      { name: "Embeddings", usedIn: "OpenAI embeddings" },
      { name: "Vector databases", usedIn: "ChromaDB, Pinecone, Astra DB" },
      { name: "FAISS", usedIn: "Multi-PDF chatbot" },
      { name: "Retrieval pipelines", usedIn: "Multi-PDF chatbot" },
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Product interfaces people can actually use.",
    items: [
      { name: "React" },
      { name: "Next.js", usedIn: "This site, Kashzo, Job Apply Agent" },
      { name: "Tailwind CSS" },
      { name: "Streamlit", usedIn: "ML and RAG demos" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    blurb: "APIs with clear layers and strict validation.",
    items: [
      { name: "FastAPI", usedIn: "Job Apply Agent, voice agent" },
      { name: "REST APIs" },
      { name: "Pydantic" },
      { name: "Alembic", usedIn: "Job Apply Agent migrations" },
    ],
  },
  {
    key: "data",
    title: "Databases",
    blurb: "Relational data with security in the database.",
    items: [
      { name: "PostgreSQL", usedIn: "Job Apply Agent" },
      { name: "Supabase", usedIn: "Job Apply Agent, voice agent" },
      { name: "Astra DB", usedIn: "LangGraph PDF query" },
      { name: "SQLite", usedIn: "RAG chat history" },
    ],
  },
  {
    key: "infra",
    title: "Infrastructure",
    blurb: "Shipping it, and keeping it running.",
    items: [
      { name: "Docker", usedIn: "Job Apply Agent image" },
      { name: "Vercel", usedIn: "Frontends" },
      { name: "Railway", usedIn: "API and workers" },
      { name: "GitHub Actions", usedIn: "CI" },
      { name: "AWS" },
    ],
  },
  {
    key: "automation",
    title: "Automation",
    blurb: "Workflows that remove repetitive work.",
    items: [
      { name: "n8n", usedIn: "Voice agent order webhook" },
      { name: "API integrations" },
      { name: "Workflow automation" },
      { name: "VAPI", usedIn: "Voice agent" },
    ],
  },
  {
    key: "libraries",
    title: "Libraries",
    blurb: "The data science toolkit.",
    items: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn", usedIn: "ML projects" },
      { name: "TensorFlow / Keras" },
      { name: "OpenCV", usedIn: "Emotion analysis" },
    ],
  },
];
