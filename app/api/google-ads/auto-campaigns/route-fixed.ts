import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { GoogleAdsIntegration } from '@/lib/google-ads-integration';

/**
 * 🔥 AUTO-CREATE GOOGLE ADS CAMPAIGNS
 * Based on LLM analysis and user segments
 */

export async function POST(req: NextRequest) {
  try {
    const { force_create = false } = await req.json();
    
    const supabase = createClient();
    
    // 1. Get high-value user segments from LLM analysis
    const { data: segments } = await supabase
      .from('user_interest_profiles')
      .select(`
        primary_category,
        generated_tags,
        commercial_value,
        ad_keywords,
        demographic_hints
      `)
      .gte('commercial_value', 6) // Only high-value segments
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24h

    if (!segments || segments.length === 0) {
      return NextResponse.json({ 
        message: 'No high-value segments found for campaign creation',
        segments_analyzed: 0
      });
    }

    // Group segments by category locally
    const segmentGroups = segments.reduce((acc: any, segment: any) => {
      const key = segment.primary_category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(segment);
      return acc;
    }, {} as any);

    // Only create campaigns for categories with minimum 10 users
    const viableSegments = Object.entries(segmentGroups)
      .filter(([category, users]: [string, any]) => (users as any).length >= 10)
      .map(([category, users]: [string, any]) => ({
        primary_category: category,
        user_count: (users as any).length,
        generated_tags: (users as any)[0].generated_tags,
        commercial_value: Math.max(...(users as any).map((u: any) => u.commercial_value)),
        ad_keywords: [...new Set((users as any).flatMap((u: any) => u.ad_keywords || []))] as any,
        demographic_hints: [...new Set((users as any).flatMap((u: any) => u.demographic_hints || []))] as any
      }));

    const googleAds = new GoogleAdsIntegration();
    const createdCampaigns = [];

    // 2. Create Google Ads campaigns for each viable segment
    for (const segment of viableSegments) {
      try {
        if (!force_create) {
          // Check if campaign already exists for this category
          const { data: existing } = await supabase
            .from('google_ads_campaigns')
            .select('id')
            .eq('category', segment.primary_category)
            .eq('status', 'active')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

          if (existing && existing.length > 0) {
            console.log(`[AUTO_CAMPAIGNS] Skipping ${segment.primary_category} - campaign exists`);
            continue;
          }
        }

        const campaign = await googleAds.createTargetedCampaign({
          primary_category: segment.primary_category,
          generated_tags: segment.generated_tags,
          confidence_score: 8, // High confidence for campaign creation
          commercial_value: segment.commercial_value,
          ad_keywords: segment.ad_keywords as any,
          demographic_hints: segment.demographic_hints as any
        }, segment.user_count);

        // 3. Log campaign creation
        await supabase
          .from('google_ads_campaigns')
          .insert({
            campaign_id: campaign.id,
            category: segment.primary_category,
            target_keywords: segment.ad_keywords as any,
            daily_budget: 25, // Default budget
            target_cpm: campaign.estimated_cpm,
            user_segment_size: segment.user_count,
            status: 'active',
            created_by: 'auto_llm_system'
          });

        createdCampaigns.push({
          category: segment.primary_category,
          campaign_id: campaign.id,
          budget: campaign.estimated_cpm,
          users_targeted: segment.user_count
        });

        console.log(`[AUTO_CAMPAIGNS] Created: ${campaign.id} for ${segment.primary_category}`);

      } catch (campaignError) {
        console.error(`[AUTO_CAMPAIGNS] Failed for ${segment.primary_category}:`, campaignError);
      }
    }

    // 4. Calculate revenue impact
    const totalBudget = createdCampaigns.reduce((sum: number, c: any) => sum + c.budget, 0);
    const totalUsers = createdCampaigns.reduce((sum: number, c: any) => sum + c.users_targeted, 0);
    const expectedRevenue = totalUsers * 0.02 * totalBudget; // 2% conversion rate estimate

    return NextResponse.json({
      success: true,
      campaigns_created: createdCampaigns.length,
      total_budget: totalBudget,
      users_targeted: totalUsers,
      expected_daily_revenue: expectedRevenue,
      campaigns: createdCampaigns
    });

  } catch (error: any) {
    console.error('[AUTO_CAMPAIGNS] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create campaigns',
      details: error.message 
    }, { status: 500 });
  }
}

/**
 * GET: Campaign performance dashboard
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get campaign performance
    const { data: campaigns } = await supabase
      .from('google_ads_campaigns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // Get revenue metrics
    const { data: revenue } = await supabase
      .from('revenue_analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    return NextResponse.json({
      active_campaigns: campaigns?.filter((c: any) => c.status === 'active').length || 0,
      total_campaigns: campaigns?.length || 0,
      last_30_days_revenue: revenue?.reduce((sum: number, r: any) => sum + r.total_revenue, 0) || 0,
      campaigns: campaigns,
      revenue_trend: revenue
    });

  } catch (error: any) {
    console.error('[CAMPAIGNS_DASHBOARD] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
