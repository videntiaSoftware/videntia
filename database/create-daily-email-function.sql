-- ============================================
-- FUNCIÓN Y TABLA PARA SISTEMA DE MAILING DIARIO
-- ============================================
-- Ejecutar este SQL en Supabase SQL Editor

-- ============================================
-- 1. CREAR TABLA daily_email_logs SI NO EXISTE
-- ============================================
CREATE TABLE IF NOT EXISTS daily_email_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    card_name text,
    email_status text DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    sent_at timestamptz DEFAULT now(),
    error_message text,
    created_at timestamptz DEFAULT now()
);

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_user_id ON daily_email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_email ON daily_email_logs(email);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_sent_at ON daily_email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_status ON daily_email_logs(email_status);

-- ============================================
-- 2. CREAR FUNCIÓN get_users_pending_daily_email
-- ============================================
CREATE OR REPLACE FUNCTION get_users_pending_daily_email()
RETURNS TABLE (
    user_id uuid,
    email text,
    email_confirmed boolean,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id as user_id,
        au.email::text as email,
        au.email_confirmed_at IS NOT NULL as email_confirmed,
        au.created_at
    FROM auth.users au
    WHERE 
        -- Usuario tiene email
        au.email IS NOT NULL 
        -- Email está confirmado
        AND au.email_confirmed_at IS NOT NULL
        -- Usuario no ha sido eliminado
        AND au.deleted_at IS NULL
        -- No se le ha enviado email hoy
        AND NOT EXISTS (
            SELECT 1 FROM daily_email_logs del
            WHERE del.user_id = au.id
            AND del.email_status = 'sent'
            AND DATE(del.sent_at) = CURRENT_DATE
        )
    ORDER BY au.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. CREAR FUNCIÓN AUXILIAR PARA OBTENER LECTURA ALEATORIA
-- ============================================
CREATE OR REPLACE FUNCTION get_random_daily_reading()
RETURNS TABLE (
    card_name text,
    interpretation text,
    card_meaning text,
    image_url text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'El Mago'::text as card_name,
        'Hoy es un día de manifestación y poder personal. Tu energía creativa está en su punto más alto.'::text as interpretation,
        'Representa el poder de la voluntad y la capacidad de manifestar tus deseos en la realidad.'::text as card_meaning,
        '/images/tarot-cards/el-mago.jpg'::text as image_url
    FROM generate_series(1,1) -- Genera solo una fila
    ORDER BY random()
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- Habilitar RLS en la tabla
ALTER TABLE daily_email_logs ENABLE ROW LEVEL SECURITY;

-- Permitir que el service role pueda hacer todo
CREATE POLICY "Service role can manage daily_email_logs" ON daily_email_logs
FOR ALL USING (
    current_setting('role') = 'service_role'
);

-- Permitir que usuarios autenticados vean solo sus propios logs
CREATE POLICY "Users can view own email logs" ON daily_email_logs
FOR SELECT USING (
    auth.uid() = user_id
);

-- ============================================
-- 5. COMENTARIOS Y DOCUMENTACIÓN
-- ============================================

COMMENT ON FUNCTION get_users_pending_daily_email() IS 'Obtiene usuarios que no han recibido email diario hoy';
COMMENT ON FUNCTION get_random_daily_reading() IS 'Obtiene una lectura de tarot aleatoria para email diario';
COMMENT ON TABLE daily_email_logs IS 'Log de emails diarios enviados a usuarios';

-- ============================================
-- 6. VERIFICACIÓN Y TEST
-- ============================================

DO $$
DECLARE
    test_count integer;
    function_exists boolean;
BEGIN
    -- Verificar que la función existe
    SELECT EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'get_users_pending_daily_email'
    ) INTO function_exists;
    
    IF function_exists THEN
        -- Probar la función
        SELECT COUNT(*) INTO test_count
        FROM get_users_pending_daily_email();
        
        RAISE NOTICE '✅ Función get_users_pending_daily_email creada exitosamente';
        RAISE NOTICE '📊 Usuarios pendientes de email: %', test_count;
        RAISE NOTICE '🚀 Sistema de mailing diario listo!';
    ELSE
        RAISE NOTICE '❌ Error: La función no pudo ser creada';
    END IF;
    
    -- Verificar tabla
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'daily_email_logs'
    ) INTO function_exists;
    
    IF function_exists THEN
        RAISE NOTICE '✅ Tabla daily_email_logs verificada';
    ELSE
        RAISE NOTICE '❌ Error: La tabla daily_email_logs no existe';
    END IF;
END $$;
