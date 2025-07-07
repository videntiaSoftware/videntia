import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Rueda de la Fortuna en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Rueda de la Fortuna en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Rueda de la Fortuna en el tarot Rider-Waite y Marsella.",
  keywords: [
    "rueda de la fortuna tarot", "rueda de la fortuna significado", "rueda de la fortuna derecho", "rueda de la fortuna invertido", "rueda de la fortuna amor", "rueda de la fortuna trabajo", "rueda de la fortuna salud", "rueda de la fortuna carta tarot", "rueda de la fortuna rider waite", "rueda de la fortuna marsella"
  ],
  openGraph: {
    title: "La Rueda de la Fortuna en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Rueda de la Fortuna en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-rueda-de-la-fortuna"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-rueda-de-la-fortuna"
  }
};

export default function RuedaFortunaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-yellow-700 mb-4 font-cinzel">La Rueda de la Fortuna (X) en el Tarot</h1>
          <p className="text-lg text-yellow-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-yellow-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-yellow-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-rueda-de-la-fortuna-tarot.png" alt="La Rueda de la Fortuna Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-yellow-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-3">¿Qué representa La Rueda de la Fortuna en el Tarot?</h2>
          <p className="mb-4">La Rueda de la Fortuna es la carta número X de los Arcanos Mayores y simboliza los ciclos de la vida, el destino, el cambio y la suerte. Representa giros inesperados, oportunidades y la importancia de adaptarse a los cambios. Es una carta de movimiento, evolución y sorpresas.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Rueda de la Fortuna al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Cambios positivos, suerte y oportunidades</li>
            <li>Destino, evolución y ciclos favorables</li>
            <li>Avance, progreso y nuevas etapas</li>
            <li>Eventos inesperados que traen crecimiento</li>
            <li>Adaptación y aceptación del flujo de la vida</li>
          </ul>
          <p className="mb-2">Al derecho, La Rueda de la Fortuna indica que la suerte está de tu lado y que se avecinan cambios favorables. Es momento de aprovechar las oportunidades y confiar en el destino.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Rueda de la Fortuna Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Bloqueos, retrasos o mala racha</li>
            <li>Resistencia al cambio, estancamiento</li>
            <li>Oportunidades perdidas, frustración</li>
            <li>Sentimiento de falta de control</li>
            <li>Necesidad de aprender de los ciclos difíciles</li>
          </ul>
          <p className="mb-2">Invertida, esta carta advierte sobre la importancia de aceptar los cambios, aprender de los desafíos y no resistirse al flujo natural de la vida.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Simbolismo de La Rueda de la Fortuna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La rueda: ciclos, destino y movimiento constante</li>
            <li>Las figuras (esfinge, serpiente, Anubis): fuerzas del destino y transformación</li>
            <li>Los cuatro seres alados: los elementos y la protección divina</li>
            <li>Las letras y símbolos: misterio, sabiduría y el azar</li>
            <li>El cielo azul: esperanza y nuevas posibilidades</li>
          </ul>
        </section>

        {/* La Rueda de la Fortuna en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">La Rueda de la Fortuna en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Amor</h3>
              <p>Al derecho: Cambios positivos, nuevas oportunidades amorosas, evolución en la relación.<br/>Invertido: Inestabilidad, rupturas inesperadas, necesidad de adaptarse.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Trabajo</h3>
              <p>Al derecho: Ascensos, cambios de trabajo, éxito inesperado.<br/>Invertido: Bloqueos, despidos, proyectos que no avanzan.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Recuperación, mejoría, cambios positivos.<br/>Invertido: Recaídas, altibajos, necesidad de aceptar los ciclos.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Ejemplos de Preguntas para La Rueda de la Fortuna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué cambio importante se avecina en mi vida?</li>
            <li>¿Cómo puedo aprovechar esta oportunidad?</li>
            <li>¿Qué lección debo aprender de este ciclo?</li>
            <li>¿Estoy fluyendo o resistiendo el cambio?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Consejos si sale La Rueda de la Fortuna</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Acepta los cambios y mantente flexible</li>
            <li>Confía en el destino y en el proceso de la vida</li>
            <li>Aprovecha las oportunidades que se presenten</li>
            <li>Aprende de los altibajos y mantén la esperanza</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Preguntas Frecuentes sobre La Rueda de la Fortuna</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Rueda de la Fortuna es una carta positiva?</strong>
              <p>Sí, al derecho suele indicar suerte y cambios favorables. Invertida señala bloqueos o ciclos difíciles.</p>
            </div>
            <div>
              <strong>¿Qué significa La Rueda de la Fortuna en el amor?</strong>
              <p>Al derecho: evolución y nuevas oportunidades. Invertido: inestabilidad o rupturas.</p>
            </div>
            <div>
              <strong>¿La Rueda de la Fortuna siempre indica suerte?</strong>
              <p>No siempre. Puede señalar cambios inesperados, tanto positivos como desafiantes.</p>
            </div>
            <div>
              <strong>¿Qué simboliza la rueda en la carta?</strong>
              <p>El ciclo de la vida, el destino y la constante transformación.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-yellow-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-yellow-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-yellow-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-yellow-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-300 to-blue-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">¿Quieres saber qué te depara La Rueda de la Fortuna?</h3>
          <p className="text-yellow-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Rueda de la Fortuna para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🎡 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
