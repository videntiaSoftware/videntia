import { Metadata } from "next";
import HomeClient from "./home-client";
import { serviceSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Videntia - Lecturas de Tarot Gratis Online 24/7",
  description: "Descubre tu destino con lecturas de tarot gratis online. Consultas personalizadas de amor, trabajo, dinero y crecimiento espiritual. Disponible 24 horas.",
  keywords: [
    "tarot gratis online", "lecturas tarot", "consulta tarot", "cartas tarot gratis",
    "tarot amor", "tarot trabajo", "tarot dinero", "videncia online",
    "tirada 3 cartas", "cruz celta", "arcanos mayores", "arcanos menores"
  ],
  openGraph: {
    title: "Videntia - Lecturas de Tarot Gratis Online 24/7",
    description: "Consultas de tarot personalizadas y gratuitas. Descubre tu futuro en amor, trabajo y crecimiento personal.",
  },
  twitter: {
    title: "Videntia - Tarot Gratis Online",
    description: "Lecturas de tarot auténticas y personalizadas disponibles 24/7.",
  },
  alternates: {
    canonical: "https://videntiatarot.com/",
  }
};

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      {/* SEO-friendly fallback content that renders immediately on server */}
      <noscript>
        <main className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100">
          <div className="container mx-auto px-4 py-16">
            <header className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent">
                Videntia - Lecturas de Tarot Gratis Online
              </h1>
              <p className="text-xl text-amber-200 max-w-2xl mx-auto">
                Descubre tu destino con lecturas de tarot gratis online. Consultas personalizadas de amor, trabajo, dinero y crecimiento espiritual disponibles 24/7.
              </p>
            </header>
            
            <section className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                <h2 className="text-2xl font-bold text-amber-300 mb-4">Tarot del Amor</h2>
                <p className="text-purple-200">Descubre los secretos de tu corazón y las energías románticas que te rodean.</p>
              </div>
              <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                <h2 className="text-2xl font-bold text-amber-300 mb-4">Tarot Laboral</h2>
                <p className="text-purple-200">Encuentra claridad sobre tu carrera profesional y oportunidades de trabajo.</p>
              </div>
              <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                <h2 className="text-2xl font-bold text-amber-300 mb-4">Tarot del Dinero</h2>
                <p className="text-purple-200">Explora las energías financieras y descubre el camino hacia la abundancia.</p>
              </div>
            </section>
            
            <div className="text-center">
              <p className="text-lg text-amber-200 mb-4">Este sitio requiere JavaScript para funcionar completamente.</p>
              <p className="text-purple-300">Por favor, habilita JavaScript para acceder a las lecturas interactivas de tarot.</p>
            </div>
          </div>
        </main>
      </noscript>
      
      <HomeClient />
    </>
  );
}
