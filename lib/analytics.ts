// Google Analytics 4 and Search Console Integration
// Advanced tracking for SEO and monetization optimization

import { seoConfig } from './seo';

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface ConversionEvent {
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
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics 4 Configuration
export const GA4_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  enableDebugMode: process.env.NODE_ENV === 'development',
  anonymizeIP: true,
  cookieExpires: 63072000, // 2 years
  customDimensions: {
    user_type: 'custom_parameter_1',
    reading_type: 'custom_parameter_2',
    commercial_value: 'custom_parameter_3',
    question_category: 'custom_parameter_4',
    premium_eligible: 'custom_parameter_5'
  }
};

// Google Search Console Configuration
export const GSC_CONFIG = {
  siteUrl: seoConfig.siteUrl,
  verificationMeta: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  bingVerificationMeta: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
  yandexVerificationMeta: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || ''
};

/**
 * Initialize Google Analytics 4
 */
export function initializeGA4() {
  if (typeof window === 'undefined' || !GA4_CONFIG.measurementId.startsWith('G-')) {
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA4_CONFIG.measurementId, {
    anonymize_ip: GA4_CONFIG.anonymizeIP,
    cookie_expires: GA4_CONFIG.cookieExpires,
    debug_mode: GA4_CONFIG.enableDebugMode,
    send_page_view: false, // Manual page view tracking
    custom_map: GA4_CONFIG.customDimensions
  });

  // Enhanced measurement events
  gtag('config', GA4_CONFIG.measurementId, {
    enhanced_measurement: {
      scrolls: true,
      outbound_clicks: true,
      site_search: true,
      video_engagement: true,
      file_downloads: true
    }
  });

  console.log('[ANALYTICS] GA4 initialized:', GA4_CONFIG.measurementId);
}

/**
 * Track page views with enhanced data
 */
export function trackPageView(page: {
  title: string;
  url: string;
  referrer?: string;
  user_type?: 'guest' | 'premium';
  content_group1?: string; // e.g., "tarot_reading", "premium_content"
  content_group2?: string; // e.g., "love", "career", "money"
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: page.title,
    page_location: page.url,
    page_referrer: page.referrer,
    [GA4_CONFIG.customDimensions.user_type]: page.user_type || 'guest',
    content_group1: page.content_group1,
    content_group2: page.content_group2
  });
}

/**
 * Track tarot reading events for SEO insights
 */
export function trackTarotReading(data: {
  reading_type: string;
  question_category: string;
  commercial_value: number;
  cards_count: number;
  session_duration?: number;
  user_satisfaction?: 'high' | 'medium' | 'low';
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Track as custom event
  window.gtag('event', 'tarot_reading_completed', {
    event_category: 'tarot_engagement',
    [GA4_CONFIG.customDimensions.reading_type]: data.reading_type,
    [GA4_CONFIG.customDimensions.question_category]: data.question_category,
    [GA4_CONFIG.customDimensions.commercial_value]: data.commercial_value,
    cards_count: data.cards_count,
    session_duration: data.session_duration,
    user_satisfaction: data.user_satisfaction,
    value: Math.round(data.commercial_value * 10) // Convert to meaningful number
  });

  // Track engagement quality for SEO
  const engagementScore = calculateEngagementScore(data);
  window.gtag('event', 'user_engagement', {
    engagement_time_msec: (data.session_duration || 30) * 1000,
    engagement_score: engagementScore
  });
}

/**
 * Track conversion events (premium upgrades, high-value interactions)
 */
export function trackConversion(event: ConversionEvent) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', event.event_name, {
    currency: event.currency || 'USD',
    value: event.value || 0,
    items: event.items || []
  });

  // Track for Google Ads if applicable
  if (event.event_name === 'purchase' || event.event_name === 'premium_upgrade') {
    window.gtag('event', 'conversion', {
      send_to: `${GA4_CONFIG.measurementId}/premium_conversion`,
      value: event.value,
      currency: event.currency || 'USD'
    });
  }
}

/**
 * Track premium ad interactions for revenue optimization
 */
export function trackPremiumAdEvent(data: {
  event_type: 'impression' | 'click' | 'conversion';
  ad_category: string;
  estimated_revenue: number;
  targeting_applied: boolean;
  user_segment: string[];
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', `premium_ad_${data.event_type}`, {
    event_category: 'monetization',
    ad_category: data.ad_category,
    estimated_revenue: data.estimated_revenue,
    targeting_applied: data.targeting_applied,
    user_segments: data.user_segment.join(','),
    value: Math.round(data.estimated_revenue * 100) // Convert to cents
  });

  // Track high-value interactions separately
  if (data.estimated_revenue > 1.0) {
    window.gtag('event', 'high_value_ad_interaction', {
      event_category: 'premium_monetization',
      value: Math.round(data.estimated_revenue * 100)
    });
  }
}

/**
 * Track SEO-relevant search behavior
 */
