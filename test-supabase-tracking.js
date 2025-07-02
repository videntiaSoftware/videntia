const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🚀 Starting Supabase table check...');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('📝 Supabase URL:', supabaseUrl ? 'Found' : 'Missing');
console.log('🔑 Supabase Key:', supabaseKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client created');

async function checkTables() {
  console.log('🔍 Checking Supabase tables for data...\n');

  const tables = [
    'guest_analytics_insights',
    'guest_behavior_events', 
    'guest_events',
    'guest_geolocation',
    'guest_sessions',
    'lead_sales_log',
    'push_tokens'
  ];

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(5);

      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`);
      } else {
        console.log(`📊 ${table}: ${count || 0} records`);
        if (data && data.length > 0) {
          console.log(`   Latest record:`, JSON.stringify(data[0], null, 2));
        }
      }
    } catch (err) {
      console.log(`❌ ${table}: Exception - ${err.message}`);
    }
    console.log('');
  }
}

checkTables().catch(console.error);
