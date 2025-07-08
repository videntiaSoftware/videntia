import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cartas de la Corte en el Tarot: Significado, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado y la interpretación de las cartas de la corte en el tarot. Guía completa sobre Sotas, Caballeros, Reinas y Reyes, ejemplos, consejos, preguntas frecuentes y enlaces internos.",
  keywords: [
    "cartas corte tarot", "sotas tarot", "caballeros tarot", "reinas tarot", "reyes tarot", "interpretar cartas corte", "significado cartas corte", "ejemplo cartas corte tarot", "personas tarot"
  ],
  openGraph: {
    title: "Cartas de la Corte en el Tarot: Significado y Consejos",
    description: "Guía profesional sobre la interpretación de las cartas de la corte en el tarot. Ejemplos, consejos y preguntas frecuentes.",
    url: "/blog/cartas-corte-interpretacion"
  },
  alternates: {
    canonical: "/blog/cartas-corte-interpretacion"
  }
};

export default function CartasCorteInterpretacion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Cartas de la Corte en el Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Significado, interpretación, ejemplos y consejos para leer Sotas, Caballeros, Reinas y Reyes.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-menores" className="text-purple-600 hover:underline font-semibold">Arcanos Menores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/cartas-corte-tarot.png" alt="Cartas de la corte en el tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué son las cartas de la corte en el tarot?</h2>
          <p className="mb-4">Las cartas de la corte (Sotas, Caballeros, Reinas y Reyes) representan personas, actitudes, energías o situaciones en una tirada. Son las figuras de los Arcanos Menores y su interpretación puede variar según el contexto, la pregunta y la posición en la tirada.</p>
        </section>

        {/* Significado de cada carta de la corte */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de las cartas de la corte</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li><strong>Sotas:</strong> Juventud, inicios, mensajes, aprendizajes, curiosidad.</li>
            <li><strong>Caballeros:</strong> Acción, movimiento, búsqueda, desafíos, energía dinámica.</li>
            <li><strong>Reinas:</strong> Madurez emocional, intuición, cuidado, influencia femenina, sabiduría.</li>
            <li><strong>Reyes:</strong> Autoridad, liderazgo, control, influencia masculina, experiencia.</li>
          </ul>
        </section>

        {/* Cómo interpretar las cartas de la corte */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">¿Cómo interpretar las cartas de la corte?</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Pueden representar personas reales (consultante, alguien cercano) o aspectos de la personalidad.</li>
            <li>Observa el palo: Bastos (acción), Copas (emociones), Espadas (mente), Oros (materia).</li>
            <li>Considera la edad, género y actitud de la figura según la pregunta.</li>
            <li>En tiradas generales, pueden señalar influencias externas o internas.</li>
            <li>Su posición (derecho/invertido) modifica el mensaje: desde virtudes hasta excesos o bloqueos.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de interpretación de una carta de la corte</h2>
          <p className="mb-2">Pregunta: <em>¿Cómo evolucionará mi relación?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Sale la Reina de Copas:</strong> Indica madurez emocional, comprensión, apoyo y una energía femenina positiva en la relación.</li>
            <li><strong>Sale el Caballero de Espadas invertido:</strong> Advierte sobre impulsividad, discusiones o falta de tacto.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para leer cartas de la corte</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>No te limites a la literalidad: pueden ser rasgos, situaciones o energías, no solo personas.</li>
            <li>Relaciona la carta con el contexto y la pregunta.</li>
            <li>Observa la interacción entre varias cartas de la corte en la tirada.</li>
            <li>Confía en tu intuición para identificar a quién o qué representa.</li>
            <li>Utiliza la carta como consejo: ¿qué actitud adoptar o evitar?</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre cartas de la corte</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Siempre representan personas?</strong>
              <p>No necesariamente. Pueden ser actitudes, energías o situaciones según el contexto.</p>
            </div>
            <div>
              <strong>¿Cómo saber a quién representa?</strong>
              <p>Observa la pregunta, el contexto y tu intuición. A veces es el consultante, otras una persona cercana o una actitud a adoptar.</p>
            </div>
            <div>
              <strong>¿Qué significa si salen varias cartas de la corte?</strong>
              <p>Puede indicar la presencia de varias personas influyentes o la necesidad de trabajar diferentes aspectos de la personalidad.</p>
            </div>
            <div>
              <strong>¿El género de la carta importa?</strong>
              <p>Es simbólico. Lo importante es la energía (activa, receptiva, madura, joven) más que el género literal.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/cuatro-palos-tarot-elementos" className="text-purple-700 hover:underline font-semibold">Los 4 Palos del Tarot</Link>
          <Link href="/blog/errores-comunes-leer-tarot" className="text-purple-700 hover:underline font-semibold">Errores comunes al leer el tarot</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres saber qué carta de la corte te representa?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y descubre el mensaje de las figuras de la corte para ti.</p>
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
