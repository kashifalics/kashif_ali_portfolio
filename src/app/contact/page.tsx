import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Section } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactHeading, contactIntro } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muhammad Kashif Ali about AI engineering, software development, automation or a product idea.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  const links = [
    profile.email && { href: `mailto:${profile.email}`, label: "Email", value: profile.email, Icon: Mail, external: false },
    profile.social.linkedin && { href: profile.social.linkedin, label: "LinkedIn", value: "Muhammad Kashif Ali", Icon: LinkedInIcon, external: true },
    profile.social.github && { href: profile.social.github, label: "GitHub", value: profile.social.github.replace("https://", ""), Icon: GitHubIcon, external: true },
  ].filter(Boolean) as { href: string; label: string; value: string; Icon: typeof Mail; external: boolean }[];

  return (
    <>
      <PageHeader title={contactHeading} intro={contactIntro} />
      <Section className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ul className="space-y-3">
              {links.map(({ href, label, value, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card group flex items-center gap-4 p-5 transition-colors hover:border-line-strong"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong text-cyan">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-fg-3">{label}</span>
                      <span className="block truncate font-medium text-fg group-hover:text-cyan">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-2">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} /> {profile.location}
              </span>
              {profile.resume.href && (
                <a href={profile.resume.href} download={profile.resume.fileName} className="inline-flex items-center gap-2 hover:text-cyan">
                  <Download size={15} /> Download Resume
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
