import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Videntia - Lecturas de Tarot Gratis Online 24/7",
  description: "Descubre tu destino con lecturas de tarot gratis online. Consultas personalizadas de amor, trabajo, dinero y crecimiento espiritual. Disponible 24 horas.",
  keywords: [
    "tarot gratis online", "lecturas tarot", "consulta tarot", "cartas tarot gratis",
    "tarot amor", "tarot trabajo", "tarot dinero", "videncia online",
    "tirada 3 cartas", "cruz celta", "arcanos mayores", "arcanos menores"
  ],
  openGraph: {
    title: "Videntia - Lecturas de Tarot Gratis Online 24/7",
    description: "Consultas de tarot personalizadas y gratuitas. Descubre tu futuro en amor, trabajo y crecimiento personal.",
  },
  twitter: {
    title: "Videntia - Tarot Gratis Online",
    description: "Lecturas de tarot auténticas y personalizadas disponibles 24/7.",
  }
};

export default function Home() {
  return <HomeClient />;
}
