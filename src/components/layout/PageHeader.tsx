import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

export function PageHeader({ title, intro, children }: { title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="pt-32 pb-12 md:pt-40 md:pb-16">
      <Container>
        <h1 className="max-w-4xl text-[2.75rem] leading-[1] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <p className="prose-body mt-6 max-w-2xl text-lg">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}
