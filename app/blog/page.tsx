import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog de Tarot - Guías, Significados y Sabiduría Espiritual",
  description: "Blog especializado en tarot con guías completas, significados de cartas, spreads y consejos para lecturas. Aprende tarot desde principiante hasta experto.",
  keywords: [
    "blog tarot", "guias tarot", "aprender tarot", "significado cartas",
    "spreads tarot", "lecturas tarot", "tarot principiantes", "curso tarot",
    "interpretacion cartas", "simbolismo tarot", "arcanos mayores", "arcanos menores"
  ],
  openGraph: {
    title: "Blog de Tarot - Guías y Sabiduría Espiritual",
    description: "Blog especializado en tarot con guías completas y significados de cartas.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

const blogPosts = [
  {
    title: "Significado Completo de los 22 Arcanos Mayores",
    excerpt: "Guía detallada de cada uno de los 22 Arcanos Mayores del tarot, su simbolismo, significados en diferentes contextos y cómo interpretarlos.",
    slug: "significado-completo-arcanos-mayores",
    category: "Cartas",
    readTime: "15 min",
    featured: true,
    image: "🎴"
  },
  {
    title: "Cómo Hacer una Lectura de Tarot para Principiantes",
    excerpt: "Tutorial paso a paso para realizar tu primera lectura de tarot. Desde la preparación hasta la interpretación final.",
    slug: "como-hacer-lectura-tarot-principiantes",
    category: "Guías",
    readTime: "12 min",
    featured: true,
    image: "🔮"
  },
  {
    title: "Los 5 Spreads de Tarot Más Populares y Efectivos",
    excerpt: "Descubre las tiradas de tarot más utilizadas: Cruz Celta, 3 cartas, Herradura y más. Con instrucciones detalladas.",
    slug: "spreads-tarot-mas-populares",
    category: "Spreads",
    readTime: "10 min",
    featured: true,
    image: "✨"
  },
  {
    title: "Tarot del Amor: Cómo Interpretar las Cartas en Relaciones",
    excerpt: "Especialízate en lecturas de amor. Qué cartas favorecen el romance, cómo interpretar relaciones y timing en el amor.",
    slug: "tarot-amor-interpretar-relaciones",
    category: "Amor",
    readTime: "8 min",
    featured: false,
    image: "💕"
  },
  {
    title: "Historia del Tarot: Desde sus Orígenes hasta Hoy",
    excerpt: "Viaje a través de la historia del tarot, desde sus misteriosos orígenes hasta su popularidad actual.",
    slug: "historia-tarot-origenes",
    category: "Historia",
    readTime: "12 min",
    featured: false,
    image: "📜"
  },
  {
    title: "Diferencias Entre Tarot de Marsella y Rider-Waite",
    excerpt: "Comparación detallada entre las dos barajas más populares del mundo: sus diferencias, ventajas y cuál elegir.",
    slug: "tarot-marsella-vs-rider-waite",
    category: "Barajas",
    readTime: "7 min",
    featured: false,
    image: "🃏"
  },
  {
    title: "Los 4 Palos del Tarot y sus Elementos",
    excerpt: "Comprende profundamente Copas, Espadas, Bastos y Oros. Su correspondencia elemental y significados.",
    slug: "cuatro-palos-tarot-elementos",
    category: "Cartas",
    readTime: "9 min",
    featured: false,
    image: "🌊"
  },
  {
    title: "Tarot y Astrología: Conexiones y Correspondencias",
    excerpt: "Descubre las fascinantes conexiones entre el tarot y la astrología. Cartas, signos y planetas.",
    slug: "tarot-astrologia-correspondencias",
    category: "Astrología",
    readTime: "11 min",
    featured: false,
    image: "⭐"
  },
  {
    title: "Errores Comunes al Leer Tarot y Cómo Evitarlos",
    excerpt: "Los 10 errores más frecuentes que cometen los principiantes en tarot y consejos para evitarlos.",
    slug: "errores-comunes-leer-tarot",
    category: "Guías",
    readTime: "6 min",
    featured: false,
    image: "⚠️"
  },
  {
    title: "Cómo Desarrollar tu Intuición para el Tarot",
    excerpt: "Técnicas y ejercicios prácticos para desarrollar y confiar en tu intuición al leer las cartas.",
    slug: "desarrollar-intuicion-tarot",
    category: "Desarrollo",
    readTime: "8 min",
    featured: false,
    image: "🧘"
  },
  {
    title: "El Mundo Simbólico del Tarot: Colores, Números y Símbolos",
    excerpt: "Profundiza en el rico simbolismo del tarot: qué representan los colores, números y símbolos recurrentes.",
    slug: "simbolismo-tarot-colores-numeros",
    category: "Simbolismo",
    readTime: "13 min",
    featured: false,
    image: "🎨"
  },
  {
    title: "Tarot para el Trabajo y la Carrera Profesional",
    excerpt: "Especialízate en lecturas laborales. Cómo interpretar oportunidades, cambios y éxito profesional.",
    slug: "tarot-trabajo-carrera-profesional",
    category: "Trabajo",
    readTime: "9 min",
    featured: false,
    image: "💼"
  },
  {
    title: "Rituales y Preparación para Lecturas de Tarot",
    excerpt: "Aprende a preparar el espacio, limpiar las cartas y crear rituales que potencien tus lecturas.",
    slug: "rituales-preparacion-lecturas-tarot",
    category: "Rituales",
    readTime: "7 min",
    featured: false,
    image: "🕯️"
  },
  {
    title: "Timing en el Tarot: ¿Cuándo Sucederán las Predicciones?",
    excerpt: "Métodos para interpretar marcos temporales en el tarot y dar timing aproximado en las predicciones.",
    slug: "timing-tarot-predicciones",
    category: "Técnicas",
    readTime: "10 min",
    featured: false,
    image: "⏰"
  },
  {
    title: "Las Cartas de la Corte: Reyes, Reinas, Caballeros y Sotas",
    excerpt: "Guía completa para interpretar las 16 cartas de la corte y sus personalidades arquetípicas.",
    slug: "cartas-corte-interpretacion",
    category: "Cartas",
    readTime: "14 min",
    featured: false,
    image: "👑"
  },
  {
    title: "Tarot Evolutivo: El Viaje del Alma a través de los Arcanos",
    excerpt: "Comprende el tarot como un mapa del desarrollo espiritual y el viaje evolutivo del alma.",
    slug: "tarot-evolutivo-viaje-alma",
    category: "Espiritualidad",
    readTime: "12 min",
    featured: false,
    image: "🌟"
  },
  {
    title: "Cómo Hacer Preguntas Efectivas al Tarot",
    excerpt: "El arte de formular preguntas que generen respuestas útiles y precisas en las lecturas de tarot.",
    slug: "como-hacer-preguntas-efectivas-tarot",
    category: "Guías",
    readTime: "6 min",
    featured: false,
    image: "❓"
  },
  {
    title: "Tarot Terapéutico: Sanación a través de las Cartas",
    excerpt: "Cómo usar el tarot como herramienta de autoconocimiento, sanación emocional y crecimiento personal.",
    slug: "tarot-terapeutico-sanacion",
    category: "Terapia",
    readTime: "11 min",
    featured: false,
    image: "🌈"
  },
  {
    title: "Los Ases del Tarot: Nuevos Comienzos y Oportunidades",
    excerpt: "Análisis profundo de los 4 Ases del tarot y su poder para indicar nuevos inicios en todas las áreas de vida.",
    slug: "ases-tarot-nuevos-comienzos",
    category: "Cartas",
    readTime: "8 min",
    featured: false,
    image: "🌱"
  },
  {
    title: "Ética en las Lecturas de Tarot: Responsabilidad del Lector",
    excerpt: "Principios éticos fundamentales para lectores de tarot profesionales y aficionados.",
    slug: "etica-lecturas-tarot-responsabilidad",
    category: "Ética",
    readTime: "9 min",
    featured: false,
    image: "⚖️"
  },
  // NUEVOS ARTÍCULOS COMPLETOS
  {
    title: "Cómo Elegir tu Primera Baraja de Tarot: Guía para Principiantes",
    excerpt: "Consejos prácticos y criterios clave para seleccionar tu primer mazo de tarot. Diferencias entre barajas, materiales, simbología y conexión personal.",
    slug: "elegir-baraja-tarot-principiantes",
    category: "Guías",
    readTime: "10 min",
    featured: true,
    image: "🃏"
  },
  {
    title: "Tarot y Psicología: El Inconsciente en las Cartas",
    excerpt: "Explora la relación entre el tarot y la psicología profunda. Cómo las cartas reflejan arquetipos, patrones inconscientes y procesos de autoconocimiento.",
    slug: "tarot-psicologia-inconsciente",
    category: "Psicología",
    readTime: "13 min",
    featured: false,
    image: "🧠"
  },
  {
    title: "Cómo Interpretar Combinaciones de Cartas en el Tarot",
    excerpt: "Aprende a leer combinaciones de cartas para obtener mensajes más ricos y precisos. Ejemplos prácticos y consejos avanzados.",
    slug: "interpretar-combinaciones-cartas-tarot",
    category: "Técnicas",
    readTime: "14 min",
    featured: false,
    image: "🔗"
  },
  {
    title: "Tarot para la Toma de Decisiones Difíciles",
    excerpt: "Utiliza el tarot como herramienta de apoyo en momentos de incertidumbre. Métodos para clarificar opciones y visualizar consecuencias.",
    slug: "tarot-toma-decisiones",
    category: "Guías",
    readTime: "11 min",
    featured: false,
    image: "⚖️"
  },
  {
    title: "El Tarot y la Meditación: Prácticas para la Intuición",
    excerpt: "Descubre ejercicios de meditación con cartas para potenciar tu intuición y conexión espiritual. Guía paso a paso para integrar ambas prácticas.",
    slug: "tarot-meditacion-intuicion",
    category: "Espiritualidad",
    readTime: "12 min",
    featured: false,
    image: "🧘‍♂️"
  },
];

const categories = ["Todos", "Cartas", "Guías", "Spreads", "Amor", "Historia", "Simbolismo", "Técnicas"];

export default function BlogIndex() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel drop-shadow-lg">
            Blog de Tarot
          </h1>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            Descubre la sabiduría del tarot con nuestras guías completas, análisis de cartas y técnicas avanzadas de interpretación.
          </p>
        </div>
        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center drop-shadow">
            ✨ Artículos Destacados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <article key={index} className="bg-gradient-to-br from-purple-800/80 to-slate-900/80 rounded-2xl border-2 border-purple-600 hover:border-amber-400 shadow-xl transition-all group overflow-hidden">
                <div className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform text-center drop-shadow-xl">
                      {post.image}
                    </div>
                    <div className="flex items-center gap-3 mb-3 justify-center">
                      <span className="bg-amber-600 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                        {post.category}
                      </span>
                      <span className="text-purple-200 text-sm">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-200 mb-3 group-hover:text-amber-100 transition-colors text-center">
                      {post.title}
                    </h3>
                    <p className="text-purple-100 text-base mb-4 line-clamp-4 text-center">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-amber-400 hover:text-amber-200 font-semibold text-base text-center border border-amber-400 rounded-full px-6 py-2 transition-colors shadow hover:bg-amber-400/10"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full border-2 border-purple-600 hover:bg-purple-700 hover:text-white transition-colors text-sm font-semibold shadow"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* All Posts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center drop-shadow">
            📚 Todos los Artículos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article key={index} className="bg-gradient-to-br from-purple-800/80 to-slate-900/80 rounded-2xl border-2 border-purple-600 hover:border-amber-400 shadow-lg transition-all group overflow-hidden">
                <div className="p-7 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-5xl mb-3 text-center drop-shadow-xl">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                        {post.category}
                      </span>
                      <span className="text-purple-200 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-amber-200 mb-2 group-hover:text-amber-100 transition-colors text-center">
                      {post.title}
                    </h3>
                    <p className="text-purple-100 text-sm mb-3 line-clamp-3 text-center">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-block text-amber-400 hover:text-amber-200 font-semibold text-sm text-center border border-amber-400 rounded-full px-5 py-2 transition-colors shadow hover:bg-amber-400/10"
                  >
                    Leer artículo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* Newsletter CTA */}
        <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-10 rounded-2xl shadow-xl mt-12">
          <h2 className="text-3xl font-bold text-amber-300 mb-4 drop-shadow">
            ¿Te gustó nuestro contenido?
          </h2>
          <p className="text-xl text-purple-100 mb-6">
            Explora nuestras lecturas gratuitas y descubre qué revelan las cartas para ti.
          </p>
          <Link 
            href="/" 
            className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-10 py-5 rounded-full font-bold text-lg transition-colors inline-block shadow-lg"
          >
            🔮 Probar Lectura Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
