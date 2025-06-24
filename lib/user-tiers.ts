/**
 * User Tier Management System
 * Defines the 3-tier system: guest, free, premium
 */

export type UserTier = 'guest' | 'free' | 'premium';

export interface UserTierLimits {
  dailyReadings: number;
  premiumReadings: string[]; // Types of readings exclusive to this tier
  canSaveHistory: boolean;
  adsRequired: boolean;
  maxStoredReadings: number;
  canAccessProfile: boolean;
  canCustomizeExperience: boolean;
}

export const USER_TIER_LIMITS: Record<UserTier, UserTierLimits> = {
  guest: {
    dailyReadings: 1,
    premiumReadings: [],
    canSaveHistory: false,
    adsRequired: false, // Guests don't see ads, just limited access
    maxStoredReadings: 0,
    canAccessProfile: false,
    canCustomizeExperience: false,
  },
  free: {
    dailyReadings: 3,
    premiumReadings: [],
    canSaveHistory: true,
    adsRequired: true, // Free users can watch ads for extra readings
    maxStoredReadings: 50,
    canAccessProfile: true,
    canCustomizeExperience: true,
  },
  premium: {
    dailyReadings: -1, // Unlimited
    premiumReadings: ['celtic_cross'], // Exclusive access to Celtic Cross
    canSaveHistory: true,
    adsRequired: false,
    maxStoredReadings: -1, // Unlimited
    canAccessProfile: true,
    canCustomizeExperience: true,
  },
};

export const PREMIUM_EXCLUSIVE_READINGS = ['celtic_cross'];

/**
 * Determines user tier based on authentication state and subscription
 */
export function getUserTier(user: any): UserTier {
  if (!user) return 'guest';
  if (user.user_metadata?.premium === true) return 'premium';
  return 'free';
}

/**
 * Gets the limits for a specific user tier
 */
export function getTierLimits(tier: UserTier): UserTierLimits {
  return USER_TIER_LIMITS[tier];
}

/**
 * Checks if a user can perform a specific reading type
 */
export function canAccessReadingType(tier: UserTier, readingType: string): boolean {
  const limits = getTierLimits(tier);
  
  // Check if reading type is premium-exclusive
  if (PREMIUM_EXCLUSIVE_READINGS.includes(readingType)) {
    return tier === 'premium';
  }
  
  return true;
}

/**
 * Checks if user has reached daily reading limit
 */
export function hasReachedDailyLimit(tier: UserTier, todayReadings: number): boolean {
  const limits = getTierLimits(tier);
  
  // -1 means unlimited
  if (limits.dailyReadings === -1) return false;
  
  return todayReadings >= limits.dailyReadings;
}

/**
 * Gets additional readings available through ads (free tier only)
 */
export function getAdBonusReadings(tier: UserTier, adsWatched: number): number {
  if (tier !== 'free') return 0;
  
  // Free users can get 1 extra reading per ad watched, max 2 ads per day
  return Math.min(adsWatched, 2);
}

/**
 * Calculates total daily readings available including ad bonuses
 */
export function getTotalDailyReadings(tier: UserTier, adsWatched: number = 0): number {
  const limits = getTierLimits(tier);
  
  if (limits.dailyReadings === -1) return -1; // Unlimited
  
  return limits.dailyReadings + getAdBonusReadings(tier, adsWatched);
}

/**
 * Premium subscription pricing
 */
export const PREMIUM_PRICING = {
  monthly: {
    usd: 1.99,
    ars: 2000,
    currency: 'USD',
  },
  yearly: {
    usd: 19.99,
    ars: 20000,
    currency: 'USD',
  },
};

/**
 * Benefits text for each tier
 */
export const TIER_BENEFITS = {
  guest: [
    '1 lectura gratuita por día',
    'Acceso a lecturas básicas',
    'Sin registro requerido',
  ],
  free: [
    '3 lecturas por día',
    'Historial de lecturas guardado',
    'Perfil personalizable',
    'Lecturas adicionales viendo anuncios',
    'Todas las lecturas excepto Cruz Celta',
  ],
  premium: [
    'Lecturas ilimitadas',
    'Acceso a Cruz Celta exclusiva',
    'Sin anuncios',
    'Historial ilimitado',
    'Soporte prioritario',
    'Funciones futuras incluidas',
  ],
};
