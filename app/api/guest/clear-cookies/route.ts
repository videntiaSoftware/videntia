import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Clear guest cookies for GDPR compliance
 * Este endpoint permite a los usuarios borrar sus cookies de invitado
 * cuando quieren revocar el consentimiento de seguimiento
 */
export async function POST() {
  try {
    const cookieStore = await cookies();

    // Clear all guest-related cookies
    (cookieStore as any).delete('videntia_guest_secure');
    (cookieStore as any).delete('videntia_tracking');
    
    return NextResponse.json({ success: true, message: 'Cookies cleared' });
  } catch (error: any) {
    console.error('Error clearing cookies:', error);
    return NextResponse.json({ error: 'Failed to clear cookies' }, { status: 500 });
  }
}
