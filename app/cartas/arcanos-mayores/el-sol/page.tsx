import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Sol en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Sol en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Sol en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el sol tarot", "el sol significado", "el sol derecho", "el sol invertido", "el sol amor", "el sol trabajo", "el sol salud", "el sol carta tarot", "el sol rider waite", "el sol marsella"
  ],
  openGraph: {
    title: "El Sol en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Sol en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-sol"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-sol"
  }
};

export default function ElSolTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-yellow-600 mb-4 font-cinzel">El Sol (XIX) en el Tarot</h1>
          <p className="text-lg text-yellow-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-yellow-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-yellow-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-sol-tarot.png" alt="El Sol Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-yellow-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-3">¿Qué representa El Sol en el Tarot?</h2>
          <p className="mb-4">El Sol es la carta número XIX del tarot y simboliza la alegría, el éxito, la vitalidad y la claridad. Es una de las cartas más positivas del mazo, asociada con la felicidad, la realización personal y la energía renovadora. Su luz disipa las dudas y trae confianza, optimismo y logros.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Sol al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Éxito, logros y reconocimiento</li>
            <li>Felicidad, alegría y plenitud</li>
            <li>Claridad mental y verdad revelada</li>
            <li>Vitalidad, salud y energía positiva</li>
            <li>Relaciones armoniosas y sinceras</li>
          </ul>
          <p className="mb-2">Cuando El Sol aparece al derecho, anuncia una etapa de prosperidad, claridad y satisfacción. Es momento de celebrar los logros y disfrutar de la vida con optimismo y gratitud.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Sol Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Falta de claridad, confusión</li>
            <li>Desánimo, tristeza o decepción</li>
            <li>Éxitos retrasados o bloqueados</li>
            <li>Problemas de autoestima</li>
            <li>Relaciones superficiales o falsas apariencias</li>
          </ul>
          <p className="mb-2">El Sol invertido sugiere que la felicidad está cerca, pero hay obstáculos internos o externos que impiden disfrutarla plenamente. Es una invitación a trabajar la confianza y buscar la verdad.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Simbolismo de El Sol</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El sol radiante: fuente de vida, energía y claridad</li>
            <li>El niño desnudo: inocencia, pureza y autenticidad</li>
            <li>El caballo blanco: fuerza, libertad y avance</li>
            <li>Los girasoles: crecimiento, alegría y abundancia</li>
            <li>El muro: protección y superación de límites</li>
          </ul>
        </section>

        {/* El Sol en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">El Sol en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones felices, sinceras y estables. Éxito en el amor.<br/>Invertido: Falta de comunicación, expectativas poco realistas, necesidad de sinceridad.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Reconocimiento, logros profesionales, ambiente positivo.<br/>Invertido: Retrasos en proyectos, falta de motivación, envidia o competencia desleal.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Salud</h3>
              <p>Al derecho: Vitalidad, recuperación, bienestar general.<br/>Invertido: Cansancio, estrés, necesidad de cuidar la energía y la autoestima.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Ejemplos de Preguntas para El Sol</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué logro importante está por llegar a mi vida?</li>
            <li>¿Cómo puedo potenciar mi felicidad y bienestar?</li>
            <li>¿Qué verdad necesita salir a la luz?</li>
            <li>¿Cómo superar los obstáculos para alcanzar el éxito?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Consejos si sale El Sol</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Disfruta y celebra tus logros, comparte tu alegría</li>
            <li>Confía en ti y en tu capacidad de brillar</li>
            <li>Busca la verdad y la transparencia en tus relaciones</li>
            <li>No temas mostrarte tal como eres</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Preguntas Frecuentes sobre El Sol</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Sol es una carta positiva?</strong>
              <p>Sí, es una de las cartas más positivas del tarot. Anuncia éxito, alegría y claridad.</p>
            </div>
            <div>
              <strong>¿Qué significa El Sol en el amor?</strong>
              <p>Al derecho: relaciones felices y sinceras. Invertido: falta de comunicación o sinceridad.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el niño en la carta de El Sol?</strong>
              <p>La inocencia, la autenticidad y la alegría de vivir.</p>
            </div>
            <div>
              <strong>¿El Sol siempre indica éxito?</strong>
              <p>Generalmente sí, pero invertido puede señalar retrasos o bloqueos temporales.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-yellow-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-yellow-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-yellow-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-yellow-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">¿Quieres saber qué te depara El Sol?</h3>
          <p className="text-yellow-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Sol para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
