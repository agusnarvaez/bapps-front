import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { getFeaturedProjects } from "@/lib/sanity/queries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featuredProjects = await getFeaturedProjects(locale as "es" | "en");

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection
        featuredProjects={featuredProjects}
        locale={locale as "es" | "en"}
      />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
