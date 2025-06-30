import { NextRequest, NextResponse } from 'next/server';

/**
 * 🧪 TEST ENDPOINT - Sistema de Monetización LLM
 * Verifica que todo el pipeline funciona correctamente
 */

export async function GET(req: NextRequest) {
  const results = {
    timestamp: new Date().toISOString(),
    tests: [] as Array<{ name: string; status: 'PASS' | 'FAIL'; details?: string }>
  };

  // Test 1: Gemini AI API Key
  try {
    if (process.env.GEMINI_API_KEY) {
      results.tests.push({ name: 'Gemini API Key', status: 'PASS' });
    } else {
      results.tests.push({ name: 'Gemini API Key', status: 'FAIL', details: 'Missing GEMINI_API_KEY env var' });
    }
  } catch (error) {
    results.tests.push({ name: 'Gemini API Key', status: 'FAIL', details: 'Error checking API key' });
  }

  // Test 2: Question Analysis API
  try {
    const testQuestion = "¿Voy a viajar a Europa este año?";
    const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/analytics/question-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: testQuestion,
        guest_id: 'test_guest_123',
        session_id: 'test_session_456'
      })
    });

    if (analysisResponse.ok) {
      const analysisData = await analysisResponse.json();
      if (analysisData.success && analysisData.analysis) {
        results.tests.push({ 
          name: 'Question Analysis API', 
          status: 'PASS',
          details: `Category: ${analysisData.analysis.category}, Value: ${analysisData.analysis.commercial_value}`
        });
      } else {
        results.tests.push({ name: 'Question Analysis API', status: 'FAIL', details: 'Invalid response structure' });
      }
    } else {
      results.tests.push({ name: 'Question Analysis API', status: 'FAIL', details: `HTTP ${analysisResponse.status}` });
    }
  } catch (error) {
    results.tests.push({ name: 'Question Analysis API', status: 'FAIL', details: 'Network error' });
  }

  // Test 3: Premium Ad API
  try {
    const adResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/ads/premium-targeting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: 'travel',
        segments: ['travel_intent'],
        commercial_value: 8,
        estimated_cpm: 12,
        guest_id: 'test_guest_123'
      })
    });

    if (adResponse.ok) {
      const adData = await adResponse.json();
      if (adData.success && adData.title) {
        results.tests.push({ 
          name: 'Premium Ad API', 
          status: 'PASS',
          details: `Ad: ${adData.title}, CPM: $${adData.cpm_rate}`
        });
      } else {
        results.tests.push({ name: 'Premium Ad API', status: 'FAIL', details: 'Invalid ad response' });
      }
    } else {
      results.tests.push({ name: 'Premium Ad API', status: 'FAIL', details: `HTTP ${adResponse.status}` });
    }
  } catch (error) {
    results.tests.push({ name: 'Premium Ad API', status: 'FAIL', details: 'Network error' });
  }

  // Test 4: Database connectivity
  try {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_interest_profiles')
      .select('id')
      .limit(1);

    if (!error) {
      results.tests.push({ name: 'Database Connectivity', status: 'PASS' });
    } else {
      results.tests.push({ name: 'Database Connectivity', status: 'FAIL', details: error.message });
    }
  } catch (error) {
    results.tests.push({ name: 'Database Connectivity', status: 'FAIL', details: 'Import error' });
  }

  // Summary
  const totalTests = results.tests.length;
  const passedTests = results.tests.filter(t => t.status === 'PASS').length;
  const failedTests = totalTests - passedTests;

  return NextResponse.json({
    success: failedTests === 0,
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      score: `${passedTests}/${totalTests}`
    },
    message: failedTests === 0 
      ? '🎉 Sistema de Monetización LLM - TOTALMENTE FUNCIONAL'
      : '⚠️ Sistema parcialmente funcional - Revisar tests fallidos',
    results
  }, { 
    status: failedTests === 0 ? 200 : 500,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Also support POST for testing
export const POST = GET;
