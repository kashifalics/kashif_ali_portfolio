"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A link to the home page that always lands on the hero. Next.js does nothing
 * when the target is the page you're already on, so on "/" this scrolls to the
 * top itself and drops any "#section" left in the address bar.
 */
export function HomeLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Link
      {...props}
      href="/"
      onClick={(e) => {
        onClick?.(e);
        if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        // A jump, not an animation: a long smooth scroll stops wherever the
        // visitor happens to touch the wheel or trackpad.
        window.scrollTo({ top: 0, behavior: "instant" });
        // Clear the hash through the router so it knows the URL changed;
        // otherwise a later click on the same "#section" link does nothing.
        if (window.location.hash) router.replace("/", { scroll: false });
      }}
    />
  );
}
