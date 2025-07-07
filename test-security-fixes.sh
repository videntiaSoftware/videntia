#!/bin/bash

# Script para verificar que las correcciones de seguridad funcionan
# Uso: ./test-security-fixes.sh [URL_BASE]

URL_BASE=${1:-"http://localhost:3000"}

echo "🔒 TESTING SECURITY FIXES - Videntia"
echo "====================================="
echo "Testing on: $URL_BASE"
echo ""

# Test 1: Verificar que las páginas SEO ya no redirijan automáticamente
echo "1. 🔍 Testing SEO pages (no auto-redirect):"
echo "-------------------------------------------"

SEO_PAGES=(
    "/seo/lecturas-tarot-amor"
    "/seo/lecturas-tarot-trabajo"
    "/seo/lecturas-tarot-dinero"
)

for page in "${SEO_PAGES[@]}"; do
    echo -n "Testing $page... "
    
    # Verificar que la página carga sin redirección automática
    response=$(curl -s -w "%{http_code}" -o /tmp/seo_test.html "$URL_BASE$page")
    
    if [[ $response == "200" ]]; then
        # Verificar que NO contiene redirección JavaScript
        if grep -q "window.location.replace" /tmp/seo_test.html; then
            echo "❌ STILL HAS AUTO-REDIRECT"
        else
            echo "✅ OK (no auto-redirect)"
        fi
    else
        echo "❌ HTTP $response"
    fi
done

echo ""

# Test 2: Verificar robots.txt
echo "2. 🤖 Testing robots.txt:"
echo "------------------------"
echo -n "Fetching robots.txt... "

robots_response=$(curl -s -w "%{http_code}" -o /tmp/robots.txt "$URL_BASE/robots.txt")

if [[ $robots_response == "200" ]]; then
    echo "✅ OK"
    
    # Verificar que no hay cloaking (reglas diferentes para Googlebot)
    if grep -q "Googlebot" /tmp/robots.txt; then
        echo "⚠️  WARNING: Contains Googlebot-specific rules (potential cloaking)"
        echo "    Check if this is intentional..."
    else
        echo "✅ No cloaking detected"
    fi
    
    # Mostrar contenido relevante
    echo "Content preview:"
    head -10 /tmp/robots.txt | sed 's/^/    /'
else
    echo "❌ HTTP $robots_response"
fi

echo ""

# Test 3: Verificar headers de seguridad
echo "3. 🛡️  Testing security headers:"
echo "--------------------------------"

headers_to_check=(
    "X-Frame-Options"
    "X-Content-Type-Options"
    "Content-Security-Policy"
    "X-XSS-Protection"
)

for header in "${headers_to_check[@]}"; do
    echo -n "Checking $header... "
    
    header_value=$(curl -s -I "$URL_BASE/" | grep -i "$header:" | cut -d' ' -f2- | tr -d '\r')
    
    if [[ -n "$header_value" ]]; then
        echo "✅ Present: $header_value"
    else
        echo "❌ Missing"
    fi
done

echo ""

# Test 4: Verificar que no hay script maliciosos
echo "4. 📝 Testing for malicious scripts:"
echo "-----------------------------------"

echo -n "Checking main page for unsafe scripts... "

# Buscar patrones sospechosos
suspicious_patterns=(
    "eval("
    "Function("
    "window.location.replace"
    "document.write"
)

main_page_content=$(curl -s "$URL_BASE/")
suspicious_found=false

for pattern in "${suspicious_patterns[@]}"; do
    if echo "$main_page_content" | grep -q "$pattern"; then
        echo "⚠️  Found: $pattern"
        suspicious_found=true
    fi
done

if [[ $suspicious_found == false ]]; then
    echo "✅ No suspicious patterns found"
fi

echo ""

# Test 5: Verificar CSP
echo "5. 🔐 Testing Content Security Policy:"
echo "------------------------------------"

csp_header=$(curl -s -I "$URL_BASE/" | grep -i "content-security-policy:" | cut -d' ' -f2- | tr -d '\r')

if [[ -n "$csp_header" ]]; then
    echo "✅ CSP Present"
    
    # Verificar que no permite unsafe-eval
    if echo "$csp_header" | grep -q "unsafe-eval"; then
        echo "⚠️  WARNING: CSP allows 'unsafe-eval'"
    else
        echo "✅ CSP does not allow 'unsafe-eval'"
    fi
    
    # Verificar que permite solo dominios seguros
    echo "CSP preview:"
    echo "$csp_header" | sed 's/;/;\n/g' | head -5 | sed 's/^/    /'
else
    echo "❌ CSP Missing"
fi

echo ""

# Cleanup
rm -f /tmp/seo_test.html /tmp/robots.txt

echo "🎯 SUMMARY:"
echo "==========="
echo "✅ All tests completed"
echo "📋 Review any warnings above"
echo "🚀 Ready for Google Search Console review request"
echo ""
echo "💡 Next steps:"
echo "   1. Deploy these changes to production"
echo "   2. Test on production URL"
echo "   3. Request review in Google Search Console"
echo "   4. Monitor for 24-48 hours"
