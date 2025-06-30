-- ========================================
-- 🔥 SISTEMA DE MONETIZACIÓN LLM AVANZADO
-- Revenue multiplier: $0.30 CPM → $5-15 CPM
-- ========================================

-- 1. Crear tabla de perfiles de interés (core del sistema LLM)
CREATE TABLE IF NOT EXISTS user_interest_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  primary_category TEXT NOT NULL, -- travel, relationships, career, money, health, family, spiritual
  generated_tags JSONB NOT NULL, -- ["travel_intent", "europe", "vacation_planning"]
  confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 10),
  commercial_value INTEGER NOT NULL CHECK (commercial_value >= 1 AND commercial_value <= 10),
  demographic_hints JSONB, -- ["age_25_35", "urban", "high_income"]
  ad_keywords TEXT[], -- Keywords para targeting de ads
  
  -- Campos para venta de datos
  sold BOOLEAN DEFAULT FALSE,
  sold_to TEXT,
  sold_at TIMESTAMP,
  sale_price DECIMAL(10,2),
  
  -- Metadatos
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Índices para performance
  CONSTRAINT unique_guest_question UNIQUE(guest_id, question_text)
);

-- 2. Performance de ads premium vs básicos
CREATE TABLE IF NOT EXISTS premium_ad_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  ad_category TEXT NOT NULL,
  commercial_value INTEGER,
  estimated_cpm DECIMAL(10,4),
  segments_targeted TEXT[],
  ad_content TEXT,
  served_at TIMESTAMP DEFAULT NOW()
);

-- 3. Eventos de ads premium (clicks, conversiones)
CREATE TABLE IF NOT EXISTS premium_ad_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT,
  session_id TEXT,
  event_type TEXT NOT NULL, -- 'premium_ad_click', 'premium_ad_view', etc.
  ad_id TEXT,
  ad_category TEXT,
  estimated_revenue DECIMAL(10,4) DEFAULT 0,
  occurred_at TIMESTAMP DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- 4. Métricas diarias de revenue
CREATE TABLE IF NOT EXISTS daily_revenue_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  premium_ad_clicks INTEGER DEFAULT 0,
  estimated_revenue DECIMAL(10,4) DEFAULT 0,
  basic_ad_impressions INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_daily_category UNIQUE(date, category)
);

-- 5. Log de ventas de leads/datos
CREATE TABLE IF NOT EXISTS lead_sales_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client TEXT NOT NULL, -- API key del cliente que compró
  client_name TEXT, -- Nombre de la empresa (Despegar, Booking, etc.)
  leads_count INTEGER NOT NULL,
  total_revenue DECIMAL(10,2) NOT NULL,
  price_per_lead DECIMAL(10,2) NOT NULL,
  segment_criteria JSONB NOT NULL, -- Criterios usados para filtrar
  
  -- Detalles de la venta
  leads_delivered JSONB, -- IDs de los leads vendidos
  delivery_format TEXT DEFAULT 'api', -- api, csv, json
  
  sale_date TIMESTAMP DEFAULT NOW(),
  invoice_sent BOOLEAN DEFAULT FALSE,
  payment_received BOOLEAN DEFAULT FALSE
);

-- 6. Clientes autorizados para compra de datos
CREATE TABLE IF NOT EXISTS data_marketplace_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  industry TEXT NOT NULL, -- 'travel', 'finance', 'dating', 'ecommerce'
  
  -- Límites y precios
  max_leads_per_month INTEGER DEFAULT 1000,
  leads_purchased_this_month INTEGER DEFAULT 0,
  default_price_per_lead DECIMAL(10,2) NOT NULL,
  
  -- Preferencias de targeting
  preferred_segments TEXT[], -- Segmentos que más les interesan
  minimum_commercial_value INTEGER DEFAULT 5,
  
  -- Status
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_purchase TIMESTAMP
);

-- 7. Analíticas de revenue por segmento
CREATE TABLE IF NOT EXISTS revenue_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  
  -- Revenue por tipo
  basic_ads_revenue DECIMAL(10,2) DEFAULT 0,
  premium_ads_revenue DECIMAL(10,2) DEFAULT 0,
  data_sales_revenue DECIMAL(10,2) DEFAULT 0,
  total_revenue DECIMAL(10,2) GENERATED ALWAYS AS (basic_ads_revenue + premium_ads_revenue + data_sales_revenue) STORED,
  
  -- Métricas por segmento
  travel_segment_value DECIMAL(10,2) DEFAULT 0,
  finance_segment_value DECIMAL(10,2) DEFAULT 0,
  dating_segment_value DECIMAL(10,2) DEFAULT 0,
  
  -- Comparaciones (calculado sin usar generated column)
  revenue_multiplier DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE WHEN basic_ads_revenue > 0 
    THEN (basic_ads_revenue + premium_ads_revenue + data_sales_revenue) / basic_ads_revenue 
    ELSE 0 END
  ) STORED,
  
  -- Conteos
  total_leads_sold INTEGER DEFAULT 0,
  premium_ads_served INTEGER DEFAULT 0,
  
  CONSTRAINT unique_daily_analytics UNIQUE(date)
);

