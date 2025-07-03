"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://videntia.vercel.app'}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-cinzel text-amber-300">Revisa tu Email</CardTitle>
            <CardDescription className="text-amber-200/80 font-cormorant">
              Te hemos enviado las instrucciones para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-200/70 font-cormorant">
              Si te registraste usando tu email y contraseña, recibirás un correo
              para restablecer tu contraseña.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-cinzel text-amber-300">Restablecer Contraseña</CardTitle>
            <CardDescription className="text-amber-200/80 font-cormorant">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-amber-200 font-cormorant">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/70 border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 focus:ring-amber-400/50"
                  />
                </div>
                {error && <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded border border-red-500/30">{error}</p>}
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-cinzel font-semibold" 
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 text-amber-300 hover:text-amber-200 font-semibold"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
