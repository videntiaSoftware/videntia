-- Script SIMPLE para sistema de cartas diarias - Videntia
-- Usa la tabla tarot_cards existente y solo crea interpretaciones

-- 1. Tabla de interpretaciones (múltiples por carta)
CREATE TABLE IF NOT EXISTS card_interpretations (
    id SERIAL PRIMARY KEY,
    card_id integer REFERENCES tarot_cards(id),
    interpretation text NOT NULL,
    is_upright boolean DEFAULT true
);

-- 2. Insertar interpretaciones variadas para las cartas existentes (IDs 1-22)
-- Cada carta tendrá 3 interpretaciones diferentes para variedad
INSERT INTO card_interpretations (card_id, interpretation, is_upright) VALUES
-- Carta 1
(1, 'Hoy es momento de dar un salto de fe. Confía en el universo y abraza lo desconocido.', true),
(1, 'Las oportunidades te llaman. Es hora de ser valiente y aventurarte hacia nuevos horizontes.', true),
(1, 'Tu espíritu libre te guía hacia experiencias transformadoras. Sigue tu intuición.', true),

-- Carta 2
(2, 'Tienes todos los recursos necesarios para manifestar tus deseos. El poder está en tus manos.', true),
(2, 'Tu concentración y voluntad están alineadas. Es el momento perfecto para actuar.', true),
(2, 'La magia de la creación fluye a través de ti. Canaliza esa energía hacia tus objetivos.', true),

-- Carta 3
(3, 'Escucha la voz silenciosa de tu sabiduría interior. Las respuestas están dentro de ti.', true),
(3, 'Confía en tu intuición femenina. Los misterios se revelarán cuando estés en silencio.', true),
(3, 'Tu conexión con lo divino es fuerte hoy. Medita y permite que la claridad llegue.', true),

-- Carta 4
(4, 'Tu energía creativa está en su punto máximo. Nutre tus proyectos con amor y paciencia.', true),
(4, 'La abundancia te rodea. Es momento de crear y dar vida a nuevas ideas.', true),
(4, 'Tu lado maternal y protector se fortalece. Cuida de ti y de quienes amas.', true),

-- Carta 5
(5, 'Tu liderazgo natural emerge. Toma el control de tu destino con sabiduría y determinación.', true),
(5, 'La estructura y el orden te benefician hoy. Organiza tus metas con claridad.', true),
(5, 'Tu autoridad benevolente será reconocida. Lidera con el ejemplo y la integridad.', true),

-- Carta 6
(6, 'Las tradiciones y la sabiduría ancestral te guían hacia el camino correcto.', true),
(6, 'Busca consejo en aquellos que admiras. La humildad te abrirá puertas importantes.', true),
(6, 'Tu búsqueda espiritual encuentra respuestas en las enseñanzas sagradas.', true),

-- Carta 7
(7, 'Tu determinación y fuerza de voluntad te llevarán a la victoria.', true),
(7, 'Mantén el control y la disciplina. El éxito está al alcance de tus manos.', true),
(7, 'Avanza con confianza hacia tus metas. Nada puede detenerte ahora.', true),

-- Carta 8
(8, 'Tu fortaleza interior brilla en los momentos más desafiantes.', true),
(8, 'La paciencia y la compasión son tus superpoderes en este día.', true),
(8, 'Confía en tu capacidad para superar cualquier obstáculo con gracia.', true),

-- Carta 9
(9, 'La sabiduría adquirida a través de las experiencias te ilumina el camino.', true),
(9, 'Tu madurez espiritual te permite ver la verdad más allá de las apariencias.', true),
(9, 'Es momento de compartir tu conocimiento y guiar a otros con tu luz.', true),

-- Carta 10
(10, 'Un ciclo se completa y otro comienza. Celebra tus logros y prepárate para nuevas aventuras.', true),
(10, 'El destino te sonríe. Las fuerzas del universo conspiran a tu favor.', true),
(10, 'Tu perseverancia ha dado frutos. Disfruta de este momento de plenitud.', true),

-- Carta 11
(11, 'La justicia divina obra en tu favor. La verdad prevalecerá sobre toda injusticia.', true),
(11, 'Tus decisiones equilibradas y justas traerán armonía a tu vida.', true),
(11, 'Actúa con integridad y honestidad. El karma trabaja a tu favor.', true),

