/**
 * Advertisement System for Free Tier Users
 * Allows free users to watch ads for additional readings
 */

export interface AdProvider {
  id: string;
  name: string;
  type: 'banner' | 'interstitial' | 'rewarded_video';
  enabled: boolean;
  testMode: boolean;
}

export interface AdReward {
  type: 'extra_reading' | 'premium_trial' | 'feature_unlock';
  value: number;
  expiresAt?: Date;
}

export interface AdSession {
  id: string;
  userId: string;
  adProviderId: string;
  startedAt: Date;
  completedAt?: Date;
  reward?: AdReward;
  verified: boolean;
}

/**
 * Ad providers configuration
 */
export const AD_PROVIDERS: AdProvider[] = [
  {
    id: 'google_adsense',
    name: 'Google AdSense',
    type: 'banner',
    enabled: true,
    testMode: process.env.NODE_ENV !== 'production',
  },
  {
    id: 'unity_ads',
    name: 'Unity Ads',
    type: 'rewarded_video',
    enabled: true,
    testMode: process.env.NODE_ENV !== 'production',
  },
];

/**
 * Ad reward configuration
 */
export const AD_REWARDS = {
  extra_reading: {
    type: 'extra_reading' as const,
    value: 1,
    maxPerDay: 2, // Max 2 extra readings per day via ads
  },
  premium_trial: {
    type: 'premium_trial' as const,
    value: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    maxPerWeek: 1, // Once per week
  },
};

/**
 * Check if user can watch an ad for reward
 */
export function canWatchAdForReward(
  rewardType: keyof typeof AD_REWARDS,
  todayAdsWatched: number,
  weekAdsWatched: number
): { allowed: boolean; reason?: string } {
  const reward = AD_REWARDS[rewardType];
  
  if (rewardType === 'extra_reading') {
    const extraReadingReward = reward as typeof AD_REWARDS.extra_reading;
    if (todayAdsWatched >= extraReadingReward.maxPerDay) {
      return {
        allowed: false,
        reason: `Ya has visto el máximo de ${extraReadingReward.maxPerDay} anuncios hoy para lecturas adicionales.`,
      };
    }
  }
  
  if (rewardType === 'premium_trial') {
    const premiumTrialReward = reward as typeof AD_REWARDS.premium_trial;
    if (weekAdsWatched >= premiumTrialReward.maxPerWeek) {
      return {
        allowed: false,
        reason: 'Ya has usado tu prueba premium gratuita esta semana.',
      };
    }
  }
  
  return { allowed: true };
}

/**
 * Generate ad session for tracking
 */
export function createAdSession(userId: string, providerId: string): AdSession {
  return {
    id: generateAdSessionId(),
    userId,
    adProviderId: providerId,
    startedAt: new Date(),
    verified: false,
  };
}

/**
 * Verify ad completion and assign reward
 */
export function verifyAdCompletion(
  session: AdSession,
  rewardType: keyof typeof AD_REWARDS
): AdSession {
  const reward = AD_REWARDS[rewardType];
  const completedSession: AdSession = {
    ...session,
    completedAt: new Date(),
    verified: true,
    reward: {
      type: reward.type,
      value: reward.value,
      expiresAt: rewardType === 'extra_reading' 
        ? getEndOfDay() 
        : new Date(Date.now() + reward.value),
    },
  };
  
  return completedSession;
}

/**
 * Get available ad providers for user
 */
export function getAvailableAdProviders(userTier: string): AdProvider[] {
  if (userTier === 'premium') return []; // Premium users don't see ads
  
  return AD_PROVIDERS.filter(provider => provider.enabled);
}

/**
 * Generate ad content HTML
 */
export function generateAdContent(provider: AdProvider): string {
  switch (provider.id) {
    case 'google_adsense':
      return generateGoogleAdSenseAd();
    case 'unity_ads':
      return generateUnityAd();
    default:
      return generatePlaceholderAd();
  }
}

