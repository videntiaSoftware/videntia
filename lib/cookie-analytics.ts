/**
 * Enhanced Guest Analytics with Cookie Integration
 * Combina FingerprintJS con cookies para mejor tracking
 */

import { GuestCookieManager } from './cookies';

export interface CookieEnhancedGuestEvent {
  guest_id: string;
  session_id: string;
  event_type: string;
  event_data?: any;
  page_url?: string;
  fingerprint_id?: string;
  visit_count?: number;
  is_returning_guest?: boolean;
  first_visit?: string;
}

/**
 * Enhanced guest tracking with cookies
 */
export async function trackGuestWithCookies(data: {
  event_type: string;
  event_data?: any;
  page_url?: string;
  fingerprintId?: string;
}) {
  try {
    // Get enhanced guest identity from cookies
    const guestIdentity = GuestCookieManager.getOrCreateGuestIdentity(data.fingerprintId);
    
    // Prepare enhanced event data
    const enhancedEvent: CookieEnhancedGuestEvent = {
      guest_id: guestIdentity.guest_id,
      session_id: guestIdentity.session_id || generateCookieSessionId(),
      event_type: data.event_type,
      event_data: {
        ...data.event_data,
        fingerprint_id: guestIdentity.fingerprint_id,
        visit_count: guestIdentity.visit_count,
        is_returning_guest: GuestCookieManager.isReturningGuest(),
        first_visit: guestIdentity.first_visit
      },
      page_url: data.page_url
    };

    // Send to analytics API
    await sendGuestEventToAPI(enhancedEvent);

    console.log('[ANALYTICS] Cookie-enhanced tracking:', {
      guest_id: guestIdentity.guest_id,
      event: data.event_type,
      returning: GuestCookieManager.isReturningGuest()
    });

  } catch (error) {
    console.error('[ANALYTICS] Cookie tracking error:', error);
    // Fallback to basic tracking
    await sendBasicGuestEvent(data);
  }
}

/**
 * Track reading with enhanced cookie data
 */
export async function trackReadingWithCookies(readingData: {
  reading_type: string;
  question?: string;
  cards_selected?: any[];
  fingerprintId?: string;
}) {
  const guestIdentity = GuestCookieManager.getOrCreateGuestIdentity(readingData.fingerprintId);
  
  const enhancedReading = {
    guest_id: guestIdentity.guest_id,
    reading_type: readingData.reading_type,
    question_asked: readingData.question,
    cards_selected: readingData.cards_selected,
    // Enhanced data from cookies
    visit_count: guestIdentity.visit_count,
    days_since_first_visit: calculateDaysSince(guestIdentity.first_visit),
    is_returning_guest: GuestCookieManager.isReturningGuest(),
    session_id: guestIdentity.session_id
  };

  await sendReadingEventToAPI(enhancedReading);
}

/**
 * Send event to analytics API
 */
async function sendGuestEventToAPI(event: CookieEnhancedGuestEvent) {
  try {
    await fetch('/api/analytics/guest-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
  } catch (error) {
    console.error('Failed to send guest event:', error);
  }
}

/**
 * Send reading event to analytics API
 */
async function sendReadingEventToAPI(reading: any) {
  try {
    await fetch('/api/analytics/guest-reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reading)
    });
  } catch (error) {
    console.error('Failed to send reading event:', error);
  }
}

/**
 * Fallback for basic tracking without cookies
 */
async function sendBasicGuestEvent(data: any) {
  try {
    await fetch('/api/analytics/basic-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to send basic event:', error);
  }
}

/**
 * Calculate days since first visit
 */
function calculateDaysSince(dateString: string): number {
  const firstVisit = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - firstVisit.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Generate session ID for cookies
 */
function generateCookieSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get guest conversion funnel data
 */
export async function getGuestConversionFunnel(guestId: string) {
  try {
    const response = await fetch(`/api/analytics/conversion-funnel?guest_id=${guestId}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to get conversion funnel:', error);
    return null;
  }
}
