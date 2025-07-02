// Script para probar el sistema de tracking en el navegador
// Se ejecuta en la consola del navegador para simular actividad de usuario

console.log('🚀 Iniciando pruebas de tracking...');

// 1. Verificar que AnalyticsProvider está cargado
if (window.gtag) {
    console.log('✅ Google Analytics detectado');
} else {
    console.log('❌ Google Analytics no detectado');
}

// 2. Simular eventos de página
console.log('📄 Simulando page_view...');
fetch('/api/analytics/advanced-tracking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        event_type: 'page_view',
        page_url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
    })
}).then(r => r.json()).then(data => {
    console.log('📄 Page view response:', data);
}).catch(err => {
    console.error('❌ Page view error:', err);
});

// 3. Simular geolocalización
console.log('🌍 Solicitando geolocalización...');
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('📍 Geolocalización obtenida:', position.coords);
            fetch('/api/analytics/advanced-tracking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_type: 'geolocation',
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                })
            }).then(r => r.json()).then(data => {
                console.log('📍 Geolocation response:', data);
            }).catch(err => {
                console.error('❌ Geolocation error:', err);
            });
        },
        (error) => {
            console.log('❌ Error de geolocalización:', error.message);
        }
    );
} else {
    console.log('❌ Geolocalización no soportada');
}

// 4. Simular comportamiento de usuario
console.log('👆 Simulando click...');
setTimeout(() => {
    fetch('/api/analytics/advanced-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event_type: 'user_interaction',
            interaction_type: 'click',
            element_type: 'button',
            element_text: 'Test Button',
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        })
    }).then(r => r.json()).then(data => {
        console.log('👆 Click response:', data);
    }).catch(err => {
        console.error('❌ Click error:', err);
    });
}, 1000);

// 5. Simular tiempo en página
console.log('⏱️ Simulando tiempo en página...');
setTimeout(() => {
    fetch('/api/analytics/advanced-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event_type: 'time_on_page',
            duration: 30,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        })
    }).then(r => r.json()).then(data => {
        console.log('⏱️ Time on page response:', data);
    }).catch(err => {
        console.error('❌ Time on page error:', err);
    });
}, 2000);

console.log('✅ Pruebas iniciadas. Verifica las respuestas en la consola.');
