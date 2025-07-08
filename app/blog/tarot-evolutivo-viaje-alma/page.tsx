import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot Evolutivo: El Viaje del Alma y el Crecimiento Personal | Videntia Blog",
  description: "Descubre el tarot evolutivo, su enfoque en el crecimiento personal y el viaje del alma. Métodos, ejemplos, consejos, preguntas frecuentes y enlaces internos para profundizar en el autoconocimiento.",
  keywords: [
    "tarot evolutivo", "viaje del alma tarot", "crecimiento personal tarot", "autoconocimiento tarot", "tarot desarrollo personal", "ejemplo tarot evolutivo", "interpretar tarot evolutivo"
  ],
  openGraph: {
    title: "Tarot Evolutivo: El Viaje del Alma y el Crecimiento Personal",
    description: "Guía profesional sobre tarot evolutivo, autoconocimiento y el viaje del alma. Métodos, ejemplos y consejos para el desarrollo personal.",
    url: "/blog/tarot-evolutivo-viaje-alma"
  },
  alternates: {
    canonical: "/blog/tarot-evolutivo-viaje-alma"
  }
};

export default function TarotEvolutivoViajeAlma() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Tarot Evolutivo: El Viaje del Alma</h1>
          <p className="text-lg text-purple-900 mb-4">Cómo el tarot puede ayudarte en tu crecimiento personal y autoconocimiento.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-600 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/tarot-evolutivo-viaje-alma.png" alt="Tarot evolutivo y viaje del alma" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué es el tarot evolutivo?</h2>
          <p className="mb-4">El tarot evolutivo es una forma de lectura centrada en el crecimiento personal, el autoconocimiento y la evolución del alma. Más que predecir el futuro, busca comprender los procesos internos, los aprendizajes y los retos que enfrenta la persona en su camino vital.</p>
        </section>

        {/* El viaje del alma a través de los arcanos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">El viaje del alma en el tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Los Arcanos Mayores representan etapas clave del viaje interior.</li>
            <li>El Loco simboliza el inicio, la inocencia y la apertura a la experiencia.</li>
            <li>Cada carta es un arquetipo y un aprendizaje para el alma.</li>
            <li>El recorrido por los arcanos refleja los desafíos, logros y transformaciones personales.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de lectura evolutiva</h2>
          <p className="mb-2">Pregunta: <em>¿Qué aprendizaje me trae esta etapa de mi vida?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Sale El Ermitaño:</strong> Invita a la introspección, la búsqueda interior y la paciencia.</li>
            <li><strong>Sale La Fuerza:</strong> Señala la necesidad de confiar en la propia capacidad para superar retos.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para aprovechar el tarot evolutivo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Enfoca la lectura en el "para qué" y no solo en el "qué" o "cuándo".</li>
            <li>Utiliza preguntas abiertas que inviten a la reflexión y el autodescubrimiento.</li>
            <li>Registra tus tiradas y observa tu evolución a lo largo del tiempo.</li>
            <li>Combina el tarot con otras herramientas de autoconocimiento (escritura, meditación, terapia).</li>
            <li>Confía en tu intuición y en el mensaje profundo de las cartas.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre tarot evolutivo</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot evolutivo predice el futuro?</strong>
              <p>No. Su objetivo es el autoconocimiento y el crecimiento personal, no la adivinación.</p>
            </div>
            <div>
              <strong>¿Qué diferencia hay con el tarot tradicional?</strong>
              <p>El tarot evolutivo se centra en el proceso interno y el aprendizaje, no en hechos externos o predicciones.</p>
            </div>
            <div>
              <strong>¿Se puede usar cualquier mazo?</strong>
              <p>Sí, aunque los Arcanos Mayores suelen ser los más utilizados para este enfoque.</p>
            </div>
            <div>
              <strong>¿Es necesario tener experiencia?</strong>
              <p>No, pero la práctica y la reflexión profunda enriquecen la experiencia.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/historia-tarot-origenes" className="text-purple-700 hover:underline font-semibold">Historia y orígenes del tarot</Link>
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-purple-700 hover:underline font-semibold">Desarrollar la intuición en el tarot</Link>
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres iniciar tu viaje evolutivo?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y comienza tu camino de autoconocimiento.</p>
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
