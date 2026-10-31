import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sortedProjects } from "@/data/projects";
import { toCard, withAvailableAssets } from "@/lib/assets";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Hero } from "@/components/sections/Hero";
import { Flagship } from "@/components/sections/Flagship";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsDashboard } from "@/components/sections/SkillsDashboard";
import { Kashzo } from "@/components/sections/Kashzo";
import { Philosophy } from "@/components/sections/Philosophy";
import { aboutHeading, bio, Interests } from "@/components/sections/AboutBlocks";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  const all = sortedProjects.map(withAvailableAssets);
  const flagship = all.find((p) => p.featured)!;
  const rest = all.filter((p) => !p.featured);

  return (
    <>
      <Hero />
      <Flagship project={flagship} />

      <Section id="work" labelledBy="work-title" className="pt-4 md:pt-8">
        <Container>
          <SectionHeading
            id="work-title"
            title="Work"
            intro="Agents, retrieval systems, automation, machine learning, and the products of my own company."
          />
          <div className="mt-10">
            <ProjectGrid projects={rest.slice(0, 6).map(toCard)} />
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/projects" variant="secondary">
              View all {all.length} projects <ArrowRight size={15} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Kashzo />

      <Section id="experience" labelledBy="exp-title">
        <Container>
          <SectionHeading id="exp-title" title="Experience" intro="An internship in AI engineering, a company of my own, and independent projects throughout." />
          <div className="mt-10">
            <ExperienceTimeline />
          </div>
        </Container>
      </Section>

      <Section id="process" labelledBy="process-title" className="pt-0 md:pt-4">
        <Container>
          <SectionHeading id="process-title" title="From Problem to Product." intro="How I work. Hover over or tap a card to see the decision each stage led to in the Job Apply Agent." />
          <div className="mt-10">
            <Philosophy />
          </div>
        </Container>
      </Section>

      <Section id="skills" labelledBy="skills-title" className="pt-0 md:pt-4">
        <Container>
          <SectionHeading id="skills-title" title="Technical skills" intro="Grouped by area. Skills with a cyan dot are used in projects on this site: select one to open the project." />
          <div className="mt-10">
            <SkillsDashboard />
          </div>
        </Container>
      </Section>

      <Section id="about" labelledBy="about-title" className="pt-0 md:pt-4">
        <Container>
          <SectionHeading id="about-title" title={aboutHeading} />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
            <div className="prose-body max-w-2xl space-y-4">
              {bio.slice(0, 4).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="space-y-6">
              <div>
                <p className="label">Outside of code</p>
                <div className="mt-3">
                  <Interests />
                </div>
              </div>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg hover:text-cyan">
                More about me <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
