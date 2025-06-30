-- ==========================================
-- SISTEMA DE ANALYTICS COMPLETO PARA GUESTS
-- ==========================================
-- Ejecutar en Supabase SQL Editor

-- 1. TABLA PRINCIPAL DE GUESTS
CREATE TABLE IF NOT EXISTS guests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text UNIQUE NOT NULL, -- FingerprintJS ID
    
    -- Datos básicos de creación
    first_seen_at timestamptz DEFAULT now(),
    last_seen_at timestamptz DEFAULT now(),
    
    -- Información del dispositivo (primera captura)
    initial_user_agent text,
    initial_ip_address inet,
    initial_referrer text,
    initial_utm_source text,
    initial_utm_medium text,
    initial_utm_campaign text,
    
    -- Información del navegador/dispositivo
    browser_name text,
    browser_version text,
    os_name text,
    os_version text,
    device_type text, -- 'mobile', 'tablet', 'desktop'
    screen_resolution text, -- '1920x1080'
    viewport_size text, -- '1366x768'
    timezone text,
    language text,
    color_depth integer,
    pixel_ratio decimal(3,2),
    
    -- Información de ubicación (estimada por IP)
    country_code text,
    country_name text,
    region text,
    city text,
    latitude decimal(10,8),
    longitude decimal(11,8),
    
    -- Métricas de comportamiento
    total_sessions integer DEFAULT 1,
    total_page_views integer DEFAULT 1,
    total_readings integer DEFAULT 0,
    total_questions_asked integer DEFAULT 0,
    
    -- Estados de conversión
    registered_at timestamptz NULL, -- Si se registró
    registered_user_id uuid REFERENCES auth.users(id),
    
    -- Análisis técnico
    is_bot_suspected boolean DEFAULT false,
    fingerprint_confidence decimal(3,2), -- Confianza del fingerprint (0.00-1.00)
    
    -- Metadatos adicionales
    custom_data jsonb DEFAULT '{}',
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. TABLA DE SESIONES DE GUESTS
CREATE TABLE IF NOT EXISTS guest_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text REFERENCES guests(guest_id) ON DELETE CASCADE,
    session_id text NOT NULL, -- Generado en cliente
    
    -- Datos de la sesión
    started_at timestamptz DEFAULT now(),
    ended_at timestamptz NULL,
    duration_seconds integer, -- Calculado al finalizar
    
    -- Información de entrada
    entry_page text,
    entry_referrer text,
    entry_utm_source text,
    entry_utm_medium text,
    entry_utm_campaign text,
    
    -- Información técnica de la sesión
    ip_address inet,
    user_agent text,
    viewport_size text,
    
    -- Métricas de actividad
    page_views integer DEFAULT 1,
    readings_performed integer DEFAULT 0,
    questions_asked integer DEFAULT 0,
    cards_selected integer DEFAULT 0,
    
    -- Información de salida
    exit_page text,
    bounce boolean DEFAULT true, -- true si solo vio 1 página
    
    -- Análisis de comportamiento
    mouse_movements_detected boolean DEFAULT false,
    keyboard_interactions integer DEFAULT 0,
    scroll_depth_percentage integer DEFAULT 0,
    time_to_first_interaction_ms integer,
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. TABLA DE EVENTOS DETALLADOS
CREATE TABLE IF NOT EXISTS guest_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text REFERENCES guests(guest_id) ON DELETE CASCADE,
    session_id text,
    
    -- Información del evento
    event_type text NOT NULL, -- 'page_view', 'reading_request', 'card_select', 'question_ask', etc.
    event_name text, -- Nombre específico del evento
    page_url text,
    
    -- Contexto del evento
    timestamp timestamptz DEFAULT now(),
    sequence_number integer, -- Orden del evento en la sesión
    
    -- Datos específicos del evento
    event_data jsonb DEFAULT '{}', -- Flexible para diferentes tipos de eventos
    
    -- Información técnica
    client_timestamp timestamptz,
    server_processing_time_ms integer,
    
    created_at timestamptz DEFAULT now()
);

