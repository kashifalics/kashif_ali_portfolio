import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { facts, profile } from "@/data/profile";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { HeroPortrait } from "./HeroPortrait";

/* Delay for the CSS load sequence (.hero-line, .hero-rise, .hero-pop in globals.css). */
const at = (seconds: number) => ({ animationDelay: `${seconds}s` });

/* The page's one orchestrated motion: the headline and its supporting lines arrive in order.
   Pure CSS, so the hero needs no JavaScript and reduced motion simply skips it. */
export function Hero() {
  // The underline sits under the last word of the cyan line, as on the reference.
  const words = profile.headline.second.split(" ");
  const secondLast = words.pop();
  const secondLead = words.length ? `${words.join(" ")} ` : "";
  return (
    <section aria-labelledby="hero-title" className="relative isolate pt-28 md:pt-36">
      {/* Fine grid and a soft cyan light behind the hero only; no illustrations. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,178,214,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,178,214,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_70%_at_60%_35%,#000_25%,transparent_80%)]" />
        <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10),transparent_65%)]" />
      </div>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">
          <div className="relative">
            <p
              style={at(0)}
              className="hero-rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[13px] text-fg-2"
            >
              <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
              {profile.eyebrow}
            </p>

            <h1 id="hero-title" className="mt-8 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-fg sm:text-[4rem] lg:text-[4rem] xl:text-[4.5rem]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block" style={at(0.1)}>
                  {profile.headline.first}
                </span>
              </span>
              <span className="hero-rise mb-[0.3em] block text-cyan" style={at(0.22)}>
                {secondLead}
                <span className="relative inline-block">
                  {secondLast}
                  <svg viewBox="0 0 400 40" className="absolute top-[86%] left-0 h-auto w-full" aria-hidden>
                    <path className="draw-loop" d="M 4 16 C 110 5, 270 4, 396 13" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
                    <path className="draw-loop" d="M 44 32 C 150 23, 280 22, 356 28" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Rendered at once: it is the largest element on a phone's first screen. */}
            <p className="prose-body mt-8 max-w-[36rem] text-lg">{profile.intro}</p>

            <div style={at(0.55)} className="hero-rise mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/#flagship" className="px-6 py-3.5">
                Explore My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary" className="px-6 py-3.5">
                Let&apos;s Connect
              </ButtonLink>
            </div>

            <div style={at(0.65)} className="hero-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-2">
              {profile.resume.href && (
                <a href={profile.resume.href} download={profile.resume.fileName} className="inline-flex items-center gap-1.5 hover:text-cyan">
                  <Download size={15} /> Download Resume
                </a>
              )}
              {profile.social.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
                  <GitHubIcon className="size-4" /> GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
              )}
              <span className="text-fg-3">{profile.location}</span>
            </div>
          </div>

          <div className="hero-pop" style={at(0.2)}>
            <HeroPortrait />
          </div>
        </div>

        <dl style={at(0.65)} className="hero-rise mt-16 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {facts.map((f) => (
            <div
              key={f.term}
              className="border-t border-line py-5 pr-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="text-[13px] text-fg-3">{f.term}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug text-fg">
                {f.href ? (
                  <Link href={f.href} className="hover:text-cyan">
                    {f.value}
                  </Link>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
