import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-10 relative">
      {/* Fondo místico */}
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-20 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90 z-0" />
      
      {/* Contenido */}
      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col gap-6">
          <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-cinzel text-amber-300">
                ¡Bienvenido a Videntia!
              </CardTitle>
              <CardDescription className="text-amber-200/80 font-cormorant">
                Revisa tu email para confirmar tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-200/70 font-cormorant">
                Te has registrado exitosamente. Por favor revisa tu email para
                confirmar tu cuenta antes de iniciar sesión.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/auth/login"
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 font-semibold"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
