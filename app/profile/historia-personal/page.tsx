import { createClient } from "@/app/_helpers/supabase-server";
import { redirect } from "next/navigation";

export default async function HistoriaPersonalPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  const user = data.user;

  // Obtener historial de lecturas del usuario (tabla 'readings')
  const { data: readings, error: readingsError } = await supabase
    .from("readings")
    .select("id, question, created_at, interpretation, cards_drawn, reading_type")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-amber-300 mb-6">Historial de lecturas</h1>
      {readingsError && (
        <div className="text-red-500 mb-4">No se pudo cargar el historial.</div>
      )}
      <ul className="space-y-4">
        {readings && readings.length > 0 ? (
          readings.map((reading: any) => (
            <li key={reading.id} className="bg-slate-800/80 rounded-lg p-4 border border-purple-500/30 shadow">
              <a href={`/profile/historia-personal/${reading.id}`} className="block hover:underline">
                <div className="font-semibold text-amber-200">{reading.question || "(Sin pregunta)"}</div>
                <div className="text-xs text-purple-200 mt-1">{new Date(reading.created_at).toLocaleString()}</div>
                <div className="text-xs text-purple-300">{reading.reading_type}</div>
              </a>
            </li>
          ))
        ) : (
          <li className="text-slate-400">No tienes lecturas guardadas aún.</li>
        )}
      </ul>
    </div>
  );
}
