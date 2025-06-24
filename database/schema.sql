-- User Tier System Database Schema
-- Run this in your Supabase SQL Editor or pgAdmin

-- Create ad_sessions table for tracking advertisement views
CREATE TABLE IF NOT EXISTS ad_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    ad_provider_id text NOT NULL,
    started_at timestamptz NOT NULL DEFAULT now(),
    completed_at timestamptz,
    verified boolean DEFAULT false,
    reward_type text CHECK (reward_type IN ('extra_reading', 'premium_trial')),
    reward_value integer, -- Reading count bonus or trial hours
    created_at timestamptz DEFAULT now()
);

-- Create premium_trials table for tracking premium trial periods
CREATE TABLE IF NOT EXISTS premium_trials (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    granted_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Create user_tiers table for tracking user tier information
CREATE TABLE IF NOT EXISTS user_tiers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('guest', 'free', 'premium')),
    subscription_id text, -- Stripe/PayPal subscription ID
    subscription_status text CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'unpaid')),
    subscription_expires_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create abuse_reports table for tracking user behavior and abuse
CREATE TABLE IF NOT EXISTS abuse_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    guest_id text, -- For guest users using device fingerprinting
    ip_address inet,
    abuse_type text NOT NULL CHECK (abuse_type IN ('spam_questions', 'bot_behavior', 'rate_limit', 'device_fingerprint', 'suspicious_pattern')),
    severity text NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    behavior_score numeric(5,2), -- 0.00 to 100.00
    details jsonb, -- Store detailed analysis data
    punishment_applied text CHECK (punishment_applied IN ('warning', 'slow_down', 'temp_ban', 'permanent_ban')),
    punishment_expires_at timestamptz,
    created_at timestamptz DEFAULT now()
);

-- Add columns to existing readings table if they don't exist
-- Note: Check if these columns exist before running
ALTER TABLE readings 
ADD COLUMN IF NOT EXISTS user_tier text DEFAULT 'free' CHECK (user_tier IN ('guest', 'free', 'premium')),
ADD COLUMN IF NOT EXISTS guest_id text,
ADD COLUMN IF NOT EXISTS ip_address inet;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ad_sessions_user_id ON ad_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_sessions_verified ON ad_sessions(verified);
CREATE INDEX IF NOT EXISTS idx_ad_sessions_created_at ON ad_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_premium_trials_user_id ON premium_trials(user_id);
CREATE INDEX IF NOT EXISTS idx_premium_trials_active ON premium_trials(active);
CREATE INDEX IF NOT EXISTS idx_premium_trials_expires_at ON premium_trials(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_tiers_user_id ON user_tiers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tiers_tier ON user_tiers(tier);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_user_id ON abuse_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_guest_id ON abuse_reports(guest_id);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_ip_address ON abuse_reports(ip_address);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_created_at ON abuse_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_readings_user_tier ON readings(user_tier);
CREATE INDEX IF NOT EXISTS idx_readings_guest_id ON readings(guest_id);
CREATE INDEX IF NOT EXISTS idx_readings_created_at ON readings(created_at);

-- Row Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE ad_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE abuse_reports ENABLE ROW LEVEL SECURITY;

-- Ad Sessions Policies
CREATE POLICY "Users can view their own ad sessions" ON ad_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ad sessions" ON ad_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ad sessions" ON ad_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Premium Trials Policies
CREATE POLICY "Users can view their own premium trials" ON premium_trials
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own premium trials" ON premium_trials
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own premium trials" ON premium_trials
    FOR UPDATE USING (auth.uid() = user_id);

-- User Tiers Policies
CREATE POLICY "Users can view their own tier" ON user_tiers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tier" ON user_tiers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tier" ON user_tiers
    FOR UPDATE USING (auth.uid() = user_id);

-- Abuse Reports Policies (more restrictive - only service can write)
CREATE POLICY "Service can manage abuse reports" ON abuse_reports
    FOR ALL USING (true); -- This will be restricted to service role in production

-- Functions to help with tier management
CREATE OR REPLACE FUNCTION get_user_tier(user_uuid uuid)
RETURNS text AS $$
DECLARE
    user_tier text;
    trial_active boolean;
BEGIN
    -- Check if user has an active premium trial
    SELECT active INTO trial_active
    FROM premium_trials
    WHERE user_id = user_uuid AND expires_at > now() AND active = true
    LIMIT 1;
    
    IF trial_active THEN
        RETURN 'premium';
    END IF;
    
    -- Check user's regular tier
    SELECT tier INTO user_tier
    FROM user_tiers
    WHERE user_id = user_uuid
    LIMIT 1;
    
    -- Default to free if no tier record
    RETURN COALESCE(user_tier, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired premium trials
CREATE OR REPLACE FUNCTION cleanup_expired_trials()
RETURNS void AS $$
BEGIN
    UPDATE premium_trials
    SET active = false
    WHERE expires_at <= now() AND active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get daily reading count for a user
CREATE OR REPLACE FUNCTION get_daily_reading_count(user_uuid uuid, guest_identifier text DEFAULT NULL)
RETURNS integer AS $$
DECLARE
    reading_count integer;
    today_start timestamptz;
BEGIN
    today_start := date_trunc('day', now());
    
    IF user_uuid IS NOT NULL THEN
        SELECT COUNT(*) INTO reading_count
        FROM readings
        WHERE user_id = user_uuid 
        AND created_at >= today_start;
    ELSIF guest_identifier IS NOT NULL THEN
        SELECT COUNT(*) INTO reading_count
        FROM readings
        WHERE guest_id = guest_identifier 
        AND created_at >= today_start;
    ELSE
        reading_count := 0;
    END IF;
    
    RETURN COALESCE(reading_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get ad count for today
CREATE OR REPLACE FUNCTION get_daily_ad_count(user_uuid uuid)
RETURNS integer AS $$
DECLARE
    ad_count integer;
    today_start timestamptz;
BEGIN
    today_start := date_trunc('day', now());
    
    SELECT COUNT(*) INTO ad_count
    FROM ad_sessions
    WHERE user_id = user_uuid 
    AND verified = true
    AND created_at >= today_start;
    
    RETURN COALESCE(ad_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_user_tiers
    BEFORE UPDATE ON user_tiers
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

-- Insert default tier for existing users (run this once)
INSERT INTO user_tiers (user_id, tier)
SELECT id, 'free'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_tiers)
ON CONFLICT (user_id) DO NOTHING;
