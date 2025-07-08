import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot para el Trabajo y la Carrera Profesional | Videntia Blog",
  description: "Especialízate en lecturas laborales. Cómo interpretar el tarot para el trabajo, la carrera y el éxito profesional. Significados de cartas, tiradas recomendadas, consejos y preguntas frecuentes.",
  keywords: [
    "tarot trabajo", "tarot carrera profesional", "lectura tarot trabajo", "cartas tarot trabajo", "tiradas tarot trabajo", "tarot éxito profesional", "significado cartas trabajo"
  ],
  openGraph: {
    title: "Tarot para el Trabajo y la Carrera Profesional",
    description: "Guía completa para interpretar el tarot en el ámbito laboral y profesional. Tiradas, cartas clave y consejos.",
    url: "/blog/tarot-trabajo-carrera-profesional"
  },
  alternates: {
    canonical: "/blog/tarot-trabajo-carrera-profesional"
  }
};

export default function TarotTrabajoCarreraProfesional() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 font-cinzel">Tarot para el Trabajo y la Carrera Profesional</h1>
          <p className="text-lg text-green-900 mb-4">Descubre cómo el tarot puede guiarte en tu vida laboral, profesional y en la toma de decisiones de carrera.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/blog" className="text-green-700 hover:underline font-semibold">← Volver al Blog</Link>
            <Link href="/cartas/arcanos-mayores" className="text-green-700 hover:underline font-semibold">Arcanos Mayores</Link>
          </div>
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-3">¿Por qué consultar el tarot para el trabajo?</h2>
          <p className="mb-4">El tarot es una herramienta poderosa para orientar decisiones laborales, descubrir oportunidades, superar bloqueos y potenciar el éxito profesional. Permite analizar el entorno, las relaciones laborales y el desarrollo de carrera desde una perspectiva integral.</p>
        </section>

        {/* Cartas clave en el trabajo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Cartas Clave en el Tarot para el Trabajo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>El Emperador:</strong> Liderazgo, autoridad, estabilidad profesional.</li>
            <li><strong>El Mago:</strong> Iniciativa, creatividad, nuevos proyectos.</li>
            <li><strong>El Carro:</strong> Avance, éxito, superación de obstáculos.</li>
            <li><strong>La Justicia:</strong> Contratos, decisiones legales, equilibrio laboral.</li>
            <li><strong>Oros:</strong> Dinero, recursos, logros materiales.</li>
            <li><strong>Bastos:</strong> Emprendimiento, motivación, energía para nuevos retos.</li>
            <li><strong>Espadas:</strong> Comunicación, negociaciones, resolución de conflictos.</li>
          </ul>
        </section>

        {/* Tiradas recomendadas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Tiradas de Tarot para el Trabajo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Tirada de 3 cartas:</strong> Situación actual, desafío y consejo profesional.</li>
            <li><strong>Tirada de oportunidades:</strong> Dónde enfocar tu energía para crecer laboralmente.</li>
            <li><strong>Tirada de cambio de trabajo:</strong> Pros, contras y resultado de un cambio laboral.</li>
            <li><strong>Tirada de relaciones laborales:</strong> Dinámica con colegas, jefes y ambiente de trabajo.</li>
          </ul>
        </section>

        {/* Ejemplos de preguntas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Ejemplos de Preguntas para el Tarot Laboral</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué puedo hacer para avanzar en mi carrera?</li>
            <li>¿Es buen momento para cambiar de trabajo?</li>
            <li>¿Cómo mejorar la relación con mi jefe o colegas?</li>
            <li>¿Qué obstáculos debo superar para lograr mis metas profesionales?</li>
            <li>¿Qué oportunidades laborales se presentan en mi camino?</li>
          </ul>
        </section>

        {/* Consejos para lecturas laborales */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Consejos para Interpretar el Tarot en el Trabajo</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Enfoca la pregunta en acciones y soluciones, no solo en predicciones.</li>
            <li>Observa la combinación de cartas de Oros, Bastos y Espadas.</li>
            <li>Ten en cuenta el contexto de la empresa y el sector profesional.</li>
            <li>Utiliza el tarot como guía para el autoconocimiento y la toma de decisiones.</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Preguntas Frecuentes sobre Tarot y Trabajo</h2>
          <div className="space-y-4">
            <div>
              <strong>¿El tarot puede predecir si conseguiré un trabajo?</strong>
              <p>El tarot orienta sobre tendencias y oportunidades, pero el resultado depende de tus acciones y contexto.</p>
            </div>
            <div>
              <strong>¿Qué cartas son más favorables en el trabajo?</strong>
              <p>El Emperador, El Mago, El Carro, Oros y Bastos suelen ser positivas en el ámbito laboral.</p>
            </div>
            <div>
              <strong>¿Se puede preguntar por un ascenso o aumento?</strong>
              <p>Sí, el tarot puede orientar sobre el momento y las estrategias para lograrlo.</p>
            </div>
            <div>
              <strong>{"¿Cómo interpretar cartas 'negativas' en el trabajo?"}</strong>
              <p>Como advertencias o áreas a mejorar, no como sentencias definitivas.</p>
            </div>
          </div>
        </section>

        {/* Enlaces internos */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/cartas/arcanos-mayores" className="text-green-700 hover:underline font-semibold">Arcanos Mayores</Link>
          <Link href="/cartas/arcanos-menores" className="text-green-700 hover:underline font-semibold">Arcanos Menores</Link>
          <Link href="/blog/errores-comunes-leer-tarot" className="text-green-700 hover:underline font-semibold">Errores Comunes al Leer Tarot</Link>
          <Link href="/blog" className="text-green-700 hover:underline font-semibold">Blog de Tarot</Link>
          <Link href="/consulta-tarot-gratis" className="text-green-700 hover:underline font-semibold">Lectura de Tarot Gratis</Link>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-200 to-yellow-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-green-800 mb-2">¿Quieres orientación para tu carrera?</h3>
          <p className="text-green-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de las cartas para tu vida profesional.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
