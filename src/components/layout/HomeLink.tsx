"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A link to the home page that always lands on the hero. Next.js does nothing
 * when the target is the page you're already on, so on "/" this scrolls to the
 * top itself and drops any "#section" left in the address bar.
 */
export function HomeLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href="/"
      onClick={(e) => {
        onClick?.(e);
        if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        if (window.location.hash) window.history.replaceState(window.history.state, "", "/");
      }}
    />
  );
}
