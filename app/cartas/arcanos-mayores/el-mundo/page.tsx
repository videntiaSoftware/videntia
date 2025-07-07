import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Mundo en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Mundo en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Mundo en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el mundo tarot", "el mundo significado", "el mundo derecho", "el mundo invertido", "el mundo amor", "el mundo trabajo", "el mundo salud", "el mundo carta tarot", "el mundo rider waite", "el mundo marsella"
  ],
  openGraph: {
    title: "El Mundo en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Mundo en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-mundo"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-mundo"
  }
};

export default function ElMundoTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">El Mundo (XXI) en el Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-mundo-tarot.png" alt="El Mundo Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-400 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué representa El Mundo en el Tarot?</h2>
          <p className="mb-4">El Mundo es la carta número XXI del tarot y simboliza la culminación, el éxito, la realización y la integración. Representa el cierre de un ciclo, la armonía y la plenitud. Es la carta de la victoria final y la recompensa por el esfuerzo realizado.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Mundo al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Éxito, logro de metas y plenitud</li>
            <li>Cierre de ciclos y nuevos comienzos</li>
            <li>Armonía, integración y equilibrio</li>
            <li>Reconocimiento y satisfacción personal</li>
            <li>Viajes, expansión y apertura al mundo</li>
          </ul>
          <p className="mb-2">En una tirada, El Mundo al derecho indica que has alcanzado una meta importante, que es momento de celebrar y de abrirte a nuevas oportunidades. Es una carta de éxito y realización.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Mundo Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Ciclos inconclusos, falta de cierre</li>
            <li>Estancamiento, sensación de vacío</li>
            <li>Falta de reconocimiento o insatisfacción</li>
            <li>Resistencia al cambio o miedo a lo nuevo</li>
            <li>Oportunidades desaprovechadas</li>
          </ul>
          <p className="mb-2">Cuando El Mundo aparece invertido, invita a reflexionar sobre lo que falta para cerrar un ciclo, a superar bloqueos y a buscar la integración personal.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Simbolismo de El Mundo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La figura danzante: libertad, celebración y plenitud</li>
            <li>La corona de laurel: victoria y éxito</li>
            <li>Los cuatro seres (ángel, águila, león, toro): integración de los elementos y equilibrio</li>
            <li>El manto: protección y sabiduría adquirida</li>
          </ul>
        </section>

        {/* El Mundo en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">El Mundo en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
              <h3 className="font-bold text-purple-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones plenas, compromiso, felicidad compartida.<br/>Invertido: Dificultad para cerrar ciclos, relaciones inconclusas, sensación de vacío.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Éxito profesional, culminación de proyectos, reconocimiento.<br/>Invertido: Proyectos inconclusos, falta de satisfacción, estancamiento.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Salud</h3>
              <p>Al derecho: Bienestar integral, equilibrio cuerpo-mente.<br/>Invertido: Falta de cierre emocional, necesidad de integración personal.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplos de Preguntas para El Mundo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué ciclo estoy cerrando en mi vida?</li>
            <li>¿Cómo puedo alcanzar la plenitud y el equilibrio?</li>
            <li>¿Qué me impide sentirme realizado/a?</li>
            <li>¿Qué nuevas oportunidades se abren ante mí?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos si sale El Mundo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Reconoce y celebra tus logros</li>
            <li>Permítete cerrar ciclos y abrirte a lo nuevo</li>
            <li>Busca la integración y el equilibrio en tu vida</li>
            <li>No temas expandir tus horizontes</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas Frecuentes sobre El Mundo</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Mundo es una carta de éxito?</strong>
              <p>Sí, representa la culminación, el logro y la plenitud.</p>
            </div>
            <div>
              <strong>¿Qué significa El Mundo en el amor?</strong>
              <p>Al derecho: relaciones plenas y felices. Invertido: dificultad para cerrar ciclos o comprometerse.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan los cuatro seres en la carta de El Mundo?</strong>
              <p>La integración de los elementos y el equilibrio universal.</p>
            </div>
            <div>
              <strong>¿El Mundo siempre indica un final?</strong>
              <p>Indica el cierre de un ciclo, pero también la apertura a nuevas etapas.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-200 to-green-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres saber qué te depara El Mundo?</h3>
          <p className="text-purple-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Mundo para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
