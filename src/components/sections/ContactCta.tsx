import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Section, ButtonLink } from "@/components/ui/primitives";

export const contactHeading = "Let's Build Something Meaningful.";
export const contactIntro =
  "I'm open to connecting with people interested in AI engineering, software development, intelligent automation, product building, and technology entrepreneurship.";

export function ContactCta() {
  return (
    <Section labelledBy="cta-title" className="border-t border-line">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.16),transparent_60%),linear-gradient(180deg,#101b2d,#0b1220)] px-6 py-16 text-center sm:px-12 md:py-20">
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl leading-[1.1] font-semibold sm:text-5xl">
            {contactHeading}
          </h2>
          <p className="prose-body mx-auto mt-5 max-w-xl">{contactIntro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">
              Send a message <ArrowRight size={16} />
            </ButtonLink>
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                <Mail size={16} /> Email me
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
