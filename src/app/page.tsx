import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sortedProjects } from "@/data/projects";
import { withAvailableAssets } from "@/lib/assets";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { Flagship } from "@/components/sections/Flagship";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Dimensions } from "@/components/sections/Dimensions";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsDashboard } from "@/components/sections/SkillsDashboard";
import { Kashzo } from "@/components/sections/Kashzo";
import { Philosophy } from "@/components/sections/Philosophy";
import { aboutHeading, bio, EducationCard, Interests, PortraitCard } from "@/components/sections/AboutBlocks";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  const all = sortedProjects.map(withAvailableAssets);
  const flagship = all.find((p) => p.featured)!;
  const rest = all.filter((p) => !p.featured).slice(0, 6);

  return (
    <>
      <Hero />
      <SkillsMarquee />
      <Flagship project={flagship} />
      <SelectedWork projects={rest} total={all.length} />
      <Dimensions />

      <Section id="experience" labelledBy="exp-title" className="border-t border-line">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="exp-title"
              label="Experience"
              title="Where I've been building"
              intro="An internship, a company and a steady run of independent projects."
            />
            <div className="mt-8">
              <EducationCard />
            </div>
          </div>
          <ExperienceTimeline />
        </Container>
      </Section>

      <Section id="skills" labelledBy="skills-title" className="border-t border-line bg-bg-2/40">
        <Container>
          <SectionHeading
            id="skills-title"
            label="Technical skills"
            title="The toolkit, with receipts"
            intro="No percentages. Each skill points to where I've actually used it."
          />
          <Reveal className="mt-12">
            <SkillsDashboard />
          </Reveal>
        </Container>
      </Section>

      <Kashzo />

      <Section id="process" labelledBy="process-title" className="border-t border-line">
        <Container>
          <SectionHeading id="process-title" label="Engineering philosophy" title="From Problem to Product." align="center" />
          <div className="mt-14">
            <Philosophy />
          </div>
        </Container>
      </Section>

      <Section id="about" labelledBy="about-title" className="border-t border-line">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <PortraitCard className="mx-auto max-w-[380px]" />
          </Reveal>
          <div>
            <SectionHeading id="about-title" label="About" title={aboutHeading} />
            <div className="prose-body mt-6 space-y-4">
              {bio.slice(0, 3).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">
              More about me <ArrowRight size={15} />
            </Link>
            <h3 className="mt-12 mb-4 text-sm font-medium text-fg-2">Outside of code</h3>
            <Interests />
          </div>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
