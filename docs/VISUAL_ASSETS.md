# Project visuals

Every project visual on the site is genuine: a capture of the running product, a flow read
from its source code, a verbatim code excerpt, or a neutral "Screenshot to be added"
placeholder. Generated illustrations have been removed.

## What each project shows now

| Project | Visual | How it was made |
|---|---|---|
| AI Job Apply Agent | Overview, Profile, Jobs, Matches, Applications, Documents + two extension screens | Owner's captures of the live app (browser chrome and email cropped out; originals in `design-reference/`); extension store screenshots (demo data) |
| Saqinova | Homepage, pricing | From the Kashzo Solutions portfolio |
| Kashzo Solutions website | Homepage | Captured from www.kashzo.com, 2026-10-31 (cookies rejected) |
| JAP Roofing concept | Homepage | Captured from jap-roofing-concept.vercel.app, 2026-10-31 |
| Kashzo client websites | Devnique, Valorin, TrendBox | From the Kashzo Solutions portfolio |
| House Price Prediction | Tkinter window with a real prediction | `ui.py` run unchanged, first row of `housing.csv` entered, window captured |
| Weather Condition Prediction | Streamlit app with a real prediction | Public repo run locally, form filled, result captured |
| Loan Approval Prediction | Notebook cells and their saved outputs | Copied verbatim from the `.ipynb` |
| LangGraph PDF Query System | Graph + `graph.py` excerpt | Read from `graph.py`, `ingest.py`, `app.py` |
| AI Room Service Voice Agent | Tool-call flow + `models.py` excerpt | Read from `app.py`, `models.py`, `rag.py` |
| Multi-PDF RAG Chatbot | Pipeline | Read from `rag_pipeline.py`, `app.py` |
| AI-Powered PDF Query System | Pipeline | Read from `app.py` (public repo) |
| Real-Time Emotion Analysis | Pipeline | Read from `app.py` (public repo) |
| Kashzo Outreach | Pipeline | Read from its README and package layout |
| SEO Performance Engine, OCR Automation, Voice Calling Agent, Educational Learning Platform | Flow | From the public kashzo.com case studies (clients confidential) |
| The Apex Trader | Homepage | Owner's capture of the-apex-trader.vercel.app, cropped to the site (original in `design-reference/`) |

Not shown: **Product Review Sentiment Analyzer** is hidden (`hidden: true` in
`src/data/projects.ts`). It trains on 12 built-in reviews, its own sidebar reports 0.0% test
accuracy, and it labelled "Excellent quality and fast delivery, I love it!" as Neutral.
Remove `hidden: true` once it is trained on a real dataset.

## Screenshots still needed

These apps call OpenAI, Gemini, Supabase or VAPI with your own keys, so they were not run
here. Capture them yourself, then send them or save them where listed. Use a desktop window
about 1440 px wide, crop to the app (no browser tabs, address bar or taskbar), and use public
or sample documents only.

### AI Job Apply Agent (https://job-agent-langgraph.vercel.app)

Complete: Overview, Profile, Jobs, Matches, Applications and Documents were supplied on
2026-10-31 and the owner confirmed no further screens are needed.

### Multi-PDF RAG Chatbot (`Desktop/new_rag_chatbot/rag_multi_pdf_chatbot`)

Run `streamlit run app.py`. Use two public PDFs, e.g. *Attention Is All You Need*
(`Desktop/rag chatbot/data/`) and the BERT paper (arxiv.org/pdf/1810.04805).

1. **Upload** — New Chat, both PDFs selected, after **Process Documents**: the sidebar lists
   both documents. → `public/images/projects/multi-pdf-rag-chatbot/upload.png`
2. **Answer with sources** — ask "What is multi-head attention and why is it used?"; capture
   the answer with its source citations expanded (filename, page, relevance).
   → `public/images/projects/multi-pdf-rag-chatbot/answer.png`
3. **Not found** — ask something neither paper covers (e.g. "What is the capital of
   France?"), showing the honest fallback. → `public/images/projects/multi-pdf-rag-chatbot/not-found.png`

Note: the OpenAI key in that folder's `.env` is rejected by OpenAI (401), so put a working
key in first.

### LangGraph PDF Query System (`Desktop/LangGraph-RAG-OpenAI-AstraDB`)

Run `uvicorn app:app --reload` and open `http://127.0.0.1:8000/docs`.

1. **API** — the Swagger page listing `POST /upload` and `POST /chat`.
   → `public/images/projects/langgraph-pdf-query/api.png`
2. **Answer** — after uploading a public PDF, `POST /chat` → *Try it out* with a question, showing
   the JSON answer. → `public/images/projects/langgraph-pdf-query/chat.png`

### AI Room Service Voice Agent (`Desktop/hotel-voice-agent`)

1. **Call transcript** — VAPI dashboard → Call Logs → one test call: the transcript showing
   the guest ordering and the `place_order` tool call. → `public/images/projects/ai-room-service-voice-agent/transcript.png`
2. **Call recording** — the same call's audio waveform/player, if VAPI shows one.
   → `public/images/projects/ai-room-service-voice-agent/recording.png`
3. **Staff dashboard** — `streamlit run dashboard.py` with **test orders only**.
   → `public/images/projects/ai-room-service-voice-agent/dashboard.png`

Before sharing: the dashboard's title shows the hotel's name and orders show guest names and
room numbers. Blur or crop them; the site never names the hotel.

### Others

| Project | Open | Capture | Save as |
|---|---|---|---|
| AI-Powered PDF Query System | `streamlit run app.py` (needs OpenAI + Pinecone keys) | A question answered from an uploaded public PDF | `public/images/projects/pdf-qa/answer.png` |
| Real-Time Emotion Analysis | `streamlit run app.py` (needs a Gemini key and webcam) | The webcam frame next to Gemini's reply | `public/images/projects/emotion/app.png` |
| Kashzo Outreach | its frontend and backend locally, with sample data | The approval queue showing a drafted email awaiting approval | `public/images/projects/outreach/approval.png` |

## Adding a capture

1. Save the file at the path above.
2. In `src/data/projects.ts`, give the project a `cover` (and `screenshots` for extra views):

   ```ts
   cover: {
     src: "/images/projects/multi-pdf-rag-chatbot/answer.png",
     alt: "What the screenshot shows, in one sentence",
     width: 1440,
     height: 900,
     origin: "localhost · Streamlit",
   },
   ```

3. The cover replaces the diagram on the card and at the top of the case study; the diagram
   and code excerpt move into the case study body automatically.
