import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TypewriterText from '@/components/TypewriterText';
import Image from 'next/image';

export interface RevealCard {
  id: string;
  name: string;
  type: string;
  orientation?: string;
  image_url?: string;
  interpretation_reversed?: string;
  interpretation_upright?: string;
}

interface StepCardRevealProps {
  cards: { card: RevealCard; orientation: 'upright' | 'reversed' }[];
  readings: string[];
  layoutLabels?: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  instructions?: string; // Nuevo prop para mensaje instructivo
}

export default function StepCardReveal({ cards, readings, layoutLabels, currentIndex, onNext, onPrev, onFinish, instructions }: StepCardRevealProps) {
  const card = cards[currentIndex]?.card;
  const orientation = cards[currentIndex]?.orientation || 'upright';
  const reading = readings[currentIndex] || '';
  const totalCards = cards.length;
  const [isFlipped, setIsFlipped] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [cardKey, setCardKey] = useState(0); // Para forzar remount y animación entre cartas
  const [backLoaded, setBackLoaded] = useState(false);
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [loadingReading, setLoadingReading] = useState(false); // Nuevo estado para controlar la carga de la lectura
  const flipTimeout = useRef<NodeJS.Timeout | null>(null);
  const interpTimeout = useRef<NodeJS.Timeout | null>(null);

  // Preload back image (solo una vez)
  useEffect(() => {
    const img = new window.Image();
    img.src = "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//fondo-card.webp";
    img.onload = () => setBackLoaded(true);
  }, []);

  // Preload front image (de la carta actual) y sincroniza el flip con la carga
  useEffect(() => {
    setFrontLoaded(false);
    if (!card?.image_url) return;
    const img = new window.Image();
    img.src = card.image_url;
    img.onload = () => setFrontLoaded(true);
  }, [card?.image_url]);

  useEffect(() => {
    setIsFlipped(false);
    setShowInterpretation(false);
    setHasMounted(false);
    setCardKey(prev => prev + 1);
    // Solo permitir flip si la espalda y la cara están cargadas
    if (!backLoaded || !frontLoaded) return;
    const mountTimer = setTimeout(() => setHasMounted(true), 10);
    flipTimeout.current = setTimeout(() => setIsFlipped(true), 1300);
    interpTimeout.current = setTimeout(() => setShowInterpretation(true), 2500);
    return () => {
      clearTimeout(mountTimer);
      if (flipTimeout.current) clearTimeout(flipTimeout.current);
      if (interpTimeout.current) clearTimeout(interpTimeout.current);
    };
  }, [currentIndex, backLoaded, frontLoaded]);

  // Handler para click/tap en la carta
  const handleCardClick = () => {
    if (showInterpretation) {
      if (currentIndex < totalCards - 1) onNext();
      else onFinish();
    }
  };

  // El flip debe empezar de ESPALDA (rotateY(180deg)), y al voltear quedar de FRENTE (rotateY(0deg))
  // Animación lenta (2.2s)
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center h-screen max-h-screen overflow-hidden w-full" style={{
      backgroundImage: `url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/assets//fondo-lightweight.webp')`,
      backgroundBlendMode: 'normal',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}>
      {/* Gradiente negro a transparente de abajo hacia arriba */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0) 60%)',
      }} />
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-full max-h-full p-0 bg-transparent shadow-none z-10">
        <div className="w-full flex flex-col items-center justify-center">
          {/* Instructivo personalizado para cada tipo de lectura */}
          {instructions && (
            <div className="mb-2 text-base text-amber-200 text-center font-cormorant px-2 max-w-xl w-full">
              {instructions}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={card?.id || cardKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, type: 'tween' }}
              className="relative w-36 h-60 md:w-44 md:h-72 mb-6 cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={handleCardClick}
              tabIndex={0}
              role="button"
              aria-label="Revelar siguiente carta"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
            >
              <div
                className="absolute w-full h-full"
                style={{
                  transition: 'transform 0.45s cubic-bezier(0.4,0.2,0.2,1)',
                  transformStyle: 'preserve-3d',
                  transform: hasMounted && isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                }}
              >
                {/* Back of card: SIEMPRE visible hasta que termina el flip */}
                <div
                  className="absolute w-full h-full rounded-xl overflow-hidden bg-cover bg-center shadow-2xl flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    backgroundImage: backLoaded ? "url('https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//fondo-card.webp')" : 'none',
                    backgroundColor: '#4c1d95',
                    transform: 'rotateY(180deg)',
                    zIndex: !isFlipped ? 2 : 0,
                    opacity: !isFlipped ? 1 : 0,
                    transition: 'opacity 0.2s linear 2.1s',
                  }}
                />
                {/* Front of card: solo se renderiza si hasMounted, isFlipped, backLoaded y frontLoaded son true */}
                {hasMounted && isFlipped && backLoaded && frontLoaded && (
                  <Image
                    src={card?.image_url || ''}
                    alt={card?.name || 'Carta de tarot'}
                    fill
                    sizes="(max-width: 768px) 100vw, 44vw"
                    className="absolute w-full h-full rounded-xl object-cover shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      backgroundColor: '#1e293b',
                      transform: orientation === 'reversed' ? 'rotateY(0deg) rotate(180deg)' : 'rotateY(0deg)',
                      zIndex: 3,
                    }}
                    quality={30}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzE1MCcgdmlld0JveD0nMCAwIDEwMCAxNTAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTUwJyBmaWxsPSIjMWUyOTNiIi8+PC9zdmc+"
                    priority={false}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          <h2 className="font-cinzel text-3xl text-purple-100 mb-4 text-center drop-shadow-lg tracking-widest select-none min-h-[2em] flex items-center justify-center w-full">
            {card?.name}
          </h2>
          <div className="text-center text-purple-300 text-lg mb-2 font-cormorant bg-transparent tracking-wider uppercase select-none min-h-[2em] flex items-center justify-center w-full">
            {layoutLabels && layoutLabels[currentIndex] ? layoutLabels[currentIndex] : ''}
          </div>
          <p className="text-amber-200 mb-3 text-base text-center font-cormorant tracking-widest select-none min-h-[1.5em] flex items-center justify-center w-full">
            {card?.type === 'major' ? 'Arcano Mayor' : 'Arcano Menor'} · {orientation === 'reversed' ? 'Invertida' : 'Al derecho'}
          </p>
          <div className="w-full max-w-xl mx-auto mt-2 px-4 min-h-[4em] flex items-center justify-center">
            <div className="font-cormorant text-lg text-white/95 text-center leading-relaxed tracking-wide w-full bg-transparent shadow-none px-2 min-h-[4em] flex items-center justify-center">
              {showInterpretation && (
                <TypewriterText text={reading || 'Sin interpretación.'} speed={28} className="font-cormorant" />
              )}
            </div>
          </div>
        </div>
        <div className="p-0 mt-4 flex justify-between w-full gap-8 min-h-[3em]">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`font-cormorant text-lg px-6 py-2 bg-transparent shadow-none hover:bg-purple-900/30 transition-all ${currentIndex === 0 ? 'text-slate-400' : 'text-purple-200 hover:text-white'}`}
            style={{ border: 'none' }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Anterior
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={currentIndex < totalCards - 1 ? onNext : onFinish} 
              className={`font-cormorant text-lg px-8 py-2 shadow-xl transition-all ${currentIndex < totalCards - 1 
                ? 'bg-gradient-to-r from-purple-800 via-amber-700 to-amber-500 hover:from-amber-700 hover:to-purple-800 text-white' 
                : 'bg-gradient-to-r from-green-700 via-green-600 to-green-400 hover:from-green-600 hover:to-green-400 text-white'}`}
              style={{ border: 'none' }}
            >
              {currentIndex < totalCards - 1 ? (
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
      {loadingReading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-400 mb-6"></div>
            <div className="text-2xl text-amber-200 font-cinzel mb-2">Generando tu lectura...</div>
            <div className="text-base text-purple-200 font-cormorant">Por favor espera unos segundos mientras la IA interpreta tus cartas.</div>
          </div>
        </div>
      )}
    </div>
  );
}
