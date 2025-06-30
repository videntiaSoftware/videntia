-- Función necesaria para el servicio de mail diario
-- Ejecutar este SQL en tu dashboard de Supabase

CREATE OR REPLACE FUNCTION get_random_daily_reading()
RETURNS TABLE (
    card_id integer,
    card_name character varying,
    interpretation text,
    card_meaning text,
    image_url character varying
) 
LANGUAGE plpgsql
AS $$
DECLARE
    selected_card record;
    selected_interpretation text;
BEGIN
    -- Seleccionar carta aleatoria de tu tabla existente
    SELECT * INTO selected_card 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    -- Seleccionar interpretación aleatoria para esa carta
    SELECT ci.interpretation INTO selected_interpretation
    FROM card_interpretations ci
    WHERE ci.card_id = selected_card.id 
    ORDER BY random() 
    LIMIT 1;
    
    -- Si no hay interpretaciones, usar mensaje por defecto
    IF selected_interpretation IS NULL THEN
        selected_interpretation := 'Reflexiona sobre las energías de esta carta en tu día. ' ||
                                   'Permite que su sabiduría guíe tus decisiones y acciones.';
    END IF;
    
    -- Retornar resultado
    RETURN QUERY
    SELECT 
        selected_card.id,
        selected_card.name,
        selected_interpretation,
        COALESCE(selected_card.interpretation_upright, selected_card.description, 'Carta especial del día'),
        selected_card.image_url;
END;
$$;

-- Función alternativa simple si no tienes card_interpretations
CREATE OR REPLACE FUNCTION get_random_daily_reading_simple()
RETURNS TABLE (
    card_id integer,
    card_name character varying,
    interpretation text,
    card_meaning text,
    image_url character varying
) 
LANGUAGE plpgsql
AS $$
DECLARE
    selected_card record;
    daily_messages text[] := ARRAY[
        'Hoy esta carta te invita a reflexionar sobre tu camino actual.',
        'Permite que la energía de esta carta guíe tus decisiones hoy.',
        'Esta carta trae un mensaje especial para tu día.',
        'Confía en la sabiduría que esta carta tiene para ofrecerte.',
        'Hoy, abraza las enseñanzas que esta carta te presenta.'
    ];
BEGIN
    -- Seleccionar carta aleatoria
    SELECT * INTO selected_card 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    -- Retornar con mensaje aleatorio
    RETURN QUERY
    SELECT 
        selected_card.id,
        selected_card.name,
        daily_messages[floor(random() * array_length(daily_messages, 1)) + 1],
        COALESCE(selected_card.interpretation_upright, selected_card.description, 'Carta del tarot'),
        selected_card.image_url;
END;
$$;
