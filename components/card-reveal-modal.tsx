import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TypewriterText from './TypewriterText';

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
      className="card-reveal-modal fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 z-40 bg-[url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/assets//fondo.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black before:to-90% before:opacity-90 before:pointer-events-none card-reveal-modal-overlay"
      ariaHideApp={false}
    >
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg min-h-[70vh] p-0 bg-transparent shadow-none">
        <button className="absolute top-6 right-6 text-purple-200 hover:text-white font-cinzel text-3xl z-10 bg-transparent border-none" onClick={onClose}>
          &times;
        </button>
        <motion.div
          className="flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'tween', delay: 0.7 }} // delay para esperar el fade-in del overlay
        >
          <div className="w-full flex flex-col items-center justify-center">
            <motion.div
              className="relative w-44 h-72 md:w-52 md:h-80 mb-8"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 70, damping: 15 }}
            >
              {/* Dorso de la carta */}
              <div
                className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-cover bg-center shadow-2xl"
                style={{ backgroundImage: "url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png')", backgroundColor: '#4c1d95', border: 'none' }}
              />
              {/* Frente de la carta */}
              <div
                className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-cover bg-center flex flex-col items-center justify-end p-2 shadow-2xl"
                style={{
                  backgroundImage: card.image_url ? `url('${card.image_url}')` : `url('/tarot-cards/${card.id}.jpg')`,
                  backgroundColor: '#1e293b',
                  transform: 'rotateY(180deg)' + (orientation === 'reversed' ? ' rotate(180deg)' : ''),
                  border: 'none',
                }}
              />
            </motion.div>
            <h2 className="font-cinzel text-4xl text-purple-100 mb-6 text-center drop-shadow-lg tracking-widest select-none min-h-[2.5em] flex items-center justify-center w-full">
              {card.name}
            </h2>
            <div className="text-center text-purple-300 text-lg mb-2 font-cormorant bg-transparent tracking-wider uppercase select-none min-h-[2em] flex items-center justify-center w-full">
              {layoutLabels && layoutLabels[cardIndex] ? layoutLabels[cardIndex] : ''}
            </div>
            <p className="text-amber-200 mb-5 text-base text-center font-cormorant tracking-widest select-none min-h-[2em] flex items-center justify-center w-full">
              {card.type === 'major' ? 'Arcano Mayor' : 'Arcano Menor'} · {orientation === 'reversed' ? 'Invertida' : 'Al derecho'}
            </p>
            <motion.div
              className="w-full max-w-xl mx-auto mt-2 px-4 min-h-[5.5em] flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showInterpretation ? 1 : 0, y: showInterpretation ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="font-cormorant text-lg text-white/95 text-center leading-relaxed tracking-wide w-full bg-transparent shadow-none px-2 min-h-[4em] flex items-center justify-center">
                <TypewriterText text={reading || 'Sin interpretación.'} speed={28} className="font-cormorant" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="p-0 mt-8 flex justify-between w-full gap-8 min-h-[4em]">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={cardIndex === 0}
            className={`font-cormorant text-lg px-6 py-2 bg-transparent shadow-none hover:bg-purple-900/30 transition-all ${cardIndex === 0 ? 'text-slate-400' : 'text-purple-200 hover:text-white'}`}
            style={{ border: 'none' }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Anterior
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={onNext} 
              className={`font-cormorant text-lg px-8 py-2 shadow-xl transition-all ${cardIndex < totalCards - 1 
                ? 'bg-gradient-to-r from-purple-800 via-amber-700 to-amber-500 hover:from-amber-700 hover:to-purple-800 text-white' 
                : 'bg-gradient-to-r from-green-700 via-green-600 to-green-400 hover:from-green-600 hover:to-green-400 text-white'}`}
              style={{ border: 'none' }}
            >
              {cardIndex < totalCards - 1 ? (
                <>
                  Siguiente carta
                  <ChevronRight className="h-5 w-5 ml-2" />
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