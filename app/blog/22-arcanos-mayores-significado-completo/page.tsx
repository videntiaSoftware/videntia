import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Los 22 Arcanos Mayores del Tarot - Significado Completo y Simbolismo",
  description: "Guía completa de los 22 Arcanos Mayores del Tarot. Significado, simbolismo e interpretación de cada carta. Desde El Loco hasta El Mundo.",
  keywords: [
    "arcanos mayores tarot", "22 arcanos mayores", "significado arcanos mayores",
    "cartas mayores tarot", "simbolismo tarot", "el loco el mundo tarot",
    "interpretacion arcanos mayores", "cartas arcanas tarot", "tarot mayor"
  ],
  openGraph: {
    title: "Los 22 Arcanos Mayores del Tarot - Significado Completo",
    description: "Descubre el significado profundo de los 22 Arcanos Mayores del Tarot y su simbolismo ancestral.",
    url: "/blog/22-arcanos-mayores-significado-completo",
  },
  alternates: {
    canonical: "/blog/22-arcanos-mayores-significado-completo",
  },
};

const majorArcana = [
  {
    number: 0,
    name: "El Loco",
    keywords: ["Nuevos comienzos", "Espontaneidad", "Aventura"],
    meaning: "Representa el inicio de un viaje, la inocencia y la fe en lo desconocido. Es el espíritu libre que se lanza a la aventura sin miedo.",
    reversed: "Imprudencia, falta de dirección, decisiones apresuradas"
  },
  {
    number: 1,
    name: "El Mago",
    keywords: ["Manifestación", "Poder personal", "Voluntad"],
    meaning: "El poder de la voluntad para manifestar los deseos en la realidad. Representa la capacidad de usar todos los recursos disponibles.",
    reversed: "Manipulación, abuso de poder, falta de enfoque"
  },
  {
    number: 2,
    name: "La Sacerdotisa",
    keywords: ["Intuición", "Misterio", "Conocimiento oculto"],
    meaning: "La sabiduría interior y la intuición. Representa el acceso al conocimiento inconsciente y los misterios femeninos.",
    reversed: "Secretos ocultos, falta de intuición, desconexión interior"
  },
  {
    number: 3,
    name: "La Emperatriz",
    keywords: ["Fertilidad", "Creatividad", "Abundancia"],
    meaning: "La madre divina, la creatividad y la abundancia. Representa la conexión con la naturaleza y el poder creativo femenino.",
    reversed: "Bloqueos creativos, dependencia excesiva, sobreprotección"
  },
  {
    number: 4,
    name: "El Emperador",
    keywords: ["Autoridad", "Estructura", "Liderazgo"],
    meaning: "El poder masculino, la autoridad y el liderazgo. Representa la estructura, el orden y el control sobre el mundo material.",
    reversed: "Abuso de autoridad, rigidez excesiva, tiranía"
  },
  {
    number: 5,
    name: "El Hierofante",
    keywords: ["Tradición", "Espiritualidad", "Enseñanza"],
    meaning: "El maestro espiritual y las tradiciones. Representa la sabiduría institucional, la guía espiritual y las creencias establecidas.",
    reversed: "Dogmatismo, rigidez, rebelión contra las tradiciones"
  },
  {
    number: 6,
    name: "Los Enamorados",
    keywords: ["Amor", "Elección", "Unión"],
    meaning: "El amor verdadero y las decisiones importantes. Representa las relaciones, las elecciones morales y la armonía.",
    reversed: "Desharmonía, malas decisiones, problemas en relaciones"
  },
  {
    number: 7,
    name: "El Carro",
    keywords: ["Determinación", "Victoria", "Control"],
    meaning: "La victoria a través de la determinación y el autocontrol. Representa el triunfo sobre los obstáculos mediante la voluntad.",
    reversed: "Falta de control, derrotas, direcciones opuestas"
  },
  {
    number: 8,
    name: "La Justicia",
    keywords: ["Equilibrio", "Justicia", "Karma"],
    meaning: "El equilibrio, la justicia y la ley del karma. Representa las consecuencias de nuestras acciones y la búsqueda de la verdad.",
    reversed: "Injusticia, desequilibrio, evitar responsabilidades"
  },
  {
    number: 9,
    name: "El Ermitaño",
    keywords: ["Introspección", "Sabiduría", "Guía interior"],
    meaning: "La búsqueda interior de la sabiduría. Representa la introspección, la soledad constructiva y la guía espiritual.",
    reversed: "Aislamiento excesivo, rechazo de ayuda, perderse en uno mismo"
  },
  {
    number: 10,
    name: "La Rueda de la Fortuna",
    keywords: ["Destino", "Cambios", "Ciclos"],
    meaning: "Los ciclos del destino y los cambios inevitables. Representa que todo cambia y que debemos adaptarnos a los ciclos de la vida.",
    reversed: "Mala suerte, resistencia al cambio, victimismo"
  },
  {
    number: 11,
    name: "La Fuerza",
    keywords: ["Fuerza interior", "Coraje", "Compasión"],
    meaning: "La fuerza interior y el coraje compasivo. Representa dominar nuestros instintos a través del amor y la paciencia.",
    reversed: "Debilidad, falta de autocontrol, agresividad"
  },
  {
    number: 12,
    name: "El Colgado",
    keywords: ["Sacrificio", "Pausa", "Nueva perspectiva"],
    meaning: "El sacrificio consciente y la nueva perspectiva. Representa la necesidad de parar, reflexionar y ver las cosas desde otro ángulo.",
    reversed: "Retrasos innecesarios, victimismo, resistencia a cambiar"
  },
  {
    number: 13,
    name: "La Muerte",
    keywords: ["Transformación", "Final", "Renacimiento"],
    meaning: "La transformación y el renacimiento. Representa el final de una etapa y el comienzo de algo nuevo. No es muerte literal.",
    reversed: "Resistencia al cambio, estancamiento, miedo a lo nuevo"
  },
  {
    number: 14,
    name: "La Templanza",
    keywords: ["Equilibrio", "Moderación", "Paciencia"],
    meaning: "El equilibrio y la moderación. Representa la paciencia, la sanación y la capacidad de combinar elementos opuestos armoniosamente.",
    reversed: "Desequilibrio, excesos, impaciencia"
  },
  {
    number: 15,
    name: "El Diablo",
    keywords: ["Tentación", "Materialismo", "Limitaciones"],
    meaning: "Las tentaciones y las limitaciones autoimpuestas. Representa las cadenas mentales, los miedos y los apegos materiales.",
    reversed: "Liberación de ataduras, superación de tentaciones, autodescubrimiento"
  },
  {
    number: 16,
    name: "La Torre",
    keywords: ["Revelación", "Cambio súbito", "Liberación"],
    meaning: "La revelación súbita y los cambios drásticos. Representa la destrucción de estructuras falsas para dar paso a la verdad.",
    reversed: "Evitar cambios necesarios, revelaciones retrasadas, resistencia"
  },
  {
    number: 17,
    name: "La Estrella",
    keywords: ["Esperanza", "Inspiración", "Renovación"],
    meaning: "La esperanza y la inspiración. Representa la renovación espiritual, la fe en el futuro y la conexión con lo divino.",
    reversed: "Desesperanza, falta de fe, desconexión espiritual"
  },
  {
    number: 18,
    name: "La Luna",
    keywords: ["Ilusión", "Intuición", "Miedos"],
    meaning: "Las ilusiones y los miedos inconscientes. Representa la confusión, los engaños y la necesidad de confiar en la intuición.",
    reversed: "Claridad mental, superación de miedos, verdad revelada"
  },
  {
    number: 19,
    name: "El Sol",
    keywords: ["Alegría", "Éxito", "Vitalidad"],
    meaning: "La alegría y el éxito. Representa la vitalidad, la felicidad, el optimismo y el logro de objetivos importantes.",
    reversed: "Falta de energía, retrasos en el éxito, pesimismo"
  },
  {
    number: 20,
    name: "El Juicio",
    keywords: ["Renovación", "Perdón", "Despertar"],
    meaning: "El despertar espiritual y la renovación. Representa el perdón, la segunda oportunidad y el llamado a un propósito superior.",
    reversed: "Juicios duros, falta de perdón, perderse llamados importantes"
  },
  {
    number: 21,
    name: "El Mundo",
    keywords: ["Completitud", "Realización", "Éxito"],
    meaning: "La completitud y la realización total. Representa el éxito, el cumplimiento de objetivos y la armonía con el universo.",
    reversed: "Falta de cierre, objetivos incompletos, búsqueda continua"
  }
];

