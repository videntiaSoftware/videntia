import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Loco en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de El Loco en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre El Loco en el tarot Rider-Waite y Marsella.",
  keywords: [
    "el loco tarot", "el loco significado", "el loco derecho", "el loco invertido", "el loco amor", "el loco trabajo", "el loco salud", "el loco carta tarot", "el loco rider waite", "el loco marsella"
  ],
  openGraph: {
    title: "El Loco en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre El Loco en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/el-loco"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/el-loco"
  }
};

export default function ElLocoTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-200 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 font-cinzel">El Loco (0) en el Tarot</h1>
          <p className="text-lg text-purple-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-purple-600 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-purple-600 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/el-loco-tarot.png" alt="El Loco Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-yellow-300 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Quién es El Loco en el Tarot?</h2>
          <p className="mb-4">El Loco es la carta número 0 del tarot y representa el inicio del viaje espiritual, la libertad, la inocencia y la apertura a nuevas experiencias. Es símbolo de aventura, espontaneidad y fe en el universo. Su energía es fresca, impredecible y llena de posibilidades.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de El Loco al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Nuevos comienzos, oportunidades inesperadas</li>
            <li>Espontaneidad, libertad, aventura</li>
            <li>Confianza en la vida y en el proceso</li>
            <li>Actuar sin miedo, seguir la intuición</li>
            <li>Viajes, mudanzas, cambios positivos</li>
          </ul>
          <p className="mb-2">En una tirada, El Loco al derecho invita a dar el salto de fe, a confiar en el camino y a abrirse a lo desconocido. Es una carta de optimismo y de dejar atrás el pasado.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de El Loco Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Imprudencia, falta de dirección</li>
            <li>Decisiones apresuradas o irresponsables</li>
            <li>Evitar responsabilidades, inmadurez</li>
            <li>Riesgos innecesarios, advertencia de errores</li>
            <li>Miedo al cambio, bloqueo de nuevas oportunidades</li>
          </ul>
          <p className="mb-2">Cuando El Loco aparece invertido, señala la necesidad de reflexionar antes de actuar, evitar la impulsividad y no dejarse llevar por ilusiones o promesas vacías.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Simbolismo de El Loco</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>El número 0: potencial infinito, inicio y fin</li>
            <li>El bastón y la bolsa: recursos internos y experiencias pasadas</li>
            <li>El perro blanco: instinto, lealtad y advertencia</li>
            <li>El precipicio: el salto a lo desconocido</li>
            <li>Las flores: pureza, alegría y optimismo</li>
          </ul>
        </section>

        {/* El Loco en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">El Loco en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-bold text-yellow-700 mb-2">Amor</h3>
              <p>Al derecho: Nuevas relaciones, aventuras románticas, amor libre y sin ataduras.<br/>Invertido: Inmadurez emocional, relaciones inestables, miedo al compromiso.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Nuevos proyectos, cambios de trabajo, emprendimientos.<br/>Invertido: Falta de enfoque, decisiones impulsivas, riesgo de errores laborales.</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
              <h3 className="font-bold text-blue-700 mb-2">Salud</h3>
              <p>Al derecho: Energía renovada, ganas de experimentar, bienestar general.<br/>Invertido: Descuidos, accidentes por imprudencia, necesidad de mayor atención.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Ejemplos de Preguntas para El Loco</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>{"¿Qué nueva oportunidad debería aprovechar?"}</li>
            <li>{"¿Estoy listo/a para un cambio importante?"}</li>
            <li>{"¿Qué me impide dar el salto de fe?"}</li>
            <li>{"¿Cómo puedo confiar más en la vida?"}</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Consejos si sale El Loco</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Confía en tu intuición y atrévete a lo nuevo</li>
            <li>No temas equivocarte, cada error es aprendizaje</li>
            <li>Evita la imprudencia, pero no dejes que el miedo te detenga</li>
            <li>Disfruta el viaje, no solo el destino</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Preguntas Frecuentes sobre El Loco</h2>
          <div className="space-y-4">
            <div>
              <strong>{"¿El Loco es una carta positiva o negativa?"}</strong>
              <p>Depende del contexto. Al derecho suele ser positiva, pero invertida advierte sobre riesgos y falta de madurez.</p>
            </div>
            <div>
              <strong>{"¿Qué significa El Loco en el amor?"}</strong>
              <p>Al derecho: nuevas experiencias amorosas, libertad. Invertido: relaciones inestables o inmaduras.</p>
            </div>
            <div>
              <strong>{"¿Qué representa el perro en la carta de El Loco?"}</strong>
              <p>El instinto, la lealtad y la advertencia de no caer en la imprudencia.</p>
            </div>
            <div>
              <strong>{"¿El Loco siempre significa un viaje literal?"}</strong>
              <p>No necesariamente. Puede ser un viaje interior, un cambio de mentalidad o una nueva etapa vital.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-purple-700 hover:underline font-semibold">Todos los Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-purple-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog" className="text-purple-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-purple-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-300 to-purple-300 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">¿Quieres saber qué te depara El Loco?</h3>
          <p className="text-purple-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de El Loco para ti.</p>
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
