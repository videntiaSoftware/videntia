"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-400" />
          </div>
          <CardTitle className="text-2xl font-cinzel text-amber-300">
            Error de Autenticación
          </CardTitle>
          <CardDescription className="text-amber-200/80 font-cormorant">
            Hubo un problema al procesar tu inicio de sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-amber-200/70 text-center font-cormorant">
            No pudimos completar tu inicio de sesión. Esto puede deberse a:
          </p>
          <ul className="text-amber-200/70 text-sm space-y-2 font-cormorant">
            <li>• El enlace de autenticación expiró</li>
            <li>• Ya usaste este enlace anteriormente</li>
            <li>• Hubo un problema temporal</li>
          </ul>
          
          <div className="space-y-3 pt-4">
            <Button asChild className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
              <Link href="/auth/login" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
