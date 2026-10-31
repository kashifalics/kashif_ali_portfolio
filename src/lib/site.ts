import { profile } from "@/data/profile";

/**
 * The site's public URL. Set NEXT_PUBLIC_SITE_URL once a custom domain is
 * connected; on Vercel it otherwise falls back to the production domain.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/+$/, "");

/**
 * The generated share card (app/opengraph-image.tsx). A page that sets its own
 * openGraph replaces the layout's, image included, so pages pass this back in.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.title}`,
};

/** Shortens text to a search-snippet length, ending on a whole word. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:.]$/, "")}…`;
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Kashzo", href: "/#kashzo" },
  { label: "Contact", href: "/contact" },
] as const;

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
