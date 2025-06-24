import { AuthButton } from "@/components/auth-button";
import TarotExperienceSteps from "@/components/tarot-experience-steps";
import { createClient } from "@/app/_helpers/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isAuthenticated = !!data?.user;

  return (
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
            <AuthButton />
          </header>
        )}

        {/* Experiencia interactiva de tarot */}
        <div className={isAuthenticated ? "mt-4" : ""}>
          <TarotExperienceSteps />
        </div>
      </div>
    </main>
  );
}
