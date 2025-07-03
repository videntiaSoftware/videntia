-- ============================================
-- ACTUALIZAR FUNCIÓN calculate_commercial_value PARA RETIREMENT
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
    -- Multiplicadores por categoría (RETIREMENT AGREGADO)
    category_multiplier := CASE p_category
        WHEN 'retirement' THEN 4.0   -- 🔥 MÁXIMO valor comercial (jubilación = $$$)
        WHEN 'money' THEN 3.5        -- Alto valor comercial
        WHEN 'travel' THEN 3.0       -- Alto valor comercial
        WHEN 'career' THEN 2.5       -- Buen valor comercial
        WHEN 'health' THEN 2.2
        WHEN 'relationships' THEN 2.0
        WHEN 'family' THEN 1.8
        WHEN 'spiritual' THEN 1.5
        ELSE 1.0
    END;
    
    -- Bonus por tags premium (RETIREMENT TAGS AGREGADOS)
    IF p_tags IS NOT NULL THEN
        SELECT COUNT(*) * 0.5 INTO tag_bonus
        FROM unnest(p_tags) AS tag
        WHERE tag IN (
            'premium_intent', 'high_value', 'travel_intent', 'financial_planning', 'luxury',
            'retirement_planning', 'pension_consultation', 'estate_planning', 'medicare_planning',
            'early_retirement', 'retirement_income', '401k_planning'
        );
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