function generateGoogleAdSenseAd(): string {
  const adUnitId = process.env.NEXT_PUBLIC_ADSENSE_AD_UNIT_ID || 'ca-pub-test';
  
  return `
    <div class="ad-container bg-amber-50 dark:bg-slate-800 rounded-lg p-4 border border-amber-200 dark:border-slate-600">
      <div class="text-xs text-amber-600 dark:text-amber-400 mb-2 text-center">Publicidad</div>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adUnitId}" crossorigin="anonymous"></script>
      <ins class="adsbygoogle"
           style="display:block; text-align:center;"
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="${adUnitId}"
           data-ad-slot="1234567890"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  `;
}

function generateUnityAd(): string {
  return `
    <div class="ad-container bg-gradient-to-r from-purple-100 to-amber-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-purple-200 dark:border-slate-600">
      <div class="text-center">
        <div class="text-xs text-purple-600 dark:text-purple-400 mb-3">Anuncio - Ve el video completo para obtener una lectura adicional</div>
        <div class="bg-black rounded-lg aspect-video mb-4 flex items-center justify-center">
          <div class="text-white text-sm">📺 Video Publicitario</div>
        </div>
        <button 
          id="watch-video-ad"
          class="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all"
          onclick="playRewardedVideo()"
        >
          ▶️ Ver Anuncio (30s)
        </button>
      </div>
    </div>
  `;
}

function generatePlaceholderAd(): string {
  return `
    <div class="ad-container bg-amber-50 dark:bg-slate-800 rounded-lg p-8 border border-amber-200 dark:border-slate-600">
      <div class="text-center">
        <div class="text-xs text-amber-600 dark:text-amber-400 mb-4">Espacio Publicitario</div>
        <div class="w-full h-32 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center">
          <span class="text-amber-800 dark:text-slate-300 font-semibold">Anuncio - 300x250</span>
        </div>
        <div class="mt-4 text-xs text-amber-600 dark:text-amber-400">
          Los anuncios ayudan a mantener Videntia gratuito
        </div>
      </div>
    </div>
  `;
}

/**
 * Ad interaction tracking
 */
export interface AdInteraction {
  sessionId: string;
  event: 'view' | 'click' | 'complete' | 'close' | 'error';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export function trackAdInteraction(
  sessionId: string,
  event: AdInteraction['event'],
  metadata?: Record<string, any>
): AdInteraction {
  return {
    sessionId,
    event,
    timestamp: new Date(),
    metadata,
  };
}

/**
 * Ad performance metrics
 */
export interface AdMetrics {
  impressions: number;
  clicks: number;
  completions: number;
  ctr: number; // Click-through rate
  completionRate: number;
  revenue: number;
}

export function calculateAdMetrics(interactions: AdInteraction[]): AdMetrics {
  const impressions = interactions.filter(i => i.event === 'view').length;
  const clicks = interactions.filter(i => i.event === 'click').length;
  const completions = interactions.filter(i => i.event === 'complete').length;
  
  return {
    impressions,
    clicks,
    completions,
    ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
    completionRate: impressions > 0 ? (completions / impressions) * 100 : 0,
    revenue: completions * 0.01, // $0.01 per completion (example)
  };
}

/**
 * Utility functions
 */
function generateAdSessionId(): string {
  return `ad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getEndOfDay(): Date {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Client-side ad integration scripts
 */
export const AD_SCRIPTS = {
  rewardedVideo: `
    function playRewardedVideo() {
      const button = document.getElementById('watch-video-ad');
      if (button) {
        button.disabled = true;
        button.textContent = '⏳ Cargando...';
        
        // Simulate video ad
        setTimeout(() => {
          button.textContent = '▶️ Reproduciendo...';
          
          setTimeout(() => {
            // Ad completed
            fetch('/api/ads/complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                sessionId: window.currentAdSession,
                rewardType: 'extra_reading'
              })
            }).then(response => response.json())
              .then(data => {
                if (data.success) {
                  button.textContent = '✅ Completado';
                  button.className = button.className.replace('bg-amber-600 hover:bg-amber-700', 'bg-green-600');
                  
                  // Show reward notification
                  showRewardNotification(data.reward);
                  
                  // Refresh the page or update UI
                  setTimeout(() => window.location.reload(), 2000);
                }
              });
          }, 30000); // 30 second ad
        }, 2000);
      }
    }
    
    function showRewardNotification(reward) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50';
      notification.innerHTML = '🎉 ¡Has ganado una lectura adicional!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  `,
};
