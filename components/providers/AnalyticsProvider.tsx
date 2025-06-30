"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics, { trackPageView, trackTarotReading, trackPremiumAdEvent } from '@/lib/analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize analytics on mount
    analytics.initializeGA4();
    analytics.setupAutomaticTracking();
  }, []);

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

    trackPageView({
      title: document.title,
      url: window.location.href,
      referrer: document.referrer,
      content_group1: contentGroup1,
      content_group2: contentGroup2
    });

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

  return <>{children}</>;
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
