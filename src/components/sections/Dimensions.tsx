import { Code2, Rocket, Boxes } from "lucide-react";
import { dimensions, profile } from "@/data/profile";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const icons = { engineer: Code2, builder: Boxes, entrepreneur: Rocket } as const;

export function Dimensions() {
  return (
    <Section labelledBy="dimensions-title" className="border-t border-line bg-bg-2/40">
      <Container>
        <SectionHeading id="dimensions-title" label="What I do" title="Three sides of the same work" intro={profile.positioning} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {dimensions.map((d, i) => {
            const Icon = icons[d.key];
            return (
              <Reveal key={d.key} delay={0.06 * i} className="bg-bg-2 p-7 sm:p-8">
                <Icon className="text-cyan" size={22} aria-hidden />
                <h3 className="mt-6 text-2xl font-semibold">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-2">{d.body}</p>
                <p className="mt-6 border-t border-line pt-4 text-sm text-fg-3">
                  <span className="text-fg-2">In practice: </span>
                  {d.proof}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
