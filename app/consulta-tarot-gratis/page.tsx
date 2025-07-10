import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulta Tarot Gratis Online - Lecturas de Cartas Auténticas 24/7",
  description: "Consulta tarot gratis online sin registro. Lecturas auténticas de cartas 24/7, tiradas personalizadas de amor, trabajo y dinero. ¡Descubre tu destino ahora!",
  keywords: [
    "consulta tarot gratis", "tarot gratis online", "lecturas tarot sin pagar", 
    "consulta cartas gratis", "tarot gratis sin registro", "videncia gratis",
    "consulta espiritual gratis", "tarot online argentino", "lecturas gratuitas"
  ],
  openGraph: {
    title: "Consulta Tarot Gratis Online - Videntia",
    description: "Consulta tarot gratis sin registro. Lecturas auténticas 24/7.",
    url: "/consulta-tarot-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/consulta-tarot-gratis"
  },
};

const faqData = [
  {
    question: "¿Realmente es gratis consultar el tarot online?",
    answer: "Sí, ofrecemos consultas de tarot completamente gratuitas sin registro ni pagos ocultos. Puedes acceder a lecturas ilimitadas las 24 horas."
  },
  {
    question: "¿Qué tipos de consultas gratis están disponibles?",
    answer: "Tenemos consultas de amor, trabajo, dinero, salud, familia y crecimiento personal. Incluye tiradas de 3 cartas, Cruz Celta y Sí o No."
  },
  {
    question: "¿Son confiables las lecturas gratuitas?",
    answer: "Nuestras lecturas gratuitas utilizan la misma metodología y barajas que las consultas premium, garantizando autenticidad y precisión."
  }
];

export default function ConsultaTarotGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Consulta Tarot Gratis Online",
    description: "Consultas de tarot gratuitas las 24 horas con lecturas auténticas",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/consulta-tarot-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
              Consulta Tarot Gratis Online
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Accede a lecturas de tarot auténticas sin costo, las 24 horas del día. 
              Sin registro, sin pagos ocultos, solo sabiduría ancestral al alcance de tus manos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🔮 Consultar Ahora Gratis
              </Link>
              <Link 
                href="/lecturas/amor" 
                className="border-2 border-purple-400 hover:bg-purple-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                💕 Consulta de Amor
              </Link>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              ¿Por qué elegir nuestras consultas gratuitas?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🆓 100% Gratuito</h3>
                <p className="text-purple-200">
                  Sin costos ocultos, sin registro obligatorio. Acceso inmediato a todas las lecturas.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-4">🔮 Lecturas Auténticas</h3>
                <p className="text-purple-200">
                  Utilizamos barajas tradicionales y metodología probada para interpretaciones precisas.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                <h3 className="text-xl font-bold text-amber-300 mb-4">⏰ Disponible 24/7</h3>
                <p className="text-purple-200">
                  Consulta cuando lo necesites, sin horarios ni restricciones.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Consultations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Tipos de Consultas Gratuitas Disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "💕 Tarot del Amor", desc: "Consultas sobre relaciones, alma gemela y futuro romántico", link: "/lecturas/amor" },
                { title: "💼 Tarot del Trabajo", desc: "Oportunidades laborales, cambios de carrera y éxito profesional", link: "/lecturas/trabajo" },
                { title: "💰 Tarot del Dinero", desc: "Finanzas personales, inversiones y abundancia material", link: "/lecturas/dinero" },
                { title: "🌟 Tirada de 3 Cartas", desc: "Pasado, presente y futuro en una consulta rápida", link: "/lecturas/3-cartas" },
                { title: "✨ Cruz Celta", desc: "Análisis profundo de situaciones complejas", link: "/lecturas/cruz-celta" },
                { title: "❓ Sí o No", desc: "Respuestas directas a preguntas específicas", link: "/lecturas/si-o-no" }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-amber-400 transition-colors">
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{item.title}</h3>
                  <p className="text-purple-200 mb-4">{item.desc}</p>
                  <Link href={item.link} className="text-amber-400 hover:text-amber-300 font-semibold">
                    Consultar Gratis →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* How it Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Cómo Funciona Tu Consulta Gratuita
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-600 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-amber-300">Elige tu consulta</h3>
                    <p className="text-purple-200">Selecciona el tipo de lectura que necesitas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-600 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-amber-300">Concentra tu energía</h3>
                    <p className="text-purple-200">Enfócate en tu pregunta o situación</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-600 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-amber-300">Recibe tu lectura</h3>
                    <p className="text-purple-200">Interpretación completa y personalizada</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-48 h-48 rounded-full mx-auto flex items-center justify-center text-6xl">
                  🔮
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{faq.question}</h3>
                  <p className="text-purple-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">
              ¿Listo para tu consulta gratuita?
            </h2>
            <p className="text-xl text-purple-200 mb-6">
              Miles de personas ya han encontrado respuestas. Es tu turno.
            </p>
            <Link 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🔮 Comenzar Mi Consulta Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
