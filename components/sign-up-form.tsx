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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Crown, Sparkles, Mail, Phone } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptNotifications, setAcceptNotifications] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const redirectTo =
        (process.env.NEXT_PUBLIC_SITE_URL ||
          window.location.origin) + "/protected";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "Error con el registro de Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: {
            phone: phone || null,
            daily_notifications_enabled: acceptNotifications
          }
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-amber-400" />
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <CardTitle className="text-2xl font-cinzel text-amber-300">Únete a Videntia</CardTitle>
          <CardDescription className="text-amber-200/80 font-cormorant">
            Descubre tu destino y conecta con tu intuición interior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Sign Up - Arriba del formulario */}
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border-0 shadow-lg py-3 text-base font-medium transition-all duration-200"
            disabled={isLoading}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="mr-1"
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.69 30.7 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.19C12.36 13.13 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.98 37.13 46.1 31.36 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.67 28.28A14.5 14.5 0 019.5 24c0-1.49.25-2.93.67-4.28l-7.98-6.19A23.93 23.93 0 000 24c0 3.77.9 7.34 2.69 10.47l7.98-6.19z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.59c-2.01 1.35-4.59 2.15-8.71 2.15-6.26 0-11.64-3.63-13.33-8.72l-7.98 6.19C6.73 42.18 14.82 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Continuar con Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-amber-500/30" />
            <span className="text-sm text-amber-400 font-cormorant px-2">o regístrate con email</span>
            <div className="flex-1 h-px bg-amber-500/30" />
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-amber-200 font-cormorant flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
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

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-amber-200 font-cormorant flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono <span className="text-xs text-amber-400/60">(opcional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+54 9 11 1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-800/70 border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 focus:ring-amber-400/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-amber-200 font-cormorant">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/70 border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 focus:ring-amber-400/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="repeat-password" className="text-amber-200 font-cormorant">
                Confirmar Contraseña
              </Label>
              <Input
                id="repeat-password"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="bg-slate-800/70 border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 focus:ring-amber-400/50"
              />
            </div>

            {/* Notifications Checkbox */}
            <div className="flex items-start space-x-3 p-4 bg-slate-800/30 rounded-lg border border-amber-500/20">
              <Checkbox 
                id="notifications" 
                checked={acceptNotifications}
                onCheckedChange={(checked) => setAcceptNotifications(!!checked)}
                className="border-amber-500/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="notifications" 
                  className="text-sm font-medium text-amber-200 font-cormorant cursor-pointer"
                >
                  Recibir tu carta del día por email
                </Label>
                <p className="text-xs text-amber-300/70">
                  Cada mañana te enviaremos una carta del tarot con su interpretación especial para ti
                </p>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded border border-red-500/30 flex items-center gap-2">
                <span className="text-red-400">⚠️</span>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-cinzel font-semibold py-3 shadow-lg transition-all duration-200" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando tu cuenta espiritual...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Crear Cuenta
                </div>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-amber-300/80">
            ¿Ya tienes una cuenta?{" "}
            <Link 
              href="/auth/login" 
              className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
