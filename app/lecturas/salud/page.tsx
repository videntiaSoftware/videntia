import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lectura de Tarot de Salud | Videntia Tarot - Bienestar y Vitalidad',
  description: 'Lectura de tarot de salud y bienestar con IA. Descubre aspectos sobre tu salud física, mental y emocional. Orientación para el bienestar integral. Lectura gratuita.',
  keywords: 'tarot salud, lectura bienestar, tarot vitalidad, salud mental, equilibrio emocional, bienestar integral, tarot gratis salud, energía vital',
  openGraph: {
    title: 'Lectura de Tarot de Salud | Videntia Tarot',
    description: 'Descubre aspectos sobre tu salud y bienestar con lecturas especializadas.',
    url: 'https://videntia-tarot.vercel.app/lecturas/salud',
    type: 'website',
    images: [{ url: 'https://videntiatarot.com/opengraph-image.png', width: 1200, height: 630, alt: 'Lectura de Tarot de Salud - Videntia' }]
  },
  alternates: { canonical: "https://videntiatarot.com/lecturas/salud" }
}

export default function LecturaSaludPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Heart className="h-12 w-12 text-red-400" />
            <Shield className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Lectura de Tarot de <span className="text-red-400">Salud</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Obtén orientación sobre tu bienestar físico, mental y emocional. 
            Descubre cómo mantener el equilibrio y la vitalidad en tu vida.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
              <Heart className="mr-2 h-5 w-5" />
              Comenzar Lectura Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Bienestar Físico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Orientación sobre tu estado físico, vitalidad y cómo mantener un cuerpo sano.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Energía Vital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Descubre tu nivel de energía y cómo recuperar la vitalidad perdida.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Equilibrio Emocional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Mantén la armonía mental y emocional para un bienestar integral.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Cuida tu Bienestar Integral</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                El tarot de salud ofrece una perspectiva holística sobre tu bienestar, 
                considerando los aspectos físicos, mentales y emocionales de tu salud.
              </p>
              
              <h3 className="text-xl text-red-400 font-semibold">Aspectos a Consultar:</h3>
              <ul className="space-y-2">
                <li>• ¿Cómo está mi estado de salud general?</li>
                <li>• ¿Qué debo hacer para mejorar mi bienestar?</li>
                <li>• ¿Cómo puedo aumentar mi energía vital?</li>
                <li>• ¿Qué aspectos emocionales afectan mi salud?</li>
              </ul>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Consultar sobre tu Salud
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
