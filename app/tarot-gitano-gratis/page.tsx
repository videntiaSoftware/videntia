import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot Gitano Gratis Online - Lectura Tradicional sin Costo",
  description: "Tarot gitano gratis con cartas tradicionales. Consulta online la sabiduría ancestral gitana. Lecturas auténticas basadas en tradiciones milenarias.",
  keywords: [
    "tarot gitano gratis", "cartas gitanas online", "lectura gitana gratis",
    "tarot tradicional gitano", "videncia gitana gratis", "consulta gitana online",
    "cartas romaní gratis", "tarot ancestral gitano", "sabiduría gitana tarot"
  ],
  openGraph: {
    title: "Tarot Gitano Gratis - Videntia",
    description: "Descubre la sabiduría ancestral gitana con lecturas de tarot tradicional completamente gratis.",
    url: "/tarot-gitano-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/tarot-gitano-gratis"
  },
};

const faqData = [
  {
    question: "¿Qué diferencia el tarot gitano del tarot tradicional?",
    answer: "El tarot gitano utiliza métodos de lectura ancestrales transmitidos por generaciones, con interpretaciones más intuitivas y conectadas con la naturaleza y los ciclos de la vida."
  },
  {
    question: "¿Las lecturas gitanas son más precisas?",
    answer: "La precisión depende de la conexión energética. El tarot gitano tiene una aproximación más holística, considerando aspectos espirituales y emocionales profundos."
  },
  {
    question: "¿Puedo hacer preguntas específicas al tarot gitano?",
    answer: "Sí, pero el tarot gitano tiende a dar respuestas más amplias y profundas, mostrando no solo el 'qué' sino también el 'por qué' y 'para qué' de las situaciones."
  }
];

