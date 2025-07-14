import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot Terapéutico: Sanación y Autoconocimiento con las Cartas | Videntia Blog",
  description: "Descubre el tarot terapéutico, su enfoque en la sanación emocional y el autoconocimiento. Métodos, ejemplos, consejos, preguntas frecuentes y enlaces internos para un uso consciente del tarot.",
  keywords: [
    "tarot terapeutico", "sanacion tarot", "autoconocimiento tarot", "tarot emocional", "tarot psicologico", "ejemplo tarot terapeutico", "interpretar tarot terapeutico"
  ],
  openGraph: {
    title: "Tarot Terapéutico: Sanación y Autoconocimiento con las Cartas",
    description: "Guía profesional sobre tarot terapéutico, sanación emocional y autoconocimiento. Métodos, ejemplos y consejos para un uso consciente del tarot.",
    url: "/blog/tarot-terapeutico-sanacion"
  },
  alternates: {
    canonical: "/blog/tarot-terapeutico-sanacion"
  }
};

export default function TarotTerapeuticoSanacion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Tarot Terapéutico: Sanación y Autoconocimiento</h1>
          <p className="text-lg text-purple-900 mb-4">Cómo el tarot puede ayudarte a sanar emociones y conocerte mejor.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-600 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/tarot-terapeutico-sanacion.png" alt="Tarot terapéutico y sanación" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué es el tarot terapéutico?</h2>
          <p className="mb-4">El tarot terapéutico es una herramienta de autoconocimiento y sanación emocional. Se utiliza para explorar bloqueos, heridas, patrones y recursos internos, facilitando la comprensión y el crecimiento personal. No busca predecir el futuro, sino acompañar procesos de transformación.</p>
        </section>

        {/* Métodos y enfoques del tarot terapéutico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">¿Cómo se usa el tarot terapéutico?</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Plantea preguntas sobre emociones, bloqueos, recursos y aprendizajes.</li>
            <li>Utiliza tiradas específicas para el autoconocimiento (tirada del árbol, tirada de la herida, etc.).</li>
            <li>Combina el tarot con técnicas de psicología, meditación o escritura terapéutica.</li>
            <li>Enfoca la lectura en el presente y en el proceso de sanación, no en la predicción.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de lectura terapéutica</h2>
          <p className="mb-2">Pregunta: <em>¿Qué necesito sanar en este momento?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Sale El Colgado:</strong> Indica la necesidad de soltar, aceptar y mirar la situación desde otra perspectiva.</li>
            <li><strong>Sale La Estrella:</strong> Habla de esperanza, fe y la capacidad de regeneración emocional.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para aprovechar el tarot terapéutico</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Haz preguntas abiertas y profundas, no solo sobre hechos externos.</li>
            <li>Registra tus tiradas y reflexiona sobre los mensajes recibidos.</li>
            <li>Combina el tarot con otras prácticas de sanación emocional.</li>
            <li>Busca acompañamiento profesional si surgen temas delicados.</li>
            <li>Confía en el proceso y en tu capacidad de transformación.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre tarot terapéutico</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot terapéutico reemplaza la terapia?</strong>
              <p>No. Es una herramienta complementaria, no un sustituto de la terapia profesional.</p>
            </div>
            <div>
              <strong>¿Se puede usar para cualquier problema?</strong>
              <p>Sí, pero es importante reconocer los límites y buscar ayuda profesional si es necesario.</p>
            </div>
            <div>
              <strong>¿Qué cartas son más útiles en el tarot terapéutico?</strong>
              <p>Los Arcanos Mayores suelen ser los más profundos, pero todas las cartas pueden aportar información valiosa.</p>
            </div>
            <div>
              <strong>¿Es necesario tener experiencia?</strong>
              <p>No, pero la práctica y la reflexión enriquecen la experiencia.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/tarot-evolutivo-viaje-alma" className="text-purple-700 hover:underline font-semibold">Tarot Evolutivo: El Viaje del Alma</Link>
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-purple-700 hover:underline font-semibold">Desarrollar la intuición en el tarot</Link>
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres sanar y conocerte mejor?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y comienza tu proceso de sanación y autoconocimiento.</p>
          <Link 
            href="/" 
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
