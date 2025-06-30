#!/bin/bash

# Script para envío automático de cartas diarias a las 10 AM
# Usar con cron job: 0 10 * * * /path/to/send-daily-cards.sh

echo "🌅 Iniciando envío diario de cartas del tarot - $(date)"

# URL de tu aplicación (cambiar por la URL real)
API_URL="https://videntia.vercel.app/api/notifications/simple-daily-cards"

# Enviar petición GET para disparar el envío masivo
response=$(curl -s -X GET "$API_URL" \
  -H "Content-Type: application/json" \
  -w "HTTP_STATUS:%{http_code}")

# Extraer código de estado HTTP
http_code=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')

echo "📊 Respuesta HTTP: $http_code"
echo "📝 Respuesta: $body"

if [ "$http_code" -eq 200 ]; then
    echo "✅ Envío diario completado exitosamente"
else
    echo "❌ Error en el envío diario"
fi

echo "🏁 Proceso finalizado - $(date)"