export function trackSearchBehavior(data: {
  search_term?: string;
  search_category: string;
  results_found: boolean;
  user_intent: 'informational' | 'navigational' | 'transactional';
  internal_search: boolean;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: data.search_term,
    event_category: 'site_search',
    search_category: data.search_category,
    results_found: data.results_found,
    user_intent: data.user_intent,
    internal_search: data.internal_search
  });
}

/**
 * Track Core Web Vitals for SEO
 */
export function trackWebVitals() {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Track LCP, FID, CLS when available
  if ('web-vitals' in window) {
    const { getCLS, getFID, getLCP, getFCP, getTTFB } = (window as any)['web-vitals'];

    getCLS((metric: any) => {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        metric_name: 'CLS',
        metric_value: Math.round(metric.value * 1000),
        metric_delta: Math.round(metric.delta * 1000)
      });
    });

    getFID((metric: any) => {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        metric_name: 'FID',
        metric_value: Math.round(metric.value),
        metric_delta: Math.round(metric.delta)
      });
    });

    getLCP((metric: any) => {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        metric_name: 'LCP',
        metric_value: Math.round(metric.value),
        metric_delta: Math.round(metric.delta)
      });
    });

    getFCP((metric: any) => {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        metric_name: 'FCP',
        metric_value: Math.round(metric.value),
        metric_delta: Math.round(metric.delta)
      });
    });

    getTTFB((metric: any) => {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        metric_name: 'TTFB',
        metric_value: Math.round(metric.value),
        metric_delta: Math.round(metric.delta)
      });
    });
  }
}

/**
 * Track scroll depth for content engagement
 */
export function trackScrollDepth() {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              scroll_depth: milestone,
              page_location: window.location.href
            });
          }
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Calculate engagement score for analytics
 */
function calculateEngagementScore(data: {
  reading_type: string;
  commercial_value: number;
  cards_count: number;
  session_duration?: number;
  user_satisfaction?: string;
}): number {
  let score = 0;
  
  // Base score from commercial value
  score += data.commercial_value * 10;
  
  // Reading complexity bonus
  if (data.reading_type === 'cruz_celta') score += 30;
  else if (data.reading_type === 'tres_cartas') score += 20;
  else score += 10;
  
  // Session duration bonus
  if (data.session_duration) {
    if (data.session_duration > 300) score += 25; // 5+ minutes
    else if (data.session_duration > 120) score += 15; // 2+ minutes
    else if (data.session_duration > 60) score += 10; // 1+ minute
  }
  
  // User satisfaction bonus
  if (data.user_satisfaction === 'high') score += 20;
  else if (data.user_satisfaction === 'medium') score += 10;
  
  return Math.min(score, 100); // Cap at 100
}

/**
 * Enhanced ecommerce tracking for premium features
 */
export function trackEcommerce(data: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  coupon?: string;
  shipping?: number;
  tax?: number;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: data.transaction_id,
    value: data.value,
    currency: data.currency,
    items: data.items,
    coupon: data.coupon,
    shipping: data.shipping,
    tax: data.tax
  });
}

/**
 * Setup automatic tracking for common SEO events
 */
export function setupAutomaticTracking() {
  if (typeof window === 'undefined') return;

  // Track outbound links
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.hostname !== window.location.hostname) {
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'outbound_link',
          event_label: link.href,
          transport_type: 'beacon'
        });
      }
    }
  });

  // Track file downloads
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href) {
      const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar'];
      const hasFileExtension = fileExtensions.some(ext => link.href.toLowerCase().includes(ext));
      
      if (hasFileExtension) {
        if (window.gtag) {
          window.gtag('event', 'file_download', {
            event_category: 'downloads',
            event_label: link.href,
            transport_type: 'beacon'
          });
        }
      }
    }
  });

  // Setup scroll depth tracking
  trackScrollDepth();
  
  // Track Core Web Vitals
  trackWebVitals();
}

/**
 * Google Search Console API integration
 * Note: Requires server-side implementation for actual API calls
 */
export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  query?: string;
  page?: string;
  date: string;
}

export async function getSearchConsoleData(params: {
  startDate: string;
  endDate: string;
  dimensions?: ('query' | 'page' | 'country' | 'device' | 'searchAppearance')[];
  filters?: Array<{
    dimension: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'notContains';
    expression: string;
  }>;
}): Promise<SearchConsoleData[]> {
  try {
    const response = await fetch('/api/search-console/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Search Console data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('[SEARCH_CONSOLE] Error fetching data:', error);
    return [];
  }
}

/**
 * Submit URL to Google for indexing
 */
export async function submitUrlForIndexing(url: string): Promise<boolean> {
  try {
    const response = await fetch('/api/search-console/submit-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    return response.ok;
  } catch (error) {
    console.error('[SEARCH_CONSOLE] Error submitting URL:', error);
    return false;
  }
}

const analytics = {
  initializeGA4,
  trackPageView,
  trackTarotReading,
  trackConversion,
  trackPremiumAdEvent,
  trackSearchBehavior,
  trackWebVitals,
  trackScrollDepth,
  trackEcommerce,
  setupAutomaticTracking,
  getSearchConsoleData,
  submitUrlForIndexing,
  GA4_CONFIG,
  GSC_CONFIG
};

export default analytics;
