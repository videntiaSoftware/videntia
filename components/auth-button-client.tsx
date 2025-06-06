"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";

export function AuthButtonClient({ user }: { user: { email: string } | null }) {
  return user ? (
    <div className="flex items-center gap-4">
      <Link
        href="/profile"
        className="text-amber-300 hover:underline text-sm font-semibold"
      >
        Perfil
      </Link>
      <span>Hey, {user.email}!</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
