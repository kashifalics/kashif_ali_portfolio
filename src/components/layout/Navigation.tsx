"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, cn } from "@/lib/site";
import { profile } from "@/data/profile";
import { HomeLink } from "./HomeLink";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const next = typeof value === "function" ? value(prev === pathname) : value;
      return next ? pathname : null;
    });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape or a tap outside the header.
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <HomeLink href="/" className="font-display text-[17px] font-semibold tracking-tight text-fg" aria-label={`${profile.name}, home`}>
          {profile.name}
        </HomeLink>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const NavLink = item.href === "/" ? HomeLink : Link;
            return (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-2 text-sm underline-offset-[6px] transition-colors",
                    active ? "text-fg underline decoration-cyan decoration-1" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-cyan hover:text-cyan sm:inline-flex"
          >
            Let&apos;s connect
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-lg border border-line text-fg lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line px-2 pb-3 motion-safe:animate-[fade-in_0.2s_ease-out] lg:hidden"
        >
          <ul>
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const NavLink = item.href === "/" ? HomeLink : Link;
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn("block px-4 py-3 text-base", active ? "text-fg" : "text-fg-2")}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
