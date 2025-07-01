import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
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
    url: "/blog/significado-completo-arcanos-mayores",
  },
  alternates: {
    canonical: "/blog/significado-completo-arcanos-mayores",
  },
};

const arcanosMayores = [
  {
    numero: 0,
    nombre: "El Loco",
    emoji: "🃏",
    palabrasClave: ["Nuevos comienzos", "Espontaneidad", "Inocencia", "Aventura"],
    significadoGeneral: "Representa el inicio de un viaje espiritual, la confianza en el universo y la disposición a emprender nuevas experiencias sin miedo.",
    amor: "Nueva relación llena de posibilidades, amor puro e inocente, necesidad de libertad en el amor.",
    trabajo: "Cambio de carrera, emprender un nuevo proyecto, tomar riesgos calculados.",
    dinero: "Inversiones arriesgadas, gastos impulsivos, nueva fuente de ingresos inesperada.",
    reverso: "Imprudencia, falta de dirección, decisiones precipitadas, ingenuidad excesiva."
  },
  {
    numero: 1,
    nombre: "El Mago",
    emoji: "🎩",
    palabrasClave: ["Manifestación", "Poder personal", "Habilidad", "Comunicación"],
    significadoGeneral: "Simboliza el poder de manifestar deseos en la realidad, la habilidad para utilizar todos los recursos disponibles.",
    amor: "Atracción magnética, poder de seducción, relación que se manifiesta por voluntad propia.",
    trabajo: "Liderazgo, habilidades comunicativas, éxito en presentaciones, poder de persuasión.",
    dinero: "Capacidad de generar riqueza, inversiones exitosas, múltiples fuentes de ingresos.",
    reverso: "Manipulación, charlatanería, uso del poder para fines egoístas, falta de concentración."
  },
  {
    numero: 2,
    nombre: "La Sacerdotisa",
    emoji: "🌙",
    palabrasClave: ["Intuición", "Misterio", "Sabiduría interior", "Subconsciente"],
    significadoGeneral: "Representa la sabiduría femenina, la intuición profunda y el acceso a conocimientos ocultos.",
    amor: "Amor platónico, conexión espiritual profunda, necesidad de paciencia en el amor.",
    trabajo: "Trabajos relacionados con la sanación, la educación o la espiritualidad, confiar en la intuición.",
    dinero: "Inversiones basadas en la intuición, ingresos pasivos, paciencia con las finanzas.",
    reverso: "Secretos revelados, falta de intuición, superficialidad, conocimiento bloqueado."
  },
  {
    numero: 3,
    nombre: "La Emperatriz",
    emoji: "👸",
    palabrasClave: ["Feminidad", "Creatividad", "Abundancia", "Maternidad"],
    significadoGeneral: "Simboliza la abundancia, la creatividad y el poder femenino de crear y nutrir.",
    amor: "Amor maternal, relación fértil, posibilidad de matrimonio o embarazo.",
    trabajo: "Proyectos creativos, trabajos relacionados con cuidado o estética, colaboración fructífera.",
    dinero: "Abundancia material, inversiones en arte o belleza, gastos en lujos.",
    reverso: "Esterilidad, bloqueo creativo, vanidad excesiva, dependencia económica."
  },
  {
    numero: 4,
    nombre: "El Emperador",
    emoji: "👑",
    palabrasClave: ["Autoridad", "Estructura", "Liderazgo", "Poder paternal"],
    significadoGeneral: "Representa la autoridad, el liderazgo responsable y la estructura necesaria para el éxito.",
    amor: "Figura paterna en la relación, estabilidad, compromiso serio, protección.",
    trabajo: "Posición de liderazgo, estructura organizacional, autoridad y respeto.",
    dinero: "Inversiones seguras, planificación financiera, estabilidad económica.",
    reverso: "Autoritarismo, rigidez excesiva, abuso de poder, falta de flexibilidad."
  },
  {
    numero: 5,
    nombre: "El Hierofante",
    emoji: "⛪",
    palabrasClave: ["Tradición", "Enseñanza", "Espiritualidad", "Conformidad"],
    significadoGeneral: "Simboliza la sabiduría tradicional, la educación espiritual y la conformidad con normas establecidas.",
    amor: "Matrimonio tradicional, bendición familiar, valores compartidos.",
    trabajo: "Educación, religión, trabajos tradicionales, seguir procedimientos establecidos.",
    dinero: "Inversiones conservadoras, seguir consejos financieros tradicionales.",
    reverso: "Rebeldía contra la tradición, dogmatismo, educación limitada."
  },
  {
    numero: 6,
    nombre: "Los Enamorados",
    emoji: "💕",
    palabrasClave: ["Amor", "Elección", "Unión", "Armonía"],
    significadoGeneral: "Representa las decisiones importantes del corazón, el amor verdadero y la unión de opuestos.",
    amor: "Amor verdadero, decisión importante en el amor, alma gemela, armonía perfecta.",
    trabajo: "Colaboración perfecta, decisión laboral importante, trabajo en equipo.",
    dinero: "Sociedad financiera exitosa, inversiones conjuntas, decisiones monetarias importantes.",
    reverso: "Desamor, decisiones erróneas, conflicto en relaciones, desharmonía."
  },
  {
    numero: 7,
    nombre: "El Carro",
    emoji: "🏇",
    palabrasClave: ["Victoria", "Determinación", "Control", "Progreso"],
    significadoGeneral: "Simboliza el triunfo a través de la determinación, el control de las circunstancias y el progreso rápido.",
    amor: "Conquista amorosa, control en la relación, viajes románticos.",
    trabajo: "Éxito profesional, promoción, liderazgo efectivo, logro de objetivos.",
    dinero: "Ganancias rápidas, control sobre las finanzas, inversiones exitosas.",
    reverso: "Falta de control, fracaso, obstáculos en el progreso, agresividad excesiva."
  },
  {
    numero: 8,
    nombre: "La Fuerza",
    emoji: "🦁",
    palabrasClave: ["Coraje", "Paciencia", "Autocontrol", "Poder interior"],
    significadoGeneral: "Representa el poder interior, el coraje para enfrentar desafíos y la capacidad de domar impulsos primitivos.",
    amor: "Amor que supera obstáculos, paciencia en las relaciones, fortaleza emocional.",
    trabajo: "Superar desafíos laborales, liderazgo carismático, trabajo que requiere paciencia.",
    dinero: "Disciplina financiera, inversiones a largo plazo, control de gastos impulsivos.",
    reverso: "Debilidad, cobardía, falta de autocontrol, agresividad."
  },
  {
    numero: 9,
    nombre: "El Ermitaño",
    emoji: "🔦",
    palabrasClave: ["Introspección", "Sabiduría", "Búsqueda interior", "Guía"],
    significadoGeneral: "Simboliza la búsqueda interior, la sabiduría ganada a través de la experiencia y la necesidad de solitud.",
    amor: "Período de soledad, reflexión sobre relaciones pasadas, amor maduro.",
    trabajo: "Trabajos solitarios, consultoría, enseñanza, búsqueda de propósito profesional.",
    dinero: "Ahorro, inversiones prudentes, búsqueda de seguridad financiera.",
    reverso: "Aislamiento excesivo, negativa a buscar ayuda, soledad no deseada."
  },
  {
    numero: 10,
    nombre: "La Rueda de la Fortuna",
    emoji: "🎡",
    palabrasClave: ["Destino", "Cambio", "Ciclos", "Oportunidad"],
    significadoGeneral: "Representa los ciclos de la vida, los cambios del destino y las oportunidades que llegan inesperadamente.",
    amor: "Cambio en el estado sentimental, encuentro fortuito, giro en la relación.",
    trabajo: "Cambio de suerte laboral, oportunidad inesperada, ciclo que termina.",
    dinero: "Cambio en la situación financiera, ganancia inesperada, inversión afortunada.",
    reverso: "Mala suerte temporal, resistencia al cambio, oportunidades perdidas."
  },
  {
    numero: 11,
    nombre: "La Justicia",
    emoji: "⚖️",
    palabrasClave: ["Equilibrio", "Verdad", "Responsabilidad", "Consecuencias"],
    significadoGeneral: "Simboliza el equilibrio, la verdad y las consecuencias justas de nuestras acciones.",
    amor: "Relación equilibrada, verdad en el amor, justicia en los sentimientos.",
    trabajo: "Asuntos legales, trabajos relacionados con justicia, equilibrio laboral.",
    dinero: "Deudas que se saldan, justicia financiera, inversiones éticas.",
    reverso: "Injusticia, desequilibrio, evitar responsabilidades, parcialidad."
  },
  {
    numero: 12,
    nombre: "El Colgado",
    emoji: "🙃",
    palabrasClave: ["Sacrificio", "Perspectiva", "Pausa", "Iluminación"],
    significadoGeneral: "Representa la necesidad de sacrificio, cambio de perspectiva y paciencia para obtener iluminación.",
    amor: "Sacrificio por amor, espera en las relaciones, nueva perspectiva del amor.",
    trabajo: "Pausa en la carrera, sacrificio profesional, cambio de perspectiva laboral.",
    dinero: "Sacrificio financiero temporal, inversión a largo plazo, paciencia con el dinero.",
    reverso: "Sacrificio inútil, victimización, negativa a cambiar perspectiva."
  }
];

