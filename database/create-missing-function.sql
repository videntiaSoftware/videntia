-- CREAR FUNCIÓN FALTANTE: get_users_pending_daily_email
-- Ejecutar este SQL en Supabase SQL Editor

-- ============================================
-- FUNCIÓN PARA OBTENER USUARIOS PENDIENTES DE EMAIL DIARIO
-- ============================================

CREATE OR REPLACE FUNCTION get_users_pending_daily_email()
RETURNS TABLE (
    user_id uuid,
    email text,
    email_confirmed boolean
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as user_id,
        u.email::text as email,
        u.email_confirmed_at IS NOT NULL as email_confirmed
    FROM auth.users u
    WHERE u.email IS NOT NULL
    AND u.email_confirmed_at IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM daily_email_logs del
        WHERE del.user_id = u.id
        AND del.sent_at::date = CURRENT_DATE
        AND del.email_status = 'sent'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dar permisos necesarios
GRANT EXECUTE ON FUNCTION get_users_pending_daily_email() TO service_role;

-- Verificar que la función fue creada
SELECT 'Función get_users_pending_daily_email creada exitosamente' as status;
