import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  Briefcase, 
  DollarSign, 
  Users, 
  Eye, 
  Shield,
  Crown,
  BookOpen,
  HelpCircle,
  Star
} from 'lucide-react'

export default function SEONavigationSection() {
  const lecturas = [
    { href: '/lecturas/amor', title: 'Tarot del Amor', icon: Heart, color: 'text-pink-400' },
    { href: '/lecturas/trabajo', title: 'Tarot Laboral', icon: Briefcase, color: 'text-green-400' },
    { href: '/lecturas/dinero', title: 'Tarot del Dinero', icon: DollarSign, color: 'text-yellow-400' },
    { href: '/lecturas/salud', title: 'Tarot de Salud', icon: Shield, color: 'text-red-400' },
    { href: '/lecturas/familia', title: 'Tarot Familiar', icon: Users, color: 'text-blue-400' },
    { href: '/lecturas/futuro', title: 'Tarot del Futuro', icon: Eye, color: 'text-purple-400' },
  ]

  const recursos = [
    { href: '/cartas', title: 'Cartas del Tarot', icon: Crown, color: 'text-yellow-400' },
    { href: '/blog', title: 'Blog de Tarot', icon: BookOpen, color: 'text-purple-400' },
    { href: '/faq', title: 'Preguntas Frecuentes', icon: HelpCircle, color: 'text-blue-400' },
  ]

  return (
    <div className="w-full bg-purple-900/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explora Nuestras <span className="text-purple-400">Lecturas Especializadas</span>
          </h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Cada consulta está diseñada para darte respuestas específicas sobre los temas que más te importan
          </p>
        </div>

        {/* Lecturas Especializadas */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Lecturas por Tema</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {lecturas.map((lectura, index) => {
              const Icon = lectura.icon
              return (
                <Link key={index} href={lectura.href}>
                  <Card className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-4 text-center">
                      <Icon className={`h-8 w-8 ${lectura.color} mx-auto mb-2`} />
                      <h4 className="text-white text-sm font-medium">{lectura.title}</h4>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recursos y Guías */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Aprende más sobre el Tarot</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recursos.map((recurso, index) => {
              const Icon = recurso.icon
              return (
                <Link key={index} href={recurso.href}>
                  <Card className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-12 w-12 ${recurso.color} mx-auto mb-4`} />
                      <h4 className="text-white text-lg font-semibold mb-2">{recurso.title}</h4>
                      <p className="text-purple-200 text-sm">
                        {recurso.href === '/cartas' && 'Explora el significado de todas las cartas'}
                        {recurso.href === '/blog' && 'Guías y consejos para mejorar tus lecturas'}
                        {recurso.href === '/faq' && 'Resuelve todas tus dudas sobre el tarot'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA Central */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para descubrir tu destino?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Comienza tu viaje espiritual con una lectura personalizada. 
              Nuestro sistema de IA te conectará con las respuestas que buscas.
            </p>
            <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-100 text-lg px-8 py-4">
              <Star className="mr-2 h-5 w-5" />
              Comenzar Lectura Gratuita
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