export default function ArcanosMayoresSignificado() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 text-amber-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-300 mb-6 font-cinzel">
            Los 22 Arcanos Mayores del Tarot
          </h1>
          <p className="text-lg text-violet-200 mb-8 max-w-3xl mx-auto">
            Descubre el significado profundo de cada uno de los 22 Arcanos Mayores, 
            las cartas más poderosas del tarot que representan el viaje del alma 
            desde la inocencia hasta la iluminación.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/consulta-tarot-gratis" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              🔮 Consulta con Arcanos Mayores
            </Link>
            <Link href="/blog/como-leer-cartas-tarot-principiantes" className="border-2 border-violet-400 hover:bg-violet-400 hover:text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors">
              📚 Aprender a Leer Tarot
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/50 p-8 rounded-lg border border-violet-600 mb-12">
          <h2 className="text-2xl font-bold text-violet-300 mb-4">El Viaje del Alma</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-violet-200 mb-4">
                Los Arcanos Mayores representan el "Viaje del Loco", un camino espiritual 
                que va desde la inocencia inicial (El Loco) hasta la realización completa (El Mundo). 
                Cada carta simboliza una etapa importante en el desarrollo personal y espiritual.
              </p>
              <p className="text-violet-200">
                Estas 22 cartas contienen los arquetipos universales que Carl Jung identificó 
                en el inconsciente colectivo, haciendo del tarot una herramienta poderosa 
                para el autoconocimiento y la orientación espiritual.
              </p>
            </div>
            <div className="bg-violet-900/30 p-6 rounded">
              <h3 className="text-lg font-bold text-violet-300 mb-3">Características de los Arcanos Mayores:</h3>
              <ul className="text-violet-200 space-y-2 text-sm">
                <li>• Representan experiencias universales</li>
                <li>• Indican eventos importantes o lecciones de vida</li>
                <li>• Tienen mayor peso que los Arcanos Menores</li>
                <li>• Están numerados del 0 al 21</li>
                <li>• Cada uno tiene simbolismo profundo y múltiples capas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Major Arcana Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            Significado de Cada Arcano Mayor
          </h2>
          
          <div className="space-y-8">
            {majorArcana.map((card, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-violet-600 hover:border-violet-400 transition-colors">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  
                  {/* Card Number and Name */}
                  <div className="md:col-span-3 text-center">
                    <div className="text-4xl font-bold text-violet-300 mb-2">
                      {card.number === 0 ? "0" : card.number}
                    </div>
                    <h3 className="text-xl font-bold text-violet-300 mb-3">{card.name}</h3>
                    
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {card.keywords.map((keyword, i) => (
                        <span key={i} className="bg-violet-900/50 text-violet-200 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card Meaning */}
                  <div className="md:col-span-9">
                    <div className="grid md:grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-bold text-violet-300 mb-2">Significado Derecho:</h4>
                        <p className="text-violet-200 text-sm mb-4">{card.meaning}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-violet-300 mb-2">Significado Invertido:</h4>
                        <p className="text-violet-200 text-sm">{card.reversed}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Fool's Journey */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            El Viaje del Loco: Las Tres Etapas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-4">Primera Etapa: Despertar</h3>
              <p className="text-violet-200 text-sm mb-4">
                <strong>Cartas 0-7:</strong> El viaje comienza con la inocencia del Loco y 
                se desarrolla a través del aprendizaje de las lecciones básicas de la vida.
              </p>
              <ul className="text-violet-200 space-y-1 text-xs">
                <li>• El Loco: Nuevos comienzos</li>
                <li>• El Mago: Manifestación</li>
                <li>• La Sacerdotisa: Intuición</li>
                <li>• La Emperatriz: Creatividad</li>
                <li>• El Emperador: Autoridad</li>
                <li>• El Hierofante: Tradición</li>
                <li>• Los Enamorados: Elección</li>
                <li>• El Carro: Victoria</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-4">Segunda Etapa: Desarrollo</h3>
              <p className="text-violet-200 text-sm mb-4">
                <strong>Cartas 8-14:</strong> El alma enfrenta desafíos más profundos y 
                aprende lecciones de equilibrio, sacrificio y transformación.
              </p>
              <ul className="text-violet-200 space-y-1 text-xs">
                <li>• La Justicia: Equilibrio</li>
                <li>• El Ermitaño: Búsqueda interior</li>
                <li>• La Rueda: Cambios</li>
                <li>• La Fuerza: Dominio interior</li>
                <li>• El Colgado: Sacrificio</li>
                <li>• La Muerte: Transformación</li>
                <li>• La Templanza: Moderación</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-4">Tercera Etapa: Iluminación</h3>
              <p className="text-violet-200 text-sm mb-4">
                <strong>Cartas 15-21:</strong> El alma enfrenta sus sombras más profundas 
                y emerge hacia la iluminación y la completitud final.
              </p>
              <ul className="text-violet-200 space-y-1 text-xs">
                <li>• El Diablo: Tentaciones</li>
                <li>• La Torre: Revelación</li>
                <li>• La Estrella: Esperanza</li>
                <li>• La Luna: Ilusiones</li>
                <li>• El Sol: Iluminación</li>
                <li>• El Juicio: Renovación</li>
                <li>• El Mundo: Completitud</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interpretation Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            Consejos para Interpretar los Arcanos Mayores
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-4">🎯 En Lecturas Generales</h3>
              <ul className="text-violet-200 space-y-3 text-sm">
                <li><strong>Eventos importantes:</strong> Los Arcanos Mayores suelen indicar situaciones significativas que marcarán la vida del consultante.</li>
                <li><strong>Lecciones de vida:</strong> Cada carta representa una lección que el alma necesita aprender en su evolución.</li>
                <li><strong>Fuerzas mayores:</strong> Indican influencias que están más allá del control directo del consultante.</li>
                <li><strong>Timing:</strong> Sugieren eventos que ocurrirán en los próximos meses o que ya están en proceso.</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-4">💫 Combinaciones Especiales</h3>
              <ul className="text-violet-200 space-y-3 text-sm">
                <li><strong>Múltiples Arcanos:</strong> Tres o más Arcanos Mayores indican un período de gran significado espiritual.</li>
                <li><strong>Secuencia numérica:</strong> Cartas consecutivas (ej: 5-6-7) sugieren un proceso de desarrollo natural.</li>
                <li><strong>Polaridades:</strong> Cartas opuestas (ej: Sol/Luna) indican necesidad de equilibrio.</li>
                <li><strong>Elementos repetidos:</strong> Presta atención a símbolos que se repiten entre las cartas.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Symbolism Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            Simbolismo Universal en los Arcanos Mayores
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-800 to-orange-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-lg font-bold text-red-300 mb-3">Elemento Fuego</h3>
              <p className="text-red-200 text-sm">
                El Mago, El Sol: Energía, pasión, acción, voluntad, transformación espiritual
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-800 to-cyan-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🌊</div>
              <h3 className="text-lg font-bold text-blue-300 mb-3">Elemento Agua</h3>
              <p className="text-blue-200 text-sm">
                La Sacerdotisa, La Luna: Intuición, emociones, subconsciente, fluidez
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-800 to-green-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Elemento Tierra</h3>
              <p className="text-yellow-200 text-sm">
                El Emperador, El Mundo: Materialización, estabilidad, logros tangibles
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-slate-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">💨</div>
              <h3 className="text-lg font-bold text-gray-300 mb-3">Elemento Aire</h3>
              <p className="text-gray-200 text-sm">
                El Loco, La Justicia: Pensamiento, comunicación, nuevas ideas, claridad mental
              </p>
            </div>
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            Preguntas Frecuentes sobre los Arcanos Mayores
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-3">¿Qué significa cuando salen muchos Arcanos Mayores?</h3>
              <p className="text-violet-200">
                Cuando aparecen múltiples Arcanos Mayores en una lectura, indica que el consultante 
                está atravesando un período de gran significado espiritual y crecimiento personal. 
                Las fuerzas del destino están muy activas en su vida.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-3">¿Los Arcanos Mayores predicen el futuro fijo?</h3>
              <p className="text-violet-200">
                No. Los Arcanos Mayores muestran las energías y tendencias actuales, y los posibles 
                resultados si continúas en el camino actual. Siempre tienes libre albedrío para 
                cambiar tu rumbo y crear un futuro diferente.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-violet-600">
              <h3 className="text-xl font-bold text-violet-300 mb-3">¿Hay cartas "buenas" y "malas" en los Arcanos Mayores?</h3>
              <p className="text-violet-200">
                Cada Arcano Mayor tiene aspectos positivos y desafiantes. Incluso cartas como 
                La Muerte o El Diablo traen oportunidades de crecimiento y liberación. 
                Lo importante es entender el mensaje y la lección que cada carta ofrece.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-violet-300 mb-8 text-center">
            Profundiza tu Conocimiento
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/como-leer-cartas-tarot-principiantes" className="bg-slate-800/50 p-6 rounded-lg border border-violet-600 hover:border-violet-400 transition-colors block">
              <h3 className="text-lg font-bold text-violet-300 mb-2">Guía para Principiantes</h3>
              <p className="text-violet-200 text-sm">Aprende a leer las cartas paso a paso</p>
            </Link>
            <Link href="/guias/como-interpretar-tarot" className="bg-slate-800/50 p-6 rounded-lg border border-violet-600 hover:border-violet-400 transition-colors block">
              <h3 className="text-lg font-bold text-violet-300 mb-2">Técnicas de Interpretación</h3>
              <p className="text-violet-200 text-sm">Métodos avanzados para lecturas profundas</p>
            </Link>
            <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-violet-600 hover:border-violet-400 transition-colors block">
              <h3 className="text-lg font-bold text-violet-300 mb-2">Práctica Gratuita</h3>
              <p className="text-violet-200 text-sm">Haz lecturas reales con Arcanos Mayores</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-violet-800 to-purple-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-violet-300 mb-4">
            Conecta con la Sabiduría de los Arcanos
          </h2>
          <p className="text-xl text-violet-200 mb-6">
            Experimenta el poder de los Arcanos Mayores en tu propia vida. 
            Inicia tu consulta gratuita ahora.
          </p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
          >
            🔮 Consultar Arcanos Mayores Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}
