import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, Coins, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lectura de Tarot del Dinero | Videntia Tarot - Tu Futuro Financiero',
  description: 'Lectura de tarot del dinero y finanzas con IA. Descubre tu futuro financiero, oportunidades de inversión, suerte en juegos y abundancia. Lectura gratuita.',
  keywords: 'tarot dinero, lectura financiera, tarot abundancia, futuro financiero, suerte dinero, inversiones tarot, prosperidad, tarot gratis dinero, fortuna',
  openGraph: {
    title: 'Lectura de Tarot del Dinero | Videntia Tarot',
    description: 'Descubre tu futuro financiero con lecturas de tarot especializadas en dinero y abundancia.',
    url: 'https://videntia-tarot.vercel.app/lecturas/dinero',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Lectura de Tarot del Dinero - Videntia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lectura de Tarot del Dinero | Videntia Tarot',
    description: 'Descubre tu futuro financiero con lecturas especializadas en dinero y abundancia.',
    images: ['/twitter-image.png']
  },
  alternates: {
    canonical: "https://videntiatarot.com/lecturas/dinero"
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Lectura de Tarot del Dinero',
  description: 'Servicio especializado de lectura de tarot para temas financieros y abundancia',
  provider: {
    '@type': 'Organization',
    name: 'Videntia Tarot',
    url: 'https://videntia-tarot.vercel.app'
  },
  areaServed: 'Worldwide',
  availableLanguage: 'Spanish',
  category: 'Spiritual Services',
  keywords: 'tarot dinero, lectura financiera, tarot abundancia, futuro financiero',
  offers: {
    '@type': 'Offer',
    description: 'Lectura de tarot del dinero con IA',
    price: '0',
    priceCurrency: 'USD'
  }
}

export default function LecturaDineroPage() {
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
              <DollarSign className="h-12 w-12 text-yellow-400" />
              <Coins className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lectura de Tarot del <span className="text-yellow-400">Dinero</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Descubre tu futuro financiero y las oportunidades de abundancia que te esperan. 
              Obtén claridad sobre inversiones, negocios y el camino hacia la prosperidad.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-4">
                <DollarSign className="mr-2 h-5 w-5" />
                Comenzar Lectura Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Oportunidades Financieras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Descubre nuevas fuentes de ingresos, inversiones prometedoras y oportunidades de negocio.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Crecimiento Económico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Conoce tu potencial de crecimiento financiero y cómo multiplicar tu patrimonio.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Abundancia y Prosperidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Atrae la abundancia y elimina bloqueos financieros que limitan tu prosperidad.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-purple-800/30 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Manifiesta la Abundancia con el Tarot</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  El tarot financiero es una herramienta invaluable para comprender tu relación con el dinero 
                  y descubrir las oportunidades que el universo tiene preparadas para ti. Las cartas revelan 
                  tanto los obstáculos como los caminos hacia la prosperidad.
                </p>
                
                <h3 className="text-xl text-yellow-400 font-semibold">Preguntas Financieras Populares:</h3>
                <ul className="space-y-2">
                  <li>• ¿Cuándo mejorarán mis finanzas?</li>
                  <li>• ¿Es un buen momento para invertir?</li>
                  <li>• ¿Qué negocio me traería más prosperidad?</li>
                  <li>• ¿Cómo puedo atraer más dinero a mi vida?</li>
                  <li>• ¿Qué bloqueos financieros debo superar?</li>
                  <li>• ¿Tendré suerte en juegos de azar?</li>
                </ul>

                <h3 className="text-xl text-yellow-400 font-semibold">Aspectos que Revela el Tarot Financiero:</h3>
                <p>
                  Una lectura financiera puede mostrarte patrones de comportamiento con el dinero, 
                  oportunidades ocultas, el momento ideal para hacer inversiones y cómo desarrollar 
                  una mentalidad de abundancia. También revela qué aspectos de tu personalidad 
                  pueden estar limitando tu crecimiento económico.
                </p>

                <p>
                  Nuestro sistema analiza las cartas en el contexto de tu situación financiera actual, 
                  ofreciendo consejos prácticos para mejorar tu relación con el dinero y atraer la prosperidad.
                </p>

                <div className="text-center mt-8">
                  <Link href="/">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Descubrir tu Futuro Financiero
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
