-- ========================================
-- 🔧 FIX PARA ÍNDICES - EJECUTAR SEPARADO
-- ========================================

-- Primero, eliminar índices que puedan estar fallando
DROP INDEX IF EXISTS idx_premium_ads_category;
DROP INDEX IF EXISTS idx_premium_ads_guest;
DROP INDEX IF EXISTS idx_premium_ads_date;

-- Verificar estructura de tablas
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('premium_ad_performance', 'user_interest_profiles', 'premium_ad_events', 'lead_sales_log')
ORDER BY table_name, ordinal_position;

-- Crear índices de forma segura
DO $$ 
BEGIN
    -- Verificar que premium_ad_performance existe y tiene las columnas correctas
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'premium_ad_performance' 
        AND column_name = 'ad_category'
    ) THEN
        CREATE INDEX IF NOT EXISTS idx_premium_ads_guest ON premium_ad_performance(guest_id);
        CREATE INDEX IF NOT EXISTS idx_premium_ads_category ON premium_ad_performance(ad_category);
        CREATE INDEX IF NOT EXISTS idx_premium_ads_date ON premium_ad_performance(served_at);
        RAISE NOTICE 'Índices para premium_ad_performance creados exitosamente';
    ELSE
        RAISE NOTICE 'Tabla premium_ad_performance no existe o no tiene columna ad_category';
    END IF;

    -- Verificar user_interest_profiles
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_interest_profiles') THEN
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_guest ON user_interest_profiles(guest_id);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_category ON user_interest_profiles(primary_category);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_value ON user_interest_profiles(commercial_value);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_unsold ON user_interest_profiles(sold) WHERE sold = FALSE;
        RAISE NOTICE 'Índices para user_interest_profiles creados exitosamente';
    END IF;

    -- Verificar premium_ad_events
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'premium_ad_events') THEN
        CREATE INDEX IF NOT EXISTS idx_premium_events_guest ON premium_ad_events(guest_id);
        CREATE INDEX IF NOT EXISTS idx_premium_events_type ON premium_ad_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_premium_events_date ON premium_ad_events(occurred_at);
        RAISE NOTICE 'Índices para premium_ad_events creados exitosamente';
    END IF;

    -- Verificar lead_sales_log
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lead_sales_log') THEN
        CREATE INDEX IF NOT EXISTS idx_sales_log_client ON lead_sales_log(client);
        CREATE INDEX IF NOT EXISTS idx_sales_log_date ON lead_sales_log(sale_date);
        RAISE NOTICE 'Índices para lead_sales_log creados exitosamente';
    END IF;

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creando índices: %', SQLERRM;
END $$;

-- Verificar que los índices se crearon
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('premium_ad_performance', 'user_interest_profiles', 'premium_ad_events', 'lead_sales_log')
ORDER BY tablename, indexname;
