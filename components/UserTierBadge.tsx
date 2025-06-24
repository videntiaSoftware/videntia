"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface UserTierBadgeProps {
  tier: 'guest' | 'free' | 'premium';
  readingsToday: number;
  maxReadings: number;
  adsWatched?: number;
  className?: string;
}

export default function UserTierBadge({ 
  tier, 
  readingsToday, 
  maxReadings, 
  adsWatched = 0,
  className = "" 
}: UserTierBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isUnlimited = maxReadings === -1;
  const remainingReadings = isUnlimited ? '∞' : Math.max(0, maxReadings - readingsToday);

  const getTierColor = () => {
    switch (tier) {
      case 'guest': return 'bg-slate-600/80 text-slate-200 border-slate-500/50';
      case 'free': return 'bg-blue-600/80 text-blue-100 border-blue-500/50';
      case 'premium': return 'bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white border-amber-400/50';
      default: return 'bg-slate-600/80 text-slate-200 border-slate-500/50';
    }
  };

  const getTierIcon = () => {
    switch (tier) {
      case 'guest': return '👤';
      case 'free': return '🆓';
      case 'premium': return '✨';
      default: return '👤';
    }
  };

  const getTierName = () => {
    switch (tier) {
      case 'guest': return 'Invitado';
      case 'free': return 'Free';
      case 'premium': return 'Premium';
      default: return 'Invitado';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Compact Badge */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${getTierColor()} backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold font-cinzel border transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-lg`}
      >
        <span>{getTierIcon()}</span>
        <span>{getTierName()}</span>
        <span className="text-xs opacity-80">
          {readingsToday}/{isUnlimited ? '∞' : maxReadings}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-sm border border-amber-500/30 rounded-lg shadow-xl z-50 p-4">
          <div className="space-y-3">
            {/* Usage Stats */}
            <div className="text-center">
              <div className="text-lg font-bold text-amber-300 font-cinzel">
                {remainingReadings} restantes
              </div>
              <div className="text-xs text-amber-200/70 font-cormorant">
                Lecturas disponibles hoy
              </div>
            </div>

            {/* Free tier ad info */}
            {tier === 'free' && (
              <div className="text-center text-xs text-blue-300/80 font-cormorant">
                {adsWatched}/2 anuncios vistos • +{Math.min(2 - adsWatched, 2)} lecturas extra
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2">
              {tier === 'guest' && (
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-cormorant">
                  <Link href="/auth/sign-up">
                    🆓 Crear Cuenta
                  </Link>
                </Button>
              )}

              {tier !== 'premium' && (
                <Button asChild size="sm" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-cormorant">
                  <Link href="/premium">
                    ✨ Upgrade Premium
                  </Link>
                </Button>
              )}

              {tier === 'premium' && (
                <div className="text-center text-xs text-amber-300/80 font-cormorant">
                  🌟 Disfruta tu acceso ilimitado
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
