// Structured Data Schema for Videntia Tarot
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Videntia Tarot",
  "description": "Plataforma de lecturas de tarot online con análisis espirituales profundos y conexión con la intuición interior",
  "url": process.env.NEXT_PUBLIC_BASE_URL || "https://videntiatarot.com",
  "logo": `${process.env.NEXT_PUBLIC_BASE_URL || "https://videntiatarot.com"}/opengraph-image.png`,
  "sameAs": [
    // Agregar redes sociales cuando estén disponibles
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Argentina"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Lecturas de Tarot Online",
  "description": "Lecturas de tarot personalizadas con interpretaciones profundas y guía espiritual",
  "provider": {
    "@type": "Organization",
    "name": "Videntia Tarot"
  },
  "areaServed": {
    "@type": "Country", 
    "name": "Argentina"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tipos de Lecturas de Tarot",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tirada de 3 Cartas",
          "description": "Lectura de pasado, presente y futuro"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Cruz Celta",
          "description": "Análisis profundo con 10 cartas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Lectura de Amor",
          "description": "Análisis especializado en relaciones"
        }
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Videntia Tarot",
  "alternateName": "Videntia",
  "url": process.env.NEXT_PUBLIC_BASE_URL || "https://videntiatarot.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "https://videntiatarot.com"}?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo funcionan las lecturas de tarot online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestras lecturas de tarot online utilizan cartas digitales auténticas. Simplemente haz tu pregunta, selecciona las cartas y recibe una interpretación personalizada basada en la tradición del tarot."
      }
    },
    {
      "@type": "Question", 
      "name": "¿Las lecturas de tarot online son precisas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La precisión del tarot depende de la conexión con tu intuición y la interpretación adecuada. Nuestro sistema está diseñado para proporcionarte reflexiones significativas y guía espiritual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipos de lecturas de tarot ofrecen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ofrecemos varios tipos de lecturas: Tirada de 3 cartas (pasado, presente, futuro), Cruz Celta (análisis profundo), lecturas de amor, trabajo, dinero y crecimiento espiritual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es gratuito usar Videntia Tarot?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Ofrecemos lecturas gratuitas limitadas diariamente. Para acceso ilimitado y funciones premium, tenemos planes de suscripción disponibles."
      }
    }
  ]
};

// Schema específico para cada tipo de lectura
export const tarotReadingSchema = (readingType: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": `Lectura de Tarot ${readingType}`,
  "description": `Consulta de tarot especializada en ${readingType.toLowerCase()} con interpretaciones personalizadas`,
  "brand": {
    "@type": "Brand",
    "name": "Videntia Tarot"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "ARS",
    "availability": "https://schema.org/InStock",
    "validFrom": new Date().toISOString()
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
  }
});

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Generate LocalBusiness schema for better local SEO
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${process.env.NEXT_PUBLIC_BASE_URL || "https://videntia.vercel.app"}#localbusiness`,
  "name": "Videntia Tarot",
  "description": "Consultas de tarot online profesionales con análisis espirituales profundos",
  "url": process.env.NEXT_PUBLIC_BASE_URL || "https://videntia.vercel.app",
  "telephone": "+54-11-XXXX-XXXX", // Add real number when available
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR",
    "addressRegion": "Buenos Aires",
    "addressLocality": "Ciudad Autónoma de Buenos Aires"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -34.6037,
    "longitude": -58.3816
  },
  "openingHours": "Mo-Su 00:00-23:59", // 24/7 online service
  "priceRange": "Gratis - $$$",
  "paymentAccepted": "Credit Card, PayPal, Cryptocurrency",
  "currenciesAccepted": "ARS, USD",
  "image": `${process.env.NEXT_PUBLIC_BASE_URL || "https://videntia.vercel.app"}/opengraph-image.png`,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150", // Update with real data
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Generate ProfessionalService schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Videntia - Servicios de Tarot Profesional",
  "description": "Lecturas de tarot profesionales con análisis profundos de amor, trabajo, dinero y crecimiento espiritual",
  "url": process.env.NEXT_PUBLIC_BASE_URL || "https://videntia.vercel.app",
  "serviceType": "Spiritual Guidance",
  "provider": {
    "@type": "Organization",
    "name": "Videntia Tarot"
  },
  "areaServed": ["Argentina", "América Latina", "España"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Tarot",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Consulta de Amor",
        "description": "Lecturas especializadas en relaciones, alma gemela y vida sentimental",
        "category": "Amor y Relaciones"
      },
      {
        "@type": "Offer", 
        "name": "Consulta Laboral",
        "description": "Orientación profesional, oportunidades de trabajo y desarrollo de carrera",
        "category": "Trabajo y Carrera"
      },
      {
        "@type": "Offer",
        "name": "Consulta Financiera", 
        "description": "Guía sobre dinero, inversiones y abundancia económica",
        "category": "Dinero y Finanzas"
      }
    ]
  }
};

// Generate Review schema for testimonials
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": "Service",
      "name": "Lecturas de Tarot Videntia"
    }
  }));
}

// Generate FAQ schema for common questions
export function generateFAQSchema(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate HowTo schema for tarot reading guides
export function generateHowToSchema(data: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    "description": data.description,
    "totalTime": data.totalTime,
    "step": data.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image
    }))
  };
}
