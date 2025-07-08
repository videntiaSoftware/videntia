import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-screen overflow-x-hidden box-border py-6 px-4 text-xs text-slate-400 bg-slate-800 shadow-inner shadow-slate-900/30">
      {/* Enlaces SEO principales */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <h3 className="text-purple-300 font-semibold mb-3 text-sm">Lecturas</h3>
            <div className="space-y-2">
              <Link href="/lecturas/amor" className="block hover:text-purple-300 transition-colors">Tarot del Amor</Link>
              <Link href="/lecturas/trabajo" className="block hover:text-purple-300 transition-colors">Tarot Laboral</Link>
              <Link href="/lecturas/dinero" className="block hover:text-purple-300 transition-colors">Tarot del Dinero</Link>
              <Link href="/lecturas/salud" className="block hover:text-purple-300 transition-colors">Tarot de Salud</Link>
            </div>
          </div>
          <div>
            <h3 className="text-purple-300 font-semibold mb-3 text-sm">Cartas</h3>
            <div className="space-y-2">
              <Link href="/cartas/arcanos-mayores" className="block hover:text-purple-300 transition-colors">Arcanos Mayores</Link>
              <Link href="/cartas/espadas" className="block hover:text-purple-300 transition-colors">Espadas</Link>
              <Link href="/cartas/pentaculos" className="block hover:text-purple-300 transition-colors">Pentáculos</Link>
            </div>
          </div>
          <div>
            <h3 className="text-purple-300 font-semibold mb-3 text-sm">Recursos</h3>
            <div className="space-y-2">
              <Link href="/blog" className="block hover:text-purple-300 transition-colors">Blog de Tarot</Link>
              <Link href="/faq" className="block hover:text-purple-300 transition-colors">Preguntas Frecuentes</Link>
              <Link href="/lecturas" className="block hover:text-purple-300 transition-colors">Todas las Lecturas</Link>
              <Link href="/cartas" className="block hover:text-purple-300 transition-colors">Todas las Cartas</Link>
            </div>
          </div>
          <div>
            <h3 className="text-purple-300 font-semibold mb-3 text-sm">Soporte</h3>
            <div className="space-y-2">
              <Link href="/contacto" className="block hover:text-purple-300 transition-colors">Contacto</Link>
              <Link href="/premium" className="block hover:text-purple-300 transition-colors">Premium</Link>
              <Link href="/politica-privacidad" className="block hover:text-purple-300 transition-colors">Privacidad</Link>
              <Link href="/terminos-condiciones" className="block hover:text-purple-300 transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces legales */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full max-w-full overflow-x-hidden box-border border-t border-slate-700 pt-4">
        <Link href="/politica-privacidad" className="hover:underline">Política de privacidad</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/terminos-condiciones" className="hover:underline">Términos y condiciones</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/contacto" className="hover:underline">Contacto</Link>
      </div>

      <div className="mt-2">&copy; {new Date().getFullYear()} Videntia</div>
      <div className="w-full text-xs text-center text-slate-400 py-2 mt-2">
        Este sitio está protegido por reCAPTCHA y se aplican la
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline mx-1">Política de Privacidad</a>
        y los
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline mx-1">Términos de Servicio</a>
        de Google.
      </div>
    </footer>
  );
}
