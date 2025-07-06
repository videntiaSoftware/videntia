import axios from 'axios';

interface DailyCardEmailData {
  email: string;
  cardName: string;
  interpretation: string;
  cardMeaning: string;
  imageUrl?: string;
  trackingUrl?: string;
}

export async function sendDailyCardEmail(data: DailyCardEmailData): Promise<boolean> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const fromName = process.env.BREVO_FROM_NAME;

    const html = generateEmailTemplate(data);
    const text = generateTextEmail(data);

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          email: fromEmail,
          name: fromName
        },
        to: [
          {
            email: data.email,
            name: data.email
          }
        ],
        subject: `Tu carta del día: ${data.cardName}`,
        htmlContent: html,
        textContent: text
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        }
      }
    );

    return response.status === 201;
  } catch (error: any) {
    console.error('Error enviando email con Brevo:', error?.response?.data || error);
    return false;
  }
}

function generateEmailTemplate(data: DailyCardEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu carta del día - Videntia</title>
    </head>
    <body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; color: #333;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; color: white;">
        <h1 style="font-size: 28px; margin: 0;">Videntia</h1>
        <p style="font-size: 16px; margin: 10px 0 0 0; opacity: 0.9;">Tu lectura diaria de tarot</p>
      </div>

      <!-- Card Section -->
      <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Card Image -->
        ${data.imageUrl ? `
          <div style="text-align: center; margin-bottom: 25px;">
            <img src="${data.imageUrl}" alt="${data.cardName}" style="max-width: 200px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
          </div>
        ` : ''}

        <!-- Card Name -->
        <h2 style="color: #1e293b; font-size: 24px; text-align: center; margin: 0 0 20px 0; font-weight: bold;">
          ${data.cardName}
        </h2>

        <!-- Daily Message -->
        <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #6366f1; font-size: 18px; margin: 0 0 10px 0;">Mensaje para ti:</h3>
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0;">
            ${data.interpretation}
          </p>
        </div>

        <!-- Card Meaning -->
        <div style="border-left: 4px solid #6366f1; padding-left: 15px; margin-bottom: 25px;">
          <p style="color: #64748b; font-size: 14px; font-style: italic; margin: 0;">
            <strong>Significado:</strong> ${data.cardMeaning}
          </p>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center;">
          <a href="${data.trackingUrl || 'https://videntiatarot.com'}" 
             style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Descubre tu lectura completa
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
        <p style="margin: 0 0 10px 0;">
          Has recibido este email porque estás suscrito a las cartas diarias de Videntia.
        </p>
        <p style="margin: 0 0 10px 0;">
          <a href="https://videntiatarot.com/profile" style="color: #6366f1; text-decoration: none;">Gestionar suscripción</a>
        </p>
        <p style="margin: 0;">
          © 2025 Videntia - Lectura de tarot profesional<br>
          <a href="https://videntiatarot.com" style="color: #6366f1; text-decoration: none;">videntiatarot.com</a>
        </p>
      </div>

    </body>
    </html>
  `;
}

function generateTextEmail(data: DailyCardEmailData): string {
  return `
VIDENTIA - Tu carta del día

${data.cardName}

Mensaje para ti:
${data.interpretation}

Significado: ${data.cardMeaning}

Descubre más lecturas en: https://videntiatarot.com/

---
© 2025 Videntia - Lectura de tarot profesional
Para gestionar tu suscripción: https://videntiatarot.com/profile
  `.trim();
}

// Función de prueba para enviar email
export async function sendTestEmail(testEmail: string): Promise<boolean> {
  return sendDailyCardEmail({
    email: testEmail,
    cardName: "El Mago",
    interpretation: "Hoy tienes el poder de manifestar tus deseos. Todas las herramientas están a tu disposición.",
    cardMeaning: "Poder personal, manifestación, recursos disponibles",
    imageUrl: undefined
  });
}
