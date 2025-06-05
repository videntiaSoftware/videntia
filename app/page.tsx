import { AuthButton } from "@/components/auth-button";
import TarotExperienceSteps from "@/components/tarot-experience-steps";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-4 px-2 font-sans">
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Sección destacada para login/registro y beneficios 
        <section className="mb-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-xl p-6 shadow-lg">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-amber-700 dark:text-amber-200 mb-2">Inicia sesión o regístrate</h2>
            <p className="text-amber-900 dark:text-amber-100 mb-2">Guarda tu historial de lecturas, accede a tus tiradas favoritas y personaliza tu experiencia.</p>
            <ul className="list-disc pl-5 text-amber-900 dark:text-amber-100 text-sm mb-2">
              <li>Historial de chats y lecturas</li>
              <li>Recordar tu tipo de lectura favorita</li>
              <li>Acceso a funciones exclusivas</li>
            </ul>
            <div className="mt-3">
              <AuthButton />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="rounded bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">Suscripción Premium $1.99 USD / $2000 ARS</span>
            <span className="text-xs text-amber-700 dark:text-amber-200">Accede a lecturas ilimitadas y contenido especial</span>
           
            <div className="w-32 h-16 bg-amber-200/60 dark:bg-slate-700/60 rounded-lg flex items-center justify-center text-amber-700 dark:text-amber-100 text-xs">[Anuncio aquí]</div>
          </div>
        </section>
        {/* Experiencia interactiva de tarot */}
        <TarotExperienceSteps />
      </div>
      {/* TODO: Agregar sección de testimonios de usuarios en la página principal */}
    </main>
  );
}
