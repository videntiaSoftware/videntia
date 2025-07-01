import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Interpretar el Tarot - Guía Completa para Principiantes",
  description: "Aprende a interpretar las cartas del tarot con nuestra guía completa. Significados, simbolismo y técnicas de lectura para principiantes y expertos.",
  keywords: [
    "como interpretar tarot", "guia tarot principiantes", "significado cartas tarot", 
    "aprender tarot", "interpretar cartas", "lectura tarot", "simbolismo tarot",
    "manual tarot", "curso tarot gratis", "tarot para principiantes"
  ],
  openGraph: {
    title: "Cómo Interpretar el Tarot - Guía Completa",
    description: "Guía paso a paso para aprender a interpretar las cartas del tarot desde cero.",
    url: "/guias/como-interpretar-tarot",
  },
  alternates: {
    canonical: "/guias/como-interpretar-tarot",
  },
};

export default function ComoInterpretarTarot() {
  const howToSchema = structuredDataTemplates.howTo({
    name: "Cómo Interpretar las Cartas del Tarot",
    description: "Guía completa para principiantes sobre interpretación del tarot",
    steps: [
      { name: "Conocer las cartas", text: "Familiarízate con los 78 arcanos y sus significados básicos" },
      { name: "Desarrollar intuición", text: "Conecta con tu intuición y energía interior" },
      { name: "Practicar regularmente", text: "Realiza lecturas diarias para desarrollar habilidad" },
      { name: "Estudiar simbolismo", text: "Profundiza en los símbolos y arquetipos del tarot" },
      { name: "Interpretar en contexto", text: "Conecta las cartas entre sí para crear narrativas" }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Cómo Interpretar el Tarot
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Guía completa para dominar el arte de la interpretación del tarot. 
              Desde los conceptos básicos hasta técnicas avanzadas.
            </p>
          </div>

          {/* Basic Foundation */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Fundamentos Básicos del Tarot
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🎴 Los 78 Arcanos</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-purple-200">22 Arcanos Mayores</h4>
                    <p className="text-purple-300 text-sm">Representan lecciones de vida importantes y arquetipos universales.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-200">56 Arcanos Menores</h4>
                    <p className="text-purple-300 text-sm">Situaciones cotidianas divididas en 4 palos: Copas, Espadas, Bastos y Oros.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🧠 Desarrollo Intuitivo</h3>
                <ul className="space-y-2 text-purple-200">
                  <li>• Confía en tu primera impresión</li>
                  <li>• Observa los símbolos que te llaman la atención</li>
                  <li>• Conecta con las emociones que despiertan las cartas</li>
                  <li>• Practica la meditación para desarrollar intuición</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Proceso de Interpretación Paso a Paso
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Observación Inicial",
                  content: "Mira la carta completa sin pensar en significados. ¿Qué sientes? ¿Qué colores dominan? ¿La imagen te transmite movimiento o calma?",
                  tips: ["Nota tu reacción emocional inmediata", "Observa los colores predominantes", "Identifica si la energía es activa o pasiva"]
                },
                {
                  step: 2,
                  title: "Análisis de Símbolos",
                  content: "Examina los símbolos específicos: números, elementos, personajes, objetos. Cada detalle tiene significado.",
                  tips: ["Números: representan etapas y energías", "Elementos: agua (emociones), fuego (acción), aire (mente), tierra (material)", "Personajes: aspectos de la personalidad"]
                },
                {
                  step: 3,
                  title: "Contexto de la Pregunta",
                  content: "Relaciona el significado de la carta con la pregunta específica. La misma carta puede tener interpretaciones diferentes según el contexto.",
                  tips: ["Considera el área de vida consultada", "Piensa en la situación actual del consultante", "Adapta el mensaje al momento presente"]
                },
                {
                  step: 4,
                  title: "Síntesis y Mensaje",
                  content: "Combina intuición, simbolismo y contexto para crear un mensaje coherente y útil.",
                  tips: ["Mantén el mensaje claro y comprensible", "Incluye orientación práctica", "Equilibra honestidad con esperanza"]
                }
              ].map((step, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-600 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-300 mb-3">{step.title}</h3>
                      <p className="text-purple-200 mb-4">{step.content}</p>
                      <div className="bg-purple-900/30 p-3 rounded-lg">
                        <h4 className="font-semibold text-amber-300 mb-2">💡 Tips:</h4>
                        <ul className="space-y-1">
                          {step.tips.map((tip, idx) => (
                            <li key={idx} className="text-purple-300 text-sm flex items-start gap-2">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Meanings Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Significados Principales por Palo
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  suit: "Copas",
                  element: "Agua",
                  emoji: "💧",
                  themes: ["Emociones", "Amor", "Relaciones", "Intuición", "Espiritualidad"],
                  keywords: "Sentimientos, vínculos afectivos, vida emocional"
                },
                {
                  suit: "Espadas", 
                  element: "Aire",
                  emoji: "⚔️",
                  themes: ["Mente", "Comunicación", "Conflictos", "Decisiones", "Verdad"],
                  keywords: "Pensamiento, desafíos mentales, claridad"
                },
                {
                  suit: "Bastos",
                  element: "Fuego", 
                  emoji: "🔥",
                  themes: ["Acción", "Creatividad", "Trabajo", "Pasión", "Crecimiento"],
                  keywords: "Energía, proyectos, ambición, vitalidad"
                },
                {
                  suit: "Oros",
                  element: "Tierra",
                  emoji: "🌍", 
                  themes: ["Dinero", "Material", "Salud", "Seguridad", "Recursos"],
                  keywords: "Manifestación física, estabilidad, abundancia"
                }
              ].map((suit, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{suit.emoji}</div>
                    <h3 className="text-xl font-bold text-amber-300">{suit.suit}</h3>
                    <p className="text-purple-300 text-sm">Elemento: {suit.element}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-purple-200 text-sm italic">{suit.keywords}</p>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">Temas:</h4>
                      <ul className="space-y-1">
                        {suit.themes.map((theme, idx) => (
                          <li key={idx} className="text-purple-300 text-sm">• {theme}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Errores Comunes y Cómo Evitarlos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-900/30 p-6 rounded-lg border border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ Evita estos errores</h3>
                <ul className="space-y-3 text-red-300">
                  <li>• Memorizar significados sin desarrollar intuición</li>
                  <li>• Interpretar cartas de forma aislada</li>
                  <li>• Dar predicciones demasiado específicas</li>
                  <li>• Ignorar el contexto de la pregunta</li>
                  <li>• Proyectar tus propios miedos o deseos</li>
                  <li>• Hacer lecturas cuando estás emocionalmente alterado</li>
                </ul>
              </div>

              <div className="bg-green-900/30 p-6 rounded-lg border border-green-500">
                <h3 className="text-xl font-bold text-green-400 mb-4">✅ Mejores prácticas</h3>
                <ul className="space-y-3 text-green-300">
                  <li>• Combina conocimiento con intuición</li>
                  <li>• Ve las cartas como una historia conectada</li>
                  <li>• Ofrece orientación y posibilidades</li>
                  <li>• Adapta el mensaje al consultante</li>
                  <li>• Mantén neutralidad emocional</li>
                  <li>• Practica regularmente con diferentes spreads</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practice Exercises */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Ejercicios de Práctica
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "🌅 Carta del Día",
                  desc: "Cada mañana, saca una carta y reflexiona sobre su mensaje para el día.",
                  benefit: "Desarrolla conexión intuitiva con las cartas"
                },
                {
                  title: "📖 Diario de Tarot",
                  desc: "Lleva un registro de tus lecturas, interpretaciones y como se manifestaron.",
                  benefit: "Mejora tu precisión y confianza"
                },
                {
                  title: "🎭 Rol Playing",
                  desc: "Imagina diferentes tipos de consultantes y practica adaptar tu estilo.",
                  benefit: "Desarrolla habilidades de comunicación"
                },
                {
                  title: "🔄 Reinterpretación",
                  desc: "Toma la misma tirada y reinterpreta para diferentes áreas de vida.",
                  benefit: "Comprende la versatilidad de las cartas"
                }
              ].map((exercise, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{exercise.title}</h3>
                  <p className="text-purple-200 mb-3">{exercise.desc}</p>
                  <div className="bg-amber-900/30 p-3 rounded-lg">
                    <p className="text-amber-200 text-sm">
                      <strong>Beneficio:</strong> {exercise.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Techniques */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Técnicas Avanzadas
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-amber-300 mb-3">🔮 Lectura Intuitiva</h3>
                  <p className="text-purple-200 text-sm">Desarrolla la capacidad de leer energías sin depender únicamente de significados memorizados.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-300 mb-3">🌊 Lectura de Patrones</h3>
                  <p className="text-purple-200 text-sm">Identifica patrones recurrentes en las cartas y su significado para el consultante.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-300 mb-3">🎯 Timing en el Tarot</h3>
                  <p className="text-purple-200 text-sm">Aprende a interpretar marcos temporales aproximados basados en las cartas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Recursos para Continuar Aprendiendo
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Lecturas Gratis",
                  desc: "Practica con nuestras lecturas interactivas",
                  link: "/",
                  icon: "🎴"
                },
                {
                  title: "Significados de Cartas",
                  desc: "Explora el significado detallado de cada arcano",
                  link: "/cartas/arcanos-mayores",
                  icon: "📚"
                },
                {
                  title: "Spreads Avanzados",
                  desc: "Descubre tiradas complejas para casos específicos",
                  link: "/guias/spreads-tarot-principiantes",
                  icon: "✨"
                }
              ].map((resource, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-amber-400 transition-colors text-center">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{resource.title}</h3>
                  <p className="text-purple-200 mb-4">{resource.desc}</p>
                  <Link href={resource.link} className="text-amber-400 hover:text-amber-300 font-semibold">
                    Explorar →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              ¿Listo para Practicar?
            </h2>
            <p className="text-xl text-purple-200 mb-6">
              La mejor forma de aprender tarot es practicando. Comienza tu journey ahora.
            </p>
            <Link 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🎴 Comenzar a Practicar
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
