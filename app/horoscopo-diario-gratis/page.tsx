import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Horóscopo Diario Gratis - Predicciones Astrológicas Precisas",
  description: "Horóscopo diario gratis para todos los signos. Predicciones astrológicas precisas, amor, trabajo y salud. Consulta tu signo zodiacal hoy mismo.",
  keywords: [
    "horoscopo diario gratis", "horoscopo hoy", "predicciones astrológicas",
    "signo zodiacal", "astrología gratis", "horoscopo amor trabajo",
    "predicciones diarias", "zodiaco hoy", "astrología diaria gratis"
  ],
  openGraph: {
    title: "Horóscopo Diario Gratis - Videntia",
    description: "Predicciones astrológicas precisas para todos los signos del zodíaco.",
    url: "/horoscopo-diario-gratis",
  },
  alternates: {
    canonical: "https://videntiatarot.com/horoscopo-diario-gratis"
  },
};

const faqData = [
  {
    question: "¿Con qué frecuencia se actualiza el horóscopo diario?",
    answer: "Nuestro horóscopo se actualiza cada día al amanecer, incorporando las nuevas influencias astrológicas y tránsitos planetarios del día."
  },
  {
    question: "¿El horóscopo diario es preciso para todos los nacidos bajo el mismo signo?",
    answer: "El horóscopo diario ofrece tendencias generales. Para mayor precisión personal, recomendamos complementar con una consulta de tarot personalizada."
  },
  {
    question: "¿Puedo consultar el horóscopo de días anteriores?",
    answer: "Sí, mantenemos un archivo de horóscopos anteriores para que puedas revisar las predicciones y ver cómo se manifestaron en tu vida."
  }
];

const zodiacSigns = [
  { name: "Aries", dates: "21 Mar - 19 Abr", icon: "♈", element: "Fuego" },
  { name: "Tauro", dates: "20 Abr - 20 May", icon: "♉", element: "Tierra" },
  { name: "Géminis", dates: "21 May - 20 Jun", icon: "♊", element: "Aire" },
  { name: "Cáncer", dates: "21 Jun - 22 Jul", icon: "♋", element: "Agua" },
  { name: "Leo", dates: "23 Jul - 22 Ago", icon: "♌", element: "Fuego" },
  { name: "Virgo", dates: "23 Ago - 22 Sep", icon: "♍", element: "Tierra" },
  { name: "Libra", dates: "23 Sep - 22 Oct", icon: "♎", element: "Aire" },
  { name: "Escorpio", dates: "23 Oct - 21 Nov", icon: "♏", element: "Agua" },
  { name: "Sagitario", dates: "22 Nov - 21 Dic", icon: "♐", element: "Fuego" },
  { name: "Capricornio", dates: "22 Dic - 19 Ene", icon: "♑", element: "Tierra" },
  { name: "Acuario", dates: "20 Ene - 18 Feb", icon: "♒", element: "Aire" },
  { name: "Piscis", dates: "19 Feb - 20 Mar", icon: "♓", element: "Agua" }
];

