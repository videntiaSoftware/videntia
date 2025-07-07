import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Justicia en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Justicia en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Justicia en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la justicia tarot", "la justicia significado", "la justicia derecho", "la justicia invertido", "la justicia amor", "la justicia trabajo", "la justicia salud", "la justicia carta tarot", "la justicia rider waite", "la justicia marsella"
  ],
  openGraph: {
    title: "La Justicia en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Justicia en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-justicia"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-justicia"
  }
};

export default function LaJusticiaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-red-700 mb-4 font-cinzel">La Justicia (VIII) en el Tarot</h1>
          <p className="text-lg text-red-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-red-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-red-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-justicia-tarot.png" alt="La Justicia Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-red-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-red-700 mb-3">¿Qué representa La Justicia en el Tarot?</h2>
          <p className="mb-4">La Justicia es la carta número VIII de los Arcanos Mayores y simboliza el equilibrio, la verdad, la imparcialidad y las consecuencias de nuestras acciones. Representa la necesidad de actuar con honestidad, asumir responsabilidades y buscar la armonía en las decisiones.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Justicia al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Equilibrio, imparcialidad y justicia</li>
            <li>Decisiones justas y honestas</li>
            <li>Consecuencias positivas de buenas acciones</li>
            <li>Resolución de conflictos legales o personales</li>
            <li>Claridad mental y objetividad</li>
          </ul>
          <p className="mb-2">La Justicia al derecho indica que la verdad saldrá a la luz y que las decisiones serán justas. Es momento de actuar con integridad y asumir la responsabilidad de tus actos.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Justicia Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Injusticia, parcialidad o desequilibrio</li>
            <li>Decisiones erróneas o falta de honestidad</li>
            <li>Evitar responsabilidades, consecuencias negativas</li>
            <li>Conflictos legales o personales sin resolver</li>
            <li>Falta de claridad o autoengaño</li>
          </ul>
          <p className="mb-2">Invertida, La Justicia advierte sobre la necesidad de corregir errores, asumir consecuencias y buscar el equilibrio perdido.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Simbolismo de La Justicia</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La balanza: equilibrio, imparcialidad y justicia</li>
            <li>La espada: verdad, claridad y acción justa</li>
            <li>La corona: autoridad moral y sabiduría</li>
            <li>El manto rojo: pasión por la verdad y la equidad</li>
            <li>El trono: estabilidad y firmeza en las decisiones</li>
          </ul>
        </section>

        {/* La Justicia en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">La Justicia en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-100 p-4 rounded-lg border border-red-300">
              <h3 className="font-bold text-red-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones equilibradas, acuerdos justos, sinceridad.<br/>Invertido: Falta de honestidad, discusiones, desequilibrio emocional.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Reconocimiento justo, contratos, ascensos merecidos.<br/>Invertido: Injusticias laborales, favoritismos, conflictos legales.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Salud</h3>
              <p>Al derecho: Equilibrio físico y mental, buenos hábitos.<br/>Invertido: Estrés, desajustes, necesidad de balancear cuerpo y mente.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Ejemplos de Preguntas para La Justicia</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Estoy actuando con honestidad en esta situación?</li>
            <li>¿Qué consecuencias tendrá mi decisión?</li>
            <li>¿Cómo puedo recuperar el equilibrio?</li>
            <li>¿Qué verdad necesito ver?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Consejos si sale La Justicia</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Actúa con integridad y transparencia</li>
            <li>Asume la responsabilidad de tus actos</li>
            <li>Busca el equilibrio en tus relaciones y decisiones</li>
            <li>No temas enfrentar la verdad</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Preguntas Frecuentes sobre La Justicia</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Justicia es una carta positiva?</strong>
              <p>Sí, al derecho indica equilibrio y justicia. Invertida señala injusticias o desequilibrios.</p>
            </div>
            <div>
              <strong>¿Qué significa La Justicia en el amor?</strong>
              <p>Al derecho: relaciones justas y sinceras. Invertido: falta de honestidad o desequilibrio.</p>
            </div>
            <div>
              <strong>¿La Justicia siempre indica un juicio legal?</strong>
              <p>No necesariamente. Puede referirse a juicios internos, decisiones importantes o la necesidad de actuar con justicia.</p>
            </div>
            <div>
              <strong>¿Qué simboliza la balanza en La Justicia?</strong>
              <p>El equilibrio y la necesidad de sopesar las opciones antes de decidir.</p>
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
        <div className="text-center bg-gradient-to-r from-red-300 to-yellow-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-red-800 mb-2">¿Quieres saber qué te depara La Justicia?</h3>
          <p className="text-red-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Justicia para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ⚖️ Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
