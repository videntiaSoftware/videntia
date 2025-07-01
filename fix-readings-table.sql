-- MIGRACIÓN URGENTE: Agregar columnas faltantes a tabla readings
-- Ejecutar en Supabase SQL Editor

-- Verificar columnas existentes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'readings' 
ORDER BY ordinal_position;

-- Agregar columnas faltantes una por una (con IF NOT EXISTS simulado)

-- 1. ip_address
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'ip_address'
    ) THEN
        ALTER TABLE readings ADD COLUMN ip_address text;
        RAISE NOTICE '✅ Columna ip_address agregada';
    ELSE
        RAISE NOTICE 'ℹ️ Columna ip_address ya existe';
    END IF;
END $$;

-- 2. fingerprint_id
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'fingerprint_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN fingerprint_id text;
        RAISE NOTICE '✅ Columna fingerprint_id agregada';
    ELSE
        RAISE NOTICE 'ℹ️ Columna fingerprint_id ya existe';
    END IF;
END $$;

-- 3. session_id
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'session_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN session_id text;
        RAISE NOTICE '✅ Columna session_id agregada';
    ELSE
        RAISE NOTICE 'ℹ️ Columna session_id ya existe';
    END IF;
END $$;

-- 4. user_agent
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'user_agent'
    ) THEN
        ALTER TABLE readings ADD COLUMN user_agent text;
        RAISE NOTICE '✅ Columna user_agent agregada';
    ELSE
        RAISE NOTICE 'ℹ️ Columna user_agent ya existe';
    END IF;
END $$;

-- 5. guest_id (la más importante)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'guest_id'
    ) THEN
        ALTER TABLE readings ADD COLUMN guest_id text;
        RAISE NOTICE '✅ Columna guest_id agregada';
    ELSE
        RAISE NOTICE 'ℹ️ Columna guest_id ya existe';
    END IF;
END $$;

-- 6. user_tier (CRÍTICA para el sistema unificado)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'readings' AND column_name = 'user_tier'
    ) THEN
        ALTER TABLE readings ADD COLUMN user_tier text DEFAULT 'guest';
        RAISE NOTICE '✅ Columna user_tier agregada con default guest';
    ELSE
        RAISE NOTICE 'ℹ️ Columna user_tier ya existe';
    END IF;
END $$;

-- Agregar índices para las nuevas columnas
CREATE INDEX IF NOT EXISTS idx_readings_guest_id ON readings(guest_id);
CREATE INDEX IF NOT EXISTS idx_readings_fingerprint_id ON readings(fingerprint_id);
CREATE INDEX IF NOT EXISTS idx_readings_session_id ON readings(session_id);
CREATE INDEX IF NOT EXISTS idx_readings_ip_address ON readings(ip_address);

-- Verificar estructura final
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'readings' 
ORDER BY ordinal_position;

-- Mensaje final
DO $$
BEGIN
    RAISE NOTICE '🎉 MIGRACIÓN DE TABLA READINGS COMPLETADA';
    RAISE NOTICE 'Ahora la tabla readings tiene todas las columnas necesarias para el sistema unificado';
END $$;
