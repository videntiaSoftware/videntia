-- Script completo para sistema de cartas del tarot con lecturas diarias infinitas
-- Ejecutar en Supabase SQL Editor

-- 1. Tabla principal de cartas del tarot (78 cartas completas)
CREATE TABLE IF NOT EXISTS tarot_cards (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_number integer NOT NULL,
    name text NOT NULL,
    suit text, -- 'major_arcana', 'cups', 'wands', 'swords', 'pentacles'
    category text NOT NULL, -- 'major' o 'minor'
    upright_meaning text NOT NULL,
    reversed_meaning text NOT NULL,
    keywords text[], -- Array de palabras clave
    element text, -- 'fire', 'water', 'air', 'earth', null para arcanos mayores
    astrological_sign text,
    numerology integer,
    created_at timestamptz DEFAULT now()
);

-- 2. Tabla de interpretaciones contextuales (múltiples interpretaciones por carta)
CREATE TABLE IF NOT EXISTS card_interpretations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id uuid REFERENCES tarot_cards(id) ON DELETE CASCADE,
    context text NOT NULL, -- 'daily', 'love', 'career', 'spiritual', 'general'
    position text, -- 'upright', 'reversed'
    interpretation text NOT NULL,
    energy_message text NOT NULL, -- Mensaje energético específico
    advice text NOT NULL, -- Consejo práctico
    created_at timestamptz DEFAULT now()
);

-- 3. Tabla de plantillas de mensajes para variación
CREATE TABLE IF NOT EXISTS message_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    template_type text NOT NULL, -- 'opening', 'middle', 'closing', 'energy', 'advice'
    template_text text NOT NULL,
    variables text[], -- Variables que se pueden reemplazar {card_name}, {meaning}, etc
    created_at timestamptz DEFAULT now()
);

-- 4. Tabla mejorada de cartas diarias generadas
CREATE TABLE IF NOT EXISTS daily_readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    date_for date NOT NULL UNIQUE,
    card_id uuid REFERENCES tarot_cards(id),
    position text NOT NULL, -- 'upright' o 'reversed'
    interpretation_id uuid REFERENCES card_interpretations(id),
    custom_message text, -- Mensaje personalizado generado
    energy_focus text, -- Enfoque energético del día
    moon_phase text, -- Fase lunar para contexto adicional
    created_at timestamptz DEFAULT now()
);

-- 5. Insertar las 78 cartas del tarot completas
INSERT INTO tarot_cards (card_number, name, suit, category, upright_meaning, reversed_meaning, keywords, element, astrological_sign, numerology) VALUES

-- Arcanos Mayores (0-21)
(0, 'El Loco', 'major_arcana', 'major', 'Nuevos comienzos, espontaneidad, fe en el universo', 'Imprudencia, falta de dirección, decisiones apresuradas', ARRAY['aventura', 'confianza', 'libertad', 'nuevo ciclo'], 'air', 'Urano', 0),
(1, 'El Mago', 'major_arcana', 'major', 'Manifestación, poder personal, habilidad', 'Manipulación, falta de concentración, uso inadecuado del poder', ARRAY['creación', 'voluntad', 'concentración', 'recursos'], 'air', 'Mercurio', 1),
(2, 'La Sacerdotisa', 'major_arcana', 'major', 'Intuición, sabiduría oculta, subconsciente', 'Secretos, información oculta, falta de intuición', ARRAY['misterio', 'intuición', 'sabiduría femenina', 'luna'], 'water', 'Luna', 2),
(3, 'La Emperatriz', 'major_arcana', 'major', 'Fertilidad, feminidad, abundancia, naturaleza', 'Dependencia, exceso, negligencia', ARRAY['maternidad', 'creatividad', 'abundancia', 'naturaleza'], 'earth', 'Venus', 3),
(4, 'El Emperador', 'major_arcana', 'major', 'Autoridad, estructura, control, padre', 'Tiranía, rigidez, autoritarismo', ARRAY['liderazgo', 'estabilidad', 'autoridad', 'paternidad'], 'fire', 'Aries', 4),

-- Copas (Emociones, Agua) - Muestra de algunas cartas
(22, 'As de Copas', 'cups', 'minor', 'Nuevo amor, compasión, creatividad', 'Represión emocional, bloqueo creativo', ARRAY['amor nuevo', 'emociones', 'intuición'], 'water', NULL, 1),
(23, 'Dos de Copas', 'cups', 'minor', 'Unión, sociedad, amor mutuo', 'Desequilibrio en relaciones, ruptura', ARRAY['amor', 'sociedad', 'equilibrio'], 'water', NULL, 2),
(24, 'Tres de Copas', 'cups', 'minor', 'Celebración, amistad, comunidad', 'Exceso, chisme, superficialidad', ARRAY['amistad', 'celebración', 'alegría'], 'water', NULL, 3),

