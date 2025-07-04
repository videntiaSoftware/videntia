-- ============================================
-- SISTEMA COMPLETO DE MAILING DIARIO CON CARTAS REALES
-- ============================================
-- Ejecutar este SQL en Supabase SQL Editor

-- ============================================
-- 1. CREAR TABLAS PARA CARTAS DE TAROT
-- ============================================

-- Tabla de cartas de tarot
CREATE TABLE IF NOT EXISTS tarot_cards (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    meaning text NOT NULL,
    image_url text,
    created_at timestamptz DEFAULT now()
);

-- Tabla de interpretaciones múltiples por carta
CREATE TABLE IF NOT EXISTS card_interpretations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id uuid REFERENCES tarot_cards(id) ON DELETE CASCADE,
    interpretation text NOT NULL,
    context text DEFAULT 'general', -- 'general', 'love', 'career', 'money'
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 2. POBLAR CON CARTAS DE TAROT BÁSICAS
-- ============================================

-- Insertar cartas principales
INSERT INTO tarot_cards (name, meaning, image_url) VALUES
('El Mago', 'Representa el poder de la voluntad y la capacidad de manifestar tus deseos en la realidad.', '/images/tarot-cards/el-mago.jpg'),
('La Suma Sacerdotisa', 'Simboliza la intuición, los misterios ocultos y la sabiduría interior.', '/images/tarot-cards/suma-sacerdotisa.jpg'),
('La Emperatriz', 'Representa la fertilidad, la abundancia y la conexión con la naturaleza.', '/images/tarot-cards/emperatriz.jpg'),
('El Emperador', 'Simboliza la autoridad, la estructura y el control sobre las circunstancias.', '/images/tarot-cards/emperador.jpg'),
('El Hierofante', 'Representa la tradición, la enseñanza espiritual y la búsqueda del conocimiento.', '/images/tarot-cards/hierofante.jpg'),
('Los Enamorados', 'Simboliza las decisiones importantes, el amor y la armonía en las relaciones.', '/images/tarot-cards/enamorados.jpg'),
('El Carro', 'Representa la determinación, el control y el triunfo sobre las adversidades.', '/images/tarot-cards/carro.jpg'),
('La Justicia', 'Simboliza el equilibrio, la verdad y las consecuencias de nuestras acciones.', '/images/tarot-cards/justicia.jpg'),
('El Ermitaño', 'Representa la introspección, la búsqueda interior y la sabiduría adquirida.', '/images/tarot-cards/ermitano.jpg'),
('La Rueda de la Fortuna', 'Simboliza los ciclos de la vida, el destino y los cambios inesperados.', '/images/tarot-cards/rueda-fortuna.jpg')
ON CONFLICT DO NOTHING;

-- Insertar interpretaciones variadas
INSERT INTO card_interpretations (card_id, interpretation, context) 
SELECT 
    tc.id,
    interpretation_text,
    'general'
FROM tarot_cards tc
CROSS JOIN (
    VALUES 
    ('Hoy es un día de manifestación y poder personal. Tu energía creativa está en su punto más alto.'),
    ('Las fuerzas del universo conspiran a tu favor. Es momento de actuar con confianza.'),
    ('Tu intuición te guía hacia decisiones importantes. Confía en tu sabiduría interior.'),
    ('Los cambios que esperabas están comenzando a manifestarse en tu vida.'),
    ('Es un día propicio para nuevos comienzos y proyectos creativos.'),
    ('La armonía y el equilibrio serán claves en tus relaciones hoy.'),
    ('Tu determinación y perseverancia te llevarán al éxito en tus objetivos.'),
    ('La justicia divina actúa en tu favor. Mantén tu integridad.'),
    ('Es momento de reflexionar y buscar respuestas en tu interior.'),
    ('Los ciclos se renuevan y nuevas oportunidades aparecen en tu camino.')
) AS interp(interpretation_text)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. FUNCIÓN MEJORADA PARA OBTENER LECTURA ALEATORIA
-- ============================================

CREATE OR REPLACE FUNCTION get_random_daily_reading()
RETURNS TABLE (
    card_name text,
    interpretation text,
    card_meaning text,
    image_url text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tc.name as card_name,
        ci.interpretation,
        tc.meaning as card_meaning,
        tc.image_url
    FROM tarot_cards tc
    JOIN card_interpretations ci ON tc.id = ci.card_id
    WHERE ci.context = 'general'
    ORDER BY random()
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. FUNCIÓN PARA OBTENER LECTURA PERSONALIZADA POR USUARIO
-- ============================================

CREATE OR REPLACE FUNCTION get_user_daily_reading(p_user_id uuid, p_date date DEFAULT CURRENT_DATE)
RETURNS TABLE (
    card_name text,
    interpretation text,
    card_meaning text,
    image_url text
) AS $$
DECLARE
    seed_value integer;
BEGIN
    -- Generar seed determinístico basado en user_id + fecha
    seed_value := (hashtext(p_user_id::text || p_date::text) % 1000000);
    
    -- Establecer seed para reproducibilidad
    PERFORM setseed(seed_value::float / 1000000.0);
    
    RETURN QUERY
    SELECT 
        tc.name as card_name,
        ci.interpretation,
        tc.meaning as card_meaning,
        tc.image_url
    FROM tarot_cards tc
    JOIN card_interpretations ci ON tc.id = ci.card_id
    WHERE ci.context = 'general'
    ORDER BY random()
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. CREAR ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tarot_cards_name ON tarot_cards(name);
CREATE INDEX IF NOT EXISTS idx_card_interpretations_card_id ON card_interpretations(card_id);
CREATE INDEX IF NOT EXISTS idx_card_interpretations_context ON card_interpretations(context);

-- ============================================
-- 6. COMENTARIOS Y DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE tarot_cards IS 'Cartas de tarot con sus significados básicos';
COMMENT ON TABLE card_interpretations IS 'Interpretaciones múltiples por carta para variedad';
COMMENT ON FUNCTION get_random_daily_reading() IS 'Obtiene lectura completamente aleatoria';
COMMENT ON FUNCTION get_user_daily_reading(uuid, date) IS 'Obtiene lectura determinística por usuario y fecha';

-- ============================================
-- 7. VERIFICACIÓN FINAL
-- ============================================

DO $$
DECLARE
    cards_count integer;
    interpretations_count integer;
    test_reading record;
BEGIN
    -- Contar cartas
    SELECT COUNT(*) INTO cards_count FROM tarot_cards;
    
    -- Contar interpretaciones
    SELECT COUNT(*) INTO interpretations_count FROM card_interpretations;
    
    -- Probar función de lectura aleatoria
    SELECT * INTO test_reading FROM get_random_daily_reading();
    
    RAISE NOTICE '🃏 SISTEMA DE TAROT CONFIGURADO:';
    RAISE NOTICE '✅ Cartas creadas: %', cards_count;
    RAISE NOTICE '✅ Interpretaciones creadas: %', interpretations_count;
    RAISE NOTICE '✅ Función get_random_daily_reading: %', 
        CASE WHEN test_reading.card_name IS NOT NULL THEN 'FUNCIONA' ELSE 'ERROR' END;
    RAISE NOTICE '📧 Sistema de mailing diario listo para usar!';
    
    -- Mostrar ejemplo de lectura
    IF test_reading.card_name IS NOT NULL THEN
        RAISE NOTICE '🎯 Ejemplo de lectura: % - %', 
            test_reading.card_name, 
            LEFT(test_reading.interpretation, 50) || '...';
    END IF;
END $$;
