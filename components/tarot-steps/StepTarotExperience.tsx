"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Shuffle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TarotDeck, { Card as TarotDeckCard } from "@/components/tarot-deck";
import TarotReading from "@/components/tarot-reading";
import StepCardReveal from './StepCardReveal';
import AdComponent from "@/components/AdComponent";
import { createClient } from "@/lib/supabase/client";
import { getUserTier, canAccessReadingType, getTierLimits } from "@/lib/user-tiers";
import ReactMarkdown from 'react-markdown';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AnimatePresence, motion } from 'framer-motion';
import Script from "next/script";
import { SubtleAuthPrompt } from "@/components/SubtleAuthPrompt";
import PremiumAdComponent from "@/components/PremiumAdComponent";
import { GuestCookieManager, CookieConsent } from "@/lib/cookies";

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
  const [userTier, setUserTier] = useState<'guest' | 'free' | 'premium'>('guest');
  const [showAdModal, setShowAdModal] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [readingsToday, setReadingsToday] = useState(0);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showPremiumAd, setShowPremiumAd] = useState(false);
  const [questionAnalysis, setQuestionAnalysis] = useState<any>(null);
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

  // Check user tier and reading access
  useEffect(() => {
    const checkUserAccess = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const tier = getUserTier(userData?.user || null);
      setUserTier(tier);

      // Check if user can access this reading type
      if (!canAccessReadingType(tier, readingType)) {
        setLimitReached(true);
        setErrorMessage(`La lectura "${readingType}" requiere una cuenta Premium. Upgrade para acceder a todas las lecturas.`);
      }

      // Get today's reading count
      if (userData?.user) {
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const { data: readings } = await supabase
          .from('readings')
          .select('id')
          .eq('user_id', userData.user.id)
          .gte('created_at', today.toISOString());
        
        setReadingsToday(readings?.length || 0);
      }
    };

    checkUserAccess();
  }, [readingType]);

  useEffect(() => {
    // Enhanced guest identification with cookies + fingerprinting
    const initializeGuestIdentity = async () => {
      if (typeof window === 'undefined') return;

      // Check if we need cookie consent (GDPR compliance)
      if (CookieConsent.needsConsent()) {
        // For now, we'll assume consent. In production, show consent banner
        CookieConsent.setConsent(true);
      }

      // Only proceed if user has given consent
      if (!CookieConsent.hasConsent()) return;

      try {
        // Get or create cookie-based identity
        let guestIdentity = GuestCookieManager.getGuestCookie();
        
        // Generate fingerprint
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const fingerprintId = result.visitorId;

        if (!guestIdentity) {
          // Create new guest identity with both cookie and fingerprint
          guestIdentity = GuestCookieManager.createGuestSession(fingerprintId);
          localStorage.setItem('guest_id', guestIdentity.guest_id);
        } else {
          // Update existing identity
          GuestCookieManager.updateGuestCookie({
            fingerprint_id: fingerprintId
          });
          localStorage.setItem('guest_id', guestIdentity.guest_id);
        }

        console.log('[GUEST_IDENTITY] Initialized:', {
          guest_id: guestIdentity.guest_id,
          fingerprint_id: fingerprintId,
          is_returning: GuestCookieManager.isReturningGuest(),
          visit_count: guestIdentity.visit_count
        });

        // 🔥 ADVANCED TRACKING FOR REVENUE OPTIMIZATION
        await trackAdvancedBehavior(guestIdentity.guest_id, {
          event_type: 'session_start',
          reading_type: readingType,
          fingerprint_id: fingerprintId,
          is_returning: GuestCookieManager.isReturningGuest(),
          visit_count: guestIdentity.visit_count,
          session_id: guestIdentity.session_id
        });

      } catch (error) {
        console.error('[GUEST_IDENTITY] Error:', error);
        // Fallback to localStorage only
        if (!localStorage.getItem('guest_id')) {
          localStorage.setItem('guest_id', `fallback_${Date.now()}`);
        }
      }
    };

    initializeGuestIdentity();
  }, []);

  useEffect(() => {
    // Ocultar el badge de reCAPTCHA v3
    const style = document.createElement('style');
    style.innerHTML = `.grecaptcha-badge { visibility: hidden !important; }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Función para esperar a que reCAPTCHA esté listo
  const waitForRecaptcha = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const checkRecaptcha = () => {
        if (typeof window !== 'undefined' && (window as any).grecaptcha && (window as any).grecaptcha.ready) {
          (window as any).grecaptcha.ready(() => {
            resolve(true);
          });
        } else {
          setTimeout(checkRecaptcha, 100);
        }
      };
      checkRecaptcha();
    });
  };
  
  // Log the question state changes for debugging
  useEffect(() => {
    console.log("[StepTarotExperience] Question state updated:", question);
  }, [question]);

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
    console.log("[shuffleDeck] Usando pregunta:", question);
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
      // Inspeccionar la estructura completa de cards para debuggear
      console.log("[fetchReading] Estructura de cards:", JSON.stringify(cards, null, 2));

      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const isUserAuthenticated = !!userData?.user;
      let recaptchaToken = '';
      let recaptchaOk = false;
      
      if (!isUserAuthenticated && typeof window !== 'undefined' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          console.log("[fetchReading] Esperando a que reCAPTCHA esté listo...");
          await waitForRecaptcha();
          console.log("[fetchReading] reCAPTCHA listo, obteniendo token...");
          recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'reading' });
          recaptchaOk = typeof recaptchaToken === 'string' && recaptchaToken.length > 0;
          console.log("[fetchReading] reCAPTCHA token generado:", recaptchaToken, "OK:", recaptchaOk);
        } catch (err) {
          console.error("[fetchReading] Error ejecutando grecaptcha:", err);
        }
      } else {
        console.warn("[fetchReading] reCAPTCHA no requerido", {
          isUserAuthenticated,
          siteKeyExists: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        });
      }
      
      let guestId = null;
      if (!isUserAuthenticated && typeof window !== 'undefined') {
        guestId = localStorage.getItem('guest_id') || '';
      }
      
      // Validar que la pregunta no esté vacía
      if (!question || question.trim() === "") {
        console.warn("[fetchReading] Pregunta vacía, cancelando");
        setLoadingReading(false);
        questionRef.current?.focus();
        return;
      }
      
      console.log("[fetchReading] Utilizando pregunta:", question);
      
      // Validación exhaustiva de las variables necesarias para el fetch
      if (!Array.isArray(cards)) {
        console.error("[fetchReading] Error: cards no es un array", cards);
        setLoadingReading(false);
        return;
      }
      
      if (cards.length === 0) {
        console.error("[fetchReading] Error: cards está vacío");
        setLoadingReading(false);
        return;
      }
      
      console.log("[fetchReading] readingType:", readingType);
      if (!readingType) {
        console.error("[fetchReading] Error: readingType es undefined o null");
        setLoadingReading(false);
        return;
      }
      
      // Validar estructura de cada carta
      const processedCards = [];
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (!c || typeof c !== 'object') {
          console.error(`[fetchReading] Error: card en posición ${i} no es un objeto válido`, c);
          setLoadingReading(false);
          return;
        }
        
        if (!c.card) {
          console.error(`[fetchReading] Error: card.card en posición ${i} es undefined`, c);
          setLoadingReading(false);
          return;
        }
        
        if (typeof c.card.id === 'undefined') {
          console.error(`[fetchReading] Error: card.card.id en posición ${i} es undefined`, c.card);
          setLoadingReading(false);
          return;
        }
        
        if (typeof c.orientation === 'undefined') {
          console.error(`[fetchReading] Error: card.orientation en posición ${i} es undefined`, c);
          setLoadingReading(false);
          return;
        }
        
        processedCards.push({ id: c.card.id, orientation: c.orientation });
      }
      
      // Preparar payload para el fetch
      const payload = {
        type: readingType,
        question: question.trim(),
        cards: processedCards,
        recaptchaToken,
        guest_id: guestId,
      };
      
      console.log("[fetchReading] Payload para fetch:", payload);
      
      // Intentar el fetch con un try/catch específico
      try {
        console.log("[fetchReading] Antes del fetch a /api/reading/generate");
        const res = await fetch("/api/reading/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        
        console.log("[fetchReading] Respuesta recibida:", {
          status: res.status,
          statusText: res.statusText,
          ok: res.ok,
          headers: Object.fromEntries(res.headers.entries())
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          console.log("[fetchReading] Error response:", errorData);
          
          // Handle tier-based errors
          if (res.status === 429 && errorData.canWatchAds) {
            setShowAdModal(true);
            setLimitReached(true);
            setErrorMessage(errorData.error || 'Has alcanzado tu límite diario.');
            return;
          } else if (res.status === 429) {
            setLimitReached(true);
            setErrorMessage(errorData.error || 'Has alcanzado tu límite diario.');
            return;
          }
          
          throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("[fetchReading] Data recibida:", data);
        
        setReadingData(data);
        setShowReading(true);

        // 🔥 CAPTURE QUESTION ANALYSIS FOR PREMIUM ADS
        if (data.questionAnalysis) {
          console.log('[PREMIUM_ADS] Question analysis received:', data.questionAnalysis);
          setQuestionAnalysis(data.questionAnalysis);
          
          // Show premium ad if user is eligible
          if (data.questionAnalysis.premium_eligible) {
            setTimeout(() => {
              setShowPremiumAd(true);
            }, 5000); // Show premium ad 5 seconds after reading
          }
        }
        
        // Mostrar prompt de autenticación para usuarios invitados después de completar la lectura
        if (userTier === 'guest') {
          setTimeout(() => {
            setShowAuthPrompt(true);
          }, 3000); // Esperar 3 segundos después de mostrar la lectura
        }
        
        // Guardar la lectura en la base de datos
        if (isUserAuthenticated) {
          const insertObj = {
            question: data.question,
            reading_type: readingType,
            cards_drawn: data.cards,
            interpretation: data.interpretation,
          };
          await supabase.from("readings").insert([insertObj]);
        }
      } catch (fetchErr) {
        console.error("[fetchReading] Error en el fetch:", fetchErr);
        // Intentar un fetch simplificado para depuración
        try {
          console.log("[fetchReading] Intentando fetch de prueba simple...");
          const testRes = await fetch("/api");
          console.log("[fetchReading] Fetch de prueba simple resultado:", testRes.status);
        } catch (testErr) {
          console.error("[fetchReading] Error incluso en fetch simple:", testErr);
        }
      }
    } catch (e) {
      console.error("[fetchReading] Error global en fetchReading:", e);
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
    setLimitReached(false);
    setErrorMessage('');
    setShowAdModal(false);
    setShowPremiumAd(false);
    setQuestionAnalysis(null);
  };

  const handleAdComplete = () => {
    setShowAdModal(false);
    setLimitReached(false);
    setErrorMessage('');
    // User can now try their reading again
  };

  // Placeholder para voz
  const startSpeechToText = () => {};
  const cancelSpeechToText = () => {};

  // Obtener título y descripción del tipo de lectura
  const readingTitle = READING_TYPE_LAYOUTS[readingType]?.label || 'Tarot';
  const readingDesc = READING_TYPE_LAYOUTS[readingType]?.instructions || '';

  // Determinar el paso actual
  let currentStep = 'select';
  if (limitReached) currentStep = 'limit';
  else if (revealIndex !== null && selectedCards[revealIndex]) currentStep = 'reveal';
  else if (showReading) currentStep = 'reading';

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      
      {/* Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-6 max-w-md mx-4">
            <AdComponent
              userTier={userTier}
              onAdWatched={handleAdComplete}
              rewardType="extra_reading"
            />
            <Button
              variant="ghost"
              onClick={() => setShowAdModal(false)}
              className="mt-4 text-purple-300 hover:text-white w-full"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
      
      <div className="w-full flex flex-col items-center justify-center mt-12 h-screen max-h-screen overflow-hidden relative">
        <AnimatePresence mode="wait">
          {/* Limit Reached Screen */}
          {currentStep === 'limit' && (
            <motion.div
              key="limit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mx-auto px-6 text-center"
            >
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-6">
                <h2 className="font-cinzel text-2xl text-amber-300 mb-4">
                  Límite Alcanzado
                </h2>
                <p className="text-purple-200 mb-6 font-cormorant text-lg">
                  {errorMessage}
                </p>
                
                {userTier === 'free' && !showAdModal && (
                  <div className="space-y-4">
                    <Button
                      onClick={() => setShowAdModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      🎬 Ver Anuncio para Lectura Adicional
                    </Button>
                    <div className="text-xs text-blue-300/70">
                      Ve un anuncio corto para obtener una lectura extra
                    </div>
                  </div>
                )}
                
                {userTier === 'guest' && (
                  <div className="space-y-4">
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a href="/auth/sign-up">
                        🆓 Crear Cuenta Gratuita
                      </a>
                    </Button>
                    <div className="text-xs text-blue-300/70">
                      3 lecturas diarias + historial guardado
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-amber-500/20">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-amber-500 text-amber-300 hover:bg-amber-500/10"
                  >
                    <a href="#premium">
                      ✨ Upgrade a Premium - Lecturas Ilimitadas
                    </a>
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={resetReading}
                  className="mt-4 text-purple-300 hover:text-white"
                >
                  Volver
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-full flex flex-col items-center justify-center absolute left-0 top-0 h-full max-h-screen overflow-y-auto"
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
                    initialQuestion={question}
                    onQuestionChange={setQuestion}
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
              className="absolute left-0 top-0 w-full h-full max-h-screen overflow-hidden flex flex-col items-center justify-center"
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
              className="absolute left-0 top-0 w-full h-full max-h-screen overflow-y-auto flex flex-col items-center justify-start p-4"
            >
              <div className="mt-4 bg-slate-900/90 rounded-lg p-6 border border-purple-500/30 shadow-xl text-white max-w-4xl w-full max-h-[80vh] overflow-y-auto">
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
      
      {/* Prompt de autenticación para usuarios invitados */}
      <SubtleAuthPrompt 
        showPrompt={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />

      {/* 🔥 PREMIUM AD COMPONENT - Revenue multiplier 10-25x */}
      <PremiumAdComponent
        questionAnalysis={questionAnalysis}
        onAdComplete={() => {
          setShowPremiumAd(false);
          console.log('[PREMIUM_ADS] Ad interaction completed');
        }}
        onAdSkipped={() => {
          setShowPremiumAd(false);
          console.log('[PREMIUM_ADS] Ad skipped by user');
        }}
      />
    </>
  );
}

// 🔥 Advanced tracking function for revenue optimization
async function trackAdvancedBehavior(guestId: string, eventData: any) {
  try {
    await fetch('/api/analytics/advanced-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guest_id: guestId,
        event_type: eventData.event_type,
        event_data: eventData,
        page_url: window.location.href,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('[ADVANCED_TRACKING] Error:', error);
  }
}