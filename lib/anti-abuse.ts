/**
 * Enhanced Anti-Abuse Protection System
 * Implements sophisticated detection and prevention of abuse
 */

export interface AbuseSuspicionLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  score: number; // 0-100, higher is more suspicious
}

export interface UserActivityPattern {
  sessionDuration: number;
  readingsRequested: number;
  timeSpentPerReading: number;
  repeatQuestions: number;
  deviceFingerprint: string;
  ipAddress: string;
  userAgent: string;
  timezoneOffset: number;
}

/**
 * Analyzes user behavior patterns to detect potential abuse
 */
export function analyzeUserBehavior(activity: UserActivityPattern): AbuseSuspicionLevel {
  let score = 0;
  const reasons: string[] = [];

  // Check for bot-like behavior (very fast readings)
  if (activity.timeSpentPerReading < 30000) { // Less than 30 seconds per reading
    score += 25;
    reasons.push('Unusually fast reading completion');
  }

  // Check for excessive requests in short time
  if (activity.readingsRequested > 10 && activity.sessionDuration < 300000) { // 10+ readings in 5 minutes
    score += 30;
    reasons.push('Excessive requests in short timeframe');
  }

  // Check for repeat questions (copy-paste behavior)
  if (activity.repeatQuestions > 3) {
    score += 20;
    reasons.push('Multiple identical questions detected');
  }

  // Check for suspicious user agent patterns
  if (isSuspiciousUserAgent(activity.userAgent)) {
    score += 15;
    reasons.push('Suspicious user agent detected');
  }

  // Check for timezone inconsistencies
  if (isTimezoneInconsistent(activity.timezoneOffset, activity.ipAddress)) {
    score += 10;
    reasons.push('Timezone/location mismatch');
  }

  // Determine suspicion level
  let level: AbuseSuspicionLevel['level'] = 'low';
  if (score >= 70) level = 'critical';
  else if (score >= 50) level = 'high';
  else if (score >= 30) level = 'medium';

  return { level, reasons, score };
}

/**
 * Rate limiting with exponential backoff
 */
export interface RateLimitResult {
  allowed: boolean;
  resetTime?: Date;
  remainingRequests?: number;
  waitTime?: number; // milliseconds to wait
}

export function checkRateLimit(
  identifier: string, 
  tier: 'guest' | 'free' | 'premium',
  currentRequests: number
): RateLimitResult {
  const limits = {
    guest: { max: 1, windowHours: 24 },
    free: { max: 3, windowHours: 24 },
    premium: { max: -1, windowHours: 24 }, // Unlimited
  };

  const limit = limits[tier];
  
  if (limit.max === -1) {
    return { allowed: true };
  }

  if (currentRequests >= limit.max) {
    const resetTime = new Date();
    resetTime.setHours(resetTime.getHours() + limit.windowHours);
    
    return {
      allowed: false,
      resetTime,
      remainingRequests: 0,
      waitTime: resetTime.getTime() - Date.now(),
    };
  }

  return {
    allowed: true,
    remainingRequests: limit.max - currentRequests,
  };
}

/**
 * Advanced suspicious pattern detection
 */
function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /requests/i,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

function isTimezoneInconsistent(timezoneOffset: number, ipAddress: string): boolean {
  // This would require IP geolocation service
  // For now, just check for common VPN indicators
  return false; // Placeholder implementation
}

/**
 * Device fingerprinting validation
 */
export function validateDeviceFingerprint(fingerprint: string, storedFingerprint?: string): boolean {
  if (!fingerprint || fingerprint.length < 10) return false;
  
  // If we have a stored fingerprint, check for consistency
  if (storedFingerprint && fingerprint !== storedFingerprint) {
    // Allow for minor variations due to browser updates, etc.
    const similarity = calculateSimilarity(fingerprint, storedFingerprint);
    return similarity > 0.8; // 80% similarity threshold
  }
  
  return true;
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * CAPTCHA challenge requirements based on suspicion level
 */
export function requiresCaptchaChallenge(suspicion: AbuseSuspicionLevel): boolean {
  return suspicion.level === 'high' || suspicion.level === 'critical';
}

export function getRequiredCaptchaType(suspicion: AbuseSuspicionLevel): 'recaptcha_v2' | 'recaptcha_v3' | 'hcaptcha' {
  if (suspicion.level === 'critical') return 'recaptcha_v2'; // Visible challenge
  return 'recaptcha_v3'; // Invisible challenge
}

/**
 * Honeypot field validation
 */
export function validateHoneypot(honeypotValue: string): boolean {
  // Honeypot fields should always be empty
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Question content analysis for spam detection
 */
export function analyzeQuestionContent(question: string): {
  isSpam: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  let isSpam = false;

  // Check for excessive links
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urls = question.match(urlPattern) || [];
  if (urls.length > 0) {
    isSpam = true;
    reasons.push('Contains URLs');
  }

  // Check for promotional keywords
  const spamKeywords = [
    'buy now', 'click here', 'free money', 'make money', 'business opportunity',
    'viagra', 'casino', 'poker', 'loan', 'credit card', 'investment',
  ];
  const lowerQuestion = question.toLowerCase();
  for (const keyword of spamKeywords) {
    if (lowerQuestion.includes(keyword)) {
      isSpam = true;
      reasons.push(`Contains spam keyword: ${keyword}`);
    }
  }

  // Check for excessive capitalization
  const caps = question.match(/[A-Z]/g) || [];
  const capsRatio = caps.length / question.length;
  if (capsRatio > 0.5 && question.length > 20) {
    isSpam = true;
    reasons.push('Excessive capitalization');
  }

  // Check for repeated characters
  if (/(.)\1{5,}/.test(question)) {
    isSpam = true;
    reasons.push('Excessive character repetition');
  }

  return { isSpam, reasons };
}

/**
 * Progressive punishment system
 */
export interface UserPunishment {
  type: 'warning' | 'slow_down' | 'temporary_ban' | 'permanent_ban';
  duration?: number; // milliseconds
  message: string;
}

export function calculatePunishment(
  suspicion: AbuseSuspicionLevel,
  previousViolations: number
): UserPunishment {
  const baseMultiplier = Math.pow(2, previousViolations); // Exponential increase
  
  if (suspicion.level === 'critical' || previousViolations >= 5) {
    return {
      type: 'permanent_ban',
      message: 'Tu cuenta ha sido suspendida permanentemente debido a actividad sospechosa.',
    };
  }
  
  if (suspicion.level === 'high' || previousViolations >= 3) {
    return {
      type: 'temporary_ban',
      duration: 24 * 60 * 60 * 1000 * baseMultiplier, // 24 hours base
      message: `Tu cuenta ha sido suspendida temporalmente. Podrás acceder nuevamente en ${baseMultiplier * 24} horas.`,
    };
  }
  
  if (suspicion.level === 'medium' || previousViolations >= 1) {
    return {
      type: 'slow_down',
      duration: 60 * 60 * 1000 * baseMultiplier, // 1 hour base
      message: `Por favor, espera ${baseMultiplier} hora(s) antes de hacer otra consulta.`,
    };
  }
  
  return {
    type: 'warning',
    message: 'Tu actividad está siendo monitoreada. Por favor, usa el servicio de manera responsable.',
  };
}
