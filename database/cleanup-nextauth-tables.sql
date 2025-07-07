-- 🧹 LIMPIEZA DE TABLAS NEXTAUTH NO USADAS
-- Ejecutar SOLO después de confirmar que el sistema usa 100% Supabase Auth

-- ❌ ELIMINAR TABLAS NEXTAUTH (no usadas con Supabase Auth)
-- Estas tablas eran para NextAuth, pero ahora usamos Supabase Auth nativo

-- 1. Verificar que están vacías
SELECT 'profiles' as table_name, COUNT(*) as rows FROM profiles
UNION ALL
SELECT 'accounts' as table_name, COUNT(*) as rows FROM accounts
UNION ALL
SELECT 'sessions' as table_name, COUNT(*) as rows FROM sessions
UNION ALL
SELECT 'verification_tokens' as table_name, COUNT(*) as rows FROM verification_tokens;

-- 2. Si todas están vacías (0 rows), proceder con limpieza
-- DROP TABLE IF EXISTS verification_tokens;
-- DROP TABLE IF EXISTS sessions;
-- DROP TABLE IF EXISTS accounts;
-- DROP TABLE IF EXISTS profiles;

-- ⚠️ IMPORTANTE: Solo ejecutar después de confirmar migración completa a Supabase Auth

-- 3. Eliminar tablas no usadas del sistema guest/monetización
DROP TABLE IF EXISTS guest_events;
DROP TABLE IF EXISTS guest_sessions;
DROP TABLE IF EXISTS guest_analytics_insights;
DROP TABLE IF EXISTS guest_geolocation;
DROP TABLE IF EXISTS premium_ad_performance;
DROP TABLE IF EXISTS premium_ad_events;
DROP TABLE IF EXISTS lead_sales_log;
DROP TABLE IF EXISTS daily_email_logs;
DROP TABLE IF EXISTS mail_click_events;
DROP TABLE IF EXISTS push_tokens;

-- 4. Verificar tablas restantes
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
