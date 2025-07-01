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
  }
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
          <h1 className="text-5xl font-bold text-amber-300 mb-6 font-cinzel">
            Blog de Tarot
          </h1>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            Descubre la sabiduría del tarot con nuestras guías completas, análisis de cartas 
            y técnicas avanzadas de interpretación.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
            ✨ Artículos Destacados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <article key={index} className="bg-slate-800/50 rounded-lg border border-purple-600 hover:border-amber-400 transition-all group">
                <div className="p-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform text-center">
                    {post.image}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-600 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </span>
                    <span className="text-purple-300 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-purple-200 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-sm"
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
                className="px-4 py-2 rounded-full border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
            📚 Todos los Artículos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <article key={index} className="bg-slate-800/50 rounded-lg border border-purple-600 hover:border-amber-400 transition-all group">
                <div className="p-5">
                  <div className="text-4xl mb-3 text-center">{post.image}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-purple-300 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-purple-200 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-sm"
                  >
                    Leer artículo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="text-center bg-gradient-to-r from-purple-800 to-amber-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-amber-300 mb-4">
            ¿Te gustó nuestro contenido?
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            Explora nuestras lecturas gratuitas y descubre qué revelan las cartas para ti.
          </p>
          <Link 
            href="/" 
            className="bg-amber-600 hover:bg-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
          >
            🔮 Probar Lectura Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}
  {
    title: 'Guía Completa: Significados de los Arcanos Mayores',
    excerpt: 'Descubre el significado profundo de las 22 cartas de los Arcanos Mayores del tarot y cómo interpretarlas en tus lecturas.',
    category: 'Guías',
    date: '2024-01-15',
    readTime: '10 min',
    slug: 'significados-arcanos-mayores'
  },
  {
    title: 'Los Mejores Spreads de Tarot para Principiantes',
    excerpt: 'Aprende los spreads más efectivos para comenzar a leer el tarot, desde la tirada de 3 cartas hasta la Cruz Celta.',
    category: 'Spreads',
    date: '2024-01-12',
    readTime: '8 min',
    slug: 'spreads-tarot-principiantes'
  },
  {
    title: 'Cómo Interpretar las Cartas de Copas en el Amor',
    excerpt: 'Todo lo que necesitas saber sobre el palo de Copas y su relación con las emociones, el amor y las relaciones.',
    category: 'Amor',
    date: '2024-01-10',
    readTime: '6 min',
    slug: 'cartas-copas-amor'
  },
  {
    title: 'El Significado de La Muerte en el Tarot',
    excerpt: 'Desmitifica una de las cartas más temidas del tarot y descubre su verdadero significado de transformación.',
    category: 'Arcanos',
    date: '2024-01-08',
    readTime: '5 min',
    slug: 'significado-carta-muerte'
  },
  {
    title: 'Pentáculos y Abundancia: Guía del Palo de Oros',
    excerpt: 'Explora el mundo material a través de las cartas de Pentáculos y su relación con el dinero y la prosperidad.',
    category: 'Dinero',
    date: '2024-01-05',
    readTime: '7 min',
    slug: 'pentaculos-abundancia-dinero'
  },
  {
    title: 'Espadas en el Tarot: Mente y Conflictos',
    excerpt: 'Comprende el palo de Espadas, su conexión con los pensamientos, la comunicación y los desafíos mentales.',
    category: 'Guías',
    date: '2024-01-03',
    readTime: '9 min',
    slug: 'espadas-tarot-mente-conflictos'
  }
]

const categories = ['Todas', 'Guías', 'Spreads', 'Amor', 'Arcanos', 'Dinero', 'Trabajo', 'Salud']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog de <span className="text-purple-400">Tarot</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Sumérgete en el fascinante mundo del tarot con nuestras guías expertas, 
            significados de cartas y consejos para mejorar tus lecturas.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="bg-purple-800/50 text-purple-200 border-purple-600 hover:bg-purple-700/50 cursor-pointer">
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-purple-800/50 border-purple-600 hover:bg-purple-800/70 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-purple-600 text-white">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <CardTitle className="text-white hover:text-purple-300 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex justify-between items-center text-sm text-purple-300">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 hover:text-purple-100 transition-colors">
                    <Eye className="h-4 w-4" />
                    Leer más
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Aprende Tarot con Nuestro Blog Especializado</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-4">
              <p>
                Nuestro blog de tarot está diseñado para acompañarte en tu viaje de aprendizaje, 
                desde los conceptos básicos hasta técnicas avanzadas de lectura e interpretación.
              </p>
              
              <h3 className="text-xl text-purple-400 font-semibold">¿Qué Encontrarás en Nuestro Blog?</h3>
              <ul className="space-y-2">
                <li>• <strong>Significados de Cartas:</strong> Interpretaciones detalladas de cada carta del tarot</li>
                <li>• <strong>Spreads y Tiradas:</strong> Diferentes métodos de lectura para distintas consultas</li>
                <li>• <strong>Guías por Temas:</strong> Contenido especializado en amor, trabajo, dinero y salud</li>
                <li>• <strong>Historia del Tarot:</strong> Orígenes y evolución de esta ancestral práctica</li>
                <li>• <strong>Consejos Prácticos:</strong> Tips para mejorar tus habilidades de lectura</li>
                <li>• <strong>Simbolismo:</strong> Comprende los símbolos ocultos en cada carta</li>
              </ul>

              <h3 className="text-xl text-purple-400 font-semibold">Para Todos los Niveles:</h3>
              <p>
                Ya seas un completo principiante o un lector experimentado, nuestros artículos están 
                diseñados para proporcionarte valor y nuevas perspectivas. Cada artículo incluye 
                ejemplos prácticos y consejos aplicables inmediatamente en tus lecturas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
