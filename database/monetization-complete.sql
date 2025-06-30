-- ================================
-- SISTEMA DE MONETIZACIÓN COMPLETO
-- Para Agencias de Marketing y Data Brokers
-- Revenue objetivo: $0.30 → $5-15 CPM
-- ================================

-- 1. Perfiles de interés basados en preguntas (CORE TABLE)
CREATE TABLE IF NOT EXISTS user_interest_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  
  -- Categorización automática por LLM
  primary_category TEXT NOT NULL, -- travel, relationships, career, money, health, family, spiritual
  generated_tags JSONB NOT NULL, -- ["travel_intent", "europe", "vacation_planning"] 
  confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 10),
  commercial_value INTEGER NOT NULL CHECK (commercial_value >= 1 AND commercial_value <= 10),
  
  -- Data broker compatible fields
  demographic_hints JSONB, -- ["age_25_35", "urban", "high_income", "female"]
  ad_keywords TEXT[], -- Keywords for programmatic targeting
  geo_hints JSONB, -- {"country": "AR", "region": "CABA", "interest_radius": 50}
  
  -- Behavioral patterns (valuable for agencies)
  urgency_level TEXT, -- "high", "medium", "low" 
  decision_stage TEXT, -- "research", "consideration", "ready_to_buy"
  
  -- Monetization tracking
  sold BOOLEAN DEFAULT FALSE,
  sold_to TEXT, -- Agency/broker identifier
  sold_at TIMESTAMP,
  sale_price DECIMAL(10,2),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_guest_question UNIQUE(guest_id, question_text)
);

-- 2. Enhanced guest analytics (consolidated from both files)
CREATE TABLE IF NOT EXISTS guest_analytics_insights (
  id BIGSERIAL PRIMARY KEY,
  guest_id TEXT NOT NULL UNIQUE,
  fingerprint_id TEXT,
  
  -- Demographic data (IP-based + inferred)
  country_code TEXT,
  region TEXT,
  city TEXT,
  timezone TEXT,
  device_type TEXT, -- mobile/desktop/tablet
  os TEXT,
  browser TEXT,
  language TEXT,
  
  -- Behavioral patterns (HIGH VALUE for agencies)
  session_duration INTEGER, -- seconds
  pages_viewed INTEGER,
  total_questions_asked INTEGER DEFAULT 0,
  reading_frequency TEXT, -- daily/weekly/monthly
  engagement_level TEXT, -- high/medium/low
  time_of_day_pattern TEXT, -- morning/afternoon/evening/night
  preferred_categories TEXT[], -- most asked question types
  
  -- Psychographic data (PREMIUM for targeting)
  life_focus_areas TEXT[], -- love, career, health, money, travel
  decision_making_style TEXT, -- intuitive/analytical/mixed
  spiritual_engagement_level TEXT, -- beginner/intermediate/advanced
  
  -- Commercial metrics
  ad_engagement_score FLOAT DEFAULT 0, -- 0-100
  premium_likelihood FLOAT DEFAULT 0, -- 0-100  
  estimated_lifetime_value DECIMAL(10,2) DEFAULT 0,
  
  -- Agency-specific metrics
  lead_quality_score INTEGER DEFAULT 0, -- 1-10 for agencies
  segment_memberships TEXT[], -- auto-assigned segments
  
  -- Timestamps
  first_visit TIMESTAMPTZ NOT NULL,
  last_visit TIMESTAMPTZ NOT NULL,
  last_question_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Data marketplace clients (agencies & brokers)
CREATE TABLE IF NOT EXISTS data_marketplace_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_type TEXT NOT NULL, -- 'agency', 'data_broker', 'brand'
  api_key TEXT UNIQUE NOT NULL,
  industry_focus TEXT[], -- ['travel', 'finance', 'dating', 'ecommerce']
  
  -- Pricing & limits
  tier TEXT DEFAULT 'basic', -- basic/premium/enterprise
  price_per_lead DECIMAL(10,2) NOT NULL,
  monthly_lead_limit INTEGER DEFAULT 1000,
  leads_purchased_this_month INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  
  -- Targeting preferences
  preferred_categories TEXT[], -- Categories they buy most
  min_commercial_value INTEGER DEFAULT 5,
  geo_restrictions TEXT[], -- Countries they target
  demographic_filters JSONB, -- Age, gender, etc preferences
  
  -- Business details
  contact_email TEXT,
  billing_contact TEXT,
  payment_method TEXT, -- 'monthly_invoice', 'prepaid_credits'
  
  -- Status
  active BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_purchase_at TIMESTAMP
);

