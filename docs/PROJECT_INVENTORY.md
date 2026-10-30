# Project inventory

Audited 2026-10-30 from the local workspace (`Desktop/`), the public GitHub repositories of
`kashifalics`, the Job Apply Agent's `README.md`, `docs/ARCHITECTURE.md` and
`docs/HANDOVER.md`, and the resumes dated 2026-10-17 and 2026-10-18.

| Project | Category | Ownership | Status | Evidence | Repo | Live |
|---|---|---|---|---|---|---|
| AI Job Apply Agent | AI & Agentic, Full-Stack, SaaS | Independent | Live | Local repo (78 commits, 2026-10-14 → 10-26), architecture and handover docs, 622 backend tests, extension store assets | Private (`job-agent-langgraph`) | job-agent-langgraph.vercel.app |
| Multi-PDF RAG Chatbot | Generative AI & RAG | Independent | Completed | Public README, local `RAG/` with FAISS fallback | rag-multi-pdf-chatbot | — |
| LangGraph PDF Query System | AI & Agentic, RAG | Independent | Prototype | Local code (`graph.py`, `ingest.py`, FastAPI, Astra DB) | Public repo is empty | — |
| AI Room Service Voice Agent | AI Automation | Internship (Spadasoft, per resume) | Prototype | Public repo: FastAPI, Supabase, n8n webhook, VAPI, Streamlit | order-taking-voice-agent | — |
| AI-Powered PDF Query System | Generative AI & RAG | Independent | Completed | Public README (Pinecone, OpenAI, Streamlit) | PDF-Q-A-System | — |
| Real-Time Emotion Analysis | AI, ML | Independent | Prototype | Public README (OpenCV, Gemini, pyttsx3) | AI-Powered-Real-Time-Emotion-Analysis-System | — |
| Kashzo Solutions Website | Business, Full-Stack | Kashzo Solutions | Live | Local repo `kashzo/` | Private | kashzo.com |
| Kashzo Client Websites | Business | Kashzo Solutions | Live | Listed with screenshots on kashzo.com | — | devnique.com, trendbox.uk, valorin.uk, saqinova.com |
| Kashzo Outreach | AI Automation, Business | Kashzo Solutions | In Progress | Local README: code-complete for a supervised pilot | Private | — |
| JAP Roofing Homepage Concept | Business | Client Demonstration | Concept | Public README states it is a concept | demos | — |
| The Apex Trader | Business, Full-Stack | Independent | In Progress | Local repo with owner TODO list | Private | — |
| House Price Prediction | Machine Learning | Independent | Completed | Local code (`train_model.py`, `ui.py`) | Public repo is empty | — |
| Loan Approval Prediction | Machine Learning | Independent | Completed | Public notebook | Loan-approval-prediction | — |
| Weather Condition Prediction | Machine Learning | Independent | Completed | Public README and notebook | Weather-Forcast-Prediction | — |
| Product Review Sentiment Analyzer | Machine Learning | Independent | Prototype | Local `projects/nlp sentiment analysis/app.py` | — | — |

## Listed in the brief but not found

No code or documents were found for these, so they are **not** on the site. Add them to
`src/data/projects.ts` once there is something to link to.

- YouTube RAG Chatbot
- Resume Matcher / ATS Analyzer
- LangChain Tool-Using AI Agent (`Desktop/My first ai agent/app.py` is empty)
- n8n RAG Automation Workflow
- Cats vs Dogs Classifier (`projects/dl project/` is empty)
- Social media automation and the movie recommendation system (on the resume only)

Left out deliberately: `Facebook-Post-Manager-system` (no README to describe it accurately) and
`VU GPA/CGPA Calculator` (authorship unclear).

## Decisions the owner should confirm

1. **Spadasoft.** The brief says *AI Automation Intern, 1 July – 31 August 2026*. The resume says
   *AI Engineer Intern, Jun 2026 – Aug 2026*. The site follows the brief.
2. **Degree status.** Both resumes show the BS as *2023 – 2027*, so the biography says
   "computer science student" rather than "graduate", and the Education card shows 2023 – 2027.
3. **LinkedIn URL** was taken from your earlier portfolio
   (`linkedin.com/in/muhammad-kashif-ali-7940a9310`). Confirm it.
4. **Resume.** `public/documents` holds `Kashif-ali-resume (1) (1).pdf`, supplied by the owner.
   It includes a phone number, which anyone who downloads it will see. Its job title for
   Spadasoft (AI Engineer Intern) differs from the site's (see 1).
5. **Voice agent ownership.** Marked as an internship project because the resume lists it under
   Spadasoft. The client hotel is not named on the site.
6. **Kashzo client sites.** Your exact role and each site's stack are not recorded anywhere;
   the card says only that they were delivered through Kashzo Solutions.
7. **LangGraph PDF Query System.** The brief mentions AWS EC2; nothing in the code shows it, so
   it is not listed.
