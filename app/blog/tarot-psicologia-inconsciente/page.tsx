import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot y Psicología: El Inconsciente y el Poder de las Cartas | Videntia Blog",
  description: "Explora la relación entre tarot y psicología, el papel del inconsciente y cómo las cartas pueden ser una herramienta de autoconocimiento. Ejemplos, consejos, preguntas frecuentes y enlaces internos.",
  keywords: [
    "tarot psicologia", "inconsciente tarot", "autoconocimiento tarot", "arquetipos tarot", "jung tarot", "psicologia profunda tarot", "ejemplo tarot psicologia"
  ],
  openGraph: {
    title: "Tarot y Psicología: El Inconsciente y el Poder de las Cartas",
    description: "Guía profesional sobre la relación entre tarot y psicología, el inconsciente y los arquetipos. Ejemplos, consejos y preguntas frecuentes.",
    url: "/blog/tarot-psicologia-inconsciente"
  },
  alternates: {
    canonical: "/blog/tarot-psicologia-inconsciente"
  }
};

export default function TarotPsicologiaInconsciente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Tarot y Psicología: El Inconsciente</h1>
          <p className="text-lg text-purple-900 mb-4">Cómo el tarot conecta con el inconsciente y los arquetipos para el autoconocimiento.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-600 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/tarot-psicologia-inconsciente.png" alt="Tarot y psicología del inconsciente" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué relación hay entre tarot y psicología?</h2>
          <p className="mb-4">El tarot es una poderosa herramienta simbólica que conecta con el inconsciente y los arquetipos universales. Desde la psicología profunda (Jung), las cartas permiten explorar emociones, patrones y recursos internos, facilitando el autoconocimiento y la transformación personal.</p>
        </section>

        {/* El tarot como espejo del inconsciente */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">El tarot y el inconsciente</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Las imágenes del tarot activan el inconsciente y despiertan asociaciones personales.</li>
            <li>Los arquetipos de los arcanos reflejan etapas, retos y aprendizajes universales.</li>
            <li>El tarot puede revelar bloqueos, deseos y recursos ocultos.</li>
            <li>Facilita el diálogo interno y la integración de aspectos inconscientes.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de uso psicológico del tarot</h2>
          <p className="mb-2">Pregunta: <em>¿Qué aspecto inconsciente influye en mi situación actual?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Sale La Luna:</strong> Indica emociones ocultas, miedos o intuiciones no reconocidas.</li>
            <li><strong>Sale El Mago:</strong> Señala recursos internos y la capacidad de transformar la realidad.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para integrar tarot y psicología</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Utiliza el tarot como herramienta de reflexión, no solo de predicción.</li>
            <li>Registra tus tiradas y observa patrones recurrentes.</li>
            <li>Combina el tarot con escritura, meditación o terapia.</li>
            <li>Confía en las imágenes y sensaciones que despiertan las cartas.</li>
            <li>Consulta a un profesional si surgen temas profundos o difíciles.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre tarot y psicología</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot puede usarse en terapia?</strong>
              <p>Sí, como herramienta de autoconocimiento y exploración simbólica, pero no reemplaza la terapia profesional.</p>
            </div>
            <div>
              <strong>¿Qué son los arquetipos en el tarot?</strong>
              <p>Son patrones universales de la psique, representados por los arcanos y presentes en todas las culturas.</p>
            </div>
            <div>
              <strong>¿El tarot revela el futuro o el inconsciente?</strong>
              <p>Principalmente revela aspectos internos, aunque puede orientar sobre tendencias futuras.</p>
            </div>
            <div>
              <strong>¿Es necesario saber psicología para usar el tarot?</strong>
              <p>No, pero conocer conceptos básicos enriquece la interpretación y el proceso personal.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/tarot-terapeutico-sanacion" className="text-purple-700 hover:underline font-semibold">Tarot terapéutico y sanación</Link>
          <Link href="/blog/tarot-evolutivo-viaje-alma" className="text-purple-700 hover:underline font-semibold">Tarot evolutivo: el viaje del alma</Link>
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres explorar tu inconsciente con el tarot?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y descubre el poder simbólico de las cartas en tu autoconocimiento.</p>
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
