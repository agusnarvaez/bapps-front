import { useEffect } from "react";
import CotizadorWizard from "@/components/pages/CotizadorWizard";
import { useTranslations } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";

export default function ContactPage() {
  const t = useTranslations("contact");

  useEffect(() => {
    updateDocumentMetadata({
      title: t("title"),
      description: t("subtitle"),
    });
  }, [t]);

  return <CotizadorWizard />;
}
