"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Shuffle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotDeck, { Card as TarotDeckCard } from "@/components/tarot-deck";
import TarotReading from "@/components/tarot-reading";
import CardRevealModal from "@/components/card-reveal-modal";
import { createClient } from "@/lib/supabase/client";
import ReactMarkdown from 'react-markdown';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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
    if (isShuffling || showReading) return;
    if (selectedCards.find((c) => c.card.id === card.id)) return;
    const cardsNeeded = READING_TYPE_CARD_COUNT[readingType] || 3;
    if (selectedCards.length >= cardsNeeded) return;
    const orientation: "upright" | "reversed" = Math.random() < 0.5 ? "upright" : "reversed";
    const newSelectedCards: SelectedCard[] = [...selectedCards, { card, orientation }];
    setSelectedCards(newSelectedCards);
    if (newSelectedCards.length === cardsNeeded) {
      setTimeout(() => {
        setRevealIndex(0);
        fetchReading(newSelectedCards);
      }, 1000); // Espera 1 segundo antes de abrir el modal
    }
  };

  const fetchReading = async (cards: SelectedCard[]): Promise<void> => {
    setLoadingReading(true);
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const isUserAuthenticated = !!userData?.user;
      let recaptchaToken = '';
      if (!isUserAuthenticated && typeof window !== 'undefined' && (window as any).grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'reading' });
      }
      let guestId = null;
      if (!isUserAuthenticated && typeof window !== 'undefined') {
        guestId = localStorage.getItem('guest_id') || '';
      }
      const res = await fetch("/api/reading/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: readingType,
          question,
          cards: cards.map((c) => ({ id: c.card.id, orientation: c.orientation })),
          recaptchaToken,
          guest_id: guestId,
        }),
      });
      const data = await res.json();
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
    } catch (e) {
      // Manejo de error
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

  return (
    <div className="w-full flex flex-col items-center justify-center animate-fade-in-up mt-12">
      <h2 className="font-cinzel text-3xl md:text-4xl text-amber-200 mb-2 text-center">
        {readingTitle}
      </h2>
      <div className="text-base md:text-lg text-purple-200 mb-4 text-center" style={{ fontFamily: 'Garamond, serif' }}>
        {readingDesc}
      </div>
      <div className="w-full flex flex-col items-center">
        {/* Mostrar el mazo y la experiencia solo si no se han revelado todas las cartas */}
        {revealIndex === null && !showReading && (
          <TarotDeck
            deck={deck} // Pasar las 22 cartas para la posición final
            isShuffling={isShuffling}
            selectedCards={selectedCards}
            onSelectCard={selectCard}
            tarotBackUrl={"https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png"}
            deckRevealed={deckRevealed}
          />
        )}
      </div>
      {/* Modal de revelado de carta */}
      {revealIndex !== null && selectedCards[revealIndex] && (
        <CardRevealModal
          card={{
            ...selectedCards[revealIndex].card,
            orientation: selectedCards[revealIndex].orientation,
            type: 'major',
          }}
          reading={selectedCards[revealIndex].orientation === 'reversed'
            ? selectedCards[revealIndex].card.interpretation_reversed || 'Sin interpretación.'
            : selectedCards[revealIndex].card.interpretation_upright || 'Sin interpretación.'}
          cardIndex={revealIndex}
          totalCards={selectedCards.length}
          selectedCards={selectedCards as any}
          onNext={() => {
            if (revealIndex < selectedCards.length - 1) {
              setRevealIndex(revealIndex + 1);
            } else {
              setRevealIndex(null);
              setShowReading(true);
            }
          }}
          onPrev={() => setRevealIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onClose={() => setRevealIndex(null)}
          layoutLabels={READING_TYPE_LAYOUTS[readingType]?.layout}
        />
      )}
      {/* Interpretación final */}
      {showReading && (
        <div className="mt-8 bg-slate-900/90 rounded-lg p-6 border border-purple-500/30 shadow-xl text-white">
          <h2 className="text-2xl font-bold text-amber-300 mb-4">Interpretación final</h2>
          <div className="mb-4">
            <p className="text-purple-200 mb-2 font-semibold">Pregunta:</p>
            <p className="mb-4">{question}</p>
            <p className="text-purple-200 mb-2 font-semibold">Cartas seleccionadas:</p>
            <ul className="mb-4">
              {selectedCards.map((c, i) => (
                <li key={c.card.id} className="mb-2">
                  <span className="font-bold text-amber-200">{c.card.name}</span>
                  {READING_TYPE_LAYOUTS[readingType]?.layout &&
                    <span className="ml-2 text-xs text-purple-300">({READING_TYPE_LAYOUTS[readingType].layout[i]})</span>
                  }
                  {" · "}
                  <span className="italic text-purple-300">{c.orientation === 'reversed' ? 'Invertida' : 'Al derecho'}</span>
                  <div className="text-sm text-white/90 mt-1">
                    {c.orientation === 'reversed' ? c.card.interpretation_reversed || 'Sin interpretación.' : c.card.interpretation_upright || 'Sin interpretación.'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 p-4 bg-black/40 rounded">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">Conclusión</h3>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{readingData?.interpretation || "Esta es la conclusión de la lectura según las cartas seleccionadas."}</ReactMarkdown>
            </div>
          </div>
          <Button className="mt-6" onClick={resetReading}>Hacer otra pregunta</Button>
          <div className="mt-8 p-4 bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-lg text-amber-900 dark:text-amber-100 text-center">
            <h4 className="font-semibold mb-1">¿Quieres guardar esta lectura?</h4>
            <p className="text-sm mb-2">Inicia sesión o regístrate para guardar tu historial, acceder a tus tiradas favoritas y recibir recomendaciones personalizadas.</p>
          </div>
        </div>
      )}
    </div>
  );
}