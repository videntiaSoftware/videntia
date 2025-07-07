import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Sacerdotisa en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Sacerdotisa en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Sacerdotisa en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la sacerdotisa tarot", "la sacerdotisa significado", "la sacerdotisa derecho", "la sacerdotisa invertida", "la sacerdotisa amor", "la sacerdotisa trabajo", "la sacerdotisa salud", "la sacerdotisa carta tarot", "la sacerdotisa rider waite", "la sacerdotisa marsella"
  ],
  openGraph: {
    title: "La Sacerdotisa en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Sacerdotisa en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-sacerdotisa"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-sacerdotisa"
  }
};

export default function LaSacerdotisaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 font-cinzel">La Sacerdotisa (II) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-sacerdotisa-tarot.png" alt="La Sacerdotisa Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">¿Quién es La Sacerdotisa en el Tarot?</h2>
          <p className="mb-4">La Sacerdotisa es la carta número II del tarot y representa la intuición, el misterio, el conocimiento oculto y la sabiduría interior. Es símbolo de paciencia, receptividad y conexión con el inconsciente. Su energía es profunda, silenciosa y llena de secretos por descubrir.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Sacerdotisa al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Intuición aguda, escuchar la voz interior</li>
            <li>Misterios, secretos revelados a su debido tiempo</li>
            <li>Sabiduría femenina, paciencia y reflexión</li>
            <li>Conexión espiritual, sueños y señales</li>
            <li>Necesidad de observar y no actuar aún</li>
          </ul>
          <p className="mb-2">En una tirada, La Sacerdotisa al derecho invita a confiar en la intuición, a esperar respuestas y a observar antes de tomar decisiones. Es una carta de sabiduría silenciosa y revelaciones internas.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Sacerdotisa Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Desconexión con la intuición, ignorar señales</li>
            <li>Secretos ocultos, información bloqueada</li>
            <li>Falta de confianza en uno mismo</li>
            <li>Pasividad excesiva, miedo a actuar</li>
            <li>Confusión, autoengaño</li>
          </ul>
          <p className="mb-2">Cuando La Sacerdotisa aparece invertida, advierte sobre la necesidad de reconectar con la intuición, evitar el autoengaño y no dejarse llevar por la confusión o el miedo.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Simbolismo de La Sacerdotisa</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El velo: separación entre el mundo consciente e inconsciente</li>
            <li>La luna a sus pies: intuición, ciclos y lo femenino</li>
            <li>El rollo de la Torá: conocimiento oculto y sagrado</li>
            <li>Las columnas B y J: dualidad, equilibrio entre opuestos</li>
            <li>El agua: emociones profundas y sabiduría interior</li>
          </ul>
        </section>

        {/* La Sacerdotisa en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">La Sacerdotisa en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones profundas, conexión espiritual, atracción silenciosa.<br/>Invertida: Secretos, falta de comunicación, emociones reprimidas.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Éxito en trabajos creativos o espirituales, intuición en decisiones.<br/>Invertida: Falta de información, rumores, pasividad laboral.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">Salud</h3>
              <p>Al derecho: Escuchar el cuerpo, sueños reveladores, equilibrio emocional.<br/>Invertida: Problemas hormonales, somatización, ignorar síntomas.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Ejemplos de Preguntas para La Sacerdotisa</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué me está diciendo mi intuición sobre esta situación?</li>
            <li>¿Qué información aún no veo claramente?</li>
            <li>¿Cómo puedo conectar con mi sabiduría interior?</li>
            <li>¿Qué secretos o verdades están por revelarse?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Consejos si sale La Sacerdotisa</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Escucha tu voz interior antes de actuar</li>
            <li>No fuerces respuestas, deja que todo fluya</li>
            <li>Confía en los sueños y señales</li>
            <li>Evita compartir tus planes hasta que sea el momento adecuado</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Preguntas Frecuentes sobre La Sacerdotisa</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Sacerdotisa es una carta positiva?</strong>
              <p>Sí, al derecho es muy positiva para el autoconocimiento y la intuición. Invertida, advierte sobre bloqueos internos o secretos.</p>
            </div>
            <div>
              <strong>¿Qué significa La Sacerdotisa en el amor?</strong>
              <p>Al derecho: conexión profunda y espiritual. Invertida: secretos o falta de comunicación.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las columnas B y J?</strong>
              <p>La dualidad y el equilibrio entre opuestos: luz y sombra, consciente e inconsciente.</p>
            </div>
            <div>
              <strong>¿La Sacerdotisa siempre indica pasividad?</strong>
              <p>No siempre. Puede indicar que es momento de observar y esperar, pero también de confiar en la sabiduría interna.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-blue-900 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-blue-900 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-blue-900 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-blue-900 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">¿Quieres descubrir los secretos de La Sacerdotisa?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y conecta con la sabiduría de La Sacerdotisa.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
