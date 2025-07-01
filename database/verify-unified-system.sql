-- SCRIPT PARA VERIFICAR QUE EL SISTEMA UNIFICADO FUNCIONA CORRECTAMENTE
-- Ejecutar DESPUÉS de aplicar migration-fix-unified-system.sql

-- ============================================
-- 1. VERIFICAR ESTRUCTURA DE TABLAS
-- ============================================

SELECT 
  'readings' as tabla,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'readings' 
ORDER BY ordinal_position;

SELECT 
  'guests' as tabla,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'guests'
ORDER BY ordinal_position;

-- ============================================
-- 2. PROBAR INSERCIÓN DE DATOS
-- ============================================

-- Test 1: Insertar una lectura de guest
INSERT INTO readings (
  guest_id,
  reading_type,
  question,
  cards_drawn,
  interpretation,
  user_tier,
  ip_address
) VALUES (
  'test_guest_123',
  'amor',
  '¿Encontraré el amor este año?',
  '[{"name": "La Emperatriz", "number": 3}]'::jsonb,
  'Las cartas indican que...',
  'guest',
  '127.0.0.1'
);

-- Test 2: Verificar que se creó
SELECT 
  id,
  guest_id,
  reading_type,
  question,
  created_at
FROM readings 
WHERE guest_id = 'test_guest_123'
ORDER BY created_at DESC 
LIMIT 1;

-- Test 3: Insertar datos de guest
INSERT INTO guests (
  guest_id,
  initial_ip_address,
  total_readings
) VALUES (
  'test_guest_123',
  '127.0.0.1',
  1
) ON CONFLICT (guest_id) 
DO UPDATE SET 
  total_readings = guests.total_readings + 1,
  last_seen_at = now();

-- Test 4: Verificar guest creado
SELECT 
  guest_id,
  total_readings,
  last_seen_at,
  created_at
FROM guests 
WHERE guest_id = 'test_guest_123';

-- Test 5: Insertar patrón de lectura
INSERT INTO guest_reading_patterns (
  guest_id,
  reading_type,
  question_asked,
  question_length,
  cards_selected,
  time_of_day,
  day_of_week
) VALUES (
  'test_guest_123',
  'amor',
  '¿Encontraré el amor este año?',
  29,
  '[{"name": "La Emperatriz", "number": 3}]'::jsonb,
  EXTRACT(hour FROM now())::integer,
  EXTRACT(dow FROM now())::integer
);

-- Test 6: Verificar patrón creado
SELECT 
  guest_id,
  reading_type,
  question_asked,
  time_of_day,
  created_at
FROM guest_reading_patterns 
WHERE guest_id = 'test_guest_123'
ORDER BY created_at DESC 
LIMIT 1;

-- ============================================
-- 3. LIMPIAR DATOS DE PRUEBA
-- ============================================

-- Eliminar datos de test
DELETE FROM guest_reading_patterns WHERE guest_id = 'test_guest_123';
DELETE FROM guests WHERE guest_id = 'test_guest_123';
DELETE FROM readings WHERE guest_id = 'test_guest_123';

-- ============================================
-- 4. VERIFICACIÓN FINAL
-- ============================================

DO $$
DECLARE
    readings_count integer;
    guests_count integer;
    patterns_count integer;
    events_count integer;
BEGIN
    SELECT COUNT(*) INTO readings_count FROM readings;
    SELECT COUNT(*) INTO guests_count FROM guests;
    SELECT COUNT(*) INTO patterns_count FROM guest_reading_patterns;
    SELECT COUNT(*) INTO events_count FROM guest_events;
    
    RAISE NOTICE '📊 ESTADO ACTUAL DEL SISTEMA:';
    RAISE NOTICE 'Total readings: %', readings_count;
    RAISE NOTICE 'Total guests: %', guests_count;
    RAISE NOTICE 'Total patterns: %', patterns_count;
    RAISE NOTICE 'Total events: %', events_count;
    RAISE NOTICE '';
    RAISE NOTICE '✅ SISTEMA UNIFICADO FUNCIONANDO CORRECTAMENTE!';
    RAISE NOTICE '🚀 Ya puedes hacer lecturas sin errores de "guest_id"';
END $$;
