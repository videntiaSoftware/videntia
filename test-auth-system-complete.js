#!/usr/bin/env node

/**
 * 🔥 TESTING END-TO-END COMPLETO DEL SISTEMA DE AUTENTICACIÓN SUPABASE
 * 
 * Este script:
 * 1. Verifica TODAS las tablas de autenticación 
 * 2. Identifica tablas rotas/vacías
 * 3. Prueba el sistema completo
 * 4. Genera recomendaciones de limpieza
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🚀 TESTING END-TO-END SISTEMA DE AUTENTICACIÓN SUPABASE');
console.log('=' .repeat(70));

// Configuración Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Variables de entorno faltantes');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Definir TODAS las tablas del sistema
const EXPECTED_TABLES = {
  // 🔐 CORE AUTH TABLES (NextAuth)
  auth_core: [
    'profiles',      // Usuarios principales
    'accounts',      // Cuentas OAuth (Google, etc.)
    'sessions',      // Sesiones activas
    'verification_tokens' // Tokens de verificación
  ],
  
  // 📊 CORE BUSINESS TABLES  
  business_core: [
    'readings',      // Lecturas de tarot (PRINCIPAL)
    'user_profiles'  // Perfiles de usuario extendidos
  ],
  
  // 👥 GUEST TRACKING SYSTEM
  guest_system: [
    'guests',                    // Guests principales
    'guest_reading_patterns',    // Patrones de lectura
    'guest_events',             // Eventos de comportamiento
    'guest_sessions',           // Sesiones de guests
    'guest_behavior_events',    // Eventos de comportamiento avanzado
    'guest_analytics_insights', // Insights consolidados
    'guest_geolocation'         // Geolocalización
  ],
  
  // 💰 MONETIZATION SYSTEM
  monetization: [
    'user_interest_profiles',   // Perfiles de interés LLM
    'premium_ad_performance',   // Performance de ads premium
    'premium_ad_events',        // Eventos de ads premium
    'ad_sessions',              // Sesiones de ads
    'premium_trials',           // Trials premium
    'lead_sales_log'           // Log de ventas
  ],
  
  // 📧 COMMUNICATION SYSTEM
  communication: [
    'daily_email_logs',         // Logs de emails diarios
    'mail_click_events',        // Clicks en emails
    'push_tokens',              // Tokens push notifications
    'tarot_cards',              // Cartas de tarot
    'card_interpretations'      // Interpretaciones de cartas
  ],
  
  // 💳 PAYMENT SYSTEM (si existe)
  payments: [
    'user_subscriptions',       // Suscripciones
    'payment_transactions'      // Transacciones
  ]
};

// Función para verificar si una tabla existe y tiene datos
async function checkTable(tableName) {
  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      return {
        exists: false,
        error: error.message,
        count: 0,
        status: 'ERROR'
      };
    }
    
    let status = 'OK';
    if (count === 0) {
      status = 'EMPTY';
    } else if (count > 0 && count < 5) {
      status = 'LOW_DATA';
    }
    
    return {
      exists: true,
      count: count || 0,
      status,
      error: null
    };
  } catch (err) {
    return {
      exists: false,
      error: err.message,
      count: 0,
      status: 'EXCEPTION'
    };
  }
}

// Función para verificar estructura de tabla específica
async function checkTableStructure(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) return null;
    
    if (data && data.length > 0) {
      return Object.keys(data[0]);
    }
    
    return [];
  } catch (err) {
    return null;
  }
}

// Función principal de testing
async function runCompleteTest() {
  const results = {
    summary: {
      total_tables: 0,
      existing_tables: 0,
      empty_tables: 0,
      error_tables: 0,
      ok_tables: 0
    },
    tables: {},
    recommendations: []
  };
  
  console.log('\n🔍 VERIFICANDO TODAS LAS TABLAS...\n');
  
  // Verificar cada categoría de tablas
  for (const [category, tables] of Object.entries(EXPECTED_TABLES)) {
    console.log(`\n📋 ${category.toUpperCase().replace('_', ' ')}:`);
    console.log('-'.repeat(50));
    
    for (const tableName of tables) {
      results.summary.total_tables++;
      const tableResult = await checkTable(tableName);
      results.tables[tableName] = tableResult;
      
      // Emoji y color según estado
      let emoji = '❌';
      let status = tableResult.status;
      
      if (tableResult.exists) {
        results.summary.existing_tables++;
        switch (tableResult.status) {
          case 'OK':
            emoji = '✅';
            results.summary.ok_tables++;
            break;
          case 'EMPTY':
            emoji = '⚠️';
            results.summary.empty_tables++;
            break;
          case 'LOW_DATA':
            emoji = '🔸';
            results.summary.ok_tables++;
            break;
        }
      } else {
        results.summary.error_tables++;
        emoji = '❌';
      }
      
      console.log(`${emoji} ${tableName.padEnd(25)} | ${tableResult.count.toString().padStart(5)} rows | ${status}`);
      
      if (tableResult.error) {
        console.log(`     └── Error: ${tableResult.error}`);
      }
    }
  }
  
  // Generar recomendaciones
  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMEN DEL SISTEMA:');
  console.log('='.repeat(70));
  console.log(`📋 Total de tablas esperadas: ${results.summary.total_tables}`);
  console.log(`✅ Tablas existentes: ${results.summary.existing_tables}`);
  console.log(`🔸 Tablas funcionando: ${results.summary.ok_tables}`);
  console.log(`⚠️ Tablas vacías: ${results.summary.empty_tables}`);
  console.log(`❌ Tablas con error: ${results.summary.error_tables}`);
  
  // Análisis detallado de problemas
  console.log('\n🔧 ANÁLISIS DE PROBLEMAS:');
  console.log('='.repeat(70));
  
  const criticalMissing = [];
  const emptyTables = [];
  const errorTables = [];
  
  for (const [tableName, result] of Object.entries(results.tables)) {
    if (!result.exists) {
      criticalMissing.push(tableName);
    } else if (result.status === 'EMPTY') {
      emptyTables.push(tableName);
    } else if (result.status === 'ERROR') {
      errorTables.push(tableName);
    }
  }
  
  if (criticalMissing.length > 0) {
    console.log('❌ TABLAS CRÍTICAS FALTANTES:');
    criticalMissing.forEach(table => {
      console.log(`   - ${table}`);
    });
    results.recommendations.push('EJECUTAR: migration-fix-unified-system.sql');
  }
  
  if (emptyTables.length > 0) {
    console.log('\n⚠️ TABLAS VACÍAS (no crítico):');
    emptyTables.forEach(table => {
      console.log(`   - ${table}`);
    });
    results.recommendations.push('OPCIONAL: Poblar tablas vacías con datos de prueba');
  }
  
  if (errorTables.length > 0) {
    console.log('\n💥 TABLAS CON ERRORES:');
    errorTables.forEach(table => {
      console.log(`   - ${table}: ${results.tables[table].error}`);
    });
    results.recommendations.push('REPARAR: Verificar permisos y estructura de tablas');
  }
  
  // Verificar tabla readings (la más crítica)
  console.log('\n🎯 ANÁLISIS ESPECIAL - TABLA READINGS:');
  console.log('='.repeat(70));
  
  if (results.tables['readings']?.exists) {
    const readingsStructure = await checkTableStructure('readings');
    if (readingsStructure) {
      console.log('✅ Estructura de readings:');
      readingsStructure.forEach(col => {
        console.log(`   - ${col}`);
      });
      
      // Verificar columnas críticas
      const criticalColumns = ['guest_id', 'user_id', 'reading_type', 'ip_address', 'fingerprint_id'];
      const missingColumns = criticalColumns.filter(col => !readingsStructure.includes(col));
      
      if (missingColumns.length > 0) {
        console.log('❌ COLUMNAS CRÍTICAS FALTANTES:');
        missingColumns.forEach(col => {
          console.log(`   - ${col}`);
        });
        results.recommendations.push('URGENTE: Aplicar fix-readings-table.sql');
      }
    }
  } else {
    console.log('❌ Tabla readings no existe - SISTEMA CRÍTICO INOPERATIVO');
    results.recommendations.push('CRÍTICO: Crear tabla readings inmediatamente');
  }
  
  // Verificar sistema de autenticación NextAuth
  console.log('\n🔐 ANÁLISIS AUTENTICACIÓN NEXTAUTH:');
  console.log('='.repeat(70));
  
  const authTables = EXPECTED_TABLES.auth_core;
  const authOk = authTables.every(table => results.tables[table]?.exists);
  
  if (authOk) {
    console.log('✅ Sistema de autenticación NextAuth: FUNCIONANDO');
    
    // Verificar si hay usuarios
    const profilesCount = results.tables['profiles']?.count || 0;
    const accountsCount = results.tables['accounts']?.count || 0;
    const sessionsCount = results.tables['sessions']?.count || 0;
    
    console.log(`   - Usuarios registrados: ${profilesCount}`);
    console.log(`   - Cuentas OAuth: ${accountsCount}`);
    console.log(`   - Sesiones activas: ${sessionsCount}`);
    
    if (profilesCount === 0) {
      console.log('⚠️ No hay usuarios registrados - normal para desarrollo');
    }
  } else {
    console.log('❌ Sistema de autenticación NextAuth: ROTO');
    const missingAuth = authTables.filter(table => !results.tables[table]?.exists);
    missingAuth.forEach(table => {
      console.log(`   - Falta: ${table}`);
    });
    results.recommendations.push('CRÍTICO: Crear tablas de autenticación NextAuth');
  }
  
  // Generar recomendaciones finales
  console.log('\n🚀 RECOMENDACIONES DE ACCIÓN:');
  console.log('='.repeat(70));
  
  if (results.recommendations.length === 0) {
    console.log('🎉 ¡SISTEMA COMPLETAMENTE FUNCIONAL!');
    console.log('No se requieren acciones adicionales.');
  } else {
    results.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  }
  
  // Comandos para ejecutar
  console.log('\n⚡ COMANDOS PARA EJECUTAR:');
  console.log('='.repeat(70));
  
  if (criticalMissing.length > 0) {
    console.log('1. URGENTE - Aplicar migración:');
    console.log('   Ve a Supabase Dashboard → SQL Editor');
    console.log('   Ejecuta: database/migration-fix-unified-system.sql');
    console.log('');
  }
  
  if (results.tables['readings']?.exists && results.tables['readings']?.status === 'OK') {
    console.log('2. VERIFICAR - Probar sistema:');
    console.log('   npm run dev');
    console.log('   Hacer una lectura de tarot');
    console.log('   Verificar que no aparezcan errores');
    console.log('');
  }
  
  console.log('3. MONITOREAR - Ejecutar después:');
  console.log('   node debug-unified-tracking.js');
  console.log('   node monitor-real-time.js');
  console.log('');
  
  console.log('4. LIMPIAR - Remover tablas no usadas:');
  console.log('   (Se generará lista específica si es necesario)');
  
  return results;
}

// Función para generar script de limpieza
function generateCleanupScript(results) {
  const unusedTables = [];
  const emptyTables = [];
  
  for (const [tableName, result] of Object.entries(results.tables)) {
    if (result.exists && result.status === 'EMPTY') {
      emptyTables.push(tableName);
    }
    if (!result.exists) {
      // Estas no existen, no hay que limpiarlas
    }
  }
  
  if (emptyTables.length > 0) {
    console.log('\n🧹 SCRIPT DE LIMPIEZA GENERADO:');
    console.log('='.repeat(70));
    console.log('-- SQL para eliminar tablas vacías (OPCIONAL)');
    emptyTables.forEach(table => {
      console.log(`-- DROP TABLE IF EXISTS ${table}; -- ${results.tables[table].count} rows`);
    });
    console.log('');
    console.log('⚠️ IMPORTANTE: Solo ejecutar después de confirmar que no se usan');
  }
}

// Ejecutar el test
runCompleteTest()
  .then(results => {
    generateCleanupScript(results);
    console.log('\n✅ TEST COMPLETADO');
    console.log('📊 Resultados guardados en memoria');
    console.log('🔧 Sigue las recomendaciones para optimizar el sistema');
  })
  .catch(error => {
    console.error('\n💥 ERROR FATAL:', error);
    process.exit(1);
  });
