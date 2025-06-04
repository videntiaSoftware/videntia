import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  const user = data.user;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm bg-slate-900/90 rounded-lg p-6 border border-purple-500/30 shadow-xl text-white flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-amber-300 mb-2">Perfil de usuario</h1>
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-amber-300 mb-2"
          />
        )}
        <div className="text-lg font-semibold">{user.user_metadata?.name || user.email}</div>
        <div className="text-sm text-purple-200">{user.email}</div>
      </div>
    </div>
  );
}
