import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Los Enamorados en el Tarot: Significado al Derecho e Invertido, Interpretación y Consejos | Videntia Blog",
  description: "Descubre el significado completo de Los Enamorados en el tarot. Interpretación al derecho e invertido, simbolismo, consejos, preguntas frecuentes y ejemplos de tiradas. Todo sobre Los Enamorados en el tarot Rider-Waite y Marsella.",
  keywords: [
    "los enamorados tarot", "los enamorados significado", "los enamorados derecho", "los enamorados invertido", "los enamorados amor", "los enamorados trabajo", "los enamorados salud", "los enamorados carta tarot", "los enamorados rider waite", "los enamorados marsella"
  ],
  openGraph: {
    title: "Los Enamorados en el Tarot: Significado Completo",
    description: "Significado, interpretación y consejos sobre Los Enamorados en el tarot. Todo lo que necesitas saber sobre esta carta.",
    url: "/cartas/arcanos-mayores/los-enamorados"
  },
  alternates: {
    canonical: "/cartas/arcanos-mayores/los-enamorados"
  }
};

export default function LosEnamoradosTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-pink-700 mb-4 font-cinzel">Los Enamorados (VI) en el Tarot</h1>
          <p className="text-lg text-pink-900 mb-4">Significado al derecho e invertido, interpretación, simbolismo y consejos prácticos.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/cartas/arcanos-mayores" className="text-pink-700 hover:underline font-semibold">← Volver a Arcanos Mayores</Link>
            <Link href="/blog" className="text-pink-700 hover:underline font-semibold">Blog de Tarot</Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mb-8">
          <img src="/public/arcanos/los-enamorados-tarot.png" alt="Los Enamorados Tarot" className="w-48 h-auto rounded-xl shadow-lg border-4 border-pink-200 bg-white" loading="lazy" />
        </div>

        {/* Introducción */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-pink-700 mb-3">¿Quiénes son Los Enamorados en el Tarot?</h2>
          <p className="mb-4">Los Enamorados es la carta número VI del tarot y representa el amor, la unión, las decisiones importantes y la armonía entre opuestos. Es símbolo de relaciones, elecciones morales y conexión profunda. Su energía es apasionada, dual y llena de significado espiritual.</p>
        </section>

        {/* Significado al Derecho */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-2">Significado de Los Enamorados al Derecho</h2>
          <ul className="list-disc pl-6 mb-3 text-green-900">
            <li>Amor verdadero, relaciones profundas y armoniosas</li>
            <li>Decisiones importantes, elecciones morales</li>
            <li>Unión de opuestos, equilibrio y complementariedad</li>
            <li>Confianza, compromiso y atracción mutua</li>
            <li>Conexión espiritual y emocional</li>
          </ul>
          <p className="mb-2">En una tirada, Los Enamorados al derecho indican amor correspondido, decisiones trascendentales y la necesidad de actuar desde el corazón y la honestidad.</p>
        </section>

        {/* Significado Invertido */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Significado de Los Enamorados Invertido</h2>
          <ul className="list-disc pl-6 mb-3 text-red-900">
            <li>Desarmonía, rupturas o conflictos en relaciones</li>
            <li>Indecisión, dudas o malas elecciones</li>
            <li>Falta de compromiso o infidelidad</li>
            <li>Desconexión emocional, tentaciones</li>
            <li>Confusión entre el deber y el deseo</li>
          </ul>
          <p className="mb-2">Cuando Los Enamorados aparecen invertidos, advierten sobre la necesidad de aclarar sentimientos, evitar decisiones impulsivas y trabajar en la comunicación y la confianza.</p>
        </section>

        {/* Simbolismo */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Simbolismo de Los Enamorados</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>La pareja: unión, amor y dualidad</li>
            <li>El ángel: bendición divina y guía espiritual</li>
            <li>El árbol del conocimiento: elecciones y tentaciones</li>
            <li>El sol: claridad, vitalidad y energía positiva</li>
            <li>La montaña: desafíos y superación en la relación</li>
          </ul>
        </section>

        {/* Los Enamorados en el Amor, Trabajo y Salud */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Los Enamorados en el Amor, Trabajo y Salud</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h3 className="font-bold text-pink-700 mb-2">Amor</h3>
              <p>Al derecho: Relaciones profundas, amor correspondido, decisiones de pareja.<br/>Invertido: Rupturas, dudas, triángulos amorosos o falta de compromiso.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Trabajo</h3>
              <p>Al derecho: Buenas asociaciones, trabajo en equipo, decisiones laborales importantes.<br/>Invertido: Conflictos con socios, indecisión, falta de armonía en el entorno laboral.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">Salud</h3>
              <p>Al derecho: Equilibrio emocional, bienestar general.<br/>Invertido: Estrés por relaciones, somatización de conflictos, necesidad de armonía interior.</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de Preguntas y Tiradas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Ejemplos de Preguntas para Los Enamorados</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>¿Qué decisión debo tomar en mi relación?</li>
            <li>¿Cómo puedo mejorar la comunicación con mi pareja?</li>
            <li>¿Estoy actuando desde el amor o el miedo?</li>
            <li>¿Qué me impide comprometerme plenamente?</li>
          </ul>
        </section>

        {/* Consejos Prácticos */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Consejos si sale Los Enamorados</h2>
          <ul className="list-disc pl-6 mb-3">
            <li>Actúa con honestidad y desde el corazón</li>
            <li>Comunica tus sentimientos abiertamente</li>
            <li>Reflexiona antes de tomar decisiones importantes</li>
            <li>Busca el equilibrio entre razón y emoción</li>
          </ul>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Preguntas Frecuentes sobre Los Enamorados</h2>
          <div className="space-y-4">
            <div>
              <strong>¿Los Enamorados es una carta positiva?</strong>
              <p>Sí, al derecho es muy positiva para el amor, la unión y las decisiones acertadas. Invertida, advierte sobre conflictos o indecisión.</p>
            </div>
            <div>
              <strong>¿Qué significa Los Enamorados en el amor?</strong>
              <p>Al derecho: amor correspondido y decisiones de pareja. Invertido: rupturas, dudas o triángulos amorosos.</p>
            </div>
            <div>
              <strong>¿Siempre indica una relación romántica?</strong>
              <p>No necesariamente, también puede hablar de decisiones importantes o asociaciones en otros ámbitos.</p>
            </div>
            <div>
              <strong>¿Qué simboliza el ángel en la carta?</strong>
              <p>La protección divina y la guía espiritual en las relaciones y elecciones.</p>
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
        <div className="text-center bg-gradient-to-r from-pink-200 to-purple-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-pink-900 mb-2">¿Quieres saber qué te depara Los Enamorados?</h3>
          <p className="text-pink-900 mb-4">Haz una tirada de tarot gratis y descubre el mensaje de Los Enamorados para ti.</p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="inline-block bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔮 Consultar Tarot Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
