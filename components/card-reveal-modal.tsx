import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import './CardRevealModal.css';

// Cambia el elemento raíz para accesibilidad y compatibilidad Next.js
Modal.setAppElement('body');

interface Card {
  id: string;
  name: string;
  type: string;
  orientation?: string;
  image_url?: string;
}

export default function CardRevealModal({ card, reading, cardIndex, totalCards, onNext, onPrev, onClose, selectedCards }: { card: Card; reading: string; cardIndex: number; totalCards: number; onNext: () => void; onPrev: () => void; onClose: () => void; selectedCards: Card[] }) {
  const orientation = card.orientation || 'upright';
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedTop, setFlippedTop] = useState(Array(totalCards).fill(false));


  useEffect(() => {
    setIsFlipped(false);
    // Reset flippedTop for all except las ya reveladas
    setFlippedTop((prev) => prev.map((_, idx) => idx < cardIndex));
    const flipTimer = setTimeout(() => setIsFlipped(true), 700);
    // Flip la carta de arriba después de 1s de la principal
    let topFlipTimer: NodeJS.Timeout | null = null;
    if (cardIndex >= 0) {
      topFlipTimer = setTimeout(() => {
        setFlippedTop((prev) => prev.map((v, idx) => idx === cardIndex ? true : v));
      }, 1700);
    }
    return () => {
      clearTimeout(flipTimer);
      if (topFlipTimer) clearTimeout(topFlipTimer);
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
      <div className="card-reveal-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {/* Espaldas de las cartas seleccionadas */}
          <div className="flex flex-row items-center justify-center gap-4 mb-6">
            {Array.from({ length: totalCards }).map((_, idx) => {
              const isCurrent = idx === cardIndex;
              let showFront = false;
              if (flippedTop[idx]) showFront = true;
              const url = showFront
                ? (selectedCards && selectedCards[idx] && selectedCards[idx].card.image_url
                    ? selectedCards[idx].image_url
                    : undefined)
                : "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png";
              return (
                <div
                  key={idx}
                  className={`w-16 h-24 md:w-20 md:h-28 rounded-md border-2 border-amber-500/50 bg-cover bg-center transition-all duration-300 ${isCurrent ? 'ring-4 ring-amber-400 scale-110 z-10' : 'opacity-70'}`}
                  style={{
                    backgroundImage: url ? `url('${url}')` : undefined,
                    backgroundColor: showFront ? '#1e293b' : '#4c1d95',
                    transform: selectedCards && selectedCards[idx] && selectedCards[idx].orientation === 'reversed' && showFront ? 'rotate(180deg)' : undefined,
                  }}
                />
              );
            })}
          </div>
          {/* Card flip animation: solo una carta, primero la espalda, luego el frente */}
          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              className="relative w-40 h-64 md:w-48 md:h-72 preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1 }}
            >
              {/* Card back */}
              <div
                className="absolute w-full h-full backface-hidden rounded-lg border-2 border-amber-500 overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png')", backgroundColor: '#4c1d95' }}
              />
              {/* Card front */}
              <div
                className="absolute w-full h-full backface-hidden rounded-lg border-2 border-amber-500 overflow-hidden bg-cover bg-center flex flex-col items-center justify-end p-2"
                style={{
                  backgroundImage: card.image_url ? `url('${card.image_url}')` : `url('/tarot-cards/${card.id}.jpg')`,
                  backgroundColor: '#1e293b',
                  transform: 'rotateY(180deg)' + (orientation === 'reversed' ? ' rotate(180deg)' : ''),
                }}
              >
                <div className="bg-black/70 text-amber-300 text-sm w-full text-center rounded py-1 font-medium flex flex-col items-center">
                  <span>{card.name}</span>
                  <span className="text-xs text-purple-300 mt-1">{orientation === 'reversed' ? 'Invertida' : 'Al derecho'}</span>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Interpretación */}
          <div className="w-full max-w-xl mx-auto mt-4">
            <h2 className="text-2xl font-bold text-amber-300 mb-3 text-center">{card.name}</h2>
            <p className="text-purple-200 mb-4 text-sm text-center">
              {card.type === 'major' ? 'Arcano Mayor' : 'Arcano Menor'} · {orientation === 'reversed' ? 'Invertida' : 'Al derecho'}
            </p>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 whitespace-pre-line text-center">{reading}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-purple-500/30 flex justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={cardIndex === 0}
            className="border-purple-500/50 text-purple-200"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button onClick={onNext} className="bg-purple-700 hover:bg-purple-600 text-white">
            {cardIndex < totalCards - 1 ? (
              <>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              'Completar lectura'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}