import type { Metadata } from "next";
import { buildMetadata, pick } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/contact",
    title: pick(locale, {
      en: "Contact Othmane Aoubid — Full-Stack Developer & Cloud Engineer in Morocco",
      fr: "Contacter Othmane Aoubid — Développeur Full-Stack & Ingénieur Cloud au Maroc",
      ar: "تواصل مع عثمان أوبيد — مطور برمجيات ومهندس حوسبة سحابية في المغرب",
    }),
    description: pick(locale, {
      en: "Get in touch with Othmane Aoubid for full-stack development roles, cloud engineering projects, web application development, and consulting. Based in Casablanca, available worldwide and remote.",
      fr: "Contactez Othmane Aoubid pour des postes en développement full-stack, des projets cloud engineering, développement d'applications web et conseil. Basé à Casablanca, disponible à distance partout dans le monde.",
      ar: "تواصل مع عثمان أوبيد لوظائف تطوير برمجيات شامل، ومشاريع هندسة الحوسبة السحابية، وتطوير تطبيقات الويب، والاستشارات. مقيم في الدار البيضاء، متاح عن بُعد عالمياً.",
    }),
    keywords: [
      "contact full-stack developer",
      "hire cloud engineer Morocco",
      "freelance web development",
      "web development consulting Casablanca",
      "Othmane Aoubid contact",
    ],
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
