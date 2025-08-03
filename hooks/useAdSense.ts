import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function useAdSense() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const initializeAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isInitialized.current = true;
        }
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    };

    // Add a small delay to ensure the ad container is in the DOM
    const timeoutId = setTimeout(initializeAd, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const pushAd = () => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense push error:', error);
    }
  };

  return { pushAd };
}
