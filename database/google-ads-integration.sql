-- Google Ads Campaign Tracking Table
-- Para trackear campañas creadas automáticamente desde el análisis LLM

CREATE TABLE google_ads_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Google Ads identifiers
  campaign_id TEXT NOT NULL UNIQUE,
  ad_group_id TEXT,
  
  -- Campaign details
  campaign_name TEXT NOT NULL,
  category TEXT NOT NULL, -- Del análisis LLM: travel, relationships, etc.
  target_keywords TEXT[] NOT NULL,
  demographic_targeting JSONB,
  
  -- Budget and bidding
  daily_budget DECIMAL(10,2) NOT NULL,
  target_cpm DECIMAL(10,4) NOT NULL,
  current_bid DECIMAL(10,4),
  
  -- Performance metrics (updated via Google Ads API)
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  ctr DECIMAL(8,4) DEFAULT 0,
  cost_per_conversion DECIMAL(10,2),
  
  -- LLM analysis linkage
  user_segment_size INTEGER NOT NULL, -- Cuántos usuarios motivaron esta campaña
  commercial_value_avg DECIMAL(4,2), -- Valor comercial promedio del segmento
  llm_confidence_score DECIMAL(4,2),
  
  -- Status and automation
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  auto_created BOOLEAN DEFAULT TRUE,
  created_by TEXT DEFAULT 'llm_system',
  last_optimized TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Performance thresholds for auto-optimization
  min_ctr_threshold DECIMAL(6,4) DEFAULT 0.005,
  max_cost_per_conversion DECIMAL(10,2) DEFAULT 10.00,
  auto_pause_enabled BOOLEAN DEFAULT TRUE
);

-- Performance tracking by day
CREATE TABLE google_ads_daily_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES google_ads_campaigns(campaign_id),
  date DATE DEFAULT CURRENT_DATE,
  
  -- Daily metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  
  -- Calculated metrics
  ctr DECIMAL(8,4) GENERATED ALWAYS AS (
    CASE WHEN impressions > 0 THEN (clicks::DECIMAL / impressions) ELSE 0 END
  ) STORED,
  cost_per_click DECIMAL(10,4) GENERATED ALWAYS AS (
    CASE WHEN clicks > 0 THEN (cost / clicks) ELSE 0 END
  ) STORED,
  cost_per_conversion DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE WHEN conversions > 0 THEN (cost / conversions) ELSE 0 END
  ) STORED,
  
  -- Revenue attribution
  attributed_revenue DECIMAL(10,2) DEFAULT 0,
  revenue_multiplier DECIMAL(8,2) GENERATED ALWAYS AS (
    CASE WHEN cost > 0 THEN (attributed_revenue / cost) ELSE 0 END
  ) STORED,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_campaign_date UNIQUE(campaign_id, date)
);

-- Optimization log
CREATE TABLE google_ads_optimizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES google_ads_campaigns(campaign_id),
  
  optimization_type TEXT NOT NULL, -- 'bid_increase', 'bid_decrease', 'pause', 'resume', 'keyword_add'
  old_value DECIMAL(10,4),
  new_value DECIMAL(10,4),
  reason TEXT NOT NULL,
  
  -- Performance before optimization
  performance_before JSONB,
  
  -- Expected impact
  expected_improvement DECIMAL(6,2), -- Expected improvement percentage
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT DEFAULT 'auto_optimizer'
);

-- Indexes for performance
CREATE INDEX idx_campaigns_category ON google_ads_campaigns(category);
CREATE INDEX idx_campaigns_status ON google_ads_campaigns(status);
CREATE INDEX idx_campaigns_performance ON google_ads_campaigns(ctr, cost_per_conversion);
CREATE INDEX idx_daily_performance_date ON google_ads_daily_performance(date);
CREATE INDEX idx_daily_performance_campaign ON google_ads_daily_performance(campaign_id);

-- Function to auto-optimize campaigns based on performance
CREATE OR REPLACE FUNCTION auto_optimize_google_ads_campaigns()
RETURNS INTEGER AS $$
DECLARE
  campaign_record RECORD;
  optimizations_made INTEGER := 0;
