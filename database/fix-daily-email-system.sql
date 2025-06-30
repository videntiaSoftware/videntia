-- SCRIPT PARA COMPLETAR EL SISTEMA DE EMAILS DIARIOS
-- Ejecutar este SQL en Supabase SQL Editor

-- 1. Crear tabla para tracking de emails enviados
CREATE TABLE IF NOT EXISTS daily_email_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL, -- Referencia a auth.users.id
    email text NOT NULL,
    card_id integer REFERENCES tarot_cards(id),
    card_name text NOT NULL,
    sent_at timestamptz DEFAULT now(),
    email_status text DEFAULT 'sent' CHECK (email_status IN ('sent', 'failed', 'bounced')),
    date_sent date DEFAULT CURRENT_DATE,
    created_at timestamptz DEFAULT now()
);

-- 2. Índices para performance
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_user_id ON daily_email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_date_sent ON daily_email_logs(date_sent);
CREATE INDEX IF NOT EXISTS idx_daily_email_logs_email_status ON daily_email_logs(email_status);

-- 3. Función para verificar si ya se envió email hoy
CREATE OR REPLACE FUNCTION user_received_daily_email_today(user_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM daily_email_logs 
        WHERE user_id = user_uuid 
        AND date_sent = CURRENT_DATE
        AND email_status = 'sent'
    );
END;
$$;

-- 4. Arreglar función get_random_daily_reading para que devuelva el tipo correcto
DROP FUNCTION IF EXISTS get_random_daily_reading();

CREATE OR REPLACE FUNCTION get_random_daily_reading()
RETURNS TABLE (
    card_name text,
    interpretation text,
    card_meaning text,
    image_url text
) 
LANGUAGE plpgsql
AS $$
DECLARE
    selected_card record;
    selected_interpretation text;
BEGIN
    -- Seleccionar carta aleatoria
    SELECT * INTO selected_card 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    -- Seleccionar interpretación aleatoria para esa carta
    SELECT ci.interpretation INTO selected_interpretation
    FROM card_interpretations ci
    WHERE ci.card_id = selected_card.id 
    ORDER BY random() 
    LIMIT 1;
    
    -- Si no hay interpretación, usar la de la carta
    IF selected_interpretation IS NULL THEN
        selected_interpretation := COALESCE(
            selected_card.interpretation_upright, 
            selected_card.description,
            'Reflexiona sobre las energías de esta carta hoy.'
        );
    END IF;
    
    -- Retornar resultado con los campos que espera la API
    RETURN QUERY
    SELECT 
        selected_card.name::text,
        selected_interpretation::text,
        COALESCE(selected_card.description, selected_card.interpretation_upright, 'Carta del tarot')::text,
        COALESCE(selected_card.image_url, '')::text;
END;
$$;

-- 5. Función para obtener usuarios que NO han recibido email hoy
CREATE OR REPLACE FUNCTION get_users_pending_daily_email()
RETURNS TABLE (
    user_id uuid,
    email text,
    email_confirmed boolean
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id,
        au.email::text,
        (au.email_confirmed_at IS NOT NULL) as email_confirmed
    FROM auth.users au
    WHERE au.email IS NOT NULL
    AND au.email_confirmed_at IS NOT NULL  -- Solo usuarios con email confirmado
    AND NOT EXISTS (
        -- Excluir usuarios que ya recibieron email hoy
        SELECT 1 
        FROM daily_email_logs del 
        WHERE del.user_id = au.id 
        AND del.date_sent = CURRENT_DATE
        AND del.email_status = 'sent'
    );
END;
$$;

-- 6. Crear política RLS para daily_email_logs (opcional)
ALTER TABLE daily_email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own email logs" ON daily_email_logs
    FOR SELECT USING (auth.uid() = user_id);

-- 7. Probar las funciones
SELECT '=== PRUEBA DE FUNCIÓN get_random_daily_reading ===';
SELECT * FROM get_random_daily_reading();

SELECT '=== USUARIOS PENDIENTES DE EMAIL ===';
SELECT * FROM get_users_pending_daily_email();

SELECT '=== CONTEO FINAL ===';
SELECT 
    'auth.users' as tabla, 
    COUNT(*) as total,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmados
FROM auth.users;
