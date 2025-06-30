/**
 * Cookie Management for Guest Analytics
 * Enhances FingerprintJS with persistent cookie tracking
 */

export interface GuestCookieData {
  guest_id: string;
  fingerprint_id?: string;
  first_visit: string; // ISO timestamp
  last_visit: string;
  visit_count: number;
  session_id?: string;
}

export class GuestCookieManager {
  private static readonly COOKIE_NAME = 'videntia_guest';
  private static readonly COOKIE_EXPIRY_DAYS = 365; // 1 year
  private static readonly SECURE_COOKIE_NAME = 'videntia_guest_secure';

  /**
   * Set guest cookie with data
   */
  static setGuestCookie(data: GuestCookieData): void {
    if (typeof window === 'undefined') return;

    const cookieValue = this.encodeGuestData(data);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.COOKIE_EXPIRY_DAYS);

    // Regular cookie (accessible from JS)
    document.cookie = `${this.COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

    // Send to server for httpOnly cookie
    this.setSecureCookie(data);
  }

  /**
   * Get guest cookie data
   */
  static getGuestCookie(): GuestCookieData | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const guestCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${this.COOKIE_NAME}=`)
    );

    if (!guestCookie) return null;

    const cookieValue = guestCookie.split('=')[1];
    return this.decodeGuestData(cookieValue);
  }

  /**
   * Update existing cookie with new data
   */
  static updateGuestCookie(updates: Partial<GuestCookieData>): void {
    const existing = this.getGuestCookie();
    if (!existing) return;

    const updated: GuestCookieData = {
      ...existing,
      ...updates,
      last_visit: new Date().toISOString(),
      visit_count: existing.visit_count + 1
    };

    this.setGuestCookie(updated);
  }

  /**
   * Generate new guest session
   */
  static createGuestSession(fingerprintId?: string): GuestCookieData {
    const now = new Date().toISOString();
    const guestId = this.generateGuestId();

    const data: GuestCookieData = {
      guest_id: guestId,
      fingerprint_id: fingerprintId,
      first_visit: now,
      last_visit: now,
      visit_count: 1,
      session_id: this.generateSessionId()
    };

    this.setGuestCookie(data);
    return data;
  }

  /**
   * Check if guest has visited before
   */
  static isReturningGuest(): boolean {
    const cookie = this.getGuestCookie();
    return cookie !== null && cookie.visit_count > 1;
  }

  /**
   * Get or create guest identity
   */
  static getOrCreateGuestIdentity(fingerprintId?: string): GuestCookieData {
    const existing = this.getGuestCookie();
    
    if (!existing) {
      return this.createGuestSession(fingerprintId);
    }

    // Update with fingerprint if not present
    if (fingerprintId && !existing.fingerprint_id) {
      existing.fingerprint_id = fingerprintId;
    }

    // Update visit data
    this.updateGuestCookie({
      session_id: this.generateSessionId()
    });

    return this.getGuestCookie()!;
  }

  /**
   * Clear guest cookies (for GDPR compliance)
   */
  static clearGuestCookies(): void {
    if (typeof window === 'undefined') return;

    document.cookie = `${this.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
    // Also clear from server
    fetch('/api/guest/clear-cookies', { method: 'POST' });
  }

  // Private helper methods
  private static encodeGuestData(data: GuestCookieData): string {
    return btoa(JSON.stringify(data));
  }

  private static decodeGuestData(encoded: string): GuestCookieData | null {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return null;
    }
  }

  private static generateGuestId(): string {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static async setSecureCookie(data: GuestCookieData): Promise<void> {
    try {
      await fetch('/api/guest/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.warn('Failed to set secure cookie:', error);
    }
  }
}

/**
 * Cookie consent management
 */
export class CookieConsent {
  private static readonly CONSENT_COOKIE = 'videntia_consent';

  static hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    
    const consent = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith(`${this.CONSENT_COOKIE}=`));
    
    return consent?.split('=')[1] === 'accepted';
  }

  static setConsent(accepted: boolean): void {
    if (typeof window === 'undefined') return;

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    document.cookie = `${this.CONSENT_COOKIE}=${accepted ? 'accepted' : 'declined'}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  static needsConsent(): boolean {
    if (typeof window === 'undefined') return false;
    
    const consent = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith(`${this.CONSENT_COOKIE}=`));
    
    return !consent;
  }
}
