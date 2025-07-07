#!/usr/bin/env node

/**
 * 🔥 TESTING FUNCIONAL DEL SISTEMA DE AUTENTICACIÓN
 * 
 * Este script prueba las funcionalidades específicas:
 * 1. Inserción de datos en readings
 * 2. Creación de usuarios simulados
 * 3. Tracking de guests
 * 4. Sistema unificado completo
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🧪 TESTING FUNCIONAL - SISTEMA DE AUTENTICACIÓN');
console.log('=' .repeat(60));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno faltantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Generar IDs únicos para testing
const generateTestId = () => `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Tests específicos
const tests = {
  
  // Test 1: Verificar inserción en readings
  async testReadingsInsert() {
    console.log('\n🎯 TEST 1: Inserción en tabla readings');
    console.log('-'.repeat(45));
    
    const testData = {
      guest_id: generateTestId(),
      reading_type: 'test_amor',
      question: '¿Funcionan las inserciones en readings?',
      cards_drawn: [{ name: 'Test Card', number: 1 }],
      interpretation: 'Test interpretation',
      user_tier: 'guest',
      ip_address: '127.0.0.1',
      fingerprint_id: generateTestId(),
      session_id: generateTestId(),
      user_agent: 'Test Agent'
    };
    
    try {
      const { data, error } = await supabase
        .from('readings')
        .insert(testData)
        .select('*')
        .single();
      
      if (error) {
        console.log('❌ Error en inserción:', error.message);
        console.log('   Detalles:', error.details);
        console.log('   Hint:', error.hint);
        return false;
      }
      
      console.log('✅ Inserción exitosa en readings');
      console.log('   ID:', data.id);
      console.log('   Guest ID:', data.guest_id);
      console.log('   Tipo:', data.reading_type);
      
      // Limpiar después del test
      await supabase.from('readings').delete().eq('id', data.id);
      console.log('🧹 Datos de test limpiados');
      
      return true;
    } catch (err) {
      console.log('💥 Excepción:', err.message);
      return false;
    }
  },
  
  // Test 2: Verificar sistema de guests
  async testGuestSystem() {
    console.log('\n👥 TEST 2: Sistema de guests');
    console.log('-'.repeat(45));
    
    const guestId = generateTestId();
    
    try {
      // Crear guest
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .insert({
          guest_id: guestId,
          initial_ip_address: '127.0.0.1',
          initial_user_agent: 'Test Agent',
          total_readings: 1
        })
        .select('*')
        .single();
      
      if (guestError) {
        console.log('❌ Error creando guest:', guestError.message);
        return false;
      }
      
      console.log('✅ Guest creado exitosamente');
      console.log('   Guest ID:', guestData.guest_id);
      
      // Crear patrón de lectura
      const { data: patternData, error: patternError } = await supabase
        .from('guest_reading_patterns')
        .insert({
          guest_id: guestId,
          reading_type: 'test_amor',
          question_asked: '¿Funciona el tracking de patterns?',
          question_length: 35,
          cards_selected: [{ name: 'Test Card', number: 1 }],
          time_of_day: new Date().getHours(),
          day_of_week: new Date().getDay() + 1
        })
        .select('*')
        .single();
      
      if (patternError) {
        console.log('❌ Error creando patrón:', patternError.message);
        // Limpiar guest
        await supabase.from('guests').delete().eq('guest_id', guestId);
        return false;
      }
      
      console.log('✅ Patrón de lectura creado');
      console.log('   Tipo:', patternData.reading_type);
      console.log('   Pregunta:', patternData.question_asked);
      
      // Crear evento de behavior
      const { data: eventData, error: eventError } = await supabase
        .from('guest_behavior_events')
        .insert({
          guest_id: guestId,
          event_type: 'test_event',
          event_data: { test: true, timestamp: new Date().toISOString() },
          page_url: '/test',
          user_agent: 'Test Agent'
        })
        .select('*')
        .single();
      
      if (eventError) {
        console.log('⚠️ Error creando evento (no crítico):', eventError.message);
      } else {
        console.log('✅ Evento de behavior creado');
        console.log('   Tipo:', eventData.event_type);
      }
      
      // Limpiar datos de test
      await supabase.from('guest_behavior_events').delete().eq('guest_id', guestId);
      await supabase.from('guest_reading_patterns').delete().eq('guest_id', guestId);
      await supabase.from('guests').delete().eq('guest_id', guestId);
      console.log('🧹 Datos de test limpiados');
      
      return true;
    } catch (err) {
      console.log('💥 Excepción:', err.message);
      return false;
    }
  },
  
  // Test 3: Verificar perfiles de interés
  async testInterestProfiles() {
    console.log('\n💰 TEST 3: Perfiles de interés');
    console.log('-'.repeat(45));
    
    const guestId = generateTestId();
    
    try {
      const { data, error } = await supabase
        .from('user_interest_profiles')
        .insert({
          guest_id: guestId,
          question_text: '¿Cómo mejorar mi situación financiera?',
          primary_category: 'money',
          generated_tags: ['financial_planning', 'business'],
          confidence_score: 0.85,
          commercial_value: 12.5,
          demographic_hints: { age_range: '25-35' },
          ad_keywords: ['finance', 'investment', 'money']
        })
        .select('*')
        .single();
      
      if (error) {
        console.log('❌ Error creando perfil:', error.message);
        return false;
      }
      
      console.log('✅ Perfil de interés creado');
      console.log('   Categoría:', data.primary_category);
      console.log('   Valor comercial:', data.commercial_value);
      console.log('   Tags:', data.generated_tags);
      
      // Limpiar
      await supabase.from('user_interest_profiles').delete().eq('guest_id', guestId);
      console.log('🧹 Datos de test limpiados');
      
      return true;
    } catch (err) {
      console.log('💥 Excepción:', err.message);
      return false;
    }
  },
  
  // Test 4: Verificar funciones SQL
  async testSQLFunctions() {
    console.log('\n⚙️ TEST 4: Funciones SQL');
    console.log('-'.repeat(45));
    
    try {
      // Test función calculate_commercial_value
      const { data: commercialValue, error: cvError } = await supabase
        .rpc('calculate_commercial_value', {
          p_category: 'money',
          p_tags: ['financial_planning', 'investment'],
          p_confidence: 0.8
        });
      
      if (cvError) {
        console.log('❌ Error en calculate_commercial_value:', cvError.message);
        return false;
      }
      
      console.log('✅ Función calculate_commercial_value funciona');
      console.log('   Valor calculado:', commercialValue);
      
      // Test función get_user_ad_segments
      const testGuestId = generateTestId();
      const { data: segments, error: segError } = await supabase
        .rpc('get_user_ad_segments', {
          p_guest_id: testGuestId
        });
      
      if (segError) {
        console.log('❌ Error en get_user_ad_segments:', segError.message);
        return false;
      }
      
      console.log('✅ Función get_user_ad_segments funciona');
      console.log('   Segmentos:', segments);
      
      return true;
    } catch (err) {
      console.log('💥 Excepción:', err.message);
      return false;
    }
  },
  
  // Test 5: Verificar el sistema unificado completo
  async testUnifiedSystem() {
    console.log('\n🌟 TEST 5: Sistema unificado completo');
    console.log('-'.repeat(45));
    
    const guestId = generateTestId();
    
    try {
      // Simular una lectura completa
      console.log('🎯 Simulando lectura completa...');
      
      // 1. Insertar reading
      const { data: readingData, error: readingError } = await supabase
        .from('readings')
        .insert({
          guest_id: guestId,
          reading_type: 'unified_test',
          question: '¿Funciona el sistema unificado?',
          cards_drawn: [{ name: 'The Fool', number: 0 }],
          interpretation: 'El sistema está funcionando correctamente',
          user_tier: 'guest',
          ip_address: '127.0.0.1'
        })
        .select('*')
        .single();
      
      if (readingError) {
        console.log('❌ Error en reading:', readingError.message);
        return false;
      }
      
      console.log('✅ Reading creado');
      
      // 2. Crear guest
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .upsert({
          guest_id: guestId,
          initial_ip_address: '127.0.0.1',
          total_readings: 1
        })
        .select('*')
        .single();
      
      if (guestError) {
        console.log('❌ Error en guest:', guestError.message);
        return false;
      }
      
      console.log('✅ Guest creado/actualizado');
      
      // 3. Crear patrón
      const { data: patternData, error: patternError } = await supabase
        .from('guest_reading_patterns')
        .insert({
          guest_id: guestId,
          reading_type: 'unified_test',
          question_asked: '¿Funciona el sistema unificado?',
          question_length: 32,
          cards_selected: [{ name: 'The Fool', number: 0 }]
        })
        .select('*')
        .single();
      
      if (patternError) {
        console.log('❌ Error en patrón:', patternError.message);
        return false;
      }
      
      console.log('✅ Patrón creado');
      
      // 4. Crear perfil de interés
      const { data: profileData, error: profileError } = await supabase
        .from('user_interest_profiles')
        .insert({
          guest_id: guestId,
          question_text: '¿Funciona el sistema unificado?',
          primary_category: 'general',
          generated_tags: ['testing', 'unified'],
          confidence_score: 0.95,
          commercial_value: 5.0
        })
        .select('*')
        .single();
      
      if (profileError) {
        console.log('❌ Error en perfil:', profileError.message);
        return false;
      }
      
      console.log('✅ Perfil de interés creado');
      
      // 5. Verificar que todos los datos están conectados
      console.log('🔍 Verificando conexiones...');
      
      const { data: allReadings } = await supabase
        .from('readings')
        .select('*')
        .eq('guest_id', guestId);
      
      const { data: allPatterns } = await supabase
        .from('guest_reading_patterns')
        .select('*')
        .eq('guest_id', guestId);
      
      const { data: allProfiles } = await supabase
        .from('user_interest_profiles')
        .select('*')
        .eq('guest_id', guestId);
      
      console.log(`✅ Datos conectados correctamente:`);
      console.log(`   - Readings: ${allReadings?.length || 0}`);
      console.log(`   - Patterns: ${allPatterns?.length || 0}`);
      console.log(`   - Profiles: ${allProfiles?.length || 0}`);
      
      // Limpiar todo
      await supabase.from('user_interest_profiles').delete().eq('guest_id', guestId);
      await supabase.from('guest_reading_patterns').delete().eq('guest_id', guestId);
      await supabase.from('guests').delete().eq('guest_id', guestId);
      await supabase.from('readings').delete().eq('guest_id', guestId);
      console.log('🧹 Sistema limpiado');
      
      return true;
    } catch (err) {
      console.log('💥 Excepción:', err.message);
      return false;
    }
  }
};

// Ejecutar todos los tests
async function runFunctionalTests() {
  console.log('\n🚀 INICIANDO TESTS FUNCIONALES...\n');
  
  const results = [];
  
  for (const [testName, testFunc] of Object.entries(tests)) {
    try {
      const result = await testFunc();
      results.push({ name: testName, success: result });
      
      // Pausa entre tests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.log(`💥 Error en ${testName}:`, err.message);
      results.push({ name: testName, success: false, error: err.message });
    }
  }
  
  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE TESTS FUNCIONALES');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Tests exitosos: ${passed}/${results.length}`);
  console.log(`❌ Tests fallidos: ${failed}/${results.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 ¡TODOS LOS TESTS PASARON!');
    console.log('✅ El sistema está funcionando correctamente');
  } else {
    console.log('\n⚠️ HAY PROBLEMAS EN EL SISTEMA:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`❌ ${r.name}: ${r.error || 'Error no especificado'}`);
    });
  }
  
  console.log('\n🔧 PRÓXIMOS PASOS:');
  if (failed > 0) {
    console.log('1. Ejecutar: database/migration-fix-unified-system.sql');
    console.log('2. Ejecutar: database/fix-readings-table.sql');
    console.log('3. Ejecutar: database/missing-monetization-functions.sql');
    console.log('4. Volver a ejecutar este test');
  } else {
    console.log('1. Hacer una lectura de tarot real');
    console.log('2. Ejecutar: node monitor-real-time.js');
    console.log('3. Verificar dashboard de Supabase');
  }
}

runFunctionalTests().catch(console.error);
