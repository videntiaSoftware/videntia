// Script simple para verificar estructura de tabla readings

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkReadingsTable() {
  console.log('🔍 VERIFICANDO ESTRUCTURA DE TABLA READINGS\n');
  
  try {
    // Intentar hacer un select básico
    console.log('1. Probando select básico...');
    const { data, error } = await supabase
      .from('readings')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error en select:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Tabla existe y tiene datos');
      console.log('📋 Columnas encontradas:');
      Object.keys(data[0]).forEach(col => {
        console.log(`   - ${col}`);
      });
    } else {
      console.log('⚠️ Tabla existe pero no tiene datos');
      
      // Intentar insertar registro mínimo
      console.log('\n2. Probando insert mínimo...');
      const { error: insertError } = await supabase
        .from('readings')
        .insert({
          reading_type: 'test'
        });
        
      if (insertError) {
        console.error('❌ Error en insert básico:', insertError);
      } else {
        console.log('✅ Insert básico exitoso');
      }
    }
    
    // Probar insert con columnas que esperamos
    console.log('\n3. Probando insert con todas las columnas esperadas...');
    const testRecord = {
      reading_type: 'test',
      guest_id: 'test_guest',
      user_tier: 'guest',
      ip_address: '127.0.0.1',
      fingerprint_id: 'test_fingerprint',
      session_id: 'test_session',
      user_agent: 'test_agent'
    };
    
    const { error: fullInsertError } = await supabase
      .from('readings')
      .insert(testRecord);
      
    if (fullInsertError) {
      console.error('❌ Error en insert completo:', fullInsertError);
      console.log('💡 Esto nos dice qué columnas faltan');
    } else {
      console.log('✅ Insert completo exitoso - todas las columnas existen');
      
      // Limpiar el registro de prueba
      await supabase
        .from('readings')
        .delete()
        .eq('reading_type', 'test');
    }
    
  } catch (error) {
    console.error('💥 Error general:', error);
  }
}

checkReadingsTable();
