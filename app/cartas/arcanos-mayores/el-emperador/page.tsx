import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Emperador en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Emperador en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Emperador en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el emperador tarot", "el emperador significado", "el emperador derecho", "el emperador invertido", "el emperador amor", "el emperador trabajo", "el emperador salud", "el emperador carta tarot", "el emperador rider waite", "el emperador marsella"
  ],
  openGraph: {
    title: "El Emperador en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Emperador en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-emperador"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-emperador"
  }
};

export default function ElEmperadorTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-orange-900 mb-4 font-cinzel">El Emperador (IV) en el Tarot</h1>
          <p className="text-lg text-orange-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-orange-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-orange-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-emperador-tarot.png" alt="El Emperador Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-orange-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-orange-900 mb-3">¿Quién es El Emperador en el Tarot?</h2>
          <p className="mb-4">El Emperador es la carta número IV del tarot y representa la autoridad, el orden, la estructura y el poder masculino. Es símbolo de liderazgo, disciplina, protección y estabilidad. Su energía es firme, racional y constructiva.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Emperador al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Autoridad, liderazgo y control</li>
            <li>Estabilidad, orden y disciplina</li>
            <li>Protección, seguridad y estructura</li>
            <li>Éxito a través de la lógica y la planificación</li>
            <li>Figura paterna o mentor</li>
          </ul>
          <p className="mb-2">En una tirada, El Emperador al derecho indica la necesidad de tomar el control, establecer límites y actuar con responsabilidad. Es una carta de éxito a través del esfuerzo y la organización.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Emperador Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Abuso de poder, rigidez o tiranía</li>
            <li>Falta de control, caos o inseguridad</li>
            <li>Problemas con la autoridad o figuras paternas</li>
            <li>Falta de disciplina o irresponsabilidad</li>
            <li>Necesidad de flexibilidad y adaptación</li>
          </ul>
          <p className="mb-2">Cuando El Emperador aparece invertido, advierte sobre el peligro de la rigidez, el autoritarismo o la falta de estructura. Es importante encontrar el equilibrio entre el control y la flexibilidad.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-900 mb-2">Simbolismo de El Emperador</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El trono de piedra: solidez, estabilidad y permanencia</li>
            <li>La armadura: protección y fortaleza</li>
            <li>El cetro y el orbe: poder y dominio sobre el mundo material</li>
            <li>Las montañas: desafíos superados y firmeza de carácter</li>
            <li>El color rojo: pasión, energía y acción</li>
          </ul>
        </section>

        {/* El Emperador en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-900 mb-2">El Emperador en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="font-bold text-orange-700 mb-2">Amor</h3>
              <p>Al derecho: Relación estable, protección, compromiso serio.<br/>Invertido: Control excesivo, frialdad, problemas de autoridad en la pareja.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Liderazgo, ascenso, éxito profesional.<br/>Invertido: Jefes autoritarios, falta de organización, conflictos laborales.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-2">Salud</h3>
              <p>Al derecho: Fortaleza física, buena recuperación.<br/>Invertido: Estrés por exceso de control, rigidez corporal o mental.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-900 mb-2">Ejemplos de Preguntas para El Emperador</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo establecer límites sanos?</li>
            <li>¿Qué área de mi vida necesita más disciplina?</li>
            <li>¿Estoy ejerciendo mi poder de forma positiva?</li>
            <li>¿Cómo puedo ser un mejor líder?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-900 mb-2">Consejos si sale El Emperador</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Organiza tus prioridades y establece rutinas</li>
            <li>Actúa con responsabilidad y madurez</li>
            <li>Evita la rigidez, sé flexible cuando sea necesario</li>
            <li>Busca el equilibrio entre autoridad y empatía</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-orange-900 mb-2">Preguntas Frecuentes sobre El Emperador</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Emperador es una carta positiva?</strong>
              <p>Sí, al derecho es muy positiva para el liderazgo, la estabilidad y el éxito. Invertida, advierte sobre rigidez o abuso de poder.</p>
            </div>
            <div>
              <strong>¿Qué significa El Emperador en el amor?</strong>
              <p>Al derecho: compromiso y protección. Invertido: control excesivo o frialdad.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el cetro y el orbe?</strong>
              <p>El poder y el dominio sobre el mundo material y las circunstancias.</p>
            </div>
            <div>
              <strong>¿El Emperador siempre indica éxito profesional?</strong>
              <p>No siempre, pero suele señalar liderazgo y capacidad de organización.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-orange-900 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-orange-900 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-orange-900 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-orange-900 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-200 to-gray-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-orange-900 mb-2">¿Quieres conectar con la energía de El Emperador?</h3>
          <p className="text-orange-900 mb-4">Haz una tirada de tarot gratis y recibe el mensaje de El Emperador para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-orange-900 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
