import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Home, Baby, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lectura de Tarot Familiar | Videntia Tarot - Relaciones Familiares',
  description: 'Lectura de tarot familiar con IA. Descubre la armonía familiar, conflictos, embarazos, hijos y relaciones con parientes. Lectura gratuita.',
  keywords: 'tarot familia, lectura familiar, armonía familia, conflictos familiares, embarazo tarot, hijos tarot, relaciones familiares, tarot gratis familia',
  openGraph: {
    title: 'Lectura de Tarot Familiar | Videntia Tarot',
    description: 'Descubre la armonía familiar y resuelve conflictos con lecturas especializadas.',
    url: 'https://videntia-tarot.vercel.app/lecturas/familia',
    type: 'website',
    images: [{ url: 'https://videntiatarot.com/opengraph-image.png', width: 1200, height: 630, alt: 'Lectura de Tarot Familiar - Videntia' }]
  },
  alternates: { canonical: "https://videntiatarot.com/lecturas/familia" }
}

export default function LecturaFamiliaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Users className="h-12 w-12 text-blue-400" />
            <Home className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Lectura de Tarot <span className="text-blue-400">Familiar</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Fortalece los vínculos familiares y encuentra armonía en el hogar. 
            Resuelve conflictos y mejora las relaciones con tus seres queridos.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Comenzar Lectura Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Armonía Familiar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Descubre cómo crear un ambiente de paz y comprensión en tu hogar.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Resolución de Conflictos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Encuentra soluciones a problemas familiares y mejora la comunicación.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Baby className="h-5 w-5" />
                Maternidad y Paternidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Orientación sobre embarazos, crianza y el crecimiento de los hijos.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Fortalece los Lazos Familiares</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Las lecturas familiares te ayudan a comprender mejor las dinámicas de tu hogar 
                y encontrar formas de mejorar las relaciones con tus seres queridos.
              </p>
              
              <h3 className="text-xl text-blue-400 font-semibold">Consultas Familiares Frecuentes:</h3>
              <ul className="space-y-2">
                <li>• ¿Cómo puedo mejorar la relación con mis padres?</li>
                <li>• ¿Habrá armonía en mi familia?</li>
                <li>• ¿Es un buen momento para tener hijos?</li>
                <li>• ¿Cómo resolver conflictos familiares?</li>
                <li>• ¿Qué necesita mi familia para ser más feliz?</li>
              </ul>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Consultar sobre tu Familia
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
