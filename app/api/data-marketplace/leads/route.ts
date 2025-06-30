import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * API para venta de leads segmentados
 * Endpoint para que empresas compren datos de usuarios
 */

export async function POST(req: NextRequest) {
  try {
    const { 
      client_api_key,
      segment_criteria,
      max_leads,
      price_per_lead 
    } = await req.json();

    // Verificar API key del cliente
    if (!await verifyClientApiKey(client_api_key)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Buscar leads que coincidan con criterios
    const leads = await findMatchingLeads(supabase, segment_criteria, max_leads);

    // Calcular precio total
    const totalPrice = leads.length * price_per_lead;

    // Marcar leads como vendidos (para no vender duplicados)
    await markLeadsAsSold(supabase, leads, client_api_key);

    // Log de venta para tracking
    await logLeadSale(supabase, {
      client: client_api_key,
      leads_count: leads.length,
      total_revenue: totalPrice,
      segment: segment_criteria
    });

    return NextResponse.json({
      success: true,
      leads_delivered: leads.length,
      total_cost: totalPrice,
      data: anonymizeLeads(leads) // Datos sin IDs personales
    });

  } catch (error) {
    console.error('Error in lead marketplace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET: Consultar disponibilidad de leads
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const apiKey = url.searchParams.get('api_key');
    const segment = url.searchParams.get('segment');

    if (!apiKey || !await verifyClientApiKey(apiKey)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    
    // Contar leads disponibles por segmento
    const availability = await getLeadAvailability(supabase, segment || undefined);

    return NextResponse.json({
      success: true,
      available_segments: availability,
      pricing: {
        travel_intent: { price: 2.50, available: availability.travel_intent || 0 },
        relationship_seeking: { price: 2.00, available: availability.relationship_seeking || 0 },
        career_change: { price: 1.80, available: availability.career_change || 0 },
        financial_planning: { price: 3.00, available: availability.financial_planning || 0 }
      }
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
async function verifyClientApiKey(apiKey: string): Promise<boolean> {
  // Verificar en base de datos de clientes autorizados
  const validKeys = [
    process.env.DESPEGAR_API_KEY,
    process.env.BOOKING_API_KEY,
    process.env.AGENCY_1_API_KEY
  ].filter(Boolean);
  
  return validKeys.includes(apiKey);
}

async function findMatchingLeads(supabase: any, criteria: any, maxLeads: number) {
  // Buscar en user_interest_profiles
  let query = supabase
    .from('user_interest_profiles')
    .select('*')
    .eq('sold', false)
    .limit(maxLeads);

  // Aplicar filtros según criterios
  if (criteria.interest_category) {
    query = query.contains('generated_tags', [criteria.interest_category]);
  }
  
  if (criteria.commercial_value_min) {
    query = query.gte('commercial_value', criteria.commercial_value_min);
  }

  if (criteria.country) {
    query = query.eq('country_code', criteria.country);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

async function markLeadsAsSold(supabase: any, leads: any[], clientKey: string) {
  const leadIds = leads.map(lead => lead.id);
  
  await supabase
    .from('user_interest_profiles')
    .update({ 
      sold: true, 
      sold_to: clientKey, 
      sold_at: new Date().toISOString() 
    })
    .in('id', leadIds);
}

async function logLeadSale(supabase: any, saleData: any) {
  await supabase
    .from('lead_sales_log')
    .insert({
      client: saleData.client,
      leads_count: saleData.leads_count,
      total_revenue: saleData.total_revenue,
      segment_criteria: saleData.segment,
      sale_date: new Date().toISOString()
    });
}

function anonymizeLeads(leads: any[]) {
  return leads.map(lead => ({
    interest_tags: lead.generated_tags,
    commercial_value: lead.commercial_value,
    demographic_hints: lead.demographic_hints,
    question_category: lead.primary_category,
    confidence_score: lead.confidence_score,
    // NO incluir: guest_id, question_text, IPs, etc.
  }));
}

async function getLeadAvailability(supabase: any, segment?: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('user_interest_profiles')
    .select('primary_category')
    .eq('sold', false);

  if (error) throw error;

  // Contar por categoría
  const counts: Record<string, number> = {};
  data.forEach((lead: any) => {
    counts[lead.primary_category] = (counts[lead.primary_category] || 0) + 1;
  });

  return counts;
}
