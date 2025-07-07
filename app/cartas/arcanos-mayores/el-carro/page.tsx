import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Carro en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Carro en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Carro en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el carro tarot", "el carro significado", "el carro derecho", "el carro invertido", "el carro amor", "el carro trabajo", "el carro salud", "el carro carta tarot", "el carro rider waite", "el carro marsella"
  ],
  openGraph: {
    title: "El Carro en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Carro en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-carro"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-carro"
  }
};

export default function ElCarroTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">El Carro (VII) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-carro-tarot.png" alt="El Carro Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representa El Carro en el Tarot?</h2>
          <p className="mb-4">El Carro es la carta número VII del tarot y simboliza la victoria, el control, la determinación y el avance. Representa la capacidad de superar obstáculos mediante la fuerza de voluntad, la disciplina y la confianza en uno mismo. Es una carta de movimiento, conquista y éxito tras el esfuerzo.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Carro al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Victoria, éxito y logros personales</li>
            <li>Autocontrol, disciplina y determinación</li>
            <li>Superación de obstáculos, avance imparable</li>
            <li>Viajes, mudanzas, cambios positivos</li>
            <li>Confianza en la dirección elegida</li>
          </ul>
          <p className="mb-2">En una tirada, El Carro al derecho indica que tienes el control de la situación y que, con esfuerzo y enfoque, alcanzarás tus metas. Es momento de avanzar con decisión y no dejarse distraer.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Carro Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Falta de control, bloqueos o estancamiento</li>
            <li>Impulsividad, agresividad o exceso de orgullo</li>
            <li>Dificultad para avanzar, obstáculos internos</li>
            <li>Confusión sobre el rumbo a seguir</li>
            <li>Fracaso por falta de disciplina o enfoque</li>
          </ul>
          <p className="mb-2">Cuando El Carro aparece invertido, advierte sobre la necesidad de recuperar el control, evitar la impulsividad y trabajar en la autodisciplina para superar los desafíos.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Simbolismo de El Carro</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El carro: avance, conquista y movimiento</li>
            <li>Las esfinges o caballos: fuerzas opuestas, control y equilibrio</li>
            <li>La armadura: protección y confianza</li>
            <li>La corona y el cetro: autoridad y poder personal</li>
            <li>La ciudad al fondo: metas y logros alcanzados</li>
          </ul>
        </section>

        {/* El Carro en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">El Carro en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones que avanzan, superación de crisis, conquista amorosa.<br/>Invertido: Conflictos de poder, falta de control emocional, relaciones estancadas.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Éxito profesional, ascensos, logros tras esfuerzo.<br/>Invertido: Estancamiento laboral, falta de dirección, problemas con la autoridad.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Salud</h3>
              <p>Al derecho: Recuperación, energía renovada, avance en tratamientos.<br/>Invertido: Estrés, agotamiento, necesidad de controlar impulsos.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Ejemplos de Preguntas para El Carro</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo superar los obstáculos actuales?</li>
            <li>¿Estoy avanzando en la dirección correcta?</li>
            <li>¿Qué debo controlar para lograr mis metas?</li>
            <li>¿Qué me impide avanzar con éxito?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos si sale El Carro</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Define tus objetivos y mantén el enfoque</li>
            <li>No te dejes llevar por la impulsividad o el orgullo</li>
            <li>Confía en tu capacidad para superar retos</li>
            <li>Equilibra tus emociones y tus acciones</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre El Carro</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Carro es una carta positiva o negativa?</strong>
              <p>Generalmente es positiva, pero invertida puede señalar bloqueos o falta de control.</p>
            </div>
            <div>
              <strong>¿Qué significa El Carro en el amor?</strong>
              <p>Al derecho: avance y superación. Invertido: conflictos o estancamiento.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las esfinges/caballos en El Carro?</strong>
              <p>Las fuerzas opuestas que deben ser controladas para avanzar con éxito.</p>
            </div>
            <div>
              <strong>¿El Carro siempre indica un viaje literal?</strong>
              <p>No siempre. Puede ser un viaje interior, un avance personal o profesional.</p>
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
        <div className="text-center bg-gradient-to-r from-blue-300 to-yellow-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres saber qué te depara El Carro?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Carro para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
