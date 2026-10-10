import type { Locale } from "./content/types";

export const baseUrl = "https://velsadigital.pt";

/** Canonical absolute URL for a visitor-facing path. */
export function absoluteUrl(path: string) {
  return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

/** hreflang map for a page, given its visitor-facing path in each locale. */
export function languageAlternates(paths: Record<Locale, string>) {
  return {
    "pt-PT": absoluteUrl(paths.pt),
    en: absoluteUrl(paths.en),
    "x-default": absoluteUrl(paths.pt),
  };
}
