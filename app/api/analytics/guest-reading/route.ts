import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * Store enhanced reading events with cookie data
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const readingData = await request.json();
    
    // Store in guest_reading_patterns table
    const reading = {
      guest_id: readingData.guest_id,
      reading_type: readingData.reading_type,
      question_asked: readingData.question_asked,
      question_length: readingData.question_asked?.length || 0,
      cards_selected: readingData.cards_selected || [],
      time_of_day: new Date().getHours(),
      day_of_week: new Date().getDay() + 1, // 1-7 (Monday = 1)
      created_at: new Date().toISOString()
    };

    const { error: readingError } = await supabase
      .from('guest_reading_patterns')
      .insert(reading);

    if (readingError) {
      console.error('Error storing reading pattern:', readingError);
      return NextResponse.json({ error: 'Failed to store reading' }, { status: 500 });
    }

    // Also update guest profile with reading count
    await supabase.rpc('increment_guest_readings', { 
      p_guest_id: readingData.guest_id 
    });

    // Store as general event too
    const event = {
      guest_id: readingData.guest_id,
      session_id: readingData.session_id,
      event_type: 'reading_completed',
      event_name: `Reading: ${readingData.reading_type}`,
      event_data: {
        reading_type: readingData.reading_type,
        has_question: !!readingData.question_asked,
        cards_count: readingData.cards_selected?.length || 0,
        is_returning_guest: readingData.is_returning_guest,
        visit_count: readingData.visit_count,
        days_since_first_visit: readingData.days_since_first_visit
      },
      timestamp: new Date().toISOString()
    };

    await supabase
      .from('guest_events')
      .insert(event);

    return NextResponse.json({ 
      success: true, 
      reading_stored: true,
      guest_id: readingData.guest_id 
    });

  } catch (error) {
    console.error('Error processing reading event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
