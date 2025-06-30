-- Enhanced Guest Analytics for Data Monetization
-- Este archivo crea las tablas necesarias para monetizar los datos de cookies

-- 1. Tabla principal de insights de usuarios (datos "vendibles")
CREATE TABLE IF NOT EXISTS guest_analytics_insights (
  id BIGSERIAL PRIMARY KEY,
  guest_id TEXT NOT NULL,
  fingerprint_id TEXT,
  
  -- Datos demográficos inferidos
  country_code TEXT, -- del IP
  region TEXT,
  city TEXT,
  timezone TEXT,
  device_type TEXT, -- mobile/desktop/tablet
  os TEXT,
  browser TEXT,
  language TEXT,
  
  -- Patrones de comportamiento (MUY VALIOSOS)
  session_duration INTEGER, -- segundos
  pages_viewed INTEGER,
  tarot_cards_viewed TEXT[], -- array de cartas vistas
  reading_types_preferred TEXT[], -- tipos de lectura preferidos
  visit_frequency TEXT, -- daily/weekly/monthly
  engagement_level TEXT, -- high/medium/low
  time_of_day_pattern TEXT, -- morning/afternoon/evening/night
  day_of_week_pattern TEXT[], -- [monday, wednesday, friday]
  
  -- Datos psicográficos (PREMIUM DATA)
  spiritual_interests TEXT[], -- tarot, astrology, crystals, etc
  personality_traits TEXT[], -- inferidos de cartas elegidas
  life_focus_areas TEXT[], -- love, career, health, etc
  decision_making_style TEXT, -- intuitive/analytical
  
  -- Datos comerciales
  ad_engagement_score FLOAT, -- 0-100
  premium_likelihood FLOAT, -- 0-100
  lifetime_value_estimate FLOAT, -- USD estimado
  
  -- Timestamps
  first_visit TIMESTAMPTZ NOT NULL,
  last_visit TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_guest_analytics_guest_id ON guest_analytics_insights(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_country ON guest_analytics_insights(country_code);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_engagement ON guest_analytics_insights(engagement_level);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_premium ON guest_analytics_insights(premium_likelihood DESC);

-- 2. Tabla de eventos de comportamiento granular
CREATE TABLE IF NOT EXISTS guest_behavior_events (
  id BIGSERIAL PRIMARY KEY,
  guest_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- card_view, reading_start, reading_complete, ad_view, etc
  event_data JSONB, -- datos específicos del evento
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_behavior_events_guest_id ON guest_behavior_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_behavior_events_type ON guest_behavior_events(event_type);
CREATE INDEX IF NOT EXISTS idx_behavior_events_timestamp ON guest_behavior_events(timestamp DESC);

-- 3. Segmentos de audiencia para targeting
CREATE TABLE IF NOT EXISTS audience_segments (
  id BIGSERIAL PRIMARY KEY,
  segment_name TEXT UNIQUE NOT NULL,
  description TEXT,
  criteria JSONB, -- condiciones para pertenecer al segmento
  estimated_value_per_user FLOAT, -- valor estimado por usuario
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar segmentos iniciales
INSERT INTO audience_segments (segment_name, description, criteria, estimated_value_per_user) VALUES
('high_engagement_spirituality', 'Usuarios altamente comprometidos con contenido espiritual', 
 '{"min_sessions": 5, "spiritual_interests": ["tarot", "astrology"], "engagement_level": "high"}', 8.50),
('premium_likely', 'Usuarios con alta probabilidad de conversión premium',
 '{"premium_likelihood": {"min": 70}, "session_duration": {"min": 300}}', 12.30),
('love_focused', 'Usuarios interesados en lecturas de amor',
 '{"life_focus_areas": ["love"], "reading_types": ["love_reading"]}', 6.80),
('career_seekers', 'Usuarios enfocados en carrera profesional',
 '{"life_focus_areas": ["career"], "time_of_day": ["morning", "afternoon"]}', 9.20);

-- 4. Función para calcular insights automáticamente
CREATE OR REPLACE FUNCTION calculate_guest_insights(p_guest_id TEXT)
RETURNS VOID AS $$
DECLARE
    v_events_count INTEGER;
    v_avg_session_duration FLOAT;
    v_engagement_score FLOAT;
    v_premium_likelihood FLOAT;
BEGIN
    -- Contar eventos del usuario
    SELECT COUNT(*) INTO v_events_count
    FROM guest_behavior_events 
    WHERE guest_id = p_guest_id;
    
    -- Calcular duración promedio de sesión
    SELECT AVG(EXTRACT(EPOCH FROM (
        last_visit::timestamp - first_visit::timestamp
    ))) INTO v_avg_session_duration
    FROM guest_analytics_insights 
    WHERE guest_id = p_guest_id;
    
    -- Calcular engagement score (0-100)
    v_engagement_score := LEAST(100, (v_events_count * 2) + (COALESCE(v_avg_session_duration, 0) / 60));
    
    -- Calcular likelihood de premium (basado en engagement y tiempo)
    v_premium_likelihood := LEAST(100, v_engagement_score * 1.2);
    
    -- Actualizar insights
    INSERT INTO guest_analytics_insights (
        guest_id, 
        engagement_level,
        ad_engagement_score,
        premium_likelihood,
        lifetime_value_estimate,
        first_visit,
        last_visit
    ) VALUES (
        p_guest_id,
        CASE 
            WHEN v_engagement_score > 70 THEN 'high'
            WHEN v_engagement_score > 40 THEN 'medium'
            ELSE 'low'
        END,
        v_engagement_score,
        v_premium_likelihood,
        v_premium_likelihood * 0.15, -- $0.15 por punto de likelihood
        NOW(),
        NOW()
    )
    ON CONFLICT (guest_id) DO UPDATE SET
        engagement_level = EXCLUDED.engagement_level,
        ad_engagement_score = EXCLUDED.ad_engagement_score,
        premium_likelihood = EXCLUDED.premium_likelihood,
        lifetime_value_estimate = EXCLUDED.lifetime_value_estimate,
        last_visit = NOW(),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- 5. Función para exportar datos anonimizados (para venta)
CREATE OR REPLACE FUNCTION export_anonymized_insights(
    p_segment_name TEXT DEFAULT NULL,
    p_min_value FLOAT DEFAULT 0
)
RETURNS TABLE (
    anonymous_id TEXT,
    country_code TEXT,
    device_type TEXT,
    spiritual_interests TEXT[],
    engagement_level TEXT,
    ad_engagement_score FLOAT,
    estimated_value FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        MD5(gai.guest_id) as anonymous_id, -- ID anonimizado
        gai.country_code,
        gai.device_type,
        gai.spiritual_interests,
        gai.engagement_level,
        gai.ad_engagement_score,
        gai.lifetime_value_estimate
    FROM guest_analytics_insights gai
    WHERE 
        (p_segment_name IS NULL OR gai.engagement_level = p_segment_name)
        AND gai.lifetime_value_estimate >= p_min_value
        AND gai.last_visit > NOW() - INTERVAL '30 days' -- datos recientes
    ORDER BY gai.lifetime_value_estimate DESC;
END;
$$ LANGUAGE plpgsql;

-- 6. Trigger para actualizar insights automáticamente
CREATE OR REPLACE FUNCTION trigger_update_insights()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar insights cuando se agrega un nuevo evento
    PERFORM calculate_guest_insights(NEW.guest_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_insights_on_event ON guest_behavior_events;
CREATE TRIGGER update_insights_on_event
    AFTER INSERT ON guest_behavior_events
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_insights();

-- Comentarios para el equipo
COMMENT ON TABLE guest_analytics_insights IS 'Datos enriquecidos de usuarios para monetización. Valor estimado: $2-15 por registro premium';
COMMENT ON TABLE audience_segments IS 'Segmentos de audiencia con valor comercial estimado';
COMMENT ON FUNCTION export_anonymized_insights IS 'Exporta datos anonimizados para venta a partners publicitarios';
