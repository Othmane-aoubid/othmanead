"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, Code2, ServerCog, ShieldCheck } from "lucide-react";

const serviceHighlights = [
  { 
    icon: Code2, 
    color: "#6c63ff", 
    titleKey: "s1_title", 
    descKey: "s1_desc", 
    price: "299",  
    tier: "basic" 
  },
  { 
    icon: ServerCog, 
    color: "#00d4aa", 
    titleKey: "s2_title", 
    descKey: "s2_desc", 
    price: "499",  
    tier: "pro" 
  },
  { 
    icon: ShieldCheck, 
    color: "#ff6b6b", 
    titleKey: "s3_title", 
    descKey: "s3_desc", 
    price: "999",  
    tier: "enterprise" 
  },
];

export default function ServicesCTA() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {t("title")}
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {serviceHighlights.map((s) => (
            <div
              key={s.titleKey}
              className="relative p-6 rounded-2xl border transition-all group card-glow flex flex-col"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
              />

              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${s.color}20` }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                {t(s.titleKey as keyof typeof t)}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                {t(s.descKey as keyof typeof t)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all group"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {t("get_started")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
