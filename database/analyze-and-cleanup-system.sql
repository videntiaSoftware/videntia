-- 🧹 SCRIPT DE LIMPIEZA Y OPTIMIZACIÓN DEL SISTEMA SUPABASE
-- Este script identifica y limpia tablas no usadas, optimiza índices y mejora el rendimiento

-- ============================================
-- 1. IDENTIFICAR TABLAS VACÍAS
-- ============================================

-- Función para contar registros en todas las tablas
CREATE OR REPLACE FUNCTION get_table_stats()
RETURNS TABLE(
    table_name text,
    row_count bigint,
    table_size text,
    status text
) AS $$
DECLARE
    rec RECORD;
    sql_query text;
    row_count_val bigint;
BEGIN
    FOR rec IN 
        SELECT t.table_name as tname
        FROM information_schema.tables t
        WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
        AND t.table_name NOT LIKE 'pg_%'
        ORDER BY t.table_name
    LOOP
        sql_query := 'SELECT COUNT(*) FROM ' || quote_ident(rec.tname);
        EXECUTE sql_query INTO row_count_val;
        
        RETURN QUERY SELECT 
            rec.tname,
            row_count_val,
            pg_size_pretty(pg_total_relation_size(quote_ident(rec.tname))),
            CASE 
                WHEN row_count_val = 0 THEN 'EMPTY'
                WHEN row_count_val < 10 THEN 'LOW_DATA'
                WHEN row_count_val < 100 THEN 'MEDIUM_DATA'
                ELSE 'HIGH_DATA'
            END;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. EJECUTAR ANÁLISIS DE TABLAS
-- ============================================

SELECT 
    table_name,
    row_count,
    table_size,
    status,
    CASE 
        WHEN status = 'EMPTY' THEN '🗑️ CANDIDATO PARA ELIMINACIÓN'
        WHEN status = 'LOW_DATA' THEN '⚠️ REVISAR USO'
        WHEN status = 'MEDIUM_DATA' THEN '✅ EN USO'
        ELSE '🔥 TABLA ACTIVA'
    END as recommendation
FROM get_table_stats()
ORDER BY row_count DESC;

-- ============================================
-- 3. IDENTIFICAR TABLAS ESPECÍFICAS NO USADAS
-- ============================================

-- Verificar tablas que probablemente no se usan
DO $$ 
DECLARE
    empty_tables text[] := ARRAY[]::text[];
    unused_tables text[] := ARRAY[]::text[];
    table_name text;
    row_count bigint;
BEGIN
    RAISE NOTICE '🔍 ANÁLISIS DE TABLAS NO USADAS:';
    RAISE NOTICE '=====================================';
    
    -- Lista de tablas que podrían no usarse
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
        AND t.table_name IN (
            'guest_geolocation',
            'push_tokens',
            'mail_click_events',
            'card_interpretations',
            'tarot_cards',
            'premium_trials',
            'payment_transactions',
            'user_subscriptions',
            'verification_tokens'
        )
    LOOP
        EXECUTE 'SELECT COUNT(*) FROM ' || quote_ident(table_name) INTO row_count;
        
        IF row_count = 0 THEN
            empty_tables := array_append(empty_tables, table_name);
            RAISE NOTICE '🗑️ TABLA VACÍA: % (% registros)', table_name, row_count;
        ELSIF row_count < 5 THEN
            unused_tables := array_append(unused_tables, table_name);
            RAISE NOTICE '⚠️ TABLA CON POCOS DATOS: % (% registros)', table_name, row_count;
        ELSE
            RAISE NOTICE '✅ TABLA EN USO: % (% registros)', table_name, row_count;
        END IF;
    END LOOP;
    
    RAISE NOTICE '';
    RAISE NOTICE '📊 RESUMEN:';
    RAISE NOTICE 'Tablas vacías: %', array_length(empty_tables, 1);
    RAISE NOTICE 'Tablas con pocos datos: %', array_length(unused_tables, 1);
    
    -- Generar script de limpieza
    IF array_length(empty_tables, 1) > 0 THEN
        RAISE NOTICE '';
        RAISE NOTICE '🧹 SCRIPT DE LIMPIEZA RECOMENDADO:';
        RAISE NOTICE '-- Ejecutar con precaución';
        FOREACH table_name IN ARRAY empty_tables
        LOOP
            RAISE NOTICE '-- DROP TABLE IF EXISTS % CASCADE;', table_name;
        END LOOP;
    END IF;
END $$;

-- ============================================
-- 4. OPTIMIZAR ÍNDICES
-- ============================================

-- Verificar índices faltantes en tablas principales
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🚀 OPTIMIZANDO ÍNDICES:';
    RAISE NOTICE '========================';
    
    -- Crear índices faltantes si no existen
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_readings_guest_id') THEN
        CREATE INDEX idx_readings_guest_id ON readings(guest_id);
        RAISE NOTICE '✅ Índice creado: idx_readings_guest_id';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_readings_user_id') THEN
        CREATE INDEX idx_readings_user_id ON readings(user_id);
        RAISE NOTICE '✅ Índice creado: idx_readings_user_id';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_readings_created_at') THEN
        CREATE INDEX idx_readings_created_at ON readings(created_at);
        RAISE NOTICE '✅ Índice creado: idx_readings_created_at';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_readings_reading_type') THEN
        CREATE INDEX idx_readings_reading_type ON readings(reading_type);
        RAISE NOTICE '✅ Índice creado: idx_readings_reading_type';
    END IF;
    
    -- Índices para guests
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_guests_guest_id') THEN
        CREATE INDEX idx_guests_guest_id ON guests(guest_id);
        RAISE NOTICE '✅ Índice creado: idx_guests_guest_id';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_guests_last_seen') THEN
        CREATE INDEX idx_guests_last_seen ON guests(last_seen_at);
        RAISE NOTICE '✅ Índice creado: idx_guests_last_seen';
    END IF;
    
    -- Índices para user_interest_profiles
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_interest_profiles_guest_id') THEN
        CREATE INDEX idx_interest_profiles_guest_id ON user_interest_profiles(guest_id);
        RAISE NOTICE '✅ Índice creado: idx_interest_profiles_guest_id';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_interest_profiles_commercial_value') THEN
        CREATE INDEX idx_interest_profiles_commercial_value ON user_interest_profiles(commercial_value);
        RAISE NOTICE '✅ Índice creado: idx_interest_profiles_commercial_value';
    END IF;
    
    RAISE NOTICE '🎯 Optimización de índices completada';
