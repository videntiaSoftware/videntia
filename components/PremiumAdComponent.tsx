"use client";
import React, { useEffect, useState } from 'react';
import { X, TrendingUp, Target, DollarSign } from 'lucide-react';

interface PremiumAdComponentProps {
  questionAnalysis?: {
    category: string;
    commercial_value: number;
    premium_eligible: boolean;
    estimated_cpm: number;
    segments: string[];
  } | null;
  onAdComplete?: () => void;
  onAdSkipped?: () => void;
  className?: string;
}

/**
 * 🔥 PREMIUM AD COMPONENT
 * Sirve ads de $5-15 CPM basados en análisis LLM de preguntas
 * Revenue multiplier: 10-25x vs ads básicos ($0.30 CPM)
 */
export default function PremiumAdComponent({ 
  questionAnalysis, 
  onAdComplete, 
  onAdSkipped,
  className = ""
}: PremiumAdComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adData, setAdData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!questionAnalysis?.premium_eligible) return;

    // Auto-show premium ad for high-value questions
    const timer = setTimeout(() => {
      setIsVisible(true);
      fetchPremiumAd();
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [questionAnalysis]);

  const fetchPremiumAd = async () => {
    if (!questionAnalysis) return;

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/ads/premium-targeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: questionAnalysis.category,
          segments: questionAnalysis.segments,
          commercial_value: questionAnalysis.commercial_value,
          estimated_cpm: questionAnalysis.estimated_cpm
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAdData(data);
      }
    } catch (error) {
      console.error('[PREMIUM_AD] Error fetching ad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdClick = () => {
    if (adData?.click_url) {
      // Track premium ad click
      fetch('/api/analytics/premium-ad-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'premium_ad_click',
          ad_id: adData.ad_id,
          category: questionAnalysis?.category,
          estimated_revenue: questionAnalysis?.estimated_cpm || 0,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error);

      window.open(adData.click_url, '_blank');
      onAdComplete?.();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onAdSkipped?.();
  };

  if (!questionAnalysis?.premium_eligible || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl border border-amber-500/30 max-w-md w-full relative overflow-hidden">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-semibold">Anuncio Personalizado</span>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-purple-200">Cargando anuncio personalizado...</p>
            </div>
          ) : adData ? (
            <div className="space-y-4">
              {/* Ad Content */}
              <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-xl font-bold text-amber-300 mb-2">
                  {adData.title || getDefaultAdTitle(questionAnalysis.category)}
                </h3>
                <p className="text-purple-100 mb-3">
                  {adData.description || getDefaultAdDescription(questionAnalysis.category)}
                </p>
                {adData.image_url && (
                  <img 
                    src={adData.image_url} 
                    alt="Ad content"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400 font-medium">
                    Recomendado para ti
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>Premium</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAdClick}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Ver Más Información
              </button>

              {/* Revenue Info (for development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-400 text-center border-t border-gray-700 pt-3">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>CPM: ${questionAnalysis.estimated_cpm}</span>
                    <span>•</span>
                    <span>Value: {questionAnalysis.commercial_value}/10</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-purple-200">No hay anuncios disponibles</p>
              <button
                onClick={handleSkip}
                className="mt-2 text-amber-400 hover:text-amber-300 underline"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Default ad content based on category
function getDefaultAdTitle(category: string): string {
  const titles = {
    travel: "🌟 Descubre tu Próximo Destino",
    relationships: "💕 Encuentra tu Media Naranja",
    career: "🚀 Impulsa tu Carrera Profesional",
    money: "💰 Mejora tus Finanzas Personales",
    health: "🌱 Cuida tu Bienestar Integral",
    family: "👨‍👩‍👧‍👦 Fortalece tus Vínculos Familiares",
    spiritual: "✨ Conecta con tu Esencia Espiritual"
  };
  return titles[category as keyof typeof titles] || "🔮 Descubre Más";
}

function getDefaultAdDescription(category: string): string {
  const descriptions = {
    travel: "Explora ofertas exclusivas en viajes y experiencias únicas diseñadas para ti.",
    relationships: "Conecta con personas afines y encuentra el amor verdadero.",
    career: "Cursos, coaching y oportunidades laborales para alcanzar tus metas.",
    money: "Herramientas y consejos expertos para mejorar tu situación financiera.",
    health: "Productos y servicios para mantener tu salud física y mental.",
    family: "Recursos para crear harmonía y conexión en tu familia.",
    spiritual: "Profundiza tu crecimiento personal y espiritual."
  };
  return descriptions[category as keyof typeof descriptions] || "Contenido personalizado especialmente para ti.";
}
