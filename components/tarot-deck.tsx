"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Card type definition
export interface Card {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  interpretation_reversed?: string;
  interpretation_upright?: string;
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
  const [hoveredCard, setHoveredCard] = useState<Card | null>(null)
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  // Only show a subset of cards in the deck view
  const displayedDeck = deck.slice(0, 12)

  // Reset flipped cards when shuffling
  useEffect(() => {
    if (isShuffling) {
      setFlippedCards([])
    }
  }, [isShuffling])

  // Mostrar solo el mazo apilado si no se ha revelado
  if (!deckRevealed && !isShuffling) {
    return (
      <div className="flex flex-col items-center mt-8">
        <div className="relative w-20 h-32">
          {/* Simulación de cartas apiladas */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-32 rounded-md border-2 border-amber-500/50 bg-cover bg-center"
              style={{
                top: i * 2,
                left: i * 2,
                zIndex: i,
                backgroundImage: `url('${tarotBackUrl || "/tarot-card-back.png"}')`,
                backgroundColor: "#4c1d95",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
        <div className="text-purple-300 text-sm mt-2">El mazo está listo para mezclar</div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-200">
        {isShuffling ? "Mezclando el mazo..." : "Selecciona tres cartas"}
      </h2>

      <div className="relative h-[300px] w-full flex items-center justify-center">
        {isShuffling ? (
          // Shuffling animation
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={`shuffle-${index}`}
                className="w-16 h-24 md:w-20 md:h-28 bg-purple-800 rounded-md border-2 border-amber-500/50"
                initial={{ rotate: 0, scale: 1, x: 0, y: 0 }}
                animate={{
                  rotate: [0, 40, -40, 20, -20, 0],
                  scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                  x: [0, (index % 2 === 0 ? 1 : -1) * 60, (index % 3 === 0 ? 1 : -1) * 80, 0, (index % 2 === 0 ? -1 : 1) * 40, 0],
                  y: [0, (index % 2 === 0 ? -1 : 1) * 40, (index % 3 === 0 ? 1 : -1) * 60, 0, (index % 2 === 0 ? 1 : -1) * 30, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: 1,
                  repeatType: "reverse",
                  delay: index * 0.07,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-cover bg-center rounded-sm" style={{ backgroundImage: `url('${tarotBackUrl || "/tarot-card-back.png"}')` }}></div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Display cards for selection
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {displayedDeck.map((card) => {
              const selected = selectedCards.find((c) => c.card.id === card.id);
              const isSelected = !!selected;
              const isFlipped = flippedCards.includes(card.id);
              const orientation = selected?.orientation || 'upright';
              return (
                <motion.div
                  key={card.id}
                  className={`relative cursor-pointer perspective-500 ${isSelected ? "pointer-events-none" : ""}`}
                  whileHover={isSelected ? {} : { scale: 1.05, y: -5 }}
                  onClick={() => onSelectCard(card)}
                  onMouseEnter={() => setHoveredCard(card)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    boxShadow: isSelected ? "0 0 15px 5px rgba(255, 215, 0, 0.7)" : "none",
                  }}
                  transition={{ duration: 0.3, delay: Math.random() * 0.3 }}
                >
                  {/* Card container with 3D effect */}
                  <div className="relative preserve-3d w-16 h-24 md:w-20 md:h-28">
                    {/* Card back */}
                    <motion.div
                      className="absolute w-full h-full backface-hidden rounded-md border-2 border-amber-500/50 overflow-hidden"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center rounded-sm"
                        style={{
                          backgroundImage: `url('${tarotBackUrl || "/tarot-card-back.png"}')`,
                          backgroundColor: "#4c1d95",
                        }}
                      ></div>
                    </motion.div>

                    {/* Card front */}
                    <motion.div
                      className="absolute w-full h-full backface-hidden rounded-md border-2 border-amber-500/50 overflow-hidden"
                      initial={{ rotateY: -180 }}
                      animate={{ rotateY: isFlipped ? 0 : -180 }}
                      transition={{ duration: 0.6 }}
                      style={orientation === 'reversed' ? { transform: 'rotateY(180deg) rotate(180deg)' } : {}}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center rounded-sm flex flex-col items-center justify-end p-1"
                        style={{
                          backgroundImage: `url('${card.image_url}')`,
                          backgroundColor: "#1e293b",
                          transform: orientation === 'reversed' ? 'rotate(180deg)' : undefined,
                        }}
                      >
                        <div className="bg-black/70 text-amber-300 text-xs w-full text-center rounded py-0.5 font-medium">
                          {card.name}
                          {orientation === 'reversed' && <span className="ml-1">(Invertida)</span>}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute -inset-1 rounded-md border-2 border-amber-400 z-0"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.5)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {hoveredCard && !selectedCards.find((c) => c.card.id === hoveredCard.id) && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm p-2 rounded-md text-center z-20 text-sm text-white">
          Haz clic para seleccionar esta carta
        </div>
      )}

      {/* Add some CSS for 3D effects */}
      <style jsx global>{`
        .perspective-500 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}