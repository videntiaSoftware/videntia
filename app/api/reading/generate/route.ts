import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

// Tipos básicos para la lectura de tarot
export type ReadingType = 'single' | 'three_card' | 'love' | 'career' | 'celtic_cross';

const cardsInfo = (selectedCards: {id: number, orientation: 'upright' | 'reversed'}[], count: number, tarotData: any[]) => 
  selectedCards.slice(0, count).map(sel => {
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

// Llamada real a Gemini Flash 1.5 Lite
async function getGeminiInterpretation(cards: any[], prompt: string) {
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
  const data = await response.json();
  const interpretation = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener interpretación.';
  return interpretation;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { type, question, cards }: { type: ReadingType, question?: string, cards: {id: number, orientation: 'upright' | 'reversed'}[] } = await req.json();
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
    .in('id', selectedIds);
  if (error || !tarotData) {
    console.error('Error fetching tarot cards from Supabase:', error);
    return NextResponse.json({ error: 'No se pudieron obtener los datos de las cartas.' }, { status: 500 });
  }
  console.log('Tarot cards data from Supabase:', tarotData);

  // Armar info de cada carta según orientación
  const cardsInfo = (cards || []).slice(0, count).map((sel: {id: number, orientation: 'upright' | 'reversed'}) => {
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
  const prompt = `Cartas seleccionadas para la pregunta: "${question || ''}"
${cardsInfo.map((c: { name: string; orientation: string; keywords: string; interpretation: string }) => `- ${c.name} (${c.orientation}): keywords: ${c.keywords}. Interpretación: ${c.interpretation}`).join('\n')}
Redacta una conclusión general para esta tirada, integrando los significados de las cartas y la pregunta.`;
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
