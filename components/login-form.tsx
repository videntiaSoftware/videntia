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
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-cinzel text-amber-300">Iniciar Sesión</CardTitle>
          <CardDescription className="text-amber-200/80 font-cormorant">
            Accede a tu cuenta para continuar tu viaje espiritual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-amber-200 font-cormorant">Contraseña</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-amber-300 hover:text-amber-200"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800/70 border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 focus:ring-amber-400/50"
                />
              </div>
              {error && <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded border border-red-500/30">{error}</p>}
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-cinzel font-semibold py-2 shadow-lg" 
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4 text-amber-300 hover:text-amber-200 font-semibold"
              >
                Regístrate aquí
              </Link>
            </div>
          </form>
          <div className="my-4 flex items-center gap-2">
            <div className="flex-1 h-px bg-amber-500/30" />
            <span className="text-xs text-amber-400 font-cormorant">o continúa con</span>
            <div className="flex-1 h-px bg-amber-500/30" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-amber-500/30 bg-slate-800/50 text-amber-200 hover:bg-amber-900/30 hover:text-amber-100"
            onClick={async () => {
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
                setError(error.message || "Error with Google login");
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="mr-2"
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
        </CardContent>
      </Card>
    </div>
  );
}
