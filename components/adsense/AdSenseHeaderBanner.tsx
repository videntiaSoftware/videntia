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
  
  // Get AdSense configuration from environment variables
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4987669803086382';
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_UNIT_ID || '7298629760';

  // Detectar bloqueador de anuncios y empujar el anuncio
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
      if (process.env.NODE_ENV === 'development') {
        console.log('🔵 AdSense Component Mounted. Initializing...');
      }
      detectAdBlocker();
      // Directamente intentar empujar el anuncio. La función ya tiene reintentos.
      pushAd();
    }
  }, []);

  const pushAd = () => {
    if (adPushed) {
      if (process.env.NODE_ENV === 'development') console.log('🔵 Ad already pushed, skipping.');
      return;
    }

    if (typeof window === 'undefined') {
      if (process.env.NODE_ENV === 'development') console.log('🔵 window is not defined, skipping ad push (SSR).');
      return;
    }

    if (!adRef.current) {
      if (process.env.NODE_ENV === 'development') console.log('🟡 adRef is not available yet, will retry...');
      setTimeout(pushAd, 200); // Reintentar pronto
      return;
    }

    if (!window.adsbygoogle) {
      if (process.env.NODE_ENV === 'development') console.warn('🟡 window.adsbygoogle not available yet, will retry...');
      setTimeout(pushAd, 500); // Reintentar después de una pausa
      return;
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Attempting to push AdSense ad...');
      }
      
      const adElement = adRef.current;
      const existingStatus = adElement.getAttribute('data-adsbygoogle-status');
      
      if (existingStatus) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`⚠️ Ad already initialized with status: ${existingStatus}.`);
        }
        setAdPushed(true);
        return;
      }
      
      console.log('🟢 Pushing ad to window.adsbygoogle');
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdPushed(true);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ AdSense ad pushed successfully.');
      }
      
      setTimeout(() => {
        const status = adElement.getAttribute('data-adsbygoogle-status');
        if (process.env.NODE_ENV === 'development') {
          console.log(`📊 Ad status after 3s: ${status || 'unknown'}`);
          if (!status) {
            console.log('💡 Tip: If status is unknown, the ad might have been blocked or failed to fill.');
          }
        }
      }, 3000);
      
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error pushing AdSense ad:', error);
        if (error.message && error.message.includes('Content Security Policy')) {
          console.error('🚨 CSP Error detected. Check your Content Security Policy configuration.');
        }
      }
      
      if (retryCount.current < 3) {
        retryCount.current++;
        const delay = Math.pow(2, retryCount.current) * 1000;
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏳ Retrying in ${delay/1000}s (attempt ${retryCount.current}/3)`);
        }
        setTimeout(pushAd, delay);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Max retries reached for AdSense.');
        }
        setHasError(true);
      }
    }
  };

  const handleScriptLoad = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ AdSense script loaded successfully via Next/Script.');
    }
    setIsLoaded(true);
  };

  const handleScriptError = (e: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ AdSense script failed to load via Next/Script:', e);
    }
    setHasError(true);
  };

  // Don't render anything if there's an error or ad blocker (except in development)
  if (hasError || adBlockerDetected) {
    // Show compact placeholder in development
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`w-full max-w-4xl mx-auto mb-2 ${className}`}>
          <div className="bg-red-900/10 rounded p-2 border border-red-500/20">
            <div className="text-xs text-red-400/60 text-center">
              {adBlockerDetected ? '🚫 Ad Blocker' : '❌ AdSense Error'} (Dev)
            </div>
          </div>
        </div>
      );
    }
    // In production, silently fail
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mb-3 ${className}`}>
      {/* Load AdSense Script */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      {/* AdSense Header Banner - Compact Design */}
      <div className="bg-black/10 rounded-lg p-3 border border-amber-500/10">
        <div className="text-xs text-amber-400/50 text-center mb-1">Publicidad</div>
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '50px', maxHeight: '90px' }}
          data-ad-client={clientId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        
        {/* Placeholder and status for development - COMPACT VERSION */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-1">
            {!adPushed && !hasError && !adBlockerDetected && (
              <div className="bg-amber-900/10 h-8 flex items-center justify-center text-amber-400 text-xs border border-amber-500/20 rounded">
                🎯 Cargando AdSense...
              </div>
            )}
            
            {/* Compact status indicators in a single line */}
            <div className="flex justify-center items-center space-x-3 text-xs text-amber-400/30 mt-1">
              <span title="Script Status">{isLoaded ? '✅ Script' : '⏳ Script'}</span>
              <span title="Ad Push Status">{adPushed ? '✅ Pushed' : '📭 Pending'}</span>
              <span title="Ad Blocker">{adBlockerDetected ? '🚫 Blocked' : '✅ Clear'}</span>
              {hasError && <span className="text-red-400" title="Error">❌ Error</span>}
            </div>
            
            {/* Only show IDs if there's an issue */}
            {(hasError || !adPushed) && (
              <div className="text-xs text-amber-400/20 text-center mt-1">
                Client: {clientId.slice(-6)} | Slot: {adSlot}
              </div>
            )}
          </div>
        )}
        
        <div className="text-xs text-amber-400/30 text-center mt-1">
          Los anuncios nos ayudan a mantener Videntia gratuito
        </div>
      </div>
    </div>
  );
}
