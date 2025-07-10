import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tirada 3 Cartas Gratis - Pasado Presente Futuro | Videntia",
  description: "Tirada de 3 cartas gratis online. Descubre tu pasado, presente y futuro con esta consulta rápida de tarot. Respuestas inmediatas sin registro.",
  keywords: [
    "tirada 3 cartas gratis", "pasado presente futuro tarot", "consulta rapida tarot",
    "3 cartas gratis online", "tirada simple gratis", "tarot rapido gratis",
    "lectura 3 cartas", "consulta express tarot", "tarot inmediato gratis"
  ],
  openGraph: {
    title: "Tirada 3 Cartas Gratis - Videntia",
    description: "Consulta rápida de tarot con 3 cartas. Conoce tu pasado, presente y futuro gratuitamente.",
    url: "/tirada-3-cartas-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/tirada-3-cartas-gratis"
  },
};

const faqData = [
  {
    question: "¿Qué revela la tirada de 3 cartas?",
    answer: "Esta tirada clásica revela las influencias del pasado que te afectan, tu situación actual y las tendencias futuras basadas en tu energía presente."
  },
  {
    question: "¿Es suficiente una tirada de 3 cartas para tomar decisiones?",
    answer: "La tirada de 3 cartas ofrece una visión general excelente. Para decisiones importantes, recomendamos complementar con tiradas más detalladas."
  },
  {
    question: "¿Puedo hacer varias tiradas de 3 cartas el mismo día?",
    answer: "Sí, puedes realizarlas cuando necesites claridad. Recomendamos esperar al menos unas horas entre consultas sobre el mismo tema."
  }
];

