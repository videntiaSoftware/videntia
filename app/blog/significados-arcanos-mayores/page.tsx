import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Crown, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Significados de los Arcanos Mayores | Blog Videntia Tarot',
  description: 'Guía completa y detallada sobre los significados de los 22 Arcanos Mayores del tarot. Aprende a interpretar cada carta con ejemplos prácticos.',
  keywords: 'significados arcanos mayores, interpretar arcanos mayores, cartas tarot significado, el loco significado, la muerte tarot, el sol tarot',
  openGraph: {
    title: 'Significados de los Arcanos Mayores | Blog Videntia Tarot',
    description: 'Aprende a interpretar los Arcanos Mayores del tarot con nuestra guía completa.',
    url: 'https://videntia-tarot.vercel.app/blog/significados-arcanos-mayores'
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/blog/significados-arcanos-mayores' }
}

export default function SignificadosArcanosMayoresPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-purple-300 hover:text-purple-100 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Blog
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Guía Completa: Significados de los <span className="text-yellow-400">Arcanos Mayores</span>
          </h1>
          <div className="flex justify-center items-center gap-4 text-purple-300 mb-8">
            <span>15 de enero, 2024</span>
            <span>•</span>
            <span>10 min de lectura</span>
            <span>•</span>
            <span>Guías</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none text-purple-200">
                <p className="text-lg leading-relaxed">
                  Los Arcanos Mayores son el corazón y alma del tarot. Estas 22 cartas representan 
                  las fuerzas arquetípicas más poderosas y las lecciones más importantes que 
                  encontramos en nuestro viaje por la vida.
                </p>

                <h2 className="text-2xl font-bold text-yellow-400 mt-8 mb-4">
                  ¿Qué son los Arcanos Mayores?
                </h2>
                <p>
                  Los Arcanos Mayores forman la primera parte del tarot y son considerados 
                  las cartas más significativas de toda la baraja. Cada una cuenta una parte 
                  de la historia del &quot;Viaje del Loco&quot;, un camino simbólico de crecimiento 
                  espiritual y autoconocimiento.
                </p>

                <h2 className="text-2xl font-bold text-yellow-400 mt-8 mb-4">
                  Las Cartas Más Importantes
                </h2>
                
                <h3 className="text-xl font-semibold text-purple-300 mt-6 mb-3">
                  El Loco (0) - Nuevos Comienzos
                </h3>
                <p>
                  El Loco representa el inicio del viaje, la inocencia y la fe ciega en el futuro. 
                  Es la carta de los nuevos comienzos, la espontaneidad y el coraje para dar 
                  el primer paso hacia lo desconocido.
                </p>

                <h3 className="text-xl font-semibold text-purple-300 mt-6 mb-3">
                  La Muerte (XIII) - Transformación
                </h3>
                <p>
                  Contrario a la creencia popular, La Muerte raramente representa muerte física. 
                  Es la carta de la transformación profunda, el final de un ciclo y el 
                  renacimiento hacia algo nuevo y mejor.
                </p>

                <h3 className="text-xl font-semibold text-purple-300 mt-6 mb-3">
                  El Sol (XIX) - Éxito y Vitalidad
                </h3>
                <p>
                  El Sol es una de las cartas más positivas del tarot. Representa el éxito, 
                  la vitalidad, la alegría y la iluminación. Cuando aparece, indica que 
                  estás en el camino correcto y que el éxito está cerca.
                </p>

                <h2 className="text-2xl font-bold text-yellow-400 mt-8 mb-4">
                  Cómo Interpretar los Arcanos Mayores
                </h2>
                <p>
                  Al interpretar los Arcanos Mayores, considera estos aspectos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Su posición en la tirada</li>
                  <li>Las cartas que los rodean</li>
                  <li>El contexto de la pregunta</li>
                  <li>Tu intuición personal</li>
                </ul>

                <h2 className="text-2xl font-bold text-yellow-400 mt-8 mb-4">
                  Conclusión
                </h2>
                <p>
                  Los Arcanos Mayores son maestros espirituales que nos guían a través de 
                  las experiencias más profundas de la vida. Aprender sus significados 
                  es esencial para cualquier estudiante del tarot.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-purple-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-center text-white">¿Quieres Experimentar el Poder de los Arcanos?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-purple-200 mb-6">
                Obtén una lectura personalizada y descubre qué Arcanos Mayores tienen mensajes para ti.
              </p>
              <Link href="/">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Crown className="mr-2 h-5 w-5" />
                  Comenzar Lectura Gratuita
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