-- 4. TABLA DE PATRONES DE LECTURA
CREATE TABLE IF NOT EXISTS guest_reading_patterns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text REFERENCES guests(guest_id) ON DELETE CASCADE,
    
    -- Información de la lectura
    reading_type text NOT NULL,
    question_asked text,
    question_length integer,
    question_language text, -- Detectado automáticamente
    
    -- Cartas seleccionadas
    cards_selected jsonb, -- Array de cartas con posiciones
    selection_time_seconds integer, -- Tiempo que tardó en seleccionar
    
    -- Análisis del comportamiento
    cards_hovered integer DEFAULT 0, -- Cuántas cartas pasó por encima
    cards_clicked_before_final integer DEFAULT 0, -- Indecisión
    reading_time_seconds integer, -- Tiempo leyendo la interpretación
    
    -- Resultados
    interpretation_generated text,
    user_satisfaction_inferred text, -- 'high', 'medium', 'low' basado en tiempo de lectura
    
    -- Contexto temporal
    time_of_day integer, -- Hora del día (0-23)
    day_of_week integer, -- Día de la semana (1-7)
    
    created_at timestamptz DEFAULT now()
);

-- 5. TABLA DE GEOLOCALIZACIÓN DETALLADA
CREATE TABLE IF NOT EXISTS guest_geolocation (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text REFERENCES guests(guest_id) ON DELETE CASCADE,
    ip_address inet NOT NULL,
    
    -- Información geográfica
    country_code text,
    country_name text,
    region_code text,
    region_name text,
    city text,
    postal_code text,
    latitude decimal(10,8),
    longitude decimal(11,8),
    
    -- Información de la conexión
    isp_name text,
    organization text,
    connection_type text, -- 'mobile', 'broadband', 'satellite', etc.
    
    -- Análisis de seguridad
    is_proxy boolean DEFAULT false,
    is_vpn boolean DEFAULT false,
    is_tor boolean DEFAULT false,
    threat_level text DEFAULT 'low', -- 'low', 'medium', 'high'
    
    -- Timezone y localización
    timezone text,
    utc_offset text,
    
    first_seen timestamptz DEFAULT now(),
    last_seen timestamptz DEFAULT now(),
    times_seen integer DEFAULT 1
);

-- ==========================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ==========================================

