#!/bin/bash

# 🃏 Script de instalación del Sistema de Cartas Diarias - Videntia
# Ejecutar: bash setup-daily-cards.sh

echo "🃏 VIDENTIA - Configuración del Sistema de Cartas Diarias"
echo "======================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Este script debe ejecutarse desde la raíz del proyecto Videntia"
    exit 1
fi

print_step "Verificando estructura del proyecto..."

# Verificar archivos clave
required_files=(
    "database/quick-setup.sql"
    "app/api/notifications/enhanced-daily-card/route.ts"
    "app/admin/daily-card-test/page.tsx"
    "scripts/daily-card-automation.js"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Encontrado: $file"
    else
        print_error "Falta archivo: $file"
        exit 1
    fi
done

echo ""
print_step "Configurando permisos de ejecución..."

# Hacer ejecutable el script de automatización
chmod +x scripts/daily-card-automation.js
print_success "Script de automatización configurado"

echo ""
print_step "Verificando dependencias de Node.js..."

# Verificar que node-fetch esté disponible para el script de cron
if npm list node-fetch &>/dev/null; then
    print_success "node-fetch ya está instalado"
else
    print_warning "Instalando node-fetch para el script de automatización..."
    npm install node-fetch
fi

echo ""
print_step "Verificando variables de entorno..."

# Verificar .env.local
if [ ! -f ".env.local" ]; then
    print_warning "Creando archivo .env.local de ejemplo..."
    cat > .env.local << EOF
# Variables para el sistema de cartas diarias
NEXT_PUBLIC_SITE_URL=http://localhost:3000
VIDENTIA_CRON_API_KEY=tu-api-key-segura-aqui
RESEND_API_KEY=tu-resend-api-key-aqui
EOF
    print_success "Archivo .env.local creado"
    print_warning "⚠️  IMPORTANTE: Configura las variables de entorno en .env.local"
else
    print_success ".env.local existe"
fi

echo ""
print_step "Instrucciones de configuración de base de datos..."

echo ""
echo "🏗️  CONFIGURACIÓN DE BASE DE DATOS:"
echo "   1. Ve a tu proyecto en Supabase"
echo "   2. Abre el SQL Editor"
echo "   3. Copia y pega todo el contenido de: database/quick-setup.sql"
echo "   4. Ejecuta el script"
echo ""

echo "🔍 VERIFICACIÓN DE BD:"
echo "   - SELECT COUNT(*) FROM tarot_cards; (debe retornar 5)"
echo "   - SELECT COUNT(*) FROM card_interpretations; (debe retornar 5+)"
echo "   - SELECT COUNT(*) FROM message_templates; (debe retornar 16+)"
echo ""

print_step "Configuración de cron job..."

echo ""
echo "⏰ CONFIGURACIÓN DE ENVÍO AUTOMÁTICO DIARIO:"
echo "   1. Editar crontab: crontab -e"
echo "   2. Agregar línea:"
echo "      0 10 * * * cd $(pwd) && node scripts/daily-card-automation.js >> /var/log/videntia-daily-cards.log 2>&1"
echo "   3. Guardar y salir"
echo ""

print_step "URLs importantes..."

echo ""
echo "🌐 URLS DE TESTING:"
echo "   • Panel de pruebas: http://localhost:3000/admin/daily-card-test"
echo "   • API de lectura: http://localhost:3000/api/notifications/enhanced-daily-card"
echo "   • Página protegida: http://localhost:3000/protected"
echo ""

print_step "Comandos de testing..."

echo ""
echo "🧪 COMANDOS DE PRUEBA:"
echo ""
echo "# Probar lectura individual:"
echo "curl \"http://localhost:3000/api/notifications/enhanced-daily-card?test_email=test@example.com\""
echo ""
echo "# Probar envío de email:"
echo "curl -X POST http://localhost:3000/api/notifications/enhanced-daily-card \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\": \"test@example.com\"}'"
echo ""
echo "# ⚠️  Probar envío masivo (CUIDADO - envía a TODOS los usuarios):"
echo "curl -X POST http://localhost:3000/api/notifications/enhanced-daily-card \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"action\": \"send_to_all_users\"}'"
echo ""

print_step "Configuración de servicio de email..."

echo ""
echo "📧 SERVICIOS DE EMAIL RECOMENDADOS:"
echo ""
echo "OPCIÓN A - Resend (Recomendado):"
echo "  npm install resend"
echo "  RESEND_API_KEY=re_xxxxxxxxx"
echo ""
echo "OPCIÓN B - SendGrid:"
echo "  npm install @sendgrid/mail"
echo "  SENDGRID_API_KEY=SG.xxxxxxxxx"
echo ""

print_step "Siguiente pasos..."

echo ""
echo "📋 TODO LIST:"
echo "   [ ] 1. Configurar base de datos (ejecutar quick-setup.sql)"
echo "   [ ] 2. Configurar variables de entorno (.env.local)"
echo "   [ ] 3. Instalar servicio de email (Resend/SendGrid)"
echo "   [ ] 4. Probar con panel de testing"
echo "   [ ] 5. Configurar cron job para envío diario"
echo "   [ ] 6. Expandir base de datos con 78 cartas completas"
echo ""

print_success "🎉 Configuración inicial completada!"
print_warning "⚠️  Recuerda configurar la base de datos y las variables de entorno"

echo ""
echo "📚 Para más información, consulta: docs/DAILY_CARD_SYSTEM.md"
echo ""
