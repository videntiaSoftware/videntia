-- MIGRACIÓN SEGURA PARA ARREGLAR EL SISTEMA UNIFICADO
-- Aplicar este SQL en Supabase SQL Editor

-- ============================================
-- 1. AGREGAR COLUMNAS FALTANTES A TABLA READINGS
-- ============================================

-- Agregar guest_id a readings si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'guest_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN guest_id text;
        RAISE NOTICE '✅ Columna guest_id agregada a tabla readings';
    ELSE
        RAISE NOTICE 'ℹ️ Columna guest_id ya existe en tabla readings';
    END IF;
END $$;

-- Agregar fingerprint_id a readings si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'fingerprint_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN fingerprint_id text;
        RAISE NOTICE '✅ Columna fingerprint_id agregada a tabla readings';
    ELSE
        RAISE NOTICE 'ℹ️ Columna fingerprint_id ya existe en tabla readings';
    END IF;
END $$;

-- Agregar session_id a readings si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'session_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN session_id text;
        RAISE NOTICE '✅ Columna session_id agregada a tabla readings';
    ELSE
        RAISE NOTICE 'ℹ️ Columna session_id ya existe en tabla readings';
    END IF;
END $$;

-- Agregar user_agent a readings si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'user_agent'
    ) THEN
        ALTER TABLE readings ADD COLUMN user_agent text;
        RAISE NOTICE '✅ Columna user_agent agregada a tabla readings';
    ELSE
        RAISE NOTICE 'ℹ️ Columna user_agent ya existe en tabla readings';
    END IF;
END $$;

-- ============================================
-- 2. CREAR TABLAS FALTANTES PARA SISTEMA UNIFICADO
-- ============================================

-- Tabla guests
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

-- Tabla guest_reading_patterns
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

-- Tabla guest_events
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

-- Tabla guest_sessions
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
-- 3. CREAR ÍNDICES FALTANTES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_readings_guest_id ON readings(guest_id);
CREATE INDEX IF NOT EXISTS idx_readings_fingerprint_id ON readings(fingerprint_id);
CREATE INDEX IF NOT EXISTS idx_readings_session_id ON readings(session_id);

CREATE INDEX IF NOT EXISTS idx_guests_guest_id ON guests(guest_id);
CREATE INDEX IF NOT EXISTS idx_guests_last_seen_at ON guests(last_seen_at);

CREATE INDEX IF NOT EXISTS idx_guest_reading_patterns_guest_id ON guest_reading_patterns(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_reading_patterns_created_at ON guest_reading_patterns(created_at);

CREATE INDEX IF NOT EXISTS idx_guest_events_guest_id ON guest_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_events_timestamp ON guest_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_guest_events_session_id ON guest_events(session_id);

CREATE INDEX IF NOT EXISTS idx_guest_sessions_guest_id ON guest_sessions(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_session_id ON guest_sessions(session_id);

-- ============================================
-- 4. FUNCIÓN PARA INCREMENTAR LECTURAS DE GUEST
-- ============================================

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

-- ============================================
-- 5. VERIFICACIÓN FINAL
-- ============================================

DO $$
DECLARE
    readings_guest_id_exists boolean;
    guests_table_exists boolean;
    patterns_table_exists boolean;
    events_table_exists boolean;
BEGIN
    -- Verificar si guest_id existe en readings
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'guest_id'
    ) INTO readings_guest_id_exists;
    
    -- Verificar si las tablas existen
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'guests'
    ) INTO guests_table_exists;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'guest_reading_patterns'
    ) INTO patterns_table_exists;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'guest_events'
    ) INTO events_table_exists;
    
    RAISE NOTICE '🔍 VERIFICACIÓN DE MIGRACIÓN:';
    RAISE NOTICE 'readings.guest_id: %', CASE WHEN readings_guest_id_exists THEN '✅' ELSE '❌' END;
    RAISE NOTICE 'tabla guests: %', CASE WHEN guests_table_exists THEN '✅' ELSE '❌' END;
    RAISE NOTICE 'tabla guest_reading_patterns: %', CASE WHEN patterns_table_exists THEN '✅' ELSE '❌' END;
    RAISE NOTICE 'tabla guest_events: %', CASE WHEN events_table_exists THEN '✅' ELSE '❌' END;
    
    IF readings_guest_id_exists AND guests_table_exists AND patterns_table_exists AND events_table_exists THEN
        RAISE NOTICE '🚀 MIGRACIÓN COMPLETADA - El sistema unificado está listo!';
    ELSE
        RAISE NOTICE '⚠️ MIGRACIÓN INCOMPLETA - Revisar errores arriba';
    END IF;
END $$;
