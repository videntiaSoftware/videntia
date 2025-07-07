import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Estrella en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Estrella en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Estrella en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la estrella tarot", "la estrella significado", "la estrella derecho", "la estrella invertido", "la estrella amor", "la estrella trabajo", "la estrella salud", "la estrella carta tarot", "la estrella rider waite", "la estrella marsella"
  ],
  openGraph: {
    title: "La Estrella en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Estrella en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-estrella"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-estrella"
  }
};

export default function LaEstrellaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">La Estrella (XVII) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-estrella-tarot.png" alt="La Estrella Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representa La Estrella en el Tarot?</h2>
          <p className="mb-4">La Estrella es la carta número XVII de los Arcanos Mayores y simboliza la esperanza, la inspiración, la fe y la renovación. Representa la luz al final del túnel, la confianza en el futuro y la conexión con lo divino y lo espiritual.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Estrella al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Esperanza, fe y optimismo</li>
            <li>Renovación, sanación y claridad</li>
            <li>Inspiración, creatividad y guía espiritual</li>
            <li>Confianza en el futuro y en uno mismo</li>
            <li>Conexión con el propósito de vida</li>
          </ul>
          <p className="mb-2">Al derecho, La Estrella indica que es momento de confiar, sanar y dejarse guiar por la inspiración y la fe. Es una carta de luz y esperanza tras la tormenta.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Estrella Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Pérdida de fe, desánimo o pesimismo</li>
            <li>Falta de inspiración o bloqueo creativo</li>
            <li>Desconexión espiritual, dudas</li>
            <li>Estancamiento emocional</li>
            <li>Necesidad de recuperar la esperanza</li>
          </ul>
          <p className="mb-2">Invertida, La Estrella advierte sobre la importancia de no perder la fe, buscar apoyo y reconectar con la inspiración y la confianza en el futuro.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Simbolismo de La Estrella</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La estrella grande: guía, esperanza y luz espiritual</li>
            <li>Las siete estrellas pequeñas: chakras, equilibrio y protección</li>
            <li>El agua: sanación, emociones y fluidez</li>
            <li>La mujer desnuda: pureza, autenticidad y vulnerabilidad</li>
            <li>La tierra y la naturaleza: conexión con lo terrenal y lo divino</li>
          </ul>
        </section>

        {/* La Estrella en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">La Estrella en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Esperanza renovada, relaciones sanadoras, amor sincero.<br/>Invertido: Desilusión, falta de fe en la relación, necesidad de sanar heridas.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Trabajo</h3>
              <p>Al derecho: Nuevas oportunidades, inspiración, éxito creativo.<br/>Invertido: Falta de motivación, proyectos estancados, desánimo laboral.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Sanación, recuperación, bienestar.<br/>Invertido: Falta de energía, necesidad de cuidar la salud emocional.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Ejemplos de Preguntas para La Estrella</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué esperanza debo mantener en este momento?</li>
            <li>¿Cómo puedo sanar y renovarme?</li>
            <li>¿Dónde encontrar inspiración para avanzar?</li>
            <li>¿Qué me guía hacia mi propósito?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos si sale La Estrella</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Confía en el futuro y mantén la fe</li>
            <li>Permítete sanar y abrirte a nuevas oportunidades</li>
            <li>Busca inspiración en lo cotidiano</li>
            <li>Conéctate con tu esencia y sé auténtico/a</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre La Estrella</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Estrella es una carta positiva?</strong>
              <p>Sí, al derecho es una de las cartas más positivas y esperanzadoras del tarot.</p>
            </div>
            <div>
              <strong>¿Qué significa La Estrella en el amor?</strong>
              <p>Al derecho: esperanza y sanación. Invertido: desilusión o necesidad de sanar.</p>
            </div>
            <div>
              <strong>¿La Estrella siempre indica éxito?</strong>
              <p>No siempre, pero sí señala inspiración, guía y confianza en el proceso.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las estrellas en la carta?</strong>
              <p>La protección, la guía espiritual y el equilibrio de los chakras.</p>
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
        <div className="text-center bg-gradient-to-r from-blue-300 to-yellow-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres saber qué te depara La Estrella?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Estrella para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ⭐ Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
