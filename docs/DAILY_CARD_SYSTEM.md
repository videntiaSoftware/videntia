# 🃏 Sistema de Cartas Diarias Personalizadas - Videntia

## 📋 Resumen del Sistema

Este sistema envía **lecturas de tarot diarias personalizadas** a todos los usuarios registrados a las **10:00 AM** cada día. Cada usuario recibe:

- ✨ **Su propia carta única** para cada día
- 📧 **Email personalizado** con un mensaje ambiguo que genera curiosidad
- 🔗 **Call-to-Action** que los dirija a la página para ver la lectura completa
- 🎯 **Determinismo**: El mismo usuario + misma fecha = misma carta siempre

## 🏗️ Arquitectura del Sistema

### 1. Base de Datos (PostgreSQL)
```sql
📁 /database/quick-setup.sql
```

**Tablas principales:**
- `tarot_cards` - 78 cartas del tarot con significados
- `card_interpretations` - Múltiples interpretaciones por carta
- `message_templates` - Plantillas modulares para variación infinita
- `user_daily_readings` - Lecturas personalizadas por usuario por día

**Función clave:**
```sql
generate_user_daily_reading(user_id, date) 
```
- Genera lectura determinística basada en `user_id + fecha`
- Cachea resultados para evitar regeneración
- Combina cartas, interpretaciones y templates aleatoriamente

### 2. API Endpoints
```typescript
📁 /app/api/notifications/enhanced-daily-card/route.ts
```

**GET** - Obtener lectura personalizada para un usuario:
```
GET /api/notifications/enhanced-daily-card?test_email=user@example.com&date=2025-06-24
```

**POST** - Enviar emails:
```json
// Envío individual
{
  "email": "user@example.com",
  "date": "2025-06-24"
}

// Envío masivo a TODOS los usuarios
{
  "action": "send_to_all_users",
  "date": "2025-06-24"
}
```

### 3. Automatización Diaria
```javascript
📁 /scripts/daily-card-automation.js
```

Script de Node.js que:
- Se ejecuta a las 10:00 AM vía cron job
- Llama al endpoint de envío masivo
- Registra estadísticas de envío
- Maneja errores y reintentos

### 4. Interfaz de Testing
```tsx
📁 /app/admin/daily-card-test/page.tsx
```

Panel administrativo para:
- 📧 Enviar emails de prueba individuales
- 📡 Envío masivo a todos los usuarios
- 🔍 Generar y visualizar lecturas personalizadas
- 📊 Ver estadísticas de la base de datos

## 🚀 Configuración e Instalación

### Paso 1: Configurar Base de Datos

1. **Ejecutar en Supabase SQL Editor:**
```sql
-- Copia y pega todo el contenido de:
/database/quick-setup.sql
```

2. **Verificar instalación:**
```sql
SELECT COUNT(*) FROM tarot_cards;         -- Debe retornar 5
SELECT COUNT(*) FROM card_interpretations; -- Debe retornar 5+
SELECT COUNT(*) FROM message_templates;   -- Debe retornar 16+
```

### Paso 2: Configurar Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
VIDENTIA_CRON_API_KEY=tu-api-key-segura
```

### Paso 3: Configurar Cron Job

```bash
# Editar crontab
crontab -e

# Agregar línea para ejecutar a las 10:00 AM todos los días
0 10 * * * cd /path/to/videntia && node scripts/daily-card-automation.js >> /var/log/videntia-daily-cards.log 2>&1
```

### Paso 4: Instalar Dependencias de Email

```bash
# Para Resend (recomendado)
npm install resend

