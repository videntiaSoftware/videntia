#!/usr/bin/env node

/**
 * 🔍 MONITOR EN TIEMPO REAL - SISTEMA DE AUTENTICACIÓN
 * Monitorea tablas mientras el usuario prueba el registro/login
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function monitorAuthTables() {
  console.log('🔍 MONITOREANDO TABLAS DE AUTENTICACIÓN...');
  console.log('=' .repeat(60));
  
  const authTables = [
    'profiles',
    'accounts', 
    'sessions',
    'verification_tokens',
    'user_profiles',
    'readings'
  ];
  
  let lastCounts = {};
  
  while (true) {
    console.clear();
    console.log('🕐 ' + new Date().toLocaleTimeString());
    console.log('=' .repeat(60));
    console.log('📊 ESTADO ACTUAL DE TABLAS:');
    console.log('=' .repeat(60));
    
    for (const tableName of authTables) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ ${tableName.padEnd(20)} | ERROR: ${error.message}`);
          continue;
        }
        
        const currentCount = count || 0;
        const prevCount = lastCounts[tableName] || 0;
        const change = currentCount - prevCount;
        
        let emoji = '⚪';
        let changeStr = '';
        
        if (change > 0) {
          emoji = '🟢';
          changeStr = `(+${change})`;
        } else if (change < 0) {
          emoji = '🔴';
          changeStr = `(${change})`;
        }
        
        console.log(`${emoji} ${tableName.padEnd(20)} | ${currentCount.toString().padStart(3)} rows ${changeStr}`);
        lastCounts[tableName] = currentCount;
        
      } catch (err) {
        console.log(`💥 ${tableName.padEnd(20)} | EXCEPTION: ${err.message}`);
      }
    }
    
    console.log('\n🔄 Actualizando cada 2 segundos...');
    console.log('⏹️  Presiona Ctrl+C para detener');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Función para mostrar últimos registros
async function showRecentActivity() {
  console.log('\n📋 ÚLTIMOS REGISTROS:');
  console.log('=' .repeat(60));
  
  // Últimos profiles
  try {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (profiles && profiles.length > 0) {
      console.log('👤 ÚLTIMOS USUARIOS:');
      profiles.forEach(p => {
        console.log(`   ${p.email} (${new Date(p.created_at).toLocaleString()})`);
      });
    }
  } catch (err) {
    console.log('❌ Error obteniendo profiles:', err.message);
  }
  
  // Últimas readings
  try {
    const { data: readings } = await supabase
      .from('readings')
      .select('id, user_id, guest_id, reading_type, created_at')
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (readings && readings.length > 0) {
      console.log('\n🔮 ÚLTIMAS LECTURAS:');
      readings.forEach(r => {
        const userType = r.user_id ? 'USER' : 'GUEST';
        console.log(`   ${r.reading_type} (${userType}) - ${new Date(r.created_at).toLocaleString()}`);
      });
    }
  } catch (err) {
    console.log('❌ Error obteniendo readings:', err.message);
  }
}

// Manejar Ctrl+C
process.on('SIGINT', async () => {
  console.log('\n\n🛑 DETENIENDO MONITOR...');
  await showRecentActivity();
  console.log('\n✅ Monitor detenido');
  process.exit(0);
});

monitorAuthTables().catch(console.error);
