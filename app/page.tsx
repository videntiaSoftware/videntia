"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotDeck from "../components/tarot-deck";
import TarotReading from "../components/tarot-reading";
import CardRevealModal from "@/components/card-reveal-modal";
import { createClient } from "@/lib/supabase/client";

interface Card {
  id: string;
  name: string;
  description: string;
  image_url: string; // URL absoluta de Supabase
  interpretation_reversed?: string; // Optional property for reversed interpretation
  interpretation_upright?: string; // Optional property for upright interpretation
}

interface SelectedCard {
  card: Card;
  orientation: "upright" | "reversed";
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [deck, setDeck] = useState<any[]>([]);
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
        // Asegurarse de que la URL de la imagen sea absoluta
        const deckWithImages = data.map((card: any) => ({
          ...card,
          image_url: card.image_url && !card.image_url.startsWith('http')
            ? `https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck/${card.image_url}`
            : card.image_url
        }));
        setDeck(deckWithImages);
      }
    };
    fetchDeck();
  }, []);

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
    // Shuffle the deck visual only
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

  interface Card {
    id: string;
    name: string;
    description: string;
    image_url: string; // URL absoluta de Supabase
  }

  const selectCard = (card: Card): void => {
    console.log('selectCard called', card);
    if (isShuffling || selectedCards.length >= 3 || showReading) return;
    if (selectedCards.find((c) => c.card.id === card.id)) return;
    // Aleatoriamente al derecho o invertida
    const orientation: "upright" | "reversed" = Math.random() < 0.5 ? "upright" : "reversed";
    const newSelectedCards = [...selectedCards, { card, orientation }];
    setSelectedCards(newSelectedCards);
    console.log('newSelectedCards', newSelectedCards);
    if (newSelectedCards.length === 3) {
      setTimeout(() => {
        setRevealIndex(0);
        fetchReading(newSelectedCards);
      }, 700);
    }
  };

  interface ReadingRequest {
    type: string;
    question: string;
    cards: string[];
  }

  interface ReadingResponse {
    question: string;
    cards: Card[];
    [key: string]: any; // Additional fields if present
  }

  const fetchReading = async (cards: SelectedCard[]): Promise<void> => {
    console.log('fetchReading called', cards);
    setLoadingReading(true);
    try {
      const res = await fetch("/api/reading/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "three_card",
          question,
          cards: cards.map((c) => ({ id: c.card.id, orientation: c.orientation })),
        }),
      });
      const data: ReadingResponse = await res.json();
      setReadingData(data);
      setShowReading(true);
    } catch (e) {
      // Manejo de error simple
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

  // URL de la imagen de la espalda de la carta en Supabase
  const tarotBackUrl =
    "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png";

  // Mostrar CardRevealModal cuando revealIndex no es null
  const handleShowCard = (idx: number) => setRevealIndex(idx);
  const handleCloseModal = () => setRevealIndex(null);
  const handleNext = () => {
    if (revealIndex !== null && revealIndex < selectedCards.length - 1) {
      setRevealIndex(revealIndex + 1);
    } else {
      setRevealIndex(null);
      setShowReading(true); // Mostrar la interpretación final
    }
  };
  const handlePrev = () => setRevealIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-gradient-to-b from-purple-950 to-slate-900 text-white font-sans">
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
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
              {/* Ocultar controles tras mezclar */}
              {!(deckRevealed || isShuffling) && (
                <>
                  <TarotReading
                    readingType={readingType}
                    onChangeType={setReadingType}
                  />
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <Input
                      ref={questionRef}
                      type="text"
                      placeholder="¿Qué deseas saber?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="flex-1 bg-slate-700 border-purple-400/30 text-white placeholder:text-slate-400"
                    />
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
              {/* Instrucción tras mezclar */}
              {(deckRevealed || isShuffling) && (
                <div className="text-center text-purple-200 text-lg font-semibold py-2">
                  Selecciona tres cartas del mazo
                </div>
              )}
            </div>
            <TarotDeck
              deck={deck}
              isShuffling={isShuffling}
              selectedCards={selectedCards}
              onSelectCard={(card: Card) => selectCard(card)}
              tarotBackUrl={tarotBackUrl}
              deckRevealed={deckRevealed}
            />
            {selectedCards.length > 0 && deckRevealed && (
              <div className="text-center text-purple-200">
                {selectedCards.length < 3 ? (
                  <p>
                    Selecciona {3 - selectedCards.length} carta
                    {selectedCards.length === 2 ? "" : "s"} más
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
            }}
            reading={selectedCards[revealIndex].orientation === 'reversed'
              ? selectedCards[revealIndex].card.interpretation_reversed
              : selectedCards[revealIndex].card.interpretation_upright}
            cardIndex={revealIndex}
            totalCards={selectedCards.length}
            selectedCards={selectedCards} // <-- PASAR selectedCards por props
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
                    {" · "}
                    <span className="italic text-purple-300">{c.orientation === 'reversed' ? 'Invertida' : 'Al derecho'}</span>
                    <div className="text-sm text-white/90 mt-1">
                      {c.orientation === 'reversed' ? c.card.interpretation_reversed : c.card.interpretation_upright}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-4 bg-black/40 rounded">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">Conclusión</h3>
              <p className="text-white/90">
                {/* Aquí puedes mostrar la conclusión generada por la IA o un resumen */}
                {readingData?.interpretation || "Esta es la conclusión de la lectura según las cartas seleccionadas."}
              </p>
            </div>
            <Button className="mt-6" onClick={resetReading}>Hacer otra pregunta</Button>
          </div>
        )}
      </div>
    </main>
  );
}
