"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion";

// Card type definition
export interface Card {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  interpretation_reversed?: string;
  interpretation_upright?: string;
  type?: string;
}

interface TarotDeckProps {
  deck: Card[];
  isShuffling: boolean;
  selectedCards: { card: Card; orientation: 'upright' | 'reversed' }[];
  onSelectCard: (card: Card) => void;
  tarotBackUrl?: string;
  deckRevealed?: boolean;
}

export default function TarotDeck({ deck, isShuffling, selectedCards, onSelectCard, tarotBackUrl, deckRevealed }: TarotDeckProps) {
  // FASE 1: NUEVO FLUJO DE ESTADOS
  const [flowState, setFlowState] = useState<'initial' | 'shuffling' | 'selection' | 'finalReading'>('initial');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<Card | null>(null)
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [selectedForReveal, setSelectedForReveal] = useState<Card | null>(null)
  const [revealOrientation, setRevealOrientation] = useState<'upright' | 'reversed'>("upright")
  const [showOverlay, setShowOverlay] = useState(false)
  const [isStacked, setIsStacked] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null)

  // Mostrar las 22 cartas del mazo
  // Las primeras 10 son las seleccionadas, las otras 12 aparecen después de la mezcla
  const [showAllCards, setShowAllCards] = useState(false);
  const displayedDeck = showAllCards ? deck.slice(0, 22) : deck.slice(0, 10);

  // Un solo estado de animación: las cartas siempre están en su posición final (abanico/fila)
  // Mezcla: animación de "shuffle" (pequeño movimiento) al montar
  // Selección: animación de elevación y overlay

  // Posición de cada carta en 3 filas de 7 cartas (21 cartas, la 22 va centrada abajo)
  function getCardPosition(i: number, total: number, isMobile: boolean) {
    // 8 cartas primera fila, 7 segunda, 7 tercera
    let row = 0, col = 0;
    if (i < 8) {
      row = 0; col = i;
    } else if (i < 15) {
      row = 1; col = i - 8;
    } else {
      row = 2; col = i - 15;
    }
    let x = 0, y = 0, rotate = 0;
    const cardSpacingX = isMobile ? 36 : 88;
    const cardSpacingY = isMobile ? 62 : 128;
    if (row === 0) {
      const totalWidth = 7 * cardSpacingX;
      x = (col * cardSpacingX) - totalWidth / 2;
      y = -cardSpacingY;
      rotate = (col - 3.5) * (isMobile ? 3.5 : 6);
    } else if (row === 1) {
      const totalWidth = 6 * cardSpacingX;
      x = (col * cardSpacingX) - totalWidth / 2;
      y = 0;
      rotate = (col - 3) * (isMobile ? 3.5 : 6);
    } else {
      const totalWidth = 6 * cardSpacingX;
      x = (col * cardSpacingX) - totalWidth / 2;
      y = cardSpacingY;
      rotate = (col - 3) * (isMobile ? 3.5 : 6);
    }
    return { x, y, rotate };
  }

  // Revelado de carta: eleva y agranda la carta seleccionada al centro, overlay y muestra interpretación
  function handleCardSelect(card: Card, orientation: 'upright' | 'reversed') {
    if (onSelectCard) {
      onSelectCard(card)
    }
    setSelectedForReveal(card)
    setRevealOrientation(orientation)
    setShowOverlay(true)
    setFlippedCards((prev) => [...prev, card.id])
  }

  function handleCloseReveal() {
    setShowOverlay(false)
    setTimeout(() => {
      setSelectedForReveal(null)
    }, 400)
  }

  // Gestionar la transición entre estados de mazo apilado y desplegado
  useEffect(() => {
    if (flowState === 'shuffling') {
      setIsStacked(true); // Mostrar mazo apilado
      setShuffleAnimations(true);
      // Después de un tiempo, pasar directamente a abanico y mostrar todas las cartas
      const timer = setTimeout(() => {
        setIsStacked(false);
        setShuffleAnimations(false);
        setFlowState('selection');
        setShowAllCards(true);
      }, 1400); // Mezcla más lenta y en una sola etapa
      return () => {
        clearTimeout(timer);
      };
    }
  }, [flowState]);
  
  // Estados para manejar animaciones
  const [shuffleAnimations, setShuffleAnimations] = useState<boolean>(false);
  const [selectionHint, setSelectionHint] = useState<boolean>(false);
  
  // Efecto para la animación de mezcla
  useEffect(() => {
    if (isShuffling) {
      setShuffleAnimations(true);
      const timer = setTimeout(() => {
        setShuffleAnimations(false);
      }, 1500); // Duración de la animación de mezcla
      return () => clearTimeout(timer);
    }
  }, [isShuffling]);
  
  // Efecto para mostrar el hint de selección después de que el mazo se despliega
  useEffect(() => {
    if (deckRevealed && !isShuffling) {
      const timer = setTimeout(() => {
        setSelectionHint(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setSelectionHint(false);
    }
  }, [deckRevealed, isShuffling]);

  // FASE 2.1: Controlar animación de mazo apilado -> mezcla -> abanico
  // Nuevo estado para la animación de transición
  const [deckAnimationStage, setDeckAnimationStage] = useState<'stacked' | 'shuffling' | 'fan'>('stacked');

  // Cuando cambia el flowState a 'shuffling', animar el mazo apilado, luego mezclar, luego abanico
  useEffect(() => {
    if (flowState === 'shuffling') {
      setDeckAnimationStage('stacked');
      setIsStacked(true);
      setShuffleAnimations(false);
      // 1. Mostrar apilado (breve)
      const timer1 = setTimeout(() => {
        setDeckAnimationStage('shuffling');
        setShuffleAnimations(true);
      }, 200); // apilado visible 0.2s (antes 0.3s)
      // 2. Mezcla (animación)
      const timer2 = setTimeout(() => {
        setShuffleAnimations(false);
        setDeckAnimationStage('fan');
        setIsStacked(false);
      }, 900); // mezcla visible 0.7s (antes 1.5s)
      // 3. Pasar a selección
      const timer3 = setTimeout(() => {
        setFlowState('selection');
      }, 1600); // abanico visible 0.7s antes de selección (antes 2.5s)
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [flowState]);
  
  // FASE 2: Mejorar experiencia visual
  // Refinar las animaciones de mezcla y abanico, asegurar cartas grandes y legibles
  // Mejorar la visualización del mazo apilado y abanico para responsividad y estética

  // Ajustes visuales para el mazo apilado (mobile y desktop)
  // (Ya está bien centrado y grande, pero mejoramos el box-shadow y el stacking)
  // Ajustar el spread y radio para que el abanico sea más simétrico y no haga overflow
  // Aumentar el tamaño de las cartas en mobile y desktop
  // Mejorar la legibilidad de los nombres de las cartas

  // --- NUEVO: Instrucciones dinámicas para selección ---
  const selectionLabels = [
    { label: 'Selecciona la primera carta', desc: 'La primera carta representa el pasado.' },
    { label: 'Selecciona la segunda carta', desc: 'La segunda carta representa el presente.' },
    { label: 'Selecciona la tercera carta', desc: 'La tercera carta representa el futuro.' },
  ];

  // Detectar mobile con un hook local
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Instrucciones dinámicas
  const [canShuffle, setCanShuffle] = useState(false);
  useEffect(() => {
    setCanShuffle(!!userQuestion.trim());
  }, [userQuestion]);

  // Instrucciones para cada estado
  let topInstruction = '';
  if (flowState === 'initial') {
    if (!canShuffle) {
      topInstruction = 'Escribe tu pregunta para comenzar.';
    } else {
      topInstruction = 'Toca el mazo para mezclar y elegir tus cartas.';
    }
  } else if (flowState === 'selection') {
    // Ejemplo para 3 cartas, se puede hacer dinámico según layout
    const selectionLabels = [
      { label: 'Selecciona la primera carta', desc: 'La primera carta representa el pasado.' },
      { label: 'Selecciona la segunda carta', desc: 'La segunda carta representa el presente.' },
      { label: 'Selecciona la tercera carta', desc: 'La tercera carta representa el futuro.' },
    ];
    topInstruction = `${selectionLabels[selectedCards.length]?.label || ''} ${selectionLabels[selectedCards.length]?.desc || ''}`;
  }

  // Función para mezclar el mazo y pasar al siguiente paso
  const handleShuffle = () => {
    if (canShuffle && flowState === 'initial') {
      setFlowState('shuffling');
    }
  };

  // Renderizado principal
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[60vh] max-h-[90vh] overflow-visible">
      {/* Instrucción arriba del input, siempre ocupa el mismo espacio para evitar saltos de layout */}
      <div
        className="mb-2 text-center text-lg text-amber-200 flex items-center justify-center"
        style={{ fontFamily: 'Garamond, serif', fontWeight: 500, minHeight: '3.5em' }}
      >
        {topInstruction || '\u00A0'}
      </div>
      {/* Input y botón solo en initial, encima del mazo, nunca duplicados */}
      {flowState === 'initial' && (
        <motion.div 
          className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Escribe tu pregunta al tarot..."
            className="w-full p-3 mb-4 rounded-lg bg-slate-800/70 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-[Garamond] text-lg"
            style={{ fontFamily: 'Garamond, serif' }}
          />
          {/* Solo mostrar el botón en desktop y si hay pregunta */}
          {!isMobile && canShuffle && (
            <button
              onClick={() => setFlowState('shuffling')}
              className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-lg font-cinzel text-lg transition-colors duration-300"
            >
              Mezclar Cartas
            </button>
          )}
        </motion.div>
      )}
      {/* Mazo apilado y animación de transición a abanico */}
      {(flowState === 'initial' || flowState === 'shuffling' || flowState === 'selection') && (
        <div
          ref={containerRef}
          className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-2xl h-[340px] sm:h-[420px] md:h-[520px] mx-auto pointer-events-auto select-none"
          style={{ minHeight: '260px', transform: typeof window !== 'undefined' && window.innerWidth < 640 ? 'translateX(-44px)' : undefined }}
          onClick={handleShuffle}
        >
          {deck.slice(0, showAllCards ? 22 : 10).map((card, i) => {
            let x = 0, y = 0, rotate = i * 2 - 20;
            // Aumentar tamaño de cartas
            let scale = 1.8 - i * 0.018; // antes 1.6
            let showBack = true;
            let animateProps = {};
            if (flowState === 'shuffling') {
              // Animación "explosiva": cada carta se va a una posición aleatoria, pero menos lejos del centro
              const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
              const vh = typeof window !== 'undefined' ? window.innerHeight : 600;
              // Reducir el factor de dispersión de 1.5 a 0.5
              const randX = (Math.random() - 0.5) * vw * 0.5;
              const randY = (Math.random() - 0.5) * vh * 0.5;
              const randRot = (Math.random() - 0.5) * 360;
              animateProps = {
                x: randX,
                y: randY,
                rotate: randRot,
                scale,
                opacity: 1
              };
            } else if (flowState === 'selection') {
              const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : true;
              const pos = getCardPosition(i, displayedDeck.length, isMobile);
              x = pos.x;
              y = pos.y;
              rotate = pos.rotate;
              // Aumentar scale: mobile 0.92, desktop 1.22
              scale = isMobile ? 0.92 : 1.22; // antes 0.82 y 1.1
              showBack = !flippedCards.includes(card.id);
              animateProps = { x, y, rotate, scale, opacity: 1 };
            } else {
              animateProps = {
                x: 0,
                y: 0,
                rotate: i * 2 - 20,
                scale: 1.8 - i * 0.018, // antes 1.6
                opacity: 1
              };
            }
            return (
              <motion.div
                key={card.id}
                className={`absolute left-1/2 top-1/2 w-[96px] h-[154px] md:w-[140px] md:h-[224px] rounded-lg border-2 ${i === 0 ? 'border-amber-500/80' : 'border-amber-500/50'} bg-cover bg-center shadow-xl ${flowState === 'selection' ? 'cursor-pointer pointer-events-auto' : ''}`}
                style={{
                  zIndex: 10 + i,
                  backgroundColor: '#4c1d95',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: i * 2 - 20,
                  scale: 1.8 - i * 0.018, // antes 1.6
                  opacity: 1
                }}
                animate={animateProps}
                transition={{
                  type: 'spring',
                  duration: flowState === 'selection' ? 1.2 : 1.1,
                  delay: flowState === 'selection' ? i * 0.03 : i * 0.01,
                  stiffness: 60,
                  damping: 16
                }}
                onClick={() => flowState === 'selection' && !flippedCards.includes(card.id) && handleCardSelect(card, Math.random() < 0.5 ? 'upright' : 'reversed')}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Siempre mostrar el dorso, salvo que esté volteada */}
                {showBack ? (
                  <div
                    className="w-full h-full bg-cover bg-center rounded-md"
                    style={{
                      backgroundImage: `url('${tarotBackUrl || "/tarot-card-back.png"}')`,
                      backgroundColor: '#4c1d95',
                      width: '100%',
                      height: '100%'
                    }}
                  ></div>
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center rounded-md flex flex-col items-center justify-end p-1"
                    style={{
                      backgroundImage: `url('${card.image_url}')`,
                      backgroundColor: "#1e293b",
                      transform: 'none',
                    }}
                  >
                    <div className="bg-black/80 text-amber-200 text-base w-full text-center rounded py-1 font-semibold shadow-md">
                      {card.name}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
      {/* Instrucciones dinámicas durante la selección */}
      {/* {flowState === 'selection' && selectedCards.length < 3 && (
        <div className="mt-6 text-center">
          <div className="text-xl font-semibold text-amber-200 mb-2" style={{ fontFamily: 'Garamond, serif' }}>{topInstruction}</div>
        </div>
      )} */}
      {/* Cartas seleccionadas abajo, reveladas */}
      {flowState === 'selection' && selectedCards.length > 0 && (
        <div
          className="fixed left-0 right-0 bottom-0 z-40 flex flex-row items-end justify-center gap-2 pb-4 md:pb-8"
          style={{ pointerEvents: 'none', background: 'linear-gradient(to top, rgba(30, 41, 59, 0.92) 60%, transparent 100%)', minHeight: '180px' }}
        >
          {selectedCards.map((sel, idx) => (
            <motion.div
              key={sel.card.id}
              className="w-[72px] h-[116px] md:w-[110px] md:h-[176px] rounded-lg border-2 border-amber-500/80 bg-cover bg-center shadow-xl relative"
              style={{ backgroundImage: `url('${sel.card.image_url}')`, backgroundColor: '#1e293b', pointerEvents: 'auto', zIndex: 100 + idx }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <div className="bg-black/80 text-amber-200 text-base w-full text-center rounded py-1 font-semibold shadow-md">
                {sel.card.name}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* {showOverlay && selectedForReveal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <motion.div
            className="bg-slate-900 rounded-lg p-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="relative w-full h-48 rounded-lg overflow-hidden mb-4"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={selectedForReveal.image_url}
                  alt={selectedForReveal.name}
                  className="w-full h-full object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white text-lg font-semibold text-center">{selectedForReveal.name}</span>
                </motion.div>
              </motion.div>
              <div className="w-full text-center">
                <motion.p
                  className="text-amber-300 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {revealOrientation === 'upright' ? selectedForReveal.interpretation_upright : selectedForReveal.interpretation_reversed}
                </motion.p>
                <motion.button
                  onClick={handleCloseReveal}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Cerrar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )} */}
    </div>
  )
}
