#!/bin/bash

# Script rápido para verificar las rutas críticas de SEO
# Esto debe funcionar SÍ O SÍ para Google

URL_BASE=${1:-"http://localhost:3000"}

echo "🔍 Testing critical SEO routes on: $URL_BASE"
echo "=============================================="

test_critical() {
    local route=$1
    echo -n "🚨 $route: "
    
    response=$(curl -s -w "%{http_code}" -o /dev/null "$URL_BASE$route")
    
    if [[ $response == "200" ]]; then
        echo "✅ OK"
    else
        echo "❌ FAILED ($response)"
        
        # Si falla, mostrar el redirect si hay uno
        if [[ $response == "301" || $response == "302" ]]; then
            redirect=$(curl -s -I "$URL_BASE$route" | grep -i "location:" | cut -d' ' -f2 | tr -d '\r')
            echo "   → Redirects to: $redirect"
        fi
        
        # Si es 404, verificar si el archivo existe
        if [[ $response == "404" ]]; then
            echo "   ⚠️  Route not found - check if implemented"
        fi
    fi
}

echo ""
test_critical "/sitemap.xml"
test_critical "/robots.txt"
test_critical "/favicon.ico"
test_critical "/"

echo ""
echo "🔗 Quick verification URLs:"
echo "   $URL_BASE/sitemap.xml"
echo "   $URL_BASE/robots.txt"
echo ""
echo "💡 If any show ❌, your SEO is BROKEN and Google can't index!"
