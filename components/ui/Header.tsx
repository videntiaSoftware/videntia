"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full max-w-full bg-slate-900/90 backdrop-blur border-b border-amber-500/30 shadow-lg flex items-center justify-between px-2 md:px-4 py-3">
      <div className="flex items-center w-full max-w-full justify-between">
        <Link href="/" className="font-cinzel font-bold text-xl tracking-tight text-amber-300 hover:text-amber-200 transition-colors">
          Videntia
        </Link>
        {/* Menú hamburguesa solo en mobile */}
        <button className="md:hidden p-2 text-amber-300" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-cormorant text-amber-200 hover:text-amber-100 transition-colors">Inicio</Link>
          <div className="ml-4">
            {/* Aquí iría el botón de autenticación */}
          </div>
        </nav>
      </div>
      {/* Menú mobile desplegable */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-start pt-20">
          <nav className="flex flex-col gap-6 text-lg w-full max-w-xs mx-auto bg-slate-900/95 rounded-xl p-6 shadow-xl border border-amber-500/30">
            <Link href="/" className="font-cormorant text-amber-200 hover:text-amber-100 transition-colors" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <div className="mt-4">
              {/* Aquí iría el botón de autenticación */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}