import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildMetadata, pick } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsSection from "@/components/sections/SkillsSection";
import GamesTeaser from "@/components/sections/GamesTeaser";
import ServicesCTA from "@/components/sections/ServicesCTA";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "",
    title: pick(locale, {
      en: "Othmane Aoubid — Full-Stack Developer & Cloud Engineer",
      fr: "Othmane Aoubid — Développeur Full-Stack & Ingénieur Cloud",
      ar: "عثمان أوبيد — مطور برمجيات ومهندس حوسبة سحابية",
    }),
    description: pick(locale, {
      en: "Full-Stack Developer & Cloud Engineer specializing in building secure web applications, scalable backend systems, and cloud-ready solutions. Production-grade projects. Based in Casablanca, Morocco — available worldwide and remote.",
      fr: "Développeur Full-Stack & Ingénieur Cloud spécialisé dans la création d'applications web sécurisées, de systèmes backend évolutifs et de solutions cloud. Projets de niveau production. Basé à Casablanca, Maroc — disponible à distance partout.",
      ar: "مطور برمجيات ومهندس حوسبة سحابية متخصص في بناء تطبيقات ويب آمنة، وأنظمة خلفية قابلة للتوسع، وحلول سحابية جاهزة. مشاريع بمستوى إنتاجي. مقيم في الدار البيضاء، المغرب — متاح عن بُعد عالمياً.",
    }),
    keywords: [
      "Full-Stack Developer",
      "Cloud Engineer",
      "Web Development",
      "Backend Development",
      "Frontend Development",
      "DevOps",
      "Infrastructure",
      "Morocco",
      "Othmane Aoubid",
      "عثمان أوبيد",
    ],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      
      <Hero />
      <Stats />
      <FeaturedProjects />
      <SkillsSection />
      <ServicesCTA />
    </>
  );
}
