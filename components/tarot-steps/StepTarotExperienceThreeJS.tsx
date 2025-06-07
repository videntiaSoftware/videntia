"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Shuffle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotReading from "@/components/tarot-reading";
import CardRevealModal from "@/components/card-reveal-modal";
import { createClient } from "@/lib/supabase/client";
import ReactMarkdown from 'react-markdown';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import * as THREE from 'three';

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
  card: Card;
  orientation: "upright" | "reversed";
}

function Card3D({ textureUrl, position, rotation, onClick, isSelected, isFaceUp, cardName }: {
  textureUrl: string,
  position: [number, number, number],
  rotation: [number, number, number],
  onClick?: () => void,
  isSelected?: boolean,
  isFaceUp?: boolean,
  cardName?: string,
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, setTexture);
  }, [textureUrl]);
  // Animación de giro para mostrar la carta
  const rotY = isFaceUp ? Math.PI : 0;
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      <mesh
        rotation={[0, rotY, 0]}
        scale={isSelected ? [1.35, 1.35, 1] : [1.15, 1.15, 1]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2.2, 3.5]} />
        {texture && <meshBasicMaterial map={texture} attach="material" />}
      </mesh>
    </group>
  );
}

function getFanPositions(deckLength: number, spread = Math.PI / 1.2, radius = 4, row = 0, totalRows = 1): [number, number, number, number][] {
  // Abanico: distribuye las cartas en arco
  // spread: ángulo total del abanico
  // radius: radio del círculo
  // row: índice de la fila (0=centro, -1=arriba, 1=abajo)
  // Devuelve [x, y, z, rotZ]
  const positions: [number, number, number, number][] = [];
  const startAngle = spread / 2; // invertido
  for (let i = 0; i < deckLength; i++) {
    const angle = startAngle - (spread * (i / (deckLength - 1 || 1)));
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * radius * 0.3 + (row - (totalRows - 1) / 2) * 2.0;
    const z = i * 0.01;
    const rotZ = angle + Math.PI; // invertido
    positions.push([x, y, z, rotZ]);
  }
  return positions;
}

