'use client';

import { useState, useEffect } from 'react';
import { GuestCookieManager } from '@/lib/cookies';
import { cn } from '@/lib/utils';

export default function CookieNotice() {
  const [showNotice, setShowNotice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the notice
    const noticeSeen = localStorage.getItem('cookie-notice-seen');
    if (!noticeSeen) {
      setShowNotice(true);
      
      // Sync with StepWelcome timing
      // Show after a brief delay to let welcome load
      setTimeout(() => {
        setIsVisible(true);
      }, 500);

      // Hide at exactly the same time as StepWelcome starts fading
      setTimeout(() => {
        setIsVisible(false);
        // Auto-accept after fade completes
        setTimeout(() => {
          localStorage.setItem('cookie-notice-seen', 'true');
          initializeCookiesIfNeeded();
          setShowNotice(false);
        }, 700); // Match the fade duration
      }, 3200); // Same timing as StepWelcome
    } else {
      // If they've seen the notice, initialize cookies
      initializeCookiesIfNeeded();
    }
  }, []);

  const initializeCookiesIfNeeded = () => {
    // Initialize analytics cookies if user hasn't explicitly seen this session
    if (!localStorage.getItem('analytics-initialized')) {
      localStorage.setItem('analytics-initialized', 'true');
    }
  };

  const hideNotice = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('cookie-notice-seen', 'true');
      initializeCookiesIfNeeded();
      setShowNotice(false);
    }, 700);
  };

  if (!showNotice) return null;

  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 transition-opacity duration-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="flex items-start gap-3">
        <span className="text-lg">🍪</span>
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Este sitio usa cookies para mejorar tu experiencia. 
            <strong> Continuar navegando implica tu consentimiento.</strong>
          </p>
          <a 
            href="/politica-privacidad" 
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline mt-1 inline-block"
          >
            Ver política de privacidad
          </a>
        </div>
        <button
          onClick={hideNotice}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none"
          aria-label="Cerrar aviso"
        >
          ×
        </button>
      </div>
    </div>
  );
}
