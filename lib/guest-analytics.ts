/**
 * GUEST ANALYTICS SYSTEM
 * Sistema completo de tracking y analytics para usuarios invitados
 */

// Import dependencies with any fallbacks for missing implementations
declare const GuestCookieManager: any;
declare function trackGuestEvent(data: any): Promise<any>;
declare function trackGuestReading(data: any): Promise<any>;

export interface GuestProfile {
  guestId: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  
  // Device & Browser Info
  initialUserAgent: string;
  initialIpAddress: string;
  initialReferrer?: string;
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
  viewportSize: string;
  timezone: string;
  language: string;
  colorDepth: number;
  pixelRatio: number;
  
  // Location Info
  countryCode?: string;
  countryName?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  
  // Behavior Metrics
  totalSessions: number;
  totalPageViews: number;
  totalReadings: number;
  totalQuestionsAsked: number;
  
  // Conversion
  registeredAt?: Date;
  registeredUserId?: string;
  
  // Security Analysis
  isBotSuspected: boolean;
  fingerprintConfidence: number;
  
  customData: Record<string, any>;
}

export interface GuestSession {
  id: string;
  guestId: string;
  sessionId: string;
  startedAt: Date;
  endedAt?: Date;
  durationSeconds?: number;
  
  // Entry Info
  entryPage: string;
  entryReferrer?: string;
  entryUtmSource?: string;
  entryUtmMedium?: string;
  entryUtmCampaign?: string;
  
  // Technical Info
  ipAddress: string;
  userAgent: string;
  viewportSize: string;
  
  // Activity Metrics
  pageViews: number;
  readingsPerformed: number;
  questionsAsked: number;
  cardsSelected: number;
  
  // Exit Info
  exitPage?: string;
  bounce: boolean;
  
  // Behavior Analysis
  mouseMovementsDetected: boolean;
  keyboardInteractions: number;
  scrollDepthPercentage: number;
  timeToFirstInteractionMs?: number;
}

export interface GuestEvent {
  id: string;
  guestId: string;
  sessionId: string;
  eventType: string;
  eventName: string;
  pageUrl: string;
  timestamp: Date;
  sequenceNumber: number;
  eventData: Record<string, any>;
  clientTimestamp: Date;
  serverProcessingTimeMs: number;
}

export interface GuestReadingPattern {
  id: string;
  guestId: string;
  readingType: string;
  questionAsked: string;
  questionLength: number;
  questionLanguage: string;
  cardsSelected: any[];
  selectionTimeSeconds: number;
  cardsHovered: number;
  cardsClickedBeforeFinal: number;
  readingTimeSeconds: number;
  interpretationGenerated: string;
  userSatisfactionInferred: 'high' | 'medium' | 'low';
  timeOfDay: number;
  dayOfWeek: number;
}

export interface GuestGeolocation {
  id: string;
  guestId: string;
  ipAddress: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  regionName: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  ispName: string;
  organization: string;
  connectionType: string;
  isProxy: boolean;
  isVpn: boolean;
  isTor: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  timezone: string;
  utcOffset: string;
  firstSeen: Date;
  lastSeen: Date;
  timesSeen: number;
}

/**
 * Detecta información del dispositivo y navegador
 */
export function detectDeviceInfo(): Partial<GuestProfile> {
  if (typeof window === 'undefined') return {};
  
  const ua = navigator.userAgent;
  const screen = window.screen;
  
  // Detectar browser
  let browserName = 'Unknown';
  let browserVersion = '';
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browserName = 'Chrome';
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Firefox')) {
    browserName = 'Firefox';
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browserName = 'Safari';
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Edg')) {
    browserName = 'Edge';
    browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || '';
  }
  
  // Detectar OS
  let osName = 'Unknown';
  let osVersion = '';
  
  if (ua.includes('Windows NT')) {
    osName = 'Windows';
    osVersion = ua.match(/Windows NT ([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('Mac OS X')) {
    osName = 'macOS';
    osVersion = ua.match(/Mac OS X ([0-9._]+)/)?.[1]?.replace(/_/g, '.') || '';
  } else if (ua.includes('Linux')) {
    osName = 'Linux';
  } else if (ua.includes('Android')) {
    osName = 'Android';
    osVersion = ua.match(/Android ([0-9.]+)/)?.[1] || '';
  } else if (ua.includes('iPhone OS') || ua.includes('iPad')) {
    osName = 'iOS';
    osVersion = ua.match(/OS ([0-9._]+)/)?.[1]?.replace(/_/g, '.') || '';
  }
  
  // Detectar tipo de dispositivo
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/Mobi|Android/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/Tablet|iPad/i.test(ua)) {
    deviceType = 'tablet';
  }
  
  return {
    initialUserAgent: ua,
    browserName,
    browserVersion,
    osName,
    osVersion,
    deviceType,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
  };
}

/**
 * Detecta información UTM de la URL
 */
export function extractUtmParameters(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    utmTerm: urlParams.get('utm_term') || undefined,
    utmContent: urlParams.get('utm_content') || undefined,
  };
}

