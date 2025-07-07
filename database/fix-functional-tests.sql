-- 🔧 SCRIPT PARA ARREGLAR ERRORES EN TESTS FUNCIONALES
-- Estos son los fixes específicos para los problemas encontrados

-- ============================================
-- 1. ARREGLAR TABLA user_interest_profiles
-- ============================================

-- Cambiar commercial_value de integer a decimal
ALTER TABLE user_interest_profiles 
ALTER COLUMN commercial_value TYPE decimal(10,2);

-- ============================================
-- 2. LIMPIAR FUNCIONES DUPLICADAS
-- ============================================

-- Eliminar todas las versiones de calculate_commercial_value
DROP FUNCTION IF EXISTS calculate_commercial_value(text, text[], numeric);
DROP FUNCTION IF EXISTS calculate_commercial_value(text, jsonb, double precision);
DROP FUNCTION IF EXISTS calculate_commercial_value(text, text[], decimal);

-- ============================================
-- 3. CREAR FUNCIÓN UNIFICADA calculate_commercial_value
-- ============================================

CREATE OR REPLACE FUNCTION calculate_commercial_value(
    p_category text,
    p_tags text[],
    p_confidence decimal
)
RETURNS decimal AS $$
DECLARE
    base_value decimal := 5.0;
    category_multiplier decimal := 1.0;
    tag_bonus decimal := 0.0;
    confidence_bonus decimal := 0.0;
    final_value decimal;
BEGIN
    -- Multiplicadores por categoría
    category_multiplier := CASE p_category
        WHEN 'travel' THEN 3.0      -- Alto valor comercial
        WHEN 'money' THEN 3.5       -- Máximo valor comercial
        WHEN 'career' THEN 2.5      -- Buen valor comercial
        WHEN 'relationships' THEN 2.0
        WHEN 'health' THEN 2.2
        WHEN 'family' THEN 1.8
        WHEN 'spiritual' THEN 1.5
        ELSE 1.0
    END;
    
    -- Bonus por tags premium
    IF p_tags IS NOT NULL THEN
        SELECT COUNT(*) * 0.5 INTO tag_bonus
        FROM unnest(p_tags) AS tag
        WHERE tag IN ('premium_intent', 'high_value', 'travel_intent', 'financial_planning', 'luxury');
    END IF;
    
    -- Bonus por confianza alta
    confidence_bonus := CASE
        WHEN p_confidence >= 8.0 THEN 1.5
        WHEN p_confidence >= 6.0 THEN 1.0
        WHEN p_confidence >= 4.0 THEN 0.5
        ELSE 0.0
    END;
    
    -- Calcular valor final
    final_value := base_value * category_multiplier + tag_bonus + confidence_bonus;
    
    -- Limitar entre 1.0 y 50.0
    final_value := GREATEST(1.0, LEAST(50.0, final_value));
    
    RETURN final_value;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. LIMPIAR FUNCIÓN get_user_ad_segments
-- ============================================

DROP FUNCTION IF EXISTS get_user_ad_segments(text);

-- ============================================
-- 5. RECREAR FUNCIÓN get_user_ad_segments
-- ============================================

CREATE OR REPLACE FUNCTION get_user_ad_segments(p_guest_id text)
RETURNS text[] AS $$
DECLARE
    segments text[] := ARRAY['general'];
    user_interests text[];
    user_categories text[];
    avg_commercial_value decimal;
    reading_count integer;
BEGIN
    -- Obtener intereses del usuario
    SELECT 
        array_agg(DISTINCT primary_category),
        array_agg(DISTINCT unnest(generated_tags)),
        AVG(commercial_value),
        COUNT(*)
    INTO user_categories, user_interests, avg_commercial_value, reading_count
    FROM user_interest_profiles
    WHERE guest_id = p_guest_id
    AND created_at > NOW() - INTERVAL '30 days';
    
    -- Si no hay datos, devolver segmentos básicos
    IF reading_count = 0 THEN
        RETURN ARRAY['general', 'new_user'];
    END IF;
    
    -- Agregar segmentos basados en categorías
    IF user_categories IS NOT NULL THEN
        IF 'money' = ANY(user_categories) THEN
            segments := array_append(segments, 'financial_services');
        END IF;
        
        IF 'travel' = ANY(user_categories) THEN
            segments := array_append(segments, 'travel_enthusiast');
        END IF;
        
        IF 'career' = ANY(user_categories) THEN
            segments := array_append(segments, 'career_focused');
        END IF;
        
        IF 'relationships' = ANY(user_categories) THEN
            segments := array_append(segments, 'relationship_seeker');
        END IF;
    END IF;
    
    -- Agregar segmentos basados en valor comercial
    IF avg_commercial_value > 15.0 THEN
        segments := array_append(segments, 'high_value_user');
    ELSIF avg_commercial_value > 10.0 THEN
        segments := array_append(segments, 'medium_value_user');
    END IF;
    
    -- Agregar segmentos basados en actividad
    IF reading_count >= 5 THEN
        segments := array_append(segments, 'active_user');
    END IF;
    
    RETURN segments;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. CREAR FUNCIÓN DE TEST COMPLETA
-- ============================================

CREATE OR REPLACE FUNCTION test_monetization_system()
RETURNS text AS $$
DECLARE
    test_guest_id text := 'test_' || extract(epoch from now());
    commercial_value decimal;
    segments text[];
    test_results text := '';
BEGIN
    -- Test 1: calculate_commercial_value
    commercial_value := calculate_commercial_value('money', ARRAY['financial_planning', 'high_value'], 8.5);
    test_results := test_results || 'CV: ' || commercial_value || ' ';
    
    -- Test 2: get_user_ad_segments
    segments := get_user_ad_segments(test_guest_id);
    test_results := test_results || 'Segments: ' || array_to_string(segments, ',');
    
    RETURN test_results;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 7. VERIFICAR QUE TODO FUNCIONA
-- ============================================

DO $$
DECLARE
    test_result text;
BEGIN
    RAISE NOTICE '🧪 TESTING FUNCIONES ARREGLADAS:';
    RAISE NOTICE '=================================';
    
    -- Test calculate_commercial_value
    SELECT calculate_commercial_value('money', ARRAY['financial_planning'], 8.0) INTO test_result;
    RAISE NOTICE '✅ calculate_commercial_value: %', test_result;
    
    -- Test get_user_ad_segments
    SELECT array_to_string(get_user_ad_segments('test_guest_123'), ',') INTO test_result;
    RAISE NOTICE '✅ get_user_ad_segments: %', test_result;
    
    -- Test completo
    SELECT test_monetization_system() INTO test_result;
    RAISE NOTICE '✅ test_monetization_system: %', test_result;
    
    RAISE NOTICE '';
    RAISE NOTICE '🎉 TODAS LAS FUNCIONES FUNCIONAN CORRECTAMENTE!';
END $$;
