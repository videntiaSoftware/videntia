import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * API para análisis de preguntas con GEMINI AI y generación de tags comerciales
 * CORE del sistema de monetización - Revenue de $0.30 a $5-15 CPM
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

    // 1. Analizar pregunta con Gemini AI
    const llmAnalysis = await analyzeQuestionWithGeminiAI(question);

    if (!llmAnalysis.success) {
      return NextResponse.json({ 
        error: 'Error analizando pregunta con IA',
        details: llmAnalysis.error 
      }, { status: 500 });
    }

    const supabase = createClient();

    // 2. Calcular valor comercial usando la función de Supabase
    const { data: commercialValue } = await supabase
      .rpc('calculate_commercial_value', {
        p_category: llmAnalysis.primary_category,
        p_tags: llmAnalysis.generated_tags,
        p_confidence: llmAnalysis.confidence_score
      });

    // 3. Guardar perfil de interés en Supabase
    const { data: profileData, error: profileError } = await supabase
      .from('user_interest_profiles')
      .insert({
        guest_id,
        question_text: question.trim(),
        primary_category: llmAnalysis.primary_category,
        generated_tags: llmAnalysis.generated_tags,
        confidence_score: llmAnalysis.confidence_score,
        commercial_value: commercialValue || 5,
        demographic_hints: llmAnalysis.demographic_hints,
        ad_keywords: llmAnalysis.ad_keywords
      })
      .select('*')
      .single();

    if (profileError && profileError.code !== '23505') { // Ignore unique constraint errors
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
          commercial_value: commercialValue || 5,
          confidence: llmAnalysis.confidence_score,
          tags_count: llmAnalysis.generated_tags?.length || 0,
          session_id
        }
      });

    // 5. Obtener segmentos para ads premium
    const { data: adSegments } = await supabase
      .rpc('get_user_ad_segments', { p_guest_id: guest_id });

    // 6. Calcular potencial de revenue
    const revenuePotential = calculateRevenuePotential(commercialValue || 5);

    return NextResponse.json({
      success: true,
      analysis: {
        category: llmAnalysis.primary_category,
        tags: llmAnalysis.generated_tags,
        confidence: llmAnalysis.confidence_score,
        commercial_value: commercialValue || 5,
        keywords: llmAnalysis.ad_keywords
      },
      ad_targeting: {
        segments: adSegments || ['general'],
        premium_eligible: (commercialValue || 5) > 6,
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
 * ANÁLISIS REAL CON GEMINI AI - SISTEMA DINÁMICO
 */
async function analyzeQuestionWithGeminiAI(questionText: string) {
  try {
    const prompt = `
Eres un experto en marketing digital y análisis de intención comercial. Analiza esta pregunta de tarot para generar tags de targeting ultra-específicos para Google Ads.

PREGUNTA: "${questionText}"

SISTEMA DINÁMICO - NO hay categorías limitadas. Detecta la categoría comercial MÁS ESPECÍFICA y VALIOSA.

Devuelve SOLO un JSON válido con esta estructura:
{
  "primary_category": "categoría_comercial_específica",
  "secondary_categories": ["cat2", "cat3"],
  "generated_tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"],
  "confidence_score": 8.5,
  "ad_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "demographic_hints": ["demo1", "demo2", "demo3"],
  "commercial_intent": "high|medium|low",
  "urgency_level": "immediate|short_term|long_term",
  "spending_capacity": "high|medium|low",
  "industry_vertical": "sector_específico",
  "purchase_intent_score": 8.5
}

CATEGORÍAS DE ALTO VALOR ($10-20 CPM):
- "retirement_planning", "estate_planning", "pension_consultation"
- "real_estate_investment", "property_buying", "mortgage_refinancing"
- "luxury_travel", "premium_vacation", "cruise_planning"
- "business_loans", "commercial_financing", "startup_funding"
- "insurance_products", "life_insurance", "health_insurance"
- "legal_services", "divorce_attorney", "estate_attorney"
- "medical_procedures", "cosmetic_surgery", "dental_implants"
- "education_financing", "MBA_programs", "university_tuition"
- "wedding_planning", "luxury_wedding", "destination_wedding"
- "home_renovation", "kitchen_remodeling", "bathroom_renovation"

CATEGORÍAS DE VALOR MEDIO ($3-8 CPM):
- "career_development", "job_search", "professional_training"
- "automotive_purchase", "car_insurance", "auto_loans"
- "technology_products", "software_subscriptions", "business_tools"
- "fitness_programs", "nutrition_coaching", "wellness_services"
- "relationship_counseling", "therapy_services", "dating_coaching"

CATEGORÍAS BÁSICAS ($1-3 CPM):
- "general_wellness", "spiritual_guidance", "personal_development"
- "entertainment", "hobbies", "general_advice"

INSTRUCCIONES PARA CATEGORIZACIÓN DINÁMICA:
1. Identifica la INTENCIÓN COMERCIAL más específica posible
2. Crea nuevas categorías si no existe una específica
3. Prioriza categorías con productos/servicios de alto valor
4. Considera urgencia temporal y capacidad de gasto
5. Usa terminología que Google Ads reconozca

GENERACIÓN DE TAGS INTELIGENTE:
Para CUALQUIER categoría, incluye tags de:
- INTENCIÓN: ["buy_intent", "research_phase", "comparison_shopping", "urgent_need", "immediate_purchase"]
- TIMING: ["this_week", "this_month", "this_quarter", "this_year", "long_term_planning"]
- BUDGET: ["premium_budget", "high_spending", "mid_range", "budget_conscious", "luxury_market"]
- DEMOGRÁFICO: ["young_professional", "middle_aged", "senior_citizen", "family_oriented", "single_professional"]
- GEOGRÁFICO: ["urban_dweller", "suburban", "rural", "international", "local_services"]
- COMPORTAMIENTO: ["online_researcher", "price_sensitive", "brand_loyal", "early_adopter", "decision_maker"]

AD KEYWORDS de ALTO CPC:
Genera keywords específicos que tengan alto valor en Google Ads para la categoría detectada.

EJEMPLOS DE CATEGORIZACIÓN DINÁMICA:

Pregunta: "¿Me voy a jubilar este año?"
→ Categoría: "retirement_planning"
→ Tags: ["retirement_intent", "immediate_retirement", "pension_planning", "financial_advisor_needed", "retirement_calculation"]

Pregunta: "¿Debería comprar esa casa?"
→ Categoría: "real_estate_purchase"
→ Tags: ["home_buying_intent", "mortgage_needed", "real_estate_investment", "property_research", "immediate_purchase"]

Pregunta: "¿Mi negocio va a crecer?"
→ Categoría: "business_growth"
→ Tags: ["business_expansion", "commercial_loans", "marketing_services", "business_consulting", "growth_planning"]

SCORING INTELIGENTE:
- confidence_score: 1-10 (claridad de intención comercial)
- purchase_intent_score: 1-10 (probabilidad de compra real)
- commercial_intent: high (>$1000 potential), medium ($100-1000), low (<$100)
- urgency_level: immediate (días), short_term (semanas/meses), long_term (años)
- spending_capacity: high (>$5000), medium ($500-5000), low (<$500)

Analiza la pregunta y devuelve SOLO el JSON sin explicaciones adicionales.
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
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
          temperature: 0.1, // Muy baja para consistencia máxima
          topK: 1,
          maxOutputTokens: 1000
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
      .replace(/```json\n?|\n?```/g, '') // Remover markdown
      .replace(/^\s*|\s*$/g, '') // Trim
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remover caracteres de control

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Cleaned text:', cleanedText);
      throw new Error('JSON inválido generado por IA');
    }

    // Validar estructura requerida
    if (!parsedResult.primary_category || !Array.isArray(parsedResult.generated_tags)) {
      throw new Error('Estructura JSON inválida de IA');
    }

    // Asegurar que confidence_score esté en rango válido
    if (typeof parsedResult.confidence_score !== 'number' || parsedResult.confidence_score < 1 || parsedResult.confidence_score > 10) {
      parsedResult.confidence_score = 5.0;
    }

    return {
      success: true,
      ...parsedResult
    };

  } catch (error) {
    console.error('Gemini AI Analysis Error:', error);
    
    // Fallback: análisis básico sin IA
    const fallbackAnalysis = createFallbackAnalysis(questionText);
    return {
      success: true,
      ...fallbackAnalysis,
      fallback_used: true
    };
  }
}

/**
 * Análisis fallback cuando Gemini AI falla - SISTEMA DINÁMICO
 */
function createFallbackAnalysis(questionText: string) {
  const lowerQuestion = questionText.toLowerCase();
  
  // Palabras clave dinámicas por categoría de alto valor
  const categoryKeywords: Record<string, string[]> = {
    retirement_planning: ['jubil', 'pension', 'retir', 'ahorr', 'inversion'],
    real_estate_investment: ['casa', 'propiedad', 'inmueble', 'comprar', 'vender', 'hipoteca'],
    business_growth: ['negocio', 'empresa', 'emprendimiento', 'comercio', 'sociedad'],
    medical_procedures: ['operar', 'cirugia', 'tratamiento', 'salud', 'medico'],
    education_financing: ['estudi', 'universidad', 'curso', 'capacita', 'educacion'],
    luxury_travel: ['viaj', 'vacation', 'europa', 'crucero', 'lujo'],
    career_development: ['trabajo', 'carrera', 'empleo', 'ascenso', 'profesional'],
    relationships: ['amor', 'pareja', 'matrimonio', 'boda', 'divorcio'],
    automotive: ['auto', 'carro', 'vehiculo', 'moto', 'comprar'],
    insurance: ['seguro', 'proteccion', 'cobertura', 'poliza'],
    legal_services: ['abogado', 'legal', 'juicio', 'demanda', 'testamento'],
    spiritual_guidance: ['espiritual', 'alma', 'energia', 'proposito', 'destino']
  };

  let bestCategory = 'spiritual_guidance';
  let maxMatches = 0;

  // Encontrar categoría con más coincidencias
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const matches = keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }

  // Generar tags dinámicos
  const tags = [
    `${bestCategory}_intent`,
    maxMatches > 0 ? 'clear_intent' : 'general_inquiry',
    'spanish_market',
    'adult_demographic'
  ];

  return {
    primary_category: bestCategory,
    secondary_categories: ['general_guidance'],
    generated_tags: tags,
    confidence_score: Math.min(10, 3 + maxMatches * 2),
    ad_keywords: categoryKeywords[bestCategory]?.slice(0, 4) || ['general', 'advice'],
    demographic_hints: ['adult', 'spanish_speaking', 'argentina'],
    commercial_intent: maxMatches > 1 ? 'medium' : 'low',
    urgency_level: 'short_term',
    spending_capacity: 'medium',
    industry_vertical: bestCategory,
    purchase_intent_score: Math.min(10, 2 + maxMatches * 2)
  };
}

function calculateRevenuePotential(commercialValue: number) {
  const baseCPM = 0.30;
  
  // Multiplicador basado en valor comercial
  let multiplier = 1;
  if (commercialValue >= 8) multiplier = 15; // $4.50 CPM
  else if (commercialValue >= 7) multiplier = 10; // $3.00 CPM  
  else if (commercialValue >= 6) multiplier = 6;  // $1.80 CPM
  else if (commercialValue >= 5) multiplier = 3;  // $0.90 CPM
  
  const premiumCPM = baseCPM * multiplier;
  
  return {
    base_cpm: baseCPM,
    premium_cpm: premiumCPM,
    multiplier: multiplier,
    uplift_percentage: ((premiumCPM - baseCPM) / baseCPM * 100).toFixed(0),
    monthly_revenue_estimate: ((premiumCPM - baseCPM) * 1000).toFixed(2) // Por 1000 usuarios/mes
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

    // Obtener perfil más reciente
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

    // Obtener segmentos para ads
    const { data: segments } = await supabase
      .rpc('get_user_ad_segments', { p_guest_id: guestId });

    const revenuePotential = calculateRevenuePotential(profile.commercial_value);

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
        segments: segments || ['general'],
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
