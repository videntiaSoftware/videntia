import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * Receive and store guest events with cookie enhancement
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const eventData = await request.json();
    
    // Extract IP and User-Agent from request
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // First, upsert guest profile
    const guestProfile = {
      guest_id: eventData.guest_id,
      last_seen_at: new Date().toISOString(),
      initial_ip_address: ip,
      initial_user_agent: userAgent,
      total_sessions: eventData.visit_count || 1,
      fingerprint_confidence: eventData.fingerprint_id ? 0.95 : 0.5
    };

    await supabase
      .from('guests')
      .upsert(guestProfile, {
        onConflict: 'guest_id',
        ignoreDuplicates: false
      });

    // Insert the event
    const event = {
      guest_id: eventData.guest_id,
      session_id: eventData.session_id,
      event_type: eventData.event_type,
      event_name: eventData.event_data?.name || eventData.event_type,
      page_url: eventData.page_url,
      event_data: {
        ...eventData.event_data,
        ip_address: ip,
        user_agent: userAgent,
        is_cookie_enhanced: true
      },
      timestamp: new Date().toISOString()
    };

    const { error: eventError } = await supabase
      .from('guest_events')
      .insert(event);

    if (eventError) {
      console.error('Error inserting guest event:', eventError);
      return NextResponse.json({ error: 'Failed to store event' }, { status: 500 });
    }

    // Update session if provided
    if (eventData.session_id) {
      await supabase
        .from('guest_sessions')
        .upsert({
          guest_id: eventData.guest_id,
          session_id: eventData.session_id,
          started_at: new Date().toISOString(),
          ip_address: ip,
          user_agent: userAgent,
          page_views: 1
        }, {
          onConflict: 'session_id',
          ignoreDuplicates: false
        });
    }

    return NextResponse.json({ 
      success: true, 
      guest_id: eventData.guest_id,
      event_stored: true 
    });

  } catch (error) {
    console.error('Error processing guest event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
