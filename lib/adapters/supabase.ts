import { createClient } from "@supabase/supabase-js";
import { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";

/**
 * SupabaseAdapter para NextAuth.
 * Almacena users, accounts, sessions y verification_tokens en Supabase.
 */
export function SupabaseAdapter(options: { url: string; secret: string }): Adapter {
  const supabase = createClient(options.url, options.secret);

  return {
    async createUser(user) {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          name: (user.name as string) || null,
          image: (user.image as string) || null,
          email_verified: user.emailVerified ? user.emailVerified.toISOString() : null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data as AdapterUser;
    },

    async getUser(id) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return null;
      return data as AdapterUser;
    },

    async getUserByEmail(email) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();
      if (error) return null;
      return data as AdapterUser;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const { data, error } = await supabase
        .from("accounts")
        .select(`*, profiles(*)`)
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId)
        .single();
      if (error || !data) return null;
      const profile = (data.profiles as any) as AdapterUser;
      return profile;
    },

    async updateUser(user) {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          name: (user.name as string) || null,
          image: (user.image as string) || null,
          email_verified: user.emailVerified ? user.emailVerified.toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();
      if (error) throw error;
      return data as AdapterUser;
    },

    async deleteUser(userId) {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);
      if (error) throw error;
    },

    async linkAccount(account) {
      const { data, error } = await supabase
        .from("accounts")
        .insert({
          id: account.id,
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data as any;
    },

    async unlinkAccount({ provider, providerAccountId }) {
      const { error } = await supabase
        .from("accounts")
        .delete()
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId);
      if (error) throw error;
    },

    async createSession(session) {
      const { data, error } = await supabase
        .from("sessions")
        .insert({
          session_token: session.sessionToken,
          user_id: session.userId,
          expires: session.expires.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      const { data, error } = await supabase
        .from("sessions")
        .select(`*, profiles(*)`)
        .eq("session_token", sessionToken)
        .single();
      if (error || !data) return null;
      const user = (data.profiles as any) as AdapterUser;
      const session: AdapterSession = {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      };
      return { session, user };
    },

    async updateSession({ sessionToken, expires }) {
      const { data, error } = await supabase
        .from("sessions")
        .update({
          expires: expires.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("session_token", sessionToken)
        .select()
        .single();
      if (error) throw error;
      return {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      } as AdapterSession;
    },

    async deleteSession(sessionToken) {
      const { error } = await supabase
        .from("sessions")
        .delete()
        .eq("session_token", sessionToken);
      if (error) throw error;
    },

    // verification_tokens (optional, si usas email verification)
    async createVerificationToken({ identifier, token, expires }) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .insert({
          identifier,
          token,
          expires: expires.toISOString(),
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data as any;
    },

    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .select()
        .eq("identifier", identifier)
        .eq("token", token)
        .single();
      if (error || !data) return null;
      await supabase
        .from("verification_tokens")
        .delete()
        .eq("identifier", identifier)
        .eq("token", token);
      return data as any;
    },
  };
}
