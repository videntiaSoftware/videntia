#!/usr/bin/env node

/**
 * 🔥 TESTING FLUJO AUTENTICACIÓN REAL EN NAVEGADOR
 * 
 * Este script simula el flujo completo de registro/login que un usuario real hace:
 * 1. Registro con email/contraseña
 * 2. Login con email/contraseña  
 * 3. Login con Google OAuth
 * 4. Verificar cómo se almacenan las sesiones
 * 5. Probar logout
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Variables de entorno faltantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 TESTING FLUJO AUTENTICACIÓN REAL');
console.log('='.repeat(70));

// Test data
const testUser = {
  email: 'test@videntia.com',
  password: 'test123456',
  phone: '+54 9 11 1234-5678'
};

async function testEmailSignUp() {
  console.log('\n1️⃣ TESTING: Registro con Email');
  console.log('-'.repeat(50));
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          phone: testUser.phone,
          daily_notifications_enabled: true
        }
      }
    });
    
    if (error) {
      console.log('❌ Error en registro:', error.message);
      return false;
    }
    
    console.log('✅ Registro exitoso');
    console.log('📧 Usuario:', data.user?.email);
    console.log('🔑 ID:', data.user?.id);
    console.log('✉️ Confirmación requerida:', !data.user?.email_confirmed_at);
    
    return true;
  } catch (err) {
    console.log('💥 Excepción en registro:', err.message);
    return false;
  }
}

async function testEmailLogin() {
  console.log('\n2️⃣ TESTING: Login con Email');
  console.log('-'.repeat(50));
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password
    });
    
    if (error) {
      console.log('❌ Error en login:', error.message);
      return false;
    }
    
    console.log('✅ Login exitoso');
    console.log('📧 Usuario:', data.user?.email);
    console.log('🔑 ID:', data.user?.id);
    console.log('⏰ Sesión expira:', data.session?.expires_at);
    console.log('🎫 Access token:', data.session?.access_token ? 'Presente' : 'Ausente');
    
    return data.session;
  } catch (err) {
    console.log('💥 Excepción en login:', err.message);
    return false;
  }
}

async function testGoogleOAuth() {
  console.log('\n3️⃣ TESTING: OAuth con Google');
  console.log('-'.repeat(50));
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    
    if (error) {
      console.log('❌ Error en OAuth:', error.message);
      return false;
    }
    
    console.log('✅ OAuth iniciado');
    console.log('🔗 URL de redirección:', data.url);
    console.log('📝 Nota: Esto abriría el navegador para completar OAuth');
    
    return true;
  } catch (err) {
    console.log('💥 Excepción en OAuth:', err.message);
    return false;
  }
}

async function testSessionStorage() {
  console.log('\n4️⃣ TESTING: Almacenamiento de Sesiones');
  console.log('-'.repeat(50));
  
  try {
    // Verificar sesión actual
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('❌ Error obteniendo usuario:', error.message);
      return false;
    }
    
    if (!user) {
      console.log('ℹ️ No hay usuario autenticado');
      return false;
    }
    
    console.log('✅ Sesión activa encontrada');
    console.log('📧 Usuario:', user.email);
    console.log('🔑 ID:', user.id);
    console.log('⏰ Creado:', user.created_at);
    console.log('✅ Email confirmado:', user.email_confirmed_at ? 'Sí' : 'No');
    
    // Verificar metadata
    if (user.user_metadata) {
      console.log('📋 Metadata del usuario:');
      Object.entries(user.user_metadata).forEach(([key, value]) => {
        console.log(`   - ${key}: ${value}`);
      });
    }
    
    return true;
  } catch (err) {
    console.log('💥 Excepción verificando sesión:', err.message);
    return false;
  }
}

async function testLogout() {
  console.log('\n5️⃣ TESTING: Logout');
  console.log('-'.repeat(50));
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.log('❌ Error en logout:', error.message);
      return false;
    }
    
    console.log('✅ Logout exitoso');
    
    // Verificar que no hay sesión
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      console.log('⚠️ Advertencia: Usuario aún presente después de logout');
      return false;
    }
    
    console.log('✅ Sesión terminada correctamente');
    return true;
  } catch (err) {
    console.log('💥 Excepción en logout:', err.message);
    return false;
  }
}

async function checkDatabaseTables() {
  console.log('\n6️⃣ TESTING: Verificar Tablas de Supabase Auth');
  console.log('-'.repeat(50));
  
  try {
    // Verificar auth.users (tabla interna de Supabase)
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log('✅ Usuario en auth.users (tabla interna Supabase)');
      
      // Verificar si tenemos acceso a user_profiles
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileError) {
        console.log('⚠️ No hay perfil en user_profiles:', profileError.message);
      } else {
        console.log('✅ Perfil encontrado en user_profiles');
        console.log('📋 Datos del perfil:', profile);
      }
    } else {
      console.log('ℹ️ No hay usuario autenticado para verificar tablas');
    }
    
    return true;
  } catch (err) {
    console.log('💥 Excepción verificando tablas:', err.message);
    return false;
  }
}

async function runAuthFlow() {
  console.log('🎯 INICIANDO FLUJO COMPLETO DE AUTENTICACIÓN');
  console.log('Este test simula lo que hace un usuario real en el navegador\n');
  
  const results = {
    signup: false,
    login: false,
    oauth: false,
    session: false,
    logout: false,
    database: false
  };
  
  // 1. Registro
  results.signup = await testEmailSignUp();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 2. Login
  if (results.signup) {
    results.login = await testEmailLogin();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 3. OAuth (solo simular, no ejecutar)
  results.oauth = await testGoogleOAuth();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 4. Verificar sesión
  if (results.login) {
    results.session = await testSessionStorage();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 5. Verificar base de datos
  results.database = await checkDatabaseTables();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 6. Logout
  if (results.login) {
    results.logout = await testLogout();
  }
  
  // Resumen
  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMEN DEL FLUJO DE AUTENTICACIÓN');
  console.log('='.repeat(70));
  
  Object.entries(results).forEach(([test, passed]) => {
    const emoji = passed ? '✅' : '❌';
    const testName = test.charAt(0).toUpperCase() + test.slice(1);
    console.log(`${emoji} ${testName.padEnd(20)} ${passed ? 'EXITOSO' : 'FALLÓ'}`);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n📈 Resultado: ${passedTests}/${totalTests} tests pasaron`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ¡SISTEMA DE AUTENTICACIÓN COMPLETAMENTE FUNCIONAL!');
  } else {
    console.log('⚠️ Hay problemas que requieren atención');
  }
  
  // Recomendaciones
  console.log('\n🚀 PRÓXIMOS PASOS:');
  console.log('='.repeat(70));
  
  if (results.signup && results.login && results.logout) {
    console.log('1. ✅ Autenticación básica funciona');
    console.log('2. 🌐 Probar en navegador incógnito:');
    console.log('   - Abrir http://localhost:3000/auth/sign-up');
    console.log('   - Registrar usuario real');
    console.log('   - Verificar email');
    console.log('   - Hacer login');
    console.log('   - Hacer una lectura de tarot');
    console.log('   - Verificar que se guarda en la tabla readings');
  } else {
    console.log('1. ❌ Corregir errores de autenticación');
    console.log('2. 🔧 Verificar configuración Supabase');
    console.log('3. 📧 Verificar configuración de email');
  }
  
  console.log('\n3. 🧪 Ejecutar tests adicionales:');
  console.log('   node test-auth-functional.js');
  console.log('   node debug-unified-tracking.js');
  
  return results;
}

// Ejecutar el flujo completo
runAuthFlow()
  .then(results => {
    console.log('\n✅ FLUJO DE AUTENTICACIÓN TESTADO');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 ERROR FATAL:', error);
    process.exit(1);
  });
