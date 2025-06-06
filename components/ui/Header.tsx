"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data?.user);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full max-w-full bg-white/80 dark:bg-black/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-2 md:px-4 py-2">
      <div className="flex items-center w-full max-w-full justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-amber-600">Videntia</Link>
        {/* Menú hamburguesa solo en mobile */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-500">
          <Link href="/" className="hover:underline hover:text-amber-700 transition-colors">Inicio</Link>
          {isLoggedIn && (
            <Link href="/profile/historia-personal" className="hover:underline hover:text-amber-700 transition-colors">Historial de lecturas</Link>
          )}
          <div className="ml-4">
            <AuthButton />
          </div>
        </nav>
      </div>
      {/* Menú mobile desplegable */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-start pt-20">
          <nav className="flex flex-col gap-6 text-lg w-full max-w-xs mx-auto bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-300 dark:border-slate-700">
            <Link href="/" className="hover:underline hover:text-amber-700 transition-colors" onClick={() => setMenuOpen(false)}>Inicio</Link>
            {isLoggedIn && (
              <Link href="/profile/historia-personal" className="hover:underline hover:text-amber-700 transition-colors" onClick={() => setMenuOpen(false)}>Historial de lecturas</Link>
            )}
            <div className="mt-2">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 