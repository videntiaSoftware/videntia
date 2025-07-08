import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot y Toma de Decisiones: Cómo Usar las Cartas para Elegir Mejor | Videntia Blog",
  description: "Descubre cómo el tarot puede ayudarte en la toma de decisiones. Métodos, ejemplos, consejos, preguntas frecuentes y enlaces internos para elegir con mayor claridad y confianza.",
  keywords: [
    "tarot toma de decisiones", "usar tarot para decidir", "consultar tarot decisiones", "ejemplo tarot decisiones", "consejos tarot decisiones"
  ],
  openGraph: {
    title: "Tarot y Toma de Decisiones: Cómo Usar las Cartas para Elegir Mejor",
    description: "Guía profesional sobre cómo usar el tarot para la toma de decisiones. Métodos, ejemplos y consejos para elegir con claridad.",
    url: "/blog/tarot-toma-decisiones"
  },
  alternates: {
    canonical: "/blog/tarot-toma-decisiones"
  }
};

export default function TarotTomaDecisiones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Tarot y Toma de Decisiones</h1>
          <p className="text-lg text-purple-900 mb-4">Cómo usar el tarot para elegir con mayor claridad y confianza.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/consulta-tarot-gratis" className="text-purple-600 hover:underline font-semibold">Consulta de Tarot Gratis</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/tarot-toma-decisiones.png" alt="Tarot y toma de decisiones" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Cómo puede ayudarte el tarot a decidir?</h2>
          <p className="mb-4">El tarot es una herramienta poderosa para clarificar opciones, explorar consecuencias y conectar con la intuición antes de tomar decisiones importantes. No dicta el futuro, pero sí ilumina caminos y ayuda a ver con mayor perspectiva.</p>
        </section>

        {/* Métodos para usar el tarot en la toma de decisiones */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Métodos para tomar decisiones con el tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Tirada de dos o más opciones: una carta para cada alternativa.</li>
            <li>Tirada de pros y contras: cartas que muestran ventajas y desventajas de cada camino.</li>
            <li>Tirada de consejo: ¿qué actitud o energía favorece la mejor decisión?</li>
            <li>Explora miedos, bloqueos y recursos internos antes de decidir.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de tirada para tomar decisiones</h2>
          <p className="mb-2">Pregunta: <em>¿Debo cambiar de trabajo o quedarme?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Opción 1 (cambiar):</strong> Sale El Sol. Indica éxito, crecimiento y alegría en el nuevo camino.</li>
            <li><strong>Opción 2 (quedarse):</strong> Sale El Colgado. Señala estancamiento, espera o necesidad de reflexión.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para usar el tarot en la toma de decisiones</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>No delegues tu poder: el tarot orienta, pero la decisión final es tuya.</li>
            <li>Confía en tu intuición y en las sensaciones que te transmiten las cartas.</li>
            <li>Evita consultar repetidamente sobre la misma decisión.</li>
            <li>Registra tus tiradas y reflexiona sobre los resultados.</li>
            <li>Consulta solo cuando estés dispuesto/a a escuchar el mensaje, aunque no sea el esperado.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre tarot y decisiones</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot puede decirme qué hacer?</strong>
              <p>No. El tarot orienta, muestra caminos y consecuencias, pero la decisión es personal.</p>
            </div>
            <div>
              <strong>¿Qué pasa si las cartas no son claras?</strong>
              <p>Pide una carta de consejo o revisa si la pregunta está bien formulada.</p>
            </div>
            <div>
              <strong>¿Puedo usar el tarot para cualquier tipo de decisión?</strong>
              <p>Sí, pero recuerda que hay temas que requieren ayuda profesional (salud, legal, etc.).</p>
            </div>
            <div>
              <strong>¿Es mejor preguntar por opciones o por el aprendizaje?</strong>
              <p>Ambas son válidas. Preguntar por el aprendizaje puede aportar mayor claridad y crecimiento.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/como-hacer-preguntas-efectivas-tarot" className="text-purple-700 hover:underline font-semibold">Cómo hacer preguntas efectivas al tarot</Link>
          <Link href="/blog/interpretar-combinaciones-cartas-tarot" className="text-purple-700 hover:underline font-semibold">Interpretar combinaciones de cartas</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Tienes una decisión importante?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y obtén orientación para elegir tu mejor camino.</p>
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
