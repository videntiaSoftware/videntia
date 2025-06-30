import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntia.vercel.app'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/protected/',
          '/profile/',
          '/_next/',
          '/dashboard/',
          '*.json',
          '/seo/*', // Páginas SEO no accesibles directamente para usuarios
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/premium',
          '/contacto',
          '/politica-privacidad',
          '/terminos-condiciones',
          '/seo/', // Permitir a Google indexar páginas SEO
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/protected/',
          '/profile/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/premium',
          '/contacto',
          '/seo/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/protected/',
          '/profile/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