/**
 * Genera un ID único para la sesión
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Detecta idioma de un texto
 */
export function detectLanguage(text: string): string {
  // Detección básica por patrones comunes
  const spanishPattern = /\b(el|la|los|las|un|una|de|del|en|con|por|para|que|y|es|está|son|están|como|qué|cómo|cuándo|dónde|por qué)\b/gi;
  const englishPattern = /\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|is|are|was|were|what|how|when|where|why)\b/gi;
  const portuguesePattern = /\b(o|a|os|as|um|uma|de|do|da|em|com|por|para|que|e|é|está|são|estão|como|que|como|quando|onde|por que)\b/gi;
  
  const spanishMatches = (text.match(spanishPattern) || []).length;
  const englishMatches = (text.match(englishPattern) || []).length;
  const portugueseMatches = (text.match(portuguesePattern) || []).length;
  
  if (spanishMatches > englishMatches && spanishMatches > portugueseMatches) {
    return 'es';
  } else if (englishMatches > spanishMatches && englishMatches > portugueseMatches) {
    return 'en';
  } else if (portugueseMatches > spanishMatches && portugueseMatches > englishMatches) {
    return 'pt';
  }
  
  return 'unknown';
}

/**
 * Calcula satisfacción del usuario basado en tiempo de lectura
 */
export function inferUserSatisfaction(
  readingTimeSeconds: number,
  interpretationLength: number
): 'high' | 'medium' | 'low' {
  // Estimación: 200 palabras por minuto de lectura
  const avgWordsPerSecond = 200 / 60;
  const estimatedReadingTime = interpretationLength / avgWordsPerSecond;
  
  const readingRatio = readingTimeSeconds / estimatedReadingTime;
  
  if (readingRatio > 0.8) return 'high';
  if (readingRatio > 0.4) return 'medium';
  return 'low';
}

/**
 * Analiza patrones de comportamiento sospechoso
 */
export function analyzeBehaviorPatterns(events: GuestEvent[]): {
  isBotSuspected: boolean;
  reasons: string[];
  confidence: number;
} {
  const reasons: string[] = [];
  let suspicionScore = 0;
  
  // Análisis de velocidad
  const pageViews = events.filter(e => e.eventType === 'page_view');
  if (pageViews.length > 1) {
    const averageTimePerPage = pageViews.reduce((acc, event, index) => {
      if (index === 0) return acc;
      const timeDiff = event.timestamp.getTime() - pageViews[index - 1].timestamp.getTime();
      return acc + timeDiff;
    }, 0) / (pageViews.length - 1);
    
    if (averageTimePerPage < 3000) { // Menos de 3 segundos por página
      suspicionScore += 30;
      reasons.push('Navegación extremadamente rápida');
    }
  }
  
  // Análisis de patrones regulares
  const intervals = events.slice(1).map((event, index) => 
    event.timestamp.getTime() - events[index].timestamp.getTime()
  );
  
  const intervalVariance = intervals.reduce((sum, interval) => {
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return sum + Math.pow(interval - avg, 2);
  }, 0) / intervals.length;
  
  if (intervalVariance < 1000 && intervals.length > 5) { // Patrones muy regulares
    suspicionScore += 25;
    reasons.push('Patrones de tiempo muy regulares');
  }
  
  // Análisis de interacciones
  const interactionEvents = events.filter(e => 
    ['card_select', 'question_ask', 'reading_request'].includes(e.eventType)
  );
  
  if (interactionEvents.length > 0 && pageViews.length > 0) {
    const interactionRatio = interactionEvents.length / pageViews.length;
    if (interactionRatio > 2) { // Demasiadas interacciones por página vista
      suspicionScore += 20;
      reasons.push('Ratio anormal de interacciones');
    }
  }
  
  const confidence = Math.min(suspicionScore / 100, 1);
  const isBotSuspected = suspicionScore > 50;
  
  return { isBotSuspected, reasons, confidence };
}

