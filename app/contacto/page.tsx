import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Videntia Tarot | Atención al Cliente",
  description: "Contáctanos para resolver dudas sobre lecturas de tarot, soporte técnico o consultas sobre nuestros servicios. Estamos aquí para ayudarte.",
  keywords: [
    "contacto videntia", "soporte tarot", "ayuda lecturas", "atención cliente", 
    "consultas tarot", "problemas técnicos", "feedback videntia"
  ],
  openGraph: {
    title: "Contacto - Videntia Tarot",
    description: "¿Necesitas ayuda? Contáctanos para resolver cualquier duda sobre nuestras lecturas de tarot.",
  },
};

export default function Contacto() {
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
      <p className="mb-4">
        Si tienes preguntas, sugerencias o deseas ejercer tus derechos sobre tus
        datos personales, puedes contactarnos a través del siguiente correo
        electrónico:
      </p>
      <p className="mb-4 font-semibold">contacto@videntia.com</p>
      <p>
        También puedes utilizar el formulario de contacto disponible en el sitio
        para enviarnos tus consultas. Nos comprometemos a responderte a la
        brevedad posible.
      </p>
    </main>
  );
}
