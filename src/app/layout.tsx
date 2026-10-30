import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { PersonJsonLd } from "@/components/layout/PersonJsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const description = profile.positioning;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Muhammad Kashif Ali",
    "AI Engineer",
    "Agentic AI",
    "LangGraph",
    "RAG",
    "FastAPI",
    "Next.js",
    "Kashzo Solutions",
    "Lahore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Lets Next.js switch off smooth scrolling while it changes pages, so a
      // route change jumps straight to the top instead of animating there.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <div aria-hidden className="site-grid pointer-events-none fixed inset-0 -z-10" />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,rgba(56,189,248,0.10),transparent_70%)]"
        />
        <PersonJsonLd />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
