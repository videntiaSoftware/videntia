import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Torre en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Torre en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Torre en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la torre tarot", "la torre significado", "la torre derecho", "la torre invertido", "la torre amor", "la torre trabajo", "la torre salud", "la torre carta tarot", "la torre rider waite", "la torre marsella"
  ],
  openGraph: {
    title: "La Torre en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Torre en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-torre"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-torre"
  }
};

export default function LaTorreTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-yellow-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-yellow-700 mb-4 font-cinzel">La Torre (XVI) en el Tarot</h1>
          <p className="text-lg text-yellow-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-yellow-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-yellow-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-torre-tarot.png" alt="La Torre Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-yellow-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-3">¿Qué representa La Torre en el Tarot?</h2>
          <p className="mb-4">La Torre es la carta número XVI de los Arcanos Mayores y simboliza la ruptura, el cambio repentino, la crisis y la liberación de estructuras obsoletas. Representa sacudidas inesperadas, revelaciones y la oportunidad de reconstruir sobre bases más sólidas.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Torre al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Cambios bruscos, crisis y rupturas</li>
            <li>Revelaciones, verdades inesperadas</li>
            <li>Caída de estructuras falsas o limitantes</li>
            <li>Liberación y oportunidad de reconstrucción</li>
            <li>Despertar repentino, transformación radical</li>
          </ul>
          <p className="mb-2">Al derecho, La Torre indica que es momento de aceptar los cambios, aunque sean dolorosos, y ver la crisis como una oportunidad de crecimiento y renovación.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Torre Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Resistencia al cambio, miedo a soltar</li>
            <li>Crisis evitada o postergada</li>
            <li>Estancamiento, negación de la realidad</li>
            <li>Oportunidad de reconstruir con menos daño</li>
            <li>Lecciones no aprendidas</li>
          </ul>
          <p className="mb-2">Invertida, La Torre advierte sobre la necesidad de dejar de resistirse, aceptar la transformación y aprender de las crisis para evitar que se repitan.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Simbolismo de La Torre</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La torre derrumbada: caída de estructuras rígidas</li>
            <li>El rayo: intervención divina, despertar repentino</li>
            <li>Las llamas: purificación y transformación</li>
            <li>Las figuras cayendo: liberación de ataduras</li>
            <li>El cielo oscuro: incertidumbre y posibilidad de renacimiento</li>
          </ul>
        </section>

        {/* La Torre en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">La Torre en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Amor</h3>
              <p>Al derecho: Rupturas, crisis, verdades reveladas.<br/>Invertido: Crisis evitada, necesidad de reconstruir la relación.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-gray-700 mb-2">Trabajo</h3>
              <p>Al derecho: Despidos, cambios inesperados, proyectos que se caen.<br/>Invertido: Cambios postergados, oportunidad de corregir errores.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Crisis de salud, necesidad de cambios drásticos.<br/>Invertido: Recuperación tras la crisis, prevención de recaídas.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Ejemplos de Preguntas para La Torre</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué estructura de mi vida necesita cambiar?</li>
            <li>¿Estoy resistiendo una verdad importante?</li>
            <li>¿Cómo puedo reconstruir tras la crisis?</li>
            <li>¿Qué lección debo aprender de este cambio?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Consejos si sale La Torre</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Acepta los cambios y no temas soltar lo que ya no sirve</li>
            <li>Aprende de las crisis y reconstruye sobre bases sólidas</li>
            <li>No resistas la verdad, aunque duela</li>
            <li>Confía en que tras la tormenta llega la renovación</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Preguntas Frecuentes sobre La Torre</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Torre es una carta negativa?</strong>
              <p>No necesariamente. Aunque indica crisis, también señala oportunidades de renovación y crecimiento.</p>
            </div>
            <div>
              <strong>¿Qué significa La Torre en el amor?</strong>
              <p>Al derecho: rupturas o crisis. Invertido: reconstrucción o crisis evitada.</p>
            </div>
            <div>
              <strong>¿La Torre siempre indica pérdidas?</strong>
              <p>No siempre. Puede señalar cambios necesarios para avanzar.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el rayo en La Torre?</strong>
              <p>La intervención divina y el despertar repentino ante una verdad.</p>
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
        <div className="text-center bg-gradient-to-r from-yellow-300 to-gray-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">¿Quieres saber qué te depara La Torre?</h3>
          <p className="text-yellow-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Torre para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🗼 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
