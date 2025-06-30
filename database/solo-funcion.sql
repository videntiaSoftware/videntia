-- SOLO FUNCIÓN - Para proyectos que YA tienen tablas de tarot
-- Ejecutar en Supabase SQL Editor

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
    daily_messages text[] := ARRAY[
        'Hoy esta carta te invita a reflexionar sobre tu camino actual.',
        'Permite que la energía de esta carta guíe tus decisiones hoy.',
        'Esta carta trae un mensaje especial para tu día.',
        'Confía en la sabiduría que esta carta tiene para ofrecerte.',
        'Hoy, abraza las enseñanzas que esta carta te presenta.',
        'La energía de esta carta te acompaña en este nuevo día.',
        'Medita sobre el significado profundo que esta carta revela.',
        'Esta carta llega para iluminar aspectos importantes de tu jornada.'
    ];
    random_message text;
BEGIN
    -- Seleccionar carta aleatoria de tu tabla existente
    SELECT * INTO selected_card 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    -- Seleccionar mensaje aleatorio
    random_message := daily_messages[floor(random() * array_length(daily_messages, 1)) + 1];
    
    -- Retornar resultado adaptado a tu esquema
    RETURN QUERY
    SELECT 
        selected_card.id::integer,
        selected_card.name::character varying,
        random_message::text,
        COALESCE(
            selected_card.interpretation_upright, 
            selected_card.upright_meaning,
            selected_card.description, 
            'Carta especial del día'
        )::text,
        COALESCE(selected_card.image_url, '')::character varying;
END;
$$;

-- Probar la función
SELECT * FROM get_random_daily_reading();
