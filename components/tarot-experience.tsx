"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Shuffle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotDeck, { Card as TarotDeckCard } from "./tarot-deck";
import TarotReading from "./tarot-reading";
import CardRevealModal from "./card-reveal-modal";
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

export default function TarotExperience() {
  const [question, setQuestion] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [deck, setDeck] = useState<TarotDeckCard[]>([]);
  const [readingData, setReadingData] = useState<ReadingResponse | null>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [readingType, setReadingType] = useState("three_card");
  const [deckRevealed, setDeckRevealed] = useState(false);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const questionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("tarot_cards").select("*", { head: false });
      if (!error && data) {
        const deckWithImages = data.map((card: Record<string, unknown>) => ({
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

  // Inicializar fingerprint sólo una vez
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
    const shuffled = [...deck]
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setTimeout(() => {
      setIsShuffling(false);
      setDeckRevealed(true);
    }, 1500);
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
      }, 700);
    }
  };

  interface ReadingResponse {
    question: string;
    cards: Card[];
    [key: string]: any;
  }

  const fetchReading = async (cards: SelectedCard[]): Promise<void> => {
    setLoadingReading(true);
    try {
      // Obtener si el usuario está autenticado
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const isUserAuthenticated = !!userData?.user;
      // Obtener token de reCAPTCHA v3
      let recaptchaToken = '';
      if (!isUserAuthenticated && typeof window !== 'undefined' && (window as any).grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'reading' });
      }
      // Obtener guest_id (fingerprint) si no autenticado
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
      const data: ReadingResponse = await res.json();
      setReadingData(data);
      setShowReading(true);

      // Guardar la lectura en la base de datos
      const insertObj: any = {
        question: data.question,
        reading_type: readingType,
        cards_drawn: data.cards,
        interpretation: data.interpretation,
        created_at: new Date().toISOString(),
      };
      if (userData?.user) {
        insertObj.user_id = userData.user.id;
      } else {
        // Usuario no logueado: generar/obtener guest_id de cookie
        let guestId = localStorage.getItem('guest_id');
        if (!guestId) {
          guestId = crypto.randomUUID();
          localStorage.setItem('guest_id', guestId);
        }
        insertObj.guest_id = guestId;
      }
      await supabase.from("readings").insert([insertObj]);
    } catch (e) {
      alert("Error generando la lectura");
    } finally {
      setLoadingReading(false);
    }
  };

  const resetReading = () => {
    setSelectedCards([]);
    setShowReading(false);
    setQuestion("");
    setReadingData(null);
  };

  const tarotBackUrl =
    "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png";

  // Estado para Speech to Text
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const recognitionTimeout = useRef<NodeJS.Timeout | null>(null);

  // Función para iniciar Speech to Text
  const startSpeechToText = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    let finalTranscript = '';
    setIsRecording(true);
    setRecognitionInstance(recognition);

    // Timeout de 15 segundos
    if (recognitionTimeout.current) clearTimeout(recognitionTimeout.current);
    recognitionTimeout.current = setTimeout(() => {
      recognition.stop();
    }, 15000);

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setQuestion(finalTranscript + interimTranscript);
    };
    recognition.onend = () => {
      setIsRecording(false);
      setRecognitionInstance(null);
      if (recognitionTimeout.current) clearTimeout(recognitionTimeout.current);
    };
    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setRecognitionInstance(null);
      if (recognitionTimeout.current) clearTimeout(recognitionTimeout.current);
      if (event.error !== 'no-speech') {
        alert('Error en el reconocimiento de voz: ' + event.error);
      }
    };
    recognition.start();
  };

  // Función para cancelar Speech to Text
  const cancelSpeechToText = () => {
    if (recognitionInstance) {
      recognitionInstance.abort();
      setIsRecording(false);
      setRecognitionInstance(null);
      if (recognitionTimeout.current) clearTimeout(recognitionTimeout.current);
    }
  };

  return (
    <div>
      <header className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1 text-amber-300 flex items-center justify-center tracking-tight">
          <Sparkles className="h-6 w-6 mr-2 text-amber-300" />
          Tarot Místico AI
        </h1>
        <p className="text-base text-purple-200 italic leading-tight">
          Descubre lo que las cartas tienen para ti
        </p>
      </header>
      {!showReading ? (
        <div className="space-y-8">
          <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-purple-500/30">
            {!(deckRevealed || isShuffling) && (
              <>
                <TarotReading
                  readingType={readingType}
                  onChangeType={setReadingType}
                />
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Input
                      ref={questionRef}
                      type="text"
                      placeholder="¿Qué deseas saber?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className={`w-full bg-slate-700 border-purple-400/30 text-white placeholder:text-slate-400 pr-10 ${isRecording ? 'ring-2 ring-amber-400 border-amber-400 animate-pulse' : ''}`}
                      disabled={isRecording}
                    />
                    <button
                      type="button"
                      aria-label={isRecording ? "Cancelar grabación" : "Hablar"}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 transition-colors ${isRecording ? 'text-amber-400 animate-pulse' : 'text-purple-300 hover:text-amber-300'}`}
                      onClick={() => {
                        if (isRecording) {
                          cancelSpeechToText();
                        } else {
                          startSpeechToText();
                        }
                      }}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    {isRecording && (
                      <button
                        type="button"
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-red-400 font-bold text-xs bg-black/60 px-2 py-1 rounded"
                        onClick={cancelSpeechToText}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                  <Button
                    onClick={shuffleDeck}
                    disabled={isShuffling || question.trim() === ""}
                    className="bg-purple-700 hover:bg-purple-600 text-white"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Mezclar cartas
                  </Button>
                </div>
              </>
            )}
            {(deckRevealed || isShuffling) && (
              <div className="text-center text-purple-200 text-lg font-semibold py-2">
                {READING_TYPE_LAYOUTS[readingType]?.instructions || `Selecciona ${(READING_TYPE_CARD_COUNT[readingType] || 3)} carta${(READING_TYPE_CARD_COUNT[readingType] || 3) > 1 ? 's' : ''} del mazo`}
              </div>
            )}
          </div>
          <TarotDeck
            deck={deck}
            isShuffling={isShuffling}
            selectedCards={selectedCards}
            onSelectCard={selectCard}
            tarotBackUrl={tarotBackUrl}
            deckRevealed={deckRevealed}
          />
          {selectedCards.length > 0 && deckRevealed && (
            <div className="text-center text-purple-200">
              {selectedCards.length < (READING_TYPE_CARD_COUNT[readingType] || 3) ? (
                <p>
                  {READING_TYPE_LAYOUTS[readingType]?.layout && READING_TYPE_LAYOUTS[readingType].layout[selectedCards.length]
                    ? `Selecciona la carta para: ${READING_TYPE_LAYOUTS[readingType].layout[selectedCards.length]}`
                    : `Selecciona ${(READING_TYPE_CARD_COUNT[readingType] || 3) - selectedCards.length} carta${selectedCards.length === (READING_TYPE_CARD_COUNT[readingType] || 3) - 1 ? '' : 's'} más`}
                </p>
              ) : loadingReading ? (
                <p>Preparando tu lectura...</p>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <TarotReading
          readingType={readingType}
          onChangeType={setReadingType}
        />
      )}
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
          {/* Mensaje post-lectura para sugerir login/registro */}
          <div className="mt-8 p-4 bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-lg text-amber-900 dark:text-amber-100 text-center">
            <h4 className="font-semibold mb-1">¿Quieres guardar esta lectura?</h4>
            <p className="text-sm mb-2">Inicia sesión o regístrate para guardar tu historial, acceder a tus tiradas favoritas y recibir recomendaciones personalizadas.</p>
            {/* El AuthButton se muestra en la homepage principal */}
          </div>
        </div>
      )}
    </div>
  );
}
