import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { getContent, locales, profile, type Content, type Locale } from "@/lib/content";
import { absoluteUrl, languageAlternates } from "@/lib/site";

type Href = AppPathname | { pathname: AppPathname; params: Record<string, string> };

/** Visitor-facing path for a route in a given locale, e.g. `/en/services`. */
export function localizedPath(locale: Locale, href: Href) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return getPathname({ href: href as any, locale });
}

/**
 * Builds canonical URL, hreflang alternates and Open Graph tags for a page.
 * `hrefs` gives the route in each locale — they differ on detail pages, where
 * the slug is translated too.
 */
export function buildMetadata({
  locale,
  title,
  description,
  hrefs,
}: {
  locale: Locale;
  title: string;
  description: string;
  hrefs: Record<Locale, Href>;
}): Metadata {
  const paths = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, hrefs[l])]),
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(paths[locale]),
      languages: languageAlternates(paths),
    },
    openGraph: {
      type: "website",
      siteName: profile.brand,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      title,
      description,
      url: absoluteUrl(paths[locale]),
    },
  };
}

/** Metadata for a page that exists at the same route key in both locales. */
export function staticPageMetadata(
  locale: Locale,
  key: keyof Content["meta"],
  pathname: AppPathname,
): Metadata {
  const { meta } = getContent(locale);
  return buildMetadata({
    locale,
    title: meta[key].title,
    description: meta[key].description,
    hrefs: { pt: pathname, en: pathname },
  });
}
