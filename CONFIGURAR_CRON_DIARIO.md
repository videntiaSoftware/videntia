# INSTRUCCIONES PARA CONFIGURAR ENVÍO AUTOMÁTICO DE CARTAS DIARIAS

## Opción 1: Cron Job con Vercel Cron (Recomendado)

### 1. Crear archivo vercel.json en la raíz del proyecto:
```json
{
  "crons": [
    {
      "path": "/api/notifications/simple-daily-cards",
      "schedule": "0 10 * * *"
    }
  ]
}
```

### 2. Subir a Vercel:
```bash
git add vercel.json
git commit -m "Add daily cards cron job"
git push
```

## Opción 2: Servicio Externo (EasyCron, cron-job.org)

### 1. Registrarte en https://cron-job.org (gratis)
### 2. Crear nuevo cron job:
- URL: https://videntia.vercel.app/api/notifications/simple-daily-cards
- Método: GET
- Horario: 0 10 * * * (10:00 AM diario)

## Opción 3: GitHub Actions (Gratis)

### 1. Crear archivo .github/workflows/daily-cards.yml:
```yaml
name: Send Daily Cards
on:
  schedule:
    - cron: '0 10 * * *'  # 10:00 AM UTC diario
  workflow_dispatch:  # Permite ejecutar manualmente

jobs:
  send-cards:
    runs-on: ubuntu-latest
    steps:
      - name: Send Daily Cards
        run: |
          curl -X GET "https://videntia.vercel.app/api/notifications/simple-daily-cards"
```

## Variables de Entorno en Vercel

### Configurar en dashboard.vercel.com > tu-proyecto > Settings > Environment Variables:

1. **SUPABASE_SERVICE_ROLE_KEY** (IMPORTANTE)
   - Ve a tu proyecto Supabase > Settings > API
   - Copia la "service_role" key (no la anon key)
   - Esta key permite acceso a todos los usuarios

2. **GMAIL_EMAIL** y **GMAIL_APP_PASSWORD**
   - Configura 2FA en tu Gmail
   - Ve a cuenta Google > Seguridad > Contraseñas de aplicaciones
   - Genera una nueva para "Videntia"

3. **NEXT_PUBLIC_SITE_URL**
   - https://videntia.vercel.app

## Prueba Manual

### Para probar el envío:
```bash
curl -X GET "https://videntia.vercel.app/api/notifications/simple-daily-cards"
```

## Monitoreo

### Ver logs en Vercel:
1. Ve a tu proyecto en Vercel
2. Functions tab
3. Busca la función `/api/notifications/simple-daily-cards`
4. Ve los logs de ejecución
