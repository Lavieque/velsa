import { en } from "./en";
import { productBases, projectBases, serviceBases, profile } from "./entities";
import { pt } from "./pt";
import { productSlugs, projectSlugs, serviceSlugs } from "./slugs";
import type {
  Content,
  Locale,
  ProductBase,
  ProductId,
  ProductText,
  ProjectBase,
  ProjectId,
  ProjectText,
  ServiceBase,
  ServiceId,
  ServiceText,
} from "./types";

export * from "./types";
export * from "./slugs";
export { profile };

const dictionaries: Record<Locale, Content> = { pt, en };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

/* -------------------------------------------------------------------------- */
/* View models: locale-invariant data merged with the localized text          */
/* -------------------------------------------------------------------------- */

export type Service = ServiceBase & ServiceText & { slug: string };
export type Project = ProjectBase & ProjectText & { slug: string };
export type Product = ProductBase & ProductText & { slug: string };

export function getServices(locale: Locale): Service[] {
  const { items } = getContent(locale).services;
  return serviceBases.map((base) => ({
    ...base,
    ...items[base.id],
    slug: serviceSlugs[base.id][locale],
  }));
}

export function getProjects(locale: Locale): Project[] {
  const { items } = getContent(locale).projects;
  return projectBases.map((base) => ({
    ...base,
    ...items[base.id],
    slug: projectSlugs[base.id][locale],
  }));
}

export function getProducts(locale: Locale): Product[] {
  const { items } = getContent(locale).products;
  return productBases.map((base) => ({
    ...base,
    ...items[base.id],
    slug: productSlugs[base.id][locale],
  }));
}

export function findServiceBySlug(locale: Locale, slug: string) {
  return getServices(locale).find((service) => service.slug === slug);
}

export function findProjectBySlug(locale: Locale, slug: string) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function findProductBySlug(locale: Locale, slug: string) {
  return getProducts(locale).find((product) => product.slug === slug);
}

export function getServiceById(locale: Locale, id: ServiceId) {
  return getServices(locale).find((service) => service.id === id);
}

export function getProjectById(locale: Locale, id: ProjectId) {
  return getProjects(locale).find((project) => project.id === id);
}

export function getProductById(locale: Locale, id: ProductId) {
  return getProducts(locale).find((product) => product.id === id);
}

/** Looks up an entity's slug in a given locale. */
export function slugFor(kind: "service" | "project" | "product", locale: Locale, id: string) {
  const map =
    kind === "service" ? serviceSlugs : kind === "project" ? projectSlugs : productSlugs;
  return (map as Record<string, Record<Locale, string>>)[id]?.[locale];
}
