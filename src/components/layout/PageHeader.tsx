import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

export function PageHeader({ label, title, intro, children }: { label: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="pt-36 pb-12 md:pt-44 md:pb-16">
      <Container>
        <p className="label">{label}</p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="prose-body mt-6 max-w-2xl text-lg">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}
