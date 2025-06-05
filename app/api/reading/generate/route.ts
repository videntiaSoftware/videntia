import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

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

  // --- Obtener user_id, guest_id o IP ---
  let userId = null;
  let guestId = null;
  let isPremium = false;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      isPremium = user.user_metadata?.premium === true;
    } else {
      guestId = body.guest_id || null;
    }
  } catch (e) {
    // Si falla, continuar como no autenticado
  }

  // --- Solo pedir y validar reCAPTCHA si el usuario NO está autenticado ---
  if (!userId) {
    const recaptchaToken = body.recaptchaToken;
    if (!recaptchaToken) {
      // Logging intento sospechoso: petición sin reCAPTCHA
      console.warn(`[SUSPECT] Intento sin reCAPTCHA | IP: ${req.headers.get('x-forwarded-for') || req.ip || 'unknown'} | guest_id: ${guestId}`);
      return NextResponse.json({ error: 'Falta el token de reCAPTCHA.' }, { status: 400 });
    }
    // Validar reCAPTCHA v3 con Google
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${recaptchaToken}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
      // Logging intento sospechoso: fallo de reCAPTCHA
      console.warn(`[SUSPECT] Fallo reCAPTCHA | IP: ${req.headers.get('x-forwarded-for') || req.ip || 'unknown'} | guest_id: ${guestId} | score: ${verifyData.score}`);
      return NextResponse.json({ error: 'No se pudo verificar reCAPTCHA. Intenta de nuevo.' }, { status: 403 });
    }
  }

  // --- Rate limiting: solo una consulta diaria por usuario free/no registrado ---
  // Determinar filtro: user_id, guest_id o IP
  let filter = {};
  let who = '';
  if (userId) {
    filter = { user_id: userId };
    who = `user_id: ${userId}`;
  } else if (guestId) {
    filter = { guest_id: guestId };
    who = `guest_id: ${guestId}`;
  } else {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip || 'unknown';
    filter = { ip };
    who = `ip: ${ip}`;
  }
  // Buscar si ya hizo una lectura hoy (por user_id, guest_id o IP)
  const today = new Date();
  today.setHours(0,0,0,0);
  const { data: readingsToday, error: errorReadings } = await supabase
    .from('readings')
    .select('id,created_at')
    .match(filter)
    .gte('created_at', today.toISOString());
  if (!isPremium && readingsToday && readingsToday.length >= 1) {
    // Logging intento sospechoso: más de 1 intento diario
    console.warn(`[SUSPECT] Exceso de consultas diarias | ${who} | intentos hoy: ${readingsToday.length}`);
    return NextResponse.json({ error: 'Solo puedes hacer 1 lectura gratuita por día. Inicia sesión o suscríbete para más.' }, { status: 429 });
  }

  const { type, question, cards }: { type: ReadingType, question?: string, cards: {id: number, orientation: 'upright' | 'reversed'}[] } = body;
  console.log('POST /api/reading/generate - request body:', { type, question, cards });

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

  const prompt = `Pregunta: "${question || ''}"
${cardsList}
${config.instructions}\nRedacta una conclusión general para esta tirada, integrando los significados de las cartas y la pregunta.`;
  console.log('Prompt enviado a Gemini:', prompt);

  // Llamada a Gemini para interpretación final
  let interpretation = '';
  try {
    interpretation = await getGeminiInterpretation(cardsInfo, prompt);
    console.log('Respuesta de Gemini:', interpretation);
  } catch (e) {
    console.error('Error llamando a Gemini:', e);
    interpretation = 'No se pudo obtener interpretación.';
  }

  return NextResponse.json({
    cards: cardsInfo,
    interpretation,
    type,
    question,
  });
}
