# Final quality pass: handover

Prepared 2026-11-01 against the final enhancement brief. This was a finishing pass on the
existing site: no redesign, no new features, no new dependencies, no API changes.

## A. Overall result

Every route, viewport size and interaction in the brief was tested against a local production
build. The fixes below are committed locally and **not yet deployed**.

## B. What was found and fixed

| Priority | Finding | Fix |
|---|---|---|
| High | On 320 px phones, project cards and the contact form were wider than the screen (a truncating category label still widened single-column grids). | Every responsive grid now has an explicit single mobile column (`grid-cols-1`), so long labels truncate as intended. |
| High | Case-study flow diagrams ("How it runs") ran off the right edge at 768 px when a project had 5–6 steps. | The steps switch to a row from 1024 px; boxes are equal height and long labels wrap. |
| High | 17 of 24 pages shared no image on social media, and every page shared the home title and description on X. | Pages without a project image use the site share card; X cards now take each page's own title, description and image. |
| Medium | About 40 labels were 10–11 px (chips, image captions, diagram labels). | Raised to 12 px minimum. |
| Medium | Search descriptions on some case studies ran to 180–227 characters. | Clipped to 160 at a word boundary. |
| Medium | Experience page jumped from h1 to h3. | Added a hidden "Roles and education" h2. |
| Medium | Mobile menu closed on Escape but not on a tap outside it. | Closes on outside tap too. |
| Medium | Architecture diagram nodes were cramped at 320 px. | Icon hidden below 400 px so the label has room. |
| Low | Project-card chips sat at different heights when a tagline was one line. | Taglines reserve two lines; chips align across each row. |
| Low | The last skills card sat alone on its row, leaving a large gap. | It spans the row. |
| Low | Footer divider was wider than the content; footer label differed from the hero label. | Divider aligned; footer uses "AI Engineer · Entrepreneur · Product Builder". |
| Low | Kashzo service cards were tall and mostly empty on phones. | Shorter on phones (132 px); text fits on both faces. |
| Low | Horizontal scrollbar showed under the project filters. | Hidden; the row still scrolls by swipe or trackpad. |

## C. Files modified

`src/lib/site.ts` (share-image default, description clipping), `src/app/layout.tsx`, the four
static pages and `src/app/projects/[slug]/page.tsx` (metadata), `Navigation.tsx`, `Footer.tsx`,
`ProjectCard.tsx`, `ProjectGrid.tsx`, `SourceDiagramView.tsx`, `ArchitectureDiagram.tsx`,
`SkillsDashboard.tsx`, `Kashzo.tsx`, `ExperienceTimeline.tsx`, `src/data/profile.ts`, plus
font-size and grid-column changes across the remaining section components.

## D. Testing results

| Check | Result |
|---|---|
| TypeScript | Pass, no errors |
| ESLint | Pass, no warnings |
| Unit tests | None exist in this project |
| Production build | Pass, 31 pages |
| Responsive (Playwright) | All 24 pages plus the 404 at 1920, 1440, 1366, 1024, 768, 430, 390, 375 and 320 px: no horizontal scroll, no off-screen elements, no broken images, no text under 12 px, no heading skips, no console errors |
| Navigation | Desktop and mobile links; mobile menu opens, closes on Escape, outside tap and navigation |
| Hero CTAs | "Explore My Work" lands on the flagship; "Let's Connect" on the contact section |
| Filters | All eight filters return the right projects (All = 19) |
| Resume | `/documents/muhammad-kashif-ali-resume.pdf` returns 200, `application/pdf` |
| Contact form | Required-field, email and length messages; focus moves to the first error; button shows "Sending…"; with no Resend key it shows "not connected yet" plus your email, never a false success; honeypot and too-fast bots are silently dropped |
| Metadata | Unique title and description on every page; canonical, Open Graph and X image on all 24 |
| External links | 22 checked; all respond except LinkedIn (999) and Facebook (400), which block automated checks and work in a browser |
| Secrets | None tracked; the Resend key is read only on the server |

Lighthouse 12.8 (local production build, simulated slow 4G for mobile):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 99 | 100 | 100 | 100 |
| Home, mobile | 86 | 100 | 100 | 100 |
| Projects, mobile | 84 | 100 | 100 | 100 |
| Job Apply Agent, desktop | 100 | 100 | 100 | 100 |
| Job Apply Agent, mobile | 81 | 100 | 100 | 100 |
| Live site home, mobile (before this pass) | 88 | — | — | — |

Mobile performance misses the 90 target. The slowest step is drawing the hero text on a
throttled phone: about 2.8 s waiting on styles, fonts and the framework script, with no layout
shift (CLS 0). The remaining savings Lighthouse names are inside Next.js itself (29 KB unused,
13 KB polyfills). On the live CDN the same page scores 88.

## E. Outstanding

- **Contact form delivery** (waiting for you): add `RESEND_API_KEY` in Vercel; see the README.
- **Spadasoft wording** (waiting for you): the brief says "AI Automation Intern, 1 July –
  31 August 2026". The site keeps "AI Engineer Intern, June – August 2026", which you confirmed
  on 2026-10-30 and which matches your resume. Say which is correct and it is a one-line change
  in `src/data/experience.ts`.
- **Optional screenshots**: RAG chatbot, LangGraph API and voice agent still show diagrams read
  from code (see `docs/VISUAL_ASSETS.md`).
- Photo, resume and email: present.

## F. Deployment readiness

**Ready for Vercel production.** The build passes and all checks above are completed and
verified locally. Pushing to `main` deploys automatically; that waits for your go-ahead.