BEGIN
  -- Loop through active campaigns
  FOR campaign_record IN 
    SELECT * FROM google_ads_campaigns 
    WHERE status = 'active' 
    AND auto_pause_enabled = TRUE
    AND (last_optimized IS NULL OR last_optimized < NOW() - INTERVAL '1 day')
  LOOP
    
    -- Check if campaign should be paused (poor performance)
    IF campaign_record.ctr < campaign_record.min_ctr_threshold 
       AND campaign_record.cost > 20.00 THEN
      
      UPDATE google_ads_campaigns 
      SET status = 'paused', 
          last_optimized = NOW()
      WHERE id = campaign_record.id;
      
      INSERT INTO google_ads_optimizations (campaign_id, optimization_type, reason)
      VALUES (campaign_record.campaign_id, 'pause', 'Low CTR: ' || campaign_record.ctr);
      
      optimizations_made := optimizations_made + 1;
      
    -- Check if bid should be increased (good performance)
    ELSIF campaign_record.ctr > 0.02 AND campaign_record.cost_per_conversion < 5.00 THEN
      
      UPDATE google_ads_campaigns 
      SET current_bid = LEAST(current_bid * 1.2, target_cpm * 2),
          last_optimized = NOW()
      WHERE id = campaign_record.id;
      
      INSERT INTO google_ads_optimizations (campaign_id, optimization_type, old_value, new_value, reason)
      VALUES (campaign_record.campaign_id, 'bid_increase', campaign_record.current_bid, campaign_record.current_bid * 1.2, 'High CTR and low CPC');
      
      optimizations_made := optimizations_made + 1;
      
    -- Check if bid should be decreased (high cost)
    ELSIF campaign_record.cost_per_conversion > campaign_record.max_cost_per_conversion THEN
      
      UPDATE google_ads_campaigns 
      SET current_bid = GREATEST(current_bid * 0.8, 0.50),
          last_optimized = NOW()
      WHERE id = campaign_record.id;
      
      INSERT INTO google_ads_optimizations (campaign_id, optimization_type, old_value, new_value, reason)
      VALUES (campaign_record.campaign_id, 'bid_decrease', campaign_record.current_bid, campaign_record.current_bid * 0.8, 'High cost per conversion');
      
      optimizations_made := optimizations_made + 1;
      
    END IF;
    
  END LOOP;
  
  RETURN optimizations_made;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update campaign stats when daily performance is updated
CREATE OR REPLACE FUNCTION update_campaign_aggregate_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE google_ads_campaigns 
  SET 
    impressions = (SELECT SUM(impressions) FROM google_ads_daily_performance WHERE campaign_id = NEW.campaign_id),
    clicks = (SELECT SUM(clicks) FROM google_ads_daily_performance WHERE campaign_id = NEW.campaign_id),
    conversions = (SELECT SUM(conversions) FROM google_ads_daily_performance WHERE campaign_id = NEW.campaign_id),
    cost = (SELECT SUM(cost) FROM google_ads_daily_performance WHERE campaign_id = NEW.campaign_id),
    updated_at = NOW()
  WHERE campaign_id = NEW.campaign_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_campaign_stats
  AFTER INSERT OR UPDATE ON google_ads_daily_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_campaign_aggregate_stats();

-- Insert some example configurations
INSERT INTO google_ads_campaigns (
  campaign_id, campaign_name, category, target_keywords, daily_budget, target_cpm, user_segment_size, commercial_value_avg
) VALUES 
('example_travel_001', 'Videntia Travel Intent', 'travel', ARRAY['viajes europa', 'vacaciones', 'turismo'], 50.00, 3.50, 150, 8.2),
('example_money_001', 'Videntia Finance Intent', 'money', ARRAY['inversiones', 'dinero', 'finanzas'], 45.00, 4.20, 89, 7.8),
('example_love_001', 'Videntia Relationship Intent', 'relationships', ARRAY['amor', 'pareja', 'citas'], 35.00, 2.80, 203, 6.9);

-- Function to get campaign ROI report
CREATE OR REPLACE FUNCTION get_google_ads_roi_report(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
  campaign_name TEXT,
  category TEXT,
  total_cost DECIMAL(10,2),
  total_revenue DECIMAL(10,2),
  roi_percentage DECIMAL(8,2),
  conversions INTEGER,
  cost_per_conversion DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.campaign_name,
    c.category,
    SUM(p.cost) as total_cost,
    SUM(p.attributed_revenue) as total_revenue,
    CASE WHEN SUM(p.cost) > 0 
      THEN ((SUM(p.attributed_revenue) - SUM(p.cost)) / SUM(p.cost) * 100)
      ELSE 0 
    END as roi_percentage,
    SUM(p.conversions)::INTEGER as conversions,
    CASE WHEN SUM(p.conversions) > 0 
      THEN SUM(p.cost) / SUM(p.conversions)
      ELSE 0 
    END as cost_per_conversion
  FROM google_ads_campaigns c
  LEFT JOIN google_ads_daily_performance p ON c.campaign_id = p.campaign_id
  WHERE p.date >= CURRENT_DATE - INTERVAL '1 day' * days_back
  GROUP BY c.campaign_name, c.category
  ORDER BY roi_percentage DESC;
END;
$$ LANGUAGE plpgsql;
