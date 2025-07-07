import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * API para tracking avanzado de comportamiento
 * Esta data se convierte en insights valiosos para venta
 */

export async function POST(req: NextRequest) {
  try {
    const { 
      guest_id, 
      event_type, 
      event_data,
      page_url,
      user_agent,
      ip_address 
    } = await req.json();

    const supabase = createClient();

    // 1. Registrar evento granular
    const { error: eventError } = await supabase
      .from('guest_behavior_events')
      .insert({
        guest_id,
        event_type,
        event_data,
        page_url,
        user_agent: user_agent || req.headers.get('user-agent'),
        ip_address: ip_address || getClientIP(req),
        session_id: event_data?.session_id,
        timestamp: new Date().toISOString()
      });

    if (eventError) {
      console.error('Error saving behavior event:', eventError);
      return NextResponse.json({ error: 'Failed to save event' }, { status: 500 });
    }

    // 2. Enriquecer datos con geolocation y device info
    const enrichedData = await enrichEventData(req, event_data);

    // 🔥 Save geolocation data to guest_geolocation table
    if (enrichedData.country_code && enrichedData.country_code !== 'unknown') {
      const { error: geoError } = await supabase
        .from('guest_geolocation')
        .upsert({
          guest_id,
          ip_address: enrichedData.ip_address || getClientIP(req),
          country_code: enrichedData.country_code,
          country_name: enrichedData.country || 'Unknown',
          region_code: enrichedData.region_code || 'Unknown',
          region_name: enrichedData.region || 'Unknown',
          city: enrichedData.city || 'Unknown',
          timezone: enrichedData.timezone || 'Unknown',
          isp_name: 'Unknown', // Would need additional API call
          connection_type: 'Unknown',
          threat_level: 'low',
          first_seen: new Date().toISOString(),
          last_seen: new Date().toISOString(),
          times_seen: 1
        }, {
          onConflict: 'guest_id,ip_address',
          ignoreDuplicates: false
        });

      if (geoError) {
        console.error('Error saving geolocation:', geoError);
      } else {
        console.log('[ADVANCED_TRACKING] Geolocation saved for guest:', guest_id);
      }
    }

    // 3. Actualizar insights del usuario (esto se hace automáticamente con el trigger)
    // Pero podemos agregar datos específicos aquí
    if (event_type === 'card_selection' || event_type === 'reading_complete') {
      await updateSpiritualProfile(supabase, guest_id, event_data);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Event tracked successfully',
      insights_updated: true
    });

  } catch (error) {
    console.error('Error in advanced tracking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * API para exportar datos anonimizados (para venta a partners)
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const segment = url.searchParams.get('segment');
    const minValue = parseFloat(url.searchParams.get('min_value') || '0');
    const apiKey = url.searchParams.get('api_key');

    // Verificar API key para acceso a datos
    if (apiKey !== process.env.DATA_EXPORT_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Exportar datos anonimizados
    const { data, error } = await supabase
      .rpc('export_anonymized_insights', {
        p_segment_name: segment,
        p_min_value: minValue
      });

    if (error) {
      console.error('Error exporting insights:', error);
      return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      total_records: data?.length || 0,
      estimated_value: calculateDatasetValue(data),
      data: data || []
    });

  } catch (error) {
    console.error('Error in data export:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return real || 'unknown';
}

async function enrichEventData(req: NextRequest, eventData: any) {
  const userAgent = req.headers.get('user-agent') || '';
  const ip = getClientIP(req);
  
  // Detectar device type
  const deviceType = getDeviceType(userAgent);
  
  // Detectar OS y browser
  const { os, browser } = parseUserAgent(userAgent);
  
  // Get geolocation (usando un servicio confiable)
  let geoData: any = {};
  try {
    // Usar un servicio más confiable para geolocalización
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    if (geoResponse.ok) {
      geoData = await geoResponse.json();
    }
  } catch (error) {
    console.log('Geo lookup failed:', error);
  }

  return {
    ...eventData,
    device_type: deviceType,
    os,
    browser,
    country_code: geoData.countryCode || 'unknown',
    region: geoData.regionName || 'unknown',
    city: geoData.city || 'unknown',
    timezone: geoData.timezone || 'unknown'
  };
}

function getDeviceType(userAgent: string): string {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

function parseUserAgent(userAgent: string): { os: string, browser: string } {
  let os = 'unknown';
  let browser = 'unknown';

  // Detectar OS
  if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/mac/i.test(userAgent)) os = 'macOS';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';

  // Detectar Browser
  if (/chrome/i.test(userAgent)) browser = 'Chrome';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/safari/i.test(userAgent)) browser = 'Safari';
  else if (/edge/i.test(userAgent)) browser = 'Edge';

  return { os, browser };
}

async function updateSpiritualProfile(supabase: any, guestId: string, eventData: any) {
  // Analizar preferencias espirituales basadas en las cartas elegidas
  const spiritualInterests = [];
  const personalityTraits = [];
  const lifeFocusAreas = [];

  if (eventData.card_name) {
    // Mapear cartas a intereses espirituales
    const cardToInterests: Record<string, string[]> = {
      'The Lovers': ['love', 'relationships'],
      'The Emperor': ['leadership', 'career'],
      'The High Priestess': ['intuition', 'spirituality'],
      'Death': ['transformation', 'change'],
      'The Fool': ['new_beginnings', 'adventure']
      // ... más mapeos
    };

    const interests = cardToInterests[eventData.card_name as string] || [];
    spiritualInterests.push(...interests);
  }

  if (eventData.reading_type) {
    lifeFocusAreas.push(eventData.reading_type);
  }

  // Actualizar perfil si hay datos nuevos
  if (spiritualInterests.length > 0 || lifeFocusAreas.length > 0) {
    await supabase
      .from('guest_analytics_insights')
      .upsert({
        guest_id: guestId,
        spiritual_interests: spiritualInterests,
        life_focus_areas: lifeFocusAreas,
        updated_at: new Date().toISOString()
      }, { onConflict: 'guest_id' });
  }
}

function calculateDatasetValue(data: any[]): number {
  if (!data || data.length === 0) return 0;
  
  // Calcular valor basado en calidad y cantidad de datos
  const baseValue = data.length * 0.50; // $0.50 por registro base
  const premiumBonus = data.filter(record => 
    record.engagement_level === 'high' && record.ad_engagement_score > 70
  ).length * 2.50; // $2.50 extra por registros premium
  
  return baseValue + premiumBonus;
}
