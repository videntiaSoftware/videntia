"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAdContent, AD_SCRIPTS } from '@/lib/ads';

interface AdComponentProps {
  userTier: 'guest' | 'free' | 'premium';
  onAdWatched?: () => void;
  rewardType?: 'extra_reading' | 'premium_trial';
  disabled?: boolean;
}

export default function AdComponent({ 
  userTier, 
  onAdWatched, 
  rewardType = 'extra_reading',
  disabled = false 
}: AdComponentProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Don't show ads for premium users
  if (userTier === 'premium') {
    return null;
  }

  const startAdSession = async () => {
    try {
      setError(null);
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'start',
          rewardType 
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'No se pudo iniciar el anuncio');
        return;
      }

      setCurrentSession(data.sessionId);
      setIsWatching(true);
      setCountdown(30); // 30 second ad

      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            completeAd(data.sessionId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Error starting ad:', err);
      setError('Error al iniciar el anuncio');
    }
  };

  const completeAd = async (sessionId: string) => {
    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'complete',
          sessionId,
          rewardType 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsWatching(false);
        setCurrentSession(null);
        onAdWatched?.();
        
        // Show success notification
        showNotification(data.message || '¡Recompensa obtenida!');
      } else {
        setError(data.error || 'Error al completar el anuncio');
      }
    } catch (err) {
      console.error('Error completing ad:', err);
      setError('Error al completar el anuncio');
    }
  };

  const showNotification = (message: string) => {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 font-cormorant';
    notification.innerHTML = `🎉 ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  if (isWatching) {
    return (
      <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-cinzel text-amber-300">
            Anuncio en Progreso
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-black rounded-lg aspect-video mb-4 flex items-center justify-center relative">
            <div className="text-white text-lg font-cormorant">
              📺 Video Publicitario
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
              {countdown}s
            </div>
          </div>
          <div className="text-amber-200 font-cormorant">
            {rewardType === 'extra_reading' 
              ? 'Obtendrás una lectura adicional al completar el video'
              : 'Obtendrás 24 horas de Premium gratis al completar el video'
            }
          </div>
          <div className="mt-4 text-sm text-amber-300/70 font-cormorant">
            Por favor mantén esta ventana abierta...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-amber-900/20 border-amber-500/30 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-cinzel text-amber-300">
          {rewardType === 'extra_reading' 
            ? '¿Necesitas más lecturas?' 
            : '¿Quieres probar Premium gratis?'
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-amber-200 font-cormorant">
          {rewardType === 'extra_reading' 
            ? 'Ve un breve anuncio y obtén una lectura adicional para hoy'
            : 'Ve un anuncio y disfruta 24 horas de acceso Premium completamente gratis'
          }
        </div>
        
        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <div className="bg-amber-50/10 rounded-lg p-4 border border-amber-500/20">
          <div className="text-amber-300 text-sm font-cormorant mb-2">
            {rewardType === 'extra_reading' 
              ? '¡Gana lecturas adicionales!' 
              : '¡Prueba Premium sin costo!'
            }
          </div>
          <ul className="text-xs text-amber-200/80 font-cormorant space-y-1">
            {rewardType === 'extra_reading' ? (
              <>
                <li>• Video de 30 segundos</li>
                <li>• 1 lectura adicional</li>
                <li>• Máximo 2 anuncios por día</li>
              </>
            ) : (
              <>
                <li>• Video de 30 segundos</li>
                <li>• 24 horas de acceso Premium</li>
                <li>• Lecturas ilimitadas</li>
                <li>• Acceso a Cruz Celta</li>
              </>
            )}
          </ul>
        </div>

        <Button 
          onClick={startAdSession}
          disabled={disabled || isWatching}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-cormorant text-lg py-6"
        >
          {disabled 
            ? 'No disponible' 
            : `▶️ Ver Anuncio (30s)`
          }
        </Button>

        <div className="text-xs text-amber-300/60 font-cormorant">
          Los anuncios nos ayudan a mantener Videntia gratuito
        </div>
      </CardContent>
    </Card>
  );
}
