import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Los 4 Palos del Tarot y sus Elementos: Copas, Espadas, Bastos y Oros | Videntia Blog",
  description: "Descubre el significado de los cuatro palos del tarot: Copas, Espadas, Bastos y Oros. Correspondencias elementales, simbolismo, interpretación en lecturas y consejos para tarotistas.",
  keywords: [
    "palos tarot", "elementos tarot", "copas tarot", "espadas tarot", "bastos tarot", "oros tarot", "significado palos tarot", "elementos cartas tarot", "interpretar palos tarot"
  ],
  openGraph: {
    title: "Los 4 Palos del Tarot y sus Elementos: Copas, Espadas, Bastos y Oros",
    description: "Guía completa sobre los palos del tarot, sus elementos y cómo interpretarlos en una lectura.",
    url: "/blog/cuatro-palos-tarot-elementos"
  },
  alternates: {
    canonical: "/blog/cuatro-palos-tarot-elementos"
  }
};

export default function CuatroPalosTarotElementos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">Los 4 Palos del Tarot y sus Elementos</h1>
          <p className="text-lg text-blue-900 mb-4">Copas, Espadas, Bastos y Oros: significado, correspondencias y consejos para tus lecturas.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-blue-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representan los palos del tarot?</h2>
          <p className="mb-4">Los cuatro palos del tarot (Copas, Espadas, Bastos y Oros) forman la base de los Arcanos Menores. Cada palo está asociado a un elemento, un área de la vida y una energía particular. Comprenderlos es clave para interpretar cualquier tirada con profundidad y precisión.</p>
        </section>

        {/* Tabla de correspondencias */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Correspondencias de los Palos y Elementos</h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-blue-200 rounded-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-4 py-2">Palo</th>
                  <th className="px-4 py-2">Elemento</th>
                  <th className="px-4 py-2">Ámbito</th>
                  <th className="px-4 py-2">Cualidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-bold text-blue-700">Copas</td>
                  <td className="px-4 py-2">Agua</td>
                  <td className="px-4 py-2">Emociones, relaciones, intuición</td>
                  <td className="px-4 py-2">Sensibilidad, empatía</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold text-blue-700">Espadas</td>
                  <td className="px-4 py-2">Aire</td>
                  <td className="px-4 py-2">Mente, comunicación, conflictos</td>
                  <td className="px-4 py-2">Razonamiento, claridad</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold text-blue-700">Bastos</td>
                  <td className="px-4 py-2">Fuego</td>
                  <td className="px-4 py-2">Acción, creatividad, pasión</td>
                  <td className="px-4 py-2">Energía, iniciativa</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold text-blue-700">Oros</td>
                  <td className="px-4 py-2">Tierra</td>
                  <td className="px-4 py-2">Material, trabajo, recursos</td>
                  <td className="px-4 py-2">Practicidad, estabilidad</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Significado de cada palo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Significado de Cada Palo</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-1">Copas (Agua)</h3>
              <p>Representan el mundo emocional, los sentimientos, el amor, la familia y la intuición. Predominan en lecturas sobre relaciones y bienestar interior.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-1">Espadas (Aire)</h3>
              <p>Simbolizan la mente, el pensamiento lógico, la comunicación y los desafíos. Suelen indicar conflictos, decisiones y claridad mental.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-1">Bastos (Fuego)</h3>
              <p>Asociados a la acción, la creatividad, la pasión y los nuevos comienzos. Hablan de proyectos, motivación y energía vital.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-1">Oros (Tierra)</h3>
              <p>Relacionados con lo material, el trabajo, el dinero y la seguridad. Indican logros, recursos y estabilidad.</p>
            </div>
          </div>
        </section>

        {/* Consejos para interpretar los palos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos para Interpretar los Palos en una Lectura</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Observa qué palo predomina en la tirada: indica el área de la vida más relevante.</li>
            <li>Relaciona el elemento con la pregunta del consultante.</li>
            <li>Combina el significado del palo con el número o figura de la carta.</li>
            <li>Presta atención a la ausencia de un palo: puede señalar carencias o bloqueos.</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre los Palos del Tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Qué palo es más positivo?</strong>
              <p>Todos los palos tienen aspectos positivos y desafiantes. Depende del contexto y la carta específica.</p>
            </div>
            <div>
              <strong>¿Se pueden asociar los palos a signos zodiacales?</strong>
              <p>Sí, cada elemento se relaciona con signos: Agua (Cáncer, Escorpio, Piscis), Aire (Géminis, Libra, Acuario), Fuego (Aries, Leo, Sagitario), Tierra (Tauro, Virgo, Capricornio).</p>
            </div>
            <div>
              <strong>¿Qué significa que falte un palo en la tirada?</strong>
              <p>Puede indicar que esa área de la vida está descuidada o no es relevante en ese momento.</p>
            </div>
            <div>
              <strong>¿Los palos tienen género o polaridad?</strong>
              <p>Algunos sistemas los asocian a energías masculinas (Bastos, Espadas) y femeninas (Copas, Oros), pero es una interpretación flexible.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-blue-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-blue-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-200 to-yellow-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres aprender más sobre los palos del tarot?</h3>
          <p className="text-blue-900 mb-4">Explora el significado de cada carta y haz tu propia tirada gratis.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
