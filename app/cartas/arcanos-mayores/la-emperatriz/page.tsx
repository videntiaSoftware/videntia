import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Emperatriz en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Emperatriz en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Emperatriz en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la emperatriz tarot", "la emperatriz significado", "la emperatriz derecho", "la emperatriz invertida", "la emperatriz amor", "la emperatriz trabajo", "la emperatriz salud", "la emperatriz carta tarot", "la emperatriz rider waite", "la emperatriz marsella"
  ],
  openGraph: {
    title: "La Emperatriz en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Emperatriz en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-emperatriz"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-emperatriz"
  }
};

export default function LaEmperatrizTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-pink-800 mb-4 font-cinzel">La Emperatriz (III) en el Tarot</h1>
          <p className="text-lg text-pink-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-pink-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-pink-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-emperatriz-tarot.png" alt="La Emperatriz Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-pink-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-pink-800 mb-3">¿Quién es La Emperatriz en el Tarot?</h2>
          <p className="mb-4">La Emperatriz es la carta número III del tarot y representa la fertilidad, la creatividad, la abundancia y el poder femenino. Es símbolo de maternidad, belleza, naturaleza y prosperidad. Su energía es generosa, protectora y llena de vida.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Emperatriz al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Abundancia, prosperidad y éxito material</li>
            <li>Creatividad, inspiración y proyectos fértiles</li>
            <li>Maternidad, embarazo, cuidado y protección</li>
            <li>Conexión con la naturaleza y el placer sensorial</li>
            <li>Relaciones armoniosas y amorosas</li>
          </ul>
          <p className="mb-2">En una tirada, La Emperatriz al derecho indica un período de crecimiento, creatividad y bienestar. Es una carta de bendiciones, amor y realización personal.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Emperatriz Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Bloqueos creativos, infertilidad o estancamiento</li>
            <li>Dependencia emocional, sobreprotección</li>
            <li>Falta de autoestima o descuido personal</li>
            <li>Problemas familiares o en relaciones</li>
            <li>Desconexión con la naturaleza o el cuerpo</li>
          </ul>
          <p className="mb-2">Cuando La Emperatriz aparece invertida, advierte sobre la necesidad de cuidar de uno mismo, superar bloqueos y evitar la dependencia excesiva de los demás.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-800 mb-2">Simbolismo de La Emperatriz</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El trono y la corona de estrellas: poder femenino y conexión divina</li>
            <li>El campo de trigo: fertilidad, abundancia y cosecha</li>
            <li>El escudo con el símbolo de Venus: amor, belleza y creatividad</li>
            <li>El río: flujo de emociones y vida</li>
            <li>La túnica floral: conexión con la naturaleza y la sensualidad</li>
          </ul>
        </section>

        {/* La Emperatriz en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-800 mb-2">La Emperatriz en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h3 className="font-bold text-pink-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones plenas, amor maternal, fertilidad.<br/>Invertida: Dependencia, celos, falta de cariño o problemas familiares.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Éxito en proyectos creativos, crecimiento profesional.<br/>Invertida: Falta de motivación, estancamiento, exceso de control.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-700 mb-2">Salud</h3>
              <p>Al derecho: Vitalidad, fertilidad, bienestar físico.<br/>Invertida: Problemas hormonales, descuido personal, estrés.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-800 mb-2">Ejemplos de Preguntas para La Emperatriz</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo potenciar mi creatividad?</li>
            <li>¿Qué necesito para sentirme más abundante?</li>
            <li>¿Cómo cuidar mejor de mí y de los demás?</li>
            <li>¿Qué bloqueos me impiden crecer?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-800 mb-2">Consejos si sale La Emperatriz</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Conéctate con la naturaleza y tu cuerpo</li>
            <li>Expresa tu creatividad sin miedo</li>
            <li>Cuida de ti y de quienes amas</li>
            <li>Permítete recibir y disfrutar la abundancia</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-800 mb-2">Preguntas Frecuentes sobre La Emperatriz</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Emperatriz es una carta positiva?</strong>
              <p>Sí, al derecho es muy positiva y habla de abundancia, creatividad y amor. Invertida, advierte sobre bloqueos o dependencia.</p>
            </div>
            <div>
              <strong>¿Qué significa La Emperatriz en el amor?</strong>
              <p>Al derecho: amor pleno, fertilidad y relaciones armoniosas. Invertida: dependencia o problemas familiares.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el escudo de Venus?</strong>
              <p>El amor, la belleza y la creatividad femenina.</p>
            </div>
            <div>
              <strong>¿La Emperatriz siempre indica embarazo?</strong>
              <p>No siempre, pero puede señalar fertilidad o nuevos comienzos creativos.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-pink-800 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-pink-800 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-pink-800 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-pink-800 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-200 to-green-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-pink-900 mb-2">¿Quieres conectar con la energía de La Emperatriz?</h3>
          <p className="text-pink-900 mb-4">Haz una tirada de tarot gratis y recibe el mensaje de La Emperatriz para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-pink-800 hover:bg-pink-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
