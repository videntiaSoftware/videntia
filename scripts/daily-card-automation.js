#!/usr/bin/env node

/**
 * Script de automatización para envío diario de cartas del tarot
 * Ejecutar este script a las 10:00 AM todos los días
 * 
 * CRON Job sugerido:
 * 0 10 * * * node /path/to/videntia/scripts/daily-card-automation.js
 */

const fetch = require('node-fetch');

// Configuración
const API_BASE_URL = process.env.VIDENTIA_API_URL || 'https://videntia.vercel.app';
const API_KEY = process.env.VIDENTIA_CRON_API_KEY || 'tu-api-key-segura'; // Para autenticación

// Función principal
async function sendDailyCardsToAllUsers() {
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`🌅 [${new Date().toISOString()}] Iniciando envío diario de cartas del tarot`);
  console.log(`📅 Fecha: ${today}`);
  console.log(`🎯 API: ${API_BASE_URL}/api/notifications/enhanced-daily-card`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/enhanced-daily-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // Para autenticación si es necesario
        'User-Agent': 'Videntia-DailyCard-Cron/1.0'
      },
      body: JSON.stringify({
        action: 'send_to_all_users',
        date: today
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ [ÉXITO] Cartas enviadas a ${result.data.emailsSent} de ${result.data.totalUsers} usuarios`);
      console.log(`📊 Estadísticas:`);
      console.log(`   • Total usuarios: ${result.data.totalUsers}`);
      console.log(`   • Emails enviados: ${result.data.emailsSent}`);
      console.log(`   • Tasa de éxito: ${Math.round((result.data.emailsSent / result.data.totalUsers) * 100)}%`);
      
      // Log para monitoreo
      const logEntry = {
        timestamp: new Date().toISOString(),
        date: today,
        totalUsers: result.data.totalUsers,
        emailsSent: result.data.emailsSent,
        success: true
      };
      
      console.log(`📝 [LOG]`, JSON.stringify(logEntry));
      
    } else {
      console.error(`❌ [ERROR] Fallo en el envío masivo:`, result.error);
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`💥 [CRITICAL ERROR] Error ejecutando script de envío diario:`, error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Función para validar que es la hora correcta (opcional)
function isCorrectTime() {
  const now = new Date();
  const hour = now.getHours();
  
  // Solo ejecutar entre las 10:00 y 10:59 AM
  if (hour !== 10) {
    console.log(`⏰ [SKIP] No es la hora correcta. Hora actual: ${hour}:${now.getMinutes().toString().padStart(2, '0')}`);
    console.log(`🕙 Este script debe ejecutarse a las 10:00 AM`);
    return false;
  }
  
  return true;
}

// Función para verificar que no se ejecute dos veces el mismo día
async function checkIfAlreadySent(date) {
  try {
    // Verificar si ya se envió hoy (opcional - implementar según necesidad)
    // Esto podría consultar una tabla de logs o usar un archivo temporal
    return false; // Por ahora siempre permitir envío
  } catch (error) {
    console.warn(`⚠️ [WARNING] No se pudo verificar envío previo:`, error.message);
    return false; // En caso de duda, permitir envío
  }
}

// Ejecutar script principal
async function main() {
  console.log(`🃏 VIDENTIA - Script de envío diario de cartas del tarot`);
  console.log(`⏰ Hora de ejecución: ${new Date().toLocaleString()}`);
  
  // Verificaciones opcionales
  if (process.env.NODE_ENV === 'production' && !isCorrectTime()) {
    process.exit(0);
  }
  
  const today = new Date().toISOString().split('T')[0];
  const alreadySent = await checkIfAlreadySent(today);
  
  if (alreadySent) {
    console.log(`✋ [SKIP] Las cartas ya fueron enviadas hoy (${today})`);
    process.exit(0);
  }
  
  // Ejecutar envío
  await sendDailyCardsToAllUsers();
  
  console.log(`🎉 [COMPLETE] Proceso de envío diario completado exitosamente`);
}

// Manejar errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 [UNHANDLED REJECTION]', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('💥 [UNCAUGHT EXCEPTION]', error);
  process.exit(1);
});

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { sendDailyCardsToAllUsers, main };
