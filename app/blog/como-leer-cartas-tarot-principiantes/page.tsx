import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Leer las Cartas del Tarot - Guía Completa para Principiantes",
  description: "Aprende a leer las cartas del tarot paso a paso. Guía completa con técnicas, interpretaciones y métodos para principiantes. Domina el arte de la cartomancia.",
  keywords: [
    "como leer cartas tarot", "aprender tarot principiantes", "interpretar cartas tarot",
    "guia lectura tarot", "cartomancia basica", "significado cartas tarot",
    "tiradas tarot principiantes", "como interpretar tarot", "curso tarot basico"
  ],
  openGraph: {
    title: "Cómo Leer las Cartas del Tarot - Guía Completa",
    description: "Domina el arte de leer las cartas del tarot con esta guía paso a paso para principiantes.",
    url: "/blog/como-leer-cartas-tarot-principiantes",
  },
  alternates: {
    canonical: "/blog/como-leer-cartas-tarot-principiantes",
  },
};

export default function ComoLeerCartasTarot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-amber-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-300 mb-6 font-cinzel">
            Cómo Leer las Cartas del Tarot: Guía Completa para Principiantes
          </h1>
          <p className="text-lg text-purple-200 mb-8">
            Domina el arte ancestral de la cartomancia con esta guía paso a paso. 
            Aprende a interpretar las cartas y conectar con su sabiduría milenaria.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/consulta-tarot-gratis" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              🔮 Practica con Lectura Gratis
            </Link>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">Contenido de la Guía</h2>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200">
            <li><a href="#preparacion" className="hover:text-purple-400">1. Preparación para la lectura</a></li>
            <li><a href="#baraja" className="hover:text-purple-400">2. Elegir tu primera baraja</a></li>
            <li><a href="#conexion" className="hover:text-purple-400">3. Conectar con las cartas</a></li>
            <li><a href="#interpretacion" className="hover:text-purple-400">4. Técnicas de interpretación</a></li>
            <li><a href="#tiradas" className="hover:text-purple-400">5. Tiradas básicas</a></li>
            <li><a href="#intuicion" className="hover:text-purple-400">6. Desarrollar la intuición</a></li>
            <li><a href="#errores" className="hover:text-purple-400">7. Errores comunes</a></li>
            <li><a href="#practica" className="hover:text-purple-400">8. Rutina de práctica</a></li>
          </ul>
        </div>

        {/* Section 1: Preparación */}
        <section id="preparacion" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">1. Preparación para la Lectura</h2>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 mb-6">
            <h3 className="text-xl font-bold text-purple-300 mb-4">🕯️ Ambiente Sagrado</h3>
            <p className="text-purple-200 mb-4">
              Crear el ambiente adecuado es fundamental para una lectura exitosa. El espacio debe invitar 
              a la introspección y facilitar la conexión espiritual.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-purple-300 mb-2">Elementos Físicos:</h4>
                <ul className="text-purple-200 space-y-1 text-sm">
                  <li>• Espacio limpio y ordenado</li>
                  <li>• Velas aromáticas o incienso</li>
                  <li>• Tela especial para las cartas</li>
                  <li>• Cristales de protección (opcional)</li>
                  <li>• Música suave o silencio</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-purple-300 mb-2">Preparación Mental:</h4>
                <ul className="text-purple-200 space-y-1 text-sm">
                  <li>• Meditación de 5-10 minutos</li>
                  <li>• Respiración profunda</li>
                  <li>• Intención clara para la lectura</li>
                  <li>• Liberación de expectativas</li>
                  <li>• Apertura a recibir mensajes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Elegir Baraja */}
        <section id="baraja" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">2. Elegir tu Primera Baraja</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🎨 Tarot Tradicional</h3>
              <p className="text-purple-200 mb-4">
                Las barajas clásicas como Rider-Waite o Marsella son ideales para principiantes 
                por su simbolismo claro y abundante literatura de apoyo.
              </p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Simbolismo tradicional</li>
                <li>• Muchos recursos de estudio</li>
                <li>• Interpretaciones establecidas</li>
                <li>• Ideal para aprender</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🌟 Tarot Moderno</h3>
              <p className="text-purple-200 mb-4">
                Las barajas contemporáneas pueden resonar más con principiantes modernos, 
                aunque requieren mayor intuición para su interpretación.
              </p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Diseños actualizados</li>
                <li>• Mayor conexión personal</li>
                <li>• Simbolismo adaptado</li>
                <li>• Menos recursos tradicionales</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-900/50 p-6 rounded-lg border border-indigo-600">
            <h3 className="text-lg font-bold text-indigo-300 mb-3">💡 Consejo del Experto</h3>
            <p className="text-indigo-200 text-sm">
              <strong>Tu primera baraja debe &quot;hablarte&quot;.</strong> Visita una tienda esotérica si es posible 
              y toca diferentes barajas. La que genere una sensación especial será tu compañera ideal. 
              La conexión energética es más importante que las recomendaciones teóricas.
            </p>
          </div>
        </section>

        {/* Section 3: Conexión */}
        <section id="conexion" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">3. Conectar con las Cartas</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 text-center">
              <div className="text-4xl mb-3">🤲</div>
              <h3 className="text-lg font-bold text-purple-300 mb-3">Toque Físico</h3>
              <p className="text-purple-200 text-sm">
                Barajea las cartas diariamente, manéjalas con respeto. Tu energía se 
                impregna en ellas con el tiempo.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 text-center">
              <div className="text-4xl mb-3">🧘</div>
              <h3 className="text-lg font-bold text-purple-300 mb-3">Meditación</h3>
              <p className="text-purple-200 text-sm">
                Medita sosteniendo una carta diferente cada día. Observa qué sensaciones 
                e imágenes surgen.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 text-center">
              <div className="text-4xl mb-3">🌙</div>
              <h3 className="text-lg font-bold text-purple-300 mb-3">Dormir Juntos</h3>
              <p className="text-purple-200 text-sm">
                Guarda las cartas cerca de tu cama las primeras semanas para crear 
                un vínculo energético.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Interpretación */}
        <section id="interpretacion" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">4. Técnicas de Interpretación</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">📖 Método de Lectura por Capas</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">👁️</div>
                  <h4 className="font-bold text-purple-300 mb-2">1. Primera Impresión</h4>
                  <p className="text-purple-200 text-sm">¿Qué sientes al ver la carta?</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-bold text-purple-300 mb-2">2. Símbolos</h4>
                  <p className="text-purple-200 text-sm">Identifica elementos visuales clave</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <h4 className="font-bold text-purple-300 mb-2">3. Significado</h4>
                  <p className="text-purple-200 text-sm">Consulta el significado tradicional</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔮</div>
                  <h4 className="font-bold text-purple-300 mb-2">4. Intuición</h4>
                  <p className="text-purple-200 text-sm">Integra tu percepción personal</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🔄 Cartas Invertidas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-purple-300 mb-2">Interpretaciones Comunes:</h4>
                  <ul className="text-purple-200 space-y-1 text-sm">
                    <li>• Energía bloqueada o retrasada</li>
                    <li>• Aspecto interno vs externo</li>
                    <li>• Resistencia al cambio</li>
                    <li>• Necesidad de reflexión profunda</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-purple-300 mb-2">Para Principiantes:</h4>
                  <p className="text-purple-200 text-sm">
                    Puedes comenzar leyendo todas las cartas en posición derecha hasta 
                    ganar confianza. Las cartas invertidas añaden complejidad que puede 
                    confundir al inicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Tiradas Básicas */}
        <section id="tiradas" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">5. Tiradas Básicas para Principiantes</h2>
          
          <div className="space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🃏 Tirada de 1 Carta - &quot;Carta del Día&quot;</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-purple-300 mb-2">Propósito:</h4>
                  <p className="text-purple-200 mb-3 text-sm">
                    Perfecta para comenzar. Ofrece orientación diaria y ayuda a familiarizarte 
                    con cada carta del mazo.
                  </p>
                  <h4 className="font-bold text-purple-300 mb-2">Preguntas Ideales:</h4>
                  <ul className="text-purple-200 space-y-1 text-sm">
                    <li>• &quot;¿Qué energía necesito hoy?&quot;</li>
                    <li>• &quot;¿En qué debo enfocarme?&quot;</li>
                    <li>• &quot;¿Qué mensaje tengo para hoy?&quot;</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-purple-300 mb-2">Rutina Sugerida:</h4>
                  <ol className="text-purple-200 space-y-1 text-sm">
                    <li>1. Baraja concentrándote en el día</li>
                    <li>2. Haz la pregunta en voz alta</li>
                    <li>3. Saca una carta con intención</li>
                    <li>4. Reflexiona sobre su mensaje</li>
                    <li>5. Al final del día, evalúa cómo se manifestó</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🃏🃏🃏 Tirada de 3 Cartas - &quot;Pasado, Presente, Futuro&quot;</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-purple-300 mb-2">Posición 1: PASADO</h4>
                  <p className="text-purple-200 text-sm">
                    Influencias o eventos pasados que afectan la situación actual
                  </p>
                </div>
                <div className="text-center bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-purple-300 mb-2">Posición 2: PRESENTE</h4>
                  <p className="text-purple-200 text-sm">
                    La situación actual, energías en juego ahora mismo
                  </p>
                </div>
                <div className="text-center bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-purple-300 mb-2">Posición 3: FUTURO</h4>
                  <p className="text-purple-200 text-sm">
                    Resultado probable si continúas en la dirección actual
                  </p>
                </div>
              </div>
              <div className="bg-indigo-900/30 p-4 rounded">
                <h4 className="font-bold text-indigo-300 mb-2">💡 Consejo de Interpretación:</h4>
                <p className="text-indigo-200 text-sm">
                  Lee las cartas como una historia. ¿Cómo se conectan entre sí? 
                  ¿Qué evolución muestran? La carta del presente es la más importante, 
                  ya que es donde tienes poder de acción.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Desarrollar Intuición */}
        <section id="intuicion" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">6. Desarrollar la Intuición</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🌟 Ejercicios Diarios</h3>
              <ul className="space-y-3 text-purple-200">
                <li className="flex gap-3">
                  <span className="text-purple-400">📝</span>
                  <div>
                    <strong>Diario de Cartas:</strong> Registra tu carta diaria y reflexiones. 
                    Revisa después de una semana para ver patrones.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400">👁️</span>
                  <div>
                    <strong>Lectura Ciega:</strong> Mira solo la imagen de una carta por 1 minuto. 
                    Anota todo lo que sientes antes de leer el significado.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400">🎭</span>
                  <div>
                    <strong>Personajes Vivos:</strong> Imagina conversaciones con los personajes 
                    de las cartas. ¿Qué te dirían?
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
              <h3 className="text-xl font-bold text-purple-300 mb-4">🔮 Señales de Progreso</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>✅ Las interpretaciones fluyen más naturalmente</li>
                <li>✅ Conectas símbolos sin consultar manuales</li>
                <li>✅ Sientes cuando una interpretación es correcta</li>
                <li>✅ Las cartas parecen &quot;hablar&quot; contigo</li>
                <li>✅ Tus lecturas resuenan con los consultantes</li>
                <li>✅ Confías más en tus primeras impresiones</li>
              </ul>
              
              <div className="mt-6 p-4 bg-purple-900/30 rounded">
                <h4 className="font-bold text-purple-300 mb-2">⏰ Tiempo de Desarrollo</h4>
                <p className="text-purple-200 text-sm">
                  La intuición se desarrolla gradualmente. Espera sentirte cómodo 
                  después de 3-6 meses de práctica regular. ¡La paciencia es clave!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Errores Comunes */}
        <section id="errores" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">7. Errores Comunes y Cómo Evitarlos</h2>
          
          <div className="space-y-6">
            <div className="bg-red-900/20 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-bold text-red-300 mb-4">❌ Errores de Principiante</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-300 mb-3">Lo que NO hacer:</h4>
                  <ul className="text-red-200 space-y-2 text-sm">
                    <li>• Memorizar significados rígidamente</li>
                    <li>• Hacer múltiples lecturas sobre lo mismo</li>
                    <li>• Leer solo para uno mismo al inicio</li>
                    <li>• Ignorar la intuición por el manual</li>
                    <li>• Esperar predicciones exactas</li>
                    <li>• Temer a las cartas &quot;negativas&quot;</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-300 mb-3">Lo que SÍ hacer:</h4>
                  <ul className="text-green-200 space-y-2 text-sm">
                    <li>• Adaptar significados al contexto</li>
                    <li>• Respetar la primera respuesta</li>
                    <li>• Practicar con amigos comprensivos</li>
                    <li>• Combinar estudio e intuición</li>
                    <li>• Ver las cartas como orientación</li>
                    <li>• Entender que todo carta tiene luz y sombra</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-600">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">⚠️ Advertencias Importantes</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-bold text-yellow-300 mb-2">Dependencia</h4>
                  <p className="text-yellow-200 text-sm">
                    No consultes las cartas para cada decisión pequeña. 
                    Úsalas para orientación en temas importantes.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-2">Obsesión</h4>
                  <p className="text-yellow-200 text-sm">
                    Si no te gusta una respuesta, no hagas otra lectura inmediatamente. 
                    Dale tiempo para manifestarse.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-2">Responsabilidad</h4>
                  <p className="text-yellow-200 text-sm">
                    Nunca des consejos médicos, legales o financieros específicos. 
                    Tu rol es orientar, no decidir por otros.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Rutina de Práctica */}
        <section id="practica" className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">8. Rutina de Práctica Recomendada</h2>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-600">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-4">📅 Primer Mes</h3>
                <ul className="text-purple-200 space-y-2 text-sm">
                  <li>• Carta diaria con diario</li>
                  <li>• Estudiar 2-3 cartas por semana</li>
                  <li>• Meditación con cartas mayores</li>
                  <li>• Lecturas de 1 carta para amigos</li>
                  <li>• No más de 30 min/día</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-4">📅 Segundo Mes</h3>
                <ul className="text-purple-200 space-y-2 text-sm">
                  <li>• Tiradas de 3 cartas semanales</li>
                  <li>• Estudiar palos de arcanos menores</li>
                  <li>• Practicar con diferentes preguntas</li>
                  <li>• Lecturas simples para otros</li>
                  <li>• Conectar cartas en secuencias</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-4">📅 Tercer Mes</h3>
                <ul className="text-purple-200 space-y-2 text-sm">
                  <li>• Tiradas más complejas</li>
                  <li>• Interpretar cartas invertidas</li>
                  <li>• Desarrollar estilo personal</li>
                  <li>• Lecturas para desconocidos</li>
                  <li>• Explorar diferentes mazos</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-green-900/20 border border-green-600 rounded">
              <h3 className="text-lg font-bold text-green-300 mb-3">🎯 Meta a los 3 Meses</h3>
              <p className="text-green-200">
                Deberías sentirte cómodo/a haciendo lecturas básicas, confiando en tu intuición 
                y ofreciendo orientación útil a otros. ¡El verdadero aprendizaje nunca termina!
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">Recursos Adicionales</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/significado-completo-arcanos-mayores" className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-purple-400 transition-colors block">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Significado de Arcanos</h3>
              <p className="text-purple-200 text-sm">Guía completa de todas las cartas del tarot</p>
            </Link>
            <Link href="/guias/como-interpretar-tarot" className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-purple-400 transition-colors block">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Técnicas Avanzadas</h3>
              <p className="text-purple-200 text-sm">Métodos de interpretación profesional</p>
            </Link>
            <Link href="/consulta-tarot-gratis" className="bg-slate-800/50 p-6 rounded-lg border border-purple-600 hover:border-purple-400 transition-colors block">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Practica Gratis</h3>
              <p className="text-purple-200 text-sm">Haz lecturas reales para ganar experiencia</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-800 to-indigo-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">
            Comienza tu Viaje en el Tarot Hoy
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            La mejor manera de aprender es practicando. Empieza con una lectura gratuita.
          </p>
          <Link 
            href="/consulta-tarot-gratis" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
          >
            🔮 Practicar con Lectura Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}
