-- SCHEMA COMPLETO UNIFICADO PARA VIDENTIA
-- Este archivo incluye TODAS las tablas necesarias para el sistema de tracking unificado
-- Ejecuta este SQL en tu Supabase SQL Editor

-- ============================================
-- 1. TABLA PRINCIPAL DE LECTURAS
-- ============================================
CREATE TABLE IF NOT EXISTS readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_id text,
    reading_type text NOT NULL,
    question text,
    cards_drawn jsonb,
    interpretation text,
    user_tier text DEFAULT 'guest',
    ip_address text,
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 2. TABLA DE GUESTS (REQUERIDA POR UNIFIED TRACKING)
-- ============================================
CREATE TABLE IF NOT EXISTS guests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text UNIQUE NOT NULL,
    last_seen_at timestamptz DEFAULT now(),
    initial_ip_address text,
    initial_user_agent text,
    total_readings integer DEFAULT 0,
    total_sessions integer DEFAULT 0,
    fingerprint_confidence decimal DEFAULT 0.5,
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 3. TABLA DE PATRONES DE LECTURA DE GUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS guest_reading_patterns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    reading_type text NOT NULL,
    question_asked text,
    question_length integer DEFAULT 0,
    cards_selected jsonb,
    time_of_day integer, -- 0-23
    day_of_week integer, -- 1-7 (Monday = 1)
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 4. TABLA DE EVENTOS DE COMPORTAMIENTO
-- ============================================
CREATE TABLE IF NOT EXISTS guest_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    session_id text,
    event_type text NOT NULL,
    event_name text,
    event_data jsonb,
    page_url text,
    user_agent text,
    ip_address text,
    timestamp timestamptz DEFAULT now()
);

-- ============================================
-- 5. TABLA DE SESIONES DE GUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS guest_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    session_id text UNIQUE NOT NULL,
    started_at timestamptz DEFAULT now(),
    ended_at timestamptz,
    ip_address text,
    user_agent text,
    page_views integer DEFAULT 1
);

-- ============================================
-- 6. TABLA DE BEHAVIOR EVENTS (para analytics avanzados)
-- ============================================
CREATE TABLE IF NOT EXISTS guest_behavior_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    session_id text,
    event_type text NOT NULL,
    event_data jsonb,
    page_url text,
    user_agent text,
    ip_address text,
    timestamp timestamptz DEFAULT now()
);

