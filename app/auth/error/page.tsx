import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

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
                Algo salió mal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-red-400 bg-red-900/20 p-3 rounded border border-red-500/30 mb-4 font-cormorant">
                  {params.error}
                </p>
              ) : (
                <p className="text-sm text-amber-200/70 mb-4 font-cormorant">
                  Ha ocurrido un error durante la autenticación. Por favor, intenta nuevamente.
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white font-cinzel">
                  <Link href="/auth/login">Volver al inicio de sesión</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-900/30 font-cormorant">
                  <Link href="/">Ir al inicio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
