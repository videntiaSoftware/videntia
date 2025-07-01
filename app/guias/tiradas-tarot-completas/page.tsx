import { Metadata } from "next";
import { structuredDataTemplates } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guía Completa de Tiradas de Tarot - Métodos y Técnicas Avanzadas",
  description: "Aprende todas las tiradas de tarot: desde básicas hasta avanzadas. Cruz Celta, Herradura, Estrella de David y más. Guía completa con explicaciones paso a paso.",
  keywords: [
    "tiradas tarot", "cruz celta tarot", "tiradas cartas", "metodos tarot",
    "herradura tarot", "tirada estrella david", "disposiciones tarot",
    "lecturas tarot avanzadas", "spreads tarot", "tecnicas tarot"
  ],
  openGraph: {
    title: "Guía Completa de Tiradas de Tarot - Videntia",
    description: "Domina todas las tiradas de tarot con esta guía completa de métodos y técnicas.",
    url: "/guias/tiradas-tarot-completas",
  },
  alternates: {
    canonical: "/guias/tiradas-tarot-completas",
  },
};

const spreads = [
  {
    name: "Tirada de 1 Carta",
    difficulty: "Principiante",
    purpose: "Orientación diaria, respuesta rápida",
    positions: 1,
    description: "La tirada más simple pero poderosa. Perfecta para consultas diarias y respuestas directas."
  },
  {
    name: "Tirada de 3 Cartas",
    difficulty: "Principiante", 
    purpose: "Pasado-Presente-Futuro, Situación-Acción-Resultado",
    positions: 3,
    description: "Clásica y versátil. Ofrece una visión temporal completa o análisis causa-efecto."
  },
  {
    name: "La Cruz Celta",
    difficulty: "Intermedio",
    purpose: "Análisis completo de situación",
    positions: 10,
    description: "La tirada más famosa del tarot. Analiza todos los aspectos de una situación compleja."
  },
  {
    name: "La Herradura",
    difficulty: "Intermedio",
    purpose: "Decisiones importantes, caminos alternativos",
    positions: 7,
    description: "Ideal para evaluar opciones y tomar decisiones importantes con múltiples factores."
  },
  {
    name: "Estrella de David",
    difficulty: "Avanzado",
    purpose: "Integración de opuestos, balance espiritual",
    positions: 7,
    description: "Explora la dualidad y busca el equilibrio entre fuerzas opuestas."
  },
  {
    name: "El Árbol de la Vida",
    difficulty: "Avanzado",
    purpose: "Crecimiento espiritual profundo",
    positions: 10,
    description: "Basada en la Cábala, explora los diferentes niveles de consciencia y desarrollo."
  }
];

const faqData = [
  {
    question: "¿Cuál es la mejor tirada para principiantes?",
    answer: "La tirada de 3 cartas es ideal para principiantes. Es lo suficientemente simple para no abrumar, pero ofrece información valiosa. Te permite practicar la interpretación de múltiples cartas y sus conexiones."
  },
  {
    question: "¿Cuándo debo usar la Cruz Celta?",
    answer: "Usa la Cruz Celta cuando necesites un análisis profundo y completo de una situación compleja. Es perfecta para temas importantes como relaciones, carrera profesional o decisiones de vida trascendentales."
  },
  {
    question: "¿Puedo crear mis propias tiradas de tarot?",
    answer: "¡Absolutamente! Una vez que domines las tiradas tradicionales, puedes crear disposiciones personalizadas según tus necesidades específicas. Lo importante es que cada posición tenga un propósito claro y significativo."
  }
];

