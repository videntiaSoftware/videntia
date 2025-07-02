const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Monitor en tiempo real de Supabase');
console.log('📊 Presiona Ctrl+C para salir\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
  'readings', // ✅ Esta tabla SÍ se está poblando
  'guest_analytics_insights',
  'guest_behavior_events', 
  'guest_sessions',
  'guest_events',
  'guest_geolocation',
  'lead_sales_log',
  'push_tokens'
];

let lastCounts = {};

async function checkTables() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n⏰ ${timestamp} - Verificando tablas...`);
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`);
      } else {
        const currentCount = count || 0;
        const lastCount = lastCounts[table] || 0;
        
        if (currentCount > lastCount) {
          console.log(`🆕 ${table}: ${lastCount} → ${currentCount} (+${currentCount - lastCount})`);
          
          // Mostrar el último registro
          const { data } = await supabase
            .from(table)
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (data && data[0]) {
            console.log(`   📄 Último registro:`, JSON.stringify(data[0], null, 2));
          }
        } else {
          console.log(`📊 ${table}: ${currentCount} registros (sin cambios)`);
        }
        
        lastCounts[table] = currentCount;
      }
    } catch (err) {
      console.log(`❌ ${table}: Excepción - ${err.message}`);
    }
  }
}

// Verificación inicial
checkTables();

// Verificar cada 3 segundos
const interval = setInterval(checkTables, 3000);

// Cleanup al salir
process.on('SIGINT', () => {
  console.log('\n👋 Deteniendo monitor...');
  clearInterval(interval);
  process.exit(0);
});
