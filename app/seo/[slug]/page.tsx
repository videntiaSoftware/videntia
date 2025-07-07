import { Metadata } from "next";
import Link from "next/link";
import { serviceSchema, tarotReadingSchema, faqSchema } from "@/lib/schema";
import { notFound } from "next/navigation";

// SEO Keywords optimizados por categoría
const SEO_CONTENT = {
  "lecturas-tarot-amor": {
    title: "Lecturas de Tarot del Amor Gratis Online - Consulta tu Corazón",
    description: "Descubre los secretos de tu corazón con lecturas de tarot del amor gratis. Consulta sobre relaciones, alma gemela y futuro romántico. Tirada especializada en amor.",
    keywords: ["tarot amor gratis", "lecturas tarot pareja", "cartas amor", "consulta sentimental", "tarot relaciones", "alma gemela tarot"],
    content: `Las lecturas de tarot del amor te ayudan a comprender los aspectos más profundos de tu vida sentimental. 
    Nuestras consultas especializadas en amor utilizan spreads específicos para revelar:
    
    • El estado actual de tu relación
    • Las energías que rodean tu vida amorosa  
    • Consejos para fortalecer vínculos
    • Posibilidades de encontrar el amor verdadero
    • Obstáculos en las relaciones actuales
    
    El tarot del amor es una herramienta poderosa para la introspección romántica y el crecimiento personal en las relaciones.`
  },
  "lecturas-tarot-trabajo": {
    title: "Tarot del Trabajo y Carrera Profesional - Consulta Laboral Gratis",
    description: "Guía tu carrera profesional con lecturas de tarot del trabajo. Consulta sobre oportunidades laborales, cambios de trabajo y crecimiento profesional.",
    keywords: ["tarot trabajo", "carrera profesional tarot", "consulta laboral", "oportunidades trabajo", "tarot profesional", "futuro laboral"],
    content: `Las consultas de tarot profesional te brindan claridad sobre tu camino laboral y las oportunidades que te esperan.
    
    Aspectos que revelamos en las lecturas de trabajo:
    
    • Oportunidades laborales próximas
    • Momentos ideales para cambios profesionales
    • Relaciones con colegas y superiores
    • Desarrollo de habilidades profesionales
    • Obstáculos en el crecimiento laboral
    • Vocación y propósito profesional
    
    El tarot laboral es una guía valiosa para tomar decisiones profesionales informadas.`
  },
  "lecturas-tarot-dinero": {
    title: "Tarot del Dinero y Abundancia - Consulta Financiera Online",
    description: "Explora tu futuro financiero con lecturas de tarot del dinero. Consulta sobre inversiones, abundancia y prosperidad económica.",
    keywords: ["tarot dinero", "abundancia tarot", "consulta financiera", "prosperidad", "tarot económico", "riqueza tarot"],
    content: `Las lecturas de tarot financiero te ayudan a comprender las energías que rodean tu situación económica.
    
    Revelamos aspectos clave sobre tu dinero:
    
    • Oportunidades de ingresos adicionales
    • Momentos favorables para inversiones
    • Bloqueos financieros a superar
    • Patrones de gasto y ahorro
    • Abundancia y prosperidad futura
    • Decisiones financieras importantes
    
    El tarot económico te guía hacia una relación más saludable con el dinero y la abundancia.`
  },
  "lecturas-tarot-salud": {
    title: "Tarot de la Salud y Bienestar - Consulta Holística Online",
    description: "Consulta el tarot para insights sobre tu salud y bienestar. Enfoque holístico en equilibrio físico, mental y espiritual.",
    keywords: ["tarot salud", "bienestar tarot", "consulta holística", "equilibrio tarot", "sanación", "salud espiritual"],
    content: `Las lecturas de tarot de la salud ofrecen una perspectiva holística sobre tu bienestar general.
    
    Exploramos aspectos importantes de tu salud:
    
    • Equilibrio físico, mental y espiritual
    • Patrones energéticos que afectan tu salud
    • Momentos para cuidar tu bienestar
    • Hábitos saludables a desarrollar
    • Sanación emocional necesaria
    • Prevención y autocuidado
    
    El tarot de la salud complementa el cuidado médico tradicional con insights espirituales.`
  },
  "tarot-gratis-online": {
    title: "Tarot Gratis Online - Lecturas de Cartas Auténticas 24/7",
    description: "Tarot gratis online las 24 horas. Lecturas auténticas con cartas digitales, interpretaciones profesionales y consultas ilimitadas.",
    keywords: ["tarot gratis", "tarot online", "cartas gratis", "lectura tarot", "consulta gratuita", "tarot 24 horas"],
    content: `Nuestro tarot gratis online te ofrece acceso inmediato a lecturas auténticas las 24 horas del día.
    
    Beneficios de nuestro tarot gratuito:
    
    • Acceso instantáneo sin registro
    • Múltiples tipos de tiradas disponibles
    • Interpretaciones detalladas y personalizadas
    • Cartas del tarot tradicional de 78 cartas
    • Consultas ilimitadas diarias
    • Interfaz intuitiva y fácil de usar
    
    Experimenta la sabiduría del tarot sin costo alguno, con la misma calidad de lecturas profesionales.`
  },
  "cartas-tarot-significado": {
    title: "Significado de las Cartas del Tarot - Guía Completa de Arcanos",
    description: "Aprende el significado completo de las 78 cartas del tarot. Guía detallada de arcanos mayores y menores con interpretaciones tradicionales.",
    keywords: ["significado cartas tarot", "arcanos significado", "interpretar tarot", "simbología tarot", "cartas tarot guía"],
    content: `Descubre el significado profundo de cada carta del tarot en nuestra guía completa de los 78 arcanos.
    
    Nuestra base de conocimiento incluye:
    
    • 22 Arcanos Mayores con interpretaciones detalladas
    • 56 Arcanos Menores organizados por palos
    • Significados en posición normal e invertida
    • Simbolismo tradicional y moderno
    • Contextos específicos (amor, trabajo, dinero, salud)
    • Combinaciones de cartas importantes
    
    Comprende la sabiduría ancestral del tarot a través del estudio profundo de cada carta.`
  },
  "tirada-cruz-celta": {
    title: "Tirada Cruz Celta - Lectura Completa de 10 Cartas Online",
    description: "La tirada de Cruz Celta es la lectura más completa del tarot. 10 cartas que revelan pasado, presente, futuro y influencias ocultas.",
    keywords: ["cruz celta tarot", "tirada 10 cartas", "lectura completa", "spread cruz celta", "tarot avanzado"],
    content: `La tirada de Cruz Celta es considerada la lectura más completa y reveladora del tarot tradicional.
    
    Esta poderosa tirada de 10 cartas revela:
    
    • Situación presente y influencias actuales
    • Desafíos y obstáculos a enfrentar
    • Pasado que influye en el presente
    • Futuro probable y posibilidades
    • Corona: el mejor resultado posible
    • Fundamento: la base de la situación
    • Pasado reciente y su impacto
    • Tu aproximación al problema
    • Influencias externas y del entorno
    • Resultado final y conclusión
    
    La Cruz Celta ofrece una visión panorámica completa de cualquier situación importante.`
  },
  "arcanos-mayores": {
    title: "Arcanos Mayores del Tarot - Los 22 Arcanos Principales",
    description: "Explora los 22 Arcanos Mayores del tarot, desde El Loco hasta El Mundo. Significados, simbolismo y interpretaciones de las cartas principales.",
    keywords: ["arcanos mayores", "22 arcanos", "cartas mayores tarot", "simbolismo arcanos", "tarot marsella"],
    content: `Los 22 Arcanos Mayores representan el viaje del alma y las grandes lecciones de vida en el tarot.
    
    Los Arcanos Mayores incluyen:
    
    • El Loco (0) - Nuevos comienzos y fe
    • El Mago (I) - Manifestación y poder personal
    • La Sacerdotisa (II) - Intuición y misterio
    • La Emperatriz (III) - Creatividad y abundancia
    • El Emperador (IV) - Autoridad y estructura
    • El Hierofante (V) - Tradición y enseñanza
    • Los Enamorados (VI) - Elección y amor
    • El Carro (VII) - Triunfo y determinación
    • La Justicia (VIII) - Equilibrio y verdad
    • El Ermitaño (IX) - Búsqueda interior
    • La Rueda de la Fortuna (X) - Ciclos y destino
    • La Fuerza (XI) - Coraje y control interior
    • El Colgado (XII) - Sacrificio y nueva perspectiva
    • La Muerte (XIII) - Transformación y renacimiento
    • La Templanza (XIV) - Moderación y paciencia
    • El Diablo (XV) - Tentación y liberación
    • La Torre (XVI) - Cambio súbito y revelación
    • La Estrella (XVII) - Esperanza y inspiración
    • La Luna (XVIII) - Ilusión y subconsciencia
    • El Sol (XIX) - Éxito y vitalidad
    • El Juicio (XX) - Renacimiento y perdón
    • El Mundo (XXI) - Culminación y logro
    
    Cada Arcano Mayor porta una lección espiritual profunda y universal.`
  },
  "arcanos-menores": {
    title: "Arcanos Menores del Tarot - Las 56 Cartas de los Cuatro Palos",
    description: "Descubre los Arcanos Menores del tarot: Copas, Espadas, Bastos y Oros. 56 cartas que representan situaciones cotidianas y aspectos prácticos.",
    keywords: ["arcanos menores", "copas espadas bastos oros", "cartas menores tarot", "56 cartas tarot", "palos tarot"],
    content: `Los 56 Arcanos Menores del tarot representan las experiencias cotidianas y los aspectos prácticos de la vida.
    
    Los cuatro palos de los Arcanos Menores:
    
    **COPAS (Agua - Emociones)**
    • Representan amor, emociones, relaciones y espiritualidad
    • Del As al 10, más las figuras de la corte
    • Conectados con el elemento agua y los sentimientos
    
    **ESPADAS (Aire - Mente)**
    • Simbolizan pensamientos, comunicación, conflictos y desafíos
    • Relacionadas con la mente y la lógica
    • Pueden indicar tanto claridad mental como problemas
    
    **BASTOS (Fuego - Acción)**
    • Representan creatividad, pasión, trabajo y energía
    • Conectados con proyectos, ambiciones y crecimiento
    • Simbolizan la fuerza vital y la inspiración
    
    **OROS (Tierra - Material)**
    • Relacionados con dinero, trabajo, salud y aspectos materiales
    • Representan la manifestación física y la prosperidad
    • Conectados con el mundo tangible y los recursos
    
    Cada palo contiene cartas numeradas (As-10) y figuras de la corte (Sota, Caballero, Reina, Rey).`
  }
};

