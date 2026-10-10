import { profile } from "./entities";
import type { Content } from "./types";

export const pt: Content = {
  profile: {
    tagline: "Tecnologia e Soluções Digitais",
    founderRole: "Fundador & Software Developer",
    availability: "Disponível para novos projetos a partir de março de 2026",
    location: "Portugal — a trabalhar com empresas em todo o país",
  },

  nav: [
    { key: "services", label: "Serviços" },
    { key: "projects", label: "Projetos" },
    { key: "products", label: "Produtos" },
    { key: "about", label: "Sobre" },
    { key: "contact", label: "Contacto" },
  ],

  ctaLabel: "Falar comigo",

  hero: {
    headline: "Tecnologia para resolver problemas reais.",
    subhead:
      "Websites, software, APIs, integrações e automação desenvolvidos à medida das necessidades do seu negócio.",
    ctaPrimary: "Falar sobre um projeto",
    ctaSecondary: "Ver projetos",
  },

  problems: {
    headline: "Não começo pela tecnologia. Começo pelo problema.",
    items: [
      {
        problem: "Passamos demasiado tempo a fazer isto manualmente.",
        solution: "Automatização de processos.",
      },
      {
        problem: "Os nossos sistemas não comunicam entre si.",
        solution: "APIs e integrações.",
      },
      {
        problem: "Precisamos de um sistema adaptado ao nosso negócio.",
        solution: "Software à medida.",
      },
      {
        problem: "Temos demasiada informação espalhada.",
        solution: "Bases de dados e centralização.",
      },
      {
        problem: "Precisamos de melhorar a nossa presença online.",
        solution: "Website ou plataforma web.",
      },
    ],
  },

  services: {
    eyebrow: "No que posso ajudar",
    headline: "Construo soluções digitais à medida.",
    intro:
      "Cada negócio tem necessidades diferentes. Desenvolvo soluções tecnológicas adaptadas aos processos, sistemas e objetivos de cada projeto.",
    cta: "Conhecer os serviços",
    items: {
      websites: {
        title: "Websites & Aplicações",
        description: "Websites institucionais, plataformas web e aplicações personalizadas.",
        detail:
          "Desde websites institucionais a plataformas web completas, desenho e construo a partir das necessidades reais do negócio — não de um template genérico. O resultado é um produto rápido, fácil de manter e preparado para crescer.",
        includes: [
          "Desenho de interface e experiência de utilizador",
          "Desenvolvimento frontend e backend",
          "Otimização de performance e SEO técnico",
          "Integração com sistemas e ferramentas já existentes",
        ],
        benefits: [
          "Design moderno e focado na experiência do utilizador",
          "Otimização de SEO técnico desde o início",
          "Totalmente responsivo, em qualquer dispositivo",
          "Preparado para crescer com o negócio",
        ],
      },
      apis: {
        title: "APIs & Integrações",
        description: "APIs e ligações entre diferentes sistemas, serviços e plataformas.",
        detail:
          "Quando os sistemas de uma empresa não comunicam entre si, o trabalho duplica-se e os dados perdem-se. Construo APIs próprias e integrações com serviços de terceiros para que a informação flua num só sentido, sem intervenção manual.",
        includes: [
          "Desenho e documentação de APIs REST",
          "Integração com serviços de pagamento, faturação e CRM",
          "Sincronização de dados entre sistemas",
          "Autenticação e controlo de acessos",
        ],
        benefits: [
          "Dados sempre sincronizados entre sistemas",
          "Menos trabalho manual duplicado",
          "Fluxos de informação mais claros",
          "Fácil de estender a novos sistemas",
        ],
      },
      automation: {
        title: "Automação",
        description: "Automatização de tarefas e processos repetitivos.",
        detail:
          "Tarefas repetitivas consomem tempo que podia ser investido no que realmente importa. Identifico os processos manuais do dia a dia e construo automações fiáveis à sua volta, com alertas e registos claros do que foi feito.",
        includes: [
          "Levantamento dos processos manuais existentes",
          "Automação de tarefas repetitivas e fluxos de aprovação",
          "Alertas e notificações automáticas",
          "Registo e auditoria das execuções",
        ],
        benefits: [
          "Menos tarefas repetitivas para a equipa",
          "Respostas mais rápidas a clientes e parceiros",
          "Registo claro do que foi automatizado",
          "Menos espaço para erro humano",
        ],
      },
      data: {
        title: "Dados & Bases de Dados",
        description:
          "Estruturação, integração e desenvolvimento de soluções orientadas a dados.",
        detail:
          "Dados espalhados por várias folhas de cálculo e sistemas tornam qualquer decisão mais lenta. Estruturo bases de dados robustas e centralizo a informação, para que esteja sempre correta e acessível a quem precisa dela.",
        includes: [
          "Modelação de bases de dados",
          "Migração e limpeza de dados existentes",
          "Relatórios e dashboards à medida",
          "Políticas de backup e segurança dos dados",
        ],
        benefits: [
          "Informação centralizada num só lugar",
          "Relatórios sempre atualizados",
          "Decisões mais rápidas e informadas",
          "Dados seguros e bem estruturados",
        ],
      },
      "custom-software": {
        title: "Software à Medida",
        description:
          "Sistemas desenvolvidos especificamente para as necessidades do negócio.",
        detail:
          "Nem todos os problemas se resolvem com uma ferramenta pronta a usar. Desenho e construo sistemas à medida da forma como o negócio realmente funciona, sem forçar processos a adaptarem-se a um software genérico.",
        includes: [
          "Levantamento de requisitos junto da equipa",
          "Arquitetura pensada para o volume real de uso",
          "Desenvolvimento incremental, com entregas visíveis",
          "Documentação técnica do sistema entregue",
        ],
        benefits: [
          "Processos que se adaptam ao negócio, não o contrário",
          "Arquitetura pensada para o volume real de uso",
          "Entregas visíveis ao longo do projeto",
          "Documentação clara do sistema entregue",
        ],
      },
      maintenance: {
        title: "Manutenção & Evolução",
        description: "Correção, melhoria e evolução de aplicações existentes.",
        detail:
          "Um sistema em produção precisa de acompanhamento contínuo: correção de erros, pequenas melhorias e adaptação a novas necessidades. Funciono como o parceiro técnico de longo prazo desse sistema, não só como quem o construiu.",
        includes: [
          "Correção de erros e monitorização",
          "Pequenas melhorias e pedidos pontuais",
          "Atualização de dependências e segurança",
          "Contacto técnico direto e de confiança",
        ],
        benefits: [
          "Sistema sempre atualizado e seguro",
          "Resposta rápida a pedidos pontuais",
          "Um contacto técnico direto e de confiança",
          "Evolução contínua, sem recomeçar do zero",
        ],
      },
      consulting: {
        title: "Consultoria Tecnológica",
        description:
          "Identificação de estratégia e apoio na escolha da tecnologia certa para cada projeto.",
        detail:
          "Antes de escolher uma tecnologia, é preciso perceber bem o problema. Ajudo a identificar a abordagem mais adequada ao negócio — arquitetura, stack, prioridades — e acompanho a transição técnica, sem impor soluções desproporcionadas ao problema real.",
        includes: [
          "Levantamento de necessidades e prioridades técnicas",
          "Recomendação de arquitetura e stack tecnológica",
          "Revisão de código e auditorias técnicas",
          "Acompanhamento da equipa durante a transição digital",
        ],
        benefits: [
          "Decisões técnicas fundamentadas, não modismos",
          "Menos risco em investimentos tecnológicos",
          "Um parceiro técnico independente e imparcial",
          "Acompanhamento próximo durante todo o processo",
        ],
      },
    },
  },

  process: {
    eyebrow: "Como trabalho",
    headline: "Da ideia à solução.",
    steps: [
      { number: "01", title: "Descobrir", description: "Compreender o negócio, problema e objetivos." },
      { number: "02", title: "Planear", description: "Definir requisitos, arquitetura e abordagem técnica." },
      { number: "03", title: "Construir", description: "Desenvolver e integrar a solução." },
      { number: "04", title: "Testar", description: "Validar funcionalidades, desempenho e comportamento." },
      { number: "05", title: "Entregar", description: "Colocar a solução em produção." },
      { number: "06", title: "Evoluir", description: "Manutenção, melhorias e novas funcionalidades." },
    ],
  },

  projects: {
    eyebrow: "Trabalho selecionado",
    headline: "Projetos selecionados",
    cta: "Ver todos os projetos",
    items: {
      "real-stiles": {
        category: "Website · E-commerce",
        summary:
          "Loja online moçambicana multi-categoria de moda, eletrónica e casa, com envio para todo o país.",
        description:
          "Plataforma de e-commerce em Moçambique, com catálogo por categorias e pagamento local (cartão Visa, M-Pesa e e-Mola).",
        clientIntro:
          "A Real Stiles é uma loja online moçambicana com catálogo em várias categorias — moda, eletrónica, beleza e casa — focada em chegar a clientes em todo o país.",
        challengeHeading: "Uma loja, todas as categorias",
        problem:
          "A marca precisava de uma loja online capaz de apresentar um catálogo muito variado de forma organizada, com métodos de pagamento adaptados ao mercado moçambicano e um canal de suporte direto para os clientes.",
        solution:
          "Foi desenvolvida uma loja online em Next.js com Firebase, com navegação por categorias, carrossel de promoções em destaque, filtros e ordenação de produtos, e pagamento com cartão Visa, M-Pesa e e-Mola. O catálogo é importado de fornecedores internacionais (Temu, Shein, AliExpress, Zara, H&M, AboutYou) através do TradeFlow, motor próprio de importação de produtos, e o suporte ao cliente é feito diretamente via WhatsApp.",
        responsibilities: [
          "Desenvolvimento frontend da loja em Next.js",
          "Base de dados e autenticação em Firebase",
          "Estrutura de navegação e catálogo por categorias",
          "Importação de catálogo de fornecedores via TradeFlow",
          "Integração de pagamentos (cartão Visa, M-Pesa, e-Mola)",
          "Integração de suporte via WhatsApp",
        ],
        result:
          "Loja em produção, com catálogo ativo em múltiplas categorias e pagamento local integrado.",
      },
    },
  },

  products: {
    eyebrow: "Produtos próprios",
    headline: "Produtos que construí.",
    intro:
      "Além de desenvolver soluções para clientes, crio os meus próprios produtos digitais para resolver problemas específicos.",
    cta: "Ver todos os produtos",
    items: {
      tradeflow: {
        category: "Motor de importação de produtos",
        headline: "Extração automática de produtos de marketplaces, via API.",
        problem:
          "Importar manualmente produtos de marketplaces para uma loja própria — título, preço, imagens, variantes — é lento e repetitivo, e cada fornecedor estrutura a sua página de forma diferente.",
        valueProposition:
          "O TradeFlow recebe o URL de um produto e devolve os dados já normalizados — título, preço, imagens e variantes — extraídos diretamente da página de origem. Não é um ERP: apenas extrai e devolve dados, não guarda nem gere produtos depois disso.",
        features: [
          "Extração de produtos via API, com fila de processamento própria",
          "Suporte direto à Shein, com Temu, AliExpress e Zara em desenvolvimento",
          "Ligação a um serviço satélite para marcas adicionais (Zara, H&M, Zalando, Amazon, Pull&Bear, Bershka, AboutYou, AliExpress)",
          "Licenciamento por conta/loja, com créditos por operação (importação, sincronização de preço/stock, tradução)",
        ],
      },
      domios: {
        category: "Gestão doméstica de compras e receitas",
        headline: "Preços, despensa e receitas, na mesma casa digital.",
        problem:
          "As famílias gerem preços, promoções, despensa e refeições em fontes completamente separadas — sem que nenhuma ferramenta saiba o que já existe em casa ou o que costuma ser comprado.",
        valueProposition:
          "O DomiOS junta catálogo de produtos, despensa, receitas, listas de compras e preços de várias cadeias portuguesas (Continente, Pingo Doce, Lidl, Auchan) numa só plataforma, para ajudar a decidir o que comprar, onde comprar e o que cozinhar com o que já existe em casa.",
        features: [
          "Despensa e catálogo de produtos organizados por casa",
          "Receitas sugeridas a partir do que já está na despensa",
          "Listas de compras integradas com o catálogo",
          "Preços, promoções e histórico de várias cadeias portuguesas",
        ],
      },
    },
  },

  about: {
    brandEyebrow: "Sobre a marca",
    brandHeadline: "Tecnologia com propósito.",
    brandParagraphs: [
      `A ${profile.brand} nasceu com o objetivo de criar soluções tecnológicas capazes de resolver problemas reais e ajudar empresas a evoluir digitalmente.`,
      "Desenvolvo websites, aplicações, APIs, integrações, automações e software à medida, procurando compreender primeiro o problema e só depois definir a tecnologia adequada.",
      "Paralelamente ao desenvolvimento de soluções para clientes, crio e exploro produtos digitais próprios.",
    ],
    founderEyebrow: "Fundador",
    founderParagraphs: [
      `Sou o ${profile.founderName}, fundador da ${profile.brand}. Desenvolvo software, com especialização em backend e em soluções digitais à medida.`,
      "Tenho experiência no desenvolvimento de APIs, aplicações web, integrações entre sistemas, bases de dados e automação de processos.",
      "O meu trabalho passa por transformar necessidades de negócio em soluções tecnológicas funcionais, procurando equilibrar simplicidade, desempenho, manutenção e capacidade de evolução.",
      `A ${profile.brand} nasce como uma extensão desse percurso, com o objetivo de desenvolver soluções para empresas e criar produtos tecnológicos próprios.`,
    ],
    timelineEyebrow: "Percurso",
    timelineHeadline: "Experiência profissional",
    timeline: [
      {
        period: "2022 — Presente",
        role: "Backend Developer",
        org: "InovaDigital",
        description:
          "Desenvolvimento de APIs, sistemas empresariais, bases de dados, integrações e automação.",
      },
      {
        period: "2025 — Presente",
        role: "Fundador & Software Developer",
        org: profile.brand,
        description:
          "Desenvolvimento de soluções digitais, serviços tecnológicos e produtos próprios.",
      },
    ],
    stackEyebrow: "Stack",
    stackHeadline: "Tecnologias",
    technologies: [
      { category: "Backend", items: ["C#", ".NET", "Node.js", "Python", "Spring Boot"] },
      { category: "Bases de Dados", items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"] },
      { category: "Web", items: ["JavaScript", "Vue", "React", "Nuxt"] },
      { category: "Infraestrutura", items: ["Docker", "IIS", "Serviços Windows"] },
      { category: "Integração", items: ["REST APIs", "Webhooks", "n8n", "Primavera"] },
    ],
  },

  contact: {
    headline: "Tem um problema que precisa de uma solução?",
    subhead:
      "Conte-me o que pretende desenvolver, melhorar ou automatizar. Analiso consigo a melhor abordagem.",
    projectTypes: [
      "Website",
      "Aplicação Web",
      "API",
      "Integração",
      "Automação",
      "Base de Dados",
      "Software à medida",
      "Outro",
    ],
    form: {
      name: "Nome",
      company: "Empresa",
      email: "Email",
      phone: "Telefone (opcional)",
      projectType: "Tipo de projeto",
      message: "Mensagem",
      messagePlaceholder: "Conte-me o que pretende desenvolver, melhorar ou automatizar.",
      submit: "Enviar pedido",
      mailSubject: "Novo pedido de projeto",
      mailLabels: {
        name: "Nome",
        company: "Empresa",
        email: "Email",
        phone: "Telefone",
        projectType: "Tipo de projeto",
      },
    },
  },

  ctaFinal: {
    headline: "Tem um problema que precisa de uma solução?",
    subhead:
      "Conte-me o que pretende desenvolver, melhorar ou automatizar — respondo pessoalmente a todos os pedidos.",
    cta: "Falar comigo",
  },

  ui: {
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    switchLanguage: "Mudar idioma",
    backToServices: "Todos os serviços",
    backToProjects: "Todos os projetos",
    backToProducts: "Todos os produtos",
    whatsIncluded: "O que inclui",
    advantages: "Vantagens",
    caseStudy: "Caso de estudo",
    viewCaseStudy: "Ver estudo de caso",
    theProblem: "O problema",
    theSolution: "A solução",
    valueProposition: "Proposta de valor",
    keyFeatures: "Funcionalidades principais",
    technologies: "Tecnologias",
    responsibility: "Responsabilidade",
    result: "Resultado",
    usedInProduction: "Usado em produção",
    ownProductUsedHere: "Produto próprio usado neste projeto",
    viewProductLive: "Ver produto ao vivo",
    viewProjectLive: "Ver projeto ao vivo",
    discover: (name) => `Conhecer ${name}`,
    needHelpWith: (service) => `Precisa de ajuda com ${service.toLowerCase()}?`,
    interestedIn: (product) => `Interessado em saber mais sobre ${product}?`,
    footerCompany: "Empresa",
    footerSocials: "Redes Sociais",
    alt: {
      projectScreenshot: (title) => `Captura de ecrã do projeto ${title}`,
      projectVideo: (title) => `Vídeo de demonstração do projeto ${title}`,
      serviceBanner: (title) => `Fotografia representativa do serviço ${title}`,
      productLogo: (name) => `Logótipo de ${name}`,
      visualComposition: (title) => `Composição visual de ${title}`,
    },
  },

  legal: {
    privacyTitle: "Política de Privacidade",
    privacyParagraphs: [
      `Esta página descreve, em termos gerais, como a ${profile.brand} trata os dados pessoais recolhidos através deste website — nomeadamente através do formulário de contacto.`,
      "Os dados submetidos através do formulário de contacto (nome, empresa, email, telefone e mensagem) são utilizados exclusivamente para responder ao pedido efetuado e não são partilhados com terceiros.",
      `Os dados são conservados apenas durante o tempo necessário para dar resposta ao pedido. Pode solicitar o acesso, a retificação ou o apagamento dos seus dados através do email ${profile.email}.`,
    ],
    cookiesTitle: "Cookies",
    cookiesParagraphs: [
      `Atualmente, o website da ${profile.brand} não utiliza cookies de terceiros para efeitos de análise ou publicidade.`,
      "Caso venham a ser introduzidas ferramentas de analytics no futuro, esta página será atualizada e será apresentado um mecanismo de consentimento adequado, em conformidade com o RGPD.",
    ],
  },

  meta: {
    home: {
      title: `${profile.brand} — Tecnologia e Soluções Digitais`,
      description:
        "Crio soluções digitais à medida para ajudar empresas a melhorar processos, conectar sistemas, automatizar tarefas e transformar ideias em produtos funcionais.",
    },
    services: {
      title: "Serviços",
      description:
        "Soluções digitais construídas à medida: websites, APIs, automação, dados e software à medida.",
    },
    projects: {
      title: "Projetos",
      description:
        "Projetos selecionados: websites, software, APIs e automação desenvolvidos à medida.",
    },
    products: {
      title: "Produtos",
      description: "Produtos digitais próprios: TradeFlow e DomiOS.",
    },
    about: {
      title: "Sobre",
      description: "Tecnologia com propósito — conheça a marca e quem está por trás dela.",
    },
    contact: {
      title: "Contacto",
      description: "Tem um problema que precisa de uma solução? Fale comigo.",
    },
    privacy: {
      title: "Política de Privacidade",
      description: `Como a ${profile.brand} trata os dados pessoais recolhidos através deste website.`,
    },
    cookies: {
      title: "Cookies",
      description: `Utilização de cookies no website da ${profile.brand}.`,
    },
  },
};
