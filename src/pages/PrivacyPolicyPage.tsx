"use client";

import { useEffect } from "react";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    updateDocumentMetadata({
      title: "Política de Privacidad | BApps",
      description:
        "Cómo BApps recopila, usa y protege los datos personales de sus usuarios. Cumplimiento de la Ley 25.326 de Argentina.",
    });
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Privacidad",
            url: "https://bapps.com.ar/es/privacidad/",
            isPartOf: { "@id": "https://bapps.com.ar/#website" },
            inLanguage: "es",
          }),
        }}
      />

      <h1 className="font-[family-name:var(--font-display)] mb-2 text-4xl tracking-tight">
        Política de Privacidad
      </h1>
      <p className="mb-12 text-sm text-foreground-muted">
        Última actualización: junio de 2026
      </p>

      <div className="prose prose-invert max-w-none space-y-10 text-foreground-muted leading-relaxed">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            1. Quiénes somos
          </h2>
          <p>
            BApps es una agencia argentina de diseño web y desarrollo de
            aplicaciones a medida, operada desde Argentina. Podés contactarnos
            en{" "}
            <a
              href="mailto:hola@bapps.com.ar"
              className="text-bapps-purple-light hover:underline"
            >
              hola@bapps.com.ar
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            2. Qué datos recopilamos
          </h2>
          <p>
            El único dato personal que recopilamos es la información que vos
            mismo nos enviás a través del formulario de contacto: nombre,
            dirección de email y el mensaje que escribís. No recopilamos datos
            de navegación, no usamos cookies de rastreo y no instalamos ningún
            tipo de pixel publicitario.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            3. Para qué los usamos
          </h2>
          <p>
            Usamos esos datos únicamente para responder tu consulta. No los
            cedemos a terceros, no los usamos para publicidad y no los
            compartimos con nadie fuera de BApps.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            4. Servicios de terceros
          </h2>
          <p>
            Para el envío del formulario de contacto utilizamos{" "}
            <strong className="text-foreground">EmailJS</strong>, un servicio
            que actúa como intermediario de envío de emails. Los mensajes que
            enviás pasan por sus servidores para llegar a nuestra bandeja. Podés
            leer su política de privacidad en{" "}
            <a
              href="https://www.emailjs.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bapps-purple-light hover:underline"
            >
              emailjs.com
            </a>
            .
          </p>
          <p className="mt-3">
            El contenido del sitio (blog, portfolio) se gestiona con{" "}
            <strong className="text-foreground">Sanity CMS</strong>. Sanity no
            tiene acceso a los datos del formulario de contacto.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            5. Tus derechos
          </h2>
          <p>
            De acuerdo con la{" "}
            <strong className="text-foreground">
              Ley 25.326 de Protección de Datos Personales de Argentina
            </strong>
            , tenés derecho a acceder, rectificar o eliminar cualquier dato
            personal que hayamos guardado. Para ejercer estos derechos, escribinos
            a{" "}
            <a
              href="mailto:hola@bapps.com.ar"
              className="text-bapps-purple-light hover:underline"
            >
              hola@bapps.com.ar
            </a>{" "}
            y lo resolvemos en menos de 48 horas.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            6. Cookies
          </h2>
          <p>
            Este sitio no usa cookies de rastreo ni publicidad. Sí puede usar
            cookies de sesión estrictamente técnicas (por ejemplo, para recordar
            preferencias de idioma), que no recopilan información personal y no
            requieren consentimiento.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            7. Cambios a esta política
          </h2>
          <p>
            Si cambiamos algo relevante, actualizamos la fecha de esta página.
            No te enviaremos notificaciones por email sobre cambios en la
            política de privacidad.
          </p>
        </div>
      </div>
    </section>
  );
}
