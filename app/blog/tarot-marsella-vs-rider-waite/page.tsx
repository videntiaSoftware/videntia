import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diferencias Entre Tarot de Marsella y Rider-Waite | Videntia Blog",
  description: "Descubre las diferencias clave entre el Tarot de Marsella y el Tarot Rider-Waite. Historia, simbolismo, estructura, ventajas y cuál elegir para tus lecturas. Comparativa completa para tarotistas y principiantes.",
  keywords: [
    "tarot marsella vs rider waite", "diferencias tarot marsella rider waite", "tarot marsella", "tarot rider waite", "mejor tarot para leer", "simbolismo tarot marsella", "simbolismo tarot rider waite"
  ],
  openGraph: {
    title: "Diferencias Entre Tarot de Marsella y Rider-Waite",
    description: "Comparativa completa entre los dos mazos de tarot más populares. Historia, simbolismo y consejos para elegir.",
    url: "/blog/tarot-marsella-vs-rider-waite"
  },
  alternates: {
    canonical: "/blog/tarot-marsella-vs-rider-waite"
  }
};

export default function TarotMarsellaVsRiderWaite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Diferencias Entre Tarot de Marsella y Rider-Waite</h1>
          <p className="text-lg text-purple-900 mb-4">Comparativa de historia, simbolismo, estructura y ventajas de los dos mazos más populares del tarot.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Por qué comparar Marsella y Rider-Waite?</h2>
          <p className="mb-4">El Tarot de Marsella y el Tarot Rider-Waite son los dos mazos más utilizados en el mundo. Cada uno tiene su historia, simbolismo y estilo de lectura. Conocer sus diferencias te ayudará a elegir el mazo que mejor se adapta a tu práctica y a profundizar en el arte del tarot.</p>
        </section>

        {/* Historia y Origen */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Historia y Origen</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Tarot de Marsella:</strong> Surge en Francia e Italia en los siglos XVII-XVIII. Es el mazo clásico europeo, con imágenes medievales y colores planos.</li>
            <li><strong>Tarot Rider-Waite:</strong> Creado en 1909 por Arthur E. Waite y Pamela Colman Smith en Inglaterra. Revoluciona el tarot al ilustrar todos los arcanos menores.</li>
          </ul>
        </section>

        {/* Simbolismo y Estilo Visual */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Simbolismo y Estilo Visual</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Marsella:</strong> Imágenes más abstractas, figuras rígidas, colores primarios, simbolismo tradicional y arquetípico.</li>
            <li><strong>Rider-Waite:</strong> Ilustraciones detalladas, escenas narrativas, simbolismo esotérico, colores variados y expresividad emocional.</li>
          </ul>
        </section>

        {/* Estructura y Lectura */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Estructura y Lectura</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Marsella:</strong> Arcanos menores con palos y números, sin escenas ilustradas. Requiere memorización y conocimiento tradicional.</li>
            <li><strong>Rider-Waite:</strong> Todos los arcanos menores tienen escenas, facilitando la intuición y la interpretación visual.</li>
          </ul>
        </section>

        {/* Ventajas y Desventajas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ventajas y Desventajas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
              <h3 className="font-bold text-purple-700 mb-2">Tarot de Marsella</h3>
              <ul className="list-disc pl-6 mb-2">
                <li>Tradición y autenticidad histórica</li>
                <li>Ideal para estudios esotéricos clásicos</li>
                <li>Desafiante para principiantes</li>
                <li>Menos visual en arcanos menores</li>
              </ul>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Tarot Rider-Waite</h3>
              <ul className="list-disc pl-6 mb-2">
                <li>Fácil de aprender e interpretar</li>
                <li>Escenas visuales en todas las cartas</li>
                <li>Gran variedad de mazos derivados</li>
                <li>Algunos puristas lo consideran "moderno"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ¿Cuál elegir? */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">¿Cuál elegir para tus lecturas?</h2>
          <p className="mb-3">Si eres principiante, el Rider-Waite suele ser más accesible por sus imágenes. Si buscas profundidad tradicional y un enfoque más simbólico, el Marsella es ideal. Muchos tarotistas usan ambos según la consulta y el consultante.</p>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Cuál es más antiguo?</strong>
              <p>El Tarot de Marsella es anterior al Rider-Waite.</p>
            </div>
            <div>
              <strong>¿Puedo usar ambos mazos?</strong>
              <p>Sí, muchos lectores alternan según la consulta y la preferencia personal.</p>
            </div>
            <div>
              <strong>¿Cuál es mejor para aprender?</strong>
              <p>El Rider-Waite es más intuitivo para principiantes por sus ilustraciones.</p>
            </div>
            <div>
              <strong>¿Las cartas tienen el mismo significado?</strong>
              <p>La base es similar, pero el simbolismo y la interpretación pueden variar según el mazo.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres practicar con ambos mazos?</h3>
          <p className="text-purple-900 mb-4">Haz una tirada de tarot gratis y experimenta la diferencia entre Marsella y Rider-Waite.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
