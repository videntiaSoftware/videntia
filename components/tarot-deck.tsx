"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const displayedDeck = deck.slice(0, 22)

  // Un solo estado de animación: las cartas siempre están en su posición final (abanico/fila)
  // Mezcla: animación de "shuffle" (pequeño movimiento) al montar
  // Selección: animación de elevación y overlay

  // Posición de cada carta en 3 filas de 7 cartas (21 cartas, la 22 va centrada abajo)
  function getCardPosition(i: number, total: number, isMobile: boolean) {
    // 3 filas de 7 cartas, la última (22) centrada abajo
    let row = Math.floor(i / 7);
    let col = i % 7;
    let x = 0, y = 0, rotate = 0;
    // Ajuste: spacing más chico en mobile
    const cardSpacingX = isMobile ? 38 : 90;
    const cardSpacingY = isMobile ? 62 : 130;
    if (i < 21) {
      // 3 filas de 7
      const totalWidth = 6 * cardSpacingX;
      x = (col * cardSpacingX) - totalWidth / 2;
      y = (row - 1) * cardSpacingY;
      rotate = (col - 3) * (isMobile ? 3.5 : 6);
    } else {
      // la carta 22 va centrada abajo
      x = 0;
      y = 2 * cardSpacingY;
      rotate = 0;
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
      setIsStacked(true); // Inicialmente mostrar mazo apilado
      setShuffleAnimations(true);
      // Después de un tiempo, cambiar a abanico
      const timer1 = setTimeout(() => {
        setIsStacked(false);
      }, 1500);
      // Después, cambiar al estado de selección
      const timer2 = setTimeout(() => {
        setShuffleAnimations(false);
        setFlowState('selection');
      }, 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
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

  // Renderizado principal
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[60vh] max-h-[90vh] overflow-visible">
      {/* FASE 1: FORMULARIO INICIAL */}
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
            className="w-full p-3 mb-4 rounded-lg bg-slate-800/70 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            onClick={() => {
              if (userQuestion.trim()) {
                setFlowState('shuffling');
              }
            }}
            disabled={!userQuestion.trim()}
            className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold shadow-lg font-cinzel text-lg transition-colors duration-300"
          >
            Mezclar Cartas
          </button>
        </motion.div>
      )}
      {/* Mazo apilado y animación de transición a abanico */}
      {(flowState === 'initial' || flowState === 'shuffling' || flowState === 'selection') && (
        <div
          ref={containerRef}
          className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-2xl h-[340px] sm:h-[420px] md:h-[520px] mx-auto pointer-events-none select-none"
          style={{ minHeight: '260px', transform: typeof window !== 'undefined' && window.innerWidth < 640 ? 'translateX(-44px)' : undefined }}
        >
          {displayedDeck.map((card, i) => {
            let x = 0, y = 0, rotate = i * 2 - 20;
            // Aumentar tamaño de cartas
            let scale = 1.8 - i * 0.018; // antes 1.6
            let showBack = true;
            let animateProps = {};
            if (flowState === 'shuffling') {
              // Animación "explosiva": cada carta se va a una posición aleatoria fuera del viewport
              const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
              const vh = typeof window !== 'undefined' ? window.innerHeight : 600;
              const randX = (Math.random() - 0.5) * vw * 1.5;
              const randY = (Math.random() - 0.5) * vh * 1.5;
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