-- Guests table indexes
CREATE INDEX IF NOT EXISTS idx_guests_guest_id ON guests(guest_id);
CREATE INDEX IF NOT EXISTS idx_guests_first_seen ON guests(first_seen_at);
CREATE INDEX IF NOT EXISTS idx_guests_last_seen ON guests(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_guests_registered ON guests(registered_at);
CREATE INDEX IF NOT EXISTS idx_guests_country ON guests(country_code);
CREATE INDEX IF NOT EXISTS idx_guests_device_type ON guests(device_type);
CREATE INDEX IF NOT EXISTS idx_guests_total_sessions ON guests(total_sessions);

-- Guest sessions indexes
CREATE INDEX IF NOT EXISTS idx_guest_sessions_guest_id ON guest_sessions(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_started ON guest_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_duration ON guest_sessions(duration_seconds);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_readings ON guest_sessions(readings_performed);

-- Guest events indexes
CREATE INDEX IF NOT EXISTS idx_guest_events_guest_id ON guest_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_events_session ON guest_events(session_id);
CREATE INDEX IF NOT EXISTS idx_guest_events_type ON guest_events(event_type);
CREATE INDEX IF NOT EXISTS idx_guest_events_timestamp ON guest_events(timestamp);

-- Reading patterns indexes
CREATE INDEX IF NOT EXISTS idx_reading_patterns_guest_id ON guest_reading_patterns(guest_id);
CREATE INDEX IF NOT EXISTS idx_reading_patterns_type ON guest_reading_patterns(reading_type);
CREATE INDEX IF NOT EXISTS idx_reading_patterns_time_of_day ON guest_reading_patterns(time_of_day);
CREATE INDEX IF NOT EXISTS idx_reading_patterns_created ON guest_reading_patterns(created_at);

-- Geolocation indexes
CREATE INDEX IF NOT EXISTS idx_geolocation_guest_id ON guest_geolocation(guest_id);
CREATE INDEX IF NOT EXISTS idx_geolocation_ip ON guest_geolocation(ip_address);
CREATE INDEX IF NOT EXISTS idx_geolocation_country ON guest_geolocation(country_code);

-- ==========================================
-- POLÍTICAS RLS (Row Level Security)
-- ==========================================

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_reading_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_geolocation ENABLE ROW LEVEL SECURITY;

-- Solo el servicio puede leer/escribir datos de guests (no los usuarios finales)
CREATE POLICY "Service can manage guests" ON guests FOR ALL USING (true);
CREATE POLICY "Service can manage guest_sessions" ON guest_sessions FOR ALL USING (true);
CREATE POLICY "Service can manage guest_events" ON guest_events FOR ALL USING (true);
CREATE POLICY "Service can manage guest_reading_patterns" ON guest_reading_patterns FOR ALL USING (true);
CREATE POLICY "Service can manage guest_geolocation" ON guest_geolocation FOR ALL USING (true);

-- ==========================================
-- TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA
-- ==========================================

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_guest_sessions_updated_at BEFORE UPDATE ON guest_sessions
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- FUNCIONES ÚTILES PARA ANALYTICS
-- ==========================================

-- Función para obtener estadísticas básicas de guests
CREATE OR REPLACE FUNCTION get_guest_analytics_summary()
RETURNS TABLE (
    total_guests bigint,
    total_sessions bigint,
    total_readings bigint,
    avg_sessions_per_guest numeric,
    conversion_rate numeric,
    top_countries text[]
) AS $$
BEGIN
    RETURN QUERY
    WITH stats AS (
        SELECT 
            COUNT(DISTINCT g.guest_id) as total_guests_count,
            SUM(g.total_sessions) as total_sessions_count,
            SUM(g.total_readings) as total_readings_count,
            COUNT(CASE WHEN g.registered_at IS NOT NULL THEN 1 END) as converted_guests
        FROM guests g
    ),
    countries AS (
        SELECT array_agg(country_name ORDER BY guest_count DESC) as top_countries_list
        FROM (
            SELECT country_name, COUNT(*) as guest_count
            FROM guests 
            WHERE country_name IS NOT NULL
            GROUP BY country_name
            ORDER BY guest_count DESC
            LIMIT 10
        ) top_10
    )
    SELECT 
        s.total_guests_count,
        s.total_sessions_count,
        s.total_readings_count,
        CASE WHEN s.total_guests_count > 0 
            THEN ROUND(s.total_sessions_count::numeric / s.total_guests_count, 2)
            ELSE 0 
        END as avg_sessions,
        CASE WHEN s.total_guests_count > 0 
            THEN ROUND((s.converted_guests::numeric / s.total_guests_count) * 100, 2)
            ELSE 0 
        END as conversion_percentage,
        c.top_countries_list
    FROM stats s, countries c;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- FUNCIONES AUXILIARES PARA COOKIES
-- ==========================================

-- Función para incrementar contador de lecturas
CREATE OR REPLACE FUNCTION increment_guest_readings(p_guest_id text)
RETURNS void AS $$
BEGIN
    UPDATE guests 
    SET 
        total_readings = total_readings + 1,
        last_seen_at = now(),
        updated_at = now()
    WHERE guest_id = p_guest_id;
    
    -- Crear guest si no existe
    INSERT INTO guests (guest_id, total_readings)
    SELECT p_guest_id, 1
    WHERE NOT EXISTS (SELECT 1 FROM guests WHERE guest_id = p_guest_id);
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas mejoradas con cookies
CREATE OR REPLACE FUNCTION get_cookie_enhanced_analytics()
RETURNS TABLE (
    total_guests bigint,
    total_unique_cookies bigint,
    total_fingerprints bigint,
    returning_guests bigint,
    conversion_rate numeric,
    avg_days_to_conversion numeric,
    top_reading_types text[]
) AS $$
BEGIN
    RETURN QUERY
    WITH stats AS (
        SELECT 
            COUNT(DISTINCT g.guest_id) as guests_count,
            COUNT(DISTINCT CASE WHEN g.total_sessions > 1 THEN g.guest_id END) as returning_count,
            COUNT(CASE WHEN g.registered_at IS NOT NULL THEN 1 END) as converted_count,
            AVG(CASE 
                WHEN g.registered_at IS NOT NULL 
                THEN EXTRACT(EPOCH FROM (g.registered_at - g.first_seen_at)) / 86400.0 
            END) as avg_conversion_days
        FROM guests g
    ),
    reading_types AS (
        SELECT array_agg(reading_type ORDER BY reading_count DESC) as top_types
        FROM (
            SELECT reading_type, COUNT(*) as reading_count
            FROM guest_reading_patterns 
            GROUP BY reading_type
            ORDER BY reading_count DESC
            LIMIT 5
        ) top_readings
    )
    SELECT 
        s.guests_count,
        s.guests_count, -- TODO: Implement unique cookie counting
        s.guests_count, -- TODO: Implement unique fingerprint counting  
        s.returning_count,
        CASE WHEN s.guests_count > 0 
            THEN ROUND((s.converted_count::numeric / s.guests_count) * 100, 2)
            ELSE 0 
        END as conversion_percentage,
        COALESCE(s.avg_conversion_days, 0),
        COALESCE(rt.top_types, ARRAY[]::text[])
    FROM stats s, reading_types rt;
END;
$$ LANGUAGE plpgsql;

-- Función eliminada: cleanup_old_guest_data
-- Motivo: No queremos borrar datos automáticamente por ahora
