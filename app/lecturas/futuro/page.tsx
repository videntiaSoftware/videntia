import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Gem, Compass, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lectura de Tarot del Futuro | Videntia Tarot - Predicciones y Destino',
  description: 'Lectura de tarot del futuro con IA. Descubre predicciones, tu destino, eventos importantes y el camino que te espera. Lectura gratuita de videncia.',
  keywords: 'tarot futuro, predicciones tarot, destino tarot, videncia futuro, lectura destino, futuro tarot, predicción vida, tarot gratis futuro, adivinación',
  openGraph: {
    title: 'Lectura de Tarot del Futuro | Videntia Tarot',
    description: 'Descubre tu destino y lo que te depara el futuro con lecturas de videncia.',
    url: 'https://videntia-tarot.vercel.app/lecturas/futuro',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Lectura de Tarot del Futuro - Videntia' }]
  },
  alternates: { canonical: "https://videntiatarot.com/lecturas/futuro" }
}

export default function LecturaFuturoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Eye className="h-12 w-12 text-purple-400" />
            <Gem className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Lectura de Tarot del <span className="text-purple-400">Futuro</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Descubre lo que te depara el destino y los eventos importantes que marcarán tu camino. 
            Prepárate para el futuro con sabiduría y claridad.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4">
              <Eye className="mr-2 h-5 w-5" />
              Comenzar Lectura Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gem className="h-5 w-5" />
                Predicciones Generales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Visión amplia de tu futuro próximo y eventos importantes por venir.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Guía del Destino
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Comprende tu propósito de vida y el camino que debes seguir.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Oportunidades Futuras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Identifica las oportunidades que se presentarán en tu camino.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Revela los Misterios del Futuro</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Las lecturas del futuro te conectan con la sabiduría universal para revelar 
                los patrones de energía que moldearán tu destino próximo.
              </p>
              
              <h3 className="text-xl text-purple-400 font-semibold">Aspectos del Futuro:</h3>
              <ul className="space-y-2">
                <li>• ¿Qué eventos importantes me esperan?</li>
                <li>• ¿Cuál es mi propósito en la vida?</li>
                <li>• ¿Qué cambios se aproximan?</li>
                <li>• ¿Cómo puedo prepararme para el futuro?</li>
                <li>• ¿Qué oportunidades no debo perder?</li>
                <li>• ¿Cuál será mi situación en un año?</li>
              </ul>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Descubrir tu Futuro
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
