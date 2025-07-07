import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Templanza en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Templanza en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Templanza en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la templanza tarot", "la templanza significado", "la templanza derecho", "la templanza invertido", "la templanza amor", "la templanza trabajo", "la templanza salud", "la templanza carta tarot", "la templanza rider waite", "la templanza marsella"
  ],
  openGraph: {
    title: "La Templanza en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Templanza en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-templanza"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-templanza"
  }
};

export default function LaTemplanzaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-blue-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-orange-700 mb-4 font-cinzel">La Templanza (XIV) en el Tarot</h1>
          <p className="text-lg text-orange-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-orange-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-orange-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-templanza-tarot.png" alt="La Templanza Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-orange-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-orange-700 mb-3">¿Qué representa La Templanza en el Tarot?</h2>
          <p className="mb-4">La Templanza es la carta número XIV de los Arcanos Mayores y simboliza el equilibrio, la armonía, la paciencia y la moderación. Representa la capacidad de encontrar el punto medio, sanar y fluir con serenidad ante los cambios de la vida.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Templanza al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Equilibrio, armonía y paz interior</li>
            <li>Paciencia, moderación y autocontrol</li>
            <li>Sanación, reconciliación y adaptación</li>
            <li>Soluciones creativas y diplomacia</li>
            <li>Fluir con los cambios y encontrar el punto medio</li>
          </ul>
          <p className="mb-2">Al derecho, La Templanza indica que es momento de actuar con calma, buscar el equilibrio y confiar en el proceso de sanación y armonía.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Templanza Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Desequilibrio, impaciencia o excesos</li>
            <li>Conflictos, falta de armonía</li>
            <li>Dificultad para adaptarse o sanar</li>
            <li>Reacciones impulsivas o extremas</li>
            <li>Estancamiento emocional</li>
          </ul>
          <p className="mb-2">Invertida, La Templanza advierte sobre la necesidad de recuperar el equilibrio, evitar los extremos y trabajar la paciencia y la tolerancia.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Simbolismo de La Templanza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El ángel: guía espiritual, protección y sanación</li>
            <li>Las jarras: mezcla de opuestos, equilibrio y alquimia</li>
            <li>El agua: emociones, fluidez y purificación</li>
            <li>El sendero: camino hacia la armonía y la iluminación</li>
            <li>El sol al fondo: esperanza y claridad</li>
          </ul>
        </section>

        {/* La Templanza en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-700 mb-2">La Templanza en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-orange-100 p-4 rounded-lg border border-orange-300">
              <h3 className="font-bold text-orange-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones equilibradas, reconciliación, amor sereno.<br/>Invertido: Conflictos, falta de entendimiento, emociones desbordadas.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Trabajo</h3>
              <p>Al derecho: Buen ambiente laboral, cooperación, soluciones creativas.<br/>Invertido: Desacuerdos, estrés, falta de colaboración.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Sanación, equilibrio físico y emocional.<br/>Invertido: Desajustes, necesidad de moderación y autocuidado.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Ejemplos de Preguntas para La Templanza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo recuperar el equilibrio en mi vida?</li>
            <li>¿Qué debo sanar o reconciliar?</li>
            <li>¿Estoy actuando con paciencia y moderación?</li>
            <li>¿Qué solución creativa puedo encontrar?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Consejos si sale La Templanza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Busca el equilibrio y evita los extremos</li>
            <li>Practica la paciencia y la tolerancia</li>
            <li>Confía en el proceso de sanación</li>
            <li>Combina lo mejor de cada situación</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Preguntas Frecuentes sobre La Templanza</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Templanza es una carta positiva?</strong>
              <p>Sí, al derecho indica armonía y sanación. Invertida señala desequilibrio o conflictos.</p>
            </div>
            <div>
              <strong>¿Qué significa La Templanza en el amor?</strong>
              <p>Al derecho: relaciones equilibradas y reconciliación. Invertido: conflictos o falta de entendimiento.</p>
            </div>
            <div>
              <strong>¿La Templanza siempre indica sanación?</strong>
              <p>No siempre. Puede señalar la necesidad de buscar equilibrio y moderación.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las jarras en La Templanza?</strong>
              <p>La mezcla de opuestos y la búsqueda del equilibrio perfecto.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-orange-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-orange-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-orange-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-orange-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-300 to-blue-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-orange-800 mb-2">¿Quieres saber qué te depara La Templanza?</h3>
          <p className="text-orange-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Templanza para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🏺 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
