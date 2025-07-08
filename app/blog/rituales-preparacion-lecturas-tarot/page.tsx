import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rituales de Preparación para Lecturas de Tarot: Guía Completa y Consejos | Videntia Blog",
  description: "Descubre los mejores rituales y prácticas para prepararte antes de una lectura de tarot. Limpieza energética, meditación, protección y consejos para potenciar tu intuición y precisión en las tiradas.",
  keywords: [
    "rituales tarot", "preparación lectura tarot", "limpieza energética tarot", "ritual antes de leer tarot", "consejos tarotistas", "protegerse tarot", "meditación tarot", "ambiente lectura tarot"
  ],
  openGraph: {
    title: "Rituales de Preparación para Lecturas de Tarot",
    description: "Guía completa de rituales y consejos para prepararte antes de una lectura de tarot. Mejora tu conexión e intuición.",
    url: "/blog/rituales-preparacion-lecturas-tarot"
  },
  alternates: {
    canonical: "/blog/rituales-preparacion-lecturas-tarot"
  }
};

export default function RitualesPreparacionTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-yellow-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 font-cinzel">Rituales de Preparación para Lecturas de Tarot</h1>
          <p className="text-lg text-indigo-900 mb-4">Guía completa para limpiar tu energía, crear un ambiente sagrado y potenciar tu intuición antes de leer el tarot.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-indigo-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-indigo-600 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/ritual-tarot-preparacion.png" alt="Ritual de preparación para tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-indigo-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">¿Por qué es importante prepararse antes de una lectura de tarot?</h2>
          <p className="mb-4">La preparación previa a una lectura de tarot es fundamental para lograr claridad, protección y una conexión profunda con la energía de las cartas. Los rituales ayudan a limpiar el ambiente, centrar la mente y abrir la intuición, permitiendo interpretaciones más precisas y seguras.</p>
        </section>

        {/* Principales rituales y prácticas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Rituales y Prácticas Esenciales</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Limpieza energética:</strong> Usa sahumerios, palo santo o incienso para limpiar el espacio y las cartas.</li>
            <li><strong>Meditación:</strong> Dedica unos minutos a respirar profundo y centrarte antes de comenzar.</li>
            <li><strong>Protección:</strong> Visualiza una luz protectora o utiliza cristales como amatista o cuarzo blanco.</li>
            <li><strong>Intención:</strong> Formula una intención clara para la lectura, pidiendo guía y claridad.</li>
            <li><strong>Ambiente sagrado:</strong> Prepara el lugar con velas, música suave y objetos significativos.</li>
            <li><strong>Limpieza de cartas:</strong> Golpea suavemente el mazo o pásalo por humo para eliminar energías previas.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Consejos para Potenciar tu Preparación</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Evita distracciones y apaga dispositivos electrónicos.</li>
            <li>Lee siempre en un lugar limpio y ordenado.</li>
            <li>Utiliza una tela especial para extender las cartas.</li>
            <li>Haz una pequeña oración o afirmación antes de empezar.</li>
            <li>Respeta el momento y no fuerces la lectura si no te sientes preparado/a.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Preguntas Frecuentes sobre Rituales de Tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Es necesario hacer un ritual antes de cada lectura?</strong>
              <p>No es obligatorio, pero sí recomendable para lograr mayor claridad y protección energética.</p>
            </div>
            <div>
              <strong>¿Qué pasa si no limpio mis cartas?</strong>
              <p>Pueden acumularse energías ajenas, afectando la precisión de las lecturas.</p>
            </div>
            <div>
              <strong>¿Qué cristales son mejores para protegerse?</strong>
              <p>Amatista, cuarzo blanco, turmalina negra y selenita son excelentes opciones.</p>
            </div>
            <div>
              <strong>¿Puedo crear mi propio ritual?</strong>
              <p>¡Por supuesto! Lo importante es que el ritual tenga sentido para ti y te ayude a conectar.</p>
            </div>
          </div>
        </section>

        {/* Ejemplo de ritual sencillo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Ejemplo de Ritual Sencillo antes de Leer el Tarot</h2>
          <ol className="list-decimal pl-6 mb-3">
            <li>Limpia el espacio con incienso o palo santo.</li>
            <li>Coloca una vela blanca y un cristal protector cerca.</li>
            <li>Siéntate cómodamente, respira profundo y medita 3 minutos.</li>
            <li>Formula tu intención en voz alta o mentalmente.</li>
            <li>Baraja las cartas y comienza la lectura.</li>
          </ol>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/errores-comunes-leer-tarot" className="text-indigo-700 hover:underline font-semibold">Errores comunes al leer el tarot</Link>
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-indigo-700 hover:underline font-semibold">Cómo desarrollar la intuición</Link>
          <Link href="/cartas/arcanos-mayores" className="text-indigo-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-indigo-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-300 to-yellow-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-800 mb-2">¿Listo/a para tu próxima lectura?</h3>
          <p className="text-indigo-900 mb-4">Pon en práctica estos rituales y vive una experiencia de tarot más profunda y significativa.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
