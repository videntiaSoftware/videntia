import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { getGeminiApiUrl } from '@/lib/gemini-config';

/**
 * API para análisis de preguntas con GEMINI AI y generación de tags comerciales
 * SISTEMA COMPLETAMENTE DINÁMICO - ZERO HARDCODING
 */

export async function POST(req: NextRequest) {
  try {
    const { 
      question, 
      guest_id, 
      session_id 
    } = await req.json();

    if (!question || question.trim().length < 5) {
      return NextResponse.json({ 
        error: 'Pregunta muy corta para análisis' 
      }, { status: 400 });
    }

    if (!guest_id) {
      return NextResponse.json({ 
        error: 'guest_id requerido' 
      }, { status: 400 });
    }

    // 1. Analizar pregunta con Gemini AI (SISTEMA DINÁMICO)
    const llmAnalysis = await analyzeQuestionWithGeminiAI(question);

    if (!llmAnalysis.success) {
      return NextResponse.json({ 
        error: 'Error analizando pregunta con IA',
        details: llmAnalysis.error 
      }, { status: 500 });
    }

    const supabase = createClient();

    // 2. Calcular valor comercial de forma dinámica
    const commercialValue = calculateDynamicCommercialValue(llmAnalysis);

    // 3. Guardar perfil de interés en Supabase
    const { data: profileData, error: profileError } = await supabase
      .from('user_interest_profiles')
      .insert({
        guest_id,
        question_text: question.trim(),
        primary_category: llmAnalysis.primary_category,
        generated_tags: llmAnalysis.generated_tags,
        confidence_score: llmAnalysis.confidence_score,
        commercial_value: commercialValue,
        demographic_hints: llmAnalysis.demographic_hints,
        ad_keywords: llmAnalysis.ad_keywords
      })
      .select('*')
      .single();

    if (profileError && profileError.code !== '23505') {
      console.error('Error saving interest profile:', profileError);
    }

    // 4. Registrar evento de análisis
    await supabase
      .from('guest_behavior_events')
      .insert({
        guest_id,
        event_type: 'question_analyzed',
        event_data: {
          question_length: question.length,
          category: llmAnalysis.primary_category,
          commercial_value: commercialValue,
          confidence: llmAnalysis.confidence_score,
          tags_count: llmAnalysis.generated_tags?.length || 0,
          session_id,
          purchase_intent_score: llmAnalysis.purchase_intent_score,
          industry_vertical: llmAnalysis.industry_vertical
        }
      });

    // 5. Generar segmentos dinámicos (sin funciones SQL hardcodeadas)
    const adSegments = generateDynamicAdSegments(llmAnalysis, commercialValue);

    // 6. Calcular potencial de revenue dinámico
    const revenuePotential = calculateDynamicRevenuePotential(llmAnalysis, commercialValue);

    return NextResponse.json({
      success: true,
      analysis: {
        category: llmAnalysis.primary_category,
        secondary_categories: llmAnalysis.secondary_categories,
        tags: llmAnalysis.generated_tags,
        confidence: llmAnalysis.confidence_score,
        commercial_value: commercialValue,
        keywords: llmAnalysis.ad_keywords,
        industry_vertical: llmAnalysis.industry_vertical,
        purchase_intent_score: llmAnalysis.purchase_intent_score
      },
      ad_targeting: {
        segments: adSegments,
        premium_eligible: commercialValue > 6,
        estimated_cpm: revenuePotential.premium_cpm
      },
      revenue_impact: revenuePotential,
      profile_updated: !!profileData
    });

  } catch (error) {
    console.error('Error in question analysis:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * ANÁLISIS COMPLETAMENTE DINÁMICO CON GEMINI AI
 * NO HAY CATEGORÍAS PREDEFINIDAS - TODO ES DETECTADO POR IA
 */
async function analyzeQuestionWithGeminiAI(questionText: string) {
  try {
    const prompt = `
Eres un experto en marketing digital y análisis de intención comercial con acceso a datos de Google Ads en tiempo real.

PREGUNTA: "${questionText}"

Tu trabajo es detectar CUALQUIER oportunidad comercial sin limitaciones de categorías predefinidas.

RESPONDE SOLO CON JSON VÁLIDO:
{
  "primary_category": "categoría_comercial_más_valiosa_detectada",
  "secondary_categories": ["otras_categorías_relevantes"],
  "generated_tags": ["tags_específicos_para_google_ads"],
  "confidence_score": 8.5,
  "ad_keywords": ["keywords_alto_cpc"],
  "demographic_hints": ["perfil_demográfico"],
  "commercial_intent": "high|medium|low",
  "urgency_level": "immediate|short_term|long_term",
  "spending_capacity": "high|medium|low",
  "industry_vertical": "sector_específico",
  "purchase_intent_score": 8.5,
  "estimated_cpc_range": "$2.50-$15.00",
  "target_audience_size": "large|medium|small|niche"
}

INSTRUCCIONES DE ANÁLISIS DINÁMICO:

1. DETECTA LA INTENCIÓN COMERCIAL MÁS VALIOSA:
   - ¿Qué producto/servicio necesita esta persona?
   - ¿Cuánto dinero podría estar dispuesta a gastar?
   - ¿Qué tan urgente es su necesidad?

2. GENERA CATEGORÍA ESPECÍFICA:
   - No uses categorías genéricas como "health" o "money"
   - Usa categorías específicas como "dental_implants", "retirement_401k", "luxury_cruise_booking"
   - Inventa nuevas categorías si es necesario

3. KEYWORDS DE ALTO VALOR:
   - Piensa en qué buscaría en Google para resolver su problema
   - Prioriza keywords con CPC alto (>$3)
   - Incluye variaciones long-tail

4. TAGS ULTRA-ESPECÍFICOS:
   - Incluye intención de compra: "ready_to_buy", "comparing_options", "price_shopping"
   - Incluye timing: "this_week", "within_30_days", "urgent_need"
   - Incluye presupuesto: "premium_budget", "luxury_market", "high_value_customer"

5. DEMOGRAFÍA INTELIGENTE:
   - Edad probable basada en el lenguaje y la pregunta
   - Nivel socioeconómico basado en la sofisticación de la pregunta
   - Situación familiar probable

EJEMPLOS DE ANÁLISIS DINÁMICO:

"¿Me voy a jubilar este año?" →
{
  "primary_category": "retirement_planning_services",
  "secondary_categories": ["financial_advisors", "pension_optimization", "estate_planning"],
  "generated_tags": ["immediate_retirement", "financial_planning_urgent", "pension_consultation", "401k_rollover", "retirement_calculator", "wealth_management", "senior_financial_advice"],
  "ad_keywords": ["retirement financial advisor", "401k rollover services", "pension planning consultation", "retirement income planning"],
  "estimated_cpc_range": "$12.00-$45.00"
}

"¿Debería operarme la rodilla?" →
{
  "primary_category": "orthopedic_surgery_consultation",
  "secondary_categories": ["medical_specialists", "health_insurance", "physical_therapy"],
  "generated_tags": ["knee_surgery_candidate", "orthopedic_consultation", "medical_procedure_planning", "health_insurance_coverage", "surgical_second_opinion"],
  "ad_keywords": ["knee replacement surgery", "orthopedic surgeon near me", "knee surgery cost", "best orthopedic doctor"],
  "estimated_cpc_range": "$8.00-$25.00"
}

"¿Mi startup va a tener éxito?" →
{
  "primary_category": "business_consulting_services",
  "secondary_categories": ["startup_funding", "business_coaching", "marketing_agencies"],
  "generated_tags": ["startup_owner", "business_growth_planning", "funding_seeking", "business_consulting", "entrepreneur_coaching", "startup_marketing"],
  "ad_keywords": ["startup business consultant", "business growth strategy", "startup funding advisor", "entrepreneur coaching"],
  "estimated_cpc_range": "$5.00-$20.00"
}

ANÁLISIS SIN LÍMITES:
- Si la pregunta es sobre algo que no conoces, INVENTA una categoría comercial lógica
- SIEMPRE encuentra algún ángulo comercial, por más abstracta que sea la pregunta
- Piensa como un vendedor: ¿qué le vendería a esta persona?

Analiza la pregunta y devuelve SOLO el JSON.
`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Gemini API key not set');
    
    const response = await fetch(getGeminiApiUrl(apiKey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Un poco más de creatividad para categorías dinámicas
          topK: 40,
          maxOutputTokens: 1200
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No se generó texto por Gemini AI');
    }

    // Limpiar y parsear JSON
    const cleanedText = generatedText
      .replace(/```json\n?|\n?```/g, '')
      .replace(/^\s*|\s*$/g, '')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Cleaned text:', cleanedText);
      throw new Error('JSON inválido generado por IA');
    }

    // Validación mínima
    if (!parsedResult.primary_category || !Array.isArray(parsedResult.generated_tags)) {
      throw new Error('Estructura JSON inválida de IA');
    }

    // Normalizar scores
    parsedResult.confidence_score = Math.max(1, Math.min(10, parsedResult.confidence_score || 5));
    parsedResult.purchase_intent_score = Math.max(1, Math.min(10, parsedResult.purchase_intent_score || 5));

    return {
      success: true,
      ...parsedResult
    };

  } catch (error) {
    console.error('Gemini AI Analysis Error:', error);
    
    // Fallback ultra-simple
    return {
      success: true,
      primary_category: 'general_consultation',
      secondary_categories: ['personal_guidance'],
      generated_tags: ['consultation_seeking', 'guidance_needed', 'personal_advice'],
      confidence_score: 3.0,
      ad_keywords: ['personal consultant', 'life advice', 'guidance services'],
      demographic_hints: ['adult', 'advice_seeking'],
      commercial_intent: 'low',
      urgency_level: 'long_term',
      spending_capacity: 'medium',
      industry_vertical: 'consulting_services',
      purchase_intent_score: 3.0,
      estimated_cpc_range: '$0.50-$2.00',
      target_audience_size: 'large',
      fallback_used: true
    };
  }
}

/**
 * CÁLCULO DINÁMICO DE VALOR COMERCIAL (reemplaza función SQL hardcodeada)
 */
function calculateDynamicCommercialValue(analysis: any): number {
  const baseValue = 5.0;

  // Factor por intención de compra
  const purchaseIntentMultiplier = (analysis.purchase_intent_score || 5) / 5;
  
  // Factor por urgencia
  const urgencyMultiplier = {
    'immediate': 2.0,
    'short_term': 1.5,
    'long_term': 1.0
  }[analysis.urgency_level] || 1.0;

  // Factor por capacidad de gasto
  const spendingMultiplier = {
    'high': 2.5,
    'medium': 1.5,
    'low': 1.0
  }[analysis.spending_capacity] || 1.0;

  // Factor por tamaño de audiencia (nicho = más valioso)
  const audienceMultiplier = {
    'niche': 2.0,
    'small': 1.5,
    'medium': 1.2,
    'large': 1.0
  }[analysis.target_audience_size] || 1.0;

  // Factor por CPC estimado
  const cpcRange = analysis.estimated_cpc_range || '$1.00-$3.00';
  const maxCpc = parseFloat(cpcRange.split('-')[1]?.replace('$', '') || '3');
  const cpcMultiplier = Math.min(3.0, maxCpc / 5);

  // Cálculo final
  const finalValue = baseValue * purchaseIntentMultiplier * urgencyMultiplier * spendingMultiplier * audienceMultiplier * cpcMultiplier;

  return Math.max(1.0, Math.min(15.0, Math.round(finalValue * 10) / 10));
}

/**
 * GENERACIÓN DINÁMICA DE SEGMENTOS (reemplaza función SQL hardcodeada)
 */
function generateDynamicAdSegments(analysis: any, commercialValue: number): string[] {
  const segments = ['general'];

  // Segmentos base por categoría
  segments.push(analysis.primary_category);
  
  // Agregar categorías secundarias
  if (analysis.secondary_categories) {
    segments.push(...analysis.secondary_categories);
  }

  // Segmentos por industria
  if (analysis.industry_vertical) {
    segments.push(analysis.industry_vertical);
  }

  // Segmentos por intención
  if (analysis.commercial_intent === 'high') {
    segments.push('high_intent', 'ready_to_purchase');
  }

  // Segmentos por valor comercial
  if (commercialValue >= 8) {
    segments.push('premium_audience', 'high_value_customer');
  } else if (commercialValue >= 6) {
    segments.push('medium_value_customer');
  }

  // Segmentos por urgencia
  if (analysis.urgency_level === 'immediate') {
    segments.push('urgent_need', 'immediate_purchase');
  }

  // Segmentos por presupuesto
  if (analysis.spending_capacity === 'high') {
    segments.push('luxury_market', 'premium_budget');
  }

  // Segmentos geográficos y demográficos
  segments.push('argentina', 'spanish_speaking');

  return [...new Set(segments)]; // Remover duplicados
}

/**
 * CÁLCULO DINÁMICO DE REVENUE POTENTIAL
 */
function calculateDynamicRevenuePotential(analysis: any, commercialValue: number) {
  const baseCPM = 0.30;
  
  // Multiplicador más sofisticado basado en análisis AI
  let multiplier = 1;
  
  if (commercialValue >= 10) multiplier = 25; // $7.50 CPM
  else if (commercialValue >= 8) multiplier = 20; // $6.00 CPM
  else if (commercialValue >= 7) multiplier = 15; // $4.50 CPM
  else if (commercialValue >= 6) multiplier = 10; // $3.00 CPM
  else if (commercialValue >= 5) multiplier = 5;  // $1.50 CPM
  
  // Bonus por CPC alto estimado
  const cpcRange = analysis.estimated_cpc_range || '$1.00-$3.00';
  const maxCpc = parseFloat(cpcRange.split('-')[1]?.replace('$', '') || '3');
  if (maxCpc > 10) multiplier *= 1.5;
  
  const premiumCPM = baseCPM * multiplier;
  
  return {
    base_cpm: baseCPM,
    premium_cpm: premiumCPM,
    multiplier: multiplier,
    uplift_percentage: ((premiumCPM - baseCPM) / baseCPM * 100).toFixed(0),
    monthly_revenue_estimate: ((premiumCPM - baseCPM) * 1000).toFixed(2),
    estimated_cpc_range: analysis.estimated_cpc_range,
    market_category: analysis.primary_category
  };
}

/**
 * GET: Obtener análisis existente de un usuario
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const guestId = url.searchParams.get('guest_id');

    if (!guestId) {
      return NextResponse.json({ error: 'guest_id requerido' }, { status: 400 });
    }

    const supabase = createClient();

    const { data: profile, error } = await supabase
      .from('user_interest_profiles')
      .select('*')
      .eq('guest_id', guestId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !profile) {
      return NextResponse.json({
        has_profile: false,
        segments: ['general'],
        premium_eligible: false
      });
    }

    // Generar segmentos dinámicamente (no usar función SQL)
    const dynamicSegments = generateDynamicAdSegments(profile, profile.commercial_value);
    const revenuePotential = calculateDynamicRevenuePotential(profile, profile.commercial_value);

    return NextResponse.json({
      has_profile: true,
      profile: {
        category: profile.primary_category,
        tags: profile.generated_tags,
        commercial_value: profile.commercial_value,
        confidence: profile.confidence_score,
        created_at: profile.created_at
      },
      ad_targeting: {
        segments: dynamicSegments,
        premium_eligible: profile.commercial_value > 6,
        estimated_cpm: revenuePotential.premium_cpm
      },
      revenue_impact: revenuePotential
    });

  } catch (error) {
    console.error('Error getting analysis:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
