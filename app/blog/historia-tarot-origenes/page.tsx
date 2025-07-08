import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Historia del Tarot: Desde sus Orígenes hasta Hoy | Videntia Blog",
  description: "Descubre la fascinante historia del tarot: sus orígenes, evolución, simbolismo y cómo se convirtió en una herramienta de autoconocimiento y adivinación. Guía completa y cronología histórica.",
  keywords: [
    "historia del tarot", "origenes tarot", "tarot antiguo", "evolución tarot", "tarot adivinación", "tarot historia completa", "tarot simbolismo", "tarot en la historia"
  ],
  openGraph: {
    title: "Historia del Tarot: Desde sus Orígenes hasta Hoy",
    description: "Guía completa sobre la historia y evolución del tarot. Orígenes, simbolismo y expansión mundial.",
    url: "/blog/historia-tarot-origenes"
  },
  alternates: {
    canonical: "/blog/historia-tarot-origenes"
  }
};

export default function HistoriaTarotOrigenes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Historia del Tarot: Desde sus Orígenes hasta Hoy</h1>
          <p className="text-lg text-purple-900 mb-4">Un viaje por el origen, evolución y simbolismo del tarot a lo largo de los siglos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Dónde y cómo nació el tarot?</h2>
          <p className="mb-4">El tarot es mucho más que un mazo de cartas: es un símbolo de misterio, autoconocimiento y evolución espiritual. Su historia está llena de mitos, leyendas y hechos documentados que lo han convertido en una herramienta universal para la adivinación y el crecimiento personal.</p>
        </section>

        {/* Orígenes del Tarot */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Orígenes del Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Siglo XV (Italia):</strong> Los primeros mazos de tarot documentados aparecen en el norte de Italia, como el Tarot Visconti-Sforza, usados inicialmente para juegos de cartas nobles.</li>
            <li><strong>Simbolismo medieval:</strong> Las imágenes reflejan valores, arquetipos y creencias de la Europa renacentista.</li>
            <li><strong>Influencia egipcia y cabalística:</strong> En el siglo XVIII surgen teorías que vinculan el tarot con el Antiguo Egipto y la Cábala, aunque sin pruebas históricas sólidas.</li>
          </ul>
        </section>

        {/* Evolución y Expansión */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Evolución y Expansión del Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Tarot de Marsella:</strong> Se populariza en Francia en el siglo XVII y se convierte en el modelo clásico europeo.</li>
            <li><strong>Tarot Rider-Waite-Smith (1909):</strong> Revoluciona el tarot moderno con ilustraciones detalladas en todos los arcanos.</li>
            <li><strong>Siglo XX y XXI:</strong> El tarot se expande globalmente, surgen cientos de mazos temáticos y se integra en la psicología, el coaching y la espiritualidad.</li>
          </ul>
        </section>

        {/* El Tarot como Herramienta de Autoconocimiento */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">El Tarot: De Juego a Herramienta de Autoconocimiento</h2>
          <p className="mb-3">Aunque nació como un juego de cartas, el tarot fue adoptado por ocultistas y esoteristas a partir del siglo XVIII como vía de adivinación y autodescubrimiento. Hoy es una poderosa herramienta para explorar el inconsciente, tomar decisiones y comprender procesos vitales.</p>
        </section>

        {/* Cronología Rápida */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Cronología Breve del Tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Siglo XV:</strong> Primeros mazos en Italia (Visconti-Sforza).</li>
            <li><strong>Siglo XVII:</strong> Tarot de Marsella en Francia.</li>
            <li><strong>Siglo XVIII:</strong> Asociaciones esotéricas y ocultistas.</li>
            <li><strong>1909:</strong> Publicación del Tarot Rider-Waite-Smith.</li>
            <li><strong>Actualidad:</strong> Expansión global y diversidad de mazos.</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas Frecuentes sobre la Historia del Tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot es de origen egipcio?</strong>
              <p>No hay pruebas históricas de un origen egipcio, aunque la simbología es universal y ha sido reinterpretada por muchas culturas.</p>
            </div>
            <div>
              <strong>¿Cuándo se empezó a usar el tarot para adivinación?</strong>
              <p>Desde el siglo XVIII, cuando ocultistas franceses lo adoptan como herramienta esotérica.</p>
            </div>
            <div>
              <strong>¿Cuál es el mazo de tarot más antiguo?</strong>
              <p>El Tarot Visconti-Sforza, creado en Italia en el siglo XV.</p>
            </div>
            <div>
              <strong>¿Por qué hay tantos tipos de tarot?</strong>
              <p>El tarot se ha adaptado a distintas culturas, corrientes esotéricas y necesidades personales, dando lugar a una gran variedad de mazos y estilos.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres descubrir el tarot en profundidad?</h3>
          <p className="text-purple-900 mb-4">Explora el significado de cada carta y haz tu propia tirada gratis.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
