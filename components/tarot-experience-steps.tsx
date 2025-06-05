"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StepWelcome from "./tarot-steps/StepWelcome";
import StepTypeSelector from "./tarot-steps/StepTypeSelector";
import StepTarotExperience from "./tarot-steps/StepTarotExperience";

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

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center relative">
      {step === 0 && (
        <StepWelcome onFinish={() => setStep(1)} />
      )}
      {step === 1 && (
        <StepTypeSelector
          onSelectType={(type) => {
            setSelectedType(type);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <StepTarotExperience readingType={selectedType} />
      )}
    </div>
  );
} 