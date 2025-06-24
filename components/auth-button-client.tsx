"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { User, Crown } from "lucide-react";

export function AuthButtonClient({ user }: { user: { email: string } | null }) {
  return user ? (
    <div className="flex items-center gap-3">
      <Link
        href="/profile"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-900/50 transition-all text-sm font-semibold font-cormorant"
      >
        <User className="w-4 h-4" />
        <span className="hidden md:inline">Mi Perfil</span>
      </Link>
      <div className="hidden md:flex items-center gap-2 text-amber-200/80 text-sm font-cormorant">
        <Crown className="w-4 h-4 text-amber-400" />
        <span>{user.email.split('@')[0]}</span>
      </div>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="ghost" className="text-amber-300 hover:text-amber-200 hover:bg-amber-900/30 font-cormorant border border-amber-500/20">
        <Link href="/auth/login">
          <User className="w-4 h-4 mr-1" />
          Entrar
        </Link>
      </Button>
      <Button asChild size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-cormorant font-semibold shadow-lg">
        <Link href="/auth/sign-up">
          <Crown className="w-4 h-4 mr-1" />
          Conectar
        </Link>
      </Button>
    </div>
  );
}