-- 4. Lead sales transactions log
CREATE TABLE IF NOT EXISTS lead_sales_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES data_marketplace_clients(id),
  
  -- Sale details
  leads_count INTEGER NOT NULL,
  total_revenue DECIMAL(10,2) NOT NULL,
  price_per_lead DECIMAL(10,2) NOT NULL,
  
  -- Filtering criteria used
  segment_criteria JSONB NOT NULL, -- What filters were applied
  categories_included TEXT[],
  min_commercial_value INTEGER,
  geo_filter TEXT,
  
  -- Delivery
  leads_delivered JSONB, -- Anonymized lead IDs delivered
  delivery_format TEXT DEFAULT 'json', -- json/csv/api_stream
  download_url TEXT, -- Temporary secure download link
  expires_at TIMESTAMP, -- Download link expiration
  
  -- Transaction tracking
  sale_date TIMESTAMP DEFAULT NOW(),
  invoice_number TEXT,
  payment_status TEXT DEFAULT 'pending', -- pending/paid/failed
  payment_date TIMESTAMP
);

-- 5. Premium ad performance tracking
CREATE TABLE IF NOT EXISTS premium_ad_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  ad_session_id TEXT NOT NULL,
  ad_provider TEXT NOT NULL, -- google/facebook/native
  
  -- Revenue metrics
  base_cpm DECIMAL(10,4) DEFAULT 0.30,
  actual_cpm DECIMAL(10,4) NOT NULL,
  revenue_multiplier DECIMAL(10,2) GENERATED ALWAYS AS (actual_cpm / base_cpm) STORED,
  
  -- Targeting applied
  targeting_segments TEXT[] NOT NULL,
  interest_categories_matched TEXT[],
  commercial_value_used INTEGER,
  
  -- Performance
  impression_served BOOLEAN DEFAULT TRUE,
  clicked BOOLEAN DEFAULT FALSE,
  conversion_tracked BOOLEAN DEFAULT FALSE,
  
  served_at TIMESTAMP DEFAULT NOW(),
  clicked_at TIMESTAMP,
  converted_at TIMESTAMP
);

