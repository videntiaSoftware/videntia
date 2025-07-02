-- ============================================
-- TEST DIRECTO DE FUNCIONES SQL
-- ============================================
-- Ejecuta esto en Supabase SQL Editor para verificar que las funciones funcionan

-- 1. TEST calculate_commercial_value
SELECT 'TEST 1: Pregunta de viaje premium' AS test_name,
       calculate_commercial_value('travel', ARRAY['premium_intent', 'travel_intent', 'luxury'], 9.0) AS commercial_value;

SELECT 'TEST 2: Pregunta de dinero alta confianza' AS test_name,
       calculate_commercial_value('money', ARRAY['financial_planning', 'high_value'], 8.5) AS commercial_value;

SELECT 'TEST 3: Pregunta espiritual básica' AS test_name,
       calculate_commercial_value('spiritual', ARRAY['general_guidance'], 5.0) AS commercial_value;

-- 2. TEST get_user_ad_segments con usuario ficticio
SELECT 'TEST 4: Segmentos para usuario nuevo' AS test_name,
       get_user_ad_segments('test_guest_nuevo_' || extract(epoch from now())) AS segments;

-- 3. TEST completo del sistema
SELECT 'TEST 5: Sistema completo funcionando' AS test_name,
       test_monetization_system() AS full_test_result;

-- 4. Verificar que las funciones existen
SELECT 
    'VERIFICACION: Funciones existentes' AS info,
    COUNT(*) FILTER (WHERE proname = 'calculate_commercial_value') AS calculate_function_exists,
    COUNT(*) FILTER (WHERE proname = 'get_user_ad_segments') AS segments_function_exists,
    COUNT(*) FILTER (WHERE proname = 'test_monetization_system') AS test_function_exists
FROM pg_proc 
WHERE proname IN ('calculate_commercial_value', 'get_user_ad_segments', 'test_monetization_system');

-- 5. Verificar tabla premium_ad_performance
SELECT 
    'VERIFICACION: Tabla premium_ad_performance' AS info,
    COUNT(*) AS table_exists
FROM information_schema.tables 
WHERE table_name = 'premium_ad_performance';
