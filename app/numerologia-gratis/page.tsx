import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Numerología Gratis Online - Descubre tu Número de la Suerte",
  description: "Numerología gratis online. Calcula tu número de vida, destino y personalidad. Descubre qué revelan los números sobre tu futuro y compatibilidades.",
  keywords: [
    "numerologia gratis", "numero de la vida", "numerologia online gratis",
    "calculo numerologico", "numero del destino", "numerologia personalidad",
    "compatibilidad numerologica", "significado numeros", "numerologia pitagorica"
  ],
  openGraph: {
    title: "Numerología Gratis Online - Videntia",
    description: "Descubre los secretos de tu vida a través de los números. Cálculos numerológicos gratuitos.",
    url: "/numerologia-gratis",
  },
  alternates: {
    canonical: "/numerologia-gratis",
  },
};

const faqData = [
  {
    question: "¿Qué es la numerología y cómo funciona?",
    answer: "La numerología es el estudio de la influencia de los números en nuestras vidas. Cada número tiene vibraciones específicas que revelan aspectos de personalidad, destino y compatibilidades."
  },
  {
    question: "¿Cómo se calcula mi número de vida?",
    answer: "Se suma tu fecha de nacimiento completa hasta obtener un dígito. Por ejemplo: 15/03/1990 = 1+5+0+3+1+9+9+0 = 28 = 2+8 = 10 = 1+0 = 1."
  },
  {
    question: "¿La numerología es precisa para predecir el futuro?",
    answer: "La numerología revela tendencias y potenciales basados en las vibraciones numéricas. Es una herramienta de autoconocimiento y orientación, no de predicción absoluta."
  }
];

const masterNumbers = [
  { number: 11, title: "El Visionario", traits: ["Intuición elevada", "Liderazgo espiritual", "Sensibilidad extrema"] },
  { number: 22, title: "El Constructor", traits: ["Materialización de sueños", "Grandes proyectos", "Impacto mundial"] },
  { number: 33, title: "El Maestro", traits: ["Servicio a la humanidad", "Sanación", "Amor universal"] }
];

