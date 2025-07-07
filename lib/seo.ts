// SEO and Performance Optimization Utilities
export const seoConfig = {
  defaultTitle: "Videntia - Tu Guía Espiritual de Tarot",
  titleTemplate: "%s | Videntia Tarot",
  defaultDescription: "Descubre tu destino con lecturas de tarot gratis online. Consultas personalizadas de amor, trabajo, dinero y crecimiento espiritual disponibles 24/7.",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://videntiatarot.com",
  defaultKeywords: [
    "tarot gratis", "lecturas tarot online", "cartas tarot", "consulta tarot",
    "tarot amor", "tarot trabajo", "tarot dinero", "videncia online",
    "tirada 3 cartas", "cruz celta", "arcanos mayores", "arcanos menores"
  ],
  author: "Videntia",
  twitterHandle: "@VidentiaTarot", // Cuando esté disponible
  facebookAppId: "", // Cuando esté disponible
};

// Generate page-specific metadata
export function generatePageMetadata(page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}) {
  const title = page.title 
    ? `${page.title} | Videntia Tarot`
    : seoConfig.defaultTitle;
    
  const description = page.description || seoConfig.defaultDescription;
  
  const keywords = page.keywords 
    ? [...seoConfig.defaultKeywords, ...page.keywords]
    : seoConfig.defaultKeywords;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url: page.canonicalUrl || seoConfig.siteUrl,
      siteName: "Videntia Tarot",
      images: [
        {
          url: page.image || `${seoConfig.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.image || `${seoConfig.siteUrl}/twitter-image.png`],
    },
    robots: {
      index: !page.noIndex,
      follow: !page.noIndex,
      googleBot: {
        index: !page.noIndex,
        follow: !page.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: page.canonicalUrl || seoConfig.siteUrl,
    },
  };
}

// Critical SEO Keywords by Category
export const seoKeywords = {
  main: [
    "tarot gratis online",
    "lecturas tarot",
    "consulta tarot gratis",
    "cartas tarot online",
    "videncia online",
    "tarot argentino"
  ],
  love: [
    "tarot amor gratis",
    "lecturas tarot pareja",
    "cartas amor",
    "consulta sentimental",
    "tarot relaciones",
    "alma gemela tarot"
  ],
  work: [
    "tarot trabajo",
    "carrera profesional tarot",
    "consulta laboral",
    "oportunidades trabajo",
    "tarot profesional",
    "futuro laboral"
  ],
  money: [
    "tarot dinero",
    "abundancia tarot",
    "consulta financiera",
    "prosperidad tarot",
    "tarot económico",
    "riqueza tarot"
  ],
  health: [
    "tarot salud",
    "bienestar tarot",
    "consulta holística",
    "equilibrio tarot",
    "sanación espiritual",
    "salud espiritual"
  ],
  spreads: [
    "tirada 3 cartas",
    "cruz celta tarot",
    "spread amor",
    "tirada trabajo",
    "lectura si no",
    "tarot avanzado"
  ],
  cards: [
    "arcanos mayores",
    "arcanos menores",
    "significado cartas tarot",
    "interpretar tarot",
    "simbología tarot",
    "cartas tarot marsella"
  ]
};

// Structured Data Templates
export const structuredDataTemplates = {
  breadcrumb: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),

  article: (article: {
    title: string;
    description: string;
    author: string;
    publishDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate,
    "image": article.image || `${seoConfig.siteUrl}/opengraph-image.png`,
    "url": article.url,
    "publisher": {
      "@type": "Organization",
      "name": "Videntia Tarot",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/opengraph-image.png`
      }
    }
  }),

  howTo: (guide: {
    name: string;
    description: string;
    steps: Array<{name: string, text: string}>;
    image?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.name,
    "description": guide.description,
    "image": guide.image || `${seoConfig.siteUrl}/opengraph-image.png`,
    "step": guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  }),

  service: (service: {
    name: string;
    description: string;
    provider: string;
    areaServed?: string;
    url: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider
    },
    "areaServed": service.areaServed || "Argentina",
    "url": `${seoConfig.siteUrl}${service.url}`
  }),

  faq: (faqData: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })
};

// Performance optimization constants
export const performanceConfig = {
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  imageDeviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageDomains: [
    'jhtjdapbeiybxpqvyqqs.supabase.co',
    'images.unsplash.com',
    'via.placeholder.com'
  ],
};
