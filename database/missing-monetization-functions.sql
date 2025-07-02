-- ============================================
-- FUNCIONES FALTANTES PARA SISTEMA DE MONETIZACIÓN LLM
-- ============================================
-- Estas funciones son requeridas por el sistema de análisis de preguntas
-- y generación de tags comerciales para Google Ads

-- ============================================
-- 1. FUNCIÓN PARA CALCULAR VALOR COMERCIAL
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
    
    -- Limitar entre 1 y 15
    final_value := GREATEST(1.0, LEAST(15.0, final_value));
    
    RETURN ROUND(final_value, 1);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. FUNCIÓN PARA OBTENER SEGMENTOS DE ADS
-- ============================================
CREATE OR REPLACE FUNCTION get_user_ad_segments(p_guest_id text)
RETURNS text[] AS $$
DECLARE
    segments text[] := ARRAY['general'];
    user_categories text[];
    avg_commercial_value decimal;
    total_questions integer;
BEGIN
    -- Obtener datos del usuario
    SELECT 
        array_agg(DISTINCT primary_category),
        AVG(commercial_value),
        COUNT(*)
    INTO user_categories, avg_commercial_value, total_questions
    FROM user_interest_profiles
    WHERE guest_id = p_guest_id
    AND created_at >= now() - interval '30 days';
    
    -- Si no hay datos, retornar segmento general
    IF user_categories IS NULL OR array_length(user_categories, 1) = 0 THEN
        RETURN ARRAY['general', 'new_user'];
    END IF;
    
    -- Segmentos base por categoría
    IF 'travel' = ANY(user_categories) THEN
        segments := array_append(segments, 'travel_intent');
        IF avg_commercial_value >= 8.0 THEN
            segments := array_append(segments, 'premium_travel');
        END IF;
    END IF;
    
    IF 'money' = ANY(user_categories) THEN
        segments := array_append(segments, 'financial_planning');
        IF avg_commercial_value >= 8.0 THEN
            segments := array_append(segments, 'high_value_financial');
        END IF;
    END IF;
    
    IF 'relationships' = ANY(user_categories) THEN
        segments := array_append(segments, 'relationship_seeking');
    END IF;
    
    IF 'career' = ANY(user_categories) THEN
        segments := array_append(segments, 'career_development');
    END IF;
    
    IF 'health' = ANY(user_categories) THEN
        segments := array_append(segments, 'health_wellness');
    END IF;
    
    -- Segmentos por comportamiento
    IF total_questions >= 5 THEN
        segments := array_append(segments, 'engaged_user');
    END IF;
    
    IF total_questions >= 10 THEN
        segments := array_append(segments, 'power_user');
    END IF;
    
    -- Segmentos por valor comercial
    IF avg_commercial_value >= 7.0 THEN
        segments := array_append(segments, 'high_intent');
    END IF;
    
    IF avg_commercial_value >= 9.0 THEN
        segments := array_append(segments, 'premium_audience');
    END IF;
    
    -- Añadir segmento geográfico por defecto
    segments := array_append(segments, 'argentina');
    
    RETURN segments;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 3. TABLA ADICIONAL PARA PERFORMANCE DE ADS PREMIUM
-- ============================================
CREATE TABLE IF NOT EXISTS premium_ad_performance (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    ad_session_id text NOT NULL,
    ad_provider text DEFAULT 'google_ad_manager',
    base_cpm decimal DEFAULT 0.30,
    actual_cpm decimal NOT NULL,
    targeting_segments text[],
    interest_categories_matched text[],
    commercial_value_used integer,
    served_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_premium_ad_performance_guest_id ON premium_ad_performance(guest_id);
CREATE INDEX IF NOT EXISTS idx_premium_ad_performance_served_at ON premium_ad_performance(served_at);

-- ============================================
-- 4. FUNCIÓN PARA VERIFICAR SISTEMA
-- ============================================
CREATE OR REPLACE FUNCTION test_monetization_system()
RETURNS jsonb AS $$
DECLARE
    test_result jsonb;
    calc_result decimal;
    segments_result text[];
BEGIN
    -- Test calculate_commercial_value
    SELECT calculate_commercial_value('travel', ARRAY['premium_intent', 'travel_intent'], 8.5) INTO calc_result;
    
    -- Test get_user_ad_segments (guest ficticio)
    SELECT get_user_ad_segments('test_guest_123') INTO segments_result;
    
    -- Construir resultado
    test_result := jsonb_build_object(
        'functions_working', true,
        'calculate_commercial_value', calc_result,
        'get_user_ad_segments', segments_result,
        'timestamp', now()
    );
    
    RETURN test_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VERIFICACIÓN Y COMENTARIOS
-- ============================================

COMMENT ON FUNCTION calculate_commercial_value IS 'Calcula valor comercial basado en categoría, tags y confianza';
COMMENT ON FUNCTION get_user_ad_segments IS 'Genera segmentos de audiencia para targeting de ads';
COMMENT ON TABLE premium_ad_performance IS 'Performance y métricas de ads premium servidos';

-- Test final
DO $$
DECLARE
    test_results jsonb;
BEGIN
    SELECT test_monetization_system() INTO test_results;
    RAISE NOTICE 'Sistema de Monetización LLM - Funciones creadas exitosamente:';
    RAISE NOTICE '✅ calculate_commercial_value()';
    RAISE NOTICE '✅ get_user_ad_segments()';
    RAISE NOTICE '✅ premium_ad_performance table';
    RAISE NOTICE 'Test result: %', test_results;
    RAISE NOTICE '🚀 Sistema listo para generar revenue premium!';
END $$;
