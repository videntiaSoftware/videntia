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
 * ANÁLISIS REAL CON GEMINI AI
 */
async function analyzeQuestionWithGeminiAI(questionText: string) {
  try {
    const prompt = `
Eres un experto en marketing digital y análisis de intención comercial. Analiza esta pregunta de tarot para generar tags de targeting ultra-específicos.

PREGUNTA: "${questionText}"

Devuelve SOLO un JSON válido con esta estructura:
{
  "primary_category": "travel|relationships|career|money|health|family|spiritual",
  "generated_tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "confidence_score": 8.5,
  "ad_keywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "demographic_hints": ["age_range", "life_stage", "income_level", "location_type"],
  "commercial_intent": "high|medium|low",
  "urgency_level": "immediate|short_term|long_term",
  "spending_capacity": "high|medium|low"
}

SISTEMA DE TAGS ESPECÍFICOS:

TRAVEL:
- Intención: ["travel_intent", "vacation_planning", "business_travel", "relocation_intent", "honeymoon_planning"]
- Destino: ["europe_travel", "domestic_travel", "international_travel", "luxury_travel", "budget_travel"]
- Timing: ["immediate_travel", "summer_vacation", "winter_vacation", "weekend_getaway"]
- Tipo: ["solo_travel", "family_vacation", "couple_travel", "group_travel"]

RELATIONSHIPS:
- Estado: ["single_seeking", "relationship_problems", "marriage_intent", "dating_intent", "breakup_recovery"]
- Tipo: ["serious_relationship", "casual_dating", "long_distance", "age_gap_relationship"]
- Servicios: ["dating_apps", "relationship_coaching", "wedding_planning", "couples_therapy"]

CAREER:
- Intención: ["job_seeking", "career_change", "promotion_seeking", "entrepreneurship", "skill_development"]
- Nivel: ["entry_level", "mid_career", "executive_level", "freelance_intent"]
- Industria: ["tech_career", "finance_career", "creative_career", "healthcare_career"]
- Educación: ["online_courses", "certification_seeking", "university_programs"]

MONEY:
- Objetivos: ["investment_intent", "debt_management", "savings_goals", "passive_income", "financial_planning"]
- Productos: ["credit_cards", "loans", "insurance", "crypto_investment", "stock_trading"]
- Nivel: ["high_net_worth", "middle_income", "budget_conscious", "first_time_investor"]

HEALTH:
- Áreas: ["weight_loss", "fitness_goals", "mental_health", "medical_procedures", "wellness_lifestyle"]
- Urgencia: ["immediate_medical", "preventive_care", "cosmetic_procedures", "chronic_conditions"]
- Servicios: ["telemedicine", "nutrition_coaching", "fitness_programs", "therapy_services"]

FAMILY:
- Etapa: ["pregnancy_planning", "new_parents", "child_education", "elder_care", "family_activities"]
- Necesidades: ["childcare_services", "education_planning", "family_insurance", "home_improvement"]

SPIRITUAL:
- Intereses: ["personal_development", "meditation_seeking", "life_coaching", "spiritual_guidance"]
- Productos: ["courses", "books", "retreats", "coaching_services"]

DEMOGRAPHIC HINTS ESPECÍFICOS:
- Edad: ["age_18_25", "age_26_35", "age_36_45", "age_46_55", "age_56_plus"]
- Ingresos: ["high_income", "medium_income", "low_income", "student_budget", "luxury_spending"]
- Ubicación: ["urban", "suburban", "rural", "international"]
- Estado civil: ["single", "coupled", "married", "divorced", "widowed"]
- Familia: ["no_children", "young_children", "teenagers", "empty_nest"]

AD KEYWORDS ESPECÍFICOS:
Para cada categoría, genera keywords que tengan alto CPC en Google Ads:
- Travel: "europe vacation packages", "luxury hotels", "flight deals", "travel insurance"
- Dating: "dating apps", "relationship coaching", "wedding planning", "couples therapy"
- Career: "online courses", "career coaching", "job search", "professional development"
- Money: "investment platform", "personal loans", "credit cards", "financial advisor"

SCORING:
- confidence_score: 1-10 (qué tan clara es la intención)
- commercial_intent: high (compra probable), medium (investigando), low (curiosidad)
- urgency_level: immediate (necesita ahora), short_term (próximos meses), long_term (futuro)
- spending_capacity: high (>$1000), medium ($100-1000), low (<$100)

EJEMPLO PERFECTO:
Pregunta: "¿Voy a conseguir el trabajo en esa empresa de tecnología?"
{
  "primary_category": "career",
  "generated_tags": ["job_seeking", "tech_career", "interview_preparation", "career_advancement", "employment_intent"],
  "confidence_score": 9.1,
  "ad_keywords": ["tech jobs", "career coaching", "interview preparation", "resume services"],
  "demographic_hints": ["age_26_35", "urban", "medium_income", "single"],
  "commercial_intent": "high",
  "urgency_level": "immediate",
  "spending_capacity": "medium"
}

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
          maxOutputTokens: 800
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
 * Análisis fallback cuando Gemini AI falla
 */
function createFallbackAnalysis(questionText: string) {
  const lowerQuestion = questionText.toLowerCase();
  
  // Palabras clave por categoría
  const categoryKeywords: Record<string, string[]> = {
    travel: ['viaj', 'vacation', 'hotel', 'vuelo', 'europa', 'playa', 'mudar', 'extranjero'],
    money: ['dinero', 'trabajo', 'negocio', 'inversion', 'deuda', 'economia', 'plata', 'ganar'],
    relationships: ['amor', 'pareja', 'matrimonio', 'novio', 'novia', 'ex', 'romance', 'solter'],
    career: ['trabajo', 'carrera', 'empleo', 'jefe', 'profesional', 'estudios', 'ascenso'],
    health: ['salud', 'enfermedad', 'doctor', 'medicina', 'bienestar', 'dolor', 'operar'],
    family: ['familia', 'hijo', 'padre', 'madre', 'hermano', 'bebe', 'embaraz'],
    spiritual: ['espiritual', 'alma', 'energia', 'proposito', 'crecer', 'karma', 'destino']
  };

  let bestCategory = 'spiritual';
  let maxMatches = 0;

  // Encontrar categoría con más coincidencias
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const matches = keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }

  // Generar tags básicos
  const tags = [`${bestCategory}_intent`];
  if (maxMatches > 0) {
    tags.push('clear_intent');
  }

  return {
    primary_category: bestCategory,
    generated_tags: tags,
    confidence_score: Math.min(10, 3 + maxMatches * 2),
    ad_keywords: categoryKeywords[bestCategory].slice(0, 3),
    demographic_hints: ['adult', 'general'],
    commercial_intent: maxMatches > 1 ? 'medium' : 'low'
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


