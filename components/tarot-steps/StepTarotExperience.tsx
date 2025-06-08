"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Shuffle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotDeck, { Card as TarotDeckCard } from "@/components/tarot-deck";
import TarotReading from "@/components/tarot-reading";
import StepCardReveal from './StepCardReveal';
import { createClient } from "@/lib/supabase/client";
import ReactMarkdown from 'react-markdown';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AnimatePresence, motion } from 'framer-motion';
import Script from "next/script";

interface Card {
  id: string;
  name: string;
  description: string;
  image_url: string;
  type?: string;
  interpretation_reversed?: string;
  interpretation_upright?: string;
}

interface SelectedCard {
  card: TarotDeckCard;
  orientation: "upright" | "reversed";
}

export default function StepTarotExperience({ readingType }: { readingType: string }) {
  console.log("[StepTarotExperience] Componente montado");
  const [question, setQuestion] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [deck, setDeck] = useState<TarotDeckCard[]>([]);
  const [readingData, setReadingData] = useState<any>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [deckRevealed, setDeckRevealed] = useState(false);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const questionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("tarot_cards").select("*");
      if (!error && data) {
        // Mezclar y tomar 10 para la animación, pero guardar las 22 para la posición final
        const shuffled = data.sort(() => Math.random() - 0.5);
        const deckWithImages = shuffled.map((card: Record<string, unknown>) => ({
          ...card,
          image_url: typeof card.image_url === 'string' && !card.image_url.startsWith('http')
            ? `https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck/${card.image_url}`
            : card.image_url
        }));
        setDeck(deckWithImages as TarotDeckCard[]);
      }
    };
    fetchDeck();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('guest_id')) {
      FingerprintJS.load().then(fp => {
        fp.get().then(result => {
          localStorage.setItem('guest_id', result.visitorId);
        });
      });
    }
  }, []);

  useEffect(() => {
    // Ocultar el badge de reCAPTCHA v3
    const style = document.createElement('style');
    style.innerHTML = `.grecaptcha-badge { visibility: hidden !important; }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const READING_TYPE_CARD_COUNT: Record<string, number> = {
    three_card: 3,
    celtic_cross: 10,
    yes_no: 1,
    love_relationship: 4,
    soulmate: 3,
    life_purpose: 4,
    shadow_work: 3,
  };

  const READING_TYPE_LAYOUTS: Record<string, { label: string; instructions: string; layout: string[] }> = {
    three_card: {
      label: 'Tirada de 3 cartas',
      instructions: 'Selecciona 3 cartas: pasado, presente y futuro.',
      layout: ['Pasado', 'Presente', 'Futuro'],
    },
    celtic_cross: {
      label: 'Cruz Celta',
      instructions: 'Selecciona 10 cartas para la Cruz Celta.',
      layout: [
        'Situación actual', 'Desafío', 'Pasado', 'Futuro', 'Meta', 'Inconsciente', 'Influencia externa', 'Esperanzas', 'Resultado', 'Síntesis'
      ],
    },
    yes_no: {
      label: 'Sí o No',
      instructions: 'Selecciona 1 carta para una respuesta clara.',
      layout: ['Respuesta'],
    },
    love_relationship: {
      label: 'Relación de pareja',
      instructions: 'Selecciona 4 cartas: tú, la otra persona, obstáculos y potencial.',
      layout: ['Tú', 'La otra persona', 'Obstáculos', 'Potencial'],
    },
    soulmate: {
      label: 'Alma gemela',
      instructions: 'Selecciona 3 cartas para explorar la conexión.',
      layout: ['Conexión', 'Bloqueos', 'Camino a sanar'],
    },
    life_purpose: {
      label: 'Propósito de vida',
      instructions: 'Selecciona 4 cartas: dones, misión, bloqueos, próximos pasos.',
      layout: ['Dones', 'Misión', 'Bloqueos', 'Próximos pasos'],
    },
    shadow_work: {
      label: 'Sombras',
      instructions: 'Selecciona 3 cartas: inconsciente, miedo, sanación.',
      layout: ['Inconsciente', 'Miedo', 'Sanación'],
    },
  };

  const shuffleDeck = () => {
    if (question.trim() === "") {
      questionRef.current?.focus();
      return;
    }
    setIsShuffling(true);
    setSelectedCards([]);
    setShowReading(false);
    setReadingData(null);
    setDeckRevealed(false);
    // Mezclar solo las primeras 10 cartas, el resto queda igual
    setDeck((prevDeck) => {
      const first10 = prevDeck.slice(0, 10).sort(() => Math.random() - 0.5);
      const rest = prevDeck.slice(10);
      return [...first10, ...rest];
    });
    setTimeout(() => {
      setIsShuffling(false);
      setDeckRevealed(true);
    }, 900);
  };

  const selectCard = (card: TarotDeckCard): void => {
    console.log("[selectCard] Seleccionando carta", card);
    if (isShuffling || showReading) return;
    if (selectedCards.find((c) => c.card.id === card.id)) return;
    const cardsNeeded = READING_TYPE_CARD_COUNT[readingType] || 3;
    if (selectedCards.length >= cardsNeeded) return;
    const orientation: "upright" | "reversed" = Math.random() < 0.5 ? "upright" : "reversed";
    const newSelectedCards: SelectedCard[] = [...selectedCards, { card, orientation }];
    setSelectedCards(newSelectedCards);
    if (newSelectedCards.length === cardsNeeded) {
      setTimeout(() => {
        console.log("[selectCard] Se seleccionaron todas las cartas, pasando a reveal");
        setRevealIndex(0);
        // fetchReading(newSelectedCards); // <-- Mover esto a onFinish
      }, 1000);
    }
  };

  const fetchReading = async (cards: SelectedCard[]): Promise<void> => {
    console.log("[fetchReading] Ejecutando fetchReading", cards);
    setLoadingReading(true);
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const isUserAuthenticated = !!userData?.user;
      let recaptchaToken = '';
      let recaptchaOk = false;
      if (!isUserAuthenticated && typeof window !== 'undefined' && (window as any).grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'reading' });
          recaptchaOk = typeof recaptchaToken === 'string' && recaptchaToken.length > 0;
          console.log("[fetchReading] reCAPTCHA token generado:", recaptchaToken, "OK:", recaptchaOk);
        } catch (err) {
          console.error("[fetchReading] Error ejecutando grecaptcha:", err);
        }
      } else {
        console.warn("[fetchReading] grecaptcha no está disponible o usuario autenticado");
      }
      let guestId = null;
      if (!isUserAuthenticated && typeof window !== 'undefined') {
        guestId = localStorage.getItem('guest_id') || '';
      }
      // Validar que la pregunta no esté vacía
      if (!question || question.trim() === "") {
        setLoadingReading(false);
        questionRef.current?.focus();
        return;
      }
      // Validar cards y sus propiedades antes del fetch
      if (!Array.isArray(cards) || cards.length === 0) {
        console.error("[fetchReading] Error: cards no es un array válido", cards);
        setLoadingReading(false);
        return;
      }
      for (const [i, c] of cards.entries()) {
        if (!c || !c.card || typeof c.card.id === 'undefined' || typeof c.orientation === 'undefined') {
          console.error(`[fetchReading] Error: card inválida en posición ${i}", c);
          setLoadingReading(false);
          return;
        }
      }
      if (!readingType || typeof readingType !== 'string') {
        console.error("[fetchReading] Error: readingType inválido", readingType);
        setLoadingReading(false);
        return;
      }
      if (!question || typeof question !== 'string') {
        console.error("[fetchReading] Error: question inválida", question);
        setLoadingReading(false);
        return;
      }
      try {
        console.log("[fetchReading] Antes del fetch a /api/reading/generate", {
          type: readingType,
          question: question.trim(),
          cards: cards.map((c) => ({ id: c.card.id, orientation: c.orientation })),
          recaptchaToken,
          recaptchaOk,
          guest_id: guestId,
        });
        const res = await fetch("/api/reading/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: readingType,
            question: question.trim(),
            cards: cards.map((c) => ({ id: c.card.id, orientation: c.orientation })),
            recaptchaToken,
            guest_id: guestId,
          }),
        });
        console.log("[fetchReading] Respuesta recibida de /api/reading/generate", res);
        const data = await res.json();
        console.log("[fetchReading] Data recibida:", data);
        setReadingData(data);
        setShowReading(true);
        // Guardar la lectura en la base de datos
        const insertObj: any = {
          question: data.question,
          reading_type: readingType,
          cards_drawn: data.cards,
          interpretation: data.interpretation,
        };
        if (isUserAuthenticated) {
          await supabase.from("readings").insert([insertObj]);
        }
      } catch (err) {
        console.error("[fetchReading] Error antes/durante el fetch a /api/reading/generate:", err);
      }
    } catch (e) {
      console.error("[fetchReading] Error en fetchReading", e);
    } finally {
      setLoadingReading(false);
    }
  };

  const resetReading = () => {
    setQuestion("");
    setIsShuffling(false);
    setSelectedCards([]);
    setShowReading(false);
    setReadingData(null);
    setDeckRevealed(false);
    setRevealIndex(null);
  };

  // Placeholder para voz
  const startSpeechToText = () => {};
  const cancelSpeechToText = () => {};

  // Obtener título y descripción del tipo de lectura
  const readingTitle = READING_TYPE_LAYOUTS[readingType]?.label || 'Tarot';
  const readingDesc = READING_TYPE_LAYOUTS[readingType]?.instructions || '';

  // Determinar el paso actual
  let currentStep = 'select';
  if (revealIndex !== null && selectedCards[revealIndex]) currentStep = 'reveal';
  else if (showReading) currentStep = 'reading';

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <div className="w-full flex flex-col items-center justify-center mt-12 min-h-screen relative">
        <AnimatePresence mode="wait">
          {currentStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-full flex flex-col items-center justify-center absolute left-0 top-0"
            >
              <h2 className="font-cinzel text-3xl md:text-4xl text-amber-200 mb-2 text-center">
                {readingTitle}
              </h2>
              <div className="text-base md:text-lg text-purple-200 mb-4 text-center" style={{ fontFamily: 'Garamond, serif' }}>
                {readingDesc}
              </div>
              <div className="w-full flex flex-col items-center">
                {revealIndex === null && !showReading && (
                  <TarotDeck
                    deck={deck}
                    isShuffling={isShuffling}
                    selectedCards={selectedCards}
                    onSelectCard={selectCard}
                    tarotBackUrl={"https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png"}
                    deckRevealed={deckRevealed}
                  />
                )}
              </div>
            </motion.div>
          )}
          {currentStep === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute left-0 top-0 w-full min-h-screen flex flex-col items-center justify-center"
            >
              <StepCardReveal
                cards={selectedCards as any}
                readings={selectedCards.map((c) =>
                  c.orientation === 'reversed'
                    ? c.card.interpretation_reversed || 'Sin interpretación.'
                    : c.card.interpretation_upright || 'Sin interpretación.'
                )}
                layoutLabels={READING_TYPE_LAYOUTS[readingType]?.layout}
                currentIndex={revealIndex!}
                onNext={() => {
                  if (revealIndex! < selectedCards.length - 1) {
                    setRevealIndex(revealIndex! + 1);
                  } else {
                    setRevealIndex(null);
                    setShowReading(true);
                  }
                }}
                onPrev={() => setRevealIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                onFinish={() => {
                  console.log("[StepCardReveal] onFinish llamado", selectedCards);
                  setRevealIndex(null);
                  setShowReading(true);
                  fetchReading(selectedCards);
                }}
              />
            </motion.div>
          )}
          {currentStep === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute left-0 top-0 w-full min-h-screen flex flex-col items-center justify-center"
            >
              <div className="mt-8 bg-slate-900/90 rounded-lg p-6 border border-purple-500/30 shadow-xl text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-4 font-cinzel text-center">Interpretación final</h2>
                <div className="mb-4">
                  <p className="text-purple-200 mb-2 font-semibold font-cinzel">Pregunta:</p>
                  <p className="mb-4 font-cormorant text-lg text-amber-100" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>{question}</p>
                  <p className="text-purple-200 mb-2 font-semibold font-cinzel">Cartas seleccionadas:</p>
                  <ul className="mb-4">
                    {selectedCards.map((c, i) => (
                      <li key={c.card.id} className="mb-2">
                        <span className="font-bold text-amber-200 font-cinzel">{c.card.name}</span>
                        {READING_TYPE_LAYOUTS[readingType]?.layout &&
                          <span className="ml-2 text-xs text-purple-300 font-cormorant" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>({READING_TYPE_LAYOUTS[readingType].layout[i]})</span>
                        }
                        {" · "}
                        <span className="italic text-purple-300 font-cormorant" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>{c.orientation === 'reversed' ? 'Invertida' : 'Al derecho'}</span>
                        <div className="text-sm text-white/90 mt-1 font-cormorant" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>
                          {c.orientation === 'reversed' ? c.card.interpretation_reversed || 'Sin interpretación.' : c.card.interpretation_upright || 'Sin interpretación.'}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 p-4 bg-black/40 rounded">
                  <h3 className="text-lg md:text-xl font-semibold text-amber-300 mb-2 font-cinzel">Conclusión</h3>
                  <div className="prose prose-invert max-w-none font-cormorant text-lg" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>
                    <ReactMarkdown>{readingData?.interpretation || "Esta es la conclusión de la lectura según las cartas seleccionadas."}</ReactMarkdown>
                  </div>
                </div>
                <Button className="mt-6" onClick={resetReading}>Hacer otra pregunta</Button>
                <div className="mt-8 p-4 bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-lg text-amber-900 dark:text-amber-100 text-center">
                  <h4 className="font-semibold mb-1 font-cinzel">¿Quieres guardar esta lectura?</h4>
                  <p className="text-sm mb-2 font-cormorant" style={{ fontFamily: 'Cormorant Garamond, Garamond, serif' }}>Inicia sesión o regístrate para guardar tu historial, acceder a tus tiradas favoritas y recibir recomendaciones personalizadas.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}