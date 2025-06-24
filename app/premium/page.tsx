import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server.app";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserTier, TIER_BENEFITS, PREMIUM_PRICING } from "@/lib/user-tiers";
import DiscreteHomeLink from "@/components/ui/DiscreteHomeLink";

export const metadata: Metadata = {
  title: "Premium - Videntia Tarot",
  description: "Upgrade to Premium for unlimited readings and exclusive features",
};

export default async function PremiumPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData?.user) {
    redirect("/auth/login?redirect_to=/premium");
  }

  const userTier = getUserTier(userData.user);
  const isPremium = userTier === 'premium';

  // Get user's current usage
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const { data: readings } = await supabase
    .from('readings')
    .select('id')
    .eq('user_id', userData.user.id)
    .gte('created_at', today.toISOString());

  const readingsToday = readings?.length || 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Enlace discreto al inicio */}
      <div className="mb-6">
        <DiscreteHomeLink />
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="font-cinzel text-4xl md:text-5xl text-amber-300 tracking-wide">
          Videntia Premium
        </h1>
        <p className="text-lg text-purple-200 font-cormorant max-w-2xl mx-auto">
          Desbloquea todo el potencial del tarot con acceso ilimitado y funciones exclusivas
        </p>
      </div>

      {/* Current Status */}
      <Card className="bg-slate-900/90 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-300 font-cinzel flex items-center gap-2">
            Tu Plan Actual
            <Badge className={isPremium ? "bg-gradient-to-r from-amber-500 to-amber-600" : "bg-blue-600"}>
              {isPremium ? "✨ Premium" : userTier === 'free' ? "🆓 Free" : "👤 Guest"}
            </Badge>
          </CardTitle>
          <CardDescription className="text-purple-200">
            {isPremium 
              ? "Tienes acceso completo a todas las funciones de Videntia"
              : `Has usado ${readingsToday} lecturas hoy. ${userTier === 'guest' ? 'Crea una cuenta para más lecturas.' : 'Upgrade para lecturas ilimitadas.'}`
            }
          </CardDescription>
        </CardHeader>
      </Card>

      {!isPremium && (
        <>
          {/* Pricing Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <Card className="bg-slate-900/90 border-amber-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white px-3 py-1 text-sm font-bold">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-amber-300 font-cinzel text-2xl">
                  Plan Mensual
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Perfecto para usuarios regulares
                </CardDescription>
                <div className="text-3xl font-bold text-amber-300 font-cinzel">
                  ${PREMIUM_PRICING.monthly.usd}
                  <span className="text-base text-purple-300 font-cormorant">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
                  size="lg"
                >
                  Comenzar Plan Mensual
                </Button>
              </CardContent>
            </Card>

            {/* Annual Plan */}
            <Card className="bg-slate-900/90 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-cinzel text-2xl">
                  Plan Anual
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Mejor valor - ahorra 2 meses
                </CardDescription>
                <div className="text-3xl font-bold text-amber-300 font-cinzel">
                  ${PREMIUM_PRICING.yearly.usd}
                  <span className="text-base text-purple-300 font-cormorant">/año</span>
                </div>
                <div className="text-green-400 text-sm font-semibold">
                  Ahorra ${(PREMIUM_PRICING.monthly.usd * 12 - PREMIUM_PRICING.yearly.usd).toFixed(2)} por año
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                  size="lg"
                >
                  Comenzar Plan Anual
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Comparison */}
          <Card className="bg-slate-900/90 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-cinzel text-2xl text-center">
                ¿Qué incluye Premium?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Free Features */}
                <div>
                  <h3 className="font-cinzel text-lg text-blue-300 mb-4">Plan Free</h3>
                  <ul className="space-y-2">
                    {TIER_BENEFITS.free.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-purple-200">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span className="font-cormorant">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Premium Features */}
                <div>
                  <h3 className="font-cinzel text-lg text-amber-300 mb-4">Plan Premium ✨</h3>
                  <ul className="space-y-2">
                    {TIER_BENEFITS.premium.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-amber-200">
                        <span className="text-amber-400 mt-1">✨</span>
                        <span className="font-cormorant font-semibold">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trial Offer */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-amber-900/50 border-amber-500/50">
            <CardContent className="text-center p-8">
              <h3 className="font-cinzel text-2xl text-amber-300 mb-4">
                🎁 Prueba Premium Gratis
              </h3>
              <p className="text-purple-200 font-cormorant text-lg mb-6">
                Ve un anuncio y obtén 24 horas de acceso Premium completamente gratis
              </p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                size="lg"
              >
                🎬 Ver Anuncio para Prueba Gratis
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {isPremium && (
        /* Premium User Dashboard */
        <Card className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 border-amber-500/50">
          <CardHeader>
            <CardTitle className="text-amber-300 font-cinzel text-2xl">
              ¡Bienvenido a Premium! ✨
            </CardTitle>
            <CardDescription className="text-amber-200">
              Disfruta de todas las funciones sin limitaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-300">∞</div>
                <div className="text-sm text-purple-200">Lecturas Ilimitadas</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-300">✨</div>
                <div className="text-sm text-purple-200">Cruz Celta Exclusiva</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-300">📚</div>
                <div className="text-sm text-purple-200">Historial Completo</div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-300 hover:bg-amber-500/10"
              >
                Gestionar Suscripción
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Section */}
      <Card className="bg-slate-900/90 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-300 font-cinzel text-2xl">
            Preguntas Frecuentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-amber-200 mb-2">¿Puedo cancelar en cualquier momento?</h4>
              <p className="text-purple-200 font-cormorant">Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-200 mb-2">¿Qué métodos de pago aceptan?</h4>
              <p className="text-purple-200 font-cormorant">Aceptamos tarjetas de crédito, débito y PayPal a través de Stripe.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-200 mb-2">¿Los datos de mi historial se conservan?</h4>
              <p className="text-purple-200 font-cormorant">Sí, todo tu historial de lecturas se mantiene seguro y privado en tu cuenta.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
