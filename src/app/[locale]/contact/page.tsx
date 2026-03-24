import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import CotizadorWizard from "@/components/pages/CotizadorWizard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { es: "/es/contact", en: "/en/contact" },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CotizadorWizard />;
}
