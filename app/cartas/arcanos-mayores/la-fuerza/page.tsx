import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Fuerza en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de La Fuerza en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre La Fuerza en el tarot Rider-Waite y Marsella.",
  keywords: [
    "la fuerza tarot", "la fuerza significado", "la fuerza derecho", "la fuerza invertido", "la fuerza amor", "la fuerza trabajo", "la fuerza salud", "la fuerza carta tarot", "la fuerza rider waite", "la fuerza marsella"
  ],
  openGraph: {
    title: "La Fuerza en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre La Fuerza en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/la-fuerza"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/la-fuerza"
  }
};

export default function LaFuerzaTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-pink-700 mb-4 font-cinzel">La Fuerza (XI) en el Tarot</h1>
          <p className="text-lg text-pink-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-pink-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-pink-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/la-fuerza-tarot.png" alt="La Fuerza Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-pink-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-pink-700 mb-3">¿Qué representa La Fuerza en el Tarot?</h2>
          <p className="mb-4">La Fuerza es la carta número XI de los Arcanos Mayores y simboliza el dominio de uno mismo, la valentía, la compasión y la perseverancia. Representa la capacidad de superar obstáculos a través de la calma, la paciencia y la fortaleza interior, más que por la fuerza bruta.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de La Fuerza al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Fortaleza interior, autocontrol y coraje</li>
            <li>Paciencia, compasión y tolerancia</li>
            <li>Superación de miedos y obstáculos</li>
            <li>Confianza en uno mismo y resiliencia</li>
            <li>Influencia positiva sobre los demás</li>
          </ul>
          <p className="mb-2">Al derecho, La Fuerza indica que tienes la capacidad de enfrentar cualquier reto con calma y determinación. Es una carta de poder interior y dominio de las emociones.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de La Fuerza Invertida</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Falta de confianza, debilidad o inseguridad</li>
            <li>Impulsividad, ira o pérdida de control</li>
            <li>Desánimo, miedo o sensación de derrota</li>
            <li>Dependencia emocional o falta de autocontrol</li>
            <li>Dificultad para superar obstáculos internos</li>
          </ul>
          <p className="mb-2">Invertida, La Fuerza advierte sobre la necesidad de trabajar la autoestima, controlar los impulsos y recuperar la confianza en uno mismo.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Simbolismo de La Fuerza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La mujer: dominio suave, compasión y sabiduría</li>
            <li>El león: pasiones, instintos y fuerza bruta</li>
            <li>La corona de flores: pureza, armonía y control espiritual</li>
            <li>El infinito sobre la cabeza: poder ilimitado y conexión divina</li>
            <li>El paisaje: serenidad y equilibrio</li>
          </ul>
        </section>

        {/* La Fuerza en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">La Fuerza en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-pink-100 p-4 rounded-lg border border-pink-300">
              <h3 className="font-bold text-pink-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones sólidas, apoyo mutuo, superación de crisis.<br/>Invertido: Celos, inseguridad, conflictos emocionales.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Trabajo</h3>
              <p>Al derecho: Liderazgo, perseverancia, éxito tras el esfuerzo.<br/>Invertido: Falta de motivación, estrés, problemas de autoridad.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Salud</h3>
              <p>Al derecho: Vitalidad, recuperación, fortaleza física y mental.<br/>Invertido: Cansancio, ansiedad, necesidad de autocuidado.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Ejemplos de Preguntas para La Fuerza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Cómo puedo superar este obstáculo?</li>
            <li>¿Qué debo hacer para fortalecer mi confianza?</li>
            <li>¿Estoy controlando mis emociones adecuadamente?</li>
            <li>¿Cómo puedo influir positivamente en mi entorno?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Consejos si sale La Fuerza</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Confía en tu fortaleza interior y no te rindas</li>
            <li>Practica la paciencia y la compasión contigo y con los demás</li>
            <li>Evita la confrontación, busca el equilibrio</li>
            <li>Trabaja en tu autoestima y autocontrol</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Preguntas Frecuentes sobre La Fuerza</h2>
          <div className="space-y-4">
            <div>
              <strong>¿La Fuerza es una carta positiva?</strong>
              <p>Sí, al derecho indica poder interior y superación. Invertida señala inseguridad o falta de control.</p>
            </div>
            <div>
              <strong>¿Qué significa La Fuerza en el amor?</strong>
              <p>Al derecho: relaciones sólidas y apoyo. Invertido: celos o conflictos.</p>
            </div>
            <div>
              <strong>¿La Fuerza siempre indica fortaleza física?</strong>
              <p>No necesariamente. Puede referirse a fortaleza emocional, mental o espiritual.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el león en La Fuerza?</strong>
              <p>Los instintos y pasiones que deben ser dominados con sabiduría y compasión.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-pink-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-pink-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-pink-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-pink-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-300 to-yellow-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-pink-800 mb-2">¿Quieres saber qué te depara La Fuerza?</h3>
          <p className="text-pink-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de La Fuerza para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🦁 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
