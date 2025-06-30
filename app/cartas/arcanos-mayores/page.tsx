import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, Eye, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Arcanos Mayores del Tarot | Videntia Tarot - 22 Cartas Principales',
  description: 'Guía completa de los 22 Arcanos Mayores del tarot con significados, simbolismo e interpretaciones. Desde El Loco hasta El Mundo.',
  keywords: 'arcanos mayores, cartas tarot principales, el loco, la muerte, el sol, el mundo, tarot arcanos, significados arcanos mayores',
  openGraph: {
    title: 'Arcanos Mayores del Tarot | Videntia Tarot',
    description: 'Descubre el significado de las 22 cartas más importantes del tarot.',
    url: 'https://videntia-tarot.vercel.app/cartas/arcanos-mayores',
    type: 'website'
  },
  alternates: { canonical: 'https://videntia-tarot.vercel.app/cartas/arcanos-mayores' }
}

const arcanosMayores = [
  { number: 0, name: 'El Loco', meaning: 'Nuevos comienzos, espontaneidad, inocencia' },
  { number: 1, name: 'El Mago', meaning: 'Manifestación, poder personal, acción' },
  { number: 2, name: 'La Sacerdotisa', meaning: 'Intuición, misterio, subconsciente' },
  { number: 3, name: 'La Emperatriz', meaning: 'Fertilidad, creatividad, naturaleza' },
  { number: 4, name: 'El Emperador', meaning: 'Autoridad, estructura, control' },
  { number: 5, name: 'El Hierofante', meaning: 'Tradición, conformidad, moralidad' },
  { number: 6, name: 'Los Enamorados', meaning: 'Amor, elección, dualidad' },
  { number: 7, name: 'El Carro', meaning: 'Determinación, control, victoria' },
  { number: 8, name: 'La Fuerza', meaning: 'Fuerza interior, coraje, compasión' },
  { number: 9, name: 'El Ermitaño', meaning: 'Introspección, búsqueda interior, guía' },
  { number: 10, name: 'La Rueda de la Fortuna', meaning: 'Destino, ciclos, cambio' },
  { number: 11, name: 'La Justicia', meaning: 'Balance, verdad, responsabilidad' },
  { number: 12, name: 'El Colgado', meaning: 'Suspensión, sacrificio, nueva perspectiva' },
  { number: 13, name: 'La Muerte', meaning: 'Transformación, finales, renacimiento' },
  { number: 14, name: 'La Templanza', meaning: 'Equilibrio, moderación, paciencia' },
  { number: 15, name: 'El Diablo', meaning: 'Tentación, adicción, materialismo' },
  { number: 16, name: 'La Torre', meaning: 'Cambio súbito, revelación, liberación' },
  { number: 17, name: 'La Estrella', meaning: 'Esperanza, inspiración, espiritualidad' },
  { number: 18, name: 'La Luna', meaning: 'Ilusión, intuición, subconsciente' },
  { number: 19, name: 'El Sol', meaning: 'Éxito, vitalidad, optimismo' },
  { number: 20, name: 'El Juicio', meaning: 'Renacimiento, llamada interior, absolución' },
  { number: 21, name: 'El Mundo', meaning: 'Cumplimiento, realización, éxito' }
]

export default function ArcanosMayoresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Arcanos <span className="text-yellow-400">Mayores</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Los 22 Arcanos Mayores representan el viaje del alma a través de las experiencias 
            más importantes de la vida, desde El Loco hasta El Mundo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {arcanosMayores.map((arcano, index) => (
            <Card key={index} className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <span className="text-2xl font-bold">{arcano.number}</span>
                  {arcano.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200">
                  {arcano.meaning}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">El Viaje del Alma</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Los Arcanos Mayores narran la historia del viaje espiritual del ser humano, 
                conocido como &quot;El Viaje del Loco&quot;. Cada carta representa una etapa de crecimiento 
                y aprendizaje en el camino hacia la iluminación.
              </p>
              
              <h3 className="text-xl text-yellow-400 font-semibold">Significado de los Arcanos Mayores:</h3>
              <p>
                Cuando aparecen en una lectura, los Arcanos Mayores indican eventos importantes, 
                lecciones kármicas o aspectos del desarrollo personal que requieren atención especial.
              </p>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Star className="mr-2 h-5 w-5" />
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
