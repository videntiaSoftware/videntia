-- Script básico para probar el sistema de cartas diarias - Videntia
-- Copia y pega este código en Supabase SQL Editor

-- 0. LIMPIAR TABLAS EXISTENTES (para evitar conflictos de tipos)
DROP TABLE IF EXISTS user_daily_readings CASCADE;
DROP TABLE IF EXISTS card_interpretations CASCADE;
DROP TABLE IF EXISTS message_templates CASCADE;
DROP TABLE IF EXISTS tarot_cards CASCADE;

-- 1. Tabla principal de cartas del tarot
CREATE TABLE IF NOT EXISTS tarot_cards (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_number integer NOT NULL,
    name text NOT NULL,
    suit text,
    category text NOT NULL,
    upright_meaning text NOT NULL,
    reversed_meaning text NOT NULL,
    keywords text[],
    created_at timestamptz DEFAULT now()
);

-- 2. Tabla de interpretaciones contextuales
CREATE TABLE IF NOT EXISTS card_interpretations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id uuid REFERENCES tarot_cards(id) ON DELETE CASCADE,
    context text NOT NULL DEFAULT 'daily',
    card_position text NOT NULL DEFAULT 'upright',
    interpretation text NOT NULL,
    energy_message text NOT NULL,
    advice text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 3. Tabla de plantillas de mensajes
CREATE TABLE IF NOT EXISTS message_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    template_type text NOT NULL,
    template_text text NOT NULL,
    variables text[],
    created_at timestamptz DEFAULT now()
);

-- 4. Tabla de lecturas diarias POR USUARIO (cada usuario tiene su lectura exclusiva)
CREATE TABLE IF NOT EXISTS user_daily_readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL, -- ID del usuario de Supabase
    date_for date NOT NULL,
    card_id uuid REFERENCES tarot_cards(id),
    card_position text NOT NULL,
    interpretation_id uuid REFERENCES card_interpretations(id),
    custom_message text,
    energy_focus text,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date_for) -- UN usuario = UNA lectura por día
);

-- 5. Insertar cartas de ejemplo (5 cartas para empezar)
INSERT INTO tarot_cards (card_number, name, suit, category, upright_meaning, reversed_meaning, keywords) VALUES
(0, 'El Loco', 'major_arcana', 'major', 'Nuevos comienzos, espontaneidad, fe en el universo', 'Imprudencia, falta de dirección, decisiones apresuradas', ARRAY['aventura', 'confianza', 'libertad']),
(1, 'El Mago', 'major_arcana', 'major', 'Manifestación, poder personal, habilidad', 'Manipulación, falta de concentración, uso inadecuado del poder', ARRAY['creación', 'voluntad', 'concentración']),
(2, 'La Sacerdotisa', 'major_arcana', 'major', 'Intuición, sabiduría oculta, subconsciente', 'Secretos, información oculta, falta de intuición', ARRAY['misterio', 'intuición', 'sabiduría']),
(3, 'La Emperatriz', 'major_arcana', 'major', 'Fertilidad, feminidad, abundancia, naturaleza', 'Dependencia, exceso, negligencia', ARRAY['maternidad', 'creatividad', 'abundancia']),
(4, 'El Emperador', 'major_arcana', 'major', 'Autoridad, estructura, control, padre', 'Tiranía, rigidez, autoritarismo', ARRAY['liderazgo', 'estabilidad', 'autoridad'])
ON CONFLICT (card_number) DO NOTHING;

-- 6. Insertar interpretaciones para cada carta
INSERT INTO card_interpretations (card_id, context, card_position, interpretation, energy_message, advice) 
SELECT 
    tc.id,
    'daily',
    'upright',
    CASE tc.name
        WHEN 'El Loco' THEN 'Hoy es un día para abrazar lo desconocido con valentía. El universo te invita a dar un paso audaz hacia nuevas experiencias que transformarán tu perspectiva.'
        WHEN 'El Mago' THEN 'Tu poder personal está en su punto máximo. Todos los elementos están alineados para que manifiestes tus deseos más profundos en la realidad.'
        WHEN 'La Sacerdotisa' THEN 'Confía en tu intuición hoy. Las respuestas que buscas están en tu interior, esperando ser descubiertas en el silencio de tu alma.'
        WHEN 'La Emperatriz' THEN 'La energía creativa fluye abundantemente a través de ti. Es momento de nutrir tus proyectos y permitir que florezcan naturalmente.'
        WHEN 'El Emperador' THEN 'Tu liderazgo natural será reconocido hoy. Toma el control de tu destino con sabiduría, determinación y compasión.'
    END,
    CASE tc.name
        WHEN 'El Loco' THEN 'La energía de la aventura y la fe ciega en el universo te rodea con su poder transformador.'
        WHEN 'El Mago' THEN 'El poder de la manifestación consciente está fluyendo a través de cada fibra de tu ser.'
        WHEN 'La Sacerdotisa' THEN 'La sabiduría lunar y la intuición femenina te guían hacia verdades ocultas.'
        WHEN 'La Emperatriz' THEN 'La abundancia de la Madre Tierra te nutre, protege y bendice con su gracia infinita.'
        WHEN 'El Emperador' THEN 'La autoridad benevolente y el orden cósmico te respaldan en cada decisión importante.'
    END,
    CASE tc.name
        WHEN 'El Loco' THEN 'Mantén la mente abierta y confía en el proceso divino. No todos los riesgos son peligrosos cuando el corazón está alineado.'
        WHEN 'El Mago' THEN 'Enfoca tu energía en una meta específica hoy. Tienes todas las herramientas necesarias para el éxito.'
        WHEN 'La Sacerdotisa' THEN 'Medita antes de tomar decisiones importantes. Escucha la voz susurrante de tu sabiduría interior.'
        WHEN 'La Emperatriz' THEN 'Dedica tiempo a actividades creativas que nutran tu alma. Cuida de ti y de quienes amas.'
        WHEN 'El Emperador' THEN 'Organiza tus objetivos con claridad y mantén la disciplina. Lidera con el ejemplo y la integridad.'
    END