-- Carta 12
(12, 'A veces es necesario pausar para ganar una nueva perspectiva de la vida.', true),
(12, 'El sacrificio presente se transforma en bendiciones futuras.', true),
(12, 'Suelta el control y permite que el universo te muestre el camino.', true),

-- Carta 13
(13, 'Las transformaciones profundas traen renovación y crecimiento espiritual.', true),
(13, 'Deja ir lo que ya no te sirve para hacer espacio a lo nuevo.', true),
(13, 'Los finales son también nuevos comienzos llenos de posibilidades.', true),

-- Carta 14
(14, 'El equilibrio y la moderación son las claves de tu bienestar hoy.', true),
(14, 'Encuentra la armonía perfecta entre todos los aspectos de tu vida.', true),
(14, 'Tu paciencia y serenidad atraen la paz que tanto buscas.', true),

-- Carta 15
(15, 'Libérate de las cadenas que tú mismo has creado. El poder está en tus manos.', true),
(15, 'Enfrenta tus miedos con valentía. Son solo ilusiones que limitan tu potencial.', true),
(15, 'Reconoce tus patrones negativos y transforma tu realidad desde adentro.', true),

-- Carta 16
(16, 'Los cambios repentinos revelan verdades ocultas que necesitabas conocer.', true),
(16, 'Destruye las estructuras falsas para construir sobre cimientos sólidos.', true),
(16, 'Las crisis traen oportunidades de crecimiento y renovación profunda.', true),

-- Carta 17
(17, 'Tu luz interior brilla intensamente, guiando el camino hacia tus sueños.', true),
(17, 'La esperanza renace en tu corazón. Confía en las posibilidades infinitas.', true),
(17, 'Las estrellas se alinean para cumplir tus deseos más profundos.', true),

-- Carta 18
(18, 'Confía en tu intuición para navegar a través de las ilusiones y encontrar la verdad.', true),
(18, 'Los misterios se revelan en los momentos de quietud y reflexión profunda.', true),
(18, 'Tu subconsciente te envía mensajes importantes a través de sueños y símbolos.', true),

-- Carta 19
(19, 'Tu vitalidad y energía positiva iluminan todo lo que tocas.', true),
(19, 'El éxito y la alegría te acompañan en cada paso que das.', true),
(19, 'Irradia tu luz y calor a todos los que te rodean.', true),

-- Carta 20
(20, 'Es momento de despertar a tu verdadero propósito y misión en la vida.', true),
(20, 'Las llamadas del destino resuenan claramente en tu corazón.', true),
(20, 'Tu renacimiento espiritual trae claridad y renovación total.', true),

-- Carta 21
(21, 'Has alcanzado un nivel superior de comprensión y sabiduría.', true),
(21, 'La culminación de tus esfuerzos trae satisfacción y plenitud completa.', true),
(21, 'Celebra tus logros y prepárate para el siguiente nivel de tu evolución.', true),

-- Carta 22
(22, 'Todo es posible cuando actúas desde el amor y la confianza absoluta.', true),
(22, 'Tu espontaneidad y autenticidad abren puertas mágicas en tu camino.', true),
(22, 'El universo conspira para crear milagros en tu vida diaria.', true);

-- 3. Función simple para obtener carta e interpretación aleatoria
CREATE OR REPLACE FUNCTION get_random_daily_reading()
RETURNS TABLE (
    card_id integer,
    card_name character varying,
    interpretation text,
    card_meaning text,
    image_url character varying
) 
LANGUAGE plpgsql
AS $$
DECLARE
    selected_card record;
    selected_interpretation text;
BEGIN
    -- Seleccionar carta aleatoria de tu tabla existente
    SELECT * INTO selected_card 
    FROM tarot_cards 
    ORDER BY random() 
    LIMIT 1;
    
    -- Seleccionar interpretación aleatoria para esa carta (especificar tabla explícitamente)
    SELECT ci.interpretation INTO selected_interpretation
    FROM card_interpretations ci
    WHERE ci.card_id = selected_card.id 
    ORDER BY random() 
    LIMIT 1;
    
    -- Retornar resultado usando los campos de tu esquema
    RETURN QUERY
    SELECT 
        selected_card.id,
        selected_card.name,
        COALESCE(selected_interpretation, 'Reflexiona sobre las energías de esta carta hoy.'),
        COALESCE(selected_card.interpretation_upright, selected_card.description, 'Carta especial del día'),
        selected_card.image_url;
END;
$$;

-- 4. Probar la función
SELECT * FROM get_random_daily_reading();