# O para SendGrid
npm install @sendgrid/mail
```

## 📧 Configuración de Email

### Opción A: Resend (Recomendado)
```typescript
// En el método sendPersonalizedEmail
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Videntia <cartas@videntia.com>',
  to: email,
  subject: `Tu carta del día: ${cardName} - Videntia`,
  html: emailContent
});
```

### Opción B: SendGrid
```typescript
// En el método sendPersonalizedEmail
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  from: 'cartas@videntia.com',
  to: email,
  subject: `Tu carta del día: ${cardName} - Videntia`,
  html: emailContent
});
```

## 🧪 Testing del Sistema

### 1. Probar Lectura Individual
```bash
curl "http://localhost:3000/api/notifications/enhanced-daily-card?test_email=test@example.com&date=2025-06-24"
```

### 2. Probar Envío de Email Individual
```bash
curl -X POST http://localhost:3000/api/notifications/enhanced-daily-card \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "date": "2025-06-24"}'
```

### 3. Probar Envío Masivo ⚠️ (CUIDADO)
```bash
curl -X POST http://localhost:3000/api/notifications/enhanced-daily-card \
  -H "Content-Type: application/json" \
  -d '{"action": "send_to_all_users", "date": "2025-06-24"}'
```

### 4. Interfaz de Testing
Visita: `http://localhost:3000/admin/daily-card-test`

## 📊 Monitoreo y Estadísticas

### Logs del Sistema
```bash
# Ver logs del cron job
tail -f /var/log/videntia-daily-cards.log

# Ver logs de Node.js
pm2 logs videntia-daily-cards
```

### Estadísticas de Base de Datos
```sql
-- Usuarios únicos con lecturas
SELECT COUNT(DISTINCT user_id) FROM user_daily_readings;

-- Lecturas generadas por fecha
SELECT date_for, COUNT(*) 
FROM user_daily_readings 
GROUP BY date_for 
ORDER BY date_for DESC;

-- Cartas más frecuentes
SELECT tc.name, COUNT(*) as frequency
FROM user_daily_readings udr
JOIN tarot_cards tc ON udr.card_id = tc.id
GROUP BY tc.name
ORDER BY frequency DESC;
```

## 🎯 Flujo de Usuario Completo

1. **10:00 AM** - Cron job ejecuta script automático
2. **10:01 AM** - Script llama a API de envío masivo
3. **10:02 AM** - API genera lectura única para cada usuario
4. **10:03 AM** - Email ambiguo enviado a cada usuario:
   ```
   ✨ Juan
   🃏 El Mago
   "Tu energía de hoy: El Mago. ¿Qué mensaje especial te espera?"
   
   [Botón: Descubrir mi mensaje →]
   ```
5. **Durante el día** - Usuario hace clic en email
6. **Usuario llega** a `/protected` para ver lectura completa
7. **Engagement logrado** ✅

## 🔧 Customización

### Agregar Más Cartas
```sql
-- Expandir a las 78 cartas completas
-- Usar: /database/complete-tarot-schema.sql
```

### Modificar Teasers de Email
```typescript
// En createSimpleTeaser()
const teasers = [
  'Tu energía de hoy: ${cardName}. ¿Qué mensaje especial te espera?',
  // Agregar más variaciones aquí...
];
```

### Cambiar Hora de Envío
```bash
# Cambiar de 10:00 AM a 9:00 AM
0 9 * * * cd /path/to/videntia && node scripts/daily-card-automation.js
```

## 🚨 Consideraciones de Producción

### Seguridad
- ✅ Validar API keys en endpoints de envío masivo
- ✅ Rate limiting para evitar spam
- ✅ Logs detallados para auditoría

### Escalabilidad
- ✅ Procesar envíos en lotes de 100 usuarios
- ✅ Queue system para envíos masivos (Redis + Bull)
- ✅ Separar envío de email de generación de lecturas

### Monitoreo
- ✅ Alertas si falla el envío diario
- ✅ Métricas de deliverability de emails
- ✅ Dashboard de engagement por carta

## 📈 Métricas de Éxito

### KPIs Principales
- **Email Open Rate**: > 25%
- **Click-through Rate**: > 8%
- **Daily Active Users**: Aumento del 15%
- **User Retention**: Mejora en usuarios que reciben emails

### A/B Testing Ideas
- Diferentes horas de envío (9 AM vs 10 AM vs 11 AM)
- Variaciones en subject lines
- Teasers más o menos ambiguos
- Frecuencia de envío (diario vs 3x semana)

---

**🎉 ¡Sistema listo para generar engagement diario y retener usuarios con lecturas místicas personalizadas!**