export default function HoroscopoDiarioGratis() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Horóscopo Diario Gratis",
    description: "Predicciones astrológicas diarias para todos los signos del zodíaco",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/horoscopo-diario-gratis"
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

      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-amber-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-300 mb-6 font-cinzel">
              Horóscopo Diario Gratis
            </h1>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Descubre qué te deparan las estrellas hoy. Predicciones astrológicas 
              precisas para amor, trabajo, salud y dinero, actualizadas diariamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#signos" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🌟 Ver Mi Horóscopo Hoy
              </Link>
              <Link 
                href="/consulta-tarot-gratis" 
                className="border-2 border-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                🔮 Consulta Personalizada
              </Link>
            </div>
          </div>

          {/* Today's Energy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Energía Cósmica del Día
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-blue-600">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl mb-4">🌙</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-3">Luna en Escorpio</h3>
                  <p className="text-blue-200">
                    Día perfecto para profundizar en emociones y relaciones. 
                    La intuición está muy elevada.
                  </p>
                </div>
                <div>
                  <div className="text-5xl mb-4">♀️</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-3">Venus Favorece</h3>
                  <p className="text-blue-200">
                    Excelente momento para el amor y las relaciones. 
                    Conversaciones importantes fluyen naturalmente.
                  </p>
                </div>
                <div>
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-3">Energía Transformadora</h3>
                  <p className="text-blue-200">
                    Los cambios que inicies hoy tendrán efectos duraderos. 
                    Confía en tu instinto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zodiac Signs Grid */}
          <div id="signos" className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Tu Horóscopo por Signo Zodiacal
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {zodiacSigns.map((sign, index) => (
                <Link 
                  key={index}
                  href={`/horoscopo/${sign.name.toLowerCase()}`}
                  className="bg-slate-800/50 p-6 rounded-lg border border-blue-600 hover:border-blue-400 hover:bg-slate-700/50 transition-all duration-300 text-center group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sign.icon}</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{sign.name}</h3>
                  <p className="text-blue-200 text-sm mb-2">{sign.dates}</p>
                  <div className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">
                    {sign.element}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Daily Highlights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Aspectos Destacados del Día
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-600">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  💕 Amor y Relaciones
                </h3>
                <p className="text-blue-200 mb-4">
                  Venus en aspecto armónico favorece las declaraciones de amor y 
                  conversaciones profundas en pareja.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Signos más favorecidos:</span>
                    <span className="text-blue-300">Escorpio, Cáncer, Piscis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Momento ideal:</span>
                    <span className="text-blue-300">Tarde-noche</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-600">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  💼 Trabajo y Dinero
                </h3>
                <p className="text-blue-200 mb-4">
                  Saturno bien aspectado trae oportunidades de crecimiento profesional 
                  y estabilidad financiera.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Signos más favorecidos:</span>
                    <span className="text-blue-300">Capricornio, Virgo, Tauro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Momento ideal:</span>
                    <span className="text-blue-300">Mañana</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-600">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  🌟 Crecimiento Personal
                </h3>
                <p className="text-blue-200 mb-4">
                  Júpiter en aspecto favorable impulsa el aprendizaje y la expansión 
                  de la conciencia.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Signos más favorecidos:</span>
                    <span className="text-blue-300">Sagitario, Géminis, Acuario</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Momento ideal:</span>
                    <span className="text-blue-300">Todo el día</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-600">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  🍃 Salud y Bienestar
                </h3>
                <p className="text-blue-200 mb-4">
                  La Luna en Escorpio favorece la desintoxicación y actividades que 
                  renueven tu energía vital.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Signos más favorecidos:</span>
                    <span className="text-blue-300">Aries, Leo, Libra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Momento ideal:</span>
                    <span className="text-blue-300">Noche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elements Energy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Energía de los Elementos Hoy
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-red-800 to-orange-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">🔥</div>
                <h3 className="text-xl font-bold text-red-300 mb-3">Fuego</h3>
                <p className="text-red-200 text-sm mb-3">
                  Energía de acción y liderazgo muy elevada
                </p>
                <div className="text-xs text-orange-300">Aries • Leo • Sagitario</div>
              </div>
              <div className="bg-gradient-to-br from-green-800 to-brown-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-xl font-bold text-green-300 mb-3">Tierra</h3>
                <p className="text-green-200 text-sm mb-3">
                  Momento perfecto para materializar proyectos
                </p>
                <div className="text-xs text-lime-300">Tauro • Virgo • Capricornio</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-800 to-blue-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">💨</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3">Aire</h3>
                <p className="text-cyan-200 text-sm mb-3">
                  Comunicación y nuevas ideas fluyen
                </p>
                <div className="text-xs text-sky-300">Géminis • Libra • Acuario</div>
              </div>
              <div className="bg-gradient-to-br from-blue-800 to-purple-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">Agua</h3>
                <p className="text-blue-200 text-sm mb-3">
                  Intuición y emociones muy intensas
                </p>
                <div className="text-xs text-indigo-300">Cáncer • Escorpio • Piscis</div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Consejos Astrológicos del Día
            </h2>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-blue-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-blue-300 mb-4">🌅 Por la Mañana</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>☀️ Medita 10 minutos al despertar</li>
                    <li>📝 Anota tus sueños e intuiciones</li>
                    <li>🌱 Planifica actividades creativas</li>
                    <li>💧 Bebe mucha agua para limpiar energías</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-300 mb-4">🌙 Por la Noche</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>🕯️ Enciende una vela violeta</li>
                    <li>📖 Reflexiona sobre el día</li>
                    <li>💤 Acuéstate antes de las 11 PM</li>
                    <li>🙏 Practica gratitud por 3 cosas buenas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Preguntas sobre Astrología
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-blue-600">
                  <h3 className="text-xl font-bold text-blue-300 mb-3">{faq.question}</h3>
                  <p className="text-blue-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
              Servicios Complementarios
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-blue-600 hover:border-blue-400 transition-colors block text-center">
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">Tarot Personalizado</h3>
                <p className="text-blue-200 text-sm">Consulta específica para tu situación</p>
              </Link>
              <Link href="/videncia-online-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-blue-600 hover:border-blue-400 transition-colors block text-center">
                <div className="text-3xl mb-3">👁️</div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">Videncia Online</h3>
                <p className="text-blue-200 text-sm">Visión profunda de tu futuro</p>
              </Link>
              <Link href="/lectura-tarot-amor-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-blue-600 hover:border-blue-400 transition-colors block text-center">
                <div className="text-3xl mb-3">💕</div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">Compatibilidad</h3>
                <p className="text-blue-200 text-sm">Análisis astrológico de pareja</p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-800 to-purple-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">
              Las Estrellas Te Guían Cada Día
            </h2>
            <p className="text-xl text-blue-200 mb-6">
              Descubre qué mensajes tienen los astros para ti. Tu horóscopo te espera.
            </p>
            <Link 
              href="#signos" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🌟 Ver Mi Horóscopo Ahora
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
