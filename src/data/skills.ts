/**
 * Technical skills, grouped by area. `projects` lists the slugs of projects on
 * this site that use the skill: the chip links to the first, and its tooltip
 * names them all. A skill with no projects is studied but not shown in work here.
 */
export type SkillGroup = {
  key: string;
  title: string;
  items: { name: string; projects?: string[] }[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "programming",
    title: "Programming",
    items: [
      { name: "Python", projects: ["job-apply-agent", "multi-pdf-rag-chatbot", "ai-room-service-voice-agent"] },
      { name: "JavaScript", projects: ["job-apply-agent", "jap-roofing-concept"] },
      { name: "TypeScript", projects: ["job-apply-agent", "kashzo-solutions-website"] },
      { name: "SQL", projects: ["job-apply-agent"] },
    ],
  },
  {
    key: "ai",
    title: "Artificial Intelligence",
    items: [
      { name: "Generative AI", projects: ["job-apply-agent"] },
      { name: "Large Language Models", projects: ["job-apply-agent", "real-time-emotion-analysis"] },
      { name: "Machine Learning", projects: ["california-house-price-prediction", "loan-approval-prediction", "weather-prediction"] },
      { name: "Deep Learning" },
      { name: "NLP" },
      { name: "Computer Vision", projects: ["real-time-emotion-analysis"] },
    ],
  },
  {
    key: "agentic",
    title: "Agentic AI",
    items: [
      { name: "LangChain", projects: ["multi-pdf-rag-chatbot", "pdf-qa-pinecone"] },
      { name: "LangGraph", projects: ["job-apply-agent", "langgraph-pdf-query-system"] },
      { name: "Tool Calling", projects: ["ai-room-service-voice-agent"] },
      { name: "AI Agents", projects: ["job-apply-agent", "ai-room-service-voice-agent"] },
    ],
  },
  {
    key: "rag",
    title: "RAG",
    items: [
      { name: "Embeddings", projects: ["multi-pdf-rag-chatbot", "langgraph-pdf-query-system"] },
      { name: "Vector Databases", projects: ["pdf-qa-pinecone", "langgraph-pdf-query-system"] },
      { name: "FAISS", projects: ["multi-pdf-rag-chatbot"] },
      { name: "ChromaDB", projects: ["multi-pdf-rag-chatbot"] },
      { name: "Retrieval Pipelines", projects: ["multi-pdf-rag-chatbot", "langgraph-pdf-query-system"] },
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    items: [
      { name: "React", projects: ["job-apply-agent", "kashzo-solutions-website"] },
      { name: "Next.js", projects: ["job-apply-agent", "kashzo-solutions-website", "saqinova-website"] },
      { name: "TypeScript", projects: ["job-apply-agent"] },
      { name: "Tailwind CSS", projects: ["kashzo-solutions-website", "saqinova-website"] },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    items: [
      { name: "FastAPI", projects: ["job-apply-agent", "ai-room-service-voice-agent", "langgraph-pdf-query-system"] },
      { name: "REST APIs", projects: ["job-apply-agent"] },
      { name: "Python", projects: ["job-apply-agent"] },
    ],
  },
  {
    key: "data",
    title: "Databases",
    items: [
      { name: "PostgreSQL", projects: ["job-apply-agent"] },
      { name: "Supabase", projects: ["job-apply-agent", "ai-room-service-voice-agent"] },
      { name: "Astra DB", projects: ["langgraph-pdf-query-system"] },
    ],
  },
  {
    key: "infra",
    title: "Infrastructure",
    items: [
      { name: "Docker", projects: ["job-apply-agent"] },
      { name: "AWS", projects: ["ocr-automation-aws-textract"] },
      { name: "Railway", projects: ["job-apply-agent"] },
      { name: "Vercel", projects: ["job-apply-agent", "kashzo-solutions-website"] },
    ],
  },
  {
    key: "automation",
    title: "Automation",
    items: [
      { name: "n8n", projects: ["ai-room-service-voice-agent"] },
      { name: "API Integrations", projects: ["ai-room-service-voice-agent"] },
      { name: "Workflow Automation", projects: ["kashzo-outreach"] },
    ],
  },
  {
    key: "libraries",
    title: "Data Science",
    items: [
      { name: "Pandas", projects: ["california-house-price-prediction", "loan-approval-prediction"] },
      { name: "NumPy" },
      { name: "Scikit-learn", projects: ["california-house-price-prediction", "loan-approval-prediction", "weather-prediction"] },
      { name: "TensorFlow/Keras" },
    ],
  },
];
