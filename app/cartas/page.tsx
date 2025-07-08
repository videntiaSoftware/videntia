import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Crown, Heart, Sword, Coins, Eye, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cartas del Tarot | Videntia Tarot - Significados y Simbolismo',
  description: 'Diccionario completo de cartas del tarot con significados, simbolismo e interpretaciones. Arcanos Mayores y Menores explicados en detalle.',
  keywords: 'cartas tarot, significados tarot, arcanos mayores, arcanos menores, simbolismo tarot, interpretación cartas, diccionario tarot, cartas tarot significado',
  openGraph: {
    title: 'Cartas del Tarot | Videntia Tarot',
    description: 'Explora el significado completo de todas las cartas del tarot con nuestro diccionario especializado.',
    url: 'https://videntia-tarot.vercel.app/cartas',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Cartas del Tarot - Videntia' }]
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/cartas' }
}

const arcanosCategories = [
  {
    title: 'Arcanos Mayores',
    description: 'Las 22 cartas principales que representan las lecciones más importantes de la vida',
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-600 hover:bg-yellow-700',
    count: '22 cartas',
    href: '/cartas/arcanos-mayores'
  },
  {
    title: 'Espadas',
    description: 'Mente, comunicación, conflictos y desafíos',
    icon: Sword,
    color: 'text-gray-400',
    bgColor: 'bg-gray-600 hover:bg-gray-700',
    count: '14 cartas',
    href: '/cartas/espadas'
  },
  {
    title: 'Pentáculos',
    description: 'Dinero, trabajo, recursos materiales y abundancia',
    icon: Coins,
    color: 'text-green-400',
    bgColor: 'bg-green-600 hover:bg-green-700',
    count: '14 cartas',
    href: '/cartas/pentaculos'
  },
  {
    title: 'Bastos',
    description: 'Creatividad, pasión, energía y proyectos',
    icon: Star,
    color: 'text-orange-400',
    bgColor: 'bg-orange-600 hover:bg-orange-700',
    count: '14 cartas',
    href: '/cartas/bastos'
  }
]

const featuredCards = [
  { name: 'El Loco', category: 'Arcanos Mayores', meaning: 'Nuevos comienzos, espontaneidad, inocencia' },
  { name: 'La Muerte', category: 'Arcanos Mayores', meaning: 'Transformación, finales, renacimiento' },
  { name: 'El Sol', category: 'Arcanos Mayores', meaning: 'Éxito, vitalidad, optimismo' },
  { name: 'Reina de Copas', category: 'Copas', meaning: 'Intuición, compasión, cuidado emocional' },
  { name: 'Diez de Pentáculos', category: 'Pentáculos', meaning: 'Riqueza, herencia, estabilidad familiar' },
  { name: 'As de Espadas', category: 'Espadas', meaning: 'Claridad mental, nueva perspectiva, verdad' }
]

export default function CartasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cartas del <span className="text-purple-400">Tarot</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Explora el significado completo de las 78 cartas del tarot. 
            Desde los misteriosos Arcanos Mayores hasta los palos de los Arcanos Menores.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {arcanosCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-colors">
                <CardHeader>
                  <CardTitle className={`${category.color} flex items-center gap-2 text-xl`}>
                    <Icon className="h-6 w-6" />
                    {category.title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit bg-purple-700/50 text-purple-200 border-purple-500">
                    {category.count}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200 mb-4">
                    {category.description}
                  </CardDescription>
                  <Link href={category.href}>
                    <Button className={`w-full ${category.bgColor} text-white`}>
                      Explorar Cartas
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Cartas Destacadas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCards.map((card, index) => (
              <Card key={index} className="bg-purple-800/30 border-purple-600">
                <CardHeader>
                  <CardTitle className="text-purple-300">{card.name}</CardTitle>
                  <Badge variant="outline" className="w-fit bg-purple-700/50 text-purple-200 border-purple-500">
                    {card.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200">
                    {card.meaning}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Comprende el Simbolismo del Tarot</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                El tarot es un sistema simbólico complejo que consta de 78 cartas divididas en dos grupos principales: 
                los 22 Arcanos Mayores y los 56 Arcanos Menores. Cada carta tiene múltiples capas de significado 
                que pueden variar según el contexto de la lectura.
              </p>
              
              <h3 className="text-xl text-purple-400 font-semibold">Estructura del Tarot:</h3>
              <ul className="space-y-2">
                <li>• <strong>Arcanos Mayores (22 cartas):</strong> Representan las grandes lecciones de vida y experiencias espirituales</li>
                <li>• <strong>Copas (14 cartas):</strong> Emociones, amor, relaciones y espiritualidad</li>
                <li>• <strong>Espadas (14 cartas):</strong> Mente, comunicación, conflictos y desafíos</li>
                <li>• <strong>Pentáculos (14 cartas):</strong> Mundo material, dinero, trabajo y recursos</li>
                <li>• <strong>Bastos (14 cartas):</strong> Creatividad, pasión, energía y emprendimientos</li>
              </ul>

              <h3 className="text-xl text-purple-400 font-semibold">Cómo Interpretar las Cartas:</h3>
              <p>
                Cada carta del tarot tiene un significado básico, pero su interpretación puede cambiar según:
                la posición en la tirada, las cartas que la rodean, la pregunta formulada y la intuición del lector. 
                Es importante considerar tanto el simbolismo visual como el significado tradicional.
              </p>

              <p>
                Los Arcanos Mayores suelen indicar eventos importantes o lecciones de vida significativas, 
                mientras que los Arcanos Menores se relacionan más con situaciones cotidianas y aspectos 
                prácticos de la vida diaria.
              </p>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4">
                    <Eye className="mr-2 h-5 w-5" />
                    Obtener una Lectura
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
