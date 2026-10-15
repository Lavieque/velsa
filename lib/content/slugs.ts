import type { Locale, ProductId, ProjectId, ServiceId } from "./types";

export type LocalizedSlug = Record<Locale, string>;

/**
 * Single source of truth for localized slugs. Kept apart from the copy so the
 * language switcher can import it into the client bundle without dragging in
 * every translated string, and so `Record<Id, ...>` forces full coverage.
 */
export const serviceSlugs: Record<ServiceId, LocalizedSlug> = {
  websites: { pt: "websites-aplicacoes", en: "websites-apps" },
  apis: { pt: "apis-integracoes", en: "apis-integrations" },
  automation: { pt: "automacao", en: "automation" },
  data: { pt: "dados-bases-de-dados", en: "data-databases" },
  "custom-software": { pt: "software-a-medida", en: "custom-software" },
  maintenance: { pt: "manutencao-evolucao", en: "maintenance-support" },
  consulting: { pt: "consultoria-tecnologica", en: "technology-consulting" },
};

export const projectSlugs: Record<ProjectId, LocalizedSlug> = {
  "real-stiles": { pt: "real-stiles", en: "real-stiles" },
  "agro-trades": { pt: "agro-trades", en: "agro-trades" },
};

export const productSlugs: Record<ProductId, LocalizedSlug> = {
  tradeflow: { pt: "tradeflow", en: "tradeflow" },
  domios: { pt: "domios", en: "domios" },
};

const byKind = {
  service: serviceSlugs,
  project: projectSlugs,
  product: productSlugs,
} satisfies Record<string, Record<string, LocalizedSlug>>;

export type SlugKind = keyof typeof byKind;

/** Translates a slug from one locale to another, for the language switcher. */
export function translateSlug(
  kind: SlugKind,
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  const entry = Object.values(byKind[kind]).find((pair) => pair[from] === slug);
  return entry?.[to];
}
