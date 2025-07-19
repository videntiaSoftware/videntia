import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tirada de Cartas de Amor Gratis - Tarot del Corazón Online",
  description: "Tirada de cartas de amor gratis online. Descubre el futuro de tu relación, compatibilidad de pareja y encuentros románticos. Lecturas auténticas 24/7.",
  keywords: [
    "tirada cartas amor gratis", "tarot amor gratis", "lectura cartas amor", 
    "consulta amor gratis", "tarot del corazón", "cartas del amor",
    "predicción amor gratis", "tarot pareja gratis", "futuro amor cartas"
  ],
  openGraph: {
    title: "Tirada de Cartas de Amor Gratis - Videntia",
    description: "Descubre el futuro de tu amor con tiradas de cartas gratuitas.",
    url: "/tirada-cartas-amor-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/tirada-cartas-amor-gratis",
  },
};

const faqData = [
  {
    question: "¿Qué puedo saber con una tirada de cartas de amor?",
    answer: "Puedes conocer el estado actual de tu relación, posibilidades de reconciliación, compatibilidad de pareja, futuros encuentros románticos y obstáculos en el amor."
  },
  {
    question: "¿Las cartas de amor son precisas?",
    answer: "Las cartas del amor utilizan la sabiduría ancestral del tarot para revelar tendencias y energías. Su precisión depende de tu apertura y la claridad de tu pregunta."
  },
  {
    question: "¿Puedo hacer varias consultas de amor gratis?",
    answer: "Sí, puedes realizar consultas ilimitadas de amor sin costo. Recomendamos esperar al menos 24 horas entre lecturas para la misma pregunta."
  }
];

export default function TiradaCartasAmorGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Tirada de Cartas de Amor Gratis",
    description: "Lecturas de tarot del amor gratuitas para descubrir tu futuro romántico",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/tirada-cartas-amor-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-rose-900 to-pink-900 text-amber-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-rose-300 mb-6 font-cinzel">
              Tirada de Cartas de Amor Gratis
            </h1>
            <p className="text-xl text-pink-200 mb-8 leading-relaxed">
              Descubre los secretos de tu corazón con nuestras tiradas de cartas de amor gratuitas. 
              Explora tu futuro romántico, compatibilidad de pareja y encuentros del destino.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/lecturas/amor" 
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                💕 Consultar Amor Ahora
              </Link>
              <Link 
                href="/lecturas/compatibilidad" 
                className="border-2 border-pink-400 hover:bg-pink-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                💑 Test Compatibilidad
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
                  title: "💕 Amor Verdadero", 
                  desc: "Descubre si has encontrado a tu alma gemela", 
                  icon: "💖",
                  link: "/lecturas/amor-verdadero" 
                },
                { 
                  title: "💔 Reconciliación", 
                  desc: "Posibilidades de volver con tu ex pareja", 
                  icon: "🔄",
                  link: "/lecturas/reconciliacion" 
                },
                { 
                  title: "💑 Compatibilidad", 
                  desc: "Analiza la compatibilidad con tu pareja actual", 
                  icon: "⚖️",
                  link: "/lecturas/compatibilidad" 
                },
                { 
                  title: "🌹 Nuevo Amor", 
                  desc: "Cuándo y dónde encontrarás el amor", 
                  icon: "✨",
                  link: "/lecturas/nuevo-amor" 
                },
                { 
                  title: "💍 Matrimonio", 
                  desc: "Futuro matrimonial y compromiso serio", 
                  icon: "👰",
                  link: "/lecturas/matrimonio" 
                },
                { 
                  title: "🔥 Pasión", 
                  desc: "Intensidad y pasión en tu relación", 
                  icon: "🌡️",
                  link: "/lecturas/pasion" 
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors">
                  <div className="text-4xl mb-4 text-center">{item.icon}</div>
                  <h3 className="text-xl font-bold text-rose-300 mb-3 text-center">{item.title}</h3>
                  <p className="text-pink-200 mb-4 text-center">{item.desc}</p>
                  <div className="text-center">
                    <Link href={item.link} className="text-rose-400 hover:text-rose-300 font-semibold">
                      Consultar Gratis →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Love Spread Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Significado de las Cartas en el Amor
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-rose-600">
                <h3 className="text-xl font-bold text-rose-300 mb-4">👑 Cartas de la Corte</h3>
                <p className="text-pink-200">
                  Reyes, Reinas, Caballeros y Sotas representan personas específicas en tu vida amorosa.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-rose-600">
                <h3 className="text-xl font-bold text-rose-300 mb-4">🍷 Copas</h3>
                <p className="text-pink-200">
                  Emociones, sentimientos, intuición y conexiones espirituales en el amor.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-rose-600">
                <h3 className="text-xl font-bold text-rose-300 mb-4">🔮 Arcanos Mayores</h3>
                <p className="text-pink-200">
                  Lecciones kármicas, destino y transformaciones importantes en el amor.
                </p>
              </div>
            </div>
          </div>

          {/* Love Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Consejos para Mejorar tu Vida Amorosa
            </h2>
            <div className="bg-gradient-to-r from-rose-800/50 to-pink-800/50 p-8 rounded-lg border border-rose-600">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">✨ Autoestima</h3>
                  <p className="text-pink-200 mb-4">
                    Trabaja en amarte a ti mismo primero. El amor propio atrae relaciones saludables.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">🗣️ Comunicación</h3>
                  <p className="text-pink-200 mb-4">
                    Expresa tus sentimientos con honestidad y escucha activamente a tu pareja.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">🎯 Intenciones</h3>
                  <p className="text-pink-200 mb-4">
                    Clarifica qué buscas en una relación antes de comenzar una nueva.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-300 mb-4">⏰ Tiempo</h3>
                  <p className="text-pink-200 mb-4">
                    Dedica tiempo de calidad a tu relación y cultiva la conexión emocional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Preguntas Frecuentes sobre Cartas de Amor
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-rose-600">
                  <h3 className="text-xl font-bold text-rose-300 mb-3">{faq.question}</h3>
                  <p className="text-pink-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-rose-300 mb-8 text-center">
              Lecturas Relacionadas
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: "Tarot Gratis", link: "/consulta-tarot-gratis" },
                { title: "Sí o No", link: "/tarot-del-si-o-no" },
                { title: "Videncia Online", link: "/videncia-online-gratis" },
                { title: "Guías Tarot", link: "/guias/como-interpretar-tarot" }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.link} 
                  className="bg-slate-800/50 p-4 rounded-lg border border-rose-600 hover:border-rose-400 transition-colors text-center"
                >
                  <span className="text-rose-300 font-semibold">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-rose-800 to-pink-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-rose-300 mb-4">
              ¿Lista para descubrir tu futuro amoroso?
            </h2>
            <p className="text-xl text-pink-200 mb-6">
              Las cartas del amor te esperan para revelar los secretos de tu corazón.
            </p>
            <Link 
              href="/lecturas/amor" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              💕 Comenzar Lectura de Amor
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
