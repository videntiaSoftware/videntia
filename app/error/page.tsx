"use client";

import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-red-900/50 to-pink-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-amber-100 mb-4">
          Error en el pago
        </h1>
        
        <p className="text-amber-200/80 mb-6">
          No se pudo procesar tu donación. Esto puede deberse a un problema temporal con el método de pago.
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar nuevamente
          </button>
          
          <Link 
            href="/"
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
