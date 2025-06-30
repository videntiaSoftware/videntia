import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Verificar si las tablas existen y tienen datos
    const results = {
      user_profiles: { exists: false, count: 0, error: null as string | null },
      daily_cards: { exists: false, count: 0, error: null as string | null },
      notification_logs: { exists: false, count: 0, error: null as string | null }
    };

    // Verificar user_profiles
    try {
      const { data, error, count } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results.user_profiles.error = error.message;
      } else {
        results.user_profiles.exists = true;
        results.user_profiles.count = count || 0;
      }
    } catch (e) {
      results.user_profiles.error = 'Table does not exist or permission denied';
    }

    // Verificar daily_cards
    try {
      const { data, error, count } = await supabase
        .from('daily_cards')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results.daily_cards.error = error.message;
      } else {
        results.daily_cards.exists = true;
        results.daily_cards.count = count || 0;
      }
    } catch (e) {
      results.daily_cards.error = 'Table does not exist or permission denied';
    }

    // Verificar notification_logs
    try {
      const { data, error, count } = await supabase
        .from('notification_logs')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results.notification_logs.error = error.message;
      } else {
        results.notification_logs.exists = true;
        results.notification_logs.count = count || 0;
      }
    } catch (e) {
      results.notification_logs.error = 'Table does not exist or permission denied';
    }

    // Obtener algunas cartas de ejemplo si existen
    let sampleCards = null;
    if (results.daily_cards.exists && results.daily_cards.count > 0) {
      const { data } = await supabase
        .from('daily_cards')
        .select('*')
        .limit(3);
      sampleCards = data;
    }

    return NextResponse.json({
      success: true,
      database_status: results,
      sample_cards: sampleCards,
      recommendations: getRecommendations(results)
    });

  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      { error: 'Failed to check database status', details: error },
      { status: 500 }
    );
  }
}

function getRecommendations(results: any) {
  const recommendations = [];

  if (!results.user_profiles.exists) {
    recommendations.push("❌ La tabla 'user_profiles' no existe. Ejecuta el schema SQL en Supabase.");
  }

  if (!results.daily_cards.exists) {
    recommendations.push("❌ La tabla 'daily_cards' no existe. Ejecuta el schema SQL en Supabase.");
  } else if (results.daily_cards.count === 0) {
    recommendations.push("⚠️ La tabla 'daily_cards' existe pero está vacía. Ejecuta los INSERT del schema SQL.");
  }

  if (!results.notification_logs.exists) {
    recommendations.push("❌ La tabla 'notification_logs' no existe. Ejecuta el schema SQL en Supabase.");
  }

  if (recommendations.length === 0) {
    recommendations.push("✅ Todas las tablas están creadas correctamente!");
  }

  return recommendations;
}
