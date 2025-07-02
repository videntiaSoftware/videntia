import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Significado Completo de los 22 Arcanos Mayores del Tarot",
  description: "Guía detallada del significado de los 22 Arcanos Mayores del tarot. Simbolismo, interpretaciones en amor, trabajo y dinero. El Loco, El Mago, La Muerte y más.",
  keywords: [
    "arcanos mayores significado", "cartas tarot mayores", "el loco tarot", "el mago tarot",
    "la muerte tarot", "el sol tarot", "la luna tarot", "significado cartas tarot",
    "interpretacion arcanos mayores", "simbolismo tarot", "guia arcanos mayores"
  ],
  openGraph: {
    title: "Significado de los 22 Arcanos Mayores del Tarot",
    description: "Guía completa del simbolismo y significado de todos los Arcanos Mayores del tarot.",
    url: "/blog/significado-completo-arcanos-mayores"
  },
  alternates: {
    canonical: "/blog/significado-completo-arcanos-mayores"
  }
};

const arcanosMayoresDestacados = [
  {
    numero: 0,
    nombre: "El Loco",
    emoji: "🃏",
    palabrasClave: ["Nuevos comienzos", "Espontaneidad", "Inocencia", "Aventura"],
    significadoGeneral: "Representa el inicio de un viaje espiritual, la confianza en el universo y la disposición a emprender nuevas experiencias sin miedo.",
    amor: "Nueva relación llena de posibilidades, amor puro e inocente, necesidad de libertad en el amor.",
    trabajo: "Cambio de carrera, emprender un nuevo proyecto, tomar riesgos calculados.",
    dinero: "Inversiones arriesgadas, gastos impulsivos, nueva fuente de ingresos inesperada."
  },
  {
    numero: 13,
    nombre: "La Muerte",
    emoji: "💀",
    palabrasClave: ["Transformación", "Fin de ciclo", "Renacimiento", "Cambio profundo"],
    significadoGeneral: "Simboliza la transformación profunda, el fin de una etapa y el renacimiento hacia algo nuevo y mejor.",
    amor: "Fin de una relación, transformación del amor, muerte del ego en pareja.",
    trabajo: "Cambio radical de carrera, fin de un trabajo, transformación profesional.",
    dinero: "Pérdida financiera que lleva a renovación, cambio en la filosofía del dinero."
  },
  {
    numero: 19,
    nombre: "El Sol",
    emoji: "☀️",
    palabrasClave: ["Alegría", "Éxito", "Vitalidad", "Claridad"],
    significadoGeneral: "Representa la alegría pura, el éxito, la claridad mental y la energía vital radiante.",
    amor: "Amor feliz y duradero, matrimonio exitoso, alegría en las relaciones.",
    trabajo: "Éxito profesional, reconocimiento, trabajo que genera alegría.",
    dinero: "Abundancia financiera, inversiones exitosas, generosidad."
  },
  {
    numero: 21,
    nombre: "El Mundo",
    emoji: "🌍",
    palabrasClave: ["Completitud", "Logro", "Realización", "Totalidad"],
    significadoGeneral: "Simboliza la completitud, el logro total de objetivos y la realización de todo el potencial.",
    amor: "Amor completo y realizado, matrimonio perfecto, alma gemela encontrada.",
    trabajo: "Éxito total en la carrera, reconocimiento mundial, maestría profesional.",
    dinero: "Riqueza completa, independencia financiera, abundancia total."
  }
];

export default function SignificadoArcanosMayores() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/blog" className="text-amber-400 hover:text-amber-300 mb-4 inline-block">
              ← Volver al Blog
            </Link>
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Significado de los 22 Arcanos Mayores
            </h1>
            <div className="flex items-center justify-center gap-4 text-purple-300 text-sm mb-6">
              <span>📅 15 minutos de lectura</span>
              <span>•</span>
              <span>🎴 Cartas del Tarot</span>
            </div>
            <p className="text-xl text-purple-200 leading-relaxed">
              Los 22 Arcanos Mayores representan el viaje del alma a través de las grandes lecciones de la vida. 
              Descubre el significado profundo de cada carta y cómo interpretarlas en tus lecturas.
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-6">
              ¿Qué son los Arcanos Mayores?
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 mb-8">
              <p className="text-purple-200 mb-4">
                Los Arcanos Mayores son las 22 cartas más importantes del tarot, numeradas del 0 al 21. 
                Representan arquetipos universales y las grandes lecciones espirituales que todos debemos aprender.
              </p>
              <p className="text-purple-200">
                Cada carta cuenta una historia y cuando aparecen en una lectura, indican eventos significativos, 
                lecciones importantes o puntos de inflexión en la vida del consultante.
              </p>
            </div>
          </div>

          {/* Featured Arcanos */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Los Arcanos Más Importantes
            </h2>
            <div className="grid gap-8">
              {arcanosMayoresDestacados.map((arcano, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <div className="flex items-start gap-6">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{arcano.emoji}</div>
                      <div className="bg-amber-600 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                        {arcano.numero}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-amber-300 mb-3">{arcano.nombre}</h3>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {arcano.palabrasClave.map((palabra, idx) => (
                            <span key={idx} className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                              {palabra}
                            </span>
                          ))}
                        </div>
                        <p className="text-purple-200 mb-4">{arcano.significadoGeneral}</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-red-900/30 p-3 rounded-lg">
                          <h4 className="font-bold text-red-300 mb-2">💕 Amor</h4>
                          <p className="text-red-200 text-sm">{arcano.amor}</p>
                        </div>
                        <div className="bg-blue-900/30 p-3 rounded-lg">
                          <h4 className="font-bold text-blue-300 mb-2">💼 Trabajo</h4>
                          <p className="text-blue-200 text-sm">{arcano.trabajo}</p>
                        </div>
                        <div className="bg-green-900/30 p-3 rounded-lg">
                          <h4 className="font-bold text-green-300 mb-2">💰 Dinero</h4>
                          <p className="text-green-200 text-sm">{arcano.dinero}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete List */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Lista Completa de los 22 Arcanos Mayores
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "0 - El Loco 🃏", "1 - El Mago 🎩", "2 - La Sacerdotisa 🌙", "3 - La Emperatriz 👸",
                  "4 - El Emperador 👑", "5 - El Hierofante ⛪", "6 - Los Enamorados 💕", "7 - El Carro 🏇",
                  "8 - La Fuerza 🦁", "9 - El Ermitaño 🔦", "10 - Rueda de la Fortuna 🎡", "11 - La Justicia ⚖️",
                  "12 - El Colgado 🙃", "13 - La Muerte 💀", "14 - La Templanza 🍷", "15 - El Diablo 😈",
                  "16 - La Torre ⚡", "17 - La Estrella ⭐", "18 - La Luna 🌙", "19 - El Sol ☀️",
                  "20 - El Juicio 📯", "21 - El Mundo 🌍"
                ].map((arcano, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-purple-900/30 rounded transition-colors">
                    <span className="text-purple-200">{arcano}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              ¿Quieres Practicar con los Arcanos Mayores?
            </h2>
            <p className="text-xl text-purple-200 mb-6">
              Prueba nuestras lecturas gratuitas y descubre qué Arcanos aparecen en tu tirada.
            </p>
            <Link 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🎴 Hacer Lectura Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
