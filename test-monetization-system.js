/**
 * TEST COMPLETO DEL SISTEMA DE MONETIZACIÓN LLM
 * Verifica que las funciones SQL y la integración funcionen correctamente
 */

async function testCompleteMonetizationSystem() {
  console.log('🚀 TESTING SISTEMA DE MONETIZACIÓN LLM...\n');

  try {
    // 1. Test directo del API de análisis
    console.log('1️⃣ Testing API de análisis de preguntas...');
    
    const analysisResponse = await fetch('http://localhost:3000/api/analytics/question-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: '¿Voy a conseguir un trabajo mejor en tecnología este año?',
        guest_id: 'test_guest_monetization_' + Date.now(),
        session_id: 'test_session_' + Date.now()
      })
    });

    if (!analysisResponse.ok) {
      throw new Error(`API Error: ${analysisResponse.status} - ${analysisResponse.statusText}`);
    }

    const analysisData = await analysisResponse.json();
    console.log('✅ Análisis LLM funcionando!');
    console.log('📊 Resultado:', JSON.stringify(analysisData, null, 2));

    // 2. Verificar que las funciones SQL devolvieron datos
    if (analysisData.analysis?.commercial_value) {
      console.log(`✅ calculate_commercial_value() funcionando: ${analysisData.analysis.commercial_value}`);
    } else {
      console.log('❌ calculate_commercial_value() NO está funcionando');
    }

    if (analysisData.ad_targeting?.segments) {
      console.log(`✅ get_user_ad_segments() funcionando: ${JSON.stringify(analysisData.ad_targeting.segments)}`);
    } else {
      console.log('❌ get_user_ad_segments() NO está funcionando');
    }

    // 3. Verificar revenue potential
    if (analysisData.revenue_impact) {
      console.log(`✅ Revenue multiplicado: ${analysisData.revenue_impact.uplift_percentage}% uplift`);
      console.log(`💰 CPM Premium: $${analysisData.revenue_impact.premium_cpm}`);
      console.log(`💸 Revenue mensual estimado: $${analysisData.revenue_impact.monthly_revenue_estimate}`);
    }

    // 4. Test del flujo completo de lectura
    console.log('\n2️⃣ Testing flujo completo de lectura...');
    
    const readingResponse = await fetch('http://localhost:3000/api/reading/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: '¿Encontraré el amor verdadero pronto?',
        cards: [
          { id: 'the-fool', name: 'El Loco' },
          { id: 'the-lovers', name: 'Los Enamorados' },
          { id: 'the-star', name: 'La Estrella' }
        ],
        session_id: 'test_reading_' + Date.now()
      })
    });

    if (readingResponse.ok) {
      const readingData = await readingResponse.json();
      console.log('✅ Flujo completo de lectura funcionando!');
      
      // Verificar si se guardó el análisis
      if (readingData.reading_id) {
        console.log(`✅ Lectura guardada con ID: ${readingData.reading_id}`);
      }
    } else {
      console.log('❌ Error en flujo completo de lectura');
    }

    console.log('\n🎯 RESUMEN DEL TEST:');
    console.log('====================');
    console.log(`✅ API de análisis: ${analysisResponse.ok ? 'FUNCIONANDO' : 'ERROR'}`);
    console.log(`✅ Funciones SQL: ${analysisData.analysis?.commercial_value ? 'FUNCIONANDO' : 'ERROR'}`);
    console.log(`✅ Targeting: ${analysisData.ad_targeting?.segments ? 'FUNCIONANDO' : 'ERROR'}`);
    console.log(`✅ Revenue multiplicado: ${analysisData.revenue_impact ? 'FUNCIONANDO' : 'ERROR'}`);
    
    if (analysisData.success && analysisData.analysis?.commercial_value && analysisData.ad_targeting?.segments) {
      console.log('\n🚀 SISTEMA COMPLETAMENTE FUNCIONAL!');
      console.log('💰 Ready para generar revenue premium con Google Ads');
    } else {
      console.log('\n❌ SISTEMA CON PROBLEMAS');
      console.log('🔧 Revisar funciones SQL en Supabase');
    }

  } catch (error) {
    console.error('❌ Error en test:', error);
    console.log('\n🔧 POSIBLES SOLUCIONES:');
    console.log('1. Verificar que las funciones SQL estén creadas en Supabase');
    console.log('2. Verificar variables de entorno (GEMINI_API_KEY)');
    console.log('3. Verificar que el servidor esté corriendo en localhost:3000');
  }
}

// Ejecutar test
testCompleteMonetizationSystem();