-- 6. Behavioral event tracking
CREATE TABLE IF NOT EXISTS guest_behavior_events (
  id BIGSERIAL PRIMARY KEY,
  guest_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- question_asked, card_viewed, ad_clicked, etc
  event_data JSONB,
  
  -- Context
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  
  -- Enrichment
  processed BOOLEAN DEFAULT FALSE,
  
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- ÍNDICES PARA PERFORMANCE
-- ================================

-- User profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_guest_id ON user_interest_profiles(guest_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_category ON user_interest_profiles(primary_category);
CREATE INDEX IF NOT EXISTS idx_user_profiles_commercial_value ON user_interest_profiles(commercial_value DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_unsold ON user_interest_profiles(sold) WHERE sold = FALSE;
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_interest_profiles(created_at DESC);

-- Guest analytics
CREATE INDEX IF NOT EXISTS idx_guest_analytics_guest_id ON guest_analytics_insights(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_country ON guest_analytics_insights(country_code);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_engagement ON guest_analytics_insights(engagement_level);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_lifetime_value ON guest_analytics_insights(estimated_lifetime_value DESC);
CREATE INDEX IF NOT EXISTS idx_guest_analytics_last_visit ON guest_analytics_insights(last_visit DESC);

-- Sales tracking
CREATE INDEX IF NOT EXISTS idx_sales_log_client ON lead_sales_log(client_id);
CREATE INDEX IF NOT EXISTS idx_sales_log_date ON lead_sales_log(sale_date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_log_payment_status ON lead_sales_log(payment_status);

-- Performance tracking
CREATE INDEX IF NOT EXISTS idx_premium_ads_guest ON premium_ad_performance(guest_id);
CREATE INDEX IF NOT EXISTS idx_premium_ads_revenue ON premium_ad_performance(actual_cpm DESC);
CREATE INDEX IF NOT EXISTS idx_premium_ads_date ON premium_ad_performance(served_at DESC);

-- Events
CREATE INDEX IF NOT EXISTS idx_behavior_events_guest_id ON guest_behavior_events(guest_id);
CREATE INDEX IF NOT EXISTS idx_behavior_events_type ON guest_behavior_events(event_type);
CREATE INDEX IF NOT EXISTS idx_behavior_events_timestamp ON guest_behavior_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_behavior_events_unprocessed ON guest_behavior_events(processed) WHERE processed = FALSE;

-- ================================
-- FUNCIONES DE NEGOCIO
-- ================================

-- Function: Update guest insights automatically
CREATE OR REPLACE FUNCTION update_guest_insights(p_guest_id TEXT)
RETURNS VOID AS $$
DECLARE
    v_question_count INTEGER;
    v_avg_commercial_value FLOAT;
    v_categories TEXT[];
    v_engagement_score FLOAT;
    v_lifetime_value DECIMAL(10,2);
BEGIN
    -- Count total questions
    SELECT COUNT(*), AVG(commercial_value), ARRAY_AGG(DISTINCT primary_category)
    INTO v_question_count, v_avg_commercial_value, v_categories
    FROM user_interest_profiles 
    WHERE guest_id = p_guest_id;
    
    -- Calculate engagement score
    v_engagement_score := LEAST(100, (v_question_count * 15) + (v_avg_commercial_value * 8));
    
    -- Estimate lifetime value
    v_lifetime_value := v_avg_commercial_value * v_question_count * 0.25;
    
    -- Update or insert insights
    INSERT INTO guest_analytics_insights (
        guest_id,
        total_questions_asked,
        preferred_categories,
        ad_engagement_score,
        estimated_lifetime_value,
        lead_quality_score,
        first_visit,
        last_visit,
        last_question_at
    ) VALUES (
        p_guest_id,
        v_question_count,
        v_categories,
        v_engagement_score,
        v_lifetime_value,
        LEAST(10, GREATEST(1, ROUND(v_engagement_score / 10))),
        NOW(),
        NOW(),
        NOW()
    )
    ON CONFLICT (guest_id) DO UPDATE SET
        total_questions_asked = EXCLUDED.total_questions_asked,
        preferred_categories = EXCLUDED.preferred_categories,
        ad_engagement_score = EXCLUDED.ad_engagement_score,
        estimated_lifetime_value = EXCLUDED.estimated_lifetime_value,
        lead_quality_score = EXCLUDED.lead_quality_score,
        last_visit = NOW(),
        last_question_at = NOW(),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function: Export leads for agencies/brokers
CREATE OR REPLACE FUNCTION export_leads_for_client(
    p_client_id UUID,
    p_category TEXT DEFAULT NULL,
    p_min_commercial_value INTEGER DEFAULT 5,
    p_max_leads INTEGER DEFAULT 1000,
    p_geo_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    lead_id TEXT,
    category TEXT,
    commercial_value INTEGER,
    demographic_hints JSONB,
    geo_data JSONB,
    engagement_level TEXT,
    estimated_value DECIMAL
) AS $$
DECLARE
    v_client_record RECORD;
BEGIN
    -- Get client info
    SELECT * INTO v_client_record
    FROM data_marketplace_clients 
    WHERE id = p_client_id AND active = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Client not found or inactive';
    END IF;
    
    -- Check monthly limits
    IF v_client_record.leads_purchased_this_month >= v_client_record.monthly_lead_limit THEN
        RAISE EXCEPTION 'Monthly limit exceeded';
    END IF;
    
    -- Return anonymized leads
    RETURN QUERY
    SELECT 
        MD5(uip.guest_id || uip.created_at::TEXT) as lead_id,
        uip.primary_category,
        uip.commercial_value,
        uip.demographic_hints,
        jsonb_build_object(
            'country', gai.country_code,
            'region', gai.region,
            'timezone', gai.timezone
        ) as geo_data,
        gai.engagement_level,
        gai.estimated_lifetime_value
    FROM user_interest_profiles uip
    JOIN guest_analytics_insights gai ON uip.guest_id = gai.guest_id
    WHERE 
        uip.sold = FALSE
        AND uip.commercial_value >= p_min_commercial_value
        AND (p_category IS NULL OR uip.primary_category = p_category)
        AND (p_geo_filter IS NULL OR gai.country_code = p_geo_filter)
        AND gai.last_visit > NOW() - INTERVAL '30 days'
    ORDER BY uip.commercial_value DESC, gai.estimated_lifetime_value DESC
    LIMIT p_max_leads;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update insights when new question is added
CREATE OR REPLACE FUNCTION trigger_update_insights()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM update_guest_insights(NEW.guest_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_update_insights ON user_interest_profiles;
CREATE TRIGGER auto_update_insights
    AFTER INSERT OR UPDATE ON user_interest_profiles
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_insights();

-- ================================
-- DATOS INICIALES PARA TESTING
-- ================================

-- Insert sample data marketplace clients
INSERT INTO data_marketplace_clients (
    client_name, client_type, api_key, industry_focus, 
    price_per_lead, monthly_lead_limit, preferred_categories
) VALUES 
-- Marketing Agencies
('Havas Media Argentina', 'agency', 'havas_arg_2024_key', 
 ARRAY['travel', 'lifestyle'], 2.50, 5000, ARRAY['travel', 'relationships']),
 
('Publicis Buenos Aires', 'agency', 'publicis_ba_2024_key', 
 ARRAY['finance', 'career'], 2.80, 3000, ARRAY['career', 'money']),
 
('WPP Local Agency', 'agency', 'wpp_local_2024_key', 
 ARRAY['travel', 'health'], 2.20, 2000, ARRAY['travel', 'health']),

-- Data Brokers  
('DataHub LatAm', 'data_broker', 'datahub_latam_2024_key',
 ARRAY['travel', 'finance', 'relationships'], 1.20, 15000, ARRAY['travel', 'money', 'relationships']),
 
('Insights Pro Argentina', 'data_broker', 'insights_pro_arg_2024_key',
 ARRAY['career', 'health', 'lifestyle'], 1.50, 10000, ARRAY['career', 'health']),

('Premium Data Solutions', 'data_broker', 'premium_data_2024_key',
 ARRAY['travel', 'finance'], 1.80, 8000, ARRAY['travel', 'money']);

-- ================================
-- COMENTARIOS PARA EL EQUIPO
-- ================================

COMMENT ON TABLE user_interest_profiles IS 'Core table: Question-based interest profiles. Value: $1-3 per quality lead for agencies';
COMMENT ON TABLE guest_analytics_insights IS 'Enhanced user analytics. Combined behavioral + demographic data for targeting';
COMMENT ON TABLE data_marketplace_clients IS 'B2B clients: Marketing agencies and data brokers who purchase leads';
COMMENT ON TABLE lead_sales_log IS 'Revenue tracking: All lead sales to agencies/brokers';
COMMENT ON FUNCTION export_leads_for_client IS 'Main monetization function: Exports anonymized leads for sale';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '🚀 MONETIZATION SYSTEM CREATED SUCCESSFULLY!';
    RAISE NOTICE '💰 Revenue channels: Marketing Agencies + Data Brokers';
    RAISE NOTICE '📊 Target: $0.30 → $5-15 CPM with interest-based targeting';
    RAISE NOTICE '🎯 Ready for LLM question tagging integration';
END $$;
