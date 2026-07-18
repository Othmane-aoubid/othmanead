import type { Metadata } from "next";
import { buildMetadata, pick } from "@/lib/seo";
import { SITE_URL } from "@/lib/data";
import { ServiceSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/services",
    title: pick(locale, {
      en: "Web Development & Cloud Services — Full-Stack, Backend & Infrastructure",
      fr: "Services Développement Web & Cloud — Full-Stack, Backend & Infrastructure",
      ar: "خدمات تطوير الويب والحوسبة السحابية — برمجيات شاملة وخلفية وبنية تحتية",
    }),
    description: pick(locale, {
      en: "End-to-end web development and cloud services by Othmane Aoubid: full-stack applications, backend API development, cloud infrastructure, DevOps pipelines, and system architecture — delivered production-ready.",
      fr: "Services de développement web et cloud de bout en bout par Othmane Aoubid : applications full-stack, développement d'API backend, infrastructure cloud, pipelines DevOps et architecture système — prêts pour la production.",
      ar: "خدمات تطوير ويب وحوسبة سحابية شاملة من عثمان أوبيد: تطبيقات برمجيات شاملة، تطوير واجهات برمجة تطبيقات خلفية، بنية تحتية سحابية، خطوط DevOps، وهندسة أنظمة — جاهزة للإنتاج.",
    }),
    keywords: [
      "web development services Morocco",
      "full-stack development",
      "cloud infrastructure",
      "backend API development",
      "DevOps services",
      "system architecture",
      "hire full-stack developer",
    ],
  });
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Full-Stack Development & Cloud Engineering Services"
        description="Full-stack web applications, backend API development, cloud infrastructure, DevOps pipelines, and system architecture."
        url={`${SITE_URL}/services`}
      />
      {children}
    </>
  );
}
