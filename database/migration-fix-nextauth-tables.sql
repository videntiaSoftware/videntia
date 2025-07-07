-- Migration: Corregir foreign keys para tablas NextAuth adapter
-- Ajusta las FKs de sessions y accounts para referenciar profiles en lugar de users

-- 1) Sessions: eliminar FK antigua y crear nueva
ALTER TABLE IF EXISTS public.sessions
  DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;
ALTER TABLE IF EXISTS public.sessions
  ADD CONSTRAINT sessions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 2) Accounts: eliminar FK antigua y crear nueva
ALTER TABLE IF EXISTS public.accounts
  DROP CONSTRAINT IF EXISTS accounts_user_id_fkey;
ALTER TABLE IF EXISTS public.accounts
  ADD CONSTRAINT accounts_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 3) expires_at de accounts se mantiene como BIGINT, se guarda sin conversión

-- 4) Asegurar índices y unicidades (ya deberían existir)
-- Sessions: session_token unique
CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_token ON public.sessions(session_token);
-- Accounts: provider+provider_account_id unique
CREATE UNIQUE INDEX IF NOT EXISTS idx_accounts_provider_key ON public.accounts(provider, provider_account_id);
