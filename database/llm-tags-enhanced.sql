-- Actualización de base de datos para tags LLM mejorados
-- Agregamos nuevos campos para targeting ultra-específico

-- 1. Agregar nuevas columnas a user_interest_profiles
ALTER TABLE user_interest_profiles 
ADD COLUMN IF NOT EXISTS urgency_level TEXT CHECK (urgency_level IN ('immediate', 'short_term', 'long_term')),
ADD COLUMN IF NOT EXISTS spending_capacity TEXT CHECK (spending_capacity IN ('high', 'medium', 'low')),
ADD COLUMN IF NOT EXISTS commercial_intent TEXT CHECK (commercial_intent IN ('high', 'medium', 'low'));

-- 2. Crear tabla de tags predefinidos para consistencia
CREATE TABLE IF NOT EXISTS predefined_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  tag_name TEXT NOT NULL,
  tag_description TEXT,
  avg_cpm DECIMAL(10,2) DEFAULT 0.30,
  conversion_rate DECIMAL(5,2) DEFAULT 0.01,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_category_tag UNIQUE(category, tag_name)
);

-- 3. Insertar tags predefinidos por categoría
INSERT INTO predefined_tags (category, tag_name, tag_description, avg_cpm, conversion_rate) VALUES
-- TRAVEL TAGS
('travel', 'travel_intent', 'Usuario planea viajar', 3.50, 0.08),
('travel', 'europe_travel', 'Interés en viajar a Europa', 4.20, 0.12),
('travel', 'luxury_travel', 'Viajes de lujo', 8.50, 0.15),
('travel', 'vacation_planning', 'Planificando vacaciones', 3.80, 0.10),
('travel', 'business_travel', 'Viajes de negocios', 5.20, 0.07),
('travel', 'honeymoon_planning', 'Luna de miel', 6.80, 0.18),
('travel', 'family_vacation', 'Vacaciones familiares', 4.10, 0.09),
('travel', 'weekend_getaway', 'Escapadas de fin de semana', 2.90, 0.11),

-- RELATIONSHIPS TAGS  
('relationships', 'dating_intent', 'Buscando pareja', 2.80, 0.06),
('relationships', 'single_seeking', 'Soltero buscando relación', 3.20, 0.08),
('relationships', 'marriage_intent', 'Intención de matrimonio', 5.40, 0.14),
('relationships', 'wedding_planning', 'Planificando boda', 7.20, 0.22),
('relationships', 'relationship_coaching', 'Coaching de relaciones', 4.60, 0.12),
('relationships', 'couples_therapy', 'Terapia de pareja', 6.80, 0.16),
('relationships', 'breakup_recovery', 'Recuperación de ruptura', 3.40, 0.09),

-- CAREER TAGS
('career', 'job_seeking', 'Buscando empleo', 2.40, 0.05),
('career', 'career_change', 'Cambio de carrera', 3.80, 0.09),
('career', 'tech_career', 'Carrera en tecnología', 5.60, 0.13),
('career', 'promotion_seeking', 'Buscando ascenso', 3.20, 0.07),
('career', 'entrepreneurship', 'Emprendimiento', 4.80, 0.11),
('career', 'online_courses', 'Cursos online', 2.90, 0.08),
('career', 'professional_development', 'Desarrollo profesional', 3.60, 0.10),

-- MONEY TAGS
('money', 'investment_intent', 'Intención de invertir', 6.20, 0.14),
('money', 'financial_planning', 'Planificación financiera', 4.80, 0.12),
('money', 'crypto_investment', 'Inversión en crypto', 7.40, 0.16),
('money', 'stock_trading', 'Trading de acciones', 8.20, 0.18),
('money', 'personal_loans', 'Préstamos personales', 5.60, 0.11),
('money', 'credit_cards', 'Tarjetas de crédito', 4.20, 0.09),
('money', 'debt_management', 'Manejo de deudas', 3.80, 0.08),

-- HEALTH TAGS
('health', 'weight_loss', 'Pérdida de peso', 3.40, 0.10),
('health', 'fitness_goals', 'Objetivos fitness', 2.80, 0.08),
('health', 'mental_health', 'Salud mental', 4.60, 0.12),
('health', 'medical_procedures', 'Procedimientos médicos', 6.80, 0.15),
('health', 'wellness_lifestyle', 'Estilo de vida saludable', 3.20, 0.09),
('health', 'nutrition_coaching', 'Coaching nutricional', 4.40, 0.11),

