import nodemailer from 'nodemailer';

// Configurar transporter de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

interface DailyCardEmailData {
  email: string;
  cardName: string;
  interpretation: string;
  cardMeaning: string;
  imageUrl?: string;
}

export async function sendDailyCardEmail(data: DailyCardEmailData): Promise<boolean> {
  try {
    console.log(`📧 Enviando email con Gmail SMTP a ${data.email}: ${data.cardName}`);

    const mailOptions = {
      from: `Videntia 🔮 <${process.env.GMAIL_EMAIL}>`,
      to: data.email,
      subject: `🔮 Tu carta del día: ${data.cardName}`,
      html: generateEmailTemplate(data),
      text: generateTextEmail(data)
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado exitosamente a ${data.email} (ID: ${result.messageId})`);
    return true;

  } catch (error) {
    console.error('Error en servicio de email Gmail:', error);
    return false;
  }
}

function generateEmailTemplate(data: DailyCardEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu carta del día</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #6366f1; font-size: 28px; margin: 0;">🔮 Videntia</h1>
        <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">Tu carta del día ha llegado</p>
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
          <h3 style="color: #6366f1; font-size: 18px; margin: 0 0 10px 0;">💫 Mensaje para ti:</h3>
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0;">
            ${data.interpretation}
          </p>
        </div>

        <!-- Card Meaning -->
        <div style="border-left: 4px solid #6366f1; padding-left: 15px; margin-bottom: 25px;">
          <p style="color: #64748b; font-size: 14px; font-style: italic; margin: 0;">
            ${data.cardMeaning}
          </p>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/protected" 
             style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            🔮 Descubre más en Videntia
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p style="margin: 0 0 10px 0;">
          Has recibido este email porque estás suscrito a las cartas diarias de Videntia.
        </p>
        <p style="margin: 0;">
          © 2025 Videntia - Descubre tu camino a través del tarot
        </p>
      </div>

    </body>
    </html>
  `;
}

function generateTextEmail(data: DailyCardEmailData): string {
  return `
🔮 VIDENTIA - Tu carta del día

${data.cardName}

💫 Mensaje para ti:
${data.interpretation}

${data.cardMeaning}

🔮 Descubre más lecturas en: ${process.env.NEXT_PUBLIC_SITE_URL}/protected

---
© 2025 Videntia - Descubre tu camino a través del tarot
  `.trim();
}

// Función de prueba para enviar email con Mailgun
export async function sendTestEmail(testEmail: string): Promise<boolean> {
  return sendDailyCardEmail({
    email: testEmail,
    cardName: "El Mago",
    interpretation: "Hoy tienes el poder de manifestar tus deseos. Todas las herramientas están a tu disposición.",
    cardMeaning: "Poder personal, manifestación, recursos disponibles",
    imageUrl: undefined
  });
}
