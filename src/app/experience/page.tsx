import type { Metadata } from "next";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsDashboard } from "@/components/sections/SkillsDashboard";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience of Muhammad Kashif Ali: AI Engineer Intern at Spadasoft, founder of Kashzo Solutions Ltd., and independent AI engineering.",
  alternates: { canonical: "/experience" },
  openGraph: { url: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        intro="An AI engineering internship, a technology company of my own, and independent engineering across agents, RAG, machine learning and full-stack products."
      >
        {profile.resume.href && (
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
          >
            <Download size={16} /> Download Resume
          </a>
        )}
      </PageHeader>

      <Section className="pt-0 md:pt-0">
        <Container>
          <ExperienceTimeline />
        </Container>
      </Section>

      <Section labelledBy="skills-title" className="pt-0 md:pt-4">
        <Container>
          <SectionHeading id="skills-title" title="Technical skills" />
          <div className="mt-10">
            <SkillsDashboard />
          </div>
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
