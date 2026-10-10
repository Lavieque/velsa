"use client";

import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/lib/content/types";
import { translateSlug } from "@/lib/content/slugs";

type Href = Parameters<typeof Link>[0]["href"];
type Pathname = ReturnType<typeof usePathname>;

const dynamicPathnames = [
  "/services/[slug]",
  "/projects/[slug]",
  "/products/[slug]",
] as const;

function isDynamic(pathname: Pathname): pathname is (typeof dynamicPathnames)[number] {
  return (dynamicPathnames as readonly string[]).includes(pathname);
}

/**
 * Builds the equivalent href in `target`. On a detail page both the path and
 * the slug are localized, so the slug has to be swapped as well.
 */
function hrefForLocale(
  pathname: Pathname,
  slug: string | undefined,
  from: Locale,
  target: Locale,
): Href {
  if (slug) {
    switch (pathname) {
      case "/services/[slug]":
        return {
          pathname: "/services/[slug]",
          params: { slug: translateSlug("service", slug, from, target) ?? slug },
        };
      case "/projects/[slug]":
        return {
          pathname: "/projects/[slug]",
          params: { slug: translateSlug("project", slug, from, target) ?? slug },
        };
      case "/products/[slug]":
        return {
          pathname: "/products/[slug]",
          params: { slug: translateSlug("product", slug, from, target) ?? slug },
        };
    }
  }

  // A dynamic route always carries a slug, so this is unreachable in practice;
  // falling back to the home page keeps the switcher total.
  return isDynamic(pathname) ? "/" : pathname;
}

export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  return (
    <div className={`flex items-center gap-1 text-xs ${className ?? ""}`} aria-label={label}>
      {locales.map((target, i) => {
        const active = target === locale;

        return (
          <span key={target} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden className="text-parchment-dim/50">
                /
              </span>
            )}
            <Link
              href={hrefForLocale(pathname, slug, locale, target)}
              locale={target}
              hrefLang={target}
              aria-current={active ? "true" : undefined}
              className={`rounded px-1 py-0.5 uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber ${
                active ? "text-amber-soft" : "text-parchment-dim hover:text-parchment"
              }`}
            >
              {target}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
