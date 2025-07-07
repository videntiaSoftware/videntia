import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Diablo en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Diablo en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Diablo en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el diablo tarot", "el diablo significado", "el diablo derecho", "el diablo invertido", "el diablo amor", "el diablo trabajo", "el diablo salud", "el diablo carta tarot", "el diablo rider waite", "el diablo marsella"
  ],
  openGraph: {
    title: "El Diablo en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Diablo en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-diablo"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-diablo"
  }
};

export default function ElDiabloTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-red-700 mb-4 font-cinzel">El Diablo (XV) en el Tarot</h1>
          <p className="text-lg text-red-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-red-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-red-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-diablo-tarot.png" alt="El Diablo Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-red-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-red-700 mb-3">¿Qué representa El Diablo en el Tarot?</h2>
          <p className="mb-4">El Diablo es la carta número XV de los Arcanos Mayores y simboliza las ataduras, las tentaciones, los miedos y las pasiones descontroladas. Representa la sombra, los excesos y la necesidad de reconocer y liberar lo que nos limita.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Diablo al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Ataduras, dependencias y obsesiones</li>
            <li>Pasiones intensas, tentaciones y excesos</li>
            <li>Materialismo, placer y búsqueda de poder</li>
            <li>Reconocimiento de la sombra personal</li>
            <li>Desafío a los límites y normas</li>
          </ul>
          <p className="mb-2">Al derecho, El Diablo invita a reconocer las cadenas que nos atan, enfrentar los miedos y trabajar en la liberación personal. Puede señalar situaciones de placer, pero también de advertencia sobre excesos.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Diablo Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Liberación de ataduras, superación de miedos</li>
            <li>Ruptura de dependencias o adicciones</li>
            <li>Conciencia de la sombra y sanación</li>
            <li>Recuperación del control y la autonomía</li>
            <li>Fin de una etapa de excesos o toxicidad</li>
          </ul>
          <p className="mb-2">Invertido, El Diablo señala la oportunidad de liberarse de lo que oprime, romper cadenas y recuperar el poder personal. Es una carta de transformación y empoderamiento.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Simbolismo de El Diablo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La figura demoníaca: la sombra, los miedos y deseos ocultos</li>
            <li>Las cadenas: ataduras autoimpuestas, dependencias</li>
            <li>La antorcha: tentación, pasión y poder</li>
            <li>Los cuernos y alas: instintos primarios y libertad reprimida</li>
            <li>La oscuridad: lo desconocido y lo reprimido</li>
          </ul>
        </section>

        {/* El Diablo en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">El Diablo en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-100 p-4 rounded-lg border border-red-300">
              <h3 className="font-bold text-red-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones tóxicas, pasión intensa, celos o dependencia.<br/>Invertido: Liberación de vínculos dañinos, superación de celos o adicciones.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-gray-700 mb-2">Trabajo</h3>
              <p>Al derecho: Ambición desmedida, ambiente tóxico, manipulación.<br/>Invertido: Ruptura de cadenas laborales, mejora del ambiente, recuperación de ética.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Excesos, adicciones, estrés.<br/>Invertido: Recuperación, superación de hábitos dañinos, sanación emocional.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Ejemplos de Preguntas para El Diablo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué me está atando o limitando en esta situación?</li>
            <li>¿Cómo puedo liberarme de una dependencia?</li>
            <li>¿Estoy cayendo en excesos o tentaciones?</li>
            <li>¿Qué sombra debo reconocer y trabajar?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Consejos si sale El Diablo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Reconoce tus ataduras y trabaja en tu liberación</li>
            <li>No temas enfrentar tu sombra, es parte del crecimiento</li>
            <li>Evita los excesos y busca el equilibrio</li>
            <li>Recupera el control sobre tus decisiones</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Preguntas Frecuentes sobre El Diablo</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Diablo es una carta negativa?</strong>
              <p>No necesariamente. Al derecho advierte sobre ataduras y excesos, pero también invita a la autoliberación.</p>
            </div>
            <div>
              <strong>¿Qué significa El Diablo en el amor?</strong>
              <p>Al derecho: relaciones tóxicas o pasionales. Invertido: liberación de vínculos dañinos.</p>
            </div>
            <div>
              <strong>¿El Diablo siempre indica adicciones?</strong>
              <p>No siempre. Puede señalar cualquier tipo de atadura o dependencia.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las cadenas en El Diablo?</strong>
              <p>Las limitaciones autoimpuestas y la posibilidad de romperlas.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-red-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-red-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-red-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-red-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-red-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-red-800 mb-2">¿Quieres saber qué te depara El Diablo?</h3>
          <p className="text-red-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Diablo para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            😈 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
