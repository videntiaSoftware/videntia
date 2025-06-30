-- Script de diagnóstico y corrección para el sistema de cartas diarias
-- Ejecutar ANTES del quick-setup.sql para limpiar problemas

-- 1. Limpiar tablas existentes (en orden correcto para evitar errores de FK)
DROP TABLE IF EXISTS user_daily_readings CASCADE;
DROP TABLE IF EXISTS card_interpretations CASCADE;
DROP TABLE IF EXISTS message_templates CASCADE;
DROP TABLE IF EXISTS tarot_cards CASCADE;

-- 2. Verificar que las tablas se eliminaron
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('tarot_cards', 'card_interpretations', 'message_templates', 'user_daily_readings');

-- 3. Ahora puedes ejecutar el quick-setup.sql completo sin conflictos

-- NOTA: Después de ejecutar este script, ejecuta el quick-setup.sql
