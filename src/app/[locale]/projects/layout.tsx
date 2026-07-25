import type { Metadata } from "next";
import { buildMetadata, pick } from "@/lib/seo";
import { projects, SITE_URL } from "@/lib/data";
import { BreadcrumbSchema, ItemListSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/projects",
    title: pick(locale, {
      en: "Projects Portfolio — Othmane Aoubid",
      fr: "Portfolio de projets — Othmane Aoubid",
      ar: "معرض المشاريع — عثمان أوبيد",
    }),
    description: pick(locale, {
      en: "Selected full-stack, cloud, AI integration, and web projects by Othmane Aoubid, with code, technical details, and documented results.",
      fr: "Une sélection de projets full-stack, cloud, intégration IA et web par Othmane Aoubid, avec code, détails techniques et résultats documentés.",
      ar: "مجموعة مختارة من مشاريع التطوير المتكامل والحوسبة السحابية وتكامل الذكاء الاصطناعي والويب لعثمان أوبيد، مع الكود والتفاصيل التقنية والنتائج الموثقة.",
    }),
    keywords: [
      "full-stack projects",
      "backend projects",
      "cloud projects",
      "web development portfolio",
      "Othmane Aoubid",
    ],
  });
}

export default async function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === "fr" ? "Accueil" : locale === "ar" ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
          { name: locale === "fr" ? "Projets" : locale === "ar" ? "المشاريع" : "Projects", url: `${SITE_URL}/${locale}/projects` },
        ]}
      />
      <ItemListSchema
        name="Selected software engineering projects"
        items={projects.slice(0, 30).map((p) => ({
          name: locale === "fr" ? (p.titleFr ?? p.title) : locale === "ar" ? (p.titleAr ?? p.title) : p.title,
          url: `${SITE_URL}/${locale}/projects/${p.id}`,
        }))}
      />
      {children}
    </>
  );
}
