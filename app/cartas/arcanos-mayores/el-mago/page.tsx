import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Mago en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Mago en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Mago en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el mago tarot", "el mago significado", "el mago derecho", "el mago invertido", "el mago amor", "el mago trabajo", "el mago salud", "el mago carta tarot", "el mago rider waite", "el mago marsella"
  ],
  openGraph: {
    title: "El Mago en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Mago en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-mago"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-mago"
  }
};

export default function ElMagoTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-4 font-cinzel">El Mago (I) en el Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-mago-tarot.png" alt="El Mago Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-yellow-400 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-3">¿Quién es El Mago en el Tarot?</h2>
          <p className="mb-4">El Mago es la carta número I del tarot y representa el poder de la manifestación, la creatividad, la acción consciente y la habilidad de transformar la realidad. Es símbolo de iniciativa, recursos y dominio de los elementos. Su energía es activa, enfocada y llena de potencial.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Mago al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Manifestación de deseos y objetivos</li>
            <li>Poder personal, confianza y liderazgo</li>
            <li>Habilidad para comunicar y persuadir</li>
            <li>Creatividad, ingenio y nuevas ideas</li>
            <li>Inicio de proyectos exitosos</li>
          </ul>
          <p className="mb-2">En una tirada, El Mago al derecho indica que tienes todos los recursos para lograr lo que te propones. Es momento de actuar, confiar en tus capacidades y tomar la iniciativa.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Mago Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Manipulación, engaño o falta de honestidad</li>
            <li>Inseguridad, bloqueo creativo</li>
            <li>Falta de enfoque o dispersión</li>
            <li>Uso negativo del poder personal</li>
            <li>Oportunidades desaprovechadas</li>
          </ul>
          <p className="mb-2">Cuando El Mago aparece invertido, advierte sobre el mal uso de los talentos, la manipulación o la falta de claridad en los objetivos. Es importante actuar con ética y revisar las intenciones.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Simbolismo de El Mago</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La mesa con los cuatro elementos: dominio de mente, cuerpo, emociones y espíritu</li>
            <li>La varita alzada: canalización de energía divina</li>
            <li>El infinito sobre la cabeza: potencial ilimitado</li>
            <li>Las flores: creatividad y manifestación</li>
            <li>El manto rojo y la túnica blanca: acción y pureza de intención</li>
          </ul>
        </section>

        {/* El Mago en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-800 mb-2">El Mago en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones apasionadas, conquista, comunicación efectiva.<br/>Invertido: Manipulación emocional, promesas vacías, falta de sinceridad.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Éxito en entrevistas, nuevos proyectos, liderazgo.<br/>Invertido: Fraudes, engaños laborales, falta de motivación.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Salud</h3>
              <p>Al derecho: Energía vital, capacidad de recuperación, mente clara.<br/>Invertido: Estrés mental, somatización, necesidad de enfoque.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Ejemplos de Preguntas para El Mago</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo manifestar mis objetivos?</li>
            <li>¿Qué recursos tengo a mi favor?</li>
            <li>¿Estoy usando mi poder personal de forma positiva?</li>
            <li>¿Qué debo comunicar para avanzar?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Consejos si sale El Mago</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Confía en tus talentos y actúa con decisión</li>
            <li>Comunica tus ideas con claridad y honestidad</li>
            <li>Evita manipular o dejarte manipular</li>
            <li>Enfócate en un objetivo a la vez</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Preguntas Frecuentes sobre El Mago</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Mago es una carta positiva?</strong>
              <p>Sí, al derecho es muy positiva y habla de éxito, iniciativa y poder personal. Invertida, advierte sobre engaños o mal uso de los talentos.</p>
            </div>
            <div>
              <strong>¿Qué significa El Mago en el amor?</strong>
              <p>Al derecho: conquista, pasión y comunicación. Invertido: manipulación o falta de sinceridad.</p>
            </div>
            <div>
              <strong>¿Qué representa el símbolo del infinito en El Mago?</strong>
              <p>El potencial ilimitado y la conexión entre lo divino y lo terrenal.</p>
            </div>
            <div>
              <strong>¿El Mago siempre indica acción?</strong>
              <p>Generalmente sí, pero invertido puede advertir sobre la necesidad de reflexionar antes de actuar.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-purple-800 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-800 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-purple-800 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-800 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">¿Quieres saber cómo aprovechar la energía de El Mago?</h3>
          <p className="text-purple-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Mago para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
