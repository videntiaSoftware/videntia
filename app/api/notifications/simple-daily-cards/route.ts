import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server.app';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { sendDailyCardEmail } from '@/lib/services/email-service';

// Crear cliente admin para acceso a usuarios
function createSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada');
  }

  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

// Servicio FINAL para envío masivo de cartas diarias
export async function POST(request: NextRequest) {
  try {
    console.log('🌅 [ENVÍO MASIVO] Iniciando envío diario a TODOS los usuarios registrados...');
    
    const supabase = await createClient();
    
    // Verificar si tenemos service role key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!serviceRoleKey) {
      console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY no configurada, usando usuarios de prueba');
      return await sendToTestUsers();
    }
    
    const supabaseAdmin = createSupabaseAdmin();
    
    // 1. Obtener usuarios que NO han recibido email hoy usando función optimizada
    console.log('👥 Obteniendo usuarios pendientes de email...');
    const { data: pendingUsers, error: usersError } = await supabaseAdmin
      .rpc('get_users_pending_daily_email');
    
    if (usersError) {
      console.error('❌ Error obteniendo usuarios pendientes:', usersError);
      return NextResponse.json({ error: 'Error obteniendo usuarios' }, { status: 500 });
    }

    console.log(`📊 Encontrados ${pendingUsers?.length || 0} usuarios pendientes de email`);

    const results = [];
    let emailsSent = 0;
    let errorsCount = 0;
    
    // 2. Iterar por cada usuario pendiente
    for (const user of pendingUsers) {
      if (user.email && user.email_confirmed) { // Solo usuarios con email confirmado
        try {
          console.log(`📧 Procesando: ${user.email}`);
          
          // 3. Obtener carta e interpretación aleatoria
          const { data: reading, error: readingError } = await supabase.rpc('get_random_daily_reading');
          
          if (readingError || !reading || reading.length === 0) {
            console.error(`❌ Error generando lectura para ${user.email}:`, readingError);
            errorsCount++;
            continue;
          }

          const cardReading = reading[0];
          
          // 4. Generate tracking URL for email analytics
          const trackingUrl = `https://videntia.vercel.app/api/track/mail-click?uid=${user.user_id}&card=${encodeURIComponent(cardReading.card_name)}&date=${new Date().toISOString().split('T')[0]}`;
          
          // 5. Enviar email REAL con Gmail SMTP
          const emailSent = await sendDailyCardEmail({
            email: user.email,
            cardName: cardReading.card_name,
            interpretation: cardReading.interpretation,
            cardMeaning: cardReading.card_meaning,
            imageUrl: cardReading.image_url,
            trackingUrl: trackingUrl
          });
          
          // 6. Registrar envío en la base de datos
          if (emailSent) {
            await supabaseAdmin
              .from('daily_email_logs')
              .insert({
                user_id: user.user_id,
                email: user.email,
                card_name: cardReading.card_name,
                email_status: 'sent'
              });
            
            emailsSent++;
            console.log(`✅ Email enviado exitosamente a ${user.email}: ${cardReading.card_name}`);
          } else {
            // Registrar fallo
            await supabaseAdmin
              .from('daily_email_logs')
              .insert({
                user_id: user.user_id,
                email: user.email,
                card_name: cardReading.card_name,
                email_status: 'failed'
              });
            
            errorsCount++;
            console.log(`❌ Error enviando email a ${user.email}`);
          }
          
          results.push({
            email: user.email,
            card: cardReading.card_name,
            interpretation: cardReading.interpretation.substring(0, 50) + '...',
            emailSent,
            timestamp: new Date().toISOString()
          });
          
        } catch (error) {
          console.error(`❌ Error procesando usuario ${user.email}:`, error);
          errorsCount++;
          results.push({
            email: user.email,
            error: error instanceof Error ? error.message : 'Error desconocido',
            emailSent: false,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        console.log(`⏭️ Saltando usuario sin email confirmado: ${user.email || 'sin email'}`);
      }
    }
    
    const totalUsers = pendingUsers?.length || 0;
    const confirmedUsers = pendingUsers?.filter((u: any) => u.email && u.email_confirmed).length || 0;
    
    console.log(`\n📈 RESUMEN DEL ENVÍO MASIVO:`);
    console.log(`👥 Total usuarios: ${totalUsers}`);
    console.log(`✅ Usuarios con email confirmado: ${confirmedUsers}`);
    console.log(`📧 Emails enviados exitosamente: ${emailsSent}`);
    console.log(`❌ Errores: ${errorsCount}`);
    console.log(`📊 Tasa de éxito: ${((emailsSent/confirmedUsers)*100).toFixed(1)}%`);
    
    return NextResponse.json({
      success: true,
      message: `Envío masivo completado: ${emailsSent}/${confirmedUsers} emails enviados`,
      stats: {
        totalUsers,
        confirmedUsers,
        emailsSent,
        errorsCount,
        successRate: `${((emailsSent/confirmedUsers)*100).toFixed(1)}%`
      },
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Error crítico en envío masivo:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor', 
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Función auxiliar para enviar a usuarios de prueba cuando no hay service key
async function sendToTestUsers() {
  try {
    const supabase = await createClient();
    
    console.log('🌅 [ENVÍO MASIVO] Usando usuarios de prueba...');
    
    const testUsers = [
      { email: 'test1@videntia.com', id: '1' },
      { email: 'test2@videntia.com', id: '2' },
      { email: 'test3@videntia.com', id: '3' },
      { email: 'usuario@ejemplo.com', id: '4' },
      { email: 'demo@videntia.com', id: '5' }
    ];

    const results = [];
    
    for (const user of testUsers) {
      try {
        const { data: reading, error: readingError } = await supabase.rpc('get_random_daily_reading');
        
        if (readingError || !reading || reading.length === 0) {
          console.error(`Error generando lectura para ${user.email}:`, readingError);
          continue;
        }

        const cardReading = reading[0];
        
        const emailSent = await sendDailyCardEmail({
          email: user.email,
          cardName: cardReading.card_name,
          interpretation: cardReading.interpretation,
          cardMeaning: cardReading.card_meaning,
          imageUrl: cardReading.image_url,
          trackingUrl: `https://videntia.vercel.app/api/track/mail-click?uid=${user.id}&card=${encodeURIComponent(cardReading.card_name)}&date=${new Date().toISOString().split('T')[0]}`
        });
        
        results.push({
          email: user.email,
          card: cardReading.card_name,
          interpretation: cardReading.interpretation.substring(0, 50) + '...',
          emailSent
        });
        
        console.log(`📧 Enviado a ${user.email}: ${cardReading.card_name}`);
        
      } catch (error) {
        console.error(`Error procesando usuario ${user.email}:`, error);
      }
    }
    
    const emailsSent = results.filter(r => r.emailSent).length;
    
    console.log(`✅ Proceso completado: ${emailsSent}/${testUsers.length} emails enviados`);
    
    return NextResponse.json({
      success: true,
      message: `[TEST] Cartas enviadas a ${emailsSent} de ${testUsers.length} usuarios de prueba`,
      results,
      note: "Usando usuarios de prueba. Configura SUPABASE_SERVICE_ROLE_KEY para usuarios reales."
    });

  } catch (error) {
    console.error('Error en envío a usuarios de prueba:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// GET - Disparar envío masivo manualmente (mismo proceso que cron job)
export async function GET() {
  try {
    console.log('🌅 [ENVÍO MASIVO] Iniciando envío diario a TODOS los usuarios registrados...');
    
    // Verificar si tenemos service role key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!serviceRoleKey) {
      console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY no configurada, usando usuarios de prueba');
      return await sendToTestUsers();
    }
    
    const supabaseAdmin = createSupabaseAdmin();
    
    // Obtener usuarios pendientes usando la función SQL
    console.log('👥 Obteniendo usuarios pendientes de email...');
    const { data: users, error: usersError } = await supabaseAdmin
      .rpc('get_users_pending_daily_email');

    if (usersError) {
      console.error('❌ Error obteniendo usuarios:', usersError);
      return NextResponse.json({ 
        success: false, 
        error: 'Error obteniendo usuarios pendientes' 
      }, { status: 500 });
    }

    if (!users || users.length === 0) {
      console.log('📭 No hay usuarios pendientes de email diario');
      return NextResponse.json({ 
        success: true, 
        message: 'No hay usuarios pendientes de email',
        sent: 0 
      });
    }

    console.log(`📊 Encontrados ${users.length} usuarios pendientes de email`);

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];
    const results = [];

    // Procesar cada usuario
    for (const user of users) {
      try {
        console.log(`📧 Procesando: ${user.email}`);
        
        // Obtener carta aleatoria usando la función existente
        const supabase = await createClient();
        const { data: reading, error: readingError } = await supabase.rpc('get_random_daily_reading');
        
        if (readingError || !reading || reading.length === 0) {
          console.error(`❌ Error generando lectura para ${user.email}:`, readingError);
          errors.push(`Error generando lectura para ${user.email}`);
          errorCount++;
          continue;
        }

        const cardReading = reading[0];

        // Crear URL con parámetros de tracking
        const trackingUrl = `https://videntia.vercel.app/api/track/mail-click?uid=${user.user_id}&card=${encodeURIComponent(cardReading.card_name)}&date=${new Date().toISOString().split('T')[0]}`;

        // Enviar email con tracking
        const emailSent = await sendDailyCardEmail({
          email: user.email,
          cardName: cardReading.card_name,
          interpretation: cardReading.interpretation,
          cardMeaning: cardReading.card_meaning,
          imageUrl: cardReading.image_url,
          trackingUrl: trackingUrl
        });

        if (emailSent) {
          console.log(`✅ Email enviado exitosamente a ${user.email}: ${cardReading.card_name}`);
          
          // Registrar en daily_email_logs
          await supabaseAdmin
            .from('daily_email_logs')
            .insert({
              user_id: user.user_id,
              email: user.email,
              card_name: cardReading.card_name,
              email_status: 'sent'
            });

          successCount++;
        } else {
          console.error(`❌ Error enviando email a ${user.email}`);
          errors.push(`Error enviando email a ${user.email}`);
          errorCount++;
        }

        results.push({
          email: user.email,
          card: cardReading.card_name,
          interpretation: cardReading.interpretation.substring(0, 50) + '...',
          emailSent,
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        console.error(`❌ Error procesando ${user.email}:`, error);
        errors.push(`Error procesando ${user.email}: ${error}`);
        errorCount++;
      }
    }

    // Mostrar resumen
    console.log('\n📈 RESUMEN DEL ENVÍO MASIVO:');
    console.log(`👥 Total usuarios: ${users.length}`);
    console.log(`✅ Usuarios con email confirmado: ${users.filter(u => u.email_confirmed).length}`);
    console.log(`📧 Emails enviados exitosamente: ${successCount}`);
    console.log(`❌ Errores: ${errorCount}`);
    console.log(`📊 Tasa de éxito: ${((successCount / users.length) * 100).toFixed(1)}%`);

    return NextResponse.json({
      success: true,
      message: 'Envío masivo completado',
      stats: {
        total: users.length,
        sent: successCount,
        errors: errorCount,
        successRate: ((successCount / users.length) * 100).toFixed(1) + '%'
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('❌ Error en el endpoint de envío masivo:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}
