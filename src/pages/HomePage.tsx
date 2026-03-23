import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TeamSection from "@/components/sections/TeamSection";
/* import TestimonialsSection from "@/components/sections/TestimonialsSection"; */
import CTASection from "@/components/sections/CTASection";
import { useTranslations } from "next-intl";
import { updateDocumentMetadata } from "@/lib/seo/metadata";
import { getFeaturedProjects } from "@/lib/sanity/queries";
import { projects as fallbackProjects } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/types";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = useTranslations("metadata");
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(
    fallbackProjects.filter((project) => project.featured).slice(0, 6)
  );

  useEffect(() => {
    updateDocumentMetadata({
      title: t("title"),
      description: t("description"),
    });
  }, [t]);

  useEffect(() => {
    let active = true;

    void getFeaturedProjects(locale).then((fetchedProjects) => {
      if (active) {
        setFeaturedProjects(fetchedProjects);
      }
    });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection featuredProjects={featuredProjects} locale={locale} />
      <TeamSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
    </>
  );
}
