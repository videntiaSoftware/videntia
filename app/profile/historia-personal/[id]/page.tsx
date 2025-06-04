import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface ReadingDetailPageProps {
  params: { id: string };
}

export default async function ReadingDetailPage({ params }: ReadingDetailPageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  const user = data.user;

  // Buscar la lectura por id y usuario
  const { data: reading, error: readingError } = await supabase
    .from("readings")
    .select("id, question, created_at, interpretation, cards_drawn, reading_type")
    .eq("user_id", user.id)
    .eq("id", params.id)
    .single();

  if (readingError || !reading) {
    return (
      <div className="max-w-xl mx-auto p-6 text-red-500">No se encontró la lectura.</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-amber-300 mb-4">Detalle de la lectura</h1>
      <div className="mb-2 text-purple-200 text-sm">{new Date(reading.created_at).toLocaleString()}</div>
      <div className="mb-4">
        <span className="font-semibold text-amber-200">Pregunta:</span> {reading.question || "(Sin pregunta)"}
      </div>
      <div className="mb-4">
        <span className="font-semibold text-amber-200">Tipo de lectura:</span> {reading.reading_type || "-"}
      </div>
      <div className="mb-4">
        <span className="font-semibold text-amber-200">Interpretación:</span>
        <div className="mt-1 bg-slate-800/80 rounded p-3 border border-purple-500/30 text-white whitespace-pre-line">
          {reading.interpretation || "(Sin interpretación)"}
        </div>
      </div>
      {reading.cards_drawn && (
        <div className="mb-4">
          <span className="font-semibold text-amber-200">Cartas:</span>
          <div className="mt-1 bg-slate-900/70 rounded p-3 border border-purple-500/20 text-purple-100 text-sm whitespace-pre-line">
            {typeof reading.cards_drawn === 'string' ? reading.cards_drawn : JSON.stringify(reading.cards_drawn, null, 2)}
          </div>
        </div>
      )}
      <a href="/profile/historia-personal" className="inline-block mt-4 text-amber-300 hover:underline">← Volver al historial</a>
    </div>
  );
}
