import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot del Sí o No - Respuestas Rápidas y Precisas Gratis",
  description: "Tarot del Sí o No gratis online. Respuestas inmediatas a tus preguntas más urgentes. Consulta directa con cartas del tarot, 24/7 sin registro.",
  keywords: [
    "tarot si o no", "tarot respuesta rapida", "consulta si no gratis", 
    "tarot pregunta directa", "respuesta inmediata tarot", "consulta rapida",
    "tarot decision", "respuesta clara tarot", "oraculo si no"
  ],
  openGraph: {
    title: "Tarot del Sí o No - Respuestas Inmediatas Gratis",
    description: "Obtén respuestas claras de Sí o No con el tarot. Consulta gratis y inmediata.",
    url: "/tarot-del-si-o-no",
  },
  alternates: {
    canonical: "/tarot-del-si-o-no",
  },
};

export default function TarotDelSiONo() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Tarot del Sí o No",
    description: "Consultas rápidas de tarot para respuestas de Sí o No",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/tarot-del-si-o-no"
  });

  const howToSchema = structuredDataTemplates.howTo({
    name: "Cómo hacer una consulta de Sí o No con el Tarot",
    description: "Guía paso a paso para obtener respuestas claras",
    steps: [
      { name: "Formular la pregunta", text: "Piensa en una pregunta clara que pueda responderse con Sí o No" },
      { name: "Concentrar la energía", text: "Relájate y enfoca tu mente en la pregunta" },
      { name: "Seleccionar carta", text: "Elige intuitivamente una carta del mazo" },
      { name: "Interpretar respuesta", text: "Recibe tu respuesta clara basada en la carta seleccionada" }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Tarot del Sí o No
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              ¿Necesitas una respuesta rápida y clara? El Tarot del Sí o No te ofrece 
              orientación directa para tus decisiones más importantes.
            </p>
            <Link 
              href="/lecturas/si-o-no" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              ❓ Obtener Respuesta Ahora
            </Link>
          </div>

          {/* When to Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              ¿Cuándo usar el Tarot del Sí o No?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "💼",
                  title: "Decisiones Laborales",
                  examples: ["¿Debo cambiar de trabajo?", "¿Es el momento de pedir un aumento?", "¿Debo aceptar esta propuesta?"]
                },
                {
                  icon: "💕",
                  title: "Relaciones Amorosas",
                  examples: ["¿Es la persona indicada?", "¿Debo dar una segunda oportunidad?", "¿Volverá mi ex pareja?"]
                },
                {
                  icon: "💰",
                  title: "Finanzas e Inversiones",
                  examples: ["¿Debo hacer esta inversión?", "¿Es buen momento para comprar?", "¿Tendré éxito financiero?"]
                },
                {
                  icon: "🏠",
                  title: "Cambios Importantes",
                  examples: ["¿Debo mudarme?", "¿Es hora de un cambio?", "¿Debo estudiar esto?"]
                },
                {
                  icon: "👥",
                  title: "Relaciones Familiares",
                  examples: ["¿Debo reconciliarme?", "¿Es confiable esta persona?", "¿Debo hablar sobre esto?"]
                },
                {
                  icon: "🌟",
                  title: "Crecimiento Personal",
                  examples: ["¿Estoy en el camino correcto?", "¿Debo seguir este proyecto?", "¿Es el momento adecuado?"]
                }
              ].map((category, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="text-purple-200 text-sm flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* How it Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Cómo Funciona el Tarot del Sí o No
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Pregunta Clara",
                  desc: "Formula una pregunta específica que pueda responderse con Sí o No",
                  icon: "❓"
                },
                {
                  step: "2", 
                  title: "Concentración",
                  desc: "Relájate y enfoca tu mente completamente en la pregunta",
                  icon: "🧘"
                },
                {
                  step: "3",
                  title: "Selección Intuitiva",
                  desc: "Elige una carta siguiendo tu intuición y energía interior",
                  icon: "🎴"
                },
                {
                  step: "4",
                  title: "Respuesta Clara",
                  desc: "Recibe tu respuesta de Sí o No con explicación detallada",
                  icon: "✅"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-amber-600 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-amber-300 mb-2">{step.title}</h3>
                  <p className="text-purple-200 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Meaning */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Interpretación de Respuestas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-900/30 p-6 rounded-lg border border-green-500">
                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                  ✅ Respuesta: SÍ
                </h3>
                <div className="space-y-3">
                  <p className="text-green-200">
                    <strong>Cartas que indican SÍ:</strong>
                  </p>
                  <ul className="text-green-300 space-y-1 text-sm">
                    <li>• El Sol - Éxito y positividad</li>
                    <li>• La Estrella - Esperanza cumplida</li>
                    <li>• El Mago - Poder para manifestar</li>
                    <li>• Rueda de la Fortuna - Cambio positivo</li>
                    <li>• Los Enamorados - Elección acertada</li>
                    <li>• As de Copas - Nuevo comienzo emocional</li>
                    <li>• As de Oros - Oportunidad material</li>
                  </ul>
                  <p className="text-green-200 mt-4">
                    <strong>Significado:</strong> El universo está alineado con tu deseo. 
                    Es el momento adecuado para actuar con confianza.
                  </p>
                </div>
              </div>

              <div className="bg-red-900/30 p-6 rounded-lg border border-red-500">
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3">
                  ❌ Respuesta: NO
                </h3>
                <div className="space-y-3">
                  <p className="text-red-200">
                    <strong>Cartas que indican NO:</strong>
                  </p>
                  <ul className="text-red-300 space-y-1 text-sm">
                    <li>• La Torre - Cambio disruptivo</li>
                    <li>• El Diablo - Limitaciones actuales</li>
                    <li>• La Muerte - Fin de ciclo</li>
                    <li>• El Colgado - Esperar es mejor</li>
                    <li>• Cinco de Espadas - Conflicto</li>
                    <li>• Tres de Espadas - Dolor emocional</li>
                    <li>• Diez de Espadas - Fin doloroso</li>
                  </ul>
                  <p className="text-red-200 mt-4">
                    <strong>Significado:</strong> No es el momento adecuado o esta 
                    opción no te conviene. Considera alternativas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Better Questions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Consejos para Mejores Preguntas
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">✅ Preguntas Efectivas</h3>
                  <ul className="space-y-2 text-green-300">
                    <li>• &quot;¿Debo aceptar esta oferta de trabajo?&quot;</li>
                    <li>• &quot;¿Es Juan la persona indicada para mí?&quot;</li>
                    <li>• &quot;¿Tendré éxito si inicio este negocio?&quot;</li>
                    <li>• &quot;¿Debo mudarme a otra ciudad?&quot;</li>
                    <li>• &quot;¿Es buen momento para invertir?&quot;</li>
                    <li>• &quot;¿Debo hablar con mi ex pareja?&quot;</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-4">❌ Evita estas preguntas</h3>
                  <ul className="space-y-2 text-red-300">
                    <li>• &quot;¿Cuándo voy a encontrar el amor?&quot; (no es sí/no)</li>
                    <li>• &quot;¿Por qué me pasa esto?&quot; (muy amplia)</li>
                    <li>• &quot;¿Qué debo hacer?&quot; (no específica)</li>
                    <li>• &quot;¿Soy feliz?&quot; (muy subjetiva)</li>
                    <li>• &quot;¿Cómo será mi futuro?&quot; (muy general)</li>
                    <li>• &quot;¿Me ama?&quot; (sin contexto específico)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-900/30 rounded-lg border border-amber-500">
                <h4 className="font-bold text-amber-300 mb-2">💡 Consejo Clave:</h4>
                <p className="text-amber-200">
                  Formula preguntas que te ayuden a tomar decisiones concretas. 
                  Sé específico sobre la situación y el tiempo. Evita preguntas 
                  que requieran explicaciones complejas.
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Spreads */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Si necesitas más profundidad...
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Tirada de 3 Cartas",
                  desc: "Pasado, presente y futuro de tu situación",
                  link: "/lecturas/3-cartas",
                  icon: "🎴"
                },
                {
                  title: "Cruz Celta",
                  desc: "Análisis completo y profundo de cualquier situación",
                  link: "/lecturas/cruz-celta", 
                  icon: "✝️"
                },
                {
                  title: "Consulta Temática",
                  desc: "Lecturas especializadas en amor, trabajo o dinero",
                  link: "/lecturas/amor",
                  icon: "💕"
                }
              ].map((option, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-amber-400 transition-colors text-center">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{option.title}</h3>
                  <p className="text-purple-200 mb-4">{option.desc}</p>
                  <Link href={option.link} className="text-amber-400 hover:text-amber-300 font-semibold">
                    Ver más →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              ¿Listo para tu respuesta?
            </h2>
            <p className="text-xl text-purple-200 mb-6">
              Una pregunta clara, una respuesta directa. El tarot nunca miente.
            </p>
            <Link 
              href="/lecturas/si-o-no" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              ❓ Hacer Mi Pregunta Ahora
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
