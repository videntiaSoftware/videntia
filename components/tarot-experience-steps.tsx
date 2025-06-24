"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StepWelcome from "./tarot-steps/StepWelcome";
import StepTypeSelector from "./tarot-steps/StepTypeSelector";
import StepTarotExperience from "./tarot-steps/StepTarotExperience";
import UserTierBadge from "./UserTierBadge";
import { createClient } from "@/lib/supabase/client";
import { getUserTier, getTierLimits } from "@/lib/user-tiers";

const READING_TYPES = [
  {
    value: "three_card",
    label: "Tirada de 3 cartas",
    description: "Pasado, presente y futuro. Ideal para respuestas rápidas o situaciones simples.",
  },
  {
    value: "celtic_cross",
    label: "Cruz Celta",
    description: "Análisis profundo de una situación compleja. 10 cartas.",
  },
  {
    value: "yes_no",
    label: "Lectura del sí o no",
    description: "Responde a preguntas cerradas. 1 carta.",
  },
  {
    value: "love_relationship",
    label: "Relación de pareja",
    description: "Sentimientos, intenciones, obstáculos, potencial. 4 cartas.",
  },
  {
    value: "soulmate",
    label: "Alma gemela",
    description: "Conexión espiritual, bloqueos, caminos para sanar. 3 cartas.",
  },
  {
    value: "life_purpose",
    label: "Propósito de vida",
    description: "Dones, misión, bloqueos, próximos pasos. 4 cartas.",
  },
  {
    value: "shadow_work",
    label: "Sombras",
    description: "Inconsciente, miedo, sanación. 3 cartas.",
  },
];

export default function TarotExperienceSteps() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState("three_card");
  const [userTier, setUserTier] = useState<'guest' | 'free' | 'premium'>('guest');
  const [readingsToday, setReadingsToday] = useState(0);
  const [adsWatched, setAdsWatched] = useState(0);

  useEffect(() => {
    const checkUserTier = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const tier = getUserTier(userData?.user || null);
      setUserTier(tier);

      // Get today's reading count and ads watched
      if (userData?.user) {
        // Get readings count for today
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const { data: readings } = await supabase
          .from('readings')
          .select('id')
          .eq('user_id', userData.user.id)
          .gte('created_at', today.toISOString());
        
        setReadingsToday(readings?.length || 0);

        // Get ads watched today for free users
        if (tier === 'free') {
          const { data: ads } = await supabase
            .from('ad_sessions')
            .select('id')
            .eq('user_id', userData.user.id)
            .eq('verified', true)
            .gte('created_at', today.toISOString());
          
          setAdsWatched(ads?.length || 0);
        }
      }
    };
    
    checkUserTier();
  }, []);

  const tierLimits = getTierLimits(userTier);
  const maxReadings = tierLimits.dailyReadings;

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center relative">
      {/* User Tier Badge - subtle and elegant */}
      <div className="fixed top-6 right-6 z-50">
        <UserTierBadge
          tier={userTier}
          readingsToday={readingsToday}
          maxReadings={maxReadings}
          adsWatched={adsWatched}
        />
      </div>

      {step === 0 && (
        <StepWelcome onFinish={() => setStep(1)} />
      )}
      {step === 1 && (
        <StepTypeSelector
          onSelectType={(type) => {
            setSelectedType(type);
            setStep(2);
          }}
          isPremiumUser={userTier === 'premium'}
        />
      )}
      {step === 2 && (
        <StepTarotExperience readingType={selectedType} />
      )}
    </div>
  );
} 