-- ========================================
-- 📊 ÍNDICES PARA PERFORMANCE
-- ========================================

-- Verificar que las tablas existen antes de crear índices
DO $$ 
BEGIN
    -- Índices para user_interest_profiles
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_interest_profiles') THEN
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_guest ON user_interest_profiles(guest_id);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_category ON user_interest_profiles(primary_category);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_value ON user_interest_profiles(commercial_value);
        CREATE INDEX IF NOT EXISTS idx_interest_profiles_unsold ON user_interest_profiles(sold) WHERE sold = FALSE;
    END IF;

    -- Índices para premium_ad_performance
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'premium_ad_performance') THEN
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'premium_ad_performance' AND column_name = 'ad_category') THEN
            CREATE INDEX IF NOT EXISTS idx_premium_ads_guest ON premium_ad_performance(guest_id);
            CREATE INDEX IF NOT EXISTS idx_premium_ads_category ON premium_ad_performance(ad_category);
            CREATE INDEX IF NOT EXISTS idx_premium_ads_date ON premium_ad_performance(served_at);
        END IF;
    END IF;

    -- Índices para premium_ad_events
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'premium_ad_events') THEN
        CREATE INDEX IF NOT EXISTS idx_premium_events_guest ON premium_ad_events(guest_id);
        CREATE INDEX IF NOT EXISTS idx_premium_events_type ON premium_ad_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_premium_events_date ON premium_ad_events(occurred_at);
    END IF;

    -- Índices para lead_sales_log
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lead_sales_log') THEN
        CREATE INDEX IF NOT EXISTS idx_sales_log_client ON lead_sales_log(client);
        CREATE INDEX IF NOT EXISTS idx_sales_log_date ON lead_sales_log(sale_date);
    END IF;
END $$;

-- ========================================
-- 🔧 FUNCIONES PARA ANALYTICS
-- ========================================

-- Función para calcular valor comercial basado en tags LLM
CREATE OR REPLACE FUNCTION calculate_commercial_value(
  p_category TEXT,
  p_tags JSONB,
  p_confidence FLOAT
) RETURNS INTEGER AS $$
DECLARE
  base_value INTEGER;
  tag_bonus INTEGER := 0;
  confidence_multiplier FLOAT;
BEGIN
  -- Valor base por categoría
  CASE p_category
    WHEN 'travel' THEN base_value := 8;
    WHEN 'money' THEN base_value := 9;
    WHEN 'relationships' THEN base_value := 7;
    WHEN 'career' THEN base_value := 6;
    WHEN 'health' THEN base_value := 5;
    WHEN 'family' THEN base_value := 4;
    WHEN 'spiritual' THEN base_value := 3;
    ELSE base_value := 5;
  END CASE;
  
  -- Bonus por tags específicos de alto valor
  IF p_tags ? 'high_income' THEN tag_bonus := tag_bonus + 1; END IF;
  IF p_tags ? 'premium_intent' THEN tag_bonus := tag_bonus + 1; END IF;
  IF p_tags ? 'urgent_need' THEN tag_bonus := tag_bonus + 1; END IF;
  
  -- Multiplicador por confianza
  confidence_multiplier := LEAST(1.2, p_confidence / 8.0);
  
  -- Calcular valor final (1-10)
  RETURN GREATEST(1, LEAST(10, ROUND((base_value + tag_bonus) * confidence_multiplier)));
END;
$$ LANGUAGE plpgsql;

-- Función para obtener segmentos de ads basados en perfil
CREATE OR REPLACE FUNCTION get_user_ad_segments(p_guest_id TEXT)
RETURNS TEXT[] AS $$
DECLARE
  segments TEXT[] := ARRAY[]::TEXT[];
  profile_record RECORD;