-- ============================================
-- 7. TABLA DE PERFILES DE INTERÉS (para monetización)
-- ============================================
CREATE TABLE IF NOT EXISTS user_interest_profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    question_text text NOT NULL,
    primary_category text,
    generated_tags text[],
    confidence_score decimal DEFAULT 0.5,
    commercial_value decimal DEFAULT 5.0,
    demographic_hints jsonb,
    ad_keywords text[],
    sold boolean DEFAULT false,
    sold_to text,
    sold_at timestamptz,
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 8. TABLA DE INSIGHTS DE ANALYTICS DE GUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS guest_analytics_insights (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text UNIQUE NOT NULL,
    total_sessions integer DEFAULT 0,
    total_readings integer DEFAULT 0,
    avg_session_duration decimal DEFAULT 0,
    preferred_reading_types text[],
    spiritual_interests text[],
    life_focus_areas text[],
    commercial_profile_tags text[],
    estimated_ltv decimal DEFAULT 0,
    last_updated timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- ============================================
-- 9. TABLA DE EVENTOS DE ADS PREMIUM
-- ============================================
CREATE TABLE IF NOT EXISTS premium_ad_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text,
    event_type text NOT NULL, -- 'impression', 'click', 'conversion'
    ad_category text,
    estimated_revenue decimal DEFAULT 0,
    targeting_applied boolean DEFAULT false,
    user_segment text[],
    timestamp timestamptz DEFAULT now()
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================
CREATE INDEX IF NOT EXISTS idx_readings_user_id ON readings(user_id);
CREATE INDEX IF NOT EXISTS idx_readings_guest_id ON readings(guest_id);
CREATE INDEX IF NOT EXISTS idx_readings_created_at ON readings(created_at);
CREATE INDEX IF NOT EXISTS idx_readings_reading_type ON readings(reading_type);

CREATE INDEX IF NOT EXISTS idx_guests_guest_id ON guests(guest_id);
CREATE INDEX IF NOT EXISTS idx_guests_last_seen_at ON guests(last_seen_at);

CREATE INDEX IF NOT EXISTS idx_guest_reading_patterns_guest_id ON guest_reading_patterns(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_reading_patterns_created_at ON guest_reading_patterns(created_at);

CREATE INDEX IF NOT EXISTS idx_guest_events_guest_id ON guest_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_events_timestamp ON guest_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_guest_events_session_id ON guest_events(session_id);

CREATE INDEX IF NOT EXISTS idx_guest_sessions_guest_id ON guest_sessions(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_session_id ON guest_sessions(session_id);

CREATE INDEX IF NOT EXISTS idx_guest_behavior_events_guest_id ON guest_behavior_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_behavior_events_timestamp ON guest_behavior_events(timestamp);

CREATE INDEX IF NOT EXISTS idx_user_interest_profiles_guest_id ON user_interest_profiles(guest_id);
CREATE INDEX IF NOT EXISTS idx_user_interest_profiles_created_at ON user_interest_profiles(created_at);

CREATE INDEX IF NOT EXISTS idx_guest_analytics_insights_guest_id ON guest_analytics_insights(guest_id);

CREATE INDEX IF NOT EXISTS idx_premium_ad_events_guest_id ON premium_ad_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_premium_ad_events_timestamp ON premium_ad_events(timestamp);

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para incrementar lecturas de guest
CREATE OR REPLACE FUNCTION increment_guest_readings(p_guest_id text)
RETURNS void AS $$
BEGIN
    UPDATE guests 
    SET total_readings = total_readings + 1,
        last_seen_at = now()
    WHERE guest_id = p_guest_id;
    
    -- Si no existe, crear el guest
    INSERT INTO guests (guest_id, total_readings, last_seen_at)
    SELECT p_guest_id, 1, now()
    WHERE NOT EXISTS (SELECT 1 FROM guests WHERE guest_id = p_guest_id);
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar insights de guest
CREATE OR REPLACE FUNCTION update_guest_insights(p_guest_id text)
RETURNS void AS $$
DECLARE
    v_total_sessions integer;
    v_total_readings integer;
    v_preferred_types text[];
BEGIN
    -- Obtener estadísticas
    SELECT COUNT(DISTINCT session_id) INTO v_total_sessions
    FROM guest_events WHERE guest_id = p_guest_id;
    
    SELECT COUNT(*) INTO v_total_readings
    FROM guest_reading_patterns WHERE guest_id = p_guest_id;
    
    -- Obtener tipos de lectura preferidos
    SELECT array_agg(reading_type)
    INTO v_preferred_types
    FROM (
        SELECT reading_type, COUNT(*) as cnt
        FROM guest_reading_patterns 
        WHERE guest_id = p_guest_id
        GROUP BY reading_type
        ORDER BY cnt DESC
        LIMIT 3
    ) t;
    
    -- Actualizar o insertar insights
    INSERT INTO guest_analytics_insights (
        guest_id, 
        total_sessions, 
        total_readings, 
        preferred_reading_types,
        last_updated
    )
    VALUES (
        p_guest_id, 
        v_total_sessions, 
        v_total_readings, 
        v_preferred_types,
        now()
    )
    ON CONFLICT (guest_id) 
    DO UPDATE SET
        total_sessions = EXCLUDED.total_sessions,
        total_readings = EXCLUDED.total_readings,
        preferred_reading_types = EXCLUDED.preferred_reading_types,
        last_updated = now();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- Habilitar RLS en tablas sensibles
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interest_profiles ENABLE ROW LEVEL SECURITY;

-- Política para readings: usuarios pueden ver solo sus propias lecturas
CREATE POLICY "Users can view own readings" ON readings
FOR SELECT USING (auth.uid() = user_id);

-- Política para permitir inserts desde la aplicación
CREATE POLICY "Allow service role inserts" ON readings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role inserts on profiles" ON user_interest_profiles
FOR INSERT WITH CHECK (true);

-- Política para permitir selects de analytics (solo admin)
CREATE POLICY "Admin can view all analytics" ON guest_analytics_insights
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.uid() = id 
        AND raw_user_meta_data->>'role' = 'admin'
    )
);

-- ============================================
-- TRIGGERS PARA AUTOMATIZACIÓN
-- ============================================

-- Trigger para actualizar insights cuando se crea una lectura
CREATE OR REPLACE FUNCTION trigger_update_guest_insights()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.guest_id IS NOT NULL THEN
        PERFORM update_guest_insights(NEW.guest_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_reading_insert
    AFTER INSERT ON guest_reading_patterns
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_guest_insights();

-- ============================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE readings IS 'Tabla principal de lecturas de tarot para usuarios autenticados y guests';
COMMENT ON TABLE guests IS 'Perfiles de usuarios no autenticados (guests) para tracking';
COMMENT ON TABLE guest_reading_patterns IS 'Patrones de lectura de guests para analytics';
COMMENT ON TABLE guest_events IS 'Eventos de comportamiento de guests';
COMMENT ON TABLE user_interest_profiles IS 'Perfiles de interés para monetización y marketing';
COMMENT ON TABLE guest_analytics_insights IS 'Insights consolidados de analytics de guests';

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

-- Mostrar todas las tablas creadas
DO $$
BEGIN
    RAISE NOTICE 'Schema unificado creado exitosamente. Tablas disponibles:';
    RAISE NOTICE '✅ readings';
    RAISE NOTICE '✅ guests';  
    RAISE NOTICE '✅ guest_reading_patterns';
    RAISE NOTICE '✅ guest_events';
    RAISE NOTICE '✅ guest_sessions';
    RAISE NOTICE '✅ guest_behavior_events';
    RAISE NOTICE '✅ user_interest_profiles';
    RAISE NOTICE '✅ guest_analytics_insights';
    RAISE NOTICE '✅ premium_ad_events';
    RAISE NOTICE 'El sistema de tracking unificado está listo! 🚀';
END $$;
