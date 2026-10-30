"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { focusAreas, profile } from "@/data/profile";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { ProfilePhoto } from "./ProfilePhoto";

const ease = [0.16, 1, 0.3, 1] as const;

/* The three sides of the profile, placed around the portrait. */
const orbitLabels = [
  { text: "Engineer", className: "top-[6%] -left-2 sm:left-0" },
  { text: "Product builder", className: "top-[44%] -right-3 sm:-right-8" },
  { text: "Entrepreneur", className: "bottom-[8%] left-0 sm:left-4" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-cyan sm:text-xs"
            >
              <span className="size-1.5 rounded-full bg-cyan-2 shadow-[0_0_10px_#22d3ee]" />
              {profile.eyebrow.toUpperCase()}
            </motion.p>

            <h1 id="hero-title" className="mt-7 text-[2.6rem] leading-[1.02] font-bold text-fg sm:text-6xl lg:text-[4.1rem]">
              {profile.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className={i === 1 ? "block bg-gradient-to-r from-cyan to-cyan-2 bg-clip-text text-transparent" : "block"}
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...rise(0.45)} className="prose-body mt-7 max-w-xl text-lg">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/projects">
                Explore My Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Let&apos;s Connect
              </ButtonLink>
            </motion.div>

            <motion.div {...rise(0.65)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-2">
              {profile.resume.href && (
                <a
                  href={profile.resume.href}
                  download={profile.resume.fileName}
                  className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
                >
                  <Download size={15} /> Download Resume
                </a>
              )}
              {profile.social.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
                  <GitHubIcon className="size-4" /> GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
              )}
              <span className="inline-flex items-center gap-2 text-fg-3">
                <MapPin size={15} /> {profile.location}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]"
          >
            <div className="relative aspect-square">
              {/* Slowly turning measurement ring */}
              <svg aria-hidden viewBox="0 0 400 400" className="orbit absolute -inset-[7%] size-[114%]">
                <circle cx="200" cy="200" r="196" fill="none" stroke="rgba(56,189,248,0.16)" strokeWidth="1" />
                {Array.from({ length: 72 }, (_, i) => {
                  const a = (i * 5 * Math.PI) / 180;
                  const long = i % 6 === 0;
                  const r1 = long ? 184 : 189;
                  return (
                    <line
                      key={i}
                      x1={(200 + r1 * Math.cos(a)).toFixed(2)}
                      y1={(200 + r1 * Math.sin(a)).toFixed(2)}
                      x2={(200 + 196 * Math.cos(a)).toFixed(2)}
                      y2={(200 + 196 * Math.sin(a)).toFixed(2)}
                      stroke={long ? "rgba(34,211,238,0.55)" : "rgba(148,178,214,0.22)"}
                      strokeWidth="1"
                    />
                  );
                })}
                <circle cx="396" cy="200" r="3.5" fill="#22d3ee" />
              </svg>

              <div className="absolute inset-[4%] rounded-full bg-gradient-to-b from-cyan/60 via-blue/30 to-transparent p-[2px] shadow-[0_30px_80px_-30px_rgba(56,189,248,0.45)]">
                <ProfilePhoto
                  priority
                  sizes="(min-width: 640px) 400px, 280px"
                  className="size-full rounded-full bg-bg-2"
                />
              </div>

              {orbitLabels.map((l) => (
                <span
                  key={l.text}
                  className={`absolute ${l.className} rounded-full border border-line-strong bg-bg-2/90 px-3 py-1.5 font-mono text-[11px] text-fg backdrop-blur sm:text-xs`}
                >
                  <span className="mr-1.5 inline-block size-1.5 rounded-full bg-cyan align-middle" />
                  {l.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.ul
          {...rise(0.8)}
          aria-label="Focus areas"
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 md:mt-20"
        >
          {focusAreas.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-fg-2">
              <span className="h-px w-4 bg-cyan" aria-hidden />
              {f}
            </li>
          ))}
        </motion.ul>

        <Link
          href="#flagship"
          aria-label="Scroll to the flagship project"
          className="mx-auto mt-12 hidden w-fit flex-col items-center gap-2 text-xs text-fg-3 transition-colors hover:text-cyan md:flex"
        >
          <span className="relative h-10 w-[22px] rounded-full border border-line-strong">
            <span className="absolute top-2 left-1/2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-cyan motion-safe:animate-bounce" />
          </span>
          Scroll
        </Link>
      </Container>
    </section>
  );
}
