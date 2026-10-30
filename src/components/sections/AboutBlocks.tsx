import { GraduationCap, MapPin } from "lucide-react";
import { certifications, education } from "@/data/experience";
import { interests, profile } from "@/data/profile";
import { ProfilePhoto } from "./ProfilePhoto";

export const aboutHeading = "Curious by Nature. Engineering by Passion.";

/** The biography, in the owner's words. */
export const bio = [
  "I'm Muhammad Kashif Ali, a computer science student and AI-focused software developer with a strong interest in building intelligent systems and practical digital products.",
  "My work brings together software engineering, artificial intelligence, automation, and product development.",
  "I enjoy exploring emerging technologies, understanding complex problems, and turning ideas into functional applications.",
  "Alongside independent engineering, I am building Kashzo Solutions, a technology business focused on web development, AI automation, and digital solutions.",
  "Beyond technology, I am interested in entrepreneurship, financial markets, quantitative trading, history, and continuous learning.",
];

export function EducationCard() {
  return (
    <div className="card p-6">
      <GraduationCap className="text-cyan" size={22} aria-hidden />
      <p className="label mt-5">Education</p>
      <h3 className="mt-2 text-xl font-semibold">{education.degree}</h3>
      <p className="mt-1 text-fg-2">{education.institution}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-3">
        <MapPin size={14} /> {education.location}
        {education.period && <span className="ml-2 font-mono">{education.period}</span>}
      </p>
      {certifications.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs text-fg-3">Certifications</p>
          <ul className="mt-3 space-y-3">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-4 text-sm">
                <span>
                  <span className="block text-fg">{c.title}</span>
                  <span className="block text-fg-3">{c.issuer}</span>
                </span>
                <span className="shrink-0 font-mono text-xs text-fg-3">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PortraitCard({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-[22px] border border-line-strong bg-bg-2 p-2">
        <ProfilePhoto sizes="(min-width: 1024px) 420px, 90vw" className="aspect-[4/5] rounded-[16px] bg-white" />
      </div>
      <figcaption className="mt-3 flex items-center justify-between text-sm text-fg-3">
        <span>{profile.name}</span>
        <span className="font-mono text-xs">{profile.location}</span>
      </figcaption>
    </figure>
  );
}

export function Interests() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {interests.map((it) => (
        <li key={it.title} className="rounded-xl border border-line bg-bg-2/70 p-5 transition-colors hover:border-line-strong">
          <p className="font-medium text-fg">{it.title}</p>
          <p className="mt-1 text-sm text-fg-3">{it.note}</p>
        </li>
      ))}
    </ul>
  );
}
