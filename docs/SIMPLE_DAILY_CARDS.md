# Sistema Simple de Cartas Diarias - Videntia

## 🎯 Objetivo
Enviar automáticamente cada día a las 10 AM un email a TODOS los usuarios registrados con:
- Una carta del tarot elegida al azar
- Una interpretación predefinida elegida al azar para esa carta
- Un mensaje que los motive a entrar a la página

## 📋 Setup Rápido

### 1. Ejecutar Script SQL en Supabase
```sql
-- Copiar y pegar database/simple-setup.sql en Supabase SQL Editor
-- Esto crea:
-- ✅ tabla tarot_cards (5 cartas)
-- ✅ tabla card_interpretations (3 interpretaciones por carta) 
-- ✅ función get_random_daily_reading()
```

### 2. Probar el Sistema
```bash
# Disparar envío masivo manualmente (igual que cron job)
curl https://tu-app.vercel.app/api/notifications/simple-daily-cards

# El POST aún funciona para compatibilidad
curl -X POST https://tu-app.vercel.app/api/notifications/simple-daily-cards
```

### 3. Automatización Diaria
```bash
# Configurar cron job para envío a las 10 AM
crontab -e

# Agregar esta línea:
0 10 * * * /path/to/scripts/send-daily-cards.sh
```

## 🏗️ Estructura Simple

```
📊 Base de Datos:
├── tarot_cards (5 cartas básicas)
├── card_interpretations (15 interpretaciones total)
└── función get_random_daily_reading()

🔄 Flujo Diario:
1. Cron job dispara a las 10 AM
2. API obtiene todos los usuarios de Supabase Auth
3. Para cada usuario:
   - Obtiene carta + interpretación aleatoria
   - Envía email personalizado
4. Log de resultados

📧 Email Simple:
- Asunto: "Tu carta del día - Videntia"
- Contenido: Carta + interpretación corta
- CTA: "Ver lectura completa en Videntia"
```

## 🚀 Siguiente Pasos

1. **Ejecutar** `database/simple-setup.sql` en Supabase
2. **Probar** el endpoint `/api/notifications/simple-daily-cards`
3. **Configurar** servicio de email real (Resend/SendGrid)
4. **Activar** cron job para envío automático
5. **Expandir** con más cartas e interpretaciones

## 🔧 Configuración Cron

```bash
# Editar crontab
crontab -e

# Envío diario a las 10:00 AM
0 10 * * * /home/fedeblau/videntia/scripts/send-daily-cards.sh

# Ver cron jobs activos
crontab -l
```

¡Listo! Sistema simple y efectivo para envío masivo de cartas diarias.
