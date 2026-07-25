import {
  PERSON,
  SITE_URL,
  EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
  KAGGLE_URL,
} from "@/lib/data";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    alternateName: [PERSON.nameAr, "Othmane Aoubid"],
    jobTitle: [
      "Full-Stack Developer",
      "Cloud Engineer",
      "Backend Developer",
      "Frontend Developer",
    ],
    description: PERSON.description,
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/about`,
    email: EMAIL,
    telephone: "+212691618189",
    image: `${SITE_URL}/og-image.png`,
    sameAs: [LINKEDIN_URL, GITHUB_URL, KAGGLE_URL],
    nationality: { "@type": "Country", name: "Morocco" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
    },
    homeLocation: { "@type": "Place", name: "Casablanca, Morocco" },
    knowsLanguage: [
      { "@type": "Language", name: "French" },
      { "@type": "Language", name: "Arabic" },
      { "@type": "Language", name: "English" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Independent Full-Stack Developer",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "ENSET Mohammedia",
        sameAs: "https://enset-media.ac.ma/",
      },
      { "@type": "CollegeOrUniversity", name: "FST Mohammedia" },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Developer based in Morocco, specializing in building secure web applications, scalable backend systems, and cloud-ready solutions. With professional experience across frontend development, backend engineering, cybersecurity, and production deployments, I combine modern technologies with practical engineering to deliver reliable software.",
      occupationalCategory: "15-1132.00", // Software Developers (O*NET)
      skills:
        "React, Next.js, TypeScript, Node.js, Cloud Infrastructure, DevOps, Docker, Kubernetes, System Design, Database Management, API Development",
    },
    seeks: {
      "@type": "Demand",
      name: "Full-stack development roles, cloud engineering projects, web application development, and consulting",
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Cloud Computing",
      "Backend Engineering",
      "Frontend Development",
      "DevOps",
      "System Architecture",
      "Database Design",
      "API Development",
      "Microservices",
      "Containerization",
      "Cloud Infrastructure",
      "Cybersecurity",
      "Performance Optimization",
      "Scalable Systems",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master in Distributed Systems & AI",
        credentialCategory: "degree",
        educationalLevel: "Master",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Othmane Aoubid | Full-Stack Developer",
    description:
      "Full-Stack Developer & Cloud Engineer specializing in building secure web applications, scalable backend systems, and cloud-ready solutions. Based in Morocco.",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["en", "fr", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostingSchema({
  title,
  description,
  slug,
  date,
  tags,
  locale = "en",
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  locale?: string;
}) {
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished: date,
    dateModified: date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    keywords: tags.join(", "),
    image: `${SITE_URL}/og-image.png`,
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Organization entity — strengthens brand/knowledge-graph signals. */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Othmane Aoubid",
    url: SITE_URL,
    email: EMAIL,
    logo: `${SITE_URL}/og-image.png`,
    image: `${SITE_URL}/og-image.png`,
    founder: { "@id": `${SITE_URL}/#person` },
    sameAs: [LINKEDIN_URL, GITHUB_URL, KAGGLE_URL],
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Breadcrumb trail for a page. Pass localized {name, url} items in order. */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** ProfilePage wrapper for the About page. */
export function ProfilePageSchema({ url }: { url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Generic ItemList (for collection pages like /projects, /blog, /games). */
export function ItemListSchema({
  name,
  items,
}: {
  name: string;
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** LearningResource / Course for a learning topic. */
export function LearningResourceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url,
    learningResourceType: "Visual guide",
    educationalLevel: "Beginner to Advanced",
    inLanguage: ["en", "fr", "ar"],
    provider: { "@id": `${SITE_URL}/#person` },
    isAccessibleForFree: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    serviceType: "Full-Stack Development",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
