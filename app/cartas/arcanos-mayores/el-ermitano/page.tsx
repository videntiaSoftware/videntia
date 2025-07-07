import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Ermitaño en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Ermitaño en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Ermitaño en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el ermitaño tarot", "el ermitaño significado", "el ermitaño derecho", "el ermitaño invertido", "el ermitaño amor", "el ermitaño trabajo", "el ermitaño salud", "el ermitaño carta tarot", "el ermitaño rider waite", "el ermitaño marsella"
  ],
  openGraph: {
    title: "El Ermitaño en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Ermitaño en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-ermitano"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-ermitano"
  }
};

export default function ElErmitanoTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-700 mb-4 font-cinzel">El Ermitaño (IX) en el Tarot</h1>
          <p className="text-lg text-gray-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-gray-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-gray-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-ermitano-tarot.png" alt="El Ermitaño Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-gray-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">¿Quién es El Ermitaño en el Tarot?</h2>
          <p className="mb-4">El Ermitaño es la carta número IX de los Arcanos Mayores y representa la introspección, la búsqueda interior, la sabiduría y la guía espiritual. Es símbolo de retiro, reflexión y la necesidad de encontrar respuestas en el silencio y la soledad.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Ermitaño al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Introspección, búsqueda interior y reflexión</li>
            <li>Sabiduría, madurez y guía espiritual</li>
            <li>Necesidad de soledad para encontrar respuestas</li>
            <li>Paciencia, prudencia y discreción</li>
            <li>Orientación y consejo de una persona sabia</li>
          </ul>
          <p className="mb-2">El Ermitaño al derecho invita a tomarse un tiempo para reflexionar, buscar la verdad interior y no temer la soledad. Es una carta de autoconocimiento y crecimiento personal.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Ermitaño Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Aislamiento excesivo, soledad no deseada</li>
            <li>Falta de dirección, confusión interna</li>
            <li>Rechazo a la ayuda o consejos</li>
            <li>Estancamiento, miedo a salir al mundo</li>
            <li>Desconexión espiritual</li>
          </ul>
          <p className="mb-2">Invertido, El Ermitaño advierte sobre el peligro de aislarse demasiado, perder el rumbo o rechazar el apoyo de los demás. Es momento de abrirse y buscar equilibrio entre soledad y conexión.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Simbolismo de El Ermitaño</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La lámpara: luz interior, guía y sabiduría</li>
            <li>El bastón: apoyo, experiencia y prudencia</li>
            <li>La túnica gris: neutralidad, humildad y desapego</li>
            <li>La montaña: superación, soledad y perspectiva</li>
            <li>El camino: búsqueda personal y evolución</li>
          </ul>
        </section>

        {/* El Ermitaño en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-2">El Ermitaño en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-gray-700 mb-2">Amor</h3>
              <p>Al derecho: Tiempo de reflexión, necesidad de espacio, relaciones profundas.<br/>Invertido: Soledad, distanciamiento, dificultad para abrirse emocionalmente.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Trabajo</h3>
              <p>Al derecho: Trabajo independiente, mentoría, búsqueda de propósito.<br/>Invertido: Aislamiento laboral, falta de motivación, estancamiento profesional.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Necesidad de descanso, meditación, cuidado interior.<br/>Invertido: Estrés por aislamiento, falta de energía, necesidad de apoyo emocional.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Ejemplos de Preguntas para El Ermitaño</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué necesito aprender de esta etapa de soledad?</li>
            <li>¿Estoy escuchando mi voz interior?</li>
            <li>¿Debería buscar consejo o actuar solo/a?</li>
            <li>¿Cómo puedo encontrar claridad en mi camino?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Consejos si sale El Ermitaño</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Dedica tiempo a la introspección y la meditación</li>
            <li>No temas pedir ayuda si la necesitas</li>
            <li>Confía en tu sabiduría interna</li>
            <li>Busca el equilibrio entre soledad y conexión</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Preguntas Frecuentes sobre El Ermitaño</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Ermitaño es una carta negativa?</strong>
              <p>No necesariamente. Al derecho es positiva para el crecimiento personal, pero invertida puede señalar aislamiento excesivo.</p>
            </div>
            <div>
              <strong>¿Qué significa El Ermitaño en el amor?</strong>
              <p>Al derecho: reflexión y profundidad. Invertido: soledad o distanciamiento.</p>
            </div>
            <div>
              <strong>¿El Ermitaño siempre indica soledad?</strong>
              <p>No siempre. Puede ser una etapa de búsqueda interior o necesidad de guía.</p>
            </div>
            <div>
              <strong>¿Qué simboliza la lámpara en El Ermitaño?</strong>
              <p>La luz de la sabiduría interior y la guía espiritual en momentos de oscuridad.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-gray-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-gray-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-gray-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-gray-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gray-300 to-blue-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Quieres saber qué te depara El Ermitaño?</h3>
          <p className="text-gray-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Ermitaño para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🕯️ Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
