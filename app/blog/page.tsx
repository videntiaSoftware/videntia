import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, BookOpen, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog de Tarot | Videntia Tarot - Guías, Significados y Consejos',
  description: 'Blog especializado en tarot con guías completas, significados de cartas, spreads de lectura y consejos de videncia. Aprende tarot gratis con expertos.',
  keywords: 'blog tarot, significados cartas tarot, guías tarot, spreads tarot, aprender tarot, videncia blog, cartas tarot significado, lectura tarot guía',
  openGraph: {
    title: 'Blog de Tarot | Videntia Tarot',
    description: 'Descubre el mundo del tarot con nuestras guías completas y consejos expertos.',
    url: 'https://videntia-tarot.vercel.app/blog',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Blog de Tarot - Videntia' }]
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/blog' }
}

const blogPosts = [
  {
    title: 'Guía Completa: Significados de los Arcanos Mayores',
    excerpt: 'Descubre el significado profundo de las 22 cartas de los Arcanos Mayores del tarot y cómo interpretarlas en tus lecturas.',
    category: 'Guías',
    date: '2024-01-15',
    readTime: '10 min',
    slug: 'significados-arcanos-mayores'
  },
  {
    title: 'Los Mejores Spreads de Tarot para Principiantes',
    excerpt: 'Aprende los spreads más efectivos para comenzar a leer el tarot, desde la tirada de 3 cartas hasta la Cruz Celta.',
    category: 'Spreads',
    date: '2024-01-12',
    readTime: '8 min',
    slug: 'spreads-tarot-principiantes'
  },
  {
    title: 'Cómo Interpretar las Cartas de Copas en el Amor',
    excerpt: 'Todo lo que necesitas saber sobre el palo de Copas y su relación con las emociones, el amor y las relaciones.',
    category: 'Amor',
    date: '2024-01-10',
    readTime: '6 min',
    slug: 'cartas-copas-amor'
  },
  {
    title: 'El Significado de La Muerte en el Tarot',
    excerpt: 'Desmitifica una de las cartas más temidas del tarot y descubre su verdadero significado de transformación.',
    category: 'Arcanos',
    date: '2024-01-08',
    readTime: '5 min',
    slug: 'significado-carta-muerte'
  },
  {
    title: 'Pentáculos y Abundancia: Guía del Palo de Oros',
    excerpt: 'Explora el mundo material a través de las cartas de Pentáculos y su relación con el dinero y la prosperidad.',
    category: 'Dinero',
    date: '2024-01-05',
    readTime: '7 min',
    slug: 'pentaculos-abundancia-dinero'
  },
  {
    title: 'Espadas en el Tarot: Mente y Conflictos',
    excerpt: 'Comprende el palo de Espadas, su conexión con los pensamientos, la comunicación y los desafíos mentales.',
    category: 'Guías',
    date: '2024-01-03',
    readTime: '9 min',
    slug: 'espadas-tarot-mente-conflictos'
  }
]

const categories = ['Todas', 'Guías', 'Spreads', 'Amor', 'Arcanos', 'Dinero', 'Trabajo', 'Salud']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog de <span className="text-purple-400">Tarot</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Sumérgete en el fascinante mundo del tarot con nuestras guías expertas, 
            significados de cartas y consejos para mejorar tus lecturas.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="bg-purple-800/50 text-purple-200 border-purple-600 hover:bg-purple-700/50 cursor-pointer">
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-purple-600 text-white">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <CardTitle className="text-white hover:text-purple-300 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex justify-between items-center text-sm text-purple-300">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 hover:text-purple-100 transition-colors">
                    <Eye className="h-4 w-4" />
                    Leer más
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Aprende Tarot con Nuestro Blog Especializado</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Nuestro blog de tarot está diseñado para acompañarte en tu viaje de aprendizaje, 
                desde los conceptos básicos hasta técnicas avanzadas de lectura e interpretación.
              </p>
              
              <h3 className="text-xl text-purple-400 font-semibold">¿Qué Encontrarás en Nuestro Blog?</h3>
              <ul className="space-y-2">
                <li>• <strong>Significados de Cartas:</strong> Interpretaciones detalladas de cada carta del tarot</li>
                <li>• <strong>Spreads y Tiradas:</strong> Diferentes métodos de lectura para distintas consultas</li>
                <li>• <strong>Guías por Temas:</strong> Contenido especializado en amor, trabajo, dinero y salud</li>
                <li>• <strong>Historia del Tarot:</strong> Orígenes y evolución de esta ancestral práctica</li>
                <li>• <strong>Consejos Prácticos:</strong> Tips para mejorar tus habilidades de lectura</li>
                <li>• <strong>Simbolismo:</strong> Comprende los símbolos ocultos en cada carta</li>
              </ul>

              <h3 className="text-xl text-purple-400 font-semibold">Para Todos los Niveles:</h3>
              <p>
                Ya seas un completo principiante o un lector experimentado, nuestros artículos están 
                diseñados para proporcionarte valor y nuevas perspectivas. Cada artículo incluye 
                ejemplos prácticos y consejos aplicables inmediatamente en tus lecturas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
