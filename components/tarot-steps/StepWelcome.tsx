"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function StepWelcome({ onFinish }: { onFinish: () => void }) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => onFinish(), 800);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700",
        showWelcome ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ background: "transparent" }}
    >
      {/* Viñeta oscura MUY fuerte */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
              <stop offset="40%" stopColor="rgba(0,0,0,0)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.85)" />
              <stop offset="90%" stopColor="rgba(0,0,0,0.97)" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#vignette)" />
        </svg>
      </div>
      {/* Fondo negro difuminado detrás del contenido */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        <div className={cn("flex flex-col items-center animate-zoom-in-smooth")}> 
          {/* Glow dorado detrás del logo */}
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-2/3 pointer-events-none z-0" style={{width:64, height:24}}>
            <div style={{
              width: 64,
              height: 24,
              borderRadius: "50% / 50%",
              boxShadow: "0 0 32px 16px #fbbf24, 0 0 48px 24px #fffbe6, 0 0 16px 4px #fbbf24",
              opacity: 0.45,
              filter: "blur(1.2px)",
            }} />
          </div>
          <img
            src="https://jhtjdapbeiybxpqvyqqs.supabase.co/storage/v1/object/public/assets//videntia-logo.png"
            alt="Videntia Logo"
            width={160}
            height={160}
            className={cn(
              "mb-6 drop-shadow-xl relative z-10 transition-opacity duration-700",
              showWelcome ? "opacity-100" : "opacity-0 blur-sm"
            )}
          />
          <div className="flex flex-col items-center relative z-10">
            <h1 className="font-cinzel text-4xl md:text-5xl text-amber-200 tracking-widest mb-2 drop-shadow-lg">Videntia Tarot</h1>
            <p className="font-cormorant text-lg md:text-2xl text-slate-200/90 tracking-wide text-center max-w-md animate-fade-in-up">Qué tendrán las cartas para ti?</p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes zoom-in-smooth {
          from { transform: scale(1); }
          to { transform: scale(1.10); }
        }
        .animate-zoom-in-smooth {
          animation: zoom-in-smooth 2.2s linear forwards;
        }
      `}</style>
    </div>
  );
} 