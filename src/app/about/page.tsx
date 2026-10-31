import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";
import { aboutHeading, bio, EducationCard, Interests, PortraitCard } from "@/components/sections/AboutBlocks";
import { Philosophy } from "@/components/sections/Philosophy";
import { SkillsDashboard } from "@/components/sections/SkillsDashboard";
import { Kashzo } from "@/components/sections/Kashzo";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Kashif Ali: AI-focused software developer, BS Computer Science at Virtual University of Pakistan, and founder of Kashzo Solutions, based in Lahore.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={aboutHeading} />

      <Section className="pt-0 md:pt-0">
        <Container className="grid items-start gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <div className="space-y-8 lg:sticky lg:top-24">
            <PortraitCard className="max-w-[360px]" />
            <EducationCard />
          </div>
          <div className="max-w-2xl">
            <div className="prose-body space-y-5 text-lg">
              {bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-12 border-t border-line pt-5">
              <p className="label">Outside of code</p>
              <div className="mt-3">
                <Interests />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section labelledBy="process-title" className="pt-0 md:pt-4">
        <Container>
          <SectionHeading id="process-title" title="From Problem to Product." intro="How I work, shown through decisions in the Job Apply Agent." />
          <div className="mt-10">
            <Philosophy />
          </div>
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

      <Kashzo />
      <ContactCta />
    </>
  );
}
