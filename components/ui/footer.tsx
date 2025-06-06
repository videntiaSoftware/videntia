import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-screen overflow-x-hidden box-border py-4 px-2 text-xs text-center text-slate-400 bg-slate-800 shadow-inner shadow-slate-900/30">
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full max-w-full overflow-x-hidden box-border">
        <Link href="/politica-privacidad" className="hover:underline">Política de privacidad</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/terminos-condiciones" className="hover:underline">Términos y condiciones</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/contacto" className="hover:underline">Contacto</Link>
      </div>

      <div className="mt-2">&copy; {new Date().getFullYear()} Videntia</div>
    </footer>
  );
}