interface SEOPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SEOPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = SEO_CONTENT[slug as keyof typeof SEO_CONTENT];
  
  if (!content) {
    return {
      title: "Página no encontrada",
      description: "La página que buscas no existe"
    };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(SEO_CONTENT).map((slug) => ({
    slug: slug,
  }));
}

export default async function SEOPage({ params }: SEOPageProps) {
  const { slug } = await params;
  const content = SEO_CONTENT[slug as keyof typeof SEO_CONTENT];
  
  if (!content) {
    notFound();
  }

  const readingType = slug.includes('amor') ? 'Amor' : 
                     slug.includes('trabajo') ? 'Trabajo' : 
                     slug.includes('dinero') ? 'Dinero' : 
                     slug.includes('salud') ? 'Salud' : 'General';

  return (
    <>
      {/* Structured Data específico para cada página */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {slug.includes('lecturas') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tarotReadingSchema(readingType)),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      {/* Contenido SEO oculto - Solo para crawlers */}
      <div style={{ display: 'none' }}>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        
        {/* Contenido extendido para SEO */}
        <div>
          {content.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim().startsWith('•')) {
              return <li key={index}>{paragraph.trim().substring(1)}</li>;
            }
            return paragraph.trim() ? <p key={index}>{paragraph.trim()}</p> : null;
          })}
        </div>

        {/* Keywords adicionales para SEO */}
        <div>
          {content.keywords.map((keyword) => (
            <span key={keyword}>{keyword} </span>
          ))}
        </div>

        {/* Texto adicional para SEO */}
        <div>
          <h2>Consulta de Tarot Online Gratis</h2>
          <p>Videntia Tarot ofrece lecturas auténticas y personalizadas las 24 horas del día. 
          Nuestro sistema utiliza las 78 cartas tradicionales del tarot para brindarte 
          interpretaciones precisas y significativas.</p>
          
          <h3>¿Por qué elegir Videntia para tus consultas de tarot?</h3>
          <ul>
            <li>Lecturas gratuitas diarias sin límites</li>
            <li>Interpretaciones detalladas y personalizadas</li>
            <li>Múltiples tipos de tiradas disponibles</li>
            <li>Interfaz intuitiva y fácil de usar</li>
            <li>Disponible 24/7 desde cualquier dispositivo</li>
            <li>Privacidad y confidencialidad garantizada</li>
          </ul>

          <h3>Tipos de lecturas disponibles</h3>
          <p>Tenemos una amplia variedad de spreads y tiradas especializadas:</p>
          <ul>
            <li>Tirada de 3 cartas (Pasado, Presente, Futuro)</li>
            <li>Cruz Celta completa (10 cartas)</li>
            <li>Lectura Sí o No</li>
            <li>Lecturas especializadas en Amor</li>
            <li>Consultas de Trabajo y Carrera</li>
            <li>Análisis Financiero y Abundancia</li>
            <li>Lecturas de Crecimiento Espiritual</li>
          </ul>
        </div>
      </div>

      {/* CTA para usar la aplicación principal */}
      <div className="mt-8 text-center bg-gradient-to-r from-violet-800 to-purple-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-amber-300 mb-4">¿Listo para tu lectura personalizada?</h3>
        <p className="text-amber-200 mb-4">Accede a todas nuestras lecturas de tarot interactivas y descubre tu destino</p>
        <Link 
          href="/" 
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Comenzar Lectura Gratis
        </Link>
      </div>
    </>
  );
}
