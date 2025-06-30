/**
 * UNIFIED TRACKING SYSTEM - VIDENTIA
 * 
 * Este archivo centraliza TODO el tracking de lecturas y analytics
 * para asegurar que TODO se guarde en Supabase correctamente.
 */

import { createClient } from '@/lib/supabase/client';
import { GuestCookieManager } from '@/lib/cookies';

export interface ReadingTrackingData {
  // Datos básicos de la lectura
  reading_type: string;
  question?: string;
  cards_selected: any[];
  interpretation?: string;
  
  // Datos del usuario
  user_id?: string;
  guest_id?: string;
  fingerprint_id?: string;
  session_id?: string;
  
  // Datos del dispositivo/sesión
  ip_address?: string;
  user_agent?: string;
  page_url?: string;
  
  // Analytics adicionales
  is_returning_guest?: boolean;
  visit_count?: number;
  
  // Datos de monetización
  commercial_value?: number;
  question_analysis?: any;
}

/**
 * FUNCIÓN PRINCIPAL: Guarda TODA la información de la lectura
 * Se ejecuta para GUESTS y USUARIOS AUTENTICADOS
 */
export async function trackReadingUnified(data: ReadingTrackingData): Promise<void> {
  const supabase = createClient();
  
  try {
    console.log('[UNIFIED_TRACKING] Iniciando tracking unificado con datos:', {
      reading_type: data.reading_type,
      user_id: data.user_id,
      guest_id: data.guest_id,
      has_question: !!data.question,
      has_cards: !!data.cards_selected,
      has_interpretation: !!data.interpretation
    });
    
    // 1. GUARDAR EN TABLA PRINCIPAL DE LECTURAS
    console.log('[UNIFIED_TRACKING] Paso 1: Guardando en tabla readings...');
    await saveToReadingsTable(supabase, data);
    
    // 2. GUARDAR ANALYTICS DE GUEST (siempre)
    console.log('[UNIFIED_TRACKING] Paso 2: Guardando analytics de guest...');
    await saveGuestAnalytics(supabase, data);
    
    // 3. GUARDAR PERFIL DE INTERÉS (para monetización)
    if (data.question) {
      console.log('[UNIFIED_TRACKING] Paso 3: Guardando perfil de interés...');
      await saveInterestProfile(supabase, data);
    } else {
      console.log('[UNIFIED_TRACKING] Paso 3: Saltando perfil de interés (sin pregunta)');
    }
    
    // 4. GUARDAR EVENTOS DE COMPORTAMIENTO
    console.log('[UNIFIED_TRACKING] Paso 4: Guardando eventos de comportamiento...');
    await saveBehaviorEvent(supabase, data);
    
    // 5. ACTUALIZAR GUEST INSIGHTS
    console.log('[UNIFIED_TRACKING] Paso 5: Actualizando insights de guest...');
    await updateGuestInsights(supabase, data.guest_id || data.user_id || '');
    
    console.log('[UNIFIED_TRACKING] Tracking completado exitosamente');
    
  } catch (error) {
    console.error('[UNIFIED_TRACKING] Error:', error);
    throw error;
  }
}

/**
 * Guarda en la tabla principal `readings`
 */
async function saveToReadingsTable(supabase: any, data: ReadingTrackingData): Promise<void> {
  const readingRecord = {
    user_id: data.user_id || null,
    guest_id: data.guest_id || null,
    reading_type: data.reading_type,
    question: data.question || null,
    cards_drawn: data.cards_selected,
    interpretation: data.interpretation || null,
    user_tier: data.user_id ? 'free' : 'guest', // Determinar tier
    ip_address: data.ip_address || null,
    created_at: new Date().toISOString()
  };
  
  console.log('[UNIFIED_TRACKING] Intentando insertar en readings:', {
    user_id: readingRecord.user_id,
    guest_id: readingRecord.guest_id,
    reading_type: readingRecord.reading_type,
    has_question: !!readingRecord.question,
    user_tier: readingRecord.user_tier
  });
  
  const { error } = await supabase
    .from('readings')
    .insert(readingRecord);
    
  if (error) {
    console.error('[UNIFIED_TRACKING] Error saving to readings:', error);
    throw error; // Propagar el error para detener el flujo
  } else {
    console.log('[UNIFIED_TRACKING] ✅ Saved to readings table successfully');
  }
}

/**
 * Guarda analytics del guest
 */
