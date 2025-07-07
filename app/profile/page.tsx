import { createClient } from "@/app/_helpers/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserTierDisplay from "@/components/UserTierDisplay";
import { getUserTier, getTierLimits } from "@/lib/user-tiers";
import DiscreteHomeLink from "@/components/ui/DiscreteHomeLink";
import NotificationSettings from "@/components/NotificationSettings";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  const user = data.user;
  const userTier = getUserTier(user);
  const tierLimits = getTierLimits(userTier);
  const isPremium = userTier === 'premium';
  
  // Get user's reading statistics
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const { data: readings } = await supabase
    .from('readings')
    .select('id, created_at, reading_type')
    .eq('user_id', user.id)
    .gte('created_at', today.toISOString());

  const { data: totalReadings } = await supabase
    .from('readings')
    .select('id, reading_type, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { data: adsToday } = await supabase
    .from('ad_sessions')
    .select('id')
    .eq('user_id', user.id)
    .eq('verified', true)
    .gte('created_at', today.toISOString());

  const readingsToday = readings?.length || 0;
  const totalReadingsCount = totalReadings?.length || 0;
  const adsWatchedToday = adsToday?.length || 0;
  
  // Calculate additional statistics
  const activeDays = totalReadings && totalReadings.length > 0 ? 
    new Set(totalReadings.map(r => r.created_at.split('T')[0])).size : 0;
  
  const favoriteCard = "El Loco"; // Placeholder - could be calculated from reading results
  const preferredType = totalReadings && totalReadings.length > 0 ? 
    totalReadings.reduce((acc, reading) => {
      acc[reading.reading_type] = (acc[reading.reading_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) : {};
  
  const mostUsedType = Object.keys(preferredType).length > 0 ? 
    Object.entries(preferredType).sort(([,a], [,b]) => b - a)[0][0] : "Carta del Día";
  
  return (
    <div className="min-h-screen p-6 md:p-10 relative">
      {/* Fondo místico */}
      <div className="absolute inset-0 bg-[url('/tarot-bg.jpg')] bg-cover bg-center opacity-10 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enlace discreto al inicio */}
        <div className="mb-6">
          <DiscreteHomeLink />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Perfil principal */}
          <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-cinzel text-amber-300">Mi Perfil Espiritual</CardTitle>
              <CardDescription className="text-amber-200/80 font-cormorant">
                Tu conexión con el universo místico
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full border-3 border-amber-400 shadow-lg"
                />
              )}
              <div className="text-center">
                <h2 className="text-xl font-cinzel text-amber-200">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </h2>
                <p className="text-sm text-amber-300/70 font-cormorant">{user.email}</p>
                <div className="mt-3">
                  {isPremium ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                      ✨ Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-amber-300">
                      Usuario Free
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones rápidas */}
          <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-cinzel text-amber-300">Acciones Rápidas</CardTitle>
              <CardDescription className="text-amber-200/80 font-cormorant">
                Explora tu viaje espiritual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white font-cormorant">
                <Link href="/">Nueva Lectura de Tarot</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-900/30 font-cormorant">
                <Link href="/profile/historia-personal">Mi Historial de Lecturas</Link>
              </Button>
              {!isPremium && (
                <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-cormorant">
                  <Link href="#premium">Upgrade a Premium ✨</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tier Status */}
        <Card className="mt-6 bg-slate-900/90 border-amber-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-cinzel text-amber-300">Estado de Membresía</CardTitle>
            <CardDescription className="text-amber-200/80 font-cormorant">
              Tu plan actual y beneficios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserTierDisplay 
              tier={userTier} 
              readingsToday={readingsToday}
              maxReadings={tierLimits.dailyReadings}
              adsWatched={adsWatchedToday}
            />
          </CardContent>
        </Card>

        {/* Sección de estadísticas */}
        <Card className="mt-6 bg-slate-900/90 border-amber-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-cinzel text-amber-300">Tu Viaje Espiritual</CardTitle>
            <CardDescription className="text-amber-200/80 font-cormorant">
              Resumen de tu actividad en Videntia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-amber-500/20">
                <div className="text-2xl font-cinzel text-amber-300">{totalReadingsCount}</div>
                <div className="text-sm text-amber-200/70 font-cormorant">Lecturas realizadas</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-amber-500/20">
                <div className="text-2xl font-cinzel text-amber-300">{activeDays}</div>
                <div className="text-sm text-amber-200/70 font-cormorant">Días activo</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-amber-500/20">
                <div className="text-2xl font-cinzel text-amber-300">{favoriteCard}</div>
                <div className="text-sm text-amber-200/70 font-cormorant">Carta favorita</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-amber-500/20">
                <div className="text-2xl font-cinzel text-amber-300">{mostUsedType}</div>
                <div className="text-sm text-amber-200/70 font-cormorant">Tipo preferido</div>
              </div>
            </div>
            
            {/* Today's usage */}
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-amber-500/10">
              <h3 className="text-lg font-cinzel text-amber-300 mb-3">Actividad de Hoy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-amber-300 font-semibold">{readingsToday} / {tierLimits.dailyReadings === -1 ? '∞' : tierLimits.dailyReadings}</div>
                  <div className="text-amber-200/70">Lecturas utilizadas</div>
                </div>
                {userTier === 'free' && (
                  <div className="text-center">
                    <div className="text-amber-300 font-semibold">{adsWatchedToday} / 2</div>
                    <div className="text-amber-200/70">Anuncios vistos</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-amber-300 font-semibold">
                    {tierLimits.dailyReadings === -1 ? '∞' : Math.max(0, tierLimits.dailyReadings - readingsToday + (userTier === 'free' ? Math.min(adsWatchedToday, 2) : 0))}
                  </div>
                  <div className="text-amber-200/70">Lecturas restantes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuraciones de Notificaciones - Nueva sección */}
      <div className="mt-6">
        <NotificationSettings user={user} />
      </div>
    </div>
  );
}
