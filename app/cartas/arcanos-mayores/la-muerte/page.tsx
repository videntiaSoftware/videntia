import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Muerte en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Muerte en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Muerte en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la muerte tarot", "la muerte significado", "la muerte derecho", "la muerte invertido", "la muerte amor", "la muerte trabajo", "la muerte salud", "la muerte carta tarot", "la muerte rider waite", "la muerte marsella"
  ],
  openGraph: {
    title: "La Muerte en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Muerte en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-muerte"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-muerte"
  }
};

export default function LaMuerteTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-black text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black mb-4 font-cinzel">La Muerte (XIII) en el Tarot</h1>
          <p className="text-lg text-black mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-black hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-black hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-muerte-tarot.png" alt="La Muerte Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-black bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-3">¿Qué representa La Muerte en el Tarot?</h2>
          <p className="mb-4">La Muerte es la carta número XIII de los Arcanos Mayores y simboliza el fin de una etapa, la transformación profunda y el renacimiento. No representa muerte física, sino cambios inevitables, cierres y la oportunidad de empezar de nuevo.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Muerte al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Transformación, renacimiento y nuevos comienzos</li>
            <li>Fin de una etapa, cierre de ciclos</li>
            <li>Dejar atrás lo que ya no sirve</li>
            <li>Oportunidad de crecimiento y evolución</li>
            <li>Liberación de cargas y apegos</li>
          </ul>
          <p className="mb-2">Al derecho, La Muerte indica que es momento de soltar el pasado y abrirse a una nueva etapa. Es una carta de cambio profundo y liberador.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Muerte Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Resistencia al cambio, miedo a soltar</li>
            <li>Estancamiento, bloqueos emocionales</li>
            <li>Negación de finales necesarios</li>
            <li>Dependencia de situaciones pasadas</li>
            <li>Oportunidades de transformación desaprovechadas</li>
          </ul>
          <p className="mb-2">Invertida, La Muerte advierte sobre la necesidad de aceptar los cambios y dejar ir lo que impide avanzar. El estancamiento solo se supera con apertura y desapego.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-2">Simbolismo de La Muerte</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La figura esquelética: transformación y fin de lo viejo</li>
            <li>El caballo blanco: pureza y renacimiento</li>
            <li>El sol naciente: esperanza y nuevos comienzos</li>
            <li>Las figuras caídas: igualdad ante el cambio</li>
            <li>El río: el fluir de la vida y la inevitabilidad de los ciclos</li>
          </ul>
        </section>

        {/* La Muerte en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-2">La Muerte en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-black">
              <h3 className="font-bold text-black mb-2">Amor</h3>
              <p>Al derecho: Fin de relaciones, transformación amorosa, nuevos comienzos.<br/>Invertido: Miedo a terminar, relaciones estancadas, dependencia emocional.</p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-black">
              <h3 className="font-bold text-white mb-2">Trabajo</h3>
              <p>Al derecho: Cambio de trabajo, cierre de proyectos, reinvención profesional.<br/>Invertido: Resistencia a cambios laborales, miedo a perder el empleo, estancamiento.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Recuperación, dejar malos hábitos, transformación positiva.<br/>Invertido: Negación de problemas, miedo al cambio, necesidad de soltar viejas costumbres.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-2">Ejemplos de Preguntas para La Muerte</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué debo dejar atrás para avanzar?</li>
            <li>¿Qué transformación está ocurriendo en mi vida?</li>
            <li>¿Cómo puedo aceptar el fin de esta etapa?</li>
            <li>¿Qué oportunidad de renacimiento tengo ante mí?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-2">Consejos si sale La Muerte</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Acepta los finales como parte del crecimiento</li>
            <li>No temas soltar lo que ya no te sirve</li>
            <li>Confía en el proceso de transformación</li>
            <li>Abre la puerta a nuevas oportunidades</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-2">Preguntas Frecuentes sobre La Muerte</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Muerte es una carta negativa?</strong>
              <p>No. Representa transformación y renacimiento, no muerte física.</p>
            </div>
            <div>
              <strong>¿Qué significa La Muerte en el amor?</strong>
              <p>Al derecho: cierre de ciclos y nuevos comienzos. Invertido: miedo a terminar o soltar.</p>
            </div>
            <div>
              <strong>¿La Muerte siempre indica pérdidas?</strong>
              <p>No necesariamente. Puede señalar cambios positivos y liberadores.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el sol en la carta de La Muerte?</strong>
              <p>La esperanza y el inicio de una nueva etapa tras el cierre de un ciclo.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-black hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-black hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-black hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-black hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gray-300 to-black p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-black mb-2">¿Quieres saber qué te depara La Muerte?</h3>
          <p className="text-black mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Muerte para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ⚰️ Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
