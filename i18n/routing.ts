import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/content/types";

/**
 * Internal pathnames (the keys) are language-neutral and match the folder
 * names under `app/[locale]`. The values are what the visitor actually sees.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": { pt: "/servicos", en: "/services" },
    "/services/[slug]": { pt: "/servicos/[slug]", en: "/services/[slug]" },
    "/projects": { pt: "/projetos", en: "/projects" },
    "/projects/[slug]": { pt: "/projetos/[slug]", en: "/projects/[slug]" },
    "/products": { pt: "/produtos", en: "/products" },
    "/products/[slug]": { pt: "/produtos/[slug]", en: "/products/[slug]" },
    "/about": { pt: "/sobre", en: "/about" },
    "/contact": { pt: "/contacto", en: "/contact" },
    "/privacy": { pt: "/privacidade", en: "/privacy" },
    "/cookies": { pt: "/cookies", en: "/cookies" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
