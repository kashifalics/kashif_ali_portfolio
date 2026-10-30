import Link from "next/link";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/site";
import { HomeLink } from "./HomeLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-line bg-bg-2/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-2">{profile.subtitle}</p>
          <p className="mt-1 text-sm text-fg-3">{profile.location}</p>
        </div>
        <div>
          <p className="label mb-4">Pages</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((n) => {
              const NavLink = n.href === "/" ? HomeLink : Link;
              return (
                <li key={n.href}>
                  <NavLink href={n.href} className="text-fg-2 transition-colors hover:text-cyan">
                    {n.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {profile.social.github && (
              <li>
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg-2 hover:text-cyan">
                  <GitHubIcon className="size-4" /> GitHub
                </a>
              </li>
            )}
            {profile.social.linkedin && (
              <li>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg-2 hover:text-cyan">
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
              </li>
            )}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className="break-all text-fg-2 hover:text-cyan">
                  {profile.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:justify-between">
        <p>© {year} {profile.name}</p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}
