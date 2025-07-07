import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Luna en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Luna en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Luna en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la luna tarot", "la luna significado", "la luna derecho", "la luna invertido", "la luna amor", "la luna trabajo", "la luna salud", "la luna carta tarot", "la luna rider waite", "la luna marsella"
  ],
  openGraph: {
    title: "La Luna en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Luna en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-luna"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-luna"
  }
};

export default function LaLunaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-gray-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">La Luna (XVIII) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-luna-tarot.png" alt="La Luna Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representa La Luna en el Tarot?</h2>
          <p className="mb-4">La Luna es la carta número XVIII de los Arcanos Mayores y simboliza la intuición, los sueños, los miedos y las ilusiones. Representa el inconsciente, la confusión, los ciclos emocionales y la necesidad de confiar en la percepción interna.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Luna al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Intuición, sueños y mensajes del inconsciente</li>
            <li>Confusión, incertidumbre y emociones intensas</li>
            <li>Ilusiones, engaños o verdades ocultas</li>
            <li>Necesidad de confiar en la percepción interna</li>
            <li>Cambios de humor, sensibilidad y creatividad</li>
          </ul>
          <p className="mb-2">Al derecho, La Luna invita a escuchar la intuición, explorar el mundo interior y ser cauteloso ante las apariencias. Es una carta de misterio y autodescubrimiento.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Luna Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Revelación de secretos, claridad tras la confusión</li>
            <li>Superación de miedos o ilusiones</li>
            <li>Desbloqueo emocional, fin de la incertidumbre</li>
            <li>Despertar espiritual, intuición más clara</li>
            <li>Necesidad de enfrentar la realidad</li>
          </ul>
          <p className="mb-2">Invertida, La Luna señala el momento de dejar atrás las dudas, enfrentar la verdad y confiar en la claridad que surge tras la confusión.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Simbolismo de La Luna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La luna: ciclos, intuición y misterio</li>
            <li>El perro y el lobo: instinto domesticado y salvaje</li>
            <li>El cangrejo: emociones profundas y el inconsciente</li>
            <li>El agua: mundo emocional y sueños</li>
            <li>El camino: búsqueda interior y evolución espiritual</li>
          </ul>
        </section>

        {/* La Luna en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">La Luna en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones confusas, emociones intensas, secretos.<br/>Invertido: Claridad, revelación de verdades, superación de dudas.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-gray-700 mb-2">Trabajo</h3>
              <p>Al derecho: Incertidumbre laboral, proyectos poco claros, creatividad.<br/>Invertido: Resolución de conflictos, claridad en objetivos, fin de la confusión.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Cambios de ánimo, sensibilidad, importancia de los sueños.<br/>Invertido: Recuperación emocional, fin de la ansiedad, mayor estabilidad.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Ejemplos de Preguntas para La Luna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué verdad está oculta en esta situación?</li>
            <li>¿Cómo puedo confiar más en mi intuición?</li>
            <li>¿Qué me está causando confusión o miedo?</li>
            <li>¿Qué mensaje traen mis sueños?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos si sale La Luna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Escucha tu intuición y no te dejes llevar solo por las apariencias</li>
            <li>Permítete sentir y explorar tus emociones</li>
            <li>Evita tomar decisiones apresuradas en momentos de confusión</li>
            <li>Busca claridad y enfrenta tus miedos</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre La Luna</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Luna es una carta negativa?</strong>
              <p>No necesariamente. Al derecho invita a la introspección y la intuición, aunque puede señalar confusión o engaños.</p>
            </div>
            <div>
              <strong>¿Qué significa La Luna en el amor?</strong>
              <p>Al derecho: emociones intensas y confusión. Invertido: claridad y revelación de verdades.</p>
            </div>
            <div>
              <strong>¿La Luna siempre indica engaños?</strong>
              <p>No siempre. Puede señalar ilusiones, miedos o la necesidad de confiar en la intuición.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el cangrejo en La Luna?</strong>
              <p>Las emociones profundas y el surgimiento de lo inconsciente a la superficie.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-blue-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-blue-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-300 to-gray-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres saber qué te depara La Luna?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Luna para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🌙 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
