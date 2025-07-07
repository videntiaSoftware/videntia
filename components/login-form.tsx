"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
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
import { Crown, Sparkles, Mail, Key } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    signIn("google", { callbackUrl: "/" });
  };

  const handleFacebookLogin = () => {
    setIsLoading(true);
    setError(null);
    signIn("facebook", { callbackUrl: "/" });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    setIsLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push(res?.url || "/");
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
          <CardTitle className="text-2xl font-cinzel text-amber-300">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-amber-200/80 font-cormorant">
            Inicia sesión para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 shadow py-3 font-medium"
            disabled={isLoading}
          >
            Continuar con Google
          </Button>
          <Button
            type="button"
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white shadow py-3 font-medium"
            disabled={isLoading}
          >
            Continuar con Facebook
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-amber-500/30" />
            <span className="text-sm text-amber-400">o con email</span>
            <div className="flex-1 h-px bg-amber-500/30" />
          </div>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-amber-200 font-cormorant"
              >
                <Mail className="h-4 w-4 inline-block mr-1" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/70"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-amber-200 font-cormorant"
              >
                <Key className="h-4 w-4 inline-block mr-1" /> Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/70"
              />
            </div>
            {error && <div className="text-red-400">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? "Accediendo..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="text-center text-sm text-amber-300/80">
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/sign-up"
              className="underline"
            >
              Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
