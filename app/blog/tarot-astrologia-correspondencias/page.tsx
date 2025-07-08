import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot y Astrología: Conexiones y Correspondencias | Videntia Blog",
  description: "Descubre las conexiones entre el tarot y la astrología. Correspondencias entre cartas, signos zodiacales, planetas y elementos. Guía completa para integrar ambas disciplinas en tus lecturas.",
  keywords: [
    "tarot y astrología", "correspondencias tarot astrología", "tarot signos zodiacales", "tarot planetas", "elementos tarot astrología", "arcanos mayores astrología", "tarot astrología guía"
  ],
  openGraph: {
    title: "Tarot y Astrología: Conexiones y Correspondencias",
    description: "Guía completa sobre las correspondencias entre el tarot y la astrología. Cartas, signos, planetas y elementos.",
    url: "/blog/tarot-astrologia-correspondencias"
  },
  alternates: {
    canonical: "/blog/tarot-astrologia-correspondencias"
  }
};

export default function TarotAstrologiaCorrespondencias() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-yellow-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 font-cinzel">Tarot y Astrología: Conexiones y Correspondencias</h1>
          <p className="text-lg text-indigo-900 mb-4">Descubre cómo se relacionan las cartas del tarot con los signos zodiacales, planetas y elementos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-indigo-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-indigo-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">¿Por qué unir tarot y astrología?</h2>
          <p className="mb-4">El tarot y la astrología son dos lenguajes simbólicos que se complementan. Integrar ambas disciplinas en tus lecturas permite obtener mensajes más profundos, comprender ciclos y conectar con la energía de los signos y planetas.</p>
        </section>

        {/* Correspondencias principales */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Correspondencias entre Arcanos Mayores y Astrología</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>El Mago:</strong> Mercurio (comunicación, intelecto)</li>
            <li><strong>La Emperatriz:</strong> Venus (amor, creatividad)</li>
            <li><strong>El Carro:</strong> Cáncer (voluntad, avance)</li>
            <li><strong>La Fuerza:</strong> Leo (coraje, autoexpresión)</li>
            <li><strong>La Justicia:</strong> Libra (equilibrio, justicia)</li>
            <li><strong>El Ermitaño:</strong> Virgo (sabiduría, introspección)</li>
            <li><strong>La Rueda de la Fortuna:</strong> Júpiter (cambios, expansión)</li>
            <li><strong>La Muerte:</strong> Escorpio (transformación)</li>
            <li><strong>La Estrella:</strong> Acuario (esperanza, inspiración)</li>
            <li><strong>El Mundo:</strong> Saturno (culminación, estructura)</li>
            {/* Puedes ampliar la lista según la tradición que sigas */}
          </ul>
        </section>

        {/* Palos y elementos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Palos del Tarot y Elementos Astrológicos</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Copas:</strong> Agua (Cáncer, Escorpio, Piscis)</li>
            <li><strong>Espadas:</strong> Aire (Géminis, Libra, Acuario)</li>
            <li><strong>Bastos:</strong> Fuego (Aries, Leo, Sagitario)</li>
            <li><strong>Oros:</strong> Tierra (Tauro, Virgo, Capricornio)</li>
          </ul>
        </section>

        {/* Cómo integrar ambas disciplinas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">¿Cómo integrar tarot y astrología en una lectura?</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Relaciona la carta obtenida con el signo o planeta regente.</li>
            <li>Observa si predominan cartas de un elemento y compáralo con la carta natal del consultante.</li>
            <li>Utiliza tiradas temáticas: por ejemplo, una carta para cada casa astrológica.</li>
            <li>Consulta el tránsito planetario y el arcano correspondiente para entender el momento vital.</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Preguntas Frecuentes sobre Tarot y Astrología</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Todas las cartas tienen correspondencia astrológica?</strong>
              <p>Principalmente los Arcanos Mayores y los palos, aunque algunas escuelas asignan planetas a todas las cartas.</p>
            </div>
            <div>
              <strong>¿Qué aporta la astrología a una lectura de tarot?</strong>
              <p>Profundidad, contexto temporal y comprensión de energías predominantes.</p>
            </div>
            <div>
              <strong>¿Puedo usar el tarot para analizar mi carta natal?</strong>
              <p>Sí, puedes sacar cartas para cada casa o planeta y obtener mensajes personalizados.</p>
            </div>
            <div>
              <strong>¿Qué mazos son mejores para unir tarot y astrología?</strong>
              <p>Existen mazos temáticos, pero cualquier Rider-Waite o Marsella sirve si conoces las correspondencias.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-indigo-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-indigo-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog/cuatro-palos-tarot-elementos" className="text-indigo-700 hover:underline font-semibold">Palos y Elementos del Tarot</Link>
          <Link href="/blog" className="text-indigo-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-indigo-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-200 to-yellow-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-800 mb-2">¿Quieres explorar tu carta natal con el tarot?</h3>
          <p className="text-indigo-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de las cartas para tu signo.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