export default function Tirada3CartasGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Tirada 3 Cartas Gratis",
    description: "Consulta rápida de tarot con 3 cartas: pasado, presente y futuro",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/tirada-3-cartas-gratis"
  });

  const faqSchema = structuredDataTemplates.faq(faqData);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-indigo-300 mb-6 font-cinzel">
              Tirada 3 Cartas Gratis
            </h1>
            <p className="text-xl text-indigo-200 mb-8 leading-relaxed">
              La consulta más popular del tarot. Descubre tu pasado, presente y futuro 
              en segundos con esta tirada clásica completamente gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/lecturas/tres-cartas" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🔮 Tirada 3 Cartas Ahora
              </Link>
              <Link 
                href="/consulta-tarot-gratis" 
                className="border-2 border-indigo-400 hover:bg-indigo-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🌟 Otras Consultas Gratis
              </Link>
            </div>
          </div>

          {/* How it Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              Cómo Funciona la Tirada de 3 Cartas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-slate-800/50 p-8 rounded-lg border border-indigo-600 mb-4">
                  <div className="text-6xl mb-4">🕰️</div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">1. PASADO</h3>
                  <p className="text-indigo-200">
                    La primera carta revela las influencias del pasado que siguen 
                    afectando tu situación actual.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-800/50 p-8 rounded-lg border border-indigo-600 mb-4">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">2. PRESENTE</h3>
                  <p className="text-indigo-200">
                    La segunda carta muestra tu situación actual y las energías 
                    que te rodean en este momento.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-800/50 p-8 rounded-lg border border-indigo-600 mb-4">
                  <div className="text-6xl mb-4">🔮</div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">3. FUTURO</h3>
                  <p className="text-indigo-200">
                    La tercera carta indica las tendencias futuras basadas en 
                    tu energía y decisiones actuales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              ¿Por Qué Elegir la Tirada de 3 Cartas?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">⚡ Rápida y Efectiva</h3>
                <p className="text-indigo-200 mb-4">
                  Obtén respuestas claras en menos de 5 minutos. Perfecta para consultas rápidas 
                  cuando necesitas orientación inmediata.
                </p>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Consulta express</li>
                  <li>• Sin complicaciones</li>
                  <li>• Resultados inmediatos</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">🎯 Enfoque Preciso</h3>
                <p className="text-indigo-200 mb-4">
                  Concentra la energía en los aspectos más importantes: lo que fue, 
                  lo que es y lo que será.
                </p>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Visión temporal completa</li>
                  <li>• Información esencial</li>
                  <li>• Fácil interpretación</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">🔄 Versatilidad Total</h3>
                <p className="text-indigo-200 mb-4">
                  Funciona para cualquier pregunta: amor, trabajo, salud, dinero, 
                  decisiones personales y más.
                </p>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Todos los temas</li>
                  <li>• Cualquier situación</li>
                  <li>• Adaptable a tu necesidad</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">💎 Tradición Milenaria</h3>
                <p className="text-indigo-200 mb-4">
                  La tirada de 3 cartas es una de las más antiguas y confiables 
                  del tarot, usada por generaciones.
                </p>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Método probado</li>
                  <li>• Alta precisión</li>
                  <li>• Sabiduría ancestral</li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              Cuándo Usar la Tirada de 3 Cartas
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-indigo-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">Situaciones Ideales</h3>
                  <ul className="space-y-3 text-indigo-200">
                    <li>🤔 <strong>Decisiones rápidas:</strong> Cuando necesitas orientación inmediata</li>
                    <li>📊 <strong>Visión general:</strong> Para entender una situación completa</li>
                    <li>🔄 <strong>Transiciones:</strong> En momentos de cambio o incertidumbre</li>
                    <li>💭 <strong>Reflexión diaria:</strong> Como guía para el día o la semana</li>
                    <li>🎯 <strong>Enfoque específico:</strong> Para un tema particular que te preocupa</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">Preguntas Efectivas</h3>
                  <ul className="space-y-3 text-indigo-200">
                    <li>💕 &quot;¿Cómo evoluciona mi relación?&quot;</li>
                    <li>💼 &quot;¿Qué me espera en mi trabajo?&quot;</li>
                    <li>🏠 &quot;¿Es buen momento para este cambio?&quot;</li>
                    <li>💰 &quot;¿Cómo mejora mi situación financiera?&quot;</li>
                    <li>🌟 &quot;¿Qué necesito saber hoy?&quot;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              Consejos para tu Tirada de 3 Cartas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-800 to-purple-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-3">Preparación Mental</h3>
                <p className="text-indigo-200 text-sm">
                  Toma 3 respiraciones profundas y formula tu pregunta con claridad 
                  antes de comenzar.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-800 to-purple-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-3">Intuición Activa</h3>
                <p className="text-indigo-200 text-sm">
                  Observa tu primera reacción a cada carta. Tu intuición inicial 
                  suele ser la más acertada.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-800 to-purple-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-3">Registro Personal</h3>
                <p className="text-indigo-200 text-sm">
                  Anota los resultados para poder revisarlos más tarde y ver 
                  cómo se cumplen las predicciones.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600">
                  <h3 className="text-xl font-bold text-indigo-300 mb-3">{faq.question}</h3>
                  <p className="text-indigo-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8 text-center">
              Otras Consultas Populares
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/tarot-del-si-o-no" className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600 hover:border-indigo-400 transition-colors block text-center">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-2">Tarot Sí o No</h3>
                <p className="text-indigo-200 text-sm">Respuestas directas para preguntas específicas</p>
              </Link>
              <Link href="/lectura-tarot-amor-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600 hover:border-indigo-400 transition-colors block text-center">
                <div className="text-3xl mb-3">💕</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-2">Tarot del Amor</h3>
                <p className="text-indigo-200 text-sm">Especializado en temas románticos y de pareja</p>
              </Link>
              <Link href="/videncia-online-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-indigo-600 hover:border-indigo-400 transition-colors block text-center">
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="text-lg font-bold text-indigo-300 mb-2">Videncia Completa</h3>
                <p className="text-indigo-200 text-sm">Consulta integral de todos los aspectos</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-800 to-purple-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-indigo-300 mb-4">
              Tu Pasado, Presente y Futuro te Esperan
            </h2>
            <p className="text-xl text-indigo-200 mb-6">
              Descubre qué te revelan las cartas en esta consulta clásica del tarot.
            </p>
            <Link 
              href="/lecturas/tres-cartas" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🔮 Hacer Tirada de 3 Cartas Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
