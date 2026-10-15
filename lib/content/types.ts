export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Stable, language-neutral identifiers. Slugs are localized; these are not. */
export const serviceIds = [
  "websites",
  "apis",
  "automation",
  "data",
  "custom-software",
  "maintenance",
  "consulting",
] as const;
export const projectIds = ["real-stiles"] as const;
export const productIds = ["tradeflow", "domios"] as const;

export type ServiceId = (typeof serviceIds)[number];
export type ProjectId = (typeof projectIds)[number];
export type ProductId = (typeof productIds)[number];

export type ServiceIcon =
  | "globe"
  | "plug"
  | "zap"
  | "database"
  | "code"
  | "wrench"
  | "lightbulb";

export type Pattern = "grid" | "lines" | "dots" | "waves";

/* -------------------------------------------------------------------------- */
/* Locale-invariant data                                                      */
/* -------------------------------------------------------------------------- */

export type ServiceBase = {
  id: ServiceId;
  icon: ServiceIcon;
  image: string;
  relatedProject?: ProjectId;
};

export type ProjectBase = {
  id: ProjectId;
  /** Brand name — not translated. */
  title: string;
  year: string;
  tags: string[];
  href: string;
  palette: [string, string];
  pattern: Pattern;
  image?: string;
  video?: string;
  relatedProduct?: ProductId;
};

export type ProductBase = {
  id: ProductId;
  /** Brand name — not translated. */
  name: string;
  tags: string[];
  palette: [string, string];
  pattern: Pattern;
  href: string;
  relatedProject?: ProjectId;
  logoKey?: "domios" | "tradeflow";
  logoBg?: string;
  logoImage?: string;
};

/* -------------------------------------------------------------------------- */
/* Localized text                                                             */
/* -------------------------------------------------------------------------- */

export type ServiceText = {
  title: string;
  description: string;
  detail: string;
  includes: string[];
  benefits: string[];
};

export type ProjectText = {
  category: string;
  summary: string;
  description: string;
  clientIntro: string;
  challengeHeading: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  result: string;
};

export type ProductText = {
  category: string;
  headline: string;
  problem: string;
  valueProposition: string;
  features: string[];
};

export type Content = {
  profile: {
    tagline: string;
    founderRole: string;
    availability: string;
    location: string;
  };
  nav: { key: "services" | "projects" | "products" | "about" | "contact"; label: string }[];
  ctaLabel: string;
  hero: {
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problems: {
    headline: string;
    /** Spoken by the client, so these stay in the first-person plural. */
    items: { problem: string; solution: string }[];
  };
  services: {
    headline: string;
    intro: string;
    cta: string;
    items: Record<ServiceId, ServiceText>;
  };
  process: {
    headline: string;
    steps: { number: string; title: string; description: string }[];
  };
  projects: {
    headline: string;
    cta: string;
    items: Record<ProjectId, ProjectText>;
  };
  products: {
    headline: string;
    intro: string;
    cta: string;
    items: Record<ProductId, ProductText>;
  };
  about: {
    brandHeadline: string;
    brandParagraphs: string[];
    founderParagraphs: string[];
    timelineHeadline: string;
    timeline: { period: string; role: string; org: string; description: string }[];
    stackHeadline: string;
    technologies: { category: string; items: string[] }[];
  };
  contact: {
    headline: string;
    subhead: string;
    projectTypes: string[];
    form: {
      name: string;
      company: string;
      email: string;
      phone: string;
      projectType: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      /** Subject line of the pre-filled email. */
      mailSubject: string;
      mailLabels: {
        name: string;
        company: string;
        email: string;
        phone: string;
        projectType: string;
      };
    };
  };
  ctaFinal: { headline: string; subhead: string; cta: string };
  ui: {
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    backToServices: string;
    backToProjects: string;
    backToProducts: string;
    whatsIncluded: string;
    advantages: string;
    caseStudy: string;
    viewCaseStudy: string;
    theProblem: string;
    theSolution: string;
    valueProposition: string;
    keyFeatures: string;
    technologies: string;
    responsibility: string;
    result: string;
    usedInProduction: string;
    ownProductUsedHere: string;
    viewProductLive: string;
    viewProjectLive: string;
    discover: (name: string) => string;
    needHelpWith: (service: string) => string;
    interestedIn: (product: string) => string;
    footerCompany: string;
    footerSocials: string;
    alt: {
      projectScreenshot: (title: string) => string;
      projectVideo: (title: string) => string;
      serviceBanner: (title: string) => string;
      productLogo: (name: string) => string;
      visualComposition: (title: string) => string;
    };
  };
  legal: {
    privacyTitle: string;
    privacyParagraphs: string[];
    cookiesTitle: string;
    cookiesParagraphs: string[];
  };
  meta: Record<
    "home" | "services" | "projects" | "products" | "about" | "contact" | "privacy" | "cookies",
    { title: string; description: string }
  >;
};
