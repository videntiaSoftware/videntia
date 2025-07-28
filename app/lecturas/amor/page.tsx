import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lectura de Tarot del Amor | Videntia Tarot - Descubre tu Futuro Amoroso',
  description: 'Lectura de tarot del amor con IA. Descubre qué te depara el futuro en el amor, encuentra respuestas sobre tu relación actual y conoce a tu alma gemela. Lectura gratuita.',
  keywords: 'tarot amor, lectura amor, tarot parejas, futuro amoroso, alma gemela, tarot relaciones, consulta amor, cartas amor, videncia amor, tarot gratis amor',
  openGraph: {
    title: 'Lectura de Tarot del Amor | Videntia Tarot',
    description: 'Descubre tu futuro amoroso con nuestras lecturas de tarot del amor. IA avanzada y sabiduría ancestral para revelar los secretos de tu corazón.',
    url: 'https://videntia-tarot.vercel.app/lecturas/amor',
    type: 'website',
    images: [{ url: 'https://videntiatarot.com/opengraph-image.png', width: 1200, height: 630, alt: 'Lectura de Tarot de Amor - Videntia' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lectura de Tarot del Amor | Videntia Tarot',
    description: 'Descubre tu futuro amoroso con lecturas de tarot especializadas en amor y relaciones.',
    images: ['/twitter-image.png']
  },
  alternates: {
    canonical: "https://videntiatarot.com/lecturas/amor"
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Lectura de Tarot del Amor',
  description: 'Servicio especializado de lectura de tarot para temas amorosos y relaciones sentimentales',
  image: 'https://videntiatarot.com/opengraph-image.png',
  provider: {
    '@type': 'Organization',
    name: 'Videntia Tarot',
    url: 'https://videntia-tarot.vercel.app'
  },
  areaServed: 'Worldwide',
  availableLanguage: 'Spanish',
  category: 'Spiritual Services',
  keywords: 'tarot amor, lectura amor, tarot parejas, futuro amoroso',
  offers: {
    '@type': 'Offer',
    description: 'Lectura de tarot del amor con IA',
    price: '0',
    priceCurrency: 'USD'
  }
}

export default function LecturaAmorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-6">
              <Heart className="h-12 w-12 text-pink-400" />
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lectura de Tarot del <span className="text-pink-400">Amor</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Descubre los secretos de tu corazón y el futuro de tus relaciones amorosas. 
              Nuestras lecturas especializadas en amor te revelarán lo que el universo tiene preparado para ti.
            </p>
            <Link href="/?readingType=love_relationship">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-4">
                <Heart className="mr-2 h-5 w-5" />
                Comenzar Lectura Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Relaciones Actuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Descubre la verdad sobre tu relación actual, los sentimientos de tu pareja y cómo fortalecer vuestro vínculo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Futuro Amoroso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Conoce qué te depara el futuro en el amor, cuándo llegará el amor verdadero y cómo reconocerlo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Alma Gemela
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Descubre las características de tu alma gemela y cómo prepararte para ese encuentro especial.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-purple-800/30 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl text-white">¿Qué Puedes Descubrir en una Lectura de Amor?</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  Las lecturas de tarot del amor son una de las consultas más populares y reveladoras. 
                  A través de las cartas, puedes obtener claridad sobre situaciones amorosas complejas, 
                  entender los sentimientos verdaderos y tomar decisiones importantes sobre tu vida sentimental.
                </p>
                
                <h3 className="text-xl text-pink-400 font-semibold">Preguntas Frecuentes en Lecturas de Amor:</h3>
                <ul className="space-y-2">
                  <li>• ¿Me ama realmente mi pareja?</li>
                  <li>• ¿Cuándo encontraré el amor verdadero?</li>
                  <li>• ¿Debo continuar con esta relación?</li>
                  <li>• ¿Volverá mi ex pareja?</li>
                  <li>• ¿Cómo puedo mejorar mi relación actual?</li>
                  <li>• ¿Qué características tendrá mi futuro amor?</li>
                </ul>

                <p>
                  Nuestro sistema de IA combina la sabiduría ancestral del tarot con algoritmos avanzados 
                  para ofrecerte lecturas precisas y personalizadas. Cada carta seleccionada tiene un 
                  significado específico para tu situación amorosa actual.
                </p>

                <div className="text-center mt-8">
                  <Link href="/?readingType=love_relationship">
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                      Comenzar tu Lectura de Amor Ahora
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
