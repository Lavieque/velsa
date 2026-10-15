import type { ProductBase, ProjectBase, ServiceBase } from "./types";

/** Brand-level facts that do not change between languages. */
export const profile = {
  brand: "Velsa Digital",
  brandShort: "Velsa",
  founderName: "Virgílio José",
  email: "contacto@velsadigital.com",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/virgilio-jos%C3%A9-25b360119/",
    },
    { label: "GitHub", href: "https://github.com/Lavieque" },
  ],
};

export const serviceBases: ServiceBase[] = [
  {
    id: "websites",
    icon: "globe",
    image: "/servicos/websites-aplicacoes.jpg",
    relatedProject: "real-stiles",
  },
  { id: "apis", icon: "plug", image: "/servicos/apis-integracoes.jpg" },
  { id: "automation", icon: "zap", image: "/servicos/automacao.jpg" },
  { id: "data", icon: "database", image: "/servicos/dados-bases-de-dados.jpg" },
  { id: "custom-software", icon: "code", image: "/servicos/software-a-medida.jpg" },
  {
    id: "maintenance",
    icon: "wrench",
    image: "/servicos/manutencao-evolucao.jpg",
    relatedProject: "real-stiles",
  },
  { id: "consulting", icon: "lightbulb", image: "/servicos/consultoria-tecnologica.jpg" },
];

export const projectBases: ProjectBase[] = [
  {
    id: "real-stiles",
    title: "Real Stiles",
    year: "2026",
    tags: ["Next.js", "Firebase"],
    href: "https://www.realstiles.co.mz/",
    palette: ["#c96a2e", "#241a12"],
    pattern: "dots",
    relatedProduct: "tradeflow",
    image: "/projetos/Real-Stiles.jpg",
    // Served from a CDN rather than the repo. f_auto:video picks AV1/WebM for
    // browsers that support it, q_auto sets the quality and w_1280 matches the
    // widest the player is ever rendered: 14.4 MB source down to ~5 MB.
    video:
      "https://res.cloudinary.com/dme5v1jdh/video/upload/f_auto:video,q_auto,w_1280/v1791666021/Real-Stiles_sxtkcn.mp4",
  },
  {
    id: "agro-trades",
    title: "Agro Trades",
    year: "2026",
    tags: ["Next.js", "TinaCMS", "Resend"],
    href: "https://agrotrades.co.mz/",
    palette: ["#3a8c2f", "#16240f"],
    pattern: "waves",
    image: "/projetos/Agro-Trades.jpg",
  },
];

export const productBases: ProductBase[] = [
  {
    id: "tradeflow",
    name: "TradeFlow",
    tags: ["NestJS", "TypeScript", "Playwright", "Firebase", "Stripe", "Docker"],
    palette: ["#d97b3f", "#5a3420"],
    pattern: "grid",
    relatedProject: "real-stiles",
    href: "https://tradeflow.realstiles.co.mz",
    logoImage: "/produtos/Tradeflow.png",
  },
  {
    id: "domios",
    name: "DomiOS",
    tags: [".NET", "PostgreSQL", "React", "Docker"],
    palette: ["#e9a266", "#2c2016"],
    pattern: "dots",
    href: "https://domios-frontend.vercel.app",
    logoKey: "domios",
    logoBg: "#0f3f34",
  },
];
