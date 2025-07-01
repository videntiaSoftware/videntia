import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Videncia Online Gratis - Consultas Espirituales las 24 Horas",
  description: "Videncia online gratis con expertos espirituales. Consultas de clarividencia, tarot y orientación mística sin costo. Conecta con tu intuición interior.",
  keywords: [
    "videncia online gratis", "consulta vidente gratis", "clarividencia online", 
    "videncia sin pagar", "consulta espiritual gratis", "medium online gratis",
    "orientación mística", "videncia argentina", "consulta psíquica gratis"
  ],
  openGraph: {
    title: "Videncia Online Gratis - Consultas Espirituales 24/7",
    description: "Accede a videncia online gratis con expertos espirituales. Clarividencia y orientación mística sin costo.",
    url: "/videncia-online-gratis",
  },
  alternates: {
    canonical: "/videncia-online-gratis",
  },
};

export default function VidenciaOnlineGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Videncia Online Gratis",
    description: "Consultas de videncia y clarividencia online sin costo",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/videncia-online-gratis"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Videncia Online Gratis
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Conecta con tu sabiduría interior a través de consultas de videncia online gratuitas. 
              Clarividencia, intuición y orientación espiritual al alcance de un clic.
            </p>
            <Link 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🌟 Comenzar Consulta Gratis
            </Link>
          </div>

          {/* Services Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Servicios de Videncia Gratuitos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔮",
                  title: "Clarividencia",
                  desc: "Visiones claras sobre tu futuro y situaciones presentes",
                  features: ["Visión del futuro", "Claridad mental", "Intuición desarrollada"]
                },
                {
                  icon: "✨",
                  title: "Lectura Energética",
                  desc: "Análisis de tu campo energético y vibracional",
                  features: ["Chakras", "Aura", "Energías bloqueadas"]
                },
                {
                  icon: "🌙",
                  title: "Conexión Espiritual",
                  desc: "Canalización de mensajes y guía espiritual",
                  features: ["Guías espirituales", "Mensajes del universo", "Sincronicidades"]
                },
                {
                  icon: "🎴",
                  title: "Tarot Intuitivo",
                  desc: "Lecturas de tarot guiadas por la intuición",
                  features: ["Interpretación intuitiva", "Mensajes personales", "Simbolismo profundo"]
                },
                {
                  icon: "🧿",
                  title: "Protección Espiritual",
                  desc: "Orientación sobre protección y limpieza energética",
                  features: ["Limpieza áurica", "Protección psíquica", "Rituales de protección"]
                },
                {
                  icon: "💫",
                  title: "Propósito de Vida",
                  desc: "Descubre tu misión y propósito espiritual",
                  features: ["Misión de alma", "Talentos innatos", "Camino espiritual"]
                }
              ].map((service, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-amber-400 transition-all group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{service.title}</h3>
                  <p className="text-purple-200 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-purple-300 flex items-center gap-2">
                        <span className="text-amber-400">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* How Clairvoyance Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Cómo Funciona la Videncia Online
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-purple-600">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-amber-600 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
                  <h3 className="font-bold text-amber-300 mb-2">Preparación</h3>
                  <p className="text-purple-200 text-sm">Relájate y concéntrate en tu pregunta o situación</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-600 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
                  <h3 className="font-bold text-amber-300 mb-2">Conexión</h3>
                  <p className="text-purple-200 text-sm">Establecemos conexión con tu energía y guías espirituales</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-600 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
                  <h3 className="font-bold text-amber-300 mb-2">Revelación</h3>
                  <p className="text-purple-200 text-sm">Recibe insights, visiones y orientación clara</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Beneficios de la Videncia Online
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  "🌟 Claridad mental y emocional",
                  "🔮 Visión del futuro probable",
                  "💡 Respuestas a preguntas importantes",
                  "🌈 Orientación en decisiones difíciles",
                  "⚡ Desarrollo de tu intuición",
                  "🧘 Paz interior y equilibrio"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{benefit.split(' ')[0]}</span>
                    <span className="text-purple-200">{benefit.substring(2)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-purple-800 to-amber-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-300 mb-4">¿Qué puedes consultar?</h3>
                <ul className="space-y-3 text-purple-200">
                  <li>• Futuro romántico y relaciones</li>
                  <li>• Oportunidades laborales y financieras</li>
                  <li>• Salud física y emocional</li>
                  <li>• Decisiones importantes de vida</li>
                  <li>• Propósito y misión espiritual</li>
                  <li>• Protección y limpieza energética</li>
                  <li>• Conexión con seres queridos fallecidos</li>
                  <li>• Desarrollo de habilidades psíquicas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Types of Psychic Abilities */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Tipos de Habilidades Psíquicas
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Clarividencia", desc: "Ver más allá del velo físico", icon: "👁️" },
                { name: "Clariaudiencia", desc: "Escuchar mensajes espirituales", icon: "👂" },
                { name: "Clarisensibilidad", desc: "Sentir energías y emociones", icon: "💫" },
                { name: "Precognición", desc: "Visión de eventos futuros", icon: "🔮" }
              ].map((ability, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-purple-600 text-center">
                  <div className="text-3xl mb-3">{ability.icon}</div>
                  <h3 className="font-bold text-amber-300 mb-2">{ability.name}</h3>
                  <p className="text-purple-200 text-sm">{ability.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              Despierta tu Potencial Intuitivo
            </h2>
            <p className="text-xl text-purple-200 mb-6">
              La sabiduría que buscas ya está dentro de ti. Permítenos ayudarte a desvelarla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🌟 Consulta Gratuita
              </Link>
              <Link 
                href="/premium" 
                className="border-2 border-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                ✨ Consulta Premium
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
