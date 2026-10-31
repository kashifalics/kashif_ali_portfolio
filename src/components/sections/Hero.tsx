"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { facts, profile } from "@/data/profile";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { ProfilePhoto } from "./ProfilePhoto";

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
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-16">
          <div>
            <motion.p {...rise(0)} className="text-sm text-fg-2">
              {profile.eyebrow}
              <span className="text-fg-3"> — {profile.location}</span>
            </motion.p>

            <h1 id="hero-title" className="mt-6 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.035em] text-fg sm:text-[4rem] lg:text-[4.5rem] xl:text-[4.875rem]">
              {profile.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...rise(0.4)} className="prose-body mt-8 max-w-[38rem] text-lg">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.5)} className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
              <ButtonLink href="/projects">
                Explore My Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Let&apos;s Connect
              </ButtonLink>
              <span className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-2 sm:ml-4">
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
              </span>
            </motion.div>
          </div>

          <motion.figure {...rise(0.25)} className="mx-auto w-full max-w-[300px] lg:max-w-none">
            <ProfilePhoto priority sizes="(min-width: 1024px) 340px, 300px" className="aspect-[4/5] rounded-md bg-white" />
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[13px]">
              <span className="text-fg">{profile.name}</span>
              <span className="text-fg-3">{profile.title}</span>
            </figcaption>
          </motion.figure>
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
