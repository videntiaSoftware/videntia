import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

// Logs the mail click event and redirects to the main site (or a specific page)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('uid');
    const card = searchParams.get('card');
    const date = searchParams.get('date');
    const referer = request.headers.get('referer') || null;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;
    const userAgent = request.headers.get('user-agent') || null;

    // Basic validation
    if (!userId || !card || !date) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Log event in mail_click_events table
    const supabase = createClient();
    await supabase.from('mail_click_events').insert([
      {
        user_id: userId,
        card_name: card,
        date_for: date,
        referer,
        ip,
        user_agent: userAgent,
        clicked_at: new Date().toISOString(),
      },
    ]);

    // Redirect to the main site (or a specific page)
    const redirectUrl = 'https://videntiatarot.com';
    return NextResponse.redirect(redirectUrl, { status: 302 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', details: (error as Error).message }, { status: 500 });
  }
}