function TarotExperience3D({ readingType }: { readingType: string }) {
  const [question, setQuestion] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [readingData, setReadingData] = useState<any>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [deckRevealed, setDeckRevealed] = useState(false);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const questionRef = useRef<HTMLInputElement>(null);
  const tarotBackUrl = "https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/deck//740937b3-dc03-49e3-acbf-1d2da17eddaf.png";
  const [deckState, setDeckState] = useState<'stacked' | 'shuffling' | 'fan'>('stacked');
  const [fanPositions, setFanPositions] = useState<[number, number, number, number][]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

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
        setDeck(deckWithImages as Card[]);
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

  // Mezclar deck y pasar a abanico
  const startShuffle = () => {
    if (question.trim() === "") {
      questionRef.current?.focus();
      return;
    }
    setIsShuffling(true);
    setDeckState('shuffling');
    setSelectedCards([]);
    setShowReading(false);
    setReadingData(null);
    setSelectedIndexes([]);
  };

  // handleShuffleEnd se usará dentro de TarotScene
  const handleShuffleEnd = (shuffledDeck: Card[]) => {
    setDeck(shuffledDeck);
    setIsShuffling(false);
    setDeckState('fan');
    // 3 filas de abanico
    const rows = 3;
    const perRow = Math.ceil(shuffledDeck.length / rows);
    let all: [number, number, number, number][] = [];
    for (let r = 0; r < rows; r++) {
      const start = r * perRow;
      const end = Math.min(start + perRow, shuffledDeck.length);
      const rowFan = getFanPositions(end - start, Math.PI / 1.5, 6, r, rows).map((p, i) => p);
      all = all.concat(rowFan);
    }
    setFanPositions(all);
  };

  // Selección de cartas en abanico
  const selectCard = (idx: number): void => {
    if (isShuffling || showReading) return;
    if (selectedIndexes.includes(idx)) return;
    const cardsNeeded = READING_TYPE_CARD_COUNT[readingType] || 3;
    if (selectedIndexes.length >= cardsNeeded) return;
    const orientation: "upright" | "reversed" = Math.random() < 0.5 ? "upright" : "reversed";
    setSelectedIndexes(prev => [...prev, idx]);
    setSelectedCards(prev => [...prev, { card: deck[idx], orientation }]);
    if (selectedIndexes.length + 1 === cardsNeeded) {
      setTimeout(() => {
        fetchReading([...selectedCards, { card: deck[idx], orientation }]);
      }, 700);
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

  // Renderizado de cartas para selección (después de mezclar)
  function DeckSelectionView() {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {deck.map((card, i) => (
          <div
            key={card.id}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => selectCard(i)}
          >
            <img
              src={card.image_url}
              alt={card.name}
              className="w-20 h-32 object-cover rounded shadow-lg border border-purple-400 bg-slate-900"
            />
          </div>
        ))}
      </div>
    );
  }

  // Renderizado principal Three.js
  function TarotScene() {
    // Estado para posiciones de animación
    const [positions, setPositions] = useState<[number, number, number][]>([]);
    const frameRef = useRef(0);
    // Stacked: todas apiladas
    useEffect(() => {
      if (deckState === 'stacked') {
        setPositions(deck.map((_, i) => [0, 0, i * 0.01]));
      }
    }, [deckState, deck.length]);
    // Mezcla animada
    useEffect(() => {
      if (deckState === 'shuffling') {
        setPositions(deck.map((_, i) => [0, 0, i * 0.01]));
        frameRef.current = 0;
      }
    }, [deckState, deck.length]);
    useFrame(() => {
      if (deckState !== 'shuffling') return;
      frameRef.current++;
      setPositions(prev => prev.map((_, i) => {
        const t = Math.min(frameRef.current / 90, 1);
        return [
          Math.sin(i + frameRef.current * 0.07) * 1.2 * t,
          Math.cos(i - frameRef.current * 0.09) * 0.7 * t,
          i * 0.01
        ];
      }));
      if (frameRef.current > 90) {
        // Mezclar deck y pasar a abanico
        const shuffled = [...deck]
          .sort(() => Math.random() - 0.5)
          .sort(() => Math.random() - 0.5)
          .sort(() => Math.random() - 0.5);
        handleShuffleEnd(shuffled);
      }
    });
    // Render según estado
    if (deckState === 'stacked' || deckState === 'shuffling') {
      return (
        <>
          {deck.map((card, i) => (
            <Card3D
              key={card.id}
              textureUrl={tarotBackUrl}
              position={positions[i] || [0, 0, i * 0.01]}
              rotation={[0, 0, 0]}
            />
          ))}
        </>
      );
    }
    // Abanico
    if (deckState === 'fan') {
      return (
        <>
          {deck.map((card, i) => {
            const [x, y, z, rotZ] = fanPositions[i] || [0, 0, i * 0.01, 0];
            const isSelected = selectedIndexes.includes(i);
            return (
              <Card3D
                key={card.id}
                textureUrl={tarotBackUrl}
                position={[x, y, z]}
                rotation={[0, 0, rotZ]}
                onClick={() => selectCard(i)}
                isSelected={isSelected}
                isFaceUp={isSelected}
                cardName={card.name}
              />
            );
          })}
        </>
      );
    }
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center animate-fade-in-up mt-12">
      <h2 className="font-cinzel text-3xl md:text-4xl text-amber-200 mb-6 text-center">
        {showReading ? 'Interpretación final' : 'Tarot interactivo'}
      </h2>
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 flex gap-2 w-full max-w-md">
          <Input
            ref={questionRef}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="¿Qué quieres preguntar?"
            className="flex-1"
            disabled={isShuffling || deckState !== 'stacked'}
          />
          <Button onClick={startShuffle} disabled={isShuffling || !question.trim() || deckState !== 'stacked'} variant="secondary">
            Mezclar
          </Button>
        </div>
        <div className="w-full flex justify-center items-center" style={{ minHeight: '50vw', minWidth: '100%', maxWidth: 900 }}>
          <Canvas
            camera={{ position: [0, 0, 7] }}
            style={{ width: '100%', height: '50vw', maxWidth: 900, maxHeight: 700, minHeight: 350, background: 'transparent' }}
            shadows
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 5]} intensity={0.7} />
            <Suspense fallback={null}>
              <TarotScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
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
        </div>
      )}
    </div>
  );
}

export default TarotExperience3D;
