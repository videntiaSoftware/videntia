import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lectura Tarot Amor Gratis - Tiradas Románticas Online 24/7",
  description: "Lectura tarot amor gratis sin registro. Descubre tu futuro romántico, compatibilidad de pareja y consejos de amor. Tiradas especializadas en relaciones.",
  keywords: [
    "lectura tarot amor gratis", "tarot amor gratis online", "consulta amor gratis", 
    "tarot romántico gratis", "tirada amor gratuita", "videncia amor sin costo",
    "cartas amor gratis", "tarot pareja gratis", "lectura romántica gratuita"
  ],
  openGraph: {
    title: "Lectura Tarot Amor Gratis - Videntia",
    description: "Descubre tu futuro romántico con nuestras lecturas de tarot de amor gratuitas.",
    url: "/lectura-tarot-amor-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/lectura-tarot-amor-gratis"
  },
};

const faqData = [
  {
    question: "¿Las lecturas de tarot de amor gratis son precisas?",
    answer: "Sí, nuestras lecturas de amor utilizan métodos tradicionales y cartas especializadas en temas románticos, ofreciendo la misma precisión que lecturas pagadas."
  },
  {
    question: "¿Qué tipo de preguntas de amor puedo hacer?",
    answer: "Puedes consultar sobre futuro romántico, compatibilidad, reconciliación, alma gemela, problemas de pareja y consejos para mejorar tu vida amorosa."
  },
  {
    question: "¿Cada cuánto puedo hacer una consulta de amor gratis?",
    answer: "No hay límites. Puedes realizar consultas de tarot de amor gratis tantas veces como necesites, las 24 horas del día."
  }
];

export default function LecturaTarotAmorGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Lectura Tarot Amor Gratis",
    description: "Lecturas especializadas en amor y relaciones, completamente gratuitas",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/lectura-tarot-amor-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-rose-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-rose-300 mb-6 font-cinzel">
              Lectura Tarot Amor Gratis
            </h1>
            <p className="text-xl text-rose-200 mb-8 leading-relaxed">
              Descubre los secretos de tu corazón con lecturas especializadas en amor. 
              Encuentra respuestas sobre tu futuro romántico sin costo alguno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/lecturas/amor" 
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                💕 Consulta de Amor Gratis
              </Link>
              <Link 
                href="/tirada-cartas-amor-gratis" 
                className="border-2 border-rose-400 hover:bg-rose-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🌹 Tirada Especial Amor
              </Link>
            </div>
          </div>

          {/* Love Reading Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Tipos de Lecturas de Amor Disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "💑", 
                  title: "Compatibilidad de Pareja", 
                  desc: "Descubre qué tan compatible eres con tu pareja actual o potencial",
                  features: ["Análisis de personalidades", "Puntos fuertes de la relación", "Desafíos a superar"]
                },
                { 
                  icon: "💘", 
                  title: "Futuro Romántico", 
                  desc: "Conoce qué te depara el destino en el amor en los próximos meses",
                  features: ["Nuevas oportunidades", "Encuentros importantes", "Evolución sentimental"]
                },
                { 
                  icon: "💔", 
                  title: "Reconciliación", 
                  desc: "Consulta sobre la posibilidad de reconciliarte con un ex pareja",
                  features: ["Probabilidades reales", "Pasos a seguir", "Momentos favorables"]
                },
                { 
                  icon: "✨", 
                  title: "Alma Gemela", 
                  desc: "Encuentra pistas sobre cuándo y cómo conocerás a tu alma gemela",
                  features: ["Características de tu pareja ideal", "Lugar de encuentro", "Señales a observar"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-rose-300 mb-3">{item.title}</h3>
                  <p className="text-rose-200 mb-4">{item.desc}</p>
                  <ul className="text-sm text-purple-200 space-y-1">
                    {item.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Special Love Spreads */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Tiradas Especiales para el Amor
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-rose-800 to-purple-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-rose-300 mb-4">🌹 Cruz del Amor</h3>
                <p className="text-rose-200 mb-4">
                  Tirada completa que analiza todos los aspectos de tu vida romántica
                </p>
                <Link href="/lecturas/amor" className="text-rose-400 hover:text-rose-300 font-semibold">
                  Probar Gratis →
                </Link>
              </div>
              <div className="bg-gradient-to-br from-rose-800 to-purple-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-rose-300 mb-4">💕 Dos Corazones</h3>
                <p className="text-rose-200 mb-4">
                  Perfecta para evaluar la relación entre dos personas específicas
                </p>
                <Link href="/lecturas/amor" className="text-rose-400 hover:text-rose-300 font-semibold">
                  Consultar Gratis →
                </Link>
              </div>
              <div className="bg-gradient-to-br from-rose-800 to-purple-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-rose-300 mb-4">💘 Camino del Corazón</h3>
                <p className="text-rose-200 mb-4">
                  Te muestra el camino hacia el amor verdadero y duradero
                </p>
                <Link href="/lecturas/amor" className="text-rose-400 hover:text-rose-300 font-semibold">
                  Descubrir Gratis →
                </Link>
              </div>
            </div>
          </div>

          {/* Love Advice */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Consejos para Potenciar tu Energía Amorosa
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-rose-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">Antes de la Consulta</h3>
                  <ul className="space-y-2 text-rose-200">
                    <li>🕯️ Enciende una vela rosa o roja</li>
                    <li>🌹 Ten cerca una flor o cuarzo rosa</li>
                    <li>💭 Medita 5 minutos sobre tu pregunta</li>
                    <li>❤️ Abre tu corazón a las respuestas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">Durante la Lectura</h3>
                  <ul className="space-y-2 text-rose-200">
                    <li>🧘 Mantén una mente abierta</li>
                    <li>💫 Confía en tu intuición</li>
                    <li>📝 Anota los mensajes importantes</li>
                    <li>🌟 Busca patrones en las cartas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Preguntas Frecuentes sobre Tarot de Amor
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-rose-600">
                  <h3 className="text-xl font-bold text-rose-300 mb-3">{faq.question}</h3>
                  <p className="text-rose-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Contenido Relacionado
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/significado-completo-arcanos-mayores" className="bg-slate-800/50 p-6 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors block">
                <h3 className="text-lg font-bold text-rose-300 mb-2">Arcanos del Amor</h3>
                <p className="text-rose-200 text-sm">Descubre qué cartas son más favorables para el amor</p>
              </Link>
              <Link href="/guias/como-interpretar-tarot" className="bg-slate-800/50 p-6 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors block">
                <h3 className="text-lg font-bold text-rose-300 mb-2">Interpretación Romántica</h3>
                <p className="text-rose-200 text-sm">Aprende a leer las cartas en contexto amoroso</p>
              </Link>
              <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors block">
                <h3 className="text-lg font-bold text-rose-300 mb-2">Consulta General</h3>
                <p className="text-rose-200 text-sm">Explora otros aspectos de tu vida</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-rose-800 to-purple-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-rose-300 mb-4">
              Tu Corazón Tiene las Respuestas
            </h2>
            <p className="text-xl text-rose-200 mb-6">
              Descubre qué te depara el destino en el amor. Consulta ahora sin costo.
            </p>
            <Link 
              href="/lecturas/amor" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              💕 Iniciar Lectura de Amor Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
