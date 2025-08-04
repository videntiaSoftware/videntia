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
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const retryCount = useRef(0);

  // Detectar bloqueador de anuncios
  useEffect(() => {
    const detectAdBlocker = () => {
      // Crear elemento de prueba
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox adsbygoogle';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0 || testAd.style.display === 'none';
        document.body.removeChild(testAd);
        
        if (isBlocked) {
          setAdBlockerDetected(true);
          if (process.env.NODE_ENV === 'development') {
            console.log('🚫 Ad blocker detected');
          }
        }
      }, 100);
    };
    
    if (typeof window !== 'undefined') {
      detectAdBlocker();
    }
  }, []);

  const pushAd = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current && !adPushed) {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Pushing AdSense ad...');
        }
        
        // Verificar que el elemento no esté ya inicializado
        const adElement = adRef.current;
        const existingStatus = adElement.getAttribute('data-adsbygoogle-status');
        
        if (existingStatus) {
          if (process.env.NODE_ENV === 'development') {
            console.log('⚠️ Ad already initialized with status:', existingStatus);
          }
          setAdPushed(true);
          return;
        }
        
        // Verificar CSP antes de pushear
        if (!window.adsbygoogle) {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ window.adsbygoogle not available - CSP might be blocking');
          }
          setHasError(true);
          return;
        }
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdPushed(true);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ AdSense ad pushed successfully');
        }
        
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Error pushing AdSense ad:', error);
          
          // Verificar si es un error CSP específico
          if (error.message && (
            error.message.includes('Content Security Policy') ||
            error.message.includes('adtrafficquality.google') ||
            error.message.includes('Refused to frame')
          )) {
            console.error('🚨 CSP Error detected - check frame-src wildcard configuration');
            console.log('💡 Solución: Usar https://*.adtrafficquality.google en CSP');
          }
        }
        
        // Retry up to 3 times with exponential backoff
        if (retryCount.current < 3) {
          retryCount.current++;
          const delay = Math.pow(2, retryCount.current) * 1000; // 2s, 4s, 8s
          if (process.env.NODE_ENV === 'development') {
            console.log(`⏳ Retrying in ${delay/1000}s (attempt ${retryCount.current}/3)`);
          }
          setTimeout(pushAd, delay);
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Max retries reached for AdSense');
          }
          setHasError(true);
        }
      }
    } else {
      // Log more detailed info about why ad can't be pushed (only in development)
      if (process.env.NODE_ENV === 'development') {
        if (typeof window === 'undefined') {
          console.log('⚠️ Window not available (SSR)');
        } else if (!window.adsbygoogle) {
          console.log('⚠️ AdSense script not loaded yet');
        } else if (!adRef.current) {
          console.log('⚠️ Ad element ref not available');
        } else if (adPushed) {
          console.log('⚠️ Ad already pushed');
        }
      }
    }
  };

  useEffect(() => {
    if (isLoaded && !hasError && !adPushed) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📡 AdSense script loaded, initializing ad...');
      }
      // Small delay to ensure DOM is ready
      const timer = setTimeout(pushAd, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasError, adPushed]);

  const handleScriptLoad = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AdSense script loaded successfully');
    }
    setIsLoaded(true);
  };

  const handleScriptError = (e: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('AdSense script failed to load:', e);
    }
    setHasError(true);
  };

  // Don't render anything if there's an error or ad blocker
  if (hasError || adBlockerDetected) {
    // Show placeholder in development
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`w-full max-w-4xl mx-auto mb-6 ${className}`}>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
            <div className="text-xs text-red-400/60 text-center mb-2">
              {adBlockerDetected ? 'Ad Blocker Detectado' : 'AdSense Error'} - Modo Desarrollo
            </div>
            <div className="bg-red-800/20 h-24 flex items-center justify-center text-red-400 text-sm">
              {adBlockerDetected ? '🚫 Bloqueador de anuncios activo' : '❌ No se pudo cargar el anuncio'}
            </div>
            <div className="text-xs text-red-400/40 text-center mt-2">
              {adBlockerDetected 
                ? 'Desactiva el bloqueador para ver anuncios reales'
                : 'En producción se intentaría cargar un anuncio real aquí'
              }
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
            <div>Ad blocker: {adBlockerDetected ? '🚫 Detected' : '✅ Not detected'}</div>
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
