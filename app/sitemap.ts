import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntiatarot.com'
  const now = new Date()

  // Rutas estáticas principales
  const staticRoutes = [
    '',
    'premium',
    'politica-privacidad',
    'terminos-condiciones',
    'contacto',
    'faq',
    'lecturas/amor',
    'lecturas/trabajo',
    'lecturas/dinero',
    'lecturas/salud',
    'lecturas/cruz-celta',
    'lecturas/si-o-no',
    'blog',
    'cartas/arcanos-mayores',
    'cartas/arcanos-menores',
    'cartas/espadas',
    'cartas/bastos',
    'cartas/oros',
    'cartas/pentaculos',
    'consulta-tarot-gratis',
    'numerologia-gratis',
    'tarot-del-si-o-no',
    'tarot-gitano-gratis',
    'tirada-3-cartas-gratis',
    'tirada-cartas-amor-gratis',
    'videncia-online-gratis',
  ]

  // Rutas de artículos del blog (extraídas del grid de blog/page.tsx)
  const blogSlugs = [
    'significado-completo-arcanos-mayores',
    'como-hacer-lectura-tarot-principiantes',
    'spreads-tarot-mas-populares',
    'tarot-amor-interpretar-relaciones',
    'historia-tarot-origenes',
    'tarot-marsella-vs-rider-waite',
    'cuatro-palos-tarot-elementos',
    'tarot-astrologia-correspondencias',
    'errores-comunes-leer-tarot',
    'desarrollar-intuicion-tarot',
    'simbolismo-tarot-colores-numeros',
    'tarot-trabajo-carrera-profesional',
    'rituales-preparacion-lecturas-tarot',
    'timing-tarot-predicciones',
    'cartas-corte-interpretacion',
    'tarot-evolutivo-viaje-alma',
    'como-hacer-preguntas-efectivas-tarot',
    'tarot-terapeutico-sanacion',
    'ases-tarot-nuevos-comienzos',
    'etica-lecturas-tarot-responsabilidad',
    'elegir-baraja-tarot-principiantes',
    'tarot-psicologia-inconsciente',
    'interpretar-combinaciones-cartas-tarot',
    'tarot-toma-decisiones',
    'tarot-meditacion-intuicion',
  ]

  // Rutas de arcanos mayores (carpetas en /cartas/arcanos-mayores/)
  const arcanosMayores = [
    'el-carro','el-colgado','el-diablo','el-emperador','el-ermitano','el-hierofante','el-juicio','el-loco','el-mago','el-mundo','el-sol','la-emperatriz','la-estrella','la-fuerza','la-justicia','la-luna','la-muerte','la-rueda-de-la-fortuna','la-sacerdotisa','la-templanza','la-torre','los-enamorados'
  ]

  // Sitemap array
  const sitemapArr = [
    ...staticRoutes.map(route => ({
      url: `${baseUrl}/${route}`.replace(/\/\/$/, '/'),
      lastModified: now,
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1 : 0.7,
    })),
    ...blogSlugs.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...arcanosMayores.map(slug => ({
      url: `${baseUrl}/cartas/arcanos-mayores/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ]

  return sitemapArr as MetadataRoute.Sitemap;
}
