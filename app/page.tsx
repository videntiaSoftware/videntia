import { AuthButton } from "@/components/auth-button";
import TarotExperience from "@/components/tarot-experience";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-gradient-to-b from-purple-950 to-slate-900 text-white font-sans">
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Sección destacada para login/registro y beneficios */}
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
          {/* Placeholder para anuncio/banner premium */}
          <div className="flex flex-col items-center gap-2">
            <span className="rounded bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">Suscripción Premium $1.99 USD / $2000 ARS</span>
            <span className="text-xs text-amber-700 dark:text-amber-200">Accede a lecturas ilimitadas y contenido especial</span>
            {/* Placeholder para anuncio visual */}
            <div className="w-32 h-16 bg-amber-200/60 dark:bg-slate-700/60 rounded-lg flex items-center justify-center text-amber-700 dark:text-amber-100 text-xs">[Anuncio aquí]</div>
          </div>
        </section>
        {/* Placeholder para historial de chats (solo si autenticado) */}
        {/* TODO: Mostrar historial real si el usuario está autenticado */}
        <section className="mb-8">
          <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow text-slate-800 dark:text-slate-100">
            <h3 className="font-semibold text-lg mb-2 text-amber-700 dark:text-amber-200">Historial de lecturas</h3>
            <div className="text-slate-500 dark:text-slate-400 text-sm">Inicia sesión para ver tu historial de lecturas y chats aquí.</div>
            {/* Placeholder para historial de chats */}
            <div className="mt-2 w-full h-16 bg-slate-100/60 dark:bg-slate-800/60 rounded flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs">[Historial de chats aquí]</div>
          </div>
        </section>
        {/* Experiencia interactiva de tarot */}
        <TarotExperience />
      </div>
    </main>
  );
}
