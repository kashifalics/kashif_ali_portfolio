import { Container, ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="pt-44 pb-28">
      <Container className="text-center">
        <p className="label">404</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">This page doesn&apos;t exist</h1>
        <p className="prose-body mx-auto mt-4 max-w-md">The link may be old or mistyped. The projects page lists everything on the site.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/projects">See all projects</ButtonLink>
          <ButtonLink href="/" variant="secondary">Go home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
