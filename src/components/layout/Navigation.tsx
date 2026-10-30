"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl border px-3 py-2.5 transition-colors duration-300 sm:px-4",
          scrolled || open
            ? "border-line bg-bg-2/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <HomeLink href="/" className="flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="grid size-9 place-items-center rounded-full border border-line-strong bg-card font-display text-sm font-semibold text-cyan">
            {profile.initials}
          </span>
          <span className="font-display text-[15px] font-semibold text-fg">{profile.shortName}</span>
        </HomeLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const NavLink = item.href === "/" ? HomeLink : Link;
            return (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm transition-colors",
                    active ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-elevated"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-xl bg-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] sm:inline-flex"
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1200px] rounded-2xl border border-line bg-bg-2/95 p-2 backdrop-blur-md lg:hidden"
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
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base",
                        active ? "bg-elevated text-fg" : "text-fg-2",
                      )}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
