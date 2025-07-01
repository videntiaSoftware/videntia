#!/bin/bash
# filepath: /home/fedeblau/videntia/verify-after-reading.sh
# Script para verificar datos después de hacer una lectura

echo "🔍 VERIFICACIÓN POST-LECTURA"
echo "============================"
echo ""
echo "Ejecutando verificación de datos en Supabase..."
echo ""

# Ejecutar el script de debugging
node debug-unified-tracking.js

echo ""
echo "✅ Verificación completada"
echo ""
echo "📊 Resumen:"
echo "- Si ves datos nuevos en las tablas, el sistema funciona ✅"
echo "- Si las tablas siguen vacías, hay un problema ❌"
echo "- Revisa los logs de Vercel para ver errores específicos"