END $$;

-- ============================================
-- 5. VERIFICAR INTEGRIDAD REFERENCIAL
-- ============================================

-- Verificar que no hay datos huérfanos
DO $$
DECLARE
    orphan_count integer;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🔍 VERIFICANDO INTEGRIDAD REFERENCIAL:';
    RAISE NOTICE '=====================================';
    
    -- Verificar readings huérfanos (sin guest_id ni user_id)
    SELECT COUNT(*) INTO orphan_count 
    FROM readings 
    WHERE guest_id IS NULL AND user_id IS NULL;
    
    IF orphan_count > 0 THEN
        RAISE NOTICE '⚠️ READINGS HUÉRFANOS: % (sin guest_id ni user_id)', orphan_count;
        RAISE NOTICE '   Recomendación: Asignar guest_id o eliminar';
    ELSE
        RAISE NOTICE '✅ No hay readings huérfanos';
    END IF;
    
    -- Verificar guest_reading_patterns sin guest correspondiente
    SELECT COUNT(*) INTO orphan_count 
    FROM guest_reading_patterns grp
    WHERE NOT EXISTS (
        SELECT 1 FROM guests g WHERE g.guest_id = grp.guest_id
    );
    
    IF orphan_count > 0 THEN
        RAISE NOTICE '⚠️ PATRONES HUÉRFANOS: % (sin guest correspondiente)', orphan_count;
        RAISE NOTICE '   Recomendación: Crear guests faltantes o eliminar patrones';
    ELSE
        RAISE NOTICE '✅ No hay patrones huérfanos';
    END IF;
    
    -- Verificar user_interest_profiles sin datos correspondientes
    SELECT COUNT(*) INTO orphan_count 
    FROM user_interest_profiles uip
    WHERE NOT EXISTS (
        SELECT 1 FROM readings r WHERE r.guest_id = uip.guest_id
    );
    
    IF orphan_count > 0 THEN
        RAISE NOTICE '⚠️ PERFILES DE INTERÉS HUÉRFANOS: % (sin readings)', orphan_count;
        RAISE NOTICE '   Recomendación: Crear readings correspondientes o eliminar perfiles';
    ELSE
        RAISE NOTICE '✅ No hay perfiles de interés huérfanos';
    END IF;
    
    RAISE NOTICE '🎯 Verificación de integridad completada';
END $$;

-- ============================================
-- 6. ESTADÍSTICAS FINALES
-- ============================================

DO $$
DECLARE
    total_readings bigint;
    total_guests bigint;
    total_profiles bigint;
    total_patterns bigint;
    db_size text;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '📊 ESTADÍSTICAS FINALES DEL SISTEMA:';
    RAISE NOTICE '====================================';
    
    SELECT COUNT(*) INTO total_readings FROM readings;
    SELECT COUNT(*) INTO total_guests FROM guests;
    SELECT COUNT(*) INTO total_profiles FROM user_interest_profiles;
    SELECT COUNT(*) INTO total_patterns FROM guest_reading_patterns;
    
    SELECT pg_size_pretty(pg_database_size(current_database())) INTO db_size;
    
    RAISE NOTICE '📈 Readings totales: %', total_readings;
    RAISE NOTICE '👥 Guests totales: %', total_guests;
    RAISE NOTICE '💰 Perfiles de interés: %', total_profiles;
    RAISE NOTICE '📊 Patrones de lectura: %', total_patterns;
    RAISE NOTICE '💾 Tamaño de base de datos: %', db_size;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ ANÁLISIS COMPLETO TERMINADO';
    RAISE NOTICE '🚀 Sistema optimizado y limpio';
END $$;

-- ============================================
-- 7. LIMPIAR FUNCIONES TEMPORALES
-- ============================================

DROP FUNCTION IF EXISTS get_table_stats();

-- ============================================
-- 8. COMENTARIOS FINALES
-- ============================================

/*
🎯 RECOMENDACIONES POST-LIMPIEZA:

1. TABLAS CRÍTICAS (NO ELIMINAR):
   - readings (principal)
   - guests
   - user_interest_profiles
   - guest_reading_patterns
   - profiles, accounts, sessions (auth)

2. TABLAS OPCIONALES (evaluar eliminar si vacías):
   - guest_geolocation
   - push_tokens
   - mail_click_events
   - card_interpretations
   - tarot_cards
   - premium_trials
   - payment_transactions
   - user_subscriptions

3. PRÓXIMOS PASOS:
   - Ejecutar test-complete-system.sh
   - Verificar funcionamiento
   - Monitorear rendimiento
   - Hacer backup antes de eliminar tablas
*/
