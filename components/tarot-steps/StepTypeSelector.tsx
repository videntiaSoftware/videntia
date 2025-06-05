"use client";
import { useState } from "react";

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

export default function StepTypeSelector({ onSelectType }: { onSelectType: (type: string) => void }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <div className="w-full flex flex-col items-center justify-center animate-fade-in-up">
      <h2 className="font-cinzel text-3xl md:text-4xl text-amber-200 mb-6 mt-8 text-center drop-shadow">Elige tu tipo de lectura</h2>
      <div className="relative w-full max-w-xl flex items-center justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-amber-200/70 hover:text-amber-400 text-3xl"
          onClick={() => setCarouselIndex((i) => (i === 0 ? READING_TYPES.length - 1 : i - 1))}
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <div className="mx-12 w-full">
          <div className="bg-black/70 rounded-2xl border border-amber-400/30 shadow-xl p-8 flex flex-col items-center transition-all duration-500">
            <h3 className="font-cinzel text-2xl text-amber-300 mb-2 text-center">{READING_TYPES[carouselIndex].label}</h3>
            <p className="font-cormorant text-lg text-slate-200/90 text-center mb-4">{READING_TYPES[carouselIndex].description}</p>
            <button
              className="mt-2 px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-all font-cinzel text-lg"
              onClick={() => onSelectType(READING_TYPES[carouselIndex].value)}
            >
              Elegir este tipo
            </button>
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-amber-200/70 hover:text-amber-400 text-3xl"
          onClick={() => setCarouselIndex((i) => (i === READING_TYPES.length - 1 ? 0 : i + 1))}
          aria-label="Siguiente"
        >
          &#8594;
        </button>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
} 