/**
 * Obtiene información de geolocalización por IP (mock - requiere servicio real)
 */
export async function getGeolocationByIP(ipAddress: string): Promise<Partial<GuestGeolocation>> {
  // En producción, usar servicios como:
  // - MaxMind GeoIP2
  // - IPStack
  // - IP2Location
  // - IPGeolocation
  
  // Mock para desarrollo
  if (process.env.NODE_ENV === 'development') {
    return {
      countryCode: 'AR',
      countryName: 'Argentina',
      regionCode: 'BA',
      regionName: 'Buenos Aires',
      city: 'Buenos Aires',
      latitude: -34.6118,
      longitude: -58.3960,
      timezone: 'America/Argentina/Buenos_Aires',
      utcOffset: '-03:00',
      ispName: 'Example ISP',
      connectionType: 'broadband',
      isProxy: false,
      isVpn: false,
      isTor: false,
      threatLevel: 'low',
    };
  }
  
  // Implementar llamada real al servicio de geolocalización
  return {};
}

/**
 * Valida calidad del fingerprint
 */
export function validateFingerprintQuality(
  deviceInfo: Partial<GuestProfile>,
  browserFeatures: Record<string, any>
): number {
  let qualityScore = 0;
  
  // Factores que aumentan la confianza del fingerprint
  if (deviceInfo.screenResolution) qualityScore += 10;
  if (deviceInfo.timezone) qualityScore += 15;
  if (deviceInfo.language) qualityScore += 10;
  if (deviceInfo.colorDepth) qualityScore += 5;
  if (deviceInfo.pixelRatio && deviceInfo.pixelRatio !== 1) qualityScore += 10;
  
  // Canvas fingerprinting (si está disponible)
  if (browserFeatures.canvasFingerprint) qualityScore += 20;
  
  // WebGL fingerprinting (si está disponible)
  if (browserFeatures.webglFingerprint) qualityScore += 15;
  
  // Audio context fingerprinting (si está disponible)
  if (browserFeatures.audioFingerprint) qualityScore += 10;
  
  // Plugin/extension detection
  if (browserFeatures.plugins) qualityScore += 5;
  
  return Math.min(qualityScore / 100, 1);
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
    
    // Track the event with both cookie and fingerprint data
    await trackGuestEvent({
      guest_id: guestIdentity.guest_id,
      session_id: guestIdentity.session_id || generateSessionId(),
      event_type: data.event_type,
      event_data: {
        ...data.event_data,
        fingerprint_id: guestIdentity.fingerprint_id,
        visit_count: guestIdentity.visit_count,
        is_returning_guest: GuestCookieManager.isReturningGuest(),
        first_visit: guestIdentity.first_visit
      },
      page_url: data.page_url
    });

    console.log('[ANALYTICS] Cookie-enhanced tracking:', {
      guest_id: guestIdentity.guest_id,
      event: data.event_type,
      returning: GuestCookieManager.isReturningGuest()
    });

  } catch (error) {
    console.error('[ANALYTICS] Cookie tracking error:', error);
    // Fallback to regular tracking
    await trackGuestEvent(data);
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
  
  await trackGuestReading({
    guest_id: guestIdentity.guest_id,
    reading_type: readingData.reading_type,
    question_asked: readingData.question,
    cards_selected: readingData.cards_selected,
    // Enhanced data from cookies
    visit_count: guestIdentity.visit_count,
    days_since_first_visit: calculateDaysSince(guestIdentity.first_visit),
    is_returning_guest: GuestCookieManager.isReturningGuest()
  });
}

function calculateDaysSince(dateString: string): number {
  const firstVisit = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - firstVisit.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
