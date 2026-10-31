"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { facts, profile } from "@/data/profile";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { HeroPortrait } from "./HeroPortrait";

const ease = [0.16, 1, 0.3, 1] as const;

/* The page's one orchestrated motion: the headline and its supporting lines arrive in order. */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section aria-labelledby="hero-title" className="pt-28 md:pt-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">
          <div className="relative">
            <motion.p
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[13px] text-fg-2"
            >
              <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
              {profile.eyebrow}
            </motion.p>

            <h1 id="hero-title" className="mt-8 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-fg sm:text-[4rem] lg:text-[4rem] xl:text-[4.5rem]">
              {[profile.headline.before, profile.headline.highlight, profile.headline.after].map((line, i) => (
                <span key={line} className={`block pb-[0.08em] ${i === 1 ? "relative mb-[0.32em] w-fit" : "overflow-hidden"}`}>
                  <motion.span
                    className={i === 1 ? "relative z-10 block text-cyan" : "block"}
                    initial={reduce ? false : { y: i === 1 ? 24 : "105%", opacity: i === 1 ? 0 : 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                  {i === 1 && (
                    <svg viewBox="0 0 400 40" className="absolute top-[88%] left-[-1%] h-auto w-[102%]" aria-hidden>
                      <path d="M 4 16 C 110 5, 270 4, 396 13" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 44 32 C 150 23, 280 22, 356 28" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              ))}
            </h1>

            <motion.p {...rise(0.45)} className="prose-body mt-8 max-w-[36rem] text-lg">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects" className="px-6 py-3.5">
                Explore My Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" className="px-6 py-3.5">
                Let&apos;s Connect
              </ButtonLink>
            </motion.div>

            <motion.div {...rise(0.65)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-2">
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
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <HeroPortrait />
          </motion.div>
        </div>

        <motion.dl {...rise(0.65)} className="mt-16 grid border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
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
        </motion.dl>
      </Container>
    </section>
  );
}
