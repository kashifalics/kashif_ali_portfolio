import { profile } from "@/data/profile";
import { education, kashzo } from "@/data/experience";
import { siteUrl } from "@/lib/site";

/** schema.org Person data for search engines. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: profile.photo.src ? `${siteUrl}${profile.photo.src}` : undefined,
    jobTitle: profile.title,
    description: profile.positioning,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    worksFor: { "@type": "Organization", name: kashzo.name, url: kashzo.website },
    sameAs: [profile.social.github, profile.social.linkedin].filter(Boolean),
    knowsAbout: ["Artificial intelligence", "Agentic AI", "Retrieval-augmented generation", "Full-stack development", "AI automation"],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output contains no user input; "<" is escaped defensively.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
