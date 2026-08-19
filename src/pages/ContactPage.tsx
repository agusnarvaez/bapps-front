import { useEffect } from "react";
import CotizadorWizard from "@/components/pages/CotizadorWizard";
import { useTranslations, useLocale } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  useEffect(() => {
    updateDocumentMetadata({
      title: t("title"),
      description: t("subtitle"),
    });
  }, [t]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `https://bapps.com.ar/${locale}/` },
      { "@type": "ListItem", position: 2, name: "Contacto", item: `https://bapps.com.ar/${locale}/contact/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CotizadorWizard />
    </>
  );
}