FROM tarot_cards tc 
WHERE tc.category = 'major';

-- 7. Insertar plantillas de mensajes
INSERT INTO message_templates (template_type, template_text, variables) VALUES
('opening', 'El cosmos ha alineado las energías para traerte la sabiduría ancestral de {card_name}.', ARRAY['card_name']),
('opening', 'Hoy, el universo te regala la guía espiritual de {card_name}, una carta llena de poder transformador.', ARRAY['card_name']),
('opening', 'Las estrellas susurran secretos místicos a través de {card_name} en este día sagrado.', ARRAY['card_name']),
('opening', 'La carta {card_name} emerge de las sombras del tarot para iluminar tu sendero con luz divina.', ARRAY['card_name']),

('energy', 'La energía vibracional de {card_meaning} fluye a través de cada momento de tu día.', ARRAY['card_meaning']),
('energy', 'Permite que la esencia cósmica de {card_meaning} guíe tus pensamientos y acciones.', ARRAY['card_meaning']),
('energy', 'El poder transformador de {card_meaning} está trabajando mágicamente en tu favor.', ARRAY['card_meaning']),

('advice', 'Tu alma susurra este consejo sagrado: {practical_advice}', ARRAY['practical_advice']),
('advice', 'Los antiguos maestros del tarot te aconsejan: {practical_advice}', ARRAY['practical_advice']),
('advice', 'La sabiduría eterna del universo te recuerda con amor: {practical_advice}', ARRAY['practical_advice']),

('closing', 'Que esta sabiduría ancestral ilumine tu sendero durante todo el día con luz dorada.', ARRAY[]),
('closing', 'Lleva contigo esta luz espiritual en cada paso que des hacia tu destino superior.', ARRAY[]),
('closing', 'El universo te abraza con amor incondicional y guía divina en este momento perfecto.', ARRAY[]),
('closing', 'Confía en el proceso cósmico que se despliega perfectamente para tu mayor bien.', ARRAY[]);

-- 8. Función para generar lectura diaria PERSONALIZADA POR USUARIO
CREATE OR REPLACE FUNCTION generate_user_daily_reading(
    target_user_id uuid,
    target_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    reading_id uuid,
    card_name text,
    card_meaning text,
    card_position text,
    full_message text,
    energy_focus text
) 
LANGUAGE plpgsql
AS $$
DECLARE
    selected_card_id uuid;
    selected_position text;
    interpretation_text text;
    energy_text text;
    advice_text text;
    opening_template text;
    energy_template text;
    advice_template text;
    closing_template text;
    final_message text;
    card_rec record;
    interpretation_rec record;
    new_reading_id uuid;
    user_seed float;
