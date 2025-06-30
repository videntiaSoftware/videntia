import { NextRequest, NextResponse } from 'next/server';

// Template HTML para el email de carta del día
const getDailyCardEmailTemplate = (userName: string, cardData: any) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Carta del Día - Videntia</title>
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2d3748; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%); color: white; padding: 30px 20px; text-align: center;">
            <div style="font-size: 24px; margin: 10px 0;">✨ 🔮 ✨</div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Videntia Tarot</h1>
            <p style="margin: 5px 0 0 0;">Tu Carta del Día</p>
        </div>
        
        <div style="padding: 40px 30px; text-align: center;">
            <div style="font-size: 24px; margin: 10px 0;">🌟</div>
            <h2>Hola ${userName || 'Querido buscador'},</h2>
            <p>El universo ha seleccionado una carta especial para ti hoy:</p>
            
            <div style="font-size: 32px; font-weight: bold; color: #d69e2e; margin-bottom: 15px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${cardData.card_name}</div>
            <div style="font-size: 18px; color: #4a5568; font-style: italic; margin-bottom: 25px;">${cardData.card_meaning}</div>
            
            <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #d69e2e; font-size: 16px; line-height: 1.8; color: #2d3748;">
                <strong>Mensaje del día:</strong><br>
                ${cardData.daily_message}
            </div>
        </div>
        
        <div style="background: #2d3748; color: #a0aec0; padding: 25px; text-align: center; font-size: 14px;">
            <p>Reflexiona sobre este mensaje durante el día y permite que su sabiduría te guíe.</p>
            <p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}" style="color: #d69e2e; text-decoration: none;">Visita Videntia</a> para obtener más lecturas
            </p>
            <p style="font-size: 12px; margin-top: 20px;">
                Si no deseas recibir más notificaciones, puedes 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.com'}/profile" style="color: #d69e2e; text-decoration: none;">actualizar tus preferencias aquí</a>
            </p>
        </div>
    </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const { email, name, card_data } = await request.json();

    if (!email || !card_data) {
      return NextResponse.json(
        { error: 'Email and card data are required' },
        { status: 400 }
      );
    }

    const emailContent = getDailyCardEmailTemplate(name, card_data);
    
    // Simular envío exitoso (en producción, aquí irían las llamadas reales a la API de email)
    console.log(`[Daily Card Email] Sending to: ${email}`);
    console.log(`[Daily Card Email] Card: ${card_data.card_name}`);
    console.log(`[Daily Card Email] Content length: ${emailContent.length} characters`);
    
    // TODO: Integrar con servicio de email real (Resend, SendGrid, etc.)

    return NextResponse.json({ 
      success: true, 
      message: 'Daily card email sent successfully'
    });

  } catch (error) {
    console.error('Error sending daily card email:', error);
    return NextResponse.json(
      { error: 'Failed to send daily card email' },
      { status: 500 }
    );
  }
}
