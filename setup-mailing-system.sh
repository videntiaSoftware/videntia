#!/bin/bash

# Script para configurar el sistema de mailing diario en Supabase
# Ejecuta este script para crear las funciones y tablas faltantes

echo "🚀 CONFIGURANDO SISTEMA DE MAILING DIARIO - VIDENTIA"
echo "===================================================="

# Verificar que existe el archivo SQL
if [ ! -f "database/create-mailing-system.sql" ]; then
    echo "❌ Error: No se encontró el archivo database/create-mailing-system.sql"
    exit 1
fi

echo ""
echo "📋 PASOS PARA CONFIGURAR:"
echo ""
echo "1. 🔐 Ve a tu proyecto Supabase:"
echo "   https://app.supabase.com/project/YOUR_PROJECT_ID"
echo ""
echo "2. 📝 Abre el SQL Editor:"
echo "   - Click en 'SQL Editor' en el menú lateral"
echo "   - Click en 'New query'"
echo ""
echo "3. 📋 Copia y pega el contenido completo del archivo:"
echo "   database/create-mailing-system.sql"
echo ""
echo "4. ▶️ Ejecuta el script:"
echo "   - Click en 'Run' (o Ctrl+Enter)"
echo ""
echo "5. ✅ Verifica que se ejecutó correctamente:"
echo "   - Deberías ver mensajes de '✅ SISTEMA DE MAILING DIARIO CREADO EXITOSAMENTE'"
echo ""

# Mostrar contenido del archivo para copiar
echo "📄 CONTENIDO DEL ARCHIVO SQL:"
echo "============================="
echo ""
cat database/create-mailing-system.sql
echo ""
echo "============================="

echo ""
echo "🧪 DESPUÉS DE EJECUTAR EL SQL, PRUEBA EL SISTEMA:"
echo ""
echo "1. 🔍 Verifica las funciones en Supabase:"
echo "   SELECT * FROM get_users_pending_daily_email();"
echo ""
echo "2. 📊 Verifica las estadísticas:"
echo "   SELECT * FROM get_daily_email_stats();"
echo ""
echo "3. 🌐 Prueba el endpoint API:"
echo "   curl -X GET \"https://tu-dominio.vercel.app/api/notifications/simple-daily-cards\""
echo ""
echo "🎯 CONFIGURACIÓN ADICIONAL NECESARIA:"
echo ""
echo "📧 Variables de entorno en Vercel:"
echo "   - SUPABASE_SERVICE_ROLE_KEY (obligatoria)"
echo "   - GMAIL_EMAIL (para envío de emails)"
echo "   - GMAIL_APP_PASSWORD (para autenticación Gmail)"
echo ""
echo "🔧 Para configurar Gmail:"
echo "   1. Activa 2FA en tu cuenta Gmail"
echo "   2. Ve a Contraseñas de aplicaciones"
echo "   3. Genera una contraseña para 'Videntia'"
echo "   4. Usa esa contraseña en GMAIL_APP_PASSWORD"
echo ""
echo "✅ ¡Una vez configurado, el sistema enviará emails a usuarios reales!"
