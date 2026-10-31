import { education } from "@/data/experience";
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
    <div className="border-t border-line pt-5">
      <p className="label">Education</p>
      <p className="mt-2 font-display text-xl font-medium">{education.degree}</p>
      <p className="mt-1 text-fg-2">
        {education.institution}, {education.location}
      </p>
      {education.period && <p className="mt-1 font-mono text-xs text-fg-3">{education.period}</p>}
    </div>
  );
}

export function PortraitCard({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <ProfilePhoto sizes="(min-width: 1024px) 400px, 90vw" className="aspect-[4/5] rounded-md bg-white" />
      <figcaption className="mt-3 flex items-baseline justify-between text-[13px]">
        <span className="text-fg">{profile.name}</span>
        <span className="text-fg-3">{profile.location}</span>
      </figcaption>
    </figure>
  );
}

export function Interests() {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-2 text-[15px] text-fg-2">
      {interests.map((it, i) => (
        <li key={it}>
          {it}
          {i < interests.length - 1 && <span className="ml-2 text-fg-3">/</span>}
        </li>
      ))}
    </ul>
  );
}
