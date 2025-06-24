"use client";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";

interface DiscreteHomeLinkProps {
  className?: string;
  showIcon?: boolean;
}

export default function DiscreteHomeLink({ className = "", showIcon = true }: DiscreteHomeLinkProps) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-amber-500/20 hover:border-amber-500/40 text-amber-300 hover:text-amber-200 transition-all duration-300 backdrop-blur-sm group ${className}`}
      title="Volver al inicio"
    >
      {showIcon && (
        <div className="flex items-center gap-1">
          <Home size={16} className="group-hover:scale-110 transition-transform" />
          <Sparkles size={12} className="text-amber-400 group-hover:rotate-12 transition-transform" />
        </div>
      )}
      <span className="font-cormorant text-sm font-medium">
        Videntia
      </span>
    </Link>
  );
}
