#!/bin/bash
# filepath: /home/fedeblau/videntia/monitor-logs.sh
# Script para monitorear logs en tiempo real durante las pruebas

echo "🔥 MONITOR DE LOGS - SISTEMA UNIFICADO"
echo "======================================"
echo ""
echo "📋 Instrucciones:"
echo "1. Ejecuta este script ANTES de hacer la lectura en el sitio web"
echo "2. Ve a tu sitio desplegado y haz una lectura como guest"
echo "3. Observa los logs aquí en tiempo real"
echo "4. Presiona Ctrl+C para parar el monitoreo"
echo ""
echo "🚀 Iniciando monitoreo..."
echo ""

# Si estás usando Vercel, usa esto:
if command -v vercel &> /dev/null; then
    echo "📡 Monitoreando logs de Vercel..."
    vercel logs --follow
else
    echo "⚠️  No se encontró CLI de Vercel"
    echo "💡 Alternativas:"
    echo "   1. Ve a Vercel Dashboard → Tu proyecto → Functions → Logs"
    echo "   2. O usa: npx vercel logs --follow"
    echo "   3. O ejecuta: npm run dev (si quieres probar localmente sin reCAPTCHA)"
fi
