import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { v5 as uuidv5 } from 'uuid';

// Namespace UUID para generar IDs consistentes a partir de emails
const EMAIL_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

// Generar un UUID consistente basado en email (para testing sin autenticación)
function generateTestUserId(email: string): string {
  return uuidv5(email.toLowerCase().trim(), EMAIL_NAMESPACE);
}

// Servicio mejorado para cartas diarias PERSONALIZADAS por usuario
class PersonalizedDailyCardService {
  
  // Obtener o generar lectura diaria personalizada para un usuario específico
  async getUserDailyReading(userId: string, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    try {
      const supabase = createClient();
      
      // Llamar a la función PostgreSQL que genera o recupera la lectura personalizada
      const { data, error } = await supabase.rpc('generate_user_daily_reading', {
        target_user_id: userId,
        target_date: targetDate
      });

      if (error) {
        console.error('Error calling generate_user_daily_reading:', error);
        return null;
      }

      if (!data || data.length === 0) {
        console.error('No personal reading generated for user:', userId, 'date:', targetDate);
        return null;
      }

      return data[0]; // La función retorna un array, tomamos el primer elemento
    } catch (error) {
      console.error('Error in getUserDailyReading:', error);
      return null;
    }
  }

  // Enviar cartas diarias a TODOS los usuarios registrados
  async sendDailyCardsToAllUsers(targetDate?: string) {
    const date = targetDate || new Date().toISOString().split('T')[0];
    
    try {
      const supabase = createClient();
      
      // Obtener todos los usuarios registrados con email
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        return { success: false, error: 'No se pudieron obtener los usuarios' };
      }

      const results = [];
      
      for (const user of users.users) {
        if (user.email) {
          try {
            // Generar lectura personalizada para este usuario
            const reading = await this.getUserDailyReading(user.id, date);
            
            if (reading) {
              // Enviar email personalizado
              const emailSent = await this.sendPersonalizedEmail(
                user.email, 
                reading.card_name,
                this.createSimpleTeaser(reading),
                date
              );
              
              results.push({
                userId: user.id,
                email: user.email,
                card: reading.card_name,
                emailSent
              });
            }
          } catch (error) {
            console.error(`Error processing user ${user.email}:`, error);
            results.push({
              userId: user.id,
              email: user.email,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      }
      
      return {
        success: true,
        date,
        totalUsers: users.users.length,
        emailsSent: results.filter(r => r.emailSent).length,
        results
      };
      
    } catch (error) {
      console.error('Error in sendDailyCardsToAllUsers:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Crear un teaser simple y ambiguo para el email
  createSimpleTeaser(reading: any): string {
    const teasers = [
      `Tu energía de hoy: ${reading.card_name}. ¿Qué mensaje especial te espera?`,
      `${reading.card_name} tiene algo importante que decirte hoy...`,
      `Las cartas susurran: ${reading.card_name}. Descubre tu mensaje personal.`,
      `Tu carta del día es ${reading.card_name}. ¿Estás listo para conocer su secreto?`,
      `${reading.card_name} apareció en tu lectura diaria. Su mensaje te sorprenderá.`,
      `Hoy ${reading.card_name} trae energías especiales solo para ti.`,
      `¿Por qué ${reading.card_name} eligió aparecer en tu día? La respuesta te espera.`,
      `${reading.card_name} susurra secretos que cambiarán tu perspectiva hoy.`,
      `Tu destino y ${reading.card_name} se han alineado perfectamente.`,
      `${reading.card_name} revela algo que necesitas saber urgentemente.`
    ];
    
    return teasers[Math.floor(Math.random() * teasers.length)];
  }

  // Enviar email personalizado simple y efectivo
  async sendPersonalizedEmail(email: string, cardName: string, teaser: string, date: string) {
    try {
      // Template de email simple y ambiguo para generar curiosidad
      const emailContent = this.generateSimpleEmailTemplate(email, cardName, teaser, date);
      
      console.log(`📧 EMAIL ENVIADO A: ${email}`);
      console.log(`📅 Fecha: ${date}`);
      console.log(`🃏 Carta: ${cardName}`);
      console.log(`✨ Teaser: ${teaser}`);
      console.log(`🔗 CTA: "Ver mi lectura completa en Videntia"`);
      console.log('---');
      
      // Aquí irá la integración real con el servicio de email
      // await sendEmailWithResend(email, emailContent);
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Template de email simple, ambiguo y efectivo para engagement
  generateSimpleEmailTemplate(email: string, cardName: string, teaser: string, date: string): string {
    const userName = email.split('@')[0];
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu carta del día - Videntia</title>
</head>
<body style="font-family: 'Georgia', serif; margin: 0; padding: 0; background: #1a1a2e;">
    <div style="max-width: 480px; margin: 0 auto; background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);">
        
        <!-- Header minimalista -->
        <div style="text-align: center; padding: 30px 20px 20px; background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);">
            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: bold; letter-spacing: 1px;">
                🔮 VIDENTIA
            </h1>
            <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Tu carta personal del día
            </p>
        </div>
        
        <!-- Contenido principal -->
        <div style="padding: 30px 25px; text-align: center; color: white;">
            
            <!-- Saludo personalizado -->
            <h2 style="margin: 0 0 20px; color: #d4af37; font-size: 20px;">
                ✨ ${userName}
            </h2>
            
            <!-- Carta del día destacada -->
            <div style="background: rgba(212, 175, 55, 0.1); border: 2px solid #d4af37; border-radius: 12px; padding: 25px; margin: 20px 0;">
                <div style="font-size: 28px; color: #d4af37; font-weight: bold; margin-bottom: 8px;">
                    ${cardName}
                </div>
                <div style="color: rgba(255,255,255,0.7); font-size: 13px;">
                    Seleccionada exclusivamente para ti
                </div>
            </div>
            
            <!-- Mensaje teaser ambiguo -->
            <div style="margin: 25px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 4px solid #d4af37;">
                <p style="margin: 0; color: #e6e6e6; font-size: 16px; font-style: italic; line-height: 1.4;">
                    "${teaser}"
                </p>
            </div>
            
            <!-- CTA ambiguo para generar curiosidad -->
            <div style="margin: 30px 0 20px;">
                <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin-bottom: 20px;">
                    ¿Qué mensaje especial esconde para ti? 🤔
                </p>
                
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}/" 
                   style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); color: white; text-decoration: none; padding: 15px 35px; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3); transition: all 0.3s ease;">
                    Descubrir mi mensaje →
                </a>
            </div>
            
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 20px 0 0;">
                Solo para ti • ${date}
            </p>
        </div>
        
        <!-- Footer minimalista -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px; text-align: center;">
            <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 11px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}/profile" 
                   style="color: #d4af37; text-decoration: none;">
                    Gestionar notificaciones
                </a>
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  // Obtener estadísticas de la base de datos personalizada
  async getDatabaseStats() {
    try {
      const supabase = createClient();
      
      const [cardsResult, interpretationsResult, templatesResult, userReadingsResult] = await Promise.all([
        supabase.from('tarot_cards').select('count'),
        supabase.from('card_interpretations').select('count'),
        supabase.from('message_templates').select('count'),
        supabase.from('user_daily_readings').select('count')
      ]);

      // Obtener también estadísticas de usuarios únicos
      const { data: uniqueUsers } = await supabase
        .from('user_daily_readings')
        .select('user_id', { count: 'exact', head: true });

      const { data: userReadingStats } = await supabase
        .from('user_daily_readings')
        .select('user_id')
        .neq('user_id', null);

      const uniqueUserCount = userReadingStats ? 
        new Set(userReadingStats.map(r => r.user_id)).size : 0;

      return {
        total_cards: cardsResult.count || 0,
        total_interpretations: interpretationsResult.count || 0,
        total_templates: templatesResult.count || 0,
        total_user_readings: userReadingsResult.count || 0,
        unique_users_with_readings: uniqueUserCount
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      return null;
    }
  }

  // Simular lectura para usuario de prueba (cuando no hay autenticación)
  async getTestUserReading(testEmail: string, date?: string) {
    // Crear un UUID determinístico basado en el email para testing
    const testUserId = this.generateTestUserId(testEmail);
    return this.getUserDailyReading(testUserId, date);
  }

  private generateTestUserId(email: string): string {
    // Generar UUID determinístico basado en email para testing
    // En producción, esto sería el UUID real del usuario autenticado
    const hash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const uuid = `00000000-0000-0000-0000-${Math.abs(hash).toString().padStart(12, '0')}`;
    return uuid;
  }
}

const personalizedCardService = new PersonalizedDailyCardService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const action = searchParams.get('action'); // 'stats' para estadísticas
    const testEmail = searchParams.get('test_email'); // Para testing sin auth

    if (action === 'stats') {
      const stats = await personalizedCardService.getDatabaseStats();
      return NextResponse.json({
        success: true,
        stats
      });
    }

    console.log(`[Personalized Daily Card] Getting reading for date: ${date || 'today'}, test_email: ${testEmail}`);

    let reading;
    if (testEmail) {
      // Modo de prueba: usar email para generar UUID de prueba
      reading = await personalizedCardService.getTestUserReading(testEmail, date || undefined);
    } else {
      // En producción: obtener user_id del usuario autenticado
      // TODO: Implementar autenticación real aquí
      const defaultTestEmail = 'test@videntia.com';
      reading = await personalizedCardService.getTestUserReading(defaultTestEmail, date || undefined);
    }
    
    if (!reading) {
      return NextResponse.json(
        { error: 'No se pudo generar la lectura diaria personalizada. Verifica que las tablas estén creadas correctamente.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      reading: {
        id: reading.reading_id,
        card_name: reading.card_name,
        card_meaning: reading.card_meaning,
        position: reading.position,
        full_message: reading.full_message,
        energy_focus: reading.energy_focus,
        date_for: date || new Date().toISOString().split('T')[0],
        personalized: true // Indicar que es personalizada
      }
    });

  } catch (error) {
    console.error('Error in personalized daily card endpoint:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Manejar envío de cartas: masivo a todos los usuarios O individual de prueba
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, date, user_id } = body;
    
    const cardService = new PersonalizedDailyCardService();
    
    // ENVÍO MASIVO A TODOS LOS USUARIOS (para cron job diario a las 10 AM)
    if (action === 'send_to_all_users') {
      console.log(`🌅 [ENVÍO MASIVO] Iniciando envío diario a todos los usuarios para fecha: ${date || 'hoy'}`);
      
      const result = await cardService.sendDailyCardsToAllUsers(date);
      
      console.log(`📊 [RESULTADO MASIVO] ${result.emailsSent}/${result.totalUsers} emails enviados`);
      
      return NextResponse.json({
        success: result.success,
        message: result.success 
          ? `✅ Cartas diarias enviadas a ${result.emailsSent} de ${result.totalUsers} usuarios registrados`
          : '❌ Error en el envío masivo de cartas diarias',
        data: result
      });
    }
    
    // ENVÍO INDIVIDUAL DE PRUEBA
    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido para envío individual' },
        { status: 400 }
      );
    }

    console.log(`📧 [ENVÍO INDIVIDUAL] Generando carta personal para: ${email}`);

    // Generar lectura personalizada
    const userId = user_id || generateTestUserId(email);
    const reading = await cardService.getUserDailyReading(userId, date);
    
    if (!reading) {
      return NextResponse.json(
        { error: 'No se pudo generar la lectura personalizada' },
        { status: 500 }
      );
    }

    // Crear teaser simple y ambiguo (perfecto para engagement)
    const teaser = cardService.createSimpleTeaser(reading);
    
    // Enviar email personalizado
    const emailSent = await cardService.sendPersonalizedEmail(
      email,
      reading.card_name,
      teaser,
      date || new Date().toISOString().split('T')[0]
    );
    
    return NextResponse.json({ 
      success: emailSent, 
      message: emailSent 
        ? `✅ Carta diaria enviada a ${email}` 
        : `❌ Error enviando carta a ${email}`,
      data: {
        email,
        card: reading.card_name,
        position: reading.position,
        teaser, // Mensaje corto y ambiguo para generar curiosidad
        personalized: true,
        reading // Lectura completa para referencia
      }
    });

  } catch (error) {
    console.error('Error en endpoint POST enhanced-daily-card:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function generatePersonalizedEmailTemplate(userName: string, reading: any) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Carta del Día - Videntia</title>
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2d3748; background: #1a202c; margin: 0; padding: 20px;">
    <div style="max-width: 500px; margin: 0 auto; background: #f7fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%); color: white; padding: 25px 20px; text-align: center;">
            <div style="font-size: 20px; margin-bottom: 8px;">🔮</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: bold;">Videntia Tarot</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Tu carta personal del día</p>
        </div>
        
        <!-- Contenido Principal -->
        <div style="padding: 30px 25px; text-align: center;">
            <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">Hola ${userName} ✨</h2>
            
            <!-- Carta del día -->
            <div style="background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">
                    ${reading.card_name}
                </div>
                <div style="font-size: 12px; opacity: 0.8;">
                    ${reading.card_position === 'upright' ? 'Posición Normal' : 'Posición Invertida'}
                </div>
            </div>
            
            <!-- Mensaje teaser corto y ambiguo -->
            <div style="background: #edf2f7; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px; color: #4a5568; font-style: italic; line-height: 1.5;">
                    "${reading.energy_focus || 'Las energías de ' + reading.card_name + ' te rodean hoy con mensajes importantes.'}"
                </p>
            </div>
            
            <!-- Curiosidad y CTA -->
            <div style="background: rgba(214, 158, 46, 0.1); padding: 18px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; color: #4a5568; font-size: 14px;">
                    🔮 <strong>¿Qué mensaje especial tiene para ti?</strong>
                </p>
                <p style="margin: 0; color: #718096; font-size: 13px;">
                    Tu interpretación completa y personalizada te espera...
                </p>
            </div>
            
            <!-- CTA Button -->
            <div style="margin: 25px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}/" 
                   style="display: inline-block; background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(214, 158, 46, 0.3);">
                    Ver mi lectura completa →
                </a>
            </div>
            
            <p style="color: #a0aec0; font-size: 11px; margin: 15px 0 0 0;">
                Esta carta fue seleccionada exclusivamente para ti ✨
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #2d3748; color: #a0aec0; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}/profile" style="color: #d69e2e; text-decoration: none;">Gestionar notificaciones</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
