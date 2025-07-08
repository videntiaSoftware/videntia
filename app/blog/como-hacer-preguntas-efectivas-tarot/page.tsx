import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Hacer Preguntas Efectivas al Tarot: Guía y Ejemplos | Videntia Blog",
  description: "Aprende a formular preguntas efectivas para el tarot. Consejos, ejemplos, errores comunes, preguntas frecuentes y enlaces internos para mejorar tus lecturas.",
  keywords: [
    "preguntas tarot", "cómo preguntar tarot", "ejemplos preguntas tarot", "preguntas efectivas tarot", "consejos tarot", "errores preguntas tarot", "formulación preguntas tarot"
  ],
  openGraph: {
    title: "Cómo Hacer Preguntas Efectivas al Tarot: Guía y Ejemplos",
    description: "Guía profesional para formular preguntas efectivas al tarot. Consejos, ejemplos y errores comunes para mejorar tus lecturas.",
    url: "/blog/como-hacer-preguntas-efectivas-tarot"
  },
  alternates: {
    canonical: "/blog/como-hacer-preguntas-efectivas-tarot"
  }
};

export default function ComoHacerPreguntasEfectivasTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Cómo Hacer Preguntas Efectivas al Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Guía para formular preguntas claras, útiles y poderosas en tus lecturas de tarot.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/consulta-tarot-gratis" className="text-purple-600 hover:underline font-semibold">Consulta de Tarot Gratis</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/como-hacer-preguntas-efectivas-tarot.png" alt="Cómo hacer preguntas efectivas al tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Por qué es importante saber preguntar al tarot?</h2>
          <p className="mb-4">La calidad de la respuesta del tarot depende en gran medida de la calidad de la pregunta. Formular preguntas efectivas permite obtener mensajes claros, útiles y orientados a la acción, evitando confusiones y respuestas ambiguas.</p>
        </section>

        {/* Consejos para formular preguntas efectivas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Consejos para hacer preguntas efectivas al tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Evita preguntas cerradas de sí o no (salvo tiradas específicas).</li>
            <li>Prefiere preguntas abiertas que exploren el "cómo", "por qué", "para qué" o "qué puedo hacer".</li>
            <li>Enfoca la pregunta en ti, no en terceras personas.</li>
            <li>Sé claro y específico sobre la situación o área de tu vida.</li>
            <li>Evita preguntas repetitivas o hechas desde la ansiedad.</li>
          </ul>
        </section>

        {/* Ejemplos de buenas preguntas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplos de preguntas efectivas para el tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué aprendizaje me trae esta situación?</li>
            <li>¿Cómo puedo mejorar mi relación de pareja?</li>
            <li>¿Qué me bloquea en el trabajo y cómo superarlo?</li>
            <li>¿Qué necesito saber sobre mi salud emocional?</li>
            <li>¿Cuál es el siguiente paso para avanzar en mi camino?</li>
            <li>¿Qué recursos internos puedo activar ahora?</li>
          </ul>
        </section>

        {/* Errores comunes al preguntar al tarot */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Errores comunes al hacer preguntas al tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Preguntar solo por el futuro sin interés en el presente.</li>
            <li>Formular preguntas ambiguas o demasiado generales.</li>
            <li>Buscar controlar a otras personas a través de la consulta.</li>
            <li>Repetir la misma pregunta esperando una respuesta diferente.</li>
            <li>Consultar desde el miedo o la obsesión.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre cómo preguntar al tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Puedo preguntar por otra persona?</strong>
              <p>Es mejor enfocar la pregunta en ti y tu relación con esa persona, respetando su privacidad y libre albedrío.</p>
            </div>
            <div>
              <strong>¿Cuántas preguntas puedo hacer en una tirada?</strong>
              <p>Depende del tipo de tirada, pero es recomendable no saturar la consulta y priorizar lo más importante.</p>
            </div>
            <div>
              <strong>¿Qué pasa si no sé cómo formular mi pregunta?</strong>
              <p>Puedes pedir orientación al tarot sobre cómo enfocar tu consulta o empezar con una pregunta general y luego profundizar.</p>
            </div>
            <div>
              <strong>¿El tarot responde a cualquier pregunta?</strong>
              <p>El tarot es una herramienta de autoconocimiento, no un oráculo infalible. Hay temas que requieren ayuda profesional.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/errores-comunes-leer-tarot" className="text-purple-700 hover:underline font-semibold">Errores comunes al leer el tarot</Link>
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-purple-700 hover:underline font-semibold">Desarrollar la intuición en el tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Listo para preguntar al tarot?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta gratis y pon en práctica estos consejos para obtener respuestas claras y útiles.</p>
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
