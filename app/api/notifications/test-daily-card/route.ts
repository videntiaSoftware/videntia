import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server.app';

export async function POST(request: NextRequest) {
  try {
    const { email, date } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log(`[Test Daily Card] Testing for email: ${email}, date: ${date || 'today'}`);

    // Obtener carta del día directamente desde la base de datos
    const supabase = await createClient();
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    let { data: cardData, error } = await supabase
      .from('daily_cards')
      .select('*')
      .eq('date_for', targetDate)
      .single();

    // Si no hay carta para la fecha específica, obtener una aleatoria
    if (error || !cardData) {
      console.log(`No card found for ${targetDate}, getting a random one`);
      const { data: randomCard } = await supabase
        .from('daily_cards')
        .select('*')
        .limit(1);
      
      cardData = randomCard?.[0];
    }
    
    if (!cardData) {
      return NextResponse.json(
        { error: 'No cards available in database' },
        { status: 404 }
      );
    }

    // Enviar email usando el endpoint interno
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/api/notifications/daily-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: 'Usuario de Prueba',
        card_data: cardData
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to send email: ' + emailResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Daily card email sent successfully',
      card: {
        name: cardData.card_name,
        meaning: cardData.card_meaning,
        date_for: cardData.date_for
      }
    });

  } catch (error) {
    console.error('Error in test daily card endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint para mostrar la carta del día sin enviarla
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    // Obtener carta del día directamente desde la base de datos
    const supabase = await createClient();
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    let { data: cardData, error } = await supabase
      .from('daily_cards')
      .select('*')
      .eq('date_for', targetDate)
      .single();

    // Si no hay carta para la fecha específica, obtener una aleatoria
    if (error || !cardData) {
      console.log(`No card found for ${targetDate}, getting a random one`);
      const { data: randomCard } = await supabase
        .from('daily_cards')
        .select('*')
        .limit(1);
      
      cardData = randomCard?.[0];
    }
    
    if (!cardData) {
      // Vamos a verificar si hay alguna carta en la base de datos
      const { data: allCards, error: allCardsError } = await supabase
        .from('daily_cards')
        .select('*')
        .limit(5);
      
      console.log(`[GET Daily Card] Total cards in database:`, allCards?.length || 0);
      console.log(`[GET Daily Card] Database error:`, allCardsError);
      
      return NextResponse.json(
        { 
          error: 'No cards available in database',
          debug: {
            requested_date: targetDate,
            total_cards_in_db: allCards?.length || 0,
            database_error: allCardsError?.message || null,
            sample_cards: allCards?.map(card => ({ name: card.card_name, date: card.date_for })) || []
          }
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      card: cardData
    });

  } catch (error) {
    console.error('Error getting daily card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
