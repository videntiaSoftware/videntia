import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Colgado en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Colgado en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Colgado en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el colgado tarot", "el colgado significado", "el colgado derecho", "el colgado invertido", "el colgado amor", "el colgado trabajo", "el colgado salud", "el colgado carta tarot", "el colgado rider waite", "el colgado marsella"
  ],
  openGraph: {
    title: "El Colgado en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Colgado en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-colgado"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-colgado"
  }
};

export default function ElColgadoTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-cinzel">El Colgado (XII) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-colgado-tarot.png" alt="El Colgado Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">¿Qué representa El Colgado en el Tarot?</h2>
          <p className="mb-4">El Colgado es la carta número XII de los Arcanos Mayores y simboliza la pausa, el sacrificio voluntario, la espera y la necesidad de ver las cosas desde otra perspectiva. Representa momentos de reflexión, entrega y transformación interna.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Colgado al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Pausa necesaria, espera y reflexión</li>
            <li>Sacrificio voluntario, entrega y desapego</li>
            <li>Ver la vida desde otra perspectiva</li>
            <li>Transformación interna, aceptación</li>
            <li>Renuncia temporal para un bien mayor</li>
          </ul>
          <p className="mb-2">Al derecho, El Colgado invita a detenerse, soltar el control y aceptar la pausa como parte del proceso de crecimiento. Es una carta de paciencia y cambio de visión.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Colgado Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Estancamiento, resistencia al cambio</li>
            <li>Sacrificio inútil, victimismo</li>
            <li>Falta de perspectiva, negación de la realidad</li>
            <li>Incapacidad para soltar o dejar ir</li>
            <li>Impaciencia, frustración por la espera</li>
          </ul>
          <p className="mb-2">Invertido, El Colgado advierte sobre la necesidad de dejar de resistirse, soltar lo que no sirve y buscar una nueva visión para avanzar.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Simbolismo de El Colgado</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El hombre colgado de un pie: sacrificio voluntario y entrega</li>
            <li>Aureola luminosa: iluminación, comprensión profunda</li>
            <li>La postura invertida: ver el mundo desde otra perspectiva</li>
            <li>El árbol: vida, crecimiento y conexión espiritual</li>
            <li>Rostro sereno: aceptación y paz interior</li>
          </ul>
        </section>

        {/* El Colgado en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">El Colgado en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Pausa en la relación, necesidad de reflexión, entrega desinteresada.<br/>Invertido: Estancamiento, sacrificio sin sentido, relaciones que no avanzan.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-gray-700 mb-2">Trabajo</h3>
              <p>Al derecho: Espera de resultados, cambio de estrategia, aceptar la pausa.<br/>Invertido: Bloqueos, falta de avance, frustración laboral.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Descanso necesario, sanación interior, aceptación del proceso.<br/>Invertido: Negación de síntomas, falta de autocuidado, impaciencia en la recuperación.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Ejemplos de Preguntas para El Colgado</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué debo soltar para avanzar?</li>
            <li>¿Estoy viendo la situación desde la perspectiva adecuada?</li>
            <li>¿Qué aprendizaje hay en esta pausa?</li>
            <li>¿Es momento de esperar o de actuar?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Consejos si sale El Colgado</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Acepta la pausa y confía en el proceso</li>
            <li>Busca una nueva perspectiva antes de actuar</li>
            <li>No te sacrifiques en exceso, cuida tu bienestar</li>
            <li>Practica la paciencia y la entrega consciente</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Preguntas Frecuentes sobre El Colgado</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Colgado es una carta negativa?</strong>
              <p>No necesariamente. Al derecho invita a la reflexión y el cambio de perspectiva. Invertido puede señalar estancamiento.</p>
            </div>
            <div>
              <strong>¿Qué significa El Colgado en el amor?</strong>
              <p>Al derecho: pausa y reflexión. Invertido: relaciones estancadas o sacrificios innecesarios.</p>
            </div>
            <div>
              <strong>¿El Colgado siempre indica sacrificio?</strong>
              <p>No siempre. Puede ser una invitación a soltar y ver la vida de otra manera.</p>
            </div>
            <div>
              <strong>¿Qué simboliza la aureola en El Colgado?</strong>
              <p>La iluminación y la comprensión profunda que surge de la pausa y la introspección.</p>
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
        <div className="text-center bg-gradient-to-r from-blue-300 to-gray-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">¿Quieres saber qué te depara El Colgado?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Colgado para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🪢 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
