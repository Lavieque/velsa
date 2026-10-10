import { profile } from "./entities";
import type { Content } from "./types";

export const en: Content = {
  profile: {
    tagline: "Technology & Digital Solutions",
    founderRole: "Founder & Software Developer",
    availability: "Available for new projects from March 2026",
    location: "Portugal — working with companies nationwide",
  },

  nav: [
    { key: "services", label: "Services" },
    { key: "projects", label: "Projects" },
    { key: "products", label: "Products" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ],

  ctaLabel: "Get in touch",

  hero: {
    headline: "Technology that solves real problems.",
    subhead:
      "Websites, software, APIs, integrations and automation, built around what your business actually needs.",
    ctaPrimary: "Discuss a project",
    ctaSecondary: "See projects",
  },

  problems: {
    headline: "I don't start with the technology. I start with the problem.",
    items: [
      {
        problem: "We spend far too long doing this by hand.",
        solution: "Process automation.",
      },
      {
        problem: "Our systems don't talk to each other.",
        solution: "APIs and integrations.",
      },
      {
        problem: "We need a system that fits how we actually work.",
        solution: "Custom software.",
      },
      {
        problem: "Our information is scattered everywhere.",
        solution: "Databases and centralisation.",
      },
      {
        problem: "We need a stronger presence online.",
        solution: "Website or web platform.",
      },
    ],
  },

  services: {
    eyebrow: "How I can help",
    headline: "I build custom digital solutions.",
    intro:
      "Every business has different needs. I develop technology that fits the processes, systems and goals of each project.",
    cta: "Explore the services",
    items: {
      websites: {
        title: "Websites & Applications",
        description: "Company websites, web platforms and custom applications.",
        detail:
          "From company websites to full web platforms, I design and build around what the business actually needs — not around a generic template. The result is fast, easy to maintain and ready to grow.",
        includes: [
          "Interface and user experience design",
          "Frontend and backend development",
          "Performance and technical SEO optimisation",
          "Integration with your existing systems and tools",
        ],
        benefits: [
          "Modern design, focused on the user experience",
          "Technical SEO handled from day one",
          "Fully responsive, on any device",
          "Built to grow with the business",
        ],
      },
      apis: {
        title: "APIs & Integrations",
        description: "APIs and connections between different systems, services and platforms.",
        detail:
          "When a company's systems don't talk to each other, work gets duplicated and data goes missing. I build custom APIs and third-party integrations so information flows one way, with no manual steps.",
        includes: [
          "REST API design and documentation",
          "Integration with payment, invoicing and CRM services",
          "Data synchronisation between systems",
          "Authentication and access control",
        ],
        benefits: [
          "Data always in sync across systems",
          "Less duplicated manual work",
          "Clearer information flows",
          "Easy to extend to new systems",
        ],
      },
      automation: {
        title: "Automation",
        description: "Automation of repetitive tasks and processes.",
        detail:
          "Repetitive tasks eat the time that should go into work that matters. I map the manual processes in your day-to-day and build reliable automation around them, with clear alerts and a record of what ran.",
        includes: [
          "Review of your existing manual processes",
          "Automation of repetitive tasks and approval flows",
          "Automatic alerts and notifications",
          "Logging and audit trail of every run",
        ],
        benefits: [
          "Fewer repetitive tasks for the team",
          "Faster responses to clients and partners",
          "A clear record of what was automated",
          "Less room for human error",
        ],
      },
      data: {
        title: "Data & Databases",
        description: "Structuring, integrating and building data-driven solutions.",
        detail:
          "Data spread across spreadsheets and disconnected systems slows every decision down. I structure solid databases and centralise the information, so it stays accurate and available to the people who need it.",
        includes: [
          "Database modelling",
          "Migration and clean-up of existing data",
          "Custom reports and dashboards",
          "Backup and data security policies",
        ],
        benefits: [
          "Information centralised in one place",
          "Reports that are always up to date",
          "Faster, better-informed decisions",
          "Secure, well-structured data",
        ],
      },
      "custom-software": {
        title: "Custom Software",
        description: "Systems built specifically around the needs of the business.",
        detail:
          "Not every problem is solved by an off-the-shelf tool. I design and build systems around how the business actually works, instead of forcing your processes to bend to generic software.",
        includes: [
          "Requirements gathered directly with your team",
          "Architecture sized for real-world usage",
          "Incremental development, with visible deliveries",
          "Technical documentation for the delivered system",
        ],
        benefits: [
          "Processes that fit the business, not the other way round",
          "Architecture sized for real-world usage",
          "Visible deliveries throughout the project",
          "Clear documentation of what was delivered",
        ],
      },
      maintenance: {
        title: "Maintenance & Support",
        description: "Fixing, improving and evolving existing applications.",
        detail:
          "A system in production needs ongoing care: bug fixes, small improvements and adapting to new needs. I act as that system's long-term technical partner, not only as the person who first built it.",
        includes: [
          "Bug fixing and monitoring",
          "Small improvements and one-off requests",
          "Dependency and security updates",
          "A direct, dependable technical contact",
        ],
        benefits: [
          "A system that stays current and secure",
          "Fast turnaround on one-off requests",
          "A direct, dependable technical contact",
          "Continuous evolution, without starting over",
        ],
      },
      consulting: {
        title: "Technology Consulting",
        description:
          "Strategy and support in choosing the right technology for each project.",
        detail:
          "Before choosing a technology, you need to understand the problem properly. I help identify the approach that fits the business — architecture, stack, priorities — and support the technical transition, without over-engineering the answer.",
        includes: [
          "Review of technical needs and priorities",
          "Architecture and technology stack recommendations",
          "Code review and technical audits",
          "Support for your team through the transition",
        ],
        benefits: [
          "Technical decisions grounded in reasoning, not trends",
          "Less risk in technology investments",
          "An independent, impartial technical partner",
          "Close support throughout the process",
        ],
      },
    },
  },

  process: {
    eyebrow: "How I work",
    headline: "From idea to solution.",
    steps: [
      { number: "01", title: "Discover", description: "Understand the business, the problem and the goals." },
      { number: "02", title: "Plan", description: "Define requirements, architecture and technical approach." },
      { number: "03", title: "Build", description: "Develop and integrate the solution." },
      { number: "04", title: "Test", description: "Validate functionality, performance and behaviour." },
      { number: "05", title: "Deliver", description: "Put the solution into production." },
      { number: "06", title: "Evolve", description: "Maintenance, improvements and new features." },
    ],
  },

  projects: {
    eyebrow: "Selected work",
    headline: "Selected projects",
    cta: "See all projects",
    items: {
      "real-stiles": {
        category: "Website · E-commerce",
        summary:
          "A Mozambican online store spanning fashion, electronics and homeware, shipping nationwide.",
        description:
          "An e-commerce platform in Mozambique, with a category-based catalogue and local payment methods (Visa, M-Pesa and e-Mola).",
        clientIntro:
          "Real Stiles is a Mozambican online store with a catalogue across several categories — fashion, electronics, beauty and homeware — built to reach customers across the whole country.",
        challengeHeading: "One store, every category",
        problem:
          "The brand needed an online store that could present a very broad catalogue in an organised way, with payment methods suited to the Mozambican market and a direct support channel for customers.",
        solution:
          "I built the store in Next.js with Firebase: category-based navigation, a featured promotions carousel, product filtering and sorting, and payment by Visa, M-Pesa and e-Mola. The catalogue is imported from international suppliers (Temu, Shein, AliExpress, Zara, H&M, AboutYou) through TradeFlow, my own product import engine, and customer support runs directly through WhatsApp.",
        responsibilities: [
          "Frontend development of the store in Next.js",
          "Database and authentication on Firebase",
          "Navigation structure and category-based catalogue",
          "Supplier catalogue import via TradeFlow",
          "Payment integration (Visa, M-Pesa, e-Mola)",
          "WhatsApp support integration",
        ],
        result:
          "Live in production, with an active catalogue across multiple categories and local payments integrated.",
      },
    },
  },

  products: {
    eyebrow: "Own products",
    headline: "Products I've built.",
    intro:
      "Alongside client work, I build my own digital products to solve specific problems.",
    cta: "See all products",
    items: {
      tradeflow: {
        category: "Product import engine",
        headline: "Automatic product extraction from marketplaces, via API.",
        problem:
          "Importing products from marketplaces into your own store by hand — title, price, images, variants — is slow and repetitive, and every supplier structures their pages differently.",
        valueProposition:
          "TradeFlow takes a product URL and returns normalised data — title, price, images and variants — extracted straight from the source page. It isn't an ERP: it extracts and returns data, it doesn't store or manage products afterwards.",
        features: [
          "Product extraction via API, with its own processing queue",
          "Direct support for Shein, with Temu, AliExpress and Zara in development",
          "Connection to a satellite service for additional brands (Zara, H&M, Zalando, Amazon, Pull&Bear, Bershka, AboutYou, AliExpress)",
          "Licensing per account/store, with credits per operation (import, price/stock sync, translation)",
        ],
      },
      domios: {
        category: "Household shopping and recipe management",
        headline: "Prices, pantry and recipes, under one digital roof.",
        problem:
          "Households track prices, promotions, pantry and meals in completely separate places — with no tool that knows what is already at home or what usually gets bought.",
        valueProposition:
          "DomiOS brings together a product catalogue, pantry, recipes, shopping lists and prices from several Portuguese chains (Continente, Pingo Doce, Lidl, Auchan) on one platform, to help decide what to buy, where to buy it and what to cook with what is already at home.",
        features: [
          "Pantry and product catalogue organised per household",
          "Recipes suggested from what is already in the pantry",
          "Shopping lists integrated with the catalogue",
          "Prices, promotions and history across several Portuguese chains",
        ],
      },
    },
  },

  about: {
    brandEyebrow: "About the brand",
    brandHeadline: "Technology with a purpose.",
    brandParagraphs: [
      `${profile.brand} was founded to build technology that solves real problems and helps companies move forward digitally.`,
      "I develop websites, applications, APIs, integrations, automation and custom software — always understanding the problem first, and choosing the technology second.",
      "Alongside client work, I build and run my own digital products.",
    ],
    founderEyebrow: "Founder",
    founderParagraphs: [
      `I'm ${profile.founderName}, founder of ${profile.brand}. I develop software, specialising in backend and custom digital solutions.`,
      "I have experience building APIs, web applications, system integrations, databases and process automation.",
      "My work is about turning business needs into technology that works, balancing simplicity, performance, maintainability and room to grow.",
      `${profile.brand} is an extension of that path: building solutions for companies and creating my own technology products.`,
    ],
    timelineEyebrow: "Background",
    timelineHeadline: "Professional experience",
    timeline: [
      {
        period: "2022 — Present",
        role: "Backend Developer",
        org: "InovaDigital",
        description:
          "Development of APIs, enterprise systems, databases, integrations and automation.",
      },
      {
        period: "2025 — Present",
        role: "Founder & Software Developer",
        org: profile.brand,
        description:
          "Development of digital solutions, technology services and own products.",
      },
    ],
    stackEyebrow: "Stack",
    stackHeadline: "Technologies",
    technologies: [
      { category: "Backend", items: ["C#", ".NET", "Node.js", "Python", "Spring Boot"] },
      { category: "Databases", items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"] },
      { category: "Web", items: ["JavaScript", "Vue", "React", "Nuxt"] },
      { category: "Infrastructure", items: ["Docker", "IIS", "Windows Services"] },
      { category: "Integration", items: ["REST APIs", "Webhooks", "n8n", "Primavera"] },
    ],
  },

  contact: {
    headline: "Got a problem that needs solving?",
    subhead:
      "Tell me what you want to build, improve or automate. I'll work through the best approach with you.",
    projectTypes: [
      "Website",
      "Web application",
      "API",
      "Integration",
      "Automation",
      "Database",
      "Custom software",
      "Other",
    ],
    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone (optional)",
      projectType: "Project type",
      message: "Message",
      messagePlaceholder: "Tell me what you want to build, improve or automate.",
      submit: "Send request",
      mailSubject: "New project enquiry",
      mailLabels: {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        projectType: "Project type",
      },
    },
  },

  ctaFinal: {
    headline: "Got a problem that needs solving?",
    subhead:
      "Tell me what you want to build, improve or automate — I answer every enquiry personally.",
    cta: "Get in touch",
  },

  ui: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Change language",
    backToServices: "All services",
    backToProjects: "All projects",
    backToProducts: "All products",
    whatsIncluded: "What's included",
    advantages: "Benefits",
    caseStudy: "Case study",
    viewCaseStudy: "Read the case study",
    theProblem: "The problem",
    theSolution: "The solution",
    valueProposition: "Value proposition",
    keyFeatures: "Key features",
    technologies: "Technologies",
    responsibility: "My role",
    result: "Outcome",
    usedInProduction: "Used in production",
    ownProductUsedHere: "My own product, used on this project",
    viewProductLive: "View the live product",
    viewProjectLive: "View the live project",
    discover: (name) => `Explore ${name}`,
    needHelpWith: (service) => `Need help with ${service.toLowerCase()}?`,
    interestedIn: (product) => `Want to know more about ${product}?`,
    footerCompany: "Company",
    footerSocials: "Social",
    alt: {
      projectScreenshot: (title) => `Screenshot of the ${title} project`,
      projectVideo: (title) => `Demo video of the ${title} project`,
      serviceBanner: (title) => `Photograph representing the ${title} service`,
      productLogo: (name) => `${name} logo`,
      visualComposition: (title) => `Visual composition for ${title}`,
    },
  },

  legal: {
    privacyTitle: "Privacy Policy",
    privacyParagraphs: [
      `This page describes, in general terms, how ${profile.brand} handles the personal data collected through this website — in particular through the contact form.`,
      "Data submitted through the contact form (name, company, email, phone and message) is used solely to respond to your enquiry and is not shared with third parties.",
      `Data is kept only for as long as it takes to answer the enquiry. You can request access to, correction of, or deletion of your data by emailing ${profile.email}.`,
    ],
    cookiesTitle: "Cookies",
    cookiesParagraphs: [
      `The ${profile.brand} website does not currently use third-party cookies for analytics or advertising.`,
      "If analytics tools are introduced in future, this page will be updated and an appropriate consent mechanism will be shown, in line with the GDPR.",
    ],
  },

  meta: {
    home: {
      title: `${profile.brand} — Technology & Digital Solutions`,
      description:
        "I build custom digital solutions that help companies improve processes, connect systems, automate work and turn ideas into working products.",
    },
    services: {
      title: "Services",
      description:
        "Custom-built digital solutions: websites, APIs, automation, data and bespoke software.",
    },
    projects: {
      title: "Projects",
      description:
        "Selected projects: websites, software, APIs and automation, all custom built.",
    },
    products: {
      title: "Products",
      description: "My own digital products: TradeFlow and DomiOS.",
    },
    about: {
      title: "About",
      description: "Technology with a purpose — the brand, and the person behind it.",
    },
    contact: {
      title: "Contact",
      description: "Got a problem that needs solving? Get in touch.",
    },
    privacy: {
      title: "Privacy Policy",
      description: `How ${profile.brand} handles the personal data collected through this website.`,
    },
    cookies: {
      title: "Cookies",
      description: `Use of cookies on the ${profile.brand} website.`,
    },
  },
};
