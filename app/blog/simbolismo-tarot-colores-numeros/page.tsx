import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Mundo Simbólico del Tarot: Colores, Números y Símbolos | Videntia Blog",
  description: "Profundiza en el simbolismo del tarot: qué representan los colores, los números y los símbolos más importantes en las cartas. Guía para interpretar el lenguaje oculto del tarot en tus lecturas.",
  keywords: [
    "simbolismo tarot", "colores tarot", "números tarot", "símbolos cartas tarot", "interpretar símbolos tarot", "lenguaje oculto tarot", "significado colores tarot", "significado números tarot"
  ],
  openGraph: {
    title: "El Mundo Simbólico del Tarot: Colores, Números y Símbolos",
    description: "Guía completa sobre el simbolismo en el tarot: colores, números y símbolos clave para interpretar las cartas.",
    url: "/blog/simbolismo-tarot-colores-numeros"
  },
  alternates: {
    canonical: "/blog/simbolismo-tarot-colores-numeros"
  }
};

export default function SimbolismoTarotColoresNumeros() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 font-cinzel">El Mundo Simbólico del Tarot: Colores, Números y Símbolos</h1>
          <p className="text-lg text-indigo-900 mb-4">Descubre el significado oculto de los colores, números y símbolos en las cartas del tarot.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-indigo-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-indigo-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">¿Por qué es importante el simbolismo en el tarot?</h2>
          <p className="mb-4">El tarot es un lenguaje visual lleno de símbolos, colores y números que transmiten mensajes profundos. Comprender este lenguaje oculto te permite interpretar las cartas con mayor precisión y conectar con su sabiduría ancestral.</p>
        </section>

        {/* Simbolismo de los colores */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Significado de los Colores en el Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Rojo:</strong> Pasión, energía, acción, deseo.</li>
            <li><strong>Azul:</strong> Calma, espiritualidad, comunicación, verdad.</li>
            <li><strong>Amarillo:</strong> Claridad, intelecto, optimismo, conciencia.</li>
            <li><strong>Verde:</strong> Crecimiento, sanación, abundancia, naturaleza.</li>
            <li><strong>Negro:</strong> Misterio, inconsciente, protección, finales.</li>
            <li><strong>Blanco:</strong> Pureza, inocencia, nuevos comienzos, luz.</li>
            <li><strong>Dorado:</strong> Éxito, riqueza, iluminación, poder espiritual.</li>
            <li><strong>Púrpura:</strong> Sabiduría, intuición, poder psíquico.</li>
          </ul>
        </section>

        {/* Simbolismo de los números */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Significado de los Números en el Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>1:</strong> Inicio, individualidad, potencial.</li>
            <li><strong>2:</strong> Dualidad, equilibrio, asociación.</li>
            <li><strong>3:</strong> Creatividad, expansión, comunicación.</li>
            <li><strong>4:</strong> Estabilidad, estructura, fundamento.</li>
            <li><strong>5:</strong> Cambio, desafío, movimiento.</li>
            <li><strong>6:</strong> Armonía, amor, responsabilidad.</li>
            <li><strong>7:</strong> Búsqueda, introspección, espiritualidad.</li>
            <li><strong>8:</strong> Poder, logros, transformación.</li>
            <li><strong>9:</strong> Culminación, sabiduría, cierre de ciclo.</li>
            <li><strong>10:</strong> Finalización, nuevos comienzos, totalidad.</li>
          </ul>
        </section>

        {/* Símbolos más comunes en el tarot */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Símbolos Clave en las Cartas del Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>El Sol:</strong> Éxito, vitalidad, claridad.</li>
            <li><strong>La Luna:</strong> Intuición, misterio, emociones ocultas.</li>
            <li><strong>La Estrella:</strong> Esperanza, inspiración, guía espiritual.</li>
            <li><strong>El Agua:</strong> Emociones, inconsciente, fluidez.</li>
            <li><strong>La Espada:</strong> Mente, verdad, conflicto.</li>
            <li><strong>El Bastón:</strong> Acción, creatividad, voluntad.</li>
            <li><strong>La Corona:</strong> Logro, autoridad, reconocimiento.</li>
            <li><strong>El Árbol:</strong> Crecimiento, conexión, vida.</li>
            <li><strong>El Perro:</strong> Instinto, lealtad, advertencia.</li>
            <li><strong>La Mariposa:</strong> Transformación, renacimiento.</li>
          </ul>
        </section>

        {/* Consejos para interpretar el simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Consejos para Interpretar el Simbolismo en el Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Observa los colores predominantes y su relación con la pregunta.</li>
            <li>Relaciona el número de la carta con el ciclo vital del consultante.</li>
            <li>Identifica símbolos repetidos en la tirada: refuerzan el mensaje.</li>
            <li>Confía en tu intuición para descifrar símbolos personales.</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Preguntas Frecuentes sobre Simbolismo en el Tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Todos los colores tienen el mismo significado en todos los mazos?</strong>
              <p>No, pueden variar según la tradición y el diseño del mazo, pero los significados básicos suelen coincidir.</p>
            </div>
            <div>
              <strong>¿Por qué es importante el número de la carta?</strong>
              <p>El número indica la etapa del proceso, el tipo de energía y el mensaje central de la carta.</p>
            </div>
            <div>
              <strong>¿Cómo aprender a interpretar símbolos complejos?</strong>
              <p>Estudia, observa y practica. Con el tiempo, los símbolos te hablarán de forma personal.</p>
            </div>
            <div>
              <strong>¿El simbolismo es igual en Marsella y Rider-Waite?</strong>
              <p>La base es similar, pero el Rider-Waite añade más detalles visuales y escenas narrativas.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-indigo-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-indigo-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog/cuatro-palos-tarot-elementos" className="text-indigo-700 hover:underline font-semibold">Palos y Elementos del Tarot</Link>
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-indigo-700 hover:underline font-semibold">Desarrollar la Intuición en el Tarot</Link>
          <Link href="/blog" className="text-indigo-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-indigo-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-indigo-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-800 mb-2">¿Quieres profundizar en el simbolismo del tarot?</h3>
          <p className="text-indigo-900 mb-4">Haz una tirada de tarot gratis y observa los símbolos que aparecen en tu lectura.</p>
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