export default function SignificadoArcanosM

import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
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
    url: "/blog/significado-completo-arcanos-mayores",
  },
  alternates: {
    canonical: "/blog/significado-completo-arcanos-mayores",
  },
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

export default function SignificadoArcanosM

ayores() {
  const articleSchema = structuredDataTemplates.article({
    title: "Significado Completo de los 22 Arcanos Mayores del Tarot",
    description: "Guía detallada del significado de los 22 Arcanos Mayores del tarot",
    author: "Videntia",
    publishDate: "2024-01-15",
    image: "/opengraph-image.png",
    url: "/blog/significado-completo-arcanos-mayores"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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

          {/* Journey of the Fool */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-6">
              El Viaje del Loco: Una Historia Espiritual
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-3">🌱 El Inicio (0-7)</h3>
                <p className="text-purple-200">
                  El viaje comienza con El Loco, representando el alma pura que se embarca en la aventura de la vida. 
                  Pasa por las primeras lecciones: el poder personal (El Mago), la sabiduría interior (La Sacerdotisa), 
                  la creatividad (La Emperatriz), la autoridad (El Emperador), la tradición (El Hierofante), 
                  el amor (Los Enamorados) y el triunfo (El Carro).
                </p>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-3">🌿 El Desarrollo (8-14)</h3>
                <p className="text-purple-200">
                  En esta etapa, el alma aprende sobre el poder interior (La Fuerza), la búsqueda de sabiduría (El Ermitaño), 
                  los ciclos del destino (Rueda de la Fortuna), el equilibrio (La Justicia), el sacrificio (El Colgado), 
                  la transformación (La Muerte) y la moderación (La Templanza).
                </p>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-3">🌸 La Culminación (15-21)</h3>
                <p className="text-purple-200">
                  La parte final del viaje incluye las pruebas más difíciles: las tentaciones (El Diablo), 
                  la destrucción necesaria (La Torre), la esperanza renovada (La Estrella), las ilusiones (La Luna), 
                  la iluminación (El Sol), el despertar (El Juicio) y finalmente, la realización total (El Mundo).
                </p>
              </div>
            </div>
          </div>

          {/* Tips for Reading */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-6">
              Consejos para Interpretar los Arcanos Mayores
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/30 p-6 rounded-lg border border-green-500">
                <h3 className="text-xl font-bold text-green-400 mb-4">✅ Mejores Prácticas</h3>
                <ul className="space-y-2 text-green-300">
                  <li>• Presta atención a la numerología de cada carta</li>
                  <li>• Considera el viaje del alma en la secuencia</li>
                  <li>• Observa los símbolos y colores en cada carta</li>
                  <li>• Conecta con la energía arquetípica</li>
                  <li>• Considera el contexto de la pregunta</li>
                </ul>
              </div>
              
              <div className="bg-amber-900/30 p-6 rounded-lg border border-amber-500">
                <h3 className="text-xl font-bold text-amber-400 mb-4">💡 Consejos Adicionales</h3>
                <ul className="space-y-2 text-amber-300">
                  <li>• Los Arcanos Mayores indican eventos importantes</li>
                  <li>• Múltiples Arcanos Mayores = momento crucial</li>
                  <li>• Considera las cartas invertidas con cuidado</li>
                  <li>• Relaciona cada carta con experiencias personales</li>
                  <li>• Medita sobre el simbolismo antes de interpretar</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Los 4 Palos del Tarot",
                  desc: "Comprende Copas, Espadas, Bastos y Oros",
                  link: "/blog/cuatro-palos-tarot-elementos",
                  icon: "🌊"
                },
                {
                  title: "Cómo Interpretar el Tarot",
                  desc: "Guía completa para principiantes",
                  link: "/guias/como-interpretar-tarot",
                  icon: "🔮"
                },
                {
                  title: "Spreads de Tarot Populares",
                  desc: "Las mejores tiradas para cada situación",
                  link: "/blog/spreads-tarot-mas-populares",
                  icon: "✨"
                }
              ].map((article, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-amber-400 transition-colors text-center">
                  <div className="text-4xl mb-4">{article.icon}</div>
                  <h3 className="text-lg font-bold text-amber-300 mb-3">{article.title}</h3>
                  <p className="text-purple-200 mb-4 text-sm">{article.desc}</p>
                  <Link href={article.link} className="text-amber-400 hover:text-amber-300 font-semibold">
                    Leer más →
                  </Link>
                </div>
              ))}
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
