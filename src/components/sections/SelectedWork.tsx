import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { Container, Section, SectionHeading, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function SelectedWork({ projects, total }: { projects: Project[]; total: number }) {
  return (
    <Section id="work" labelledBy="work-title" className="border-t border-line">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            label="Selected work"
            title="More things I've built"
            intro="RAG systems, agents, automation, machine learning and the products of my own business. Each one is labelled with what it is and how far it got."
          />
          <ButtonLink href="/projects" variant="secondary" className="shrink-0">
            All {total} projects <ArrowRight size={16} />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * (i % 3)} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
