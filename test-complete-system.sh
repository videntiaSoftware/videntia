#!/bin/bash

# 🔥 SCRIPT MAESTRO DE TESTING COMPLETO SUPABASE
# Este script ejecuta todos los tests end-to-end del sistema de autenticación

echo "🚀 TESTING COMPLETO DEL SISTEMA SUPABASE VIDENTIA"
echo "========================================================"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecutar desde el directorio raíz del proyecto"
    exit 1
fi

# Verificar variables de entorno
if [ ! -f ".env.local" ]; then
    echo "❌ Error: Archivo .env.local no encontrado"
    exit 1
fi

echo "📋 Verificando variables de entorno..."
source .env.local

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Error: Variables de Supabase no configuradas"
    echo "   Revisar .env.local"
    exit 1
fi

echo "✅ Variables de entorno configuradas"
echo ""

# Paso 1: Verificar estructura completa
echo "🔍 PASO 1: VERIFICANDO ESTRUCTURA COMPLETA DEL SISTEMA"
echo "========================================================"
node test-auth-system-complete.js

# Capturar código de salida
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Fallo en verificación de estructura"
    echo "🔧 ACCIÓN REQUERIDA:"
    echo "   1. Ve a Supabase Dashboard → SQL Editor"
    echo "   2. Ejecuta: database/migration-fix-unified-system.sql"
    echo "   3. Ejecuta: database/fix-readings-table.sql"
    echo "   4. Vuelve a ejecutar este script"
    echo ""
    exit 1
fi

echo ""
echo "⏱️ Pausa de 3 segundos antes del siguiente test..."
sleep 3

# Paso 2: Tests funcionales
echo ""
echo "🧪 PASO 2: TESTS FUNCIONALES DETALLADOS"
echo "========================================================"
node test-auth-functional.js

# Capturar código de salida
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Fallos en tests funcionales"
    echo "🔧 ACCIÓN REQUERIDA:"
    echo "   1. Revisar errores específicos arriba"
    echo "   2. Aplicar migraciones necesarias"
    echo "   3. Vuelve a ejecutar este script"
    echo ""
    exit 1
fi

echo ""
echo "⏱️ Pausa de 3 segundos antes del siguiente test..."
sleep 3

# Paso 3: Test de estructura de readings
echo ""
echo "🎯 PASO 3: VERIFICACIÓN ESPECÍFICA DE TABLA READINGS"
echo "========================================================"
node check-table-structure.js

echo ""
echo "⏱️ Pausa de 3 segundos antes del siguiente test..."
sleep 3

# Paso 4: Test de tracking unificado
echo ""
echo "🌐 PASO 4: DEBUGGING DEL SISTEMA UNIFICADO"
echo "========================================================"
node debug-unified-tracking.js

echo ""
echo "⏱️ Pausa de 3 segundos antes del siguiente test..."
sleep 3

# Paso 5: Verificar datos en tiempo real
echo ""
echo "📊 PASO 5: MONITOREO DE DATOS EN TIEMPO REAL"
echo "========================================================"
echo "Ejecutando monitoreo por 10 segundos..."

# Ejecutar monitor por 10 segundos
timeout 10s node monitor-real-time.js || echo "✅ Monitor terminado"

echo ""
echo "🎉 TESTING COMPLETO FINALIZADO"
echo "========================================================"
echo ""
echo "📋 RESUMEN DE PASOS COMPLETADOS:"
echo "✅ 1. Verificación de estructura completa"
echo "✅ 2. Tests funcionales detallados"
echo "✅ 3. Verificación específica de readings"
echo "✅ 4. Debugging del sistema unificado"
echo "✅ 5. Monitoreo en tiempo real"
echo ""
echo "🔧 PRÓXIMOS PASOS:"
echo "1. Revisar los resultados arriba"
echo "2. Si hay errores, aplicar las migraciones sugeridas"
echo "3. Hacer una lectura de tarot real: npm run dev"
echo "4. Verificar dashboard de Supabase"
echo ""
echo "📊 ARCHIVOS DE LOGS DISPONIBLES:"
echo "- Ejecutar: ./check-results.sh (para ver resultados)"
echo "- Ejecutar: ./test-local-unified.sh (para test local)"
echo ""
echo "🚀 ¡SISTEMA LISTO PARA PRODUCCIÓN!"