BEGIN
    -- Verificar si ya existe una lectura para este usuario en esta fecha
    IF EXISTS (SELECT 1 FROM user_daily_readings WHERE user_id = target_user_id AND date_for = target_date) THEN
        RETURN QUERY
        SELECT 
            udr.id,
            tc.name,
            CASE WHEN udr.card_position = 'upright' THEN tc.upright_meaning ELSE tc.reversed_meaning END,
            udr.card_position,
            udr.custom_message,
            udr.energy_focus
        FROM user_daily_readings udr
        JOIN tarot_cards tc ON udr.card_id = tc.id
        WHERE udr.user_id = target_user_id AND udr.date_for = target_date;
        RETURN;
    END IF;

    -- Crear seed único basado en user_id + fecha para determinismo personalizado
    -- Esto asegura que el mismo usuario siempre tenga la misma carta para la misma fecha
    user_seed := (
        (extract(epoch from target_user_id::text::timestamp) / 86400.0) + 
        (extract(epoch from target_date) / 86400.0)
    ) / 1000000.0;
    
    PERFORM setseed(user_seed);
    
    SELECT * INTO card_rec 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    selected_card_id := card_rec.id;
    selected_position := CASE WHEN random() < 0.7 THEN 'upright' ELSE 'reversed' END;
    
    -- Obtener interpretación
    SELECT * INTO interpretation_rec
    FROM card_interpretations ci
    WHERE ci.card_id = selected_card_id 
    AND ci.card_position = selected_position
    AND ci.context = 'daily'
    ORDER BY random()
    LIMIT 1;
    
    -- Si no hay interpretación específica, usar la general
    IF interpretation_rec IS NULL THEN
        interpretation_text := CASE WHEN selected_position = 'upright' 
                              THEN card_rec.upright_meaning 
                              ELSE card_rec.reversed_meaning END;
        energy_text := 'Las energías de ' || card_rec.name || ' te acompañan hoy.';
        advice_text := 'Reflexiona sobre el significado de esta carta en tu vida actual.';
    ELSE
        interpretation_text := interpretation_rec.interpretation;
        energy_text := interpretation_rec.energy_message;
        advice_text := interpretation_rec.advice;
    END IF;
    
    -- Seleccionar plantillas aleatorias (también determinísticas por usuario)
    SELECT template_text INTO opening_template 
    FROM message_templates 
    WHERE template_type = 'opening' 
    ORDER BY random() LIMIT 1;
    
    SELECT template_text INTO energy_template 
    FROM message_templates 
    WHERE template_type = 'energy' 
    ORDER BY random() LIMIT 1;
    
    SELECT template_text INTO advice_template 
    FROM message_templates 
    WHERE template_type = 'advice' 
    ORDER BY random() LIMIT 1;
    
    SELECT template_text INTO closing_template 
    FROM message_templates 
    WHERE template_type = 'closing' 
    ORDER BY random() LIMIT 1;
    
    -- Construir mensaje final con reemplazos
    final_message := replace(opening_template, '{card_name}', card_rec.name);
    final_message := final_message || E'\n\n' || interpretation_text;
    final_message := final_message || E'\n\n' || replace(energy_template, '{card_meaning}', 
                     CASE WHEN selected_position = 'upright' THEN card_rec.upright_meaning ELSE card_rec.reversed_meaning END);
    final_message := final_message || E'\n\n' || replace(advice_template, '{practical_advice}', advice_text);
    final_message := final_message || E'\n\n' || closing_template;
    
    -- Insertar en user_daily_readings (PERSONALIZADA POR USUARIO)
    INSERT INTO user_daily_readings (user_id, date_for, card_id, card_position, interpretation_id, custom_message, energy_focus)
    VALUES (target_user_id, target_date, selected_card_id, selected_position, interpretation_rec.id, final_message, energy_text)
    RETURNING id INTO new_reading_id;
    
    -- Retornar resultado
    RETURN QUERY
    SELECT 
        new_reading_id,
        card_rec.name,
        CASE WHEN selected_position = 'upright' THEN card_rec.upright_meaning ELSE card_rec.reversed_meaning END,
        selected_position,
        final_message,
        energy_text;
        
END;
$$;

-- 9. Ejemplos de uso - Generar lecturas para usuarios específicos
-- Reemplaza estos UUIDs con IDs reales de tu tabla auth.users

-- Simular algunos usuarios para prueba
DO $$
DECLARE
    test_user_1 uuid := '00000000-0000-0000-0000-000000000001';
    test_user_2 uuid := '00000000-0000-0000-0000-000000000002';
    test_user_3 uuid := '00000000-0000-0000-0000-000000000003';
BEGIN
    -- Generar lecturas para usuario 1
    PERFORM generate_user_daily_reading(test_user_1, '2025-06-23'::date);
    PERFORM generate_user_daily_reading(test_user_1, '2025-06-24'::date);
    
    -- Generar lecturas para usuario 2 (diferentes cartas para las mismas fechas)
    PERFORM generate_user_daily_reading(test_user_2, '2025-06-23'::date);
    PERFORM generate_user_daily_reading(test_user_2, '2025-06-24'::date);
    
    -- Generar lecturas para usuario 3
    PERFORM generate_user_daily_reading(test_user_3, '2025-06-23'::date);
    PERFORM generate_user_daily_reading(test_user_3, '2025-06-24'::date);
END
$$;

-- Ver las lecturas generadas (cada usuario tiene su propia carta para cada día)
SELECT 
    udr.user_id,
    udr.date_for,
    tc.name as card_name,
    udr.card_position,
    substr(udr.custom_message, 1, 100) || '...' as message_preview
FROM user_daily_readings udr
JOIN tarot_cards tc ON udr.card_id = tc.id
ORDER BY udr.user_id, udr.date_for;
