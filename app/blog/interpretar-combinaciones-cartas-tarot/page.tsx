import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Interpretar Combinaciones de Cartas en el Tarot: Guía y Ejemplos | Videntia Blog",
  description: "Aprende a interpretar combinaciones de cartas en el tarot. Métodos, ejemplos, consejos, preguntas frecuentes y enlaces internos para lecturas más profundas y precisas.",
  keywords: [
    "combinaciones cartas tarot", "interpretar combinaciones tarot", "ejemplos combinaciones tarot", "lectura avanzada tarot", "significado cartas juntas", "tarot combinaciones"
  ],
  openGraph: {
    title: "Cómo Interpretar Combinaciones de Cartas en el Tarot: Guía y Ejemplos",
    description: "Guía profesional para interpretar combinaciones de cartas en el tarot. Métodos, ejemplos y consejos para lecturas avanzadas.",
    url: "/blog/interpretar-combinaciones-cartas-tarot"
  },
  alternates: {
    canonical: "/blog/interpretar-combinaciones-cartas-tarot"
  }
};

export default function InterpretarCombinacionesCartasTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Cómo Interpretar Combinaciones de Cartas en el Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Guía para entender el significado de las cartas cuando aparecen juntas en una tirada.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-600 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/interpretar-combinaciones-cartas-tarot.png" alt="Interpretar combinaciones de cartas en el tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Por qué es importante interpretar combinaciones?</h2>
          <p className="mb-4">El verdadero arte del tarot está en la interpretación de las cartas en conjunto. Las combinaciones revelan matices, historias y mensajes que no se ven al analizar cada carta por separado. Aprender a leer combinaciones te permitirá realizar lecturas más profundas y precisas.</p>
        </section>

        {/* Métodos para interpretar combinaciones */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Métodos para interpretar combinaciones de cartas</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Observa la relación entre los arcanos mayores y menores.</li>
            <li>Identifica cartas que refuercen o contradigan el mensaje principal.</li>
            <li>Presta atención a los elementos repetidos (palos, números, colores).</li>
            <li>Considera la posición y el orden de aparición de las cartas.</li>
            <li>Utiliza la intuición para captar la historia global de la tirada.</li>
          </ul>
        </section>

        {/* Ejemplo práctico de combinación */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de combinación de cartas</h2>
          <p className="mb-2">Pregunta: <em>¿Cómo evolucionará mi relación?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>La Emperatriz + 2 de Copas:</strong> Indica una relación que crece, armonía y fertilidad emocional.</li>
            <li><strong>El Diablo + 7 de Espadas:</strong> Advierte sobre engaños, dependencias o relaciones tóxicas.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para leer combinaciones de cartas</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>No memorices combinaciones, comprende el significado de cada carta y su interacción.</li>
            <li>Confía en tu intuición y en la historia que cuentan las cartas juntas.</li>
            <li>Observa si hay cartas dominantes que marcan el tono de la tirada.</li>
            <li>Registra tus tiradas y aprende de la experiencia práctica.</li>
            <li>Consulta guías o libros solo como referencia, no como regla absoluta.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre combinaciones de cartas</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Existen combinaciones fijas en el tarot?</strong>
              <p>Algunas son tradicionales, pero cada lectura es única y depende del contexto y la pregunta.</p>
            </div>
            <div>
              <strong>¿Cómo saber si una combinación es positiva o negativa?</strong>
              <p>Depende de las cartas implicadas, su posición y la pregunta. Analiza el conjunto, no solo una carta.</p>
            </div>
            <div>
              <strong>¿Puedo preguntar por combinaciones específicas?</strong>
              <p>Sí, pero es mejor dejar que las cartas cuenten la historia de forma natural.</p>
            </div>
            <div>
              <strong>¿Qué hacer si no entiendo una combinación?</strong>
              <p>Consulta tu intuición, revisa el significado de cada carta y pide claridad al tarot.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/cuatro-palos-tarot-elementos" className="text-purple-700 hover:underline font-semibold">Los 4 Palos del Tarot</Link>
          <Link href="/blog/como-hacer-preguntas-efectivas-tarot" className="text-purple-700 hover:underline font-semibold">Cómo hacer preguntas efectivas al tarot</Link>
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres aprender a leer combinaciones?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y pon en práctica la interpretación de combinaciones en tus tiradas.</p>
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
