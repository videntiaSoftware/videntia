import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-10 relative">
      {/* Fondo místico */}
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90 z-0" />
      
      {/* Contenido */}
      <div className="w-full max-w-sm relative z-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
