"use client";

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics, { trackPageView, trackTarotReading, trackPremiumAdEvent } from '@/lib/analytics';
import { GuestCookieManager, CookieConsent } from '@/lib/cookies';

// Component that uses useSearchParams wrapped in Suspense
function AnalyticsTracker({ pathname }: { pathname: string }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Determine content groups based on pathname
    let contentGroup1 = 'website';
    let contentGroup2 = 'general';
    
    if (pathname.includes('premium')) {
      contentGroup1 = 'premium_content';
    } else if (pathname.includes('seo')) {
      contentGroup1 = 'seo_content';
      contentGroup2 = pathname.split('/').pop() || 'general';
    } else if (pathname === '/') {
      contentGroup1 = 'homepage';
      contentGroup2 = 'main';
    }

    // Track to Google Analytics
    trackPageView({
      title: typeof document !== 'undefined' ? document.title : '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      content_group1: contentGroup1,
      content_group2: contentGroup2
    });

    // 🔥 TRACK PAGE VIEWS TO SUPABASE
    const trackPageViewToSupabase = async () => {
      try {
        // Only proceed if user has given consent
        if (!CookieConsent.hasConsent()) return;

        const guestIdentity = GuestCookieManager.getOrCreateGuestIdentity();
        
        console.log('[ANALYTICS_PROVIDER] Tracking page view:', {
          page: pathname,
          guest_id: guestIdentity.guest_id
        });

        await fetch('/api/analytics/advanced-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guest_id: guestIdentity.guest_id,
            event_type: 'page_view',
            event_data: {
              page: pathname,
              content_group1: contentGroup1,
              content_group2: contentGroup2,
              url_params: searchParams.toString(),
              session_id: guestIdentity.session_id,
              visit_count: guestIdentity.visit_count
            },
            page_url: typeof window !== 'undefined' ? window.location.href : ''
          })
        }).catch(error => {
          console.error('[ANALYTICS_PROVIDER] Error tracking page view:', error);
        });
      } catch (error) {
        console.error('[ANALYTICS_PROVIDER] Error in page view tracking:', error);
      }
    };

    trackPageViewToSupabase();

    // Track SEO page visits for analytics
    if (pathname.startsWith('/seo/')) {
      analytics.trackSearchBehavior({
        search_category: pathname.split('/').pop() || 'general',
        results_found: true,
        user_intent: 'informational',
        internal_search: false
      });
    }

  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    analytics.initializeGA4();
    analytics.setupAutomaticTracking();

    // 🔥 INITIALIZE GUEST TRACKING FOR SUPABASE
    const initializeGuestTracking = async () => {
      try {
        // Check if we need cookie consent (GDPR compliance)
        if (CookieConsent.needsConsent()) {
          CookieConsent.setConsent(true); // For now, assume consent
        }

        // Only proceed if user has given consent
        if (!CookieConsent.hasConsent()) return;

        // Get or create guest identity
        const guestIdentity = GuestCookieManager.getOrCreateGuestIdentity();
        
        console.log('[ANALYTICS_PROVIDER] Initializing guest tracking:', {
          guest_id: guestIdentity.guest_id,
          visit_count: guestIdentity.visit_count,
          is_returning: GuestCookieManager.isReturningGuest()
        });

        // Track session start to Supabase
        await fetch('/api/analytics/advanced-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guest_id: guestIdentity.guest_id,
            event_type: 'session_start',
            event_data: {
              entry_page: pathname,
              referrer: typeof document !== 'undefined' ? document.referrer : '',
              user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
              visit_count: guestIdentity.visit_count,
              is_returning_guest: GuestCookieManager.isReturningGuest(),
              session_id: guestIdentity.session_id,
              fingerprint_id: guestIdentity.fingerprint_id
            },
            page_url: typeof window !== 'undefined' ? window.location.href : ''
          })
        }).catch(error => {
          console.error('[ANALYTICS_PROVIDER] Error tracking session start:', error);
        });

      } catch (error) {
        console.error('[ANALYTICS_PROVIDER] Error initializing guest tracking:', error);
      }
    };

    initializeGuestTracking();
  }, [pathname]);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker pathname={pathname} />
      </Suspense>
      {children}
    </>
  );
}

// Custom hooks for tracking specific events

export function useTrackTarotReading() {
  return (data: {
    reading_type: string;
    question_category: string;
    commercial_value: number;
    cards_count: number;
    session_duration?: number;
    user_satisfaction?: 'high' | 'medium' | 'low';
  }) => {
    trackTarotReading(data);
    
    // NOTA: Analytics internos ahora manejados por el sistema unificado
    // en /api/reading/generate - no duplicar aquí
  };
}

export function useTrackPremiumAd() {
  return (data: {
    event_type: 'impression' | 'click' | 'conversion';
    ad_category: string;
    estimated_revenue: number;
    targeting_applied: boolean;
    user_segment: string[];
  }) => {
    trackPremiumAdEvent(data);
    
    // Also track to our internal analytics
    fetch('/api/analytics/premium-ad-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        page_url: window.location.href
      })
    }).catch(console.error);
  };
}

export function useTrackSearch() {
  return (data: {
    search_term?: string;
    search_category: string;
    results_found: boolean;
    user_intent: 'informational' | 'navigational' | 'transactional';
    internal_search: boolean;
  }) => {
    analytics.trackSearchBehavior(data);
  };
}

export function useTrackConversion() {
  return (data: {
    event_name: string;
    currency?: string;
    value?: number;
    items?: Array<{
      item_id: string;
      item_name: string;
      category: string;
      price: number;
      quantity: number;
    }>;
  }) => {
    analytics.trackConversion(data);
  };
}
