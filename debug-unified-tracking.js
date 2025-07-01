/**
 * SCRIPT DE DEBUGGING PARA SISTEMA UNIFICADO
 * Ejecutar: node debug-unified-tracking.js
 */

// Cargar variables de entorno desde .env.local
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Configurar Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Variables de entorno:');
console.log('   SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
console.log('   SUPABASE_KEY:', supabaseKey ? '✅ Configurada' : '❌ Faltante');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno de Supabase no configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugSupabaseTables() {
  console.log('🔍 DEBUGGING SISTEMA UNIFICADO - SUPABASE\n');

  try {
    // 1. Verificar tabla readings
    console.log('📊 1. TABLA READINGS:');
    const { data: readings, error: readingsError } = await supabase
      .from('readings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (readingsError) {
      console.error('❌ Error en readings:', readingsError);
    } else {
      console.log(`   Total filas recientes: ${readings?.length || 0}`);
      if (readings && readings.length > 0) {
        console.log('   Última lectura:', {
          id: readings[0].id,
          user_id: readings[0].user_id,
          guest_id: readings[0].guest_id,
          reading_type: readings[0].reading_type,
          created_at: readings[0].created_at
        });
      }
    }

    // 2. Verificar tabla guests
    console.log('\n👤 2. TABLA GUESTS:');
    const { data: guests, error: guestsError } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (guestsError) {
      console.error('❌ Error en guests:', guestsError);
    } else {
      console.log(`   Total guests: ${guests?.length || 0}`);
      if (guests && guests.length > 0) {
        console.log('   Último guest:', {
          guest_id: guests[0].guest_id,
          total_readings: guests[0].total_readings,
          last_seen_at: guests[0].last_seen_at
        });
      }
    }

    // 3. Verificar tabla guest_reading_patterns
    console.log('\n📈 3. TABLA GUEST_READING_PATTERNS:');
    const { data: patterns, error: patternsError } = await supabase
      .from('guest_reading_patterns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (patternsError) {
      console.error('❌ Error en patterns:', patternsError);
    } else {
      console.log(`   Total patrones: ${patterns?.length || 0}`);
      if (patterns && patterns.length > 0) {
        console.log('   Último patrón:', {
          guest_id: patterns[0].guest_id,
          reading_type: patterns[0].reading_type,
          question_asked: patterns[0].question_asked,
          created_at: patterns[0].created_at
        });
      }
    }

    // 4. Verificar tabla user_interest_profiles
    console.log('\n💰 4. TABLA USER_INTEREST_PROFILES:');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_interest_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (profilesError) {
      console.error('❌ Error en profiles:', profilesError);
    } else {
      console.log(`   Total perfiles: ${profiles?.length || 0}`);
      if (profiles && profiles.length > 0) {
        console.log('   Último perfil:', {
          guest_id: profiles[0].guest_id,
          primary_category: profiles[0].primary_category,
          commercial_value: profiles[0].commercial_value,
          created_at: profiles[0].created_at
        });
      }
    }

    // 5. Verificar tabla guest_behavior_events
    console.log('\n🎯 5. TABLA GUEST_BEHAVIOR_EVENTS:');
    const { data: events, error: eventsError } = await supabase
      .from('guest_behavior_events')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(5);

    if (eventsError) {
      console.error('❌ Error en events:', eventsError);
    } else {
      console.log(`   Total eventos: ${events?.length || 0}`);
      if (events && events.length > 0) {
        console.log('   Último evento:', {
          guest_id: events[0].guest_id,
          event_type: events[0].event_type,
          timestamp: events[0].timestamp
        });
      }
    }

    // 6. Verificar estructura de columnas en readings
    console.log('\n🏗️  6. ESTRUCTURA TABLA READINGS:');
    try {
      // Query directo para obtener columnas
      const { data: tableInfo, error: tableError } = await supabase
        .rpc('get_table_columns', { table_name: 'readings' })
        .maybeSingle();

      if (tableError) {
        // Fallback: intentar describir la tabla de otra manera
        console.log('   Intentando método alternativo...');
        
        // Hacer un select simple para ver qué columnas existen
        const { data: sampleData, error: sampleError } = await supabase
          .from('readings')
          .select('*')
          .limit(1);
          
        if (sampleError) {
          console.error('❌ Error obteniendo estructura:', sampleError);
        } else {
          if (sampleData && sampleData.length > 0) {
            console.log('   Columnas detectadas en datos existentes:');
            Object.keys(sampleData[0]).forEach(col => {
              console.log(`     - ${col}`);
            });
          } else {
            console.log('   No hay datos para detectar estructura');
            
            // Intentar insertar un registro de prueba para ver qué falla
            console.log('   Probando insertar registro básico...');
            const testRecord = {
              reading_type: 'test',
              user_tier: 'guest'
            };
            
            const { error: testError } = await supabase
              .from('readings')
              .insert(testRecord)
              .select();
              
            if (testError) {
              console.error('❌ Error en insert de prueba:', testError);
              console.error('   Esto nos dice qué columnas faltan');
            } else {
              console.log('✅ Insert básico funciona');
            }
          }
        }
      } else {
        console.log('   Columnas desde RPC:', tableInfo);
      }
    } catch (error) {
      console.error('❌ Error general verificando estructura:', error);
    }

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar debugging
debugSupabaseTables()
  .then(() => {
    console.log('\n✅ Debugging completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
