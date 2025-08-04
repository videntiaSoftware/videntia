"use client";
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

interface AdSenseHeaderBannerProps {
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseHeaderBanner({ className = "" }: AdSenseHeaderBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [adPushed, setAdPushed] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const retryCount = useRef(0);

  const pushAd = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current && !adPushed) {
      try {
        console.log('🚀 Pushing AdSense ad...');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdPushed(true);
        console.log('✅ AdSense ad pushed successfully');
      } catch (error) {
        console.error('❌ Error pushing AdSense ad:', error);
        // Retry up to 3 times with exponential backoff
        if (retryCount.current < 3) {
          retryCount.current++;
          const delay = Math.pow(2, retryCount.current) * 1000; // 2s, 4s, 8s
          console.log(`⏳ Retrying in ${delay/1000}s (attempt ${retryCount.current}/3)`);
          setTimeout(pushAd, delay);
        } else {
          console.error('❌ Max retries reached for AdSense');
          setHasError(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isLoaded && !hasError && !adPushed) {
      console.log('📡 AdSense script loaded, initializing ad...');
      // Small delay to ensure DOM is ready
      const timer = setTimeout(pushAd, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasError, adPushed]);

  const handleScriptLoad = () => {
    console.log('AdSense script loaded successfully');
    setIsLoaded(true);
  };

  const handleScriptError = (e: any) => {
    console.error('AdSense script failed to load:', e);
    setHasError(true);
  };

  // Don't render anything if there's an error
  if (hasError) {
    // Show placeholder in development
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`w-full max-w-4xl mx-auto mb-6 ${className}`}>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
            <div className="text-xs text-red-400/60 text-center mb-2">AdSense Error - Modo Desarrollo</div>
            <div className="bg-red-800/20 h-24 flex items-center justify-center text-red-400 text-sm">
              ❌ No se pudo cargar el anuncio (normal en desarrollo)
            </div>
            <div className="text-xs text-red-400/40 text-center mt-2">
              En producción se intentaría cargar un anuncio real aquí
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mb-6 ${className}`}>
      {/* Load AdSense Script */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4987669803086382"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      {/* AdSense Header Banner */}
      <div className="bg-black/20 rounded-lg p-4 border border-amber-500/20">
        <div className="text-xs text-amber-400/60 text-center mb-2">Publicidad</div>
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4987669803086382"
          data-ad-slot="7298629760"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        
        {/* Placeholder for development or when ads don't load */}
        {process.env.NODE_ENV === 'development' && !adPushed && (
          <div className="bg-amber-900/20 h-24 flex items-center justify-center text-amber-400 text-sm border border-amber-500/30 rounded mt-2">
            🎯 Espacio reservado para anuncio AdSense
          </div>
        )}
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-amber-400/40 text-center mt-2 space-y-1">
            <div>Status: {isLoaded ? '✅ Script loaded' : '⏳ Loading...'}</div>
            <div>Ad pushed: {adPushed ? '✅ Yes' : '❌ No'}</div>
            {hasError && <div className="text-red-400">❌ Error loading ads</div>}
            <div>Retry count: {retryCount.current}</div>
          </div>
        )}
        
        <div className="text-xs text-amber-400/40 text-center mt-2">
          Los anuncios nos ayudan a mantener Videntia gratuito
        </div>
      </div>
    </div>
  );
}
