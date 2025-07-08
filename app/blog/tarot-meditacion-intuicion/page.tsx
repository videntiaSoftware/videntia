import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot, Meditación e Intuición: Cómo Potenciar tu Conexión con las Cartas | Videntia Blog",
  description: "Descubre cómo la meditación y la intuición potencian tus lecturas de tarot. Métodos, ejercicios, consejos, preguntas frecuentes y enlaces internos para una conexión más profunda con las cartas.",
  keywords: [
    "tarot meditacion", "tarot intuicion", "potenciar intuicion tarot", "ejercicios meditacion tarot", "consejos tarot meditacion", "conectar cartas tarot"
  ],
  openGraph: {
    title: "Tarot, Meditación e Intuición: Cómo Potenciar tu Conexión con las Cartas",
    description: "Guía profesional sobre cómo la meditación y la intuición mejoran tus lecturas de tarot. Métodos, ejercicios y consejos para conectar con las cartas.",
    url: "/blog/tarot-meditacion-intuicion"
  },
  alternates: {
    canonical: "/blog/tarot-meditacion-intuicion"
  }
};

export default function TarotMeditacionIntuicion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Tarot, Meditación e Intuición</h1>
          <p className="text-lg text-purple-900 mb-4">Cómo potenciar tu conexión con las cartas a través de la meditación y la intuición.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/blog/desarrollar-intuicion-tarot" className="text-purple-600 hover:underline font-semibold">Desarrollar la Intuición</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/rituales/tarot-meditacion-intuicion.png" alt="Tarot, meditación e intuición" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Por qué es importante la meditación en el tarot?</h2>
          <p className="mb-4">La meditación y la intuición son claves para conectar profundamente con el tarot. Meditar antes de una lectura ayuda a calmar la mente, abrir la percepción y recibir mensajes más claros y auténticos de las cartas.</p>
        </section>

        {/* Métodos y ejercicios para potenciar la intuición */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Ejercicios para potenciar la intuición con el tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Meditación con una carta: elige una carta y obsérvala en silencio, dejando que surjan imágenes y sensaciones.</li>
            <li>Respiración consciente antes de la tirada para centrarte y abrir la percepción.</li>
            <li>Escribe tus primeras impresiones intuitivas antes de consultar significados tradicionales.</li>
            <li>Visualiza la energía de la carta y cómo se relaciona con tu pregunta.</li>
            <li>Confía en los mensajes espontáneos, aunque no tengan lógica inmediata.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de meditación con el tarot</h2>
          <p className="mb-2">Ejercicio: <em>Elige El Ermitaño y medita en silencio durante 5 minutos observando la carta. Anota las sensaciones, imágenes o palabras que surjan. Luego, reflexiona sobre cómo se relacionan con tu situación actual.</em></p>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para conectar con la intuición en el tarot</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Haz de la meditación un hábito antes de cada lectura.</li>
            <li>No te obsesiones con el significado {"correcto"}; confía en tu percepción.</li>
            <li>Registra tus experiencias y observa cómo evoluciona tu intuición.</li>
            <li>Combina la intuición con el estudio de los arquetipos y simbolismos.</li>
            <li>Permítete experimentar y jugar con las cartas.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre tarot, meditación e intuición</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Es necesario meditar antes de cada lectura?</strong>
              <p>No es obligatorio, pero ayuda a obtener mensajes más claros y profundos.</p>
            </div>
            <div>
              <strong>¿Cómo sé si mi intuición es fiable?</strong>
              <p>La práctica y la confianza en ti mismo/a fortalecen la intuición. Registra tus aciertos y aprende de la experiencia.</p>
            </div>
            <div>
              <strong>¿Qué hacer si no siento nada al meditar con una carta?</strong>
              <p>Es normal al principio. Sé paciente y sigue practicando, la conexión se desarrolla con el tiempo.</p>
            </div>
            <div>
              <strong>¿Puedo combinar meditación y tarot con otras prácticas?</strong>
              <p>Sí, puedes sumar escritura, visualización, música o cualquier técnica que potencie tu conexión.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/desarrollar-intuicion-tarot" className="text-purple-700 hover:underline font-semibold">Desarrollar la intuición en el tarot</Link>
          <Link href="/blog/rituales-preparacion-lecturas-tarot" className="text-purple-700 hover:underline font-semibold">Rituales de preparación para el tarot</Link>
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres potenciar tu intuición con el tarot?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y experimenta la conexión profunda con las cartas.</p>
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