-- FAMILY TAGS
('family', 'pregnancy_planning', 'Planificando embarazo', 5.20, 0.16),
('family', 'child_education', 'Educación infantil', 4.60, 0.13),
('family', 'family_activities', 'Actividades familiares', 2.60, 0.07),
('family', 'childcare_services', 'Servicios de cuidado infantil', 4.80, 0.14),

-- SPIRITUAL TAGS
('spiritual', 'personal_development', 'Desarrollo personal', 3.60, 0.10),
('spiritual', 'meditation_seeking', 'Buscando meditación', 2.80, 0.08),
('spiritual', 'life_coaching', 'Coaching de vida', 5.40, 0.14),
('spiritual', 'spiritual_guidance', 'Guía espiritual', 3.20, 0.09);

-- 4. Función para calcular valor comercial basado en tags
CREATE OR REPLACE FUNCTION calculate_commercial_value_v2(
  p_category TEXT,
  p_tags JSONB,
  p_confidence FLOAT,
  p_urgency TEXT,
  p_spending_capacity TEXT
)
RETURNS INTEGER AS $$
DECLARE
  base_value INTEGER := 5;
  tag_bonus INTEGER := 0;
  urgency_multiplier DECIMAL := 1.0;
  spending_multiplier DECIMAL := 1.0;
  final_value INTEGER;
BEGIN
  -- Bonus por tags de alto valor
  SELECT COALESCE(AVG(avg_cpm), 0.30) * 2 INTO tag_bonus
  FROM predefined_tags 
  WHERE category = p_category 
  AND tag_name = ANY(
    SELECT jsonb_array_elements_text(p_tags)
  );
  
  -- Multiplicador por urgencia
  urgency_multiplier := CASE p_urgency
    WHEN 'immediate' THEN 1.5
    WHEN 'short_term' THEN 1.2
    WHEN 'long_term' THEN 0.8
    ELSE 1.0
  END;
  
  -- Multiplicador por capacidad de gasto
  spending_multiplier := CASE p_spending_capacity
    WHEN 'high' THEN 1.8
    WHEN 'medium' THEN 1.2
    WHEN 'low' THEN 0.7
    ELSE 1.0
  END;
  
  -- Calcular valor final
  final_value := LEAST(10, GREATEST(1, 
    ROUND(
      (base_value + tag_bonus) * 
      (p_confidence / 10.0) * 
      urgency_multiplier * 
      spending_multiplier
    )
  ));
  
  RETURN final_value;
END;
$$ LANGUAGE plpgsql;

-- 5. Índices para búsquedas rápidas de tags
CREATE INDEX IF NOT EXISTS idx_predefined_tags_category ON predefined_tags(category);
CREATE INDEX IF NOT EXISTS idx_predefined_tags_cpm ON predefined_tags(avg_cpm DESC);
CREATE INDEX IF NOT EXISTS idx_interest_profiles_urgency ON user_interest_profiles(urgency_level);
CREATE INDEX IF NOT EXISTS idx_interest_profiles_spending ON user_interest_profiles(spending_capacity);
CREATE INDEX IF NOT EXISTS idx_interest_profiles_commercial_intent ON user_interest_profiles(commercial_intent);

-- 6. Vista para analytics de tags más rentables
CREATE OR REPLACE VIEW top_revenue_tags AS
SELECT 
  pt.category,
  pt.tag_name,
  pt.avg_cpm,
  pt.conversion_rate,
  COUNT(uip.id) as usage_count,
  AVG(uip.commercial_value) as avg_commercial_value,
  SUM(pt.avg_cpm * pt.conversion_rate) as estimated_revenue
FROM predefined_tags pt
LEFT JOIN user_interest_profiles uip ON uip.generated_tags @> to_jsonb(pt.tag_name)
GROUP BY pt.category, pt.tag_name, pt.avg_cpm, pt.conversion_rate
ORDER BY estimated_revenue DESC;

-- 7. Función para obtener mejores tags para una categoría
CREATE OR REPLACE FUNCTION get_best_tags_for_category(p_category TEXT)
RETURNS TABLE(
  tag_name TEXT,
  avg_cpm DECIMAL,
  conversion_rate DECIMAL,
  revenue_potential DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.tag_name,
    pt.avg_cpm,
    pt.conversion_rate,
    (pt.avg_cpm * pt.conversion_rate) as revenue_potential
  FROM predefined_tags pt
  WHERE pt.category = p_category
  ORDER BY revenue_potential DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;
