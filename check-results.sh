#!/bin/bash
# filepath: /home/fedeblau/videntia/check-results.sh
# Script simple para verificar resultados después de la lectura

echo ""
echo "🔍 VERIFICANDO RESULTADOS DESPUÉS DE LA LECTURA..."
echo "================================================="
echo ""

echo "📊 Estado actual de las tablas:"
node debug-unified-tracking.js

echo ""
echo "🎯 RESUMEN:"
echo "- Si ves datos nuevos = ✅ Sistema funcionando"
echo "- Si las tablas siguen igual = ❌ Hay un problema"
echo ""
echo "💡 Si hay problemas, revisa los logs del servidor para ver errores específicos"
