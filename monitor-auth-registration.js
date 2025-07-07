#!/usr/bin/env node

/**
 * 🔍 MONITOR EN TIEMPO REAL - REGISTRO DE USUARIOS
 * Monitorea las tablas de Supabase mientras haces el registro
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

console.log('🔍 MONITOREANDO REGISTRO DE USUARIOS...');
console.log('=' .repeat(60));

let previousCounts = {};

async function checkTables() {
  const tables = [
    'profiles',
    'accounts', 
    'sessions',
    'verification_tokens',
    'readings',
    'user_profiles',
    'guests'
  ];
  
  console.log('\n📊 ESTADO ACTUAL DE TABLAS:');
  console.log('-'.repeat(50));
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ERROR - ${error.message}`);
        continue;
      }
      
      const currentCount = count || 0;
      const prevCount = previousCounts[table] || 0;
      
      let indicator = '  ';
      if (currentCount > prevCount) {
        indicator = '🔥'; // Nueva actividad
      } else if (currentCount === 0) {
        indicator = '⚪'; // Vacía
      } else {
        indicator = '✅'; // Con datos
      }
      
      console.log(`${indicator} ${table.padEnd(20)} | ${currentCount.toString().padStart(3)} rows ${currentCount > prevCount ? '(+' + (currentCount - prevCount) + ')' : ''}`);
      
      previousCounts[table] = currentCount;
    } catch (err) {
      console.log(`💥 ${table}: EXCEPTION - ${err.message}`);
    }
  }
}

// Verificar cada 2 segundos
setInterval(checkTables, 2000);

// Primera verificación
checkTables();

console.log('\n🎯 ESPERANDO ACTIVIDAD DE REGISTRO...');
console.log('   (Presiona Ctrl+C para detener)');
