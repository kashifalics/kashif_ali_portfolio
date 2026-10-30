import type { Metadata } from "next";
import { dimensions } from "@/data/profile";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
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
      <PageHeader label="About" title={aboutHeading} />

      <Section className="pt-0 md:pt-0">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 lg:sticky lg:top-28">
            <PortraitCard className="mx-auto max-w-[400px]" />
            <EducationCard />
          </div>
          <div>
            <div className="prose-body space-y-5 text-lg">
              {bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-semibold">How I think about my work</h2>
            <ul className="mt-6 space-y-4">
              {dimensions.map((d) => (
                <li key={d.key} className="card p-6">
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 text-fg-2">{d.body}</p>
                  <p className="mt-3 text-sm text-fg-3">{d.proof}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 mb-6 text-2xl font-semibold">Beyond technology</h2>
            <Interests />
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

      <Section labelledBy="process-title" className="border-t border-line">
        <Container>
          <SectionHeading id="process-title" label="Engineering philosophy" title="From Problem to Product." align="center" />
          <div className="mt-14">
            <Philosophy />
          </div>
        </Container>
      </Section>

      <Kashzo />
      <ContactCta />
    </>
  );
}
