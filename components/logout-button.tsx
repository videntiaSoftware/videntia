"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Button 
      onClick={logout}
      variant="ghost" 
      size="sm"
      className="text-amber-300/70 hover:text-red-300 hover:bg-red-900/20 font-cormorant transition-all"
      title="Cerrar Sesión"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden md:inline ml-1">Salir</span>
    </Button>
  );
}