async function saveGuestAnalytics(supabase: any, data: ReadingTrackingData): Promise<void> {
  const guest_id = data.guest_id || data.user_id || generateGuestId();
  
  // Crear/actualizar perfil de guest
  const guestProfile = {
    guest_id,
    last_seen_at: new Date().toISOString(),
    initial_ip_address: data.ip_address || 'unknown',
    initial_user_agent: data.user_agent || '',
    total_readings: 1, // Se incrementará automáticamente
    fingerprint_confidence: data.fingerprint_id ? 0.95 : 0.5
  };

  await supabase
    .from('guests')
    .upsert(guestProfile, {
      onConflict: 'guest_id',
      ignoreDuplicates: false
    });
    
  // Guardar patrón de lectura
  const readingPattern = {
    guest_id,
    reading_type: data.reading_type,
    question_asked: data.question,
    question_length: data.question?.length || 0,
    cards_selected: data.cards_selected || [],
    time_of_day: new Date().getHours(),
    day_of_week: new Date().getDay() + 1,
    created_at: new Date().toISOString()
  };

  await supabase
    .from('guest_reading_patterns')
    .insert(readingPattern);
    
  console.log('[UNIFIED_TRACKING] Saved guest analytics');
}

/**
 * Guarda perfil de interés para monetización
 */
async function saveInterestProfile(supabase: any, data: ReadingTrackingData): Promise<void> {
  if (!data.question || !data.guest_id) return;
  
  // Llamar a la API de análisis de preguntas para obtener datos LLM
  try {
    const response = await fetch('/api/analytics/question-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guest_id: data.guest_id,
        question: data.question,
        reading_type: data.reading_type
      })
    });
    
    if (response.ok) {
      console.log('[UNIFIED_TRACKING] Question analysis triggered');
    }
  } catch (error) {
    console.error('[UNIFIED_TRACKING] Error triggering question analysis:', error);
  }
}

/**
 * Guarda evento de comportamiento
 */
async function saveBehaviorEvent(supabase: any, data: ReadingTrackingData): Promise<void> {
  const event = {
    guest_id: data.guest_id || data.user_id || generateGuestId(),
    session_id: data.session_id,
    event_type: 'reading_completed',
    event_name: `Reading: ${data.reading_type}`,
    event_data: {
      reading_type: data.reading_type,
      has_question: !!data.question,
      cards_count: data.cards_selected?.length || 0,
      is_returning_guest: data.is_returning_guest || false,
      visit_count: data.visit_count || 1
    },
    page_url: data.page_url,
    user_agent: data.user_agent,
    ip_address: data.ip_address,
    timestamp: new Date().toISOString()
  };

  await supabase
    .from('guest_events')
    .insert(event);
    
  console.log('[UNIFIED_TRACKING] Saved behavior event');
}

/**
 * Actualiza insights del guest
 */
async function updateGuestInsights(supabase: any, guestId: string): Promise<void> {
  if (!guestId) return;
  
  try {
    // Llamar función de base de datos para actualizar insights
    await supabase.rpc('update_guest_insights', { 
      p_guest_id: guestId 
    });
    console.log('[UNIFIED_TRACKING] Updated guest insights');
  } catch (error) {
    console.error('[UNIFIED_TRACKING] Error updating insights:', error);
  }
}

/**
 * Genera ID de guest si no existe
 */
function generateGuestId(): string {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * FUNCIÓN HELPER: Obtiene guest_id desde cookies o genera uno nuevo
 */
export function getOrCreateGuestId(fingerprintId?: string): string {
  try {
    const guestIdentity = GuestCookieManager.getOrCreateGuestIdentity(fingerprintId);
    return guestIdentity.guest_id;
  } catch (error) {
    console.error('[UNIFIED_TRACKING] Error with cookies, generating fallback ID');
    return generateGuestId();
  }
}

/**
 * FUNCIÓN HELPER: Prepara datos completos para tracking
 */
export function prepareTrackingData(
  readingData: any,
  requestData: any,
  guestId?: string
): ReadingTrackingData {
  const finalGuestId = guestId || getOrCreateGuestId(requestData.fingerprintId);
  
  const trackingData = {
    reading_type: readingData.type || requestData.readingType,
    question: readingData.question || requestData.question,
    cards_selected: readingData.cards || requestData.cards || [],
    interpretation: readingData.interpretation,
    user_id: requestData.userId,
    guest_id: finalGuestId,
    fingerprint_id: requestData.fingerprintId,
    session_id: requestData.sessionId,
    ip_address: requestData.ip_address,
    user_agent: requestData.user_agent,
    page_url: requestData.page_url,
    is_returning_guest: requestData.is_returning_guest,
    visit_count: requestData.visit_count,
    commercial_value: readingData.questionAnalysis?.commercial_value,
    question_analysis: readingData.questionAnalysis
  };
  
  console.log('[UNIFIED_TRACKING] Datos preparados:', {
    reading_type: trackingData.reading_type,
    user_id: trackingData.user_id,
    guest_id: trackingData.guest_id,
    has_question: !!trackingData.question,
    has_cards: trackingData.cards_selected?.length || 0,
    has_interpretation: !!trackingData.interpretation
  });
  
  return trackingData;
}
