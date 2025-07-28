import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, TrendingUp, Target, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lectura de Tarot Laboral | Videntia Tarot - Tu Futuro Profesional',
  description: 'Lectura de tarot laboral y profesional con IA. Descubre oportunidades de trabajo, cambios de carrera, ascensos y tu futuro profesional. Lectura gratuita.',
  keywords: 'tarot trabajo, lectura laboral, tarot profesional, futuro trabajo, cambio trabajo, ascenso laboral, carrera profesional, oportunidades trabajo, tarot gratis trabajo',
  openGraph: {
    title: 'Lectura de Tarot Laboral | Videntia Tarot',
    description: 'Descubre tu futuro profesional con lecturas de tarot especializadas en trabajo y carrera.',
    url: 'https://videntia-tarot.vercel.app/lecturas/trabajo',
    type: 'website',
    images: [{ url: 'https://videntiatarot.com/opengraph-image.png', width: 1200, height: 630, alt: 'Lectura de Tarot de Trabajo - Videntia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lectura de Tarot Laboral | Videntia Tarot',
    description: 'Descubre tu futuro profesional con lecturas especializadas en trabajo y carrera.',
    images: ['/twitter-image.png']
  },
  alternates: {
    canonical: "https://videntiatarot.com/lecturas/trabajo"
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Lectura de Tarot Laboral',
  description: 'Servicio especializado de lectura de tarot para temas laborales y desarrollo profesional',
  image: 'https://videntiatarot.com/opengraph-image.png',
  provider: {
    '@type': 'Organization',
    name: 'Videntia Tarot',
    url: 'https://videntia-tarot.vercel.app'
  },
  areaServed: 'Worldwide',
  availableLanguage: 'Spanish',
  category: 'Spiritual Services',
  keywords: 'tarot trabajo, lectura laboral, tarot profesional, futuro trabajo',
  offers: {
    '@type': 'Offer',
    description: 'Lectura de tarot laboral con IA',
    price: '0',
    priceCurrency: 'USD'
  }
}

export default function LecturaTrabajoPage() {
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
              <Briefcase className="h-12 w-12 text-green-400" />
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lectura de Tarot <span className="text-green-400">Laboral</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Descubre tu futuro profesional y las oportunidades que te esperan. 
              Obtén claridad sobre tu carrera, cambios laborales y el camino hacia el éxito.
            </p>
            <Link href="/?readingType=life_purpose">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Briefcase className="mr-2 h-5 w-5" />
                Comenzar Lectura Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Oportunidades Laborales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Descubre nuevas oportunidades de trabajo, proyectos prometedores y el momento ideal para actuar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Crecimiento Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Conoce tu potencial de crecimiento, posibles ascensos y cómo desarrollar tu carrera profesional.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Cambios de Carrera
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  Evalúa si es el momento de cambiar de trabajo o carrera, y cuál sería la mejor dirección a tomar.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-purple-800/30 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Guía tu Carrera Profesional con el Tarot</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  El tarot laboral es una herramienta poderosa para obtener claridad sobre tu futuro profesional. 
                  Las cartas pueden revelar obstáculos ocultos, oportunidades que se avecinan y el momento 
                  perfecto para tomar decisiones importantes en tu carrera.
                </p>
                
                <h3 className="text-xl text-green-400 font-semibold">Aspectos que Puedes Consultar:</h3>
                <ul className="space-y-2">
                  <li>• ¿Debo cambiar de trabajo o quedarme donde estoy?</li>
                  <li>• ¿Cuándo llegarán nuevas oportunidades laborales?</li>
                  <li>• ¿Cómo puedo mejorar mi situación profesional actual?</li>
                  <li>• ¿Es el momento adecuado para emprender?</li>
                  <li>• ¿Qué obstáculos debo superar en mi carrera?</li>
                  <li>• ¿Cuál es mi verdadera vocación profesional?</li>
                </ul>

                <h3 className="text-xl text-green-400 font-semibold">Beneficios de la Lectura Laboral:</h3>
                <p>
                  Una lectura de tarot enfocada en el trabajo te ayuda a tomar decisiones informadas sobre tu carrera. 
                  Puedes identificar el momento ideal para solicitar un ascenso, cambiar de empresa, o incluso 
                  emprender tu propio negocio. Las cartas también revelan tus fortalezas ocultas y cómo aprovecharlas.
                </p>

                <div className="text-center mt-8">
                  <Link href="/?readingType=life_purpose">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Consultar tu Futuro Laboral
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
