import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { getUserTier, getTierLimits, canAccessReadingType, hasReachedDailyLimit, getTotalDailyReadings } from '@/lib/user-tiers';
import { analyzeUserBehavior, checkRateLimit, validateDeviceFingerprint, analyzeQuestionContent, calculatePunishment } from '@/lib/anti-abuse';

// export type ReadingType = 'single' | 'three_card' | 'love' | 'career' | 'celtic_cross';
type ReadingType = 'single' | 'three_card' | 'love' | 'career' | 'celtic_cross';

// Comentado: variable no usada
// const cardsInfo = (cards || []).slice(0, count).map((sel: any) => { /* ... */ });

// Llamada real a Gemini Flash 1.5 Lite
async function getGeminiInterpretation(cards: { name: string; orientation: string; keywords: string; interpretation: string }[], prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not set');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  if (!response.ok) {
    throw new Error('Error al llamar a Gemini: ' + (await response.text()));
  }
  const data: { candidates?: { content?: { parts?: { text?: string }[] } }[] } = await response.json();
  const interpretation = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener interpretación.';
  return interpretation;
}

// --- PROMPT CONFIGURATIONS SEGÚN TIPO DE LECTURA ---
const PROMPT_CONFIG: Record<string, { instructions: string; layout?: string[] }> = {
  three_card: {
    instructions: "Interpreta cada carta como pasado, presente y futuro. Relaciona cada posición con la pregunta y ofrece una síntesis final.",
    layout: ["Pasado", "Presente", "Futuro"],
  },
  celtic_cross: {
    instructions: "Sigue el significado tradicional de la Cruz Celta para cada posición. Relaciona cada carta con su posición y la pregunta. Ofrece una visión profunda y una síntesis final.",
    layout: [
      "Situación actual", "Desafío", "Pasado", "Futuro", "Meta", "Inconsciente", "Influencia externa", "Esperanzas", "Resultado", "Síntesis"
    ],
  },
  yes_no: {
    instructions: "Da una respuesta clara de sí o no, justificando con la carta y su orientación. Explica brevemente el porqué.",
    layout: ["Respuesta"],
  },
  love_relationship: {
    instructions: "Interpreta cada carta según su posición: tú, la otra persona, obstáculos, potencial. Relaciona todo con la pregunta y concluye con un consejo.",
    layout: ["Tú", "La otra persona", "Obstáculos", "Potencial"],
  },
  soulmate: {
    instructions: "Explora la conexión espiritual, bloqueos y caminos para sanar. Relaciona cada carta con su posición y la pregunta.",
    layout: ["Conexión", "Bloqueos", "Camino a sanar"],
  },
  life_purpose: {
    instructions: "Interpreta cada carta como dones, misión, bloqueos y próximos pasos. Relaciona con la pregunta y concluye con una orientación práctica.",
    layout: ["Dones", "Misión", "Bloqueos", "Próximos pasos"],
  },
  shadow_work: {
    instructions: "Revela aspectos inconscientes, miedos y sanación. Relaciona cada carta con su posición y la pregunta.",
    layout: ["Inconsciente", "Miedo", "Sanación"],
  },
  single: {
    instructions: "Da una interpretación profunda de la carta seleccionada en relación a la pregunta. Ofrece un mensaje claro y directo.",
    layout: ["Mensaje principal"],
  },
  career: {
    instructions: "Interpreta cada carta como pasado, presente y futuro en el ámbito laboral o profesional. Relaciona cada posición con la pregunta y concluye con un consejo práctico.",
    layout: ["Pasado laboral", "Presente laboral", "Futuro laboral"],
  },
  general: {
    instructions: "Da una visión general sobre la situación consultada, integrando el significado de cada carta y su posición. Concluye con una síntesis y consejo.",
    layout: ["Primera carta", "Segunda carta", "Tercera carta"],
  },
  health: {
    instructions: "Interpreta cada carta en relación a la salud física, emocional y mental. Relaciona cada posición con la pregunta y concluye con una recomendación de bienestar.",
    layout: ["Salud física", "Salud emocional", "Salud mental"],
  },
  spiritual_path: {
    instructions: "Interpreta cada carta como etapas o aprendizajes en el camino espiritual del consultante. Relaciona cada posición con la pregunta y concluye con una guía espiritual.",
    layout: ["Inicio del camino", "Desafío espiritual", "Lección principal"],
  },
  blockage: {
    instructions: "Identifica bloqueos, su origen y cómo superarlos. Relaciona cada carta con su posición y la pregunta.",
    layout: ["Bloqueo actual", "Origen del bloqueo", "Cómo superarlo"],
  },
  decision: {
    instructions: "Interpreta cada carta como una opción o camino posible. Relaciona cada posición con la pregunta y concluye con una recomendación sobre la mejor decisión.",
    layout: ["Opción 1", "Opción 2", "Opción 3"],
  },
  family: {
    instructions: "Interpreta cada carta en relación a la dinámica familiar, roles y evolución. Relaciona cada posición con la pregunta y concluye con un consejo para la armonía familiar.",
    layout: ["Situación familiar", "Conflicto o reto", "Evolución o consejo"],
  },
  finances: {
    instructions: "Interpreta cada carta en relación a la situación financiera, oportunidades y advertencias. Relaciona cada posición con la pregunta y concluye con una recomendación económica.",
    layout: ["Situación actual", "Oportunidad", "Advertencia"],
  },
  project: {
    instructions: "Interpreta cada carta como fases de un proyecto: inicio, desarrollo y resultado. Relaciona cada posición con la pregunta y concluye con una síntesis sobre el éxito del proyecto.",
    layout: ["Inicio", "Desarrollo", "Resultado"],
  },
  friendship: {
    instructions: "Interpreta cada carta en relación a la amistad consultada: situación, desafío y potencial. Relaciona cada posición con la pregunta y concluye con un consejo para fortalecer la amistad.",
    layout: ["Situación actual", "Desafío", "Potencial"],
  },
  self_knowledge: {
    instructions: "Interpreta cada carta como un aspecto del autoconocimiento: fortaleza, debilidad y potencial oculto. Relaciona cada posición con la pregunta y concluye con una guía para el crecimiento personal.",
    layout: ["Fortaleza", "Debilidad", "Potencial oculto"],
  },
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  // --- Enhanced User Authentication & Tier Detection ---
  let userId = null;
  let user = null;
  let userTier: 'guest' | 'free' | 'premium' = 'guest';
  let guestId = null;
  
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
      user = userData.user;
      userId = user.id;
      userTier = getUserTier(user);
    } else {
      guestId = body.guest_id || null;
    }
  } catch (e) {
    // Continue as guest if auth fails
  }

  console.log(`[API] User tier: ${userTier}, User ID: ${userId}, Guest ID: ${guestId}`);

  // --- Enhanced Anti-Abuse Analysis ---
  const userActivity = {
    sessionDuration: body.sessionDuration || 0,
    readingsRequested: body.readingsRequested || 1,
    timeSpentPerReading: body.timeSpentPerReading || 60000,
    repeatQuestions: body.repeatQuestions || 0,
    deviceFingerprint: body.deviceFingerprint || '',
    ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
    userAgent: req.headers.get('user-agent') || '',
    timezoneOffset: body.timezoneOffset || 0,
  };

  const suspicionAnalysis = analyzeUserBehavior(userActivity);
  console.log(`[ANTI-ABUSE] Suspicion level: ${suspicionAnalysis.level}, Score: ${suspicionAnalysis.score}`);

  // --- Question Content Analysis ---
  const question = body.question || '';
  const questionAnalysis = analyzeQuestionContent(question);
  if (questionAnalysis.isSpam) {
    console.warn(`[SPAM] Detected spam question: ${questionAnalysis.reasons.join(', ')}`);
    return NextResponse.json({ 
      error: 'La pregunta contiene contenido no permitido.',
      details: questionAnalysis.reasons 
    }, { status: 400 });
  }

  // --- Reading Type Access Control ---
  const readingType = body.type as ReadingType;
  if (!canAccessReadingType(userTier, readingType)) {
    return NextResponse.json({ 
      error: 'Este tipo de lectura está disponible solo para usuarios premium.',
      upgradeRequired: true,
      readingType,
    }, { status: 403 });
  }

  // --- Enhanced reCAPTCHA Validation (for non-premium users) ---
  if (userTier !== 'premium') {
    const recaptchaToken = body.recaptchaToken;
    console.log("[reCAPTCHA] Token recibido en backend:", recaptchaToken);
    
    if (!recaptchaToken) {
      console.warn(`[SUSPECT] Intento sin reCAPTCHA | IP: ${userActivity.ipAddress} | guest_id: ${guestId}`);
      return NextResponse.json({ error: 'Falta el token de reCAPTCHA. Por favor, recarga la página e intenta de nuevo.' }, { status: 400 });
    }
    
    // Validate reCAPTCHA with Google
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    
    try {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secret}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      console.log("[reCAPTCHA] Respuesta de Google:", verifyData);
      
      if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
        console.warn(`[SUSPECT] Fallo reCAPTCHA | IP: ${userActivity.ipAddress} | guest_id: ${guestId} | score: ${verifyData.score}`);
        return NextResponse.json({ 
          error: 'No se pudo verificar reCAPTCHA. Por favor, recarga la página e intenta de nuevo.' 
        }, { status: 403 });
      }
    } catch (recaptchaError) {
      console.error(`[reCAPTCHA] Error de conectividad:`, recaptchaError);
      // En caso de error de conectividad con Google, permitir la lectura pero logear el evento
      console.warn(`[reCAPTCHA] Fallback activado por error de conectividad | IP: ${userActivity.ipAddress} | guest_id: ${guestId}`);
    }
  }

  // --- Enhanced Rate Limiting by Tier ---
  let filter = {};
  let who = '';
  if (userId) {
    filter = { user_id: userId };
    who = `user_id: ${userId}`;
  } else if (guestId) {
    filter = { guest_id: guestId };
    who = `guest_id: ${guestId}`;
  } else {
    const ip = userActivity.ipAddress;
    filter = { ip };
    who = `ip: ${ip}`;
  }

  // Check today's readings
  const today = new Date();
  today.setHours(0,0,0,0);
  const { data: readingsToday, error: errorReadings } = await supabase
    .from('readings')
    .select('id,created_at')
    .match(filter)
    .gte('created_at', today.toISOString());

  const todayCount = readingsToday?.length || 0;
  
  // Get ads watched today (for free tier bonus)
  let adsWatchedToday = 0;
  if (userTier === 'free' && userId) {
    const { data: adsData } = await supabase
      .from('ad_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('verified', true)
      .gte('created_at', today.toISOString()) || { data: [] };
    adsWatchedToday = adsData?.length || 0;
  }

  const totalAllowedReadings = getTotalDailyReadings(userTier, adsWatchedToday);
  const hasReachedLimit = hasReachedDailyLimit(userTier, todayCount) && totalAllowedReadings !== -1;

  if (hasReachedLimit) {
    console.warn(`[RATE_LIMIT] Exceso de consultas diarias | ${who} | intentos hoy: ${todayCount} | límite: ${totalAllowedReadings}`);
    
    // Provide different messages based on tier
    let errorMessage = '';
    let suggestions: string[] = [];
    
    if (userTier === 'guest') {
      errorMessage = 'Has alcanzado tu límite de 1 lectura gratuita por día.';
      suggestions = [
        'Crea una cuenta gratuita para obtener 3 lecturas diarias',
        'Regístrate para guardar tu historial de lecturas'
      ];
    } else if (userTier === 'free') {
      errorMessage = `Has usado tus ${totalAllowedReadings} lecturas diarias.`;
      suggestions = [
        'Ve un anuncio para obtener lecturas adicionales',
        'Upgrade a Premium para lecturas ilimitadas'
      ];
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      suggestions,
      tier: userTier,
      usedReadings: todayCount,
      totalAllowed: totalAllowedReadings,
      canWatchAds: userTier === 'free' && adsWatchedToday < 2,
    }, { status: 429 });
  }

  const { type, question: questionFromBody, cards }: { type: ReadingType, question?: string, cards: {id: number, orientation: 'upright' | 'reversed'}[] } = body;
  console.log('POST /api/reading/generate - request body:', { type, question: questionFromBody, cards });

  // Lógica de cantidad de cartas según tipo
  const typeToCount: Record<ReadingType, number> = {
    single: 1,
    three_card: 3,
    love: 3,
    career: 3,
    celtic_cross: 10,
  };
  const count = typeToCount[type] || 1;
  const selectedIds = (cards || []).slice(0, count).map((c: {id: number}) => c.id);
  console.log('Selected card IDs:', selectedIds);

  // Buscar cartas en Supabase
  const { data: tarotData, error } = await supabase
    .from('tarot_cards')
    .select('id, name, keywords_upright, keywords_reversed, interpretation_upright, interpretation_reversed')
    .in('id', selectedIds) as unknown as { data: { id: number; name: string; keywords_upright: string; keywords_reversed: string; interpretation_upright: string; interpretation_reversed: string }[], error: any };
  if (error || !tarotData) {
    console.error('Error fetching tarot cards from Supabase:', error);
    return NextResponse.json({ error: 'No se pudieron obtener los datos de las cartas.' }, { status: 500 });
  }
  console.log('Tarot cards data from Supabase:', tarotData);

  // --- Siempre enviar todas las cartas seleccionadas, en el orden correcto y con su posición ---
  // Usar la cantidad de cartas recibidas, no cortar con 'count'
  const cardsInfo = (cards || []).map((sel: {id: number, orientation: 'upright' | 'reversed'}, idx: number) => {
    const card = tarotData.find((c: { id: number }) => c.id === sel.id);
    if (!card) return null;
    const orientation = sel.orientation === 'reversed' ? 'Invertida' : 'Al derecho';
    const keywords = sel.orientation === 'reversed' ? card.keywords_reversed : card.keywords_upright;
    const interpretation = sel.orientation === 'reversed' ? card.interpretation_reversed : card.interpretation_upright;
    return {
      name: card.name,
      orientation,
      keywords,
      interpretation
    };
  }).filter((c): c is { name: string; orientation: string; keywords: string; interpretation: string } => c !== null);
  console.log('cardsInfo for prompt:', cardsInfo);

  // Armar el prompt para Gemini
  const config = PROMPT_CONFIG[type] || { instructions: '', layout: [] };
  const cardsList = cardsInfo.map((c, i) => {
    const pos = config.layout?.[i] ? `(${config.layout[i]})` : '';
    return `- ${c.name} ${pos} [${c.orientation}]: keywords: ${c.keywords}. Interpretación: ${c.interpretation}`;
  }).join('\n');

  const prompt = `Pregunta: "${questionFromBody || ''}"
${cardsList}
${config.instructions}\nRedacta una conclusión general para esta tirada, integrando los significados de las cartas y la pregunta.`;
  console.log('Prompt enviado a Gemini:', prompt);

  // 🔥 ANALYZE QUESTION WITH LLM FOR PREMIUM AD TARGETING
  let questionAnalysis = null;
  if (questionFromBody && questionFromBody.trim().length >= 5 && guestId) {
    try {
      console.log('[QUESTION_ANALYSIS] Analyzing question for commercial targeting:', questionFromBody);
      
      const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/question-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionFromBody,
          guest_id: guestId,
          session_id: body.session_id || `session_${Date.now()}`
        })
      });

      if (analysisResponse.ok) {
        questionAnalysis = await analysisResponse.json();
        console.log('[QUESTION_ANALYSIS] Success:', {
          category: questionAnalysis.analysis?.category,
          commercial_value: questionAnalysis.analysis?.commercial_value,
          premium_cpm: questionAnalysis.ad_targeting?.estimated_cpm
        });
      } else {
        console.warn('[QUESTION_ANALYSIS] Failed:', analysisResponse.status);
      }
    } catch (analysisError) {
      console.error('[QUESTION_ANALYSIS] Error:', analysisError);
    }
  }

  // Llamada a Gemini para interpretación final
  let interpretation = '';
  try {
    interpretation = await getGeminiInterpretation(cardsInfo, prompt);
    console.log('Respuesta de Gemini:', interpretation);
  } catch (e) {
    console.error('Error llamando a Gemini:', e);
    interpretation = 'No se pudo obtener interpretación.';
  }

  // --- Enhanced reading storage with tier-appropriate data ---
  if (userId && userTier !== 'guest') {
    try {
      const insertObj = {
        user_id: userId,
        question: questionFromBody,
        reading_type: type,
        cards_drawn: cards,
        interpretation: interpretation,
        user_tier: userTier,
        created_at: new Date().toISOString(),
      };
      
      // Check storage limits for free tier
      if (userTier === 'free') {
        const tierLimits = getTierLimits(userTier);
        if (tierLimits.maxStoredReadings > 0) {
          const { data: existingReadings } = await supabase
            .from('readings')
            .select('id')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
          
          if (existingReadings && existingReadings.length >= tierLimits.maxStoredReadings) {
            // Delete oldest readings to make room
            const toDelete = existingReadings.slice(tierLimits.maxStoredReadings - 1);
            await supabase
              .from('readings')
              .delete()
              .in('id', toDelete.map(r => r.id));
          }
        }
      }
      
      await supabase.from("readings").insert([insertObj]);
    } catch (saveError) {
      console.error('Error saving reading:', saveError);
      // Don't fail the request if saving fails
    }
  }

  return NextResponse.json({
    cards: cardsInfo,
    interpretation,
    type,
    question: questionFromBody,
    tier: userTier,
    readingsToday: todayCount + 1,
    remainingReadings: totalAllowedReadings === -1 ? -1 : Math.max(0, totalAllowedReadings - todayCount - 1),
    // 🔥 PREMIUM AD TARGETING DATA
    questionAnalysis: questionAnalysis ? {
      category: questionAnalysis.analysis?.category,
      commercial_value: questionAnalysis.analysis?.commercial_value,
      premium_eligible: questionAnalysis.ad_targeting?.premium_eligible,
      estimated_cpm: questionAnalysis.ad_targeting?.estimated_cpm,
      segments: questionAnalysis.ad_targeting?.segments
    } : null
  });
}
