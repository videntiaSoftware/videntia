import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Videntia - Tu Guía Espiritual de Tarot',
    short_name: 'Videntia',
    description: 'Lecturas de tarot gratis online. Descubre tu destino con análisis espirituales profundos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['entertainment', 'lifestyle', 'games'],
    lang: 'es',
    orientation: 'portrait'
  }
}
