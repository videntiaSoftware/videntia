import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * API para tracking de eventos de ads premium
 * Métricas de revenue y performance
 */

export async function POST(req: NextRequest) {
  try {
    const {
      event_type,
      ad_id,
      category,
      estimated_revenue,
      guest_id,
      session_id,
      timestamp
    } = await req.json();

    const supabase = createClient();

    // Store premium ad event
    const { error } = await supabase
      .from('premium_ad_events')
      .insert({
        guest_id,
        session_id,
        event_type,
        ad_id,
        ad_category: category,
        estimated_revenue: estimated_revenue || 0,
        occurred_at: timestamp || new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
        user_agent: req.headers.get('user-agent') || ''
      });

    if (error) {
      console.error('[PREMIUM_AD_EVENT] Database error:', error);
      return NextResponse.json({ error: 'Failed to store event' }, { status: 500 });
    }

    // Calculate revenue impact if it's a click event
    if (event_type === 'premium_ad_click') {
      await updateRevenueMetrics(supabase, category, estimated_revenue);
    }

    console.log('[PREMIUM_AD_EVENT] Stored:', { event_type, category, estimated_revenue });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[PREMIUM_AD_EVENT] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function updateRevenueMetrics(supabase: any, category: string, estimatedRevenue: number) {
  try {
    // Update daily revenue metrics
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existing } = await supabase
      .from('daily_revenue_metrics')
      .select('*')
      .eq('date', today)
      .eq('category', category)
      .single();

    if (existing) {
      // Update existing record
      await supabase
        .from('daily_revenue_metrics')
        .update({
          premium_ad_clicks: existing.premium_ad_clicks + 1,
          estimated_revenue: existing.estimated_revenue + estimatedRevenue,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    } else {
      // Create new record
      await supabase
        .from('daily_revenue_metrics')
        .insert({
          date: today,
          category,
          premium_ad_clicks: 1,
          estimated_revenue: estimatedRevenue,
          basic_ad_impressions: 0
        });
    }
  } catch (error) {
    console.error('[REVENUE_METRICS] Error updating:', error);
  }
}
