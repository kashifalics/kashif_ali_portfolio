import type { Metadata } from "next";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationCard } from "@/components/sections/AboutBlocks";
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
        label="Experience"
        title="Where I've been building"
        intro="An AI engineering internship, a technology company of my own, and independent engineering across agents, RAG, machine learning and full-stack products."
      >
        {profile.resume.href && (
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan hover:text-cyan"
          >
            <Download size={16} /> Download Resume
          </a>
        )}
      </PageHeader>

      <Section className="pt-0 md:pt-0">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <ExperienceTimeline />
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <EducationCard />
          </div>
        </Container>
      </Section>

      <Section labelledBy="skills-title" className="border-t border-line bg-bg-2/40">
        <Container>
          <SectionHeading id="skills-title" label="Technical skills" title="The toolkit, with receipts" />
          <Reveal className="mt-10">
            <SkillsDashboard />
          </Reveal>
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
