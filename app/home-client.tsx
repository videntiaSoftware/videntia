"use client";
import { useState, useEffect } from "react";
import { AuthButtonClient } from "@/components/auth-button-client";
import TarotExperienceSteps from "@/components/tarot-experience-steps";
import SEONavigationSection from "@/components/SEONavigationSection";
import { createClient } from "@/lib/supabase/client";
import { serviceSchema, faqSchema } from "@/lib/schema";

export default function HomeClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setIsAuthenticated(!!data?.user);
        setUser(data?.user ? { email: data.user.email || '' } : null);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Mantener la posición del scroll cuando cambia el step
  const handleStepChange = (newStep: number) => {
    const currentScrollY = window.scrollY;
    setCurrentStep(newStep);
    
    // Si estamos pasando del step 0 al 1, mantener la posición
    if (newStep === 1) {
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
      }, 0);
    }
  };

  // Show minimal loading state that still has some content for SEO
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-amber-100">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent">
              Videntia - Lecturas de Tarot Gratis Online
            </h1>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto mb-8">
              Descubre tu destino con lecturas de tarot gratis online. Consultas personalizadas de amor, trabajo, dinero y crecimiento espiritual disponibles 24/7.
            </p>
            <div className="text-amber-300 flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Preparando tu experiencia de tarot...
            </div>
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
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Structured Data para la página principal */}
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
      
      <main className="min-h-screen flex flex-col items-center justify-start font-sans">
        <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header solo para usuarios autenticados */}
        {isAuthenticated && (
          <header className="flex justify-between items-center py-3 px-6 bg-gradient-to-r from-slate-900/40 to-purple-900/40 backdrop-blur-sm rounded-b-lg border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-sm">✨</span>
                </div>
                <div>
                  <h1 className="text-lg font-cinzel text-amber-300 font-bold leading-none">Videntia</h1>
                  <span className="text-xs text-amber-400/60 font-cormorant">Tarot Místico</span>
                </div>
              </div>
            </div>
            <AuthButtonClient user={user} />
          </header>
        )}

        {/* Experiencia interactiva de tarot */}
        <div className={`${isAuthenticated ? "mt-4" : ""} h-screen max-h-screen overflow-hidden`}>
          <TarotExperienceSteps onStepChange={handleStepChange} />
        </div>
        </div>
        
        {/* Sección de navegación SEO - Solo visible en steps 0 y 1, con separación apropiada */}
        {currentStep !== 2 && (
          <div className="mt-24 w-full">
            <SEONavigationSection />
          </div>
        )}
      </main>
    </>
  );
}
