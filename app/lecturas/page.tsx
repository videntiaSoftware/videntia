import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Briefcase, DollarSign, Users, Eye, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lecturas de Tarot Especializadas | Videntia Tarot - Todas las Consultas',
  description: 'Lecturas de tarot especializadas en amor, trabajo, dinero, salud, familia y futuro. Consultas personalizadas con IA para todas tus preguntas. Gratis.',
  keywords: 'lecturas tarot, tarot especializado, consultas tarot, amor trabajo dinero, tarot gratis, lectura personalizada, videncia online, cartas tarot',
  openGraph: {
    title: 'Lecturas de Tarot Especializadas | Videntia Tarot',
    description: 'Descubre lecturas especializadas para cada área de tu vida: amor, trabajo, dinero, salud y más.',
    url: 'https://videntia-tarot.vercel.app/lecturas',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Lecturas de Tarot Especializadas - Videntia' }]
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/lecturas' }
}

const lecturas = [
  {
    title: 'Lectura de Amor',
    description: 'Descubre tu futuro amoroso, relaciones y alma gemela',
    icon: Heart,
    color: 'text-pink-400',
    bgColor: 'bg-pink-600 hover:bg-pink-700',
    href: '/lecturas/amor'
  },
  {
    title: 'Lectura Laboral',
    description: 'Tu carrera profesional, oportunidades y crecimiento',
    icon: Briefcase,
    color: 'text-green-400',
    bgColor: 'bg-green-600 hover:bg-green-700',
    href: '/lecturas/trabajo'
  },
  {
    title: 'Lectura del Dinero',
    description: 'Finanzas, abundancia y oportunidades económicas',
    icon: DollarSign,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-600 hover:bg-yellow-700',
    href: '/lecturas/dinero'
  },
  {
    title: 'Lectura de Salud',
    description: 'Bienestar físico, mental y energía vital',
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-600 hover:bg-red-700',
    href: '/lecturas/salud'
  },
  {
    title: 'Lectura Familiar',
    description: 'Relaciones familiares, armonía y conflictos',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    href: '/lecturas/familia'
  },
  {
    title: 'Lectura del Futuro',
    description: 'Predicciones, destino y eventos importantes',
    icon: Eye,
    color: 'text-purple-400',
    bgColor: 'bg-purple-600 hover:bg-purple-700',
    href: '/lecturas/futuro'
  }
]

export default function LecturasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Lecturas de Tarot <span className="text-purple-400">Especializadas</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Encuentra respuestas específicas para cada área de tu vida. 
            Nuestras lecturas especializadas te ofrecen la orientación que necesitas con precisión y claridad.
          </p>
        </div>

        {/* Lecturas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lecturas.map((lectura, index) => {
            const Icon = lectura.icon
            return (
              <Card key={index} className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-colors">
                <CardHeader>
                  <CardTitle className={`${lectura.color} flex items-center gap-2 text-xl`}>
                    <Icon className="h-6 w-6" />
                    {lectura.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200 mb-4">
                    {lectura.description}
                  </CardDescription>
                  <Link href={lectura.href}>
                    <Button className={`w-full ${lectura.bgColor} text-white`}>
                      Comenzar Lectura
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">¿Por Qué Elegir Lecturas Especializadas?</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Cada área de tu vida tiene sus propias energías y patrones únicos. Nuestras lecturas especializadas 
                están diseñadas para enfocarse específicamente en el tema que más te interesa, proporcionando 
                respuestas más precisas y relevantes.
              </p>
              
              <h3 className="text-xl text-purple-400 font-semibold">Ventajas de las Lecturas Especializadas:</h3>
              <ul className="space-y-2">
                <li>• <strong>Mayor Precisión:</strong> Cartas y spreads específicos para cada tema</li>
                <li>• <strong>Interpretación Enfocada:</strong> Análisis dirigido a tu área de interés</li>
                <li>• <strong>Consejos Prácticos:</strong> Orientación aplicable a tu situación específica</li>
                <li>• <strong>IA Especializada:</strong> Algoritmos entrenados para cada tipo de consulta</li>
              </ul>

              <h3 className="text-xl text-purple-400 font-semibold">Cómo Funcionan Nuestras Lecturas:</h3>
              <p>
                Utilizamos inteligencia artificial avanzada combinada con la sabiduría ancestral del tarot 
                para crear lecturas personalizadas. Nuestro sistema analiza tu pregunta, selecciona las cartas 
                más relevantes y proporciona interpretaciones contextualizadas para tu situación específica.
              </p>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4">
                    Comenzar Lectura General
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
