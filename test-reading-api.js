/**
 * SCRIPT PARA PROBAR DIRECTAMENTE EL ENDPOINT DE LECTURA
 * Y VER LOS LOGS EN TIEMPO REAL
 */

const testReadingAPI = async () => {
  console.log('🧪 PROBANDO ENDPOINT DE LECTURA...\n');

  const testData = {
    type: 'three_card',
    question: '¿Test de debugging del sistema unificado?',
    guest_id: 'test_debug_guest_123',
    fingerprintId: 'test_fingerprint_123',
    session_id: 'test_session_123',
    page_url: 'http://localhost:3000/test',
    is_returning_guest: false,
    visit_count: 1
  };

  try {
    const response = await fetch('http://localhost:3000/api/reading/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'test-debugging-script'
      },
      body: JSON.stringify(testData)
    });

    const responseData = await response.json();
    
    console.log('📊 RESPUESTA DEL ENDPOINT:');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);
    console.log('Data:', {
      cards: responseData.cards?.length || 0,
      interpretation: !!responseData.interpretation,
      type: responseData.type,
      question: responseData.question,
      tier: responseData.tier,
      questionAnalysis: !!responseData.questionAnalysis
    });

    if (!response.ok) {
      console.error('❌ ERROR EN LA RESPUESTA:', responseData);
    }

  } catch (error) {
    console.error('💥 ERROR DE CONEXIÓN:', error);
  }
};

// Ejecutar test
testReadingAPI();
