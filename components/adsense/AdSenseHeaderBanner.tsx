"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useAdSense } from '@/hooks/useAdSense';

interface AdSenseHeaderBannerProps {
  className?: string;
}

export default function AdSenseHeaderBanner({ className = "" }: AdSenseHeaderBannerProps) {
  const { pushAd } = useAdSense();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isLoaded && !hasError) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        pushAd();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pushAd, isLoaded, hasError]);

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
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mb-6 ${className}`}>
      {/* Load AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4987669803086382"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      {/* AdSense Header Banner */}
      <div className="bg-black/20 rounded-lg p-4 border border-amber-500/20">
        <div className="text-xs text-amber-400/60 text-center mb-2">Publicidad</div>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4987669803086382"
          data-ad-slot="7298629760"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <div className="text-xs text-amber-400/40 text-center mt-2">
          Los anuncios nos ayudan a mantener Videntia gratuito
        </div>
      </div>
    </div>
  );
}
