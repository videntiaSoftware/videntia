import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * API endpoint for setting secure httpOnly cookies
 * These cookies cannot be accessed or modified by client-side JavaScript
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const cookieStore = cookies();

    // Set httpOnly cookie that survives browser restarts
    cookieStore.set('videntia_guest_secure', JSON.stringify(data), {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/'
    });

    // Also set a tracking cookie for cross-session analysis
    cookieStore.set('videntia_tracking', data.guest_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting secure cookie:', error);
    return NextResponse.json({ error: 'Failed to set cookie' }, { status: 500 });
  }
}

/**
 * Get secure cookie data
 */
export async function GET() {
  try {
    const cookieStore = cookies();
    const secureCookie = cookieStore.get('videntia_guest_secure');
    const trackingCookie = cookieStore.get('videntia_tracking');

    if (!secureCookie) {
      return NextResponse.json({ data: null });
    }

    const data = JSON.parse(secureCookie.value);
    
    return NextResponse.json({ 
      data,
      tracking_id: trackingCookie?.value,
      has_secure_cookie: true
    });
  } catch (error) {
    console.error('Error reading secure cookie:', error);
    return NextResponse.json({ error: 'Failed to read cookie' }, { status: 500 });
  }
}
