import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * API para servir ads premium con targeting basado en intereses
 * Integración con Google Ad Manager para maximizar CPM
 */

export async function POST(req: NextRequest) {
  try {
    const { guest_id, ad_unit_path, page_context } = await req.json();

    if (!guest_id) {
      return serveBasicAd(ad_unit_path);
    }

    const supabase = createClient();

    // 1. Get user targeting profile
    const targetingData = await getUserTargetingProfile(supabase, guest_id);

    if (!targetingData || targetingData.commercial_score < 5) {
      return serveBasicAd(ad_unit_path);
    }

    // 2. Generate Google Ad Manager configuration
    const adConfig = generateGoogleAdConfig(targetingData, ad_unit_path);

    // 3. Log expected performance
    await logAdServing(supabase, guest_id, adConfig, true);

    return NextResponse.json({
      success: true,
      ad_config: adConfig,
      targeting_applied: true,
      expected_cpm_uplift: adConfig.expected_cpm_uplift,
      user_segments: targetingData.segments
    });

  } catch (error) {
    console.error('Error serving premium ad:', error);
    return serveBasicAd();
  }
}

async function getUserTargetingProfile(supabase: any, guestId: string) {
  // Get recent user interests and analytics
  const { data: interests, error: interestsError } = await supabase
    .from('user_interest_profiles')
    .select('*')
    .eq('guest_id', guestId)
    .order('created_at', { ascending: false })
    .limit(3);

  if (interestsError || !interests?.length) {
    return null;
  }

  const { data: analytics, error: analyticsError } = await supabase
    .from('guest_analytics_insights')
    .select('*')
    .eq('guest_id', guestId)
    .single();

  if (analyticsError) {
    console.log('No analytics found for user');
  }

  // Build targeting profile
  const categories = [...new Set(interests.map((i: any) => i.primary_category))] as string[];
  const allTags = interests.flatMap((i: any) => i.generated_tags || []);
  const avgCommercialValue = interests.reduce((sum: number, i: any) => sum + i.commercial_value, 0) / interests.length;
  const allKeywords = interests.flatMap((i: any) => i.ad_keywords || []);

  return {
    guest_id: guestId,
    categories,
    tags: [...new Set(allTags)],
    keywords: [...new Set(allKeywords)],
    commercial_score: avgCommercialValue,
    engagement_level: analytics?.engagement_level || 'medium',
    geo: {
      country: analytics?.country_code || 'AR',
      region: analytics?.region
    },
    device_type: analytics?.device_type || 'unknown',
    segments: generateTargetingSegments(categories, avgCommercialValue, analytics)
  };
}

function generateTargetingSegments(categories: string[], commercialScore: number, analytics: any): string[] {
  const segments = ['argentina']; // Base segment

  // Add category-based segments
  categories.forEach(category => {
    switch (category) {
      case 'travel':
        segments.push('travel_intent');
        if (commercialScore > 7) segments.push('premium_travel');
        break;
      case 'money':
        segments.push('financial_planning');
        if (commercialScore > 8) segments.push('high_value_financial');
        break;
      case 'relationships':
        segments.push('relationship_seeking');
        break;
      case 'career':
        segments.push('career_development');
        break;
      case 'health':
        segments.push('health_wellness');
        break;
    }
  });

  // Add engagement-based segments
  if (analytics?.engagement_level === 'high') segments.push('high_engagement');
  if (commercialScore > 7) segments.push('high_intent');

  return segments;
}

function generateGoogleAdConfig(targetingData: any, adUnitPath: string) {
  const baseConfig = {
    ad_unit_path: adUnitPath || '/videntia/homepage',
    size: [[300, 250], [728, 90], [320, 50]], // Responsive sizes
    targeting: {
      interests: [] as string[],
      keywords: [] as string[],
      demographics: {} as Record<string, any>,
      geo: {} as Record<string, any>,
      premium_audience: [] as string[],
      device: {} as Record<string, any>,
      custom_segments: [] as string[]
    },
    expected_cpm_uplift: 0
  };

  // Apply category targeting
  if (targetingData.categories.length > 0) {
    baseConfig.targeting.interests = targetingData.categories;
    baseConfig.expected_cpm_uplift += 200; // 200% base uplift for category targeting
  }

  // Apply keyword targeting
  if (targetingData.keywords.length > 0) {
    baseConfig.targeting.keywords = targetingData.keywords;
    baseConfig.expected_cpm_uplift += 100; // Additional 100% for keywords
  }

  // Apply demographic targeting
  if (targetingData.geo.country) {
    baseConfig.targeting.geo = targetingData.geo;
  }

  // High-value user bonuses
  if (targetingData.commercial_score > 8) {
    baseConfig.targeting.premium_audience = ['high_value', 'premium_intent'];
    baseConfig.expected_cpm_uplift += 300; // Premium users get 300% extra
  }

  // Device targeting
  if (targetingData.device_type !== 'unknown') {
    baseConfig.targeting.device = targetingData.device_type;
  }

  // Custom targeting for Google Ad Manager
  baseConfig.targeting.custom_segments = targetingData.segments;

  return baseConfig;
}

