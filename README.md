# Muhammad Kashif Ali — Portfolio

Personal portfolio of Muhammad Kashif Ali, AI Engineer & Entrepreneur. Built with Next.js 16
(App Router), React 19, TypeScript, Tailwind CSS 4 and Framer Motion. Deploys to Vercel.

## Run it

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

## Pages

| Route | Content |
|---|---|
| `/` | Hero, flagship project with interactive architecture, selected work, three dimensions, experience, skills dashboard, Kashzo Solutions, engineering philosophy, about, contact CTA |
| `/projects` | Every project with an animated category filter and a status legend |
| `/projects/[slug]` | Case study for each project (statically generated) |
| `/experience` | Timeline, education, skills, resume download |
| `/about` | Biography, portrait, education, interests, skills, philosophy, Kashzo |
| `/contact` | Links and a working contact form |
| `/api/contact` | Contact form endpoint (validation, spam traps, rate limit, delivery through Resend) |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO files |

## Editing content

All content lives in `src/data/`; components only render it.

| File | Holds |
|---|---|
| `src/data/profile.ts` | Name, titles, hero copy, **email**, **GitHub/LinkedIn URLs**, **resume path**, **photo path and crop**, the three dimensions, interests, philosophy |
| `src/data/projects.ts` | Every project and case study. A field left out is hidden on the page |
| `src/data/skills.ts` | Skill groups; each skill lists the slugs of projects that use it, and its chip links to that case study |
| `src/data/experience.ts` | Experience timeline, education, Kashzo Solutions details |

Set any link, the email or the resume path to `""` to hide it everywhere.

### Adding a project

Add an object to `projects` in `src/data/projects.ts`. Required: `slug`, `name`, `tagline`,
`summary`, `categories`, `status`, `ownership`, `order`, `stack`. Everything else is optional,
and the case study shows only the sections you fill in. Use `visual` for a drawn cover when
there is no screenshot. Feature `state` must be one of `implemented`, `in-progress`, `planned`,
`experimental`, and should reflect the code, not the plan.

## Assets

| Asset | Location | Notes |
|---|---|---|
| Profile photo | `public/images/profile/kashif-ali.jpg` | Replace the file, or change `profile.photo`. `focus` sets the crop point. Empty `src` shows an initials placeholder |
| Resume | `public/documents/muhammad-kashif-ali-resume.pdf` | Replace the file to update every download button |
| Job Apply Agent dashboard | `public/images/projects/job-apply-agent/dashboard.png` | Live app's Overview page, cropped to the app with the account email removed. The uncropped original stays in `design-reference/`, which Git ignores |
| Other screenshots | `public/images/projects/` | Referenced from `projects.ts` |
| Kashzo logo | `public/images/kashzo/kashzo-logo.png` | Official logo, unmodified |

Missing images never break the page: `src/lib/assets.ts` checks at build time whether each file
exists and falls back to the drawn visual.

### Replacing the dashboard screenshot

1. Crop out the browser tabs, address bar and taskbar so only the app is visible.
2. Check that no email address, name or other account detail is visible.
3. Save it as `public/images/projects/job-apply-agent/dashboard.png`.
4. If its size differs from 1897×873, update `width` and `height` of the cover in
   `src/data/projects.ts`. Then rebuild.

## Environment variables

Copy `.env.example` to `.env.local`. Nothing is required to run the site.

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical URL for metadata and the sitemap. Leave empty on Vercel to use the production domain; set it when a custom domain is connected |
| `RESEND_API_KEY` | server only | Enables contact form delivery through [Resend](https://resend.com). Without it the form answers "not connected yet" and offers the email link |
| `CONTACT_TO_EMAIL` | server only | Delivery address. Defaults to `profile.email` |
| `CONTACT_FROM_EMAIL` | server only | Verified Resend sender. `onboarding@resend.dev` works only for the Resend account owner's own address |

### Contact form protection

- Validation shared by the browser and the server (`src/lib/contact.ts`).
- A hidden honeypot field and a minimum fill time; bots get a normal-looking success.
- A per-IP limit of 5 messages per 10 minutes. On Vercel each instance keeps its own count,
  so it slows bursts rather than guaranteeing a global limit.
- Messages are HTML-escaped; the API key never reaches the browser.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository. Framework: Next.js (detected).
   No build settings need changing.
3. Add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) under
   **Settings → Environment Variables**.
4. Deploy. The site is served at the default `*.vercel.app` domain.

### Connecting a custom domain later

1. Vercel → Project → **Settings → Domains** → add the domain and follow the DNS steps.
2. Set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy, so canonical URLs, the sitemap
   and Open Graph use it.
3. To send email from the domain, verify it in Resend and set `CONTACT_FROM_EMAIL`.

No code changes are needed.

## Accessibility and motion

Skip link, visible focus rings, semantic landmarks, labelled controls, `aria-live` feedback for
the filter and form, and keyboard-operable diagrams and tabs. Every animation respects
`prefers-reduced-motion`.

## Content integrity

Project facts were checked against each project's code, README and handover notes; the record
is in [docs/PROJECT_INVENTORY.md](docs/PROJECT_INVENTORY.md), together with what still needs
the owner's confirmation.
