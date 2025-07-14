"use client";

import { useState } from "react";
import { Heart, Coffee } from "lucide-react";

interface DonationButtonProps {
  amount?: number;
  description?: string;
  className?: string;
}

export default function DonationButton({ 
  amount = 500, 
  description = "Donación Videntia Tarot",
  className = ""
}: DonationButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments/mercadopago/create-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description }),
      });
      
      if (!res.ok) {
        throw new Error("Error al crear el pago");
      }
      
      const data = await res.json();
      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la donación. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <Coffee className="w-6 h-6 text-amber-400 mr-2" />
        <Heart className="w-5 h-5 text-pink-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-amber-100 mb-2">
        ¿Te gustó tu lectura?
      </h3>
      
      <p className="text-sm text-amber-200/80 mb-4">
        Apoya el proyecto con una donación voluntaria
      </p>
      
      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Redirigiendo...
          </div>
        ) : (
          `Donar $${amount} ARS`
        )}
      </button>
      
      <p className="text-xs text-amber-300/60 mt-3">
        Pago seguro con MercadoPago
      </p>
    </div>
  );
}
