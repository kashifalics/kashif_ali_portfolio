import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Section } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Animate } from "@/components/ui/Animate";

export const contactHeading = "Let's Build Something Meaningful.";
export const contactIntro =
  "I'm open to connecting with people interested in AI engineering, software development, intelligent automation, product building, and technology entrepreneurship.";

export function ContactCta() {
  return (
    <Section labelledBy="cta-title" className="border-t border-line">
      <Container className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-16">
        <Animate effect="zoomIn">
          <h2 id="cta-title" className="max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
            {contactHeading}
          </h2>
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block font-display text-xl break-all text-cyan underline decoration-cyan/40 underline-offset-[6px] transition-colors hover:decoration-cyan sm:text-3xl"
            >
              {profile.email}
            </a>
          )}
        </Animate>
        <Animate effect="fadeInRight" delay={0.3}>
          <p className="text-[15px] leading-relaxed text-fg-2">{contactIntro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/contact" className="group inline-flex items-center gap-1.5 font-semibold text-fg hover:text-cyan">
              Send a message <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            {profile.social.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-2 hover:text-cyan">
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            )}
            {profile.social.github && (
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-2 hover:text-cyan">
                <GitHubIcon className="size-4" /> GitHub
              </a>
            )}
          </div>
        </Animate>
      </Container>
    </Section>
  );
}