export default function TarotGitanoGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Tarot Gitano Gratis",
    description: "Lecturas de tarot gitano tradicional con sabiduría ancestral",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/tarot-gitano-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-red-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Tarot Gitano Gratis
            </h1>
            <p className="text-xl text-amber-200 mb-8 leading-relaxed">
              Conecta con la sabiduría ancestral gitana. Descubre tu destino a través 
              de lecturas tradicionales que han guiado a las personas durante siglos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/lecturas/gitano" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🔮 Consulta Gitana Gratis
              </Link>
              <Link 
                href="/tirada-3-cartas-gratis" 
                className="border-2 border-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🌟 Tirada Tradicional
              </Link>
            </div>
          </div>

          {/* Gypsy Wisdom Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              La Sabiduría Milenaria Gitana
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-amber-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">🌙 Tradición Ancestral</h3>
                  <p className="text-amber-200 mb-4">
                    El pueblo gitano ha conservado durante milenios métodos únicos de lectura 
                    de cartas, transmitidos oralmente de generación en generación.
                  </p>
                  <ul className="text-sm text-orange-200 space-y-1">
                    <li>• Sabiduría transmitida por siglos</li>
                    <li>• Métodos preservados intactos</li>
                    <li>• Conexión profunda con lo espiritual</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">🔥 Intuición Pura</h3>
                  <p className="text-amber-200 mb-4">
                    Las lecturas gitanas priorizan la intuición y la conexión energética, 
                    ofreciendo perspectivas únicas y profundamente reveladoras.
                  </p>
                  <ul className="text-sm text-orange-200 space-y-1">
                    <li>• Lectura intuitiva y natural</li>
                    <li>• Conexión con energías ancestrales</li>
                    <li>• Interpretaciones holísticas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Gypsy Reading Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Tipos de Lecturas Gitanas Disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "🌟", 
                  title: "La Cruz Gitana", 
                  desc: "Lectura completa que revela todos los aspectos de tu vida",
                  features: ["Pasado y presente", "Obstáculos y ayudas", "Resultado final"]
                },
                { 
                  icon: "🔮", 
                  title: "El Camino del Destino", 
                  desc: "Muestra tu sendero de vida y las decisiones importantes",
                  features: ["Tu propósito de vida", "Desafíos por superar", "Oportunidades futuras"]
                },
                { 
                  icon: "🌙", 
                  title: "Los Secretos de la Luna", 
                  desc: "Lectura enfocada en intuición, emociones y mundo espiritual",
                  features: ["Mundo emocional", "Intuición y psique", "Energías ocultas"]
                },
                { 
                  icon: "⭐", 
                  title: "El Espejo del Alma", 
                  desc: "Reflexión profunda sobre tu ser interior y crecimiento personal",
                  features: ["Autoconocimiento", "Potencial oculto", "Crecimiento espiritual"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-amber-600 hover:border-amber-400 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{item.title}</h3>
                  <p className="text-amber-200 mb-4">{item.desc}</p>
                  <ul className="text-sm text-orange-200 space-y-1">
                    {item.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Gypsy Cards Meaning */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Las Cartas en la Tradición Gitana
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-800 to-red-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🃏 Arcanos Mayores</h3>
                <p className="text-amber-200 mb-4">
                  Representan las grandes lecciones de vida y los arquetipos universales
                </p>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• El Loco: Nuevos comienzos</li>
                  <li>• La Muerte: Transformación</li>
                  <li>• El Sol: Éxito y alegría</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-800 to-red-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🌟 Arcanos Menores</h3>
                <p className="text-amber-200 mb-4">
                  Detallan situaciones cotidianas y aspectos específicos de la vida
                </p>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• Copas: Emociones y amor</li>
                  <li>• Espadas: Mente y conflictos</li>
                  <li>• Oros: Dinero y material</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-800 to-red-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-300 mb-4">👑 Cartas de Corte</h3>
                <p className="text-amber-200 mb-4">
                  Representan personas y personalidades que influyen en tu vida
                </p>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• Reyes: Autoridad y poder</li>
                  <li>• Reinas: Intuición y sabiduría</li>
                  <li>• Caballeros: Acción y movimiento</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gypsy Rituals */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Rituales y Preparación Gitana
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-amber-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">🕯️ Antes de la Consulta</h3>
                  <ul className="space-y-3 text-amber-200">
                    <li>🌙 <strong>Conexión lunar:</strong> Consulta preferiblemente en luna creciente o llena</li>
                    <li>🕯️ <strong>Vela dorada:</strong> Enciende una vela de color dorado o amarillo</li>
                    <li>🧿 <strong>Protección:</strong> Visualiza una luz blanca protegiéndote</li>
                    <li>💭 <strong>Claridad mental:</strong> Medita 5 minutos sobre tu pregunta</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">🌟 Durante la Lectura</h3>
                  <ul className="space-y-3 text-amber-200">
                    <li>💫 <strong>Mente abierta:</strong> Recibe los mensajes sin prejuicios</li>
                    <li>🌊 <strong>Fluye con la energía:</strong> Deja que tu intuición te guíe</li>
                    <li>📝 <strong>Toma notas:</strong> Registra las sensaciones y mensajes</li>
                    <li>🙏 <strong>Gratitud:</strong> Agradece la sabiduría recibida</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Preguntas sobre el Tarot Gitano
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-amber-600">
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{faq.question}</h3>
                  <p className="text-amber-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Experiencias con el Tarot Gitano
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-600">
                <p className="text-amber-200 italic mb-4">
                  &quot;Las lecturas gitanas me conectaron con una sabiduría profunda que no encontré 
                  en otros tipos de tarot. Los mensajes son claros y transformadores.&quot;
                </p>
                <div className="text-amber-300 font-semibold">- María Elena, Buenos Aires</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-600">
                <p className="text-amber-200 italic mb-4">
                  &quot;La tradición gitana aporta una perspectiva única. Siento que las cartas 
                  hablan directamente a mi alma y me muestran caminos que no había considerado.&quot;
                </p>
                <div className="text-amber-300 font-semibold">- Carlos Roberto, Córdoba</div>
              </div>
            </div>
          </div>

          {/* Related Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Explora Más Sabiduría
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/significado-completo-arcanos-mayores" className="bg-slate-800/50 p-6 rounded-lg border border-amber-600 hover:border-amber-400 transition-colors block">
                <h3 className="text-lg font-bold text-amber-300 mb-2">Arcanos Mayores</h3>
                <p className="text-amber-200 text-sm">Descubre el significado profundo de cada carta mayor</p>
              </Link>
              <Link href="/guias/como-interpretar-tarot" className="bg-slate-800/50 p-6 rounded-lg border border-amber-600 hover:border-amber-400 transition-colors block">
                <h3 className="text-lg font-bold text-amber-300 mb-2">Interpretación Gitana</h3>
                <p className="text-amber-200 text-sm">Aprende los métodos ancestrales de lectura</p>
              </Link>
              <Link href="/lectura-tarot-amor-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-amber-600 hover:border-amber-400 transition-colors block">
                <h3 className="text-lg font-bold text-amber-300 mb-2">Amor Gitano</h3>
                <p className="text-amber-200 text-sm">Lecturas románticas con sabiduría ancestral</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-amber-800 to-red-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              Conecta con la Sabiduría Ancestral
            </h2>
            <p className="text-xl text-amber-200 mb-6">
              Deja que las cartas gitanas te revelen los secretos de tu destino.
            </p>
            <Link 
              href="/lecturas/gitano" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🔮 Iniciar Consulta Gitana Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
