-- Tablas para sistema de monetización avanzado
-- Revenue de $0.30 CPM a $5-15 CPM con targeting

-- 1. Perfiles de interés basados en preguntas de tarot
CREATE TABLE user_interest_profiles (
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

-- 2. Log de ventas de leads/datos
CREATE TABLE lead_sales_log (
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

-- 3. Performance de ads premium vs básicos
CREATE TABLE premium_ad_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  ad_id TEXT NOT NULL,
  ad_provider TEXT NOT NULL, -- 'despegar', 'booking', 'tinder', etc.
  
  -- Métricas de revenue
  cpm_rate DECIMAL(10,4) NOT NULL, -- Lo que nos pagan por este ad
  basic_cpm_rate DECIMAL(10,4) DEFAULT 0.30, -- CPM básico para comparar
  revenue_multiplier DECIMAL(10,2) GENERATED ALWAYS AS (cpm_rate / basic_cpm_rate) STORED,
  
  -- Targeting aplicado
  segments_applied TEXT[] NOT NULL, -- ["travel_intent", "high_value", "argentina"]
  interest_match_score FLOAT, -- Qué tan bien el ad coincide con intereses
  
  -- Resultados
  impression_served BOOLEAN DEFAULT TRUE,
  clicked BOOLEAN DEFAULT FALSE,
  conversion BOOLEAN DEFAULT FALSE,
  
  served_at TIMESTAMP DEFAULT NOW(),
  clicked_at TIMESTAMP,
  converted_at TIMESTAMP
);

-- 4. Clientes autorizados para compra de datos
CREATE TABLE data_marketplace_clients (
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

-- 5. Analíticas de revenue por segmento
CREATE TABLE revenue_analytics (
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
  
  -- Comparaciones
  revenue_multiplier DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE WHEN basic_ads_revenue > 0 
    THEN total_revenue / basic_ads_revenue 
    ELSE 0 END
  ) STORED,
  
  -- Conteos
  total_leads_sold INTEGER DEFAULT 0,
  premium_ads_served INTEGER DEFAULT 0,
  
  CONSTRAINT unique_daily_analytics UNIQUE(date)
);

-- Índices para performance
CREATE INDEX idx_interest_profiles_guest ON user_interest_profiles(guest_id);
CREATE INDEX idx_interest_profiles_category ON user_interest_profiles(primary_category);
CREATE INDEX idx_interest_profiles_value ON user_interest_profiles(commercial_value);
CREATE INDEX idx_interest_profiles_unsold ON user_interest_profiles(sold) WHERE sold = FALSE;

CREATE INDEX idx_premium_ads_guest ON premium_ad_performance(guest_id);
CREATE INDEX idx_premium_ads_provider ON premium_ad_performance(ad_provider);
CREATE INDEX idx_premium_ads_date ON premium_ad_performance(served_at);

CREATE INDEX idx_sales_log_client ON lead_sales_log(client);
CREATE INDEX idx_sales_log_date ON lead_sales_log(sale_date);

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
    COALESCE(SUM(CASE WHEN 'travel_intent' = ANY(segments_applied) THEN cmp_rate ELSE 0 END), 0) as travel_segment_value,
    COALESCE(SUM(CASE WHEN 'financial_planning' = ANY(segments_applied) THEN cmp_rate ELSE 0 END), 0) as finance_segment_value,
    COALESCE(SUM(CASE WHEN 'dating_intent' = ANY(segments_applied) THEN cmp_rate ELSE 0 END), 0) as dating_segment_value
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

-- Insertar algunos clientes de ejemplo
INSERT INTO data_marketplace_clients (client_name, api_key, industry, default_price_per_lead, preferred_segments) VALUES
('Despegar', 'despegar_api_key_2024', 'travel', 2.50, ARRAY['travel_intent', 'vacation_planning']),
('Booking.com', 'booking_api_key_2024', 'travel', 2.20, ARRAY['travel_intent', 'premium_travel']),
('Brubank', 'brubank_api_key_2024', 'finance', 3.00, ARRAY['financial_planning', 'investment_intent']),
('Tinder', 'tinder_api_key_2024', 'dating', 2.00, ARRAY['dating_intent', 'relationship_seeking']),
('LinkedIn', 'linkedin_api_key_2024', 'career', 1.80, ARRAY['job_seeking', 'professional_development']);

-- Trigger para resetear contador mensual
CREATE OR REPLACE FUNCTION reset_monthly_lead_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF EXTRACT(DAY FROM NEW.created_at) = 1 THEN
    UPDATE data_marketplace_clients SET leads_purchased_this_month = 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
