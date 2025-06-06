import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import './CardRevealModal.css';

// Cambia el elemento raíz para accesibilidad y compatibilidad Next.js
Modal.setAppElement('body');

export interface Card {
  id: string;
  name: string;
  type: string;
  orientation?: string;
  image_url?: string;
  interpretation_reversed?: string;
  interpretation_upright?: string;
}

export interface SelectedCard {
  card: Card;
  orientation: 'upright' | 'reversed';
}

interface CardRevealModalProps {
  card: Card;
  reading: string;
  cardIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  selectedCards: SelectedCard[];
  layoutLabels?: string[]; // NUEVO: etiquetas de posición para cada carta
}

export default function CardRevealModal({ card, reading, cardIndex, totalCards, onNext, onPrev, onClose, selectedCards, layoutLabels }: CardRevealModalProps) {
  const orientation = card.orientation || 'upright';
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedTop, setFlippedTop] = useState(Array(totalCards).fill(false));
  const [showInterpretation, setShowInterpretation] = useState(false);

  useEffect(() => {
    // Reiniciar el estado para la nueva carta
    setIsFlipped(false);
    // Las cartas anteriores ya están volteadas
    setFlippedTop((prev) => prev.map((_, idx) => idx < cardIndex));
    
    // Secuencia de animación mejorada:
    // 1. Esperar 800ms antes de voltear la carta actual (más dramático)
    const flipTimer = setTimeout(() => setIsFlipped(true), 800);
    
    let topFlipTimer: NodeJS.Timeout | null = null;
    let interpretationTimer: NodeJS.Timeout | null = null;
    
    if (cardIndex >= 0) {
      // 2. Actualizar la vista superior de las cartas
      topFlipTimer = setTimeout(() => {
        setFlippedTop((prev) => prev.map((v, idx) => idx === cardIndex ? true : v));
      }, 1800); // tiempo ajustado para mejor ritmo
    }
    
    // 3. Mostrar la interpretación con un retraso para dar tiempo a apreciar la carta
    setShowInterpretation(false);
    interpretationTimer = setTimeout(() => setShowInterpretation(true), 2500);
    
    return () => {
      clearTimeout(flipTimer);
      if (topFlipTimer) clearTimeout(topFlipTimer);
      if (interpretationTimer) clearTimeout(interpretationTimer);
    };
  }, [card, cardIndex, totalCards]);

  return (
    <Modal
      isOpen={!!card}
      onRequestClose={onClose}
      className="card-reveal-modal"
      overlayClassName="card-reveal-modal-overlay"
      ariaHideApp={false}
    >
      <div className="card-reveal-modal-content bg-gradient-to-b from-slate-950/95 to-slate-900/95">
        <button className="close-button text-amber-300 hover:text-amber-200" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {/* Mini-visualización de cartas en la parte superior */}
          <div className="flex flex-row items-center justify-center gap-3 mb-6 pt-2">
            {Array.from({ length: totalCards }).map((_, idx) => {
              const isCurrent = idx === cardIndex;
              let showFront = false;
              if (flippedTop[idx]) showFront = true;
              const url = showFront
                ? (selectedCards && selectedCards[idx] && selectedCards[idx].card.image_url
                    ? selectedCards[idx].card.image_url
                    : undefined)
                : "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png";
              return (
                <div
                  key={idx}
                  className={`w-12 h-20 md:w-16 md:h-24 rounded-md border-2 ${showFront ? 'border-amber-400/80' : 'border-amber-500/30'} bg-cover bg-center transition-all duration-500 
                    ${isCurrent ? 'ring-4 ring-amber-400 scale-115 shadow-[0_0_10px_rgba(251,191,36,0.5)] z-10' : 'opacity-60 hover:opacity-80'}`}
                  style={{
                    backgroundImage: url ? `url('${url}')` : undefined,
                    backgroundColor: showFront ? '#1e293b' : '#4c1d95',
                    transform: selectedCards && selectedCards[idx] && selectedCards[idx].orientation === 'reversed' && showFront ? 'rotate(180deg)' : undefined,
                  }}
                />
              );
            })}
          </div>
          {/* Carta principal con animación de giro */}
          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              className="relative w-44 h-72 md:w-52 md:h-80 preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 70, damping: 15 }}
            >
              {/* Dorso de la carta */}
              <div
                className="absolute w-full h-full backface-hidden rounded-lg border-2 border-amber-500 overflow-hidden bg-cover bg-center shadow-[0_0_15px_5px_rgba(251,191,36,0.25)]"
                style={{ backgroundImage: "url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png')", backgroundColor: '#4c1d95' }}
              />
              {/* Frente de la carta */}
              <div
                className="absolute w-full h-full backface-hidden rounded-lg border-2 border-amber-500 overflow-hidden bg-cover bg-center flex flex-col items-center justify-end p-2 shadow-[0_0_15px_5px_rgba(251,191,36,0.25)]"
                style={{
                  backgroundImage: card.image_url ? `url('${card.image_url}')` : `url('/tarot-cards/${card.id}.jpg')`,
                  backgroundColor: '#1e293b',
                  transform: 'rotateY(180deg)' + (orientation === 'reversed' ? ' rotate(180deg)' : ''),
                }}
              >
                <div className="bg-black/80 backdrop-blur-sm text-amber-300 text-sm w-full text-center rounded py-1 font-medium flex flex-col items-center">
                  <span className="font-bold">{card.name}</span>
                  {/* Mostrar etiqueta de posición si existe */}
                  {layoutLabels && layoutLabels[cardIndex] && (
                    <span className="text-xs text-purple-300 mt-1">{layoutLabels[cardIndex]}</span>
                  )}
                  <span className="text-xs text-purple-300 mt-1">{orientation === 'reversed' ? 'Invertida' : 'Al derecho'}</span>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Interpretación con animación de aparición */}
          {showInterpretation && (
            <motion.div 
              className="w-full max-w-xl mx-auto mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-amber-300 mb-3 text-center">{card.name}</h2>
              {/* Mostrar etiqueta de posición con mejor estilo */}
              {layoutLabels && layoutLabels[cardIndex] && (
                <div className="text-center text-purple-300 text-lg mb-2 font-semibold bg-purple-900/30 py-1 rounded-full">
                  {layoutLabels[cardIndex]}
                </div>
              )}
              <p className="text-amber-200 mb-5 text-sm text-center font-medium">
                {card.type === 'major' ? 'Arcano Mayor' : 'Arcano Menor'} · {orientation === 'reversed' ? 'Invertida' : 'Al derecho'}
              </p>
              <div className="prose prose-invert max-w-none bg-slate-900/70 p-4 rounded-lg border border-purple-500/20">
                <p className="text-white/95 whitespace-pre-line text-center leading-relaxed">{reading || 'Sin interpretación.'}</p>
              </div>
            </motion.div>
          )}
        </div>
        <div className="p-5 mt-4 border-t border-purple-500/30 flex justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={cardIndex === 0}
            className={`border-amber-500/30 ${cardIndex === 0 ? 'text-slate-400' : 'text-amber-200 hover:bg-amber-900/20'}`}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={onNext} 
              className={`${cardIndex < totalCards - 1 
                ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                : 'bg-green-600 hover:bg-green-500 text-white'}`}
            >
              {cardIndex < totalCards - 1 ? (
                <>
                  Siguiente carta
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                'Completar lectura'
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}