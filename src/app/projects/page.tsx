import type { Metadata } from "next";
import { sortedProjects, usedCategories } from "@/data/projects";
import { withAvailableAssets } from "@/lib/assets";
import { Container, Section } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI agents, RAG systems, automation, machine learning, full-stack products and Kashzo Solutions work by Muhammad Kashif Ali, each labelled with its status and ownership.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

const legend = [
  ["Live", "Running in production at a public URL."],
  ["Completed", "Finished and working; not necessarily deployed."],
  ["In Progress", "Being built now."],
  ["Prototype", "Works end to end as a proof of concept."],
  ["Concept", "A design or demo prepared to show an idea."],
] as const;

export default function ProjectsPage() {
  const projects = sortedProjects.map(withAvailableAssets);
  return (
    <>
      <PageHeader
        label="Projects"
        title="Everything I've built, labelled honestly"
        intro="Independent engineering, Kashzo Solutions work, internship and demo projects. Filter by area, then open any project for the full case study."
      />
      <Section className="pt-0 md:pt-0">
        <Container>
          <ProjectGrid projects={projects} categories={usedCategories} />
          <dl className="mt-16 grid gap-4 border-t border-line pt-8 text-sm sm:grid-cols-2 lg:grid-cols-5">
            {legend.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-xs text-cyan">{k}</dt>
                <dd className="mt-1 text-fg-3">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
