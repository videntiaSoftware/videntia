import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

/**
 * 🔥 PREMIUM AD TARGETING API
 * Sirve ads de $5-15 CPM basados en análisis LLM de preguntas
 * Core del sistema de monetización - Revenue multiplier 10-25x
 */

export async function POST(req: NextRequest) {
  try {
    const { 
      category, 
      segments, 
      commercial_value, 
      estimated_cpm, 
      guest_id 
    } = await req.json();

    if (!category || !segments) {
      return NextResponse.json({ error: 'Category and segments required' }, { status: 400 });
    }

    console.log('[PREMIUM_AD] Request:', { category, commercial_value, estimated_cpm });

    const supabase = createClient();

    // 1. Generate premium ad based on category and value
    const premiumAd = await generatePremiumAd(category, commercial_value, segments);

    // 2. Log ad serving for revenue tracking
    if (guest_id) {
      await supabase
        .from('premium_ad_performance')
        .insert({
          guest_id,
          ad_category: category,
          commercial_value,
          estimated_cpm,
          segments_targeted: segments,
          ad_content: premiumAd.title,
          served_at: new Date().toISOString()
        });
    }

    // 3. Calculate actual revenue potential
    const revenueMultiplier = Math.round((estimated_cpm || 5) / 0.30);

    return NextResponse.json({
      success: true,
      ad_id: `premium_${category}_${Date.now()}`,
      title: premiumAd.title,
      description: premiumAd.description,
      click_url: premiumAd.click_url,
      image_url: premiumAd.image_url,
      cpm_rate: estimated_cpm || 5,
      revenue_multiplier: revenueMultiplier,
      targeting_applied: segments
    });

  } catch (error) {
    console.error('[PREMIUM_AD] Error:', error);
    
    // Fallback to basic ad
    return NextResponse.json({
      success: true,
      ad_id: `basic_fallback_${Date.now()}`,
      title: "Descubre más sobre tu futuro",
      description: "Explora contenido personalizado para ti",
      click_url: "#",
      cpm_rate: 0.30,
      revenue_multiplier: 1,
      targeting_applied: ['general']
    });
  }
}

/**
 * Generate premium ad content based on LLM analysis
 */
async function generatePremiumAd(category: string, commercialValue: number, segments: string[]) {
  // Premium ad database by category
  const premiumAds = {
    travel: [
      {
        title: "✈️ Viaja a Europa desde $799",
        description: "Descubre ofertas exclusivas en paquetes de viaje personalizados. ¡Tu aventura te espera!",
        click_url: "https://booking.com/special-offers?utm_source=videntia&utm_campaign=tarot_travel",
        image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"
      },
      {
        title: "🏖️ Escapadas de Fin de Semana",
        description: "Relájate en destinos únicos. Hoteles 4 estrellas con descuentos hasta 40%.",
        click_url: "https://airbnb.com/experiences?utm_source=videntia&utm_campaign=tarot_getaway",
        image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
      }
    ],
    relationships: [
      {
        title: "💕 Encuentra tu Media Naranja",
        description: "Únete a la app de citas más exitosa. Perfiles verificados y compatibilidad real.",
        click_url: "https://tinder.com/signup?utm_source=videntia&utm_campaign=tarot_love",
        image_url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400"
      },
      {
        title: "💑 Mejora tu Relación Actual",
        description: "Terapia de pareja online con psicólogos especializados. Primera sesión gratis.",
        click_url: "https://betterhelp.com/couples?utm_source=videntia&utm_campaign=tarot_therapy",
        image_url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400"
      }
    ],
    career: [
      {
        title: "🚀 Impulsa tu Carrera Profesional",
        description: "Cursos online certificados. Aprende las habilidades más demandadas del mercado.",
        click_url: "https://coursera.org/professional-certificates?utm_source=videntia&utm_campaign=tarot_career",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      },
      {
        title: "💼 Nuevas Oportunidades Laborales",
        description: "Encuentra tu trabajo ideal. Miles de ofertas actualizadas diariamente.",
        click_url: "https://linkedin.com/jobs?utm_source=videntia&utm_campaign=tarot_jobs",
        image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
      }
    ],
    money: [
      {
        title: "💰 Invierte Inteligentemente",
        description: "Plataforma de inversión fácil y segura. Comienza con solo $100 y ve crecer tu dinero.",
        click_url: "https://etoro.com/signup?utm_source=videntia&utm_campaign=tarot_invest",
        image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400"
      },
      {
        title: "💳 Mejores Tarjetas de Crédito",
        description: "Compara y solicita las tarjetas con mejores beneficios. Sin anualidad el primer año.",
        click_url: "https://creditcards.com/compare?utm_source=videntia&utm_campaign=tarot_credit",
        image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
      }
    ],
    health: [
      {
        title: "🌱 Transforma tu Salud",
        description: "Plan nutricional personalizado con seguimiento médico. Resultados garantizados.",
        click_url: "https://noom.com/signup?utm_source=videntia&utm_campaign=tarot_health",
        image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
      },
      {
        title: "🧘 Bienestar Mental",
        description: "App de meditación y mindfulness. Reduce el estrés y mejora tu calidad de vida.",
        click_url: "https://headspace.com/meditation?utm_source=videntia&utm_campaign=tarot_wellness",
        image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400"
      }
    ],
    family: [
      {
        title: "👨‍👩‍👧‍👦 Fortalece tu Familia",
        description: "Actividades familiares y consejos de expertos para crear vínculos más fuertes.",
        click_url: "https://familylife.com/activities?utm_source=videntia&utm_campaign=tarot_family",
        image_url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400"
      }
    ],
    spiritual: [
      {
        title: "✨ Profundiza tu Crecimiento Espiritual",
        description: "Cursos de espiritualidad, meditación y autoconocimiento con maestros reconocidos.",
        click_url: "https://mindvalley.com/spiritual-growth?utm_source=videntia&utm_campaign=tarot_spiritual",
        image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
      }
    ]
  };

  const categoryAds = premiumAds[category as keyof typeof premiumAds] || premiumAds.spiritual;
  
  // Select ad based on commercial value
  const adIndex = commercialValue > 7 ? 0 : Math.floor(Math.random() * categoryAds.length);
  
  return categoryAds[adIndex];
}
