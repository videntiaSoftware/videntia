#!/bin/bash

# Script para testear que todas las rutas públicas estén disponibles
# Uso: ./test-public-routes.sh [URL_BASE]
# Ejemplo: ./test-public-routes.sh https://tu-dominio.vercel.app

URL_BASE=${1:-"http://localhost:3000"}

echo "🧪 Testeando rutas públicas en: $URL_BASE"
echo "================================================"

# Rutas críticas para SEO y funcionamiento
CRITICAL_ROUTES=(
    "/sitemap.xml"
    "/robots.txt"
    "/favicon.ico"
    "/manifest.json"
)

# Rutas de contenido público
PUBLIC_ROUTES=(
    "/"
    "/blog"
    "/faq"
    "/guias"
    "/politica-privacidad"
    "/terminos-condiciones"
    "/contacto"
    "/cartas"
    "/lecturas"
    "/premium"
    "/consulta-tarot-gratis"
    "/lectura-tarot-amor-gratis"
    "/tarot-del-si-o-no"
    "/tarot-gitano-gratis"
    "/tirada-3-cartas-gratis"
    "/tirada-cartas-amor-gratis"
    "/videncia-online-gratis"
    "/horoscopo-diario-gratis"
    "/numerologia-gratis"
    "/seo"
)

# APIs públicas
API_ROUTES=(
    "/api/reading/generate"
    "/api/analytics"
    "/api/guest"
    "/api/ads"
    "/api/notifications"
)

test_route() {
    local route=$1
    local route_type=$2
    
    echo -n "Testing $route... "
    
    # Hacer request con curl
    response=$(curl -s -w "%{http_code}" -o /dev/null "$URL_BASE$route")
    
    if [[ $response == "200" ]]; then
        echo "✅ OK ($response)"
    elif [[ $response == "301" || $response == "302" ]]; then
        # Verificar si es un redirect a login (BAD) o otro redirect válido (OK)
        redirect_location=$(curl -s -I "$URL_BASE$route" | grep -i "location:" | cut -d' ' -f2 | tr -d '\r')
        if [[ $redirect_location == *"/auth/login"* ]]; then
            echo "❌ REDIRECTED TO LOGIN ($response) - MIDDLEWARE INTERCEPTING!"
        else
            echo "⚠️  REDIRECT ($response) to: $redirect_location"
        fi
    elif [[ $response == "404" ]]; then
        if [[ $route_type == "critical" ]]; then
            echo "❌ NOT FOUND ($response) - CRITICAL ERROR!"
        else
            echo "⚠️  NOT FOUND ($response) - might not be implemented"
        fi
    else
        echo "❌ ERROR ($response)"
    fi
}

echo ""
echo "🔥 RUTAS CRÍTICAS (deben funcionar SÍ O SÍ):"
echo "----------------------------------------"
for route in "${CRITICAL_ROUTES[@]}"; do
    test_route "$route" "critical"
done

echo ""
echo "📄 RUTAS DE CONTENIDO PÚBLICO:"
echo "----------------------------"
for route in "${PUBLIC_ROUTES[@]}"; do
    test_route "$route" "public"
done

echo ""
echo "🔌 APIs PÚBLICAS:"
echo "---------------"
for route in "${API_ROUTES[@]}"; do
    test_route "$route" "api"
done

echo ""
echo "================================================"
echo "✅ = Funciona correctamente"
echo "⚠️  = Warning (revisar si es esperado)"
echo "❌ = Error crítico (ARREGLAR INMEDIATAMENTE)"
echo ""
echo "🚀 Para testear en producción:"
echo "   ./test-public-routes.sh https://tu-dominio.vercel.app"
