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

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-amber-300">Cargando...</div>
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
