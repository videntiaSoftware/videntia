import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ética en las Lecturas de Tarot: Responsabilidad y Buenas Prácticas | Videntia Blog",
  description: "Descubre la importancia de la ética y la responsabilidad en las lecturas de tarot. Consejos, ejemplos, preguntas frecuentes y enlaces internos para una consulta profesional y consciente.",
  keywords: [
    "etica tarot", "responsabilidad tarot", "buenas practicas tarot", "lecturas tarot etica", "consejos tarot profesional", "limites tarot", "deontologia tarot"
  ],
  openGraph: {
    title: "Ética en las Lecturas de Tarot: Responsabilidad y Buenas Prácticas",
    description: "Guía profesional sobre ética, responsabilidad y buenas prácticas en las lecturas de tarot. Consejos, ejemplos y preguntas frecuentes.",
    url: "/blog/etica-lecturas-tarot-responsabilidad"
  },
  alternates: {
    canonical: "/blog/etica-lecturas-tarot-responsabilidad"
  }
};

export default function EticaLecturasTarotResponsabilidad() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Ética en las Lecturas de Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Responsabilidad, límites y buenas prácticas para una consulta profesional y consciente.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/consulta-tarot-gratis" className="text-purple-600 hover:underline font-semibold">Consulta de Tarot Gratis</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/etica-lecturas-tarot-responsabilidad.png" alt="Ética en las lecturas de tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Por qué es importante la ética en el tarot?</h2>
          <p className="mb-4">La ética es fundamental para brindar lecturas responsables, honestas y respetuosas. Un tarotista ético protege la privacidad, evita crear dependencia y reconoce los límites de su labor, priorizando el bienestar del consultante.</p>
        </section>

        {/* Principios éticos y responsabilidad */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Principios éticos en las lecturas de tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Confidencialidad y respeto por la privacidad del consultante.</li>
            <li>Honestidad: no prometer resultados ni crear falsas expectativas.</li>
            <li>Evitar la dependencia y fomentar la autonomía personal.</li>
            <li>Reconocer los límites: derivar a profesionales en temas médicos, legales o psicológicos.</li>
            <li>No juzgar ni influir en las decisiones personales del consultante.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de actuación ética</h2>
          <p className="mb-2">Situación: Un consultante pregunta por un tema de salud grave.</p>
          <ul className="list-disc pl-6 mb-3">
            <li>Respuesta ética: Explicar que el tarot no reemplaza la consulta médica y recomendar acudir a un profesional.</li>
            <li>Ofrecer apoyo emocional y orientación, sin invadir competencias profesionales.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para lecturas responsables</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Establece límites claros desde el inicio de la consulta.</li>
            <li>Informa sobre el alcance real del tarot y sus limitaciones.</li>
            <li>Fomenta la toma de decisiones consciente y libre.</li>
            <li>Actualiza tus conocimientos y mantén una actitud profesional.</li>
            <li>Cuida tu propia energía y bienestar como lector/a.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre ética en el tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Puedo responder sobre salud, dinero o temas legales?</strong>
              <p>Solo de forma orientativa. Siempre recomienda acudir a profesionales en esos ámbitos.</p>
            </div>
            <div>
              <strong>¿Qué hacer si el consultante se vuelve dependiente?</strong>
              <p>Fomentar la autonomía, espaciar las consultas y derivar si es necesario.</p>
            </div>
            <div>
              <strong>¿Es ético leer el tarot para terceros sin su permiso?</strong>
              <p>No. Es importante respetar la privacidad y el libre albedrío de las personas.</p>
            </div>
            <div>
              <strong>¿Debo decir siempre la verdad aunque sea dura?</strong>
              <p>Sí, pero con empatía y cuidado, evitando juicios o fatalismos.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/errores-comunes-leer-tarot" className="text-purple-700 hover:underline font-semibold">Errores comunes al leer el tarot</Link>
          <Link href="/blog/como-hacer-preguntas-efectivas-tarot" className="text-purple-700 hover:underline font-semibold">Cómo hacer preguntas efectivas al tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres una consulta ética y responsable?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y experimenta una lectura profesional y consciente.</p>
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
