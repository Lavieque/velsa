"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { profile, type Content, type Locale } from "@/lib/content";
import { LocaleSwitcher } from "./LocaleSwitcher";

// Only the static routes: Link rejects a dynamic pathname without params.
const hrefByKey = {
  services: "/services",
  projects: "/projects",
  products: "/products",
  about: "/about",
  contact: "/contact",
} as const satisfies Record<Content["nav"][number]["key"], string>;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Navbar({
  locale,
  nav,
  ctaLabel,
  ui,
}: {
  locale: Locale;
  nav: Content["nav"];
  ctaLabel: string;
  ui: { openMenu: string; closeMenu: string; switchLanguage: string };
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Reads the live scroll position without a mount effect, so the header is
  // already solid when the page is loaded part-way down.
  const solid = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the mobile menu, as expected of a modal overlay.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || menuOpen ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link href="/" className="font-display text-xl tracking-tight text-parchment">
          {profile.brandShort}
          <span className="text-amber">.</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((link) => (
            <li key={link.key}>
              <Link
                href={hrefByKey[link.key]}
                className="underline-draw text-sm text-parchment-dim transition-colors hover:text-parchment"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} label={ui.switchLanguage} />

          <Link
            href="/contact"
            className="hidden rounded-full border border-line px-5 py-2 text-sm text-parchment transition-colors hover:border-amber hover:text-amber sm:inline-block"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded text-parchment transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-line bg-ink px-6 pb-8 pt-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((link) => (
              <li key={link.key}>
                <Link
                  href={hrefByKey[link.key]}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-lg text-parchment"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink"
          >
            {ctaLabel}
          </Link>
        </motion.div>
      )}
    </header>
  );
}
