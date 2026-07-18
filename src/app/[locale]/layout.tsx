import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GameProvider } from "@/contexts/GameContext";
import PersistentGameOverlay from "@/components/games/PersistentGameOverlay";
import { PersonSchema, WebsiteSchema, OrganizationSchema } from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Othmane Aoubid | Full-Stack Developer & Cloud Engineer",
    template: "%s | Othmane Aoubid",
  },
  description:
    "Full-Stack Developer & Cloud Engineer based in Morocco, specializing in building secure web applications, scalable backend systems, and cloud-ready solutions. Available worldwide for remote positions.",
  keywords: [
    "Full-Stack Developer",
    "Cloud Engineer",
    "Web Development",
    "Backend Development",
    "Frontend Development",
    "DevOps",
    "Infrastructure",
    "Scalable Systems",
    "Morocco",
    "Freelance Developer",
    "Othmane Aoubid",
    "عثمان أوبيد",
  ],
  authors: [{ name: "Othmane Aoubid", url: SITE_URL }],
  creator: "Othmane Aoubid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Othmane Aoubid | Full-Stack Developer",
    title: "Othmane Aoubid | Full-Stack Developer & Cloud Engineer",
    description:
      "Full-Stack Developer & Cloud Engineer with expertise in building secure web applications, scalable backend systems, and cloud-ready solutions. Available worldwide.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Othmane Aoubid - Full-Stack Developer & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Othmane Aoubid | Full-Stack Developer",
    description: "Full-Stack Developer & Cloud Engineer specializing in web development, backend systems, and cloud infrastructure. Based in Morocco.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      en: `${SITE_URL}/en`,
      fr: `${SITE_URL}/fr`,
      ar: `${SITE_URL}/ar`,
    },
  },
  verification: {
    // Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in your env (.env / Vercel).
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <link rel="alternate" type="application/rss+xml" title="Othmane Aoubid Blog" href="/feed.xml" />
      <PersonSchema />
      <WebsiteSchema />
      <OrganizationSchema />
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider locale={locale}>
          <GameProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PersistentGameOverlay />
          </GameProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
      <Analytics />
    </>
  );
}
