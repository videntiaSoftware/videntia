import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Juicio en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Juicio en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Juicio en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el juicio tarot", "el juicio significado", "el juicio derecho", "el juicio invertido", "el juicio amor", "el juicio trabajo", "el juicio salud", "el juicio carta tarot", "el juicio rider waite", "el juicio marsella"
  ],
  openGraph: {
    title: "El Juicio en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Juicio en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-juicio"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-juicio"
  }
};

export default function ElJuicioTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">El Juicio (XX) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-juicio-tarot.png" alt="El Juicio Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-400 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representa El Juicio en el Tarot?</h2>
          <p className="mb-4">El Juicio es la carta número XX del tarot y simboliza el renacimiento, la toma de conciencia, el perdón y la liberación. Representa un llamado a la transformación, a dejar atrás el pasado y a tomar decisiones importantes con claridad y responsabilidad.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Juicio al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Renacimiento, nuevas oportunidades</li>
            <li>Despertar espiritual y claridad</li>
            <li>Perdón, reconciliación y liberación</li>
            <li>Decisiones importantes y cambios positivos</li>
            <li>Superación de pruebas y evolución personal</li>
          </ul>
          <p className="mb-2">En una tirada, El Juicio al derecho indica un momento de transformación, de dejar atrás lo viejo y abrirse a nuevas posibilidades. Es una carta de segundas oportunidades y de crecimiento.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Juicio Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Resistencia al cambio, miedo a avanzar</li>
            <li>Sentimientos de culpa o arrepentimiento</li>
            <li>Falta de autocrítica o negación de errores</li>
            <li>Oportunidades perdidas por indecisión</li>
            <li>Estancamiento o autoengaño</li>
          </ul>
          <p className="mb-2">Cuando El Juicio aparece invertido, invita a reflexionar sobre las lecciones del pasado, a perdonarse y a tomar decisiones valientes para avanzar.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Simbolismo de El Juicio</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El ángel con trompeta: llamado divino, despertar y revelación</li>
            <li>Las personas resucitando: renacimiento, liberación y perdón</li>
            <li>Las montañas: obstáculos superados y nuevos horizontes</li>
            <li>La luz: claridad, verdad y guía espiritual</li>
          </ul>
        </section>

        {/* El Juicio en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">El Juicio en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Reconciliaciones, segundas oportunidades, relaciones que evolucionan.<br/>Invertido: Dificultad para perdonar, relaciones estancadas, miedo a cerrar ciclos.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Cambios positivos, ascensos, nuevos proyectos.<br/>Invertido: Temor al cambio, oportunidades desaprovechadas, falta de reconocimiento.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Salud</h3>
              <p>Al derecho: Recuperación, sanación, liberación de cargas.<br/>Invertido: Estancamiento, necesidad de perdonarse, estrés emocional.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Ejemplos de Preguntas para El Juicio</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué ciclo debo cerrar para avanzar?</li>
            <li>¿Cómo puedo perdonarme y liberarme del pasado?</li>
            <li>¿Qué oportunidad está llamando a mi puerta?</li>
            <li>¿Qué decisión importante debo tomar ahora?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos si sale El Juicio</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Escucha tu voz interior y acepta el cambio</li>
            <li>Perdona y libérate de culpas pasadas</li>
            <li>Aprovecha las segundas oportunidades</li>
            <li>Toma decisiones con responsabilidad y claridad</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre El Juicio</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Juicio es una carta de cambio?</strong>
              <p>Sí, representa transformación, renacimiento y nuevas oportunidades.</p>
            </div>
            <div>
              <strong>¿Qué significa El Juicio en el amor?</strong>
              <p>Al derecho: reconciliaciones y evolución. Invertido: estancamiento o dificultad para perdonar.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el ángel en la carta de El Juicio?</strong>
              <p>El llamado a despertar, la revelación y la guía espiritual.</p>
            </div>
            <div>
              <strong>¿El Juicio siempre indica un cambio positivo?</strong>
              <p>Al derecho, sí. Invertido puede señalar resistencia o miedo al cambio.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-blue-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-blue-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-200 to-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres saber qué te depara El Juicio?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Juicio para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
