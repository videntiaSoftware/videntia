import { createClient } from "@/app/_helpers/supabase-server";
import { AuthButtonClient } from "./auth-button-client";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AuthButtonClient user={user && user.email ? { email: user.email } : null} />;
}
