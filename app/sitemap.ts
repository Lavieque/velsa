import type { MetadataRoute } from "next";
import type { AppPathname } from "@/i18n/routing";
import { getProducts, getProjects, getServices, locales } from "@/lib/content";
import { localizedPath } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

const staticRoutes: AppPathname[] = [
  "/",
  "/services",
  "/projects",
  "/products",
  "/about",
  "/contact",
  "/privacy",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => {
    const pages = staticRoutes.map((route) => localizedPath(locale, route));

    const details = [
      ...getServices(locale).map((s) =>
        localizedPath(locale, { pathname: "/services/[slug]", params: { slug: s.slug } }),
      ),
      ...getProjects(locale).map((p) =>
        localizedPath(locale, { pathname: "/projects/[slug]", params: { slug: p.slug } }),
      ),
      ...getProducts(locale).map((p) =>
        localizedPath(locale, { pathname: "/products/[slug]", params: { slug: p.slug } }),
      ),
    ];

    return [...pages, ...details].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
    }));
  });
}
