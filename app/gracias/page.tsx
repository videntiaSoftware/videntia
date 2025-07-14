import { CheckCircle, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-amber-100 mb-4">
          ¡Gracias por tu donación!
        </h1>
        
        <p className="text-amber-200/80 mb-6">
          Tu apoyo nos ayuda a mantener Videntia funcionando y seguir ofreciendo lecturas de tarot gratuitas.
        </p>
        
        <div className="flex items-center justify-center mb-6">
          <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
          <span className="text-amber-300 ml-2">Con amor, el equipo de Videntia</span>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