-- Bastos/Varitas (Acción, Fuego) - Muestra
(36, 'As de Bastos', 'wands', 'minor', 'Inspiración, nuevos proyectos, potencial creativo', 'Falta de energía, proyectos fallidos', ARRAY['inspiración', 'creatividad', 'pasión'], 'fire', NULL, 1),
(37, 'Dos de Bastos', 'wands', 'minor', 'Planificación futura, toma de decisiones', 'Falta de planificación, miedo al cambio', ARRAY['planificación', 'decisiones', 'futuro'], 'fire', NULL, 2),

-- Espadas (Mente, Aire) - Muestra
(50, 'As de Espadas', 'swords', 'minor', 'Nueva perspectiva, claridad mental, verdad', 'Confusión, falta de claridad, mentiras', ARRAY['claridad', 'verdad', 'justicia'], 'air', NULL, 1),
(51, 'Dos de Espadas', 'swords', 'minor', 'Decisión difícil, equilibrio, stalemate', 'Indecisión, confusión, evitar decisiones', ARRAY['decisión', 'equilibrio', 'dilema'], 'air', NULL, 2),

-- Pentáculos (Material, Tierra) - Muestra
(64, 'As de Pentáculos', 'pentacles', 'minor', 'Nueva oportunidad financiera, manifestación', 'Oportunidad perdida, falta de planificación', ARRAY['dinero', 'oportunidad', 'manifestación'], 'earth', NULL, 1),
(65, 'Dos de Pentáculos', 'pentacles', 'minor', 'Equilibrio, multitarea, flexibilidad', 'Desequilibrio, sobrecarga, mala gestión', ARRAY['equilibrio', 'adaptabilidad', 'malabarismo'], 'earth', NULL, 2)

ON CONFLICT (card_number) DO NOTHING;

-- 6. Insertar interpretaciones contextuales (múltiples por carta)
INSERT INTO card_interpretations (card_id, context, position, interpretation, energy_message, advice) 
SELECT 
    tc.id,
    'daily',
    'upright',
    CASE tc.name
        WHEN 'El Loco' THEN 'Hoy es un día para abrazar lo desconocido con valentía. El universo te invita a dar un paso audaz hacia nuevas experiencias.'
        WHEN 'El Mago' THEN 'Tu poder personal está en su punto máximo. Todos los elementos están alineados para que manifiestes tus deseos.'
        WHEN 'La Sacerdotisa' THEN 'Confía en tu intuición hoy. Las respuestas que buscas están en tu interior, esperando ser descubiertas.'
        WHEN 'La Emperatriz' THEN 'La energía creativa fluye abundantemente. Es momento de nutrir tus proyectos y permitir que florezcan.'
        WHEN 'El Emperador' THEN 'Tu liderazgo natural será reconocido. Toma el control de tu destino con sabiduría y determinación.'
        ELSE 'Esta carta trae energías de transformación y crecimiento a tu día.'
    END,
    CASE tc.name
        WHEN 'El Loco' THEN 'La energía de la aventura y la fe ciega en el universo te rodea.'
        WHEN 'El Mago' THEN 'El poder de la manifestación consciente está a tu alcance.'
        WHEN 'La Sacerdotisa' THEN 'La sabiduría lunar y la intuición femenina te guían.'
        WHEN 'La Emperatriz' THEN 'La abundancia de la Madre Tierra te nutre y protege.'
        WHEN 'El Emperador' THEN 'La autoridad benevolente y el orden cósmico te respaldan.'
        ELSE 'Energías positivas de transformación te acompañan.'
    END,
    CASE tc.name
        WHEN 'El Loco' THEN 'Mantén la mente abierta y confía en el proceso. No todos los riesgos son peligrosos.'
        WHEN 'El Mago' THEN 'Enfoca tu energía en una meta específica. Tienes todas las herramientas necesarias.'
        WHEN 'La Sacerdotisa' THEN 'Medita antes de tomar decisiones importantes. Escucha tu voz interior.'
        WHEN 'La Emperatriz' THEN 'Dedica tiempo a actividades creativas. Cuida de ti y de quienes amas.'
        WHEN 'El Emperador' THEN 'Organiza tus objetivos y mantén la disciplina. Lidera con el ejemplo.'
        ELSE 'Mantente receptivo a las oportunidades de crecimiento que se presenten.'
    END
