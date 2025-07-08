import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Los Ases en el Tarot: Significado y Nuevos Comienzos | Videntia Blog",
  description: "Descubre el significado de los Ases en el tarot y su relación con los nuevos comienzos. Interpretación, ejemplos, consejos, preguntas frecuentes y enlaces internos.",
  keywords: [
    "ases tarot", "significado ases tarot", "nuevos comienzos tarot", "as de bastos", "as de copas", "as de espadas", "as de oros", "interpretar ases tarot"
  ],
  openGraph: {
    title: "Los Ases en el Tarot: Significado y Nuevos Comienzos",
    description: "Guía profesional sobre los Ases en el tarot y su simbolismo de nuevos comienzos. Ejemplos, consejos y preguntas frecuentes.",
    url: "/blog/ases-tarot-nuevos-comienzos"
  },
  alternates: {
    canonical: "/blog/ases-tarot-nuevos-comienzos"
  }
};

export default function AsesTarotNuevosComienzos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">Los Ases en el Tarot: Nuevos Comienzos</h1>
          <p className="text-lg text-purple-900 mb-4">Significado, interpretación y consejos sobre los Ases y su energía de inicio.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-menores" className="text-purple-600 hover:underline font-semibold">Arcanos Menores</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/ases-tarot-nuevos-comienzos.png" alt="Ases del tarot y nuevos comienzos" className="w-48 h-auto rounded-xl shadow-lg border-4 border-purple-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Qué representan los Ases en el tarot?</h2>
          <p className="mb-4">Los Ases son cartas de inicio, potencial puro y oportunidades. Cada As (Bastos, Copas, Espadas, Oros) simboliza el nacimiento de una nueva energía en su elemento: acción, emoción, pensamiento o materia. Son señales de nuevos comienzos y puertas que se abren.</p>
        </section>

        {/* Significado de cada As */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de los Ases en el tarot</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li><strong>As de Bastos:</strong> Inicio de proyectos, creatividad, impulso, pasión.</li>
            <li><strong>As de Copas:</strong> Nacimiento de sentimientos, amor, intuición, apertura emocional.</li>
            <li><strong>As de Espadas:</strong> Nuevas ideas, claridad mental, verdad, comunicación.</li>
            <li><strong>As de Oros:</strong> Oportunidades materiales, prosperidad, nuevos recursos, estabilidad.</li>
          </ul>
        </section>

        {/* Ejemplo práctico */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplo de tirada con Ases</h2>
          <p className="mb-2">Pregunta: <em>¿Qué nueva oportunidad se presenta en mi vida?</em></p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Sale el As de Oros:</strong> Indica una oportunidad laboral, económica o de estabilidad material.</li>
            <li><strong>Sale el As de Copas:</strong> Señala el inicio de una relación o una apertura emocional importante.</li>
          </ul>
        </section>

        {/* Consejos prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos para interpretar los Ases</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Observa el contexto y la pregunta para definir el tipo de inicio que anuncian.</li>
            <li>Combina el As con otras cartas para ver cómo se desarrollará la oportunidad.</li>
            <li>Confía en la energía de potencial y actúa para aprovecharla.</li>
            <li>Recuerda que los Ases son semillas: requieren acción y cuidado para crecer.</li>
          </ul>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas frecuentes sobre los Ases en el tarot</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Los Ases siempre son positivos?</strong>
              <p>Generalmente sí, pero pueden advertir sobre inicios que requieren responsabilidad o madurez.</p>
            </div>
            <div>
              <strong>¿Qué significa que salgan varios Ases juntos?</strong>
              <p>Indica una etapa de grandes oportunidades y cambios, pero también de decisiones importantes.</p>
            </div>
            <div>
              <strong>¿Un As puede representar a una persona?</strong>
              <p>En ocasiones, sí: alguien que trae una nueva energía o propuesta a tu vida.</p>
            </div>
            <div>
              <strong>¿Qué hacer si sale un As invertido?</strong>
              <p>Puede señalar bloqueos, miedos o falta de acción para aprovechar la oportunidad.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog/cuatro-palos-tarot-elementos" className="text-purple-700 hover:underline font-semibold">Los 4 Palos del Tarot</Link>
          <Link href="/blog/errores-comunes-leer-tarot" className="text-purple-700 hover:underline font-semibold">Errores comunes al leer el tarot</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Listo para un nuevo comienzo?</h3>
          <p className="text-purple-900 mb-4">Haz tu consulta de tarot gratis y descubre qué As te acompaña en esta etapa.</p>
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
