import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { canWatchAdForReward, createAdSession, verifyAdCompletion } from '@/lib/ads';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { action, sessionId, rewardType } = body;

  // Get authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = userData.user;
  const userId = user.id;

  if (action === 'start') {
    // Check if user can watch ad for reward
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: todayAds } = await supabase
      .from('ad_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('verified', true)
      .gte('created_at', today.toISOString()) || { data: [] };

    const todayAdsWatched = todayAds?.length || 0;

    // Get week ads for premium trial check
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { data: weekAds } = await supabase
      .from('ad_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('verified', true)
      .gte('created_at', weekAgo.toISOString()) || { data: [] };

    const weekAdsWatched = weekAds?.length || 0;

    const canWatch = canWatchAdForReward(rewardType as 'extra_reading' | 'premium_trial', todayAdsWatched, weekAdsWatched);
    
    if (!canWatch.allowed) {
      return NextResponse.json({ 
        error: canWatch.reason,
        canWatch: false 
      }, { status: 429 });
    }

    // Create ad session
    const session = createAdSession(userId, 'unity_ads');
    
    // Save to database
    const { error: insertError } = await supabase
      .from('ad_sessions')
      .insert([{
        id: session.id,
        user_id: session.userId,
        ad_provider_id: session.adProviderId,
        started_at: session.startedAt.toISOString(),
        verified: false,
      }]);

    if (insertError) {
      console.error('Error creating ad session:', insertError);
      return NextResponse.json({ error: 'Failed to create ad session' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      canWatch: true,
    });
  }

  if (action === 'complete') {
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get the ad session
    const { data: sessionData, error: sessionError } = await supabase
      .from('ad_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single();

    if (sessionError || !sessionData) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
    }

    if (sessionData.verified) {
      return NextResponse.json({ error: 'Session already completed' }, { status: 400 });
    }

    // Verify ad completion and assign reward
    const completedSession = verifyAdCompletion(sessionData, rewardType as 'extra_reading' | 'premium_trial');

    // Update session in database
    const { error: updateError } = await supabase
      .from('ad_sessions')
      .update({
        completed_at: completedSession.completedAt?.toISOString(),
        verified: true,
        reward_type: completedSession.reward?.type,
        reward_value: completedSession.reward?.value,
        reward_expires_at: completedSession.reward?.expiresAt?.toISOString(),
      })
      .eq('id', sessionId);

    if (updateError) {
      console.error('Error updating ad session:', updateError);
      return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
    }

    // If premium trial reward, update user metadata temporarily
    if (rewardType === 'premium_trial') {
      const expiresAt = new Date(Date.now() + (completedSession.reward?.value || 0));
      
      // Store premium trial info in a separate table or user metadata
      await supabase
        .from('premium_trials')
        .upsert({
          user_id: userId,
          granted_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
          active: true,
        });
    }

    return NextResponse.json({
      success: true,
      reward: completedSession.reward,
      message: rewardType === 'extra_reading' 
        ? '¡Has ganado una lectura adicional!' 
        : '¡Has desbloqueado 24 horas de Premium gratis!',
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
