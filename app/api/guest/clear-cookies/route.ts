import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Clear guest cookies for GDPR compliance
 */
export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear all guest-related cookies
    cookieStore.delete('videntia_guest_secure');
    cookieStore.delete('videntia_tracking');
    
    return NextResponse.json({ success: true, message: 'Cookies cleared' });
  } catch (error) {
    console.error('Error clearing cookies:', error);
    return NextResponse.json({ error: 'Failed to clear cookies' }, { status: 500 });
  }
}
