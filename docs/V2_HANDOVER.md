# Portfolio V2: audit and handover

Prepared 2026-10-31 against the V2 brief. The existing Next.js 16 application was refined in
place: no rebuild, no route removed, no new dependencies (one removed).

## 1. Audit of the existing site

| Area | Finding |
|---|---|
| Architecture | Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4. Content in `src/data/*.ts`. Static pages plus one API route (`/api/contact`). |
| Routes | `/`, `/projects`, `/projects/[slug]` (19 case studies), `/experience`, `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`. |
| Contact form | Real: shared validation, honeypot and timing traps, per-IP rate limit, delivery through Resend. Not connected yet: `RESEND_API_KEY` is not set on Vercel. |
| Resume | `public/documents/muhammad-kashif-ali-resume.pdf`, configured in `profile.ts`. |
| SEO | Per-page metadata, canonical URLs, Open Graph and X cards, sitemap, robots.txt, Person structured data. |
| Tests | No unit test suite exists; quality was checked with TypeScript, ESLint, the production build, Playwright and Lighthouse (below). |
| Weaknesses found | Mobile performance (all animation went through framer-motion, about 54 KB of unused JavaScript); a 3 px headline overflow on phones; heading levels skipped on two pages; a definition-list markup error; project cards not linking skills to work. |

## 2. What changed

- **Hero:** "I Build Intelligent Systems. / I Turn Ideas Into Reality." with the second line in
  cyan, the brief's eyebrow and introduction, "Explore My Work" (to the flagship) and
  "Let's Connect" (to the contact section), a faint grid and cyan light behind it. Layout,
  portrait and the looping underline are unchanged; the underline now sits under "Reality."
- **Animations:** rebuilt in CSS with the reference site's values (fade, slide from either
  side, rise, zoom; 1.25 s; once per element). framer-motion removed. Reduced motion shows
  everything at rest.
- **Project cards:** visual, area and status, name, one line, three technologies, ownership
  and "View case study".
- **Case studies:** new addresses `/projects/job-apply-agent` and `/projects/multi-pdf-rag-chatbot`
  (old ones redirect), a "Related projects" row, and the brief's Job Apply Agent description
  and category line.
- **New projects:** AI-Powered SEO Performance Engine, OCR Automation Using AWS Textract, AI Voice
  Calling Agent for Lead Generation, Educational Learning Platform, from the public kashzo.com
  case studies.
- **Kashzo:** the brief's description and your founder role areas as chips; services as flip cards.
- **Experience:** cards, plus education with certifications.
- **Skills:** the brief's categories; each skill links to a project that uses it.
- **Interests, contact text, four stages:** the brief's wording.
- **Accessibility:** heading order and list markup fixed.

## 3. Results

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | Pass, no errors |
| ESLint (`npm run lint`) | Pass, no warnings |
| Production build | Pass, 31 pages generated |
| Pages | All 24 pages return 200; old case-study addresses redirect (308) |
| Internal links | 31 checked, none broken |
| Responsive (Playwright) | 10 pages × 1440, 1024, 768 and 390 px: no horizontal overflow, no broken images, no element left hidden, no text overflowing its box, no console errors |
| Interactions | Mobile menu opens and closes on navigation; filters (4 Machine Learning projects); Home returns to the top; flip cards turn on tap; "Explore My Work" lands on the flagship; skill chips link to case studies |
| Contact API | Valid message: "not connected yet" (503) until Resend is configured; bots silently ignored |

Lighthouse 12.8, local production build (simulated slow 4G for mobile):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 99 | 100 | 100 | 100 |
| Home, mobile | 76–81 | 100 | 100 | 100 |
| Projects, mobile | 84 | 98 → fixed heading order | 100 | 100 |
| About, mobile | 84 | 100 | 100 | 100 |
| Contact, mobile | 87 | 100 | 100 | 100 |
| Job Apply Agent case study, mobile | 75 | 98 → fixed heading order | 100 | 100 |

Mobile performance is held back mainly by largest-paint time (about 3.3 s under throttling) on a
local server; Vercel's CDN usually improves this.

## 4. Status

**Completed and tested:** everything in section 2.

**Waiting for your assets:** see `docs/VISUAL_ASSETS.md`. The Job Apply Agent is complete;
the RAG chatbot, LangGraph API and voice agent captures remain optional.

**Waiting for credentials:** contact form delivery (`RESEND_API_KEY` on Vercel).

**Decided since:** Developer role on Kashzo work; Spadasoft stays "AI Engineer Intern,
June – August 2026" as confirmed; see `docs/PROJECT_INVENTORY.md`.

**Not implemented, by design:** YouTube RAG Chatbot, Resume Matcher, LangChain tool agent, n8n
RAG workflow and Cats vs Dogs. No code or documents were found for them, and the brief says not
to publish unsupported descriptions.

## 5. Where to change things

| What | Where |
|---|---|
| Email, LinkedIn, GitHub | `src/data/profile.ts` → `email`, `social` |
| Profile photo and its cut-out | `src/data/profile.ts` → `photo`; files in `public/images/profile/` |
| Resume | replace `public/documents/muhammad-kashif-ali-resume.pdf` |
| Projects and screenshots | `src/data/projects.ts`; images in `public/images/projects/` |
| Skills | `src/data/skills.ts` |
| Experience, education, Kashzo | `src/data/experience.ts` |

## 6. Deploying

These changes are committed locally and not pushed: every push to `main` deploys to Vercel
automatically, and the brief asks for deployment only with your approval. To deploy, push to
GitHub (`git push`); Vercel builds and publishes https://kashif-ali-portfolio.vercel.app.