BEGIN
  -- Obtener perfil más reciente del usuario
  SELECT primary_category, generated_tags, commercial_value
  INTO profile_record
  FROM user_interest_profiles 
  WHERE guest_id = p_guest_id 
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF profile_record IS NOT NULL THEN
    -- Agregar categoría principal
    segments := array_append(segments, profile_record.primary_category || '_intent');
    
    -- Agregar segmento de valor
    IF profile_record.commercial_value > 7 THEN
      segments := array_append(segments, 'high_value');
    ELSIF profile_record.commercial_value > 5 THEN
      segments := array_append(segments, 'medium_value');
    ELSE
      segments := array_append(segments, 'low_value');
    END IF;
    
    -- Agregar segmentos basados en tags
    IF profile_record.generated_tags ? 'premium_intent' THEN
      segments := array_append(segments, 'premium_targeting');
    END IF;
    
    IF profile_record.generated_tags ? 'urgent_need' THEN
      segments := array_append(segments, 'urgent_targeting');
    END IF;
  ELSE
    -- Usuario sin perfil = segmento general
    segments := ARRAY['general'];
  END IF;
  
  RETURN segments;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar estadísticas diarias
CREATE OR REPLACE FUNCTION update_daily_revenue_stats()
RETURNS VOID AS $$
BEGIN
  INSERT INTO revenue_analytics (
    date,
    premium_ads_revenue,
    data_sales_revenue,
    total_leads_sold,
    premium_ads_served,
    travel_segment_value,
    finance_segment_value,
    dating_segment_value
  )
  SELECT 
    CURRENT_DATE,
    COALESCE(SUM(cpm_rate), 0) as premium_ads_revenue,
    COALESCE((SELECT SUM(total_revenue) FROM lead_sales_log WHERE DATE(sale_date) = CURRENT_DATE), 0) as data_sales_revenue,
    COALESCE((SELECT SUM(leads_count) FROM lead_sales_log WHERE DATE(sale_date) = CURRENT_DATE), 0) as total_leads_sold,
    COUNT(*) as premium_ads_served,
    COALESCE(SUM(CASE WHEN 'travel_intent' = ANY(segments_targeted) THEN estimated_cpm ELSE 0 END), 0) as travel_segment_value,
    COALESCE(SUM(CASE WHEN 'financial_planning' = ANY(segments_targeted) THEN estimated_cpm ELSE 0 END), 0) as finance_segment_value,
    COALESCE(SUM(CASE WHEN 'dating_intent' = ANY(segments_targeted) THEN estimated_cpm ELSE 0 END), 0) as dating_segment_value
  FROM premium_ad_performance 
  WHERE DATE(served_at) = CURRENT_DATE
  ON CONFLICT (date) DO UPDATE SET
    premium_ads_revenue = EXCLUDED.premium_ads_revenue,
    data_sales_revenue = EXCLUDED.data_sales_revenue,
    total_leads_sold = EXCLUDED.total_leads_sold,
    premium_ads_served = EXCLUDED.premium_ads_served,
    travel_segment_value = EXCLUDED.travel_segment_value,
    finance_segment_value = EXCLUDED.finance_segment_value,
    dating_segment_value = EXCLUDED.dating_segment_value;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- 📋 DATOS DE EJEMPLO
-- ========================================

-- Insertar clientes del marketplace de datos
INSERT INTO data_marketplace_clients (client_name, api_key, industry, default_price_per_lead, preferred_segments) VALUES
('Despegar', 'despegar_api_key_2024', 'travel', 2.50, ARRAY['travel_intent', 'vacation_planning']),
('Booking.com', 'booking_api_key_2024', 'travel', 2.20, ARRAY['travel_intent', 'premium_travel']),
('Brubank', 'brubank_api_key_2024', 'finance', 3.00, ARRAY['financial_planning', 'investment_intent']),
('Tinder', 'tinder_api_key_2024', 'dating', 2.00, ARRAY['dating_intent', 'relationship_seeking']),
('LinkedIn', 'linkedin_api_key_2024', 'career', 1.80, ARRAY['job_seeking', 'professional_development'])
ON CONFLICT (api_key) DO NOTHING;

-- Inicializar analytics del día actual
INSERT INTO revenue_analytics (date) VALUES (CURRENT_DATE) ON CONFLICT (date) DO NOTHING;

-- ========================================
-- ✅ SISTEMA LISTO
-- ========================================

-- Verificar que todo se creó correctamente
SELECT 
  'user_interest_profiles' as tabla,
  COUNT(*) as registros
FROM user_interest_profiles
UNION ALL
SELECT 
  'data_marketplace_clients' as tabla,
  COUNT(*) as registros  
FROM data_marketplace_clients
UNION ALL
SELECT 
  'revenue_analytics' as tabla,
  COUNT(*) as registros
FROM revenue_analytics;
