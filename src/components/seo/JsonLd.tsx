export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BApps",
    url: "https://bapps.com.ar",
    logo: "https://bapps.com.ar/images/logo-bapps.png",
    description:
      "Desarrollamos aplicaciones web, móviles y landing pages a medida. Transformamos ideas en experiencias digitales excepcionales.",
    sameAs: [
      "https://instagram.com/bapps",
      "https://linkedin.com/company/bapps",
      "https://github.com/bapps",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
