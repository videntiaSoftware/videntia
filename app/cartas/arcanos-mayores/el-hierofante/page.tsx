import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Hierofante en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Hierofante en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Hierofante en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el hierofante tarot", "el hierofante significado", "el hierofante derecho", "el hierofante invertido", "el hierofante amor", "el hierofante trabajo", "el hierofante salud", "el hierofante carta tarot", "el hierofante rider waite", "el hierofante marsella"
  ],
  openGraph: {
    title: "El Hierofante en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Hierofante en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-hierofante"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-hierofante"
  }
};

export default function ElHierofanteTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 font-cinzel">El Hierofante (V) en el Tarot</h1>
          <p className="text-lg text-blue-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-blue-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-blue-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-hierofante-tarot.png" alt="El Hierofante Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-blue-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">¿Quién es El Hierofante en el Tarot?</h2>
          <p className="mb-4">El Hierofante es la carta número V del tarot y representa la tradición, la espiritualidad, la enseñanza y la sabiduría institucional. Es símbolo de normas, valores, aprendizaje y guía espiritual. Su energía es conservadora, sabia y orientada a la comunidad.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Hierofante al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Tradición, valores y normas sociales</li>
            <li>Enseñanza, aprendizaje y mentoría</li>
            <li>Guía espiritual, fe y religión</li>
            <li>Conformidad, pertenencia a un grupo</li>
            <li>Búsqueda de consejo o apoyo institucional</li>
          </ul>
          <p className="mb-2">En una tirada, El Hierofante al derecho indica la importancia de seguir las reglas, buscar consejo de expertos y aprender de la tradición. Es una carta de estabilidad y pertenencia.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Hierofante Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Rebeldía, cuestionar la autoridad</li>
            <li>Dogmatismo, intolerancia o fanatismo</li>
            <li>Falta de fe, crisis espiritual</li>
            <li>Ruptura con la tradición, innovación</li>
            <li>Sentirse fuera de lugar o incomprendido</li>
          </ul>
          <p className="mb-2">Cuando El Hierofante aparece invertido, advierte sobre la necesidad de encontrar tu propio camino, cuestionar normas rígidas y evitar el fanatismo o la intolerancia.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Simbolismo de El Hierofante</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El trono y la triple corona: autoridad espiritual y terrenal</li>
            <li>Las llaves cruzadas: acceso al conocimiento sagrado</li>
            <li>Los dos acólitos: enseñanza y transmisión de sabiduría</li>
            <li>La mano en gesto de bendición: guía y protección</li>
            <li>El bastón: poder y liderazgo espiritual</li>
          </ul>
        </section>

        {/* El Hierofante en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">El Hierofante en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones tradicionales, compromiso, matrimonio.<br/>Invertido: Falta de compromiso, relaciones poco convencionales, rebeldía.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Aprendizaje, mentoría, trabajo en equipo.<br/>Invertido: Conflictos con la autoridad, rechazo a las normas, innovación disruptiva.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-2">Salud</h3>
              <p>Al derecho: Seguir consejos médicos, rutinas saludables.<br/>Invertido: Ignorar recomendaciones, buscar terapias alternativas, crisis de fe.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Ejemplos de Preguntas para El Hierofante</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué puedo aprender de la tradición?</li>
            <li>¿A quién puedo acudir por consejo o guía?</li>
            <li>¿Estoy siguiendo mis valores o los de otros?</li>
            <li>¿Qué normas necesito cuestionar?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Consejos si sale El Hierofante</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Busca consejo de personas con experiencia</li>
            <li>Aprende de la historia y la tradición</li>
            <li>No temas cuestionar normas obsoletas</li>
            <li>Encuentra tu propio camino espiritual</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Preguntas Frecuentes sobre El Hierofante</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El Hierofante es una carta positiva?</strong>
              <p>Sí, al derecho es positiva para el aprendizaje, la guía y la estabilidad. Invertida, advierte sobre rebeldía o dogmatismo.</p>
            </div>
            <div>
              <strong>¿Qué significa El Hierofante en el amor?</strong>
              <p>Al derecho: compromiso y tradición. Invertido: relaciones poco convencionales o falta de compromiso.</p>
            </div>
            <div>
              <strong>¿Qué simbolizan las llaves cruzadas?</strong>
              <p>El acceso al conocimiento sagrado y la conexión entre lo espiritual y lo terrenal.</p>
            </div>
            <div>
              <strong>¿El Hierofante siempre indica seguir las reglas?</strong>
              <p>No siempre, a veces invita a cuestionar normas rígidas y buscar tu propio camino.</p>
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
        <div className="text-center bg-gradient-to-r from-blue-200 to-gray-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">¿Quieres recibir la guía de El Hierofante?</h3>
          <p className="text-blue-900 mb-4">Haz una tirada de tarot gratis y conecta con la sabiduría de El Hierofante.</p>
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