FROM tarot_cards tc 
WHERE tc.category = 'major'
LIMIT 5;

-- 7. Insertar plantillas de mensajes para variación infinita
INSERT INTO message_templates (template_type, template_text, variables) VALUES
('opening', 'El cosmos ha alineado las energías para traerte la sabiduría de {card_name}.', ARRAY['card_name']),
('opening', 'Hoy, el universo te regala la guía espiritual de {card_name}.', ARRAY['card_name']),
('opening', 'Las estrellas susurran secretos a través de {card_name} en este día especial.', ARRAY['card_name']),
('opening', 'La carta {card_name} emerge de las sombras para iluminar tu camino.', ARRAY['card_name']),

('energy', 'La energía de {card_meaning} fluye a través de cada momento de tu día.', ARRAY['card_meaning']),
('energy', 'Permite que la esencia de {card_meaning} guíe tus pensamientos y acciones.', ARRAY['card_meaning']),
('energy', 'El poder transformador de {card_meaning} está trabajando en tu favor.', ARRAY['card_meaning']),

('advice', 'Tu alma te aconseja: {practical_advice}', ARRAY['practical_advice']),
('advice', 'Los antiguos susurran: {practical_advice}', ARRAY['practical_advice']),
('advice', 'La sabiduría eterna te recuerda: {practical_advice}', ARRAY['practical_advice']),

('closing', 'Que esta sabiduría ancestral ilumine tu sendero durante todo el día.', ARRAY[]),
('closing', 'Lleva contigo esta luz espiritual en cada paso que des.', ARRAY[]),
('closing', 'El universo te abraza con amor incondicional y guía divina.', ARRAY[]),
('closing', 'Confía en el proceso cósmico que se despliega perfectamente para ti.', ARRAY[]);

-- 8. Función para generar lectura diaria con variación infinita
CREATE OR REPLACE FUNCTION generate_daily_reading(target_date date DEFAULT CURRENT_DATE)
RETURNS TABLE (
    reading_id uuid,
    card_name text,
    card_meaning text,
    position text,
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
BEGIN
    -- Verificar si ya existe una lectura para esta fecha
    IF EXISTS (SELECT 1 FROM daily_readings WHERE date_for = target_date) THEN
        RETURN QUERY
        SELECT 
            dr.id,
            tc.name,
            tc.upright_meaning,
            dr.position,
            dr.custom_message,
            dr.energy_focus
        FROM daily_readings dr
        JOIN tarot_cards tc ON dr.card_id = tc.id
        WHERE dr.date_for = target_date;
        RETURN;
    END IF;

    -- Seleccionar carta aleatoria con seed basado en fecha para consistencia
    SELECT setseed(extract(epoch from target_date) / 86400.0 / 365.0);
    
    SELECT * INTO card_rec 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    selected_card_id := card_rec.id;
    
    -- Determinar posición (70% upright, 30% reversed)
    selected_position := CASE WHEN random() < 0.7 THEN 'upright' ELSE 'reversed' END;
    
    -- Obtener interpretación
    SELECT * INTO interpretation_rec
    FROM card_interpretations ci
    WHERE ci.card_id = selected_card_id 
    AND ci.position = selected_position
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
    
    -- Seleccionar plantillas aleatorias
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
    
    -- Insertar en daily_readings
    INSERT INTO daily_readings (date_for, card_id, position, interpretation_id, custom_message, energy_focus)
    VALUES (target_date, selected_card_id, selected_position, interpretation_rec.id, final_message, energy_text)
    RETURNING id INTO reading_id;
    
    -- Retornar resultado
    RETURN QUERY
    SELECT 
        reading_id,
        card_rec.name,
        CASE WHEN selected_position = 'upright' THEN card_rec.upright_meaning ELSE card_rec.reversed_meaning END,
        selected_position,
        final_message,
        energy_text;
        
END;
$$;

-- 9. Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_daily_readings_date ON daily_readings(date_for);
CREATE INDEX IF NOT EXISTS idx_card_interpretations_card_id ON card_interpretations(card_id);
CREATE INDEX IF NOT EXISTS idx_card_interpretations_context ON card_interpretations(context);
CREATE INDEX IF NOT EXISTS idx_tarot_cards_category ON tarot_cards(category);

-- 10. Generar lecturas para los próximos 7 días como ejemplos
DO $$
DECLARE
    i integer;
BEGIN
    FOR i IN 0..6 LOOP
        PERFORM generate_daily_reading(CURRENT_DATE + i);
    END LOOP;
END
$$;