export default function TiradasTarotCompletas() {
  const serviceSchema = structuredDataTemplates.service({
    name: "Guía Completa de Tiradas de Tarot",
    description: "Aprende todas las tiradas de tarot desde básicas hasta avanzadas",
    provider: "Videntia",
    areaServed: "Argentina",
    url: "/guias/tiradas-tarot-completas"
  });

  const faqSchema = structuredDataTemplates.faq(faqData);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-900 text-amber-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-emerald-300 mb-6 font-cinzel">
              Guía Completa de Tiradas de Tarot
            </h1>
            <p className="text-lg text-emerald-200 mb-8 max-w-4xl mx-auto">
              Domina el arte de las tiradas de tarot con esta guía exhaustiva. 
              Desde métodos básicos hasta técnicas avanzadas, aprende a elegir 
              y ejecutar la tirada perfecta para cada consulta.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Link href="/consulta-tarot-gratis" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                🔮 Practicar Tiradas
              </Link>
              <Link href="/blog/como-leer-cartas-tarot-principiantes" className="border-2 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors">
                📚 Guía para Principiantes
              </Link>
            </div>
          </div>

          {/* Overview of Spreads */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Panorama de Tiradas por Nivel
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {spreads.map((spread, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-emerald-300">{spread.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      spread.difficulty === 'Principiante' ? 'bg-green-900/50 text-green-300' :
                      spread.difficulty === 'Intermedio' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {spread.difficulty}
                    </span>
                  </div>
                  <p className="text-emerald-200 text-sm mb-3">{spread.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-teal-300">Posiciones:</span>
                      <span className="text-emerald-200">{spread.positions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300">Propósito:</span>
                      <span className="text-emerald-200">{spread.purpose}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beginner Spreads */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Tiradas para Principiantes
            </h2>

            {/* One Card Spread */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">🃏 Tirada de 1 Carta</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Cuándo Usarla</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• Orientación diaria matutina</li>
                    <li>• Respuestas rápidas y directas</li>
                    <li>• Cuando necesitas claridad inmediata</li>
                    <li>• Para conocer la energía del día</li>
                    <li>• Práctica diaria con el tarot</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-emerald-300 mb-4 mt-6">Preguntas Ideales</h4>
                  <ul className="text-emerald-200 space-y-1 text-sm">
                    <li>• "¿Qué energía necesito hoy?"</li>
                    <li>• "¿En qué debo enfocarme?"</li>
                    <li>• "¿Cuál es mi mensaje para hoy?"</li>
                    <li>• "¿Qué actitud me conviene adoptar?"</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-900/30 p-6 rounded">
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Procedimiento</h4>
                  <ol className="text-emerald-200 space-y-2 text-sm">
                    <li>1. <strong>Preparación:</strong> Medita 2-3 minutos sobre tu pregunta</li>
                    <li>2. <strong>Mezcla:</strong> Baraja las cartas concentrándote en tu intención</li>
                    <li>3. <strong>Selección:</strong> Saca la carta de arriba o la que te "llame"</li>
                    <li>4. <strong>Reflexión:</strong> Observa la carta 30 segundos antes de interpretarla</li>
                    <li>5. <strong>Interpretación:</strong> Conecta el significado con tu pregunta</li>
                    <li>6. <strong>Aplicación:</strong> Piensa cómo aplicar el mensaje durante el día</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Three Card Spread */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">🃏🃏🃏 Tirada de 3 Cartas</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center bg-emerald-900/30 p-4 rounded">
                  <h4 className="font-bold text-emerald-300 mb-2">Posición 1</h4>
                  <p className="text-emerald-200 text-sm font-bold mb-2">PASADO / SITUACIÓN</p>
                  <p className="text-emerald-200 text-xs">
                    Lo que influyó en la situación actual o el trasfondo del tema consultado
                  </p>
                </div>
                <div className="text-center bg-emerald-900/30 p-4 rounded">
                  <h4 className="font-bold text-emerald-300 mb-2">Posición 2</h4>
                  <p className="text-emerald-200 text-sm font-bold mb-2">PRESENTE / ACCIÓN</p>
                  <p className="text-emerald-200 text-xs">
                    La situación actual o la acción que debes tomar ahora mismo
                  </p>
                </div>
                <div className="text-center bg-emerald-900/30 p-4 rounded">
                  <h4 className="font-bold text-emerald-300 mb-2">Posición 3</h4>
                  <p className="text-emerald-200 text-sm font-bold mb-2">FUTURO / RESULTADO</p>
                  <p className="text-emerald-200 text-xs">
                    El resultado probable o el consejo para el futuro cercano
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Variaciones Populares</h4>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-emerald-600 pl-4">
                      <p className="font-bold text-emerald-300">Mente-Cuerpo-Espíritu</p>
                      <p className="text-emerald-200">Analiza estos tres aspectos de tu ser</p>
                    </div>
                    <div className="border-l-4 border-emerald-600 pl-4">
                      <p className="font-bold text-emerald-300">Tú-Situación-Resultado</p>
                      <p className="text-emerald-200">Tu papel, la situación externa y el resultado</p>
                    </div>
                    <div className="border-l-4 border-emerald-600 pl-4">
                      <p className="font-bold text-emerald-300">Opción A-Opción B-Consejo</p>
                      <p className="text-emerald-200">Para decidir entre dos alternativas</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Consejos de Interpretación</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• Lee las cartas como una historia coherente</li>
                    <li>• La carta central es la más importante</li>
                    <li>• Busca conexiones temáticas entre las cartas</li>
                    <li>• Observa si hay progresión o estancamiento</li>
                    <li>• Presta atención a los colores y símbolos recurrentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Intermediate Spreads */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Tiradas Intermedias
            </h2>

            {/* Celtic Cross */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">✝️ La Cruz Celta</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-emerald-200 mb-6">
                    La tirada más famosa y completa del tarot. Proporciona un análisis exhaustivo 
                    de cualquier situación, explorando influencias pasadas, presentes y futuras, 
                    así como factores internos y externos.
                  </p>
                  
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Mejor Para:</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• Situaciones complejas que requieren análisis profundo</li>
                    <li>• Decisiones importantes de vida</li>
                    <li>• Problemas con múltiples factores</li>
                    <li>• Cuando necesitas ver el panorama completo</li>
                    <li>• Lecturas para otros (consultas profesionales)</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-900/30 p-6 rounded">
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Las 10 Posiciones</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>1. Situación Actual</strong><br/>
                      El tema central de la consulta
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>2. Desafío/Cruz</strong><br/>
                      Lo que te cruza u obstaculiza
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>3. Pasado Lejano</strong><br/>
                      Fundamentos de la situación
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>4. Futuro Posible</strong><br/>
                      Lo que puede manifestarse
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>5. Corona</strong><br/>
                      Objetivo consciente o resultado ideal
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>6. Pasado Reciente</strong><br/>
                      Eventos recientes que influyen
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>7. Tu Enfoque</strong><br/>
                      Tu actitud hacia la situación
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>8. Influencias Externas</strong><br/>
                      Cómo otros te ven o te afectan
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>9. Esperanzas/Miedos</strong><br/>
                      Tus expectativas inconscientes
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded">
                      <strong>10. Resultado Final</strong><br/>
                      El resultado más probable
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded border border-yellow-600">
                <h4 className="text-lg font-bold text-yellow-300 mb-3">⚠️ Consejos Importantes para la Cruz Celta</h4>
                <ul className="text-yellow-200 space-y-2 text-sm">
                  <li>• <strong>No te abrumes:</strong> Interpreta primero las posiciones 1, 2, 5 y 10 para el mensaje principal</li>
                  <li>• <strong>Busca patrones:</strong> ¿Predominan arcanos mayores? ¿Qué palos aparecen más?</li>
                  <li>• <strong>Tiempo necesario:</strong> Reserva al menos 30-45 minutos para una interpretación completa</li>
                  <li>• <strong>Pregunta específica:</strong> Asegúrate de tener una pregunta clara antes de comenzar</li>
                </ul>
              </div>
            </div>

            {/* Horseshoe Spread */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">🐴 La Herradura</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-emerald-200 mb-6">
                    Perfecta para decisiones importantes y evaluación de opciones. 
                    La forma de herradura simboliza la buena suerte y las oportunidades 
                    que se presentan en tu camino.
                  </p>
                  
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Las 7 Posiciones:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">1. Pasado</span>
                      <span className="text-emerald-200">Influencias previas</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">2. Presente</span>
                      <span className="text-emerald-200">Situación actual</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">3. Futuro</span>
                      <span className="text-emerald-200">Tendencias futuras</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">4. Tu Enfoque</span>
                      <span className="text-emerald-200">Tu actitud/papel</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">5. Influencias Externas</span>
                      <span className="text-emerald-200">Factores externos</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-700 pb-1">
                      <span className="text-emerald-300 font-bold">6. Obstáculos</span>
                      <span className="text-emerald-200">Lo que debes superar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-300 font-bold">7. Resultado</span>
                      <span className="text-emerald-200">Resultado probable</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Ideal Para Preguntas Como:</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• "¿Debo cambiar de trabajo?"</li>
                    <li>• "¿Cómo evolucionará mi relación?"</li>
                    <li>• "¿Es buen momento para mudarme?"</li>
                    <li>• "¿Qué me depara este nuevo proyecto?"</li>
                  </ul>
                  
                  <div className="mt-6 bg-emerald-900/30 p-4 rounded">
                    <h4 className="text-lg font-bold text-emerald-300 mb-3">💡 Tip de Interpretación</h4>
                    <p className="text-emerald-200 text-sm">
                      Lee primero las posiciones 1-2-3 para la línea temporal básica, 
                      luego 4-5-6 para entender las fuerzas en juego, y finalmente 
                      la posición 7 como síntesis de todo lo anterior.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Spreads */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Tiradas Avanzadas
            </h2>

            {/* Star of David */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">✡️ Estrella de David</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-emerald-200 mb-6">
                    Una tirada espiritual profunda que explora la dualidad y busca el equilibrio. 
                    Basada en el símbolo sagrado de la Estrella de David, representa la unión 
                    del mundo material y espiritual.
                  </p>
                  
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Estructura:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-teal-900/30 p-3 rounded">
                      <strong className="text-teal-300">Triángulo Superior (Espiritual):</strong>
                      <br/>Carta 1: Propósito Superior
                      <br/>Carta 2: Guía Espiritual  
                      <br/>Carta 3: Lección del Alma
                    </div>
                    <div className="bg-orange-900/30 p-3 rounded">
                      <strong className="text-orange-300">Triángulo Inferior (Material):</strong>
                      <br/>Carta 4: Realidad Física
                      <br/>Carta 5: Desafíos Terrenales
                      <br/>Carta 6: Recursos Disponibles
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded">
                      <strong className="text-purple-300">Centro (Integración):</strong>
                      <br/>Carta 7: Síntesis y Equilibrio
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Cuándo Usarla:</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• Crisis espirituales o existenciales</li>
                    <li>• Cuando sientes conflicto interno</li>
                    <li>• Búsqueda de propósito de vida</li>
                    <li>• Integración de aspectos opuestos</li>
                    <li>• Trabajo de sombra psicológica</li>
                  </ul>
                  
                  <div className="mt-6 bg-red-900/20 p-4 rounded border border-red-600">
                    <h4 className="text-lg font-bold text-red-300 mb-3">⚠️ Advertencia</h4>
                    <p className="text-red-200 text-sm">
                      Esta tirada puede revelar información muy profunda y a veces 
                      perturbadora. Úsala solo cuando estés preparado/a para 
                      enfrentar verdades profundas sobre ti mismo/a.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree of Life */}
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6">🌳 El Árbol de la Vida</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-emerald-200 mb-6">
                    Basada en la Cábala, esta tirada de 10 cartas mapea los diferentes 
                    niveles de consciencia y las esferas de experiencia humana. 
                    Es la tirada más espiritual y compleja del tarot.
                  </p>
                  
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Las 10 Sephiroth:</h4>
                  <div className="space-y-1 text-xs">
                    <div><strong className="text-emerald-300">1. Kether:</strong> Corona - Propósito divino</div>
                    <div><strong className="text-emerald-300">2. Chokmah:</strong> Sabiduría - Inspiración</div>
                    <div><strong className="text-emerald-300">3. Binah:</strong> Entendimiento - Comprensión</div>
                    <div><strong className="text-emerald-300">4. Chesed:</strong> Misericordia - Compasión</div>
                    <div><strong className="text-emerald-300">5. Geburah:</strong> Severidad - Disciplina</div>
                    <div><strong className="text-emerald-300">6. Tiphereth:</strong> Belleza - Equilibrio</div>
                    <div><strong className="text-emerald-300">7. Netzach:</strong> Victoria - Emociones</div>
                    <div><strong className="text-emerald-300">8. Hod:</strong> Esplendor - Intelecto</div>
                    <div><strong className="text-emerald-300">9. Yesod:</strong> Fundación - Subconsciente</div>
                    <div><strong className="text-emerald-300">10. Malkuth:</strong> Reino - Mundo físico</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-4">Preparación Especial:</h4>
                  <ul className="text-emerald-200 space-y-2 text-sm">
                    <li>• Estudia previamente la Cábala básica</li>
                    <li>• Medita al menos 15 minutos antes</li>
                    <li>• Usa solo Arcanos Mayores (opcional)</li>
                    <li>• Realiza en luna llena para mayor poder</li>
                    <li>• Ten un diario para registrar insights</li>
                  </ul>
                  
                  <div className="mt-6 bg-blue-900/20 p-4 rounded border border-blue-600">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">🔮 Nivel Requerido</h4>
                    <p className="text-blue-200 text-sm">
                      Solo para tarotistas con al menos 2 años de experiencia. 
                      Requiere conocimiento profundo del simbolismo esotérico 
                      y preparación espiritual adecuada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Custom Spreads */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Creando Tus Propias Tiradas
            </h2>
            
            <div className="bg-slate-800/50 p-8 rounded-lg border border-emerald-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">Principios Básicos</h3>
                  <ul className="text-emerald-200 space-y-3 text-sm">
                    <li>
                      <strong className="text-emerald-300">Propósito claro:</strong> 
                      Cada posición debe tener un significado específico y útil
                    </li>
                    <li>
                      <strong className="text-emerald-300">Flujo lógico:</strong> 
                      Las posiciones deben conectarse de manera coherente
                    </li>
                    <li>
                      <strong className="text-emerald-300">Equilibrio:</strong> 
                      Incluye pasado, presente, futuro y aspectos internos/externos
                    </li>
                    <li>
                      <strong className="text-emerald-300">Simplicidad:</strong> 
                      No sobrecargues con demasiadas posiciones complejas
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">Ejemplo: Tirada de Decisión (5 cartas)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-emerald-900/30 p-3 rounded">
                      <strong>Carta 1 (Centro):</strong> La Decisión
                      <br/><span className="text-emerald-200">El tema central a decidir</span>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded">
                      <strong>Carta 2 (Izquierda):</strong> Opción A
                      <br/><span className="text-emerald-200">Pros y contras de la primera opción</span>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded">
                      <strong>Carta 3 (Derecha):</strong> Opción B
                      <br/><span className="text-emerald-200">Pros y contras de la segunda opción</span>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded">
                      <strong>Carta 4 (Arriba):</strong> Factores a Considerar
                      <br/><span className="text-emerald-200">Información adicional importante</span>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded">
                      <strong>Carta 5 (Abajo):</strong> Mejor Curso de Acción
                      <br/><span className="text-emerald-200">Consejo final del tarot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips and Techniques */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Técnicas Avanzadas de Interpretación
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">🔗 Conexiones entre Cartas</h3>
                <ul className="text-emerald-200 space-y-2 text-sm">
                  <li><strong>Numerología:</strong> Suma los números para encontrar temas ocultos</li>
                  <li><strong>Elementos:</strong> Observa qué elementos predominan (fuego, agua, aire, tierra)</li>
                  <li><strong>Colores:</strong> Los colores dominantes indican el tono emocional</li>
                  <li><strong>Direcciones:</strong> Hacia dónde miran los personajes en las cartas</li>
                  <li><strong>Símbolos repetidos:</strong> Elementos que aparecen en múltiples cartas</li>
                </ul>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">⚡ Técnicas Energéticas</h3>
                <ul className="text-emerald-200 space-y-2 text-sm">
                  <li><strong>Primera impresión:</strong> Anota tu reacción inmediata antes de analizar</li>
                  <li><strong>Carta dominante:</strong> Identifica cuál carta tiene más presencia visual</li>
                  <li><strong>Carta sombra:</strong> La que te genera más resistencia o rechazo</li>
                  <li><strong>Diálogo interno:</strong> "Pregunta" mentalmente a cada carta su mensaje</li>
                  <li><strong>Síntesis final:</strong> Una frase que resuma toda la tirada</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Preguntas Frecuentes sobre Tiradas
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-300 mb-3">{faq.question}</h3>
                  <p className="text-emerald-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center">
              Recursos para Profundizar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/como-leer-cartas-tarot-principiantes" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block">
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Guía para Principiantes</h3>
                <p className="text-emerald-200 text-sm">Aprende los fundamentos antes de tiradas complejas</p>
              </Link>
              <Link href="/blog/22-arcanos-mayores-significado-completo" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block">
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Arcanos Mayores</h3>
                <p className="text-emerald-200 text-sm">Domina el significado de las cartas más poderosas</p>
              </Link>
              <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-colors block">
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Práctica Gratis</h3>
                <p className="text-emerald-200 text-sm">Practica las tiradas con lecturas reales</p>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-emerald-800 to-teal-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-emerald-300 mb-4">
              Domina el Arte de las Tiradas de Tarot
            </h2>
            <p className="text-xl text-emerald-200 mb-6">
              La práctica hace al maestro. Comienza con lecturas gratuitas y perfecciona tu técnica.
            </p>
            <Link 
              href="/consulta-tarot-gratis" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              🔮 Practicar Tiradas Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
