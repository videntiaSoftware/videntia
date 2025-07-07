"use client";
import Link from "next/link";

export function SubtleAuthPrompt({ showPrompt, onClose }: { showPrompt: boolean; onClose: () => void }) {
  if (!showPrompt) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-900/90 p-6 rounded-lg text-center space-y-4">
        <p className="text-amber-100">Para guardar tu lectura necesitas iniciar sesión.</p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 bg-amber-600 text-white rounded">Iniciar Sesión</button>
          </Link>
          <button onClick={onClose} className="px-4 py-2 border border-amber-500 text-amber-300 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
