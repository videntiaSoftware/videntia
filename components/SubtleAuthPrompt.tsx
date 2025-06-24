"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, History, Infinity } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SubtleAuthPromptProps {
  showPrompt?: boolean;
  onClose?: () => void;
}

export default function SubtleAuthPrompt({ showPrompt = false, onClose }: SubtleAuthPromptProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (showPrompt && !user && !loading) {
      setIsVisible(true);
    }
  }, [showPrompt, user, loading]);

  if (loading || user || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-3xl">✨</div>
            <h2 className="text-xl font-cinzel text-amber-300">¿Te gustó tu lectura?</h2>
            <p className="text-amber-200/80 font-cormorant text-sm">
              Conecta con Videntia para una experiencia completa
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {/* Free Benefits */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-cinzel text-blue-300 mb-2 flex items-center gap-2">
                <History className="w-4 h-4" />
                Registro Gratuito
              </h3>
              <ul className="text-xs text-blue-200/90 font-cormorant space-y-1">
                <li>• Guarda tu historial de lecturas</li>
                <li>• 3 lecturas diarias</li>
                <li>• Accede desde cualquier dispositivo</li>
              </ul>
            </div>

            {/* Premium Benefits */}
            <div className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 border border-amber-500/30 rounded-lg p-4">
              <h3 className="font-cinzel text-amber-300 mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Premium - $1.99/mes
              </h3>
              <ul className="text-xs text-amber-200/90 font-cormorant space-y-1">
                <li>• <Infinity className="w-3 h-3 inline mr-1" />Lecturas ilimitadas</li>
                <li>• Acceso a Cruz Celta exclusiva</li>
                <li>• Mazos personalizados (próximamente)</li>
                <li>• Sin anuncios</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-cormorant">
              <Link href="/auth/sign-up">
                <History className="w-4 h-4 mr-2" />
                Crear Cuenta Gratuita
              </Link>
            </Button>
            
            <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-cormorant">
              <Link href="/premium">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade a Premium
              </Link>
            </Button>

            <button
              onClick={() => setIsVisible(false)}
              className="w-full text-amber-300/70 hover:text-amber-300 text-sm font-cormorant underline"
            >
              Continuar sin registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
