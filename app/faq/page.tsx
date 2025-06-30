import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, Star, Shield, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Videntia Tarot - FAQ sobre Lecturas de Tarot',
  description: 'Respuestas a las preguntas más frecuentes sobre lecturas de tarot, interpretaciones, precisión y funcionamiento de nuestro sistema de IA.',
  keywords: 'preguntas frecuentes tarot, FAQ tarot, como funciona tarot, lecturas tarot gratis, tarot IA, precision tarot, dudas tarot',
  openGraph: {
    title: 'Preguntas Frecuentes | Videntia Tarot',
    description: 'Encuentra respuestas a todas tus dudas sobre las lecturas de tarot y nuestro sistema.',
    url: 'https://videntia-tarot.vercel.app/faq',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FAQ Tarot - Videntia' }]
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/faq' }
}

const faqCategories = [
  {
    title: 'Sobre las Lecturas',
    icon: Star,
    questions: [
      {
        q: '¿Cómo funcionan las lecturas de tarot online?',
        a: 'Nuestras lecturas utilizan inteligencia artificial avanzada combinada con la sabiduría ancestral del tarot. El sistema selecciona cartas según tu energía y pregunta, proporcionando interpretaciones personalizadas y precisas.'
      },
      {
        q: '¿Son gratuitas las lecturas de tarot?',
        a: 'Sí, ofrecemos lecturas básicas completamente gratuitas. También disponemos de lecturas premium con análisis más profundos y consejos personalizados para quienes buscan mayor detalle.'
      },
      {
        q: '¿Qué tipos de preguntas puedo hacer?',
        a: 'Puedes consultar sobre amor, trabajo, dinero, salud, familia y futuro. Las preguntas específicas y claras obtienen respuestas más precisas que las preguntas muy generales.'
      },
      {
        q: '¿Con qué frecuencia puedo hacer consultas?',
        a: 'Recomendamos esperar al menos 24-48 horas entre lecturas sobre el mismo tema para permitir que las energías se asienten y las respuestas tengan mayor claridad.'
      }
    ]
  },
  {
    title: 'Precisión y Funcionamiento',
    icon: Shield,
    questions: [
      {
        q: '¿Qué tan precisas son las lecturas de IA?',
        a: 'Nuestro sistema combina algoritmos avanzados con patrones tradicionales del tarot, logrando una precisión comparable a lectores expertos. La efectividad aumenta con preguntas específicas y mente abierta.'
      },
      {
        q: '¿Cómo selecciona las cartas el sistema?',
        a: 'La IA analiza múltiples factores: tu pregunta, energía del momento, patrones numerológicos y correspondencias astrológicas para seleccionar las cartas más relevantes para tu situación.'
      },
      {
        q: '¿Las lecturas son deterministas o pueden cambiar?',
        a: 'El tarot muestra tendencias y posibilidades basadas en tu situación actual. Tus decisiones y acciones pueden influir en el resultado final, ya que tienes libre albedrío.'
      },
      {
        q: '¿Por qué a veces las respuestas parecen vagas?',
        a: 'El tarot habla en simbolos y metáforas. Además, algunas situaciones están en proceso de formación. La interpretación requiere reflexión personal para conectar con tu situación específica.'
      }
    ]
  },
  {
    title: 'Uso de la Plataforma',
    icon: Clock,
    questions: [
      {
        q: '¿Necesito registrarme para usar el servicio?',
        a: 'No es necesario registrarse para lecturas básicas. Sin embargo, crear una cuenta te permite guardar tus lecturas, acceder al historial y obtener recomendaciones personalizadas.'
      },
      {
        q: '¿Puedo compartir mis lecturas?',
        a: 'Sí, puedes compartir tus lecturas a través de redes sociales o copiar el enlace. También puedes guardarlas en tu cuenta para consultarlas más tarde.'
      },
      {
        q: '¿Los datos de mis consultas son privados?',
        a: 'Absolutamente. Todas las consultas son privadas y encriptadas. No compartimos información personal ni el contenido de las lecturas con terceros.'
      },
      {
        q: '¿Funciona en dispositivos móviles?',
        a: 'Sí, nuestra plataforma está optimizada para todos los dispositivos: computadoras, tablets y smartphones. La experiencia es fluida en cualquier pantalla.'
      }
    ]
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap(category => 
    category.questions.map(qa => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.a
      }
    }))
  )
}

export default function FAQPage() {
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
            <HelpCircle className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Preguntas <span className="text-purple-400">Frecuentes</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre nuestras lecturas de tarot, 
              funcionamiento de la plataforma y cómo obtener los mejores resultados.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <div key={categoryIndex} className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <Icon className="h-8 w-8 text-purple-400" />
                    <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {category.questions.map((qa, qaIndex) => (
                      <Card key={qaIndex} className="bg-purple-800/30 border-purple-600">
                        <CardHeader>
                          <CardTitle className="text-purple-300 text-lg">
                            {qa.q}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-purple-200 text-base leading-relaxed">
                            {qa.a}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-purple-800/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center">
                  ¿Listo para tu Primera Lectura?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-purple-200 mb-6 text-lg">
                  Ahora que conoces cómo funcionamos, es momento de descubrir lo que el tarot tiene para ti.
                </CardDescription>
                <Link href="/">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4">
                    <Star className="mr-2 h-5 w-5" />
                    Comenzar Lectura Gratuita
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional SEO Content */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-purple-800/30 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl text-white">¿Tienes Más Preguntas?</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  Si tu pregunta no está en nuestra lista de FAQ, no dudes en contactarnos. 
                  Nuestro equipo está disponible para resolver cualquier duda adicional sobre 
                  las lecturas de tarot, el funcionamiento de la plataforma o cómo interpretar tus resultados.
                </p>
                
                <h3 className="text-xl text-purple-400 font-semibold">Contacto y Soporte:</h3>
                <ul className="space-y-2">
                  <li>• Formulario de contacto disponible 24/7</li>
                  <li>• Respuesta promedio en menos de 24 horas</li>
                  <li>• Soporte técnico especializado</li>
                  <li>• Guías adicionales en nuestro blog</li>
                </ul>

                <div className="text-center mt-8">
                  <Link href="/contacto">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Contactar Soporte
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
