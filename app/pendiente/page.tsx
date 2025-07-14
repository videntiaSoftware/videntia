import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PendientePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Clock className="w-16 h-16 text-yellow-400 animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-bold text-amber-100 mb-4">
          Pago pendiente
        </h1>
        
        <p className="text-amber-200/80 mb-6">
          Tu donación está siendo procesada. Te notificaremos cuando se complete el pago.
        </p>
        
        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-200 font-medium">Pago iniciado</span>
          </div>
          <p className="text-yellow-300/80 text-sm">
            Puedes cerrar esta ventana. Te confirmaremos por email cuando se complete.
          </p>
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