async function serveBasicAd(adUnitPath?: string) {
  return NextResponse.json({
    success: true,
    ad_config: {
      ad_unit_path: adUnitPath || '/videntia/homepage',
      size: [[300, 250]],
      targeting: {},
      expected_cpm_uplift: 0
    },
    targeting_applied: false,
    is_fallback: true
  });
}

async function logAdServing(supabase: any, guestId: string, adConfig: any, targetingApplied: boolean) {
  const expectedCPM = 0.30 * (1 + adConfig.expected_cpm_uplift / 100);

  const { error } = await supabase
    .from('premium_ad_performance')
    .insert({
      guest_id: guestId,
      ad_session_id: `session_${Date.now()}`,
      ad_provider: 'google_ad_manager',
      base_cpm: 0.30,
      actual_cpm: expectedCPM, // Will be updated when actual revenue is known
      targeting_segments: adConfig.targeting.custom_segments || [],
      interest_categories_matched: adConfig.targeting.interests || [],
      commercial_value_used: Math.round(expectedCPM * 10)
    });

  if (error) {
    console.error('Error logging ad performance:', error);
  }
}

/**
 * GET endpoint para analytics de performance
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || '7');

    const supabase = createClient();

    // Get revenue analytics
    const { data, error } = await supabase
      .from('premium_ad_performance')
      .select('*')
      .gte('served_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('served_at', { ascending: false });

    if (error) throw error;

    // Calculate metrics
    const targetedAds = data.filter(ad => ad.targeting_segments?.length > 0);
    const basicAds = data.filter(ad => !ad.targeting_segments?.length);

    const metrics = {
      total_impressions: data.length,
      targeted_impressions: targetedAds.length,
      basic_impressions: basicAds.length,
      
      avg_cpm_targeted: targetedAds.reduce((sum, ad) => sum + ad.actual_cpm, 0) / (targetedAds.length || 1),
      avg_cpm_basic: basicAds.reduce((sum, ad) => sum + ad.actual_cpm, 0) / (basicAds.length || 1),
      
      total_revenue: data.reduce((sum, ad) => sum + ad.actual_cpm, 0) / 1000, // Convert to dollars
      
      top_performing_segments: getTopPerformingSegments(targetedAds),
      revenue_by_category: getRevenueByCategory(targetedAds)
    };

    return NextResponse.json({
      success: true,
      period_days: days,
      metrics
    });

  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}

function getTopPerformingSegments(ads: any[]): any[] {
  const segmentPerformance: Record<string, { total_cpm: number; count: number }> = {};

  ads.forEach(ad => {
    ad.targeting_segments?.forEach((segment: string) => {
      if (!segmentPerformance[segment]) {
        segmentPerformance[segment] = { total_cpm: 0, count: 0 };
      }
      segmentPerformance[segment].total_cpm += ad.actual_cpm;
      segmentPerformance[segment].count += 1;
    });
  });

  return Object.entries(segmentPerformance)
    .map(([segment, data]: [string, any]) => ({
      segment,
      avg_cpm: data.total_cpm / data.count,
      impressions: data.count
    }))
    .sort((a, b) => b.avg_cpm - a.avg_cpm)
    .slice(0, 10);
}

function getRevenueByCategory(ads: any[]): any[] {
  const categoryRevenue: Record<string, number> = {};

  ads.forEach(ad => {
    ad.interest_categories_matched?.forEach((category: string) => {
      if (!categoryRevenue[category]) {
        categoryRevenue[category] = 0;
      }
      categoryRevenue[category] += ad.actual_cpm / 1000;
    });
  });

  return Object.entries(categoryRevenue)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a: any, b: any) => b.revenue - a.revenue);
}
