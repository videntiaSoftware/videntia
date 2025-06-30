"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CookieConsent } from '@/lib/cookies';
import { Cookie, Shield, Settings } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Show banner if consent is needed
    if (CookieConsent.needsConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    CookieConsent.setConsent(true);
    setShowBanner(false);
    // Reload to initialize tracking
    window.location.reload();
  };

  const handleDecline = () => {
    CookieConsent.setConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <Card className="bg-slate-900/95 border-amber-500/30 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-300 font-cinzel mb-2">
                🍪 Cookies y Privacidad
              </h3>
              
              <p className="text-amber-100/80 font-cormorant mb-4 leading-relaxed">
                Usamos cookies para mejorar tu experiencia y prevenir abuso. 
                Estos datos nos ayudan a ofrecerte un mejor servicio místico.
              </p>

              {showDetails && (
                <div className="bg-slate-800/50 p-4 rounded-lg mb-4 border border-amber-500/20">
                  <h4 className="text-amber-200 font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    ¿Qué datos recopilamos?
                  </h4>
                  <ul className="text-sm text-amber-100/70 space-y-1 font-cormorant">
                    <li>• <strong>Identificación del dispositivo</strong> (para límites diarios)</li>
                    <li>• <strong>Patrones de uso</strong> (para prevenir abuso)</li>
                    <li>• <strong>Preferencias de lectura</strong> (para personalización)</li>
                    <li>• <strong>Información de ubicación básica</strong> (para estadísticas)</li>
                  </ul>
                  <p className="text-xs text-amber-200/60 mt-2">
                    📖 Lee nuestra <a href="/politica-privacidad" className="underline hover:text-amber-200">Política de Privacidad</a> completa.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
                >
                  ✨ Aceptar y Continuar
                </Button>
                
                <Button 
                  onClick={handleDecline}
                  variant="outline"
                  className="border-amber-500/30 text-amber-300 hover:bg-amber-900/30"
                >
                  Rechazar
                </Button>
                
                <Button 
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  size="sm"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {showDetails ? 'Ocultar' : 'Más Info'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