export default function NumerologiaGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Numerología Gratis Online",
    description: "Cálculos numerológicos gratuitos para descubrir tu número de vida y destino",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/numerologia-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-emerald-300 mb-6 font-cinzel">
              Numerología Gratis Online
            </h1>
            <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
              Descubre los secretos ocultos en tu fecha de nacimiento. Los números 
              revelan tu personalidad, destino y compatibilidades de manera sorprendente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/calculadora-numerologia" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🔢 Calcular Mi Numerología
              </Link>
              <Link 
                href="/compatibilidad-numerologica" 
                className="border-2 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                💕 Compatibilidad Numérica
              </Link>
            </div>
          </div>

          {/* What is Numerology */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              ¿Qué es la Numerología?
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">🔮 Ciencia Ancestral</h3>
                  <p className="text-emerald-200 mb-4">
                    La numerología es un sistema milenario que estudia la influencia 
                    de los números en nuestras vidas, basado en las enseñanzas de 
                    Pitágoras y sabios antiguos.
                  </p>
                  <ul className="text-sm text-teal-200 space-y-1">
                    <li>• Tradición de más de 2500 años</li>
                    <li>• Base matemática y espiritual</li>
                    <li>• Herramienta de autoconocimiento</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">🧮 Vibración Numérica</h3>
                  <p className="text-emerald-200 mb-4">
                    Cada número tiene una vibración específica que influye en 
                    tu personalidad, destino y decisiones de vida.
                  </p>
                  <ul className="text-sm text-teal-200 space-y-1">
                    <li>• Cada número es una energía</li>
                    <li>• Patrones revelan tendencias</li>
                    <li>• Guía para tomar decisiones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Number Meanings */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Significado de los Números del 1 al 9
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: 1, title: "El Líder", traits: ["Independencia", "Iniciativa", "Ambición"], color: "from-red-800 to-pink-800" },
                { num: 2, title: "El Cooperador", traits: ["Diplomacia", "Sensibilidad", "Colaboración"], color: "from-orange-800 to-red-800" },
                { num: 3, title: "El Creativo", traits: ["Comunicación", "Optimismo", "Expresión"], color: "from-yellow-800 to-orange-800" },
                { num: 4, title: "El Constructor", traits: ["Estabilidad", "Trabajo duro", "Organización"], color: "from-green-800 to-yellow-800" },
                { num: 5, title: "El Aventurero", traits: ["Libertad", "Curiosidad", "Versatilidad"], color: "from-blue-800 to-green-800" },
                { num: 6, title: "El Cuidador", traits: ["Responsabilidad", "Amor", "Servicio"], color: "from-indigo-800 to-blue-800" },
                { num: 7, title: "El Místico", traits: ["Espiritualidad", "Análisis", "Sabiduría"], color: "from-purple-800 to-indigo-800" },
                { num: 8, title: "El Materialista", traits: ["Poder", "Éxito material", "Autoridad"], color: "from-pink-800 to-purple-800" },
                { num: 9, title: "El Humanitario", traits: ["Compasión", "Servicio", "Sabiduría"], color: "from-teal-800 to-cyan-800" }
              ].map((item, index) => (
                <div key={index} className={`bg-gradient-to-br ${item.color} p-6 rounded-lg text-center`}>
                  <div className="text-4xl font-bold text-white mb-3">{item.num}</div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-3">{item.title}</h3>
                  <ul className="text-sm text-emerald-200 space-y-1">
                    {item.traits.map((trait, i) => (
                      <li key={i}>• {trait}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Master Numbers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Los Números Maestros
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {masterNumbers.map((master, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-emerald-300 mb-2">{master.number}</div>
                    <h3 className="text-xl font-bold text-emerald-300">{master.title}</h3>
                  </div>
                  <ul className="text-sm text-teal-200 space-y-2">
                    {master.traits.map((trait, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400">✨</span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-emerald-200 text-sm">
                Los números maestros (11, 22, 33) no se reducen y representan potenciales elevados de conciencia.
              </p>
            </div>
          </div>

          {/* Types of Calculations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Tipos de Cálculos Numerológicos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">🎯 Número de Vida</h3>
                <p className="text-emerald-200 mb-4">
                  Calculado con tu fecha de nacimiento completa. Revela tu propósito 
                  de vida y las lecciones principales que debes aprender.
                </p>
                <div className="bg-emerald-900/30 p-4 rounded text-sm">
                  <strong>Ejemplo:</strong> 15/03/1990<br/>
                  1+5+0+3+1+9+9+0 = 28<br/>
                  2+8 = 10 → 1+0 = <strong>1</strong>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">📝 Número del Destino</h3>
                <p className="text-emerald-200 mb-4">
                  Basado en las letras de tu nombre completo. Muestra tu misión 
                  y lo que viniste a aportar al mundo.
                </p>
                <div className="bg-emerald-900/30 p-4 rounded text-sm">
                  <strong>Ejemplo:</strong> MARIA<br/>
                  M(4)+A(1)+R(9)+I(9)+A(1) = 24<br/>
                  2+4 = <strong>6</strong>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">💫 Número de Personalidad</h3>
                <p className="text-emerald-200 mb-4">
                  Calculado con las consonantes de tu nombre. Representa cómo 
                  te ven los demás y tu imagen externa.
                </p>
                <div className="bg-emerald-900/30 p-4 rounded text-sm">
                  Solo consonantes del nombre completo<br/>
                  Revela tu <strong>máscara social</strong>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">❤️ Número del Alma</h3>
                <p className="text-emerald-200 mb-4">
                  Calculado con las vocales de tu nombre. Revela tus deseos 
                  más profundos y motivaciones internas.
                </p>
                <div className="bg-emerald-900/30 p-4 rounded text-sm">
                  Solo vocales del nombre completo<br/>
                  Muestra tu <strong>yo interior</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Calculator */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Calculadora Rápida
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600">
              <div className="text-center mb-6">
                <p className="text-emerald-200 mb-4">
                  Ingresa tu fecha de nacimiento para calcular tu Número de Vida instantáneamente:
                </p>
                <div className="flex justify-center gap-4 mb-6">
                  <input 
                    type="number" 
                    placeholder="Día" 
                    className="w-20 px-3 py-2 bg-slate-700 border border-emerald-600 rounded text-center text-emerald-300"
                    min="1" max="31"
                  />
                  <input 
                    type="number" 
                    placeholder="Mes" 
                    className="w-20 px-3 py-2 bg-slate-700 border border-emerald-600 rounded text-center text-emerald-300"
                    min="1" max="12"
                  />
                  <input 
                    type="number" 
                    placeholder="Año" 
                    className="w-24 px-3 py-2 bg-slate-700 border border-emerald-600 rounded text-center text-emerald-300"
                    min="1900" max="2024"
                  />
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  🔢 Calcular Ahora
                </button>
              </div>
              <div className="text-center text-sm text-teal-200">
                <p>Para cálculos completos y interpretaciones detalladas, utiliza nuestra calculadora avanzada.</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Beneficios de la Numerología
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Autoconocimiento Profundo</h3>
                    <p className="text-emerald-200 text-sm">
                      Descubre aspectos ocultos de tu personalidad y comprende 
                      tus patrones de comportamiento.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl">🗺️</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Orientación de Vida</h3>
                    <p className="text-emerald-200 text-sm">
                      Encuentra claridad sobre tu propósito y las decisiones 
                      más alineadas con tu esencia.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Timing Perfecto</h3>
                    <p className="text-emerald-200 text-sm">
                      Identifica los momentos más favorables para iniciar 
                      proyectos o tomar decisiones importantes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-2xl">💕</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Compatibilidades</h3>
                    <p className="text-emerald-200 text-sm">
                      Comprende mejor tus relaciones y encuentra personas 
                      que complementen tu energía numérica.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Carrera Profesional</h3>
                    <p className="text-emerald-200 text-sm">
                      Descubre qué profesiones y actividades están más 
                      alineadas con tu número de vida.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl">🌟</div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Desarrollo Personal</h3>
                    <p className="text-emerald-200 text-sm">
                      Identifica áreas de crecimiento y potenciales que 
                      puedes desarrollar en tu vida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Preguntas Frecuentes sobre Numerología
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-300 mb-3">{faq.question}</h3>
                  <p className="text-emerald-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Servicios Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block text-center">
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Tarot Numerológico</h3>
                <p className="text-emerald-200 text-sm">Combina tarot con numerología para mayor precisión</p>
              </Link>
              <Link href="/horoscopo-diario-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Astrología Numérica</h3>
                <p className="text-emerald-200 text-sm">Análisis conjunto de números y planetas</p>
              </Link>
              <Link href="/lectura-tarot-amor-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block text-center">
                <div className="text-3xl mb-3">💕</div>
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Amor Numérico</h3>
                <p className="text-emerald-200 text-sm">Compatibilidad romántica por números</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-emerald-800 to-teal-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-emerald-300 mb-4">
              Los Números Revelan tu Destino
            </h2>
            <p className="text-xl text-emerald-200 mb-6">
              Descubre qué secretos esconde tu fecha de nacimiento y tu nombre.
            </p>
            <Link 
              href="/calculadora-numerologia" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🔢 Calcular Mi Numerología Completa
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
