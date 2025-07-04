-- ============================================
-- CREAR SISTEMA DE MAILING DIARIO - VIDENTIA
-- ============================================
-- Este script crea la función y tabla faltantes para el sistema de mailing diario

-- ============================================
-- 1. CREAR TABLA daily_email_logs
-- ============================================
CREATE TABLE IF NOT EXISTS daily_email_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    card_name text,
    email_status text NOT NULL DEFAULT 'pending', -- 'sent', 'failed', 'pending'
    email_sent_at timestamptz DEFAULT now(),
    error_message text,
    created_at timestamptz DEFAULT now()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_user_id ON daily_email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_email_sent_at ON daily_email_logs(email_sent_at);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_email_status ON daily_email_logs(email_status);

-- ============================================
-- 2. CREAR FUNCIÓN get_users_pending_daily_email
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
    WHERE 
        u.email IS NOT NULL
        AND u.email_confirmed_at IS NOT NULL -- Solo usuarios con email confirmado
        AND u.id NOT IN (
            -- Excluir usuarios que ya recibieron email hoy
            SELECT DISTINCT del.user_id 
            FROM daily_email_logs del 
            WHERE del.email_sent_at >= CURRENT_DATE
            AND del.email_status = 'sent'
            AND del.user_id IS NOT NULL
        )
    ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. CREAR FUNCIÓN AUXILIAR PARA MARCAR USUARIO COMO ENVIADO
-- ============================================
CREATE OR REPLACE FUNCTION mark_daily_email_sent(
    p_user_id uuid,
    p_email text,
    p_card_name text,
    p_status text DEFAULT 'sent'
)
RETURNS void AS $$
BEGIN
    INSERT INTO daily_email_logs (
        user_id,
        email,
        card_name,
        email_status,
        email_sent_at
    )
    VALUES (
        p_user_id,
        p_email,
        p_card_name,
        p_status,
        now()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. CREAR FUNCIÓN PARA OBTENER ESTADÍSTICAS
-- ============================================
CREATE OR REPLACE FUNCTION get_daily_email_stats(target_date date DEFAULT CURRENT_DATE)
RETURNS TABLE (
    total_sent bigint,
    total_failed bigint,
    total_pending bigint,
    success_rate numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) FILTER (WHERE email_status = 'sent') as total_sent,
        COUNT(*) FILTER (WHERE email_status = 'failed') as total_failed,
        COUNT(*) FILTER (WHERE email_status = 'pending') as total_pending,
        ROUND(
            (COUNT(*) FILTER (WHERE email_status = 'sent')::numeric / 
             NULLIF(COUNT(*), 0)::numeric) * 100, 2
        ) as success_rate
    FROM daily_email_logs
    WHERE email_sent_at >= target_date
    AND email_sent_at < target_date + INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. CREAR POLÍTICA DE SEGURIDAD (RLS)
-- ============================================
ALTER TABLE daily_email_logs ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts desde el servicio
CREATE POLICY "Allow service role inserts" ON daily_email_logs
FOR INSERT WITH CHECK (true);

-- Política para permitir selects desde el servicio
CREATE POLICY "Allow service role selects" ON daily_email_logs
FOR SELECT USING (true);

-- ============================================
-- 6. COMENTARIOS Y DOCUMENTACIÓN
-- ============================================
COMMENT ON TABLE daily_email_logs IS 'Registro de envíos de emails diarios a usuarios';
COMMENT ON FUNCTION get_users_pending_daily_email() IS 'Obtiene usuarios que NO han recibido email hoy';
COMMENT ON FUNCTION mark_daily_email_sent(uuid, text, text, text) IS 'Marca un usuario como habiendo recibido email diario';
COMMENT ON FUNCTION get_daily_email_stats(date) IS 'Obtiene estadísticas de envíos de email para una fecha';

-- ============================================
-- 7. VERIFICACIÓN Y TEST
-- ============================================
DO $$
BEGIN
    -- Test de la función
    RAISE NOTICE '🔍 Testing función get_users_pending_daily_email()...';
    
    -- La función debe existir y ser ejecutable
    PERFORM get_users_pending_daily_email();
    
    RAISE NOTICE '✅ SISTEMA DE MAILING DIARIO CREADO EXITOSAMENTE';
    RAISE NOTICE '====================================================';
    RAISE NOTICE '📧 Tabla daily_email_logs - CREADA';
    RAISE NOTICE '🔍 Función get_users_pending_daily_email() - CREADA';
    RAISE NOTICE '📊 Función get_daily_email_stats() - CREADA';
    RAISE NOTICE '🔐 Políticas de seguridad - CONFIGURADAS';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 El sistema de mailing diario está listo para usar!';
    RAISE NOTICE '📋 Para probar: SELECT * FROM get_users_pending_daily_email();';
END $$;
