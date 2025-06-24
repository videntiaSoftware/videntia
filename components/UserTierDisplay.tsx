"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TIER_BENEFITS, PREMIUM_PRICING } from '@/lib/user-tiers';
import Link from 'next/link';

interface UserTierDisplayProps {
  tier: 'guest' | 'free' | 'premium';
  readingsToday: number;
  maxReadings: number;
  adsWatched?: number;
  className?: string;
}

export default function UserTierDisplay({ 
  tier, 
  readingsToday, 
  maxReadings, 
  adsWatched = 0,
  className = "" 
}: UserTierDisplayProps) {
  const benefits = TIER_BENEFITS[tier];
  const isUnlimited = maxReadings === -1;
  const remainingReadings = isUnlimited ? 'Ilimitadas' : Math.max(0, maxReadings - readingsToday);

  const getTierColor = () => {
    switch (tier) {
      case 'guest': return 'bg-slate-600 text-slate-200';
      case 'free': return 'bg-blue-600 text-blue-100';
      case 'premium': return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: return 'bg-slate-600 text-slate-200';
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
      case 'free': return 'Usuario Free';
      case 'premium': return 'Premium';
      default: return 'Invitado';
    }
  };

  return (
    <Card className={`bg-slate-900/90 border-amber-500/30 shadow-2xl ${className}`}>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge className={`${getTierColor()} font-cinzel text-sm px-3 py-1`}>
            {getTierIcon()} {getTierName()}
          </Badge>
        </div>
        <CardTitle className="text-xl font-cinzel text-amber-300">
          Tu Plan Actual
        </CardTitle>
        <CardDescription className="text-amber-200/80 font-cormorant">
          {tier === 'guest' && 'Explora el tarot sin registro'}
          {tier === 'free' && 'Acceso completo con algunas limitaciones'}
          {tier === 'premium' && 'Acceso total sin limitaciones'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Usage Stats */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/20">
          <h4 className="font-cinzel text-amber-300 mb-2">Uso Diario</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-amber-200/70 font-cormorant">Lecturas hoy</div>
              <div className="text-xl font-bold text-amber-300">{readingsToday}</div>
            </div>
            <div>
              <div className="text-amber-200/70 font-cormorant">Restantes</div>
              <div className="text-xl font-bold text-amber-300">{remainingReadings}</div>
            </div>
            {tier === 'free' && (
              <div className="col-span-2">
                <div className="text-amber-200/70 font-cormorant">Anuncios vistos</div>
                <div className="text-lg font-bold text-amber-300">{adsWatched}/2</div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h4 className="font-cinzel text-amber-300">Beneficios de tu plan</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-amber-200/90 font-cormorant">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade Options */}
        {tier !== 'premium' && (
          <div className="pt-4 border-t border-amber-500/20">
            <div className="space-y-3">
              <h4 className="font-cinzel text-amber-300">¿Quieres más?</h4>
              
              {tier === 'guest' && (
                <div className="space-y-2">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-cormorant">
                    <Link href="/auth/sign-up">
                      🆓 Crear Cuenta Gratuita
                    </Link>
                  </Button>
                  <div className="text-xs text-blue-300/70 font-cormorant text-center">
                    3 lecturas diarias + historial guardado
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-cormorant">
                  <Link href="#premium">
                    ✨ Upgrade a Premium
                  </Link>
                </Button>
                <div className="text-xs text-amber-300/70 font-cormorant text-center">
                  Desde ${PREMIUM_PRICING.monthly.usd}/mes - Lecturas ilimitadas
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Benefits Preview */}
        {tier !== 'premium' && (
          <div className="bg-gradient-to-r from-amber-900/20 to-purple-900/20 rounded-lg p-4 border border-amber-500/20">
            <h5 className="font-cinzel text-amber-300 text-sm mb-2">Con Premium obtienes:</h5>
            <ul className="space-y-1">
              {TIER_BENEFITS.premium.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-amber-200/80 font-cormorant">
                  <span className="text-amber-400">✨</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
