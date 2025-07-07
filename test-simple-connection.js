#!/usr/bin/env node

console.log('🚀 TESTING CONEXIÓN SUPABASE');

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl ? 'Presente' : 'Ausente');
console.log('Key:', supabaseKey ? 'Presente' : 'Ausente');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno faltantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Probando conexión...');
    const { data, error } = await supabase.from('readings').select('count').limit(1);
    
    if (error) {
      console.log('❌ Error:', error.message);
      return false;
    }
    
    console.log('✅ Conexión exitosa');
    return true;
  } catch (err) {
    console.log('💥 Excepción:', err.message);
    return false;
  }
}

testConnection()
  .then(result => {
    console.log('Resultado:', result);
    process.exit(0);
  })
  .catch(err => {
    console.log('Error final:', err);
    process.exit(1);
  });
