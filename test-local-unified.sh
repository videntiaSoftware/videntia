#!/bin/bash
# filepath: /home/fedeblau/videntia/test-local-unified.sh
# Script para testing completo del sistema unificado en local

echo "🚀 TESTING LOCAL DEL SISTEMA UNIFICADO"
echo "======================================"
echo ""

# Verificar que el servidor no esté corriendo
if lsof -i:3000 >/dev/null 2>&1; then
    echo "⚠️  Servidor ya corriendo en puerto 3000, deteniéndolo..."
    pkill -f "next dev"
    sleep 2
fi

echo "📋 PLAN DE TESTING:"
echo "1. ✅ Variable SKIP_RECAPTCHA=true configurada"
echo "2. 🚀 Iniciar servidor local"
echo "3. 🔍 Verificar estado inicial de Supabase"
echo "4. 🎯 Hacer lectura de prueba"
echo "5. 📊 Verificar datos guardados"
echo ""

# 1. Verificar estado inicial
echo "🔍 PASO 1: Verificando estado inicial de Supabase..."
node debug-unified-tracking.js | tail -20
echo ""

# 2. Iniciar servidor
echo "🚀 PASO 2: Iniciando servidor local con logs detallados..."
echo "   ➜ Accede a: http://localhost:3000"
echo "   ➜ Haz una lectura como GUEST con pregunta"
echo "   ➜ Observa los logs aquí abajo 👇"
echo ""
echo "🔥 LOGS EN TIEMPO REAL:"
echo "====================="

# Iniciar servidor y mostrar solo logs relevantes
npm run dev 2>&1 | grep -E "(UNIFIED_TRACKING|READINGS_TABLE|API_READING|reCAPTCHA|Error|error)"
