import type { Metadata } from "next";

export const SITE_URL = "https://verdelaw.com";
export const SITE_NAME = "Verde Law";

type Locale = "en" | "es";

export function buildMetadata(params: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternatePaths?: { en: string; es: string };
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const {
    locale,
    title,
    description,
    path,
    alternatePaths,
    ogImage,
    keywords,
  } = params;
  const url = `${SITE_URL}${path}`;
  const alternates = alternatePaths
    ? {
        canonical: url,
        languages: {
          en: `${SITE_URL}${alternatePaths.en}`,
          "es-US": `${SITE_URL}${alternatePaths.es}`,
          "x-default": `${SITE_URL}${alternatePaths.en}`,
        },
      }
    : { canonical: url };

  // Most page titles already include "Verde Law". Returning as absolute
  // bypasses the root-layout template's "| Verde Law — Immigration
  // Attorneys" suffix so we don't emit the brand twice.
  const finalTitle = /verde law/i.test(title)
    ? title
    : `${title} | Verde Law — Immigration Attorneys`;

  return {
    title: { absolute: finalTitle },
    description,
    keywords,
    alternates,
    openGraph: {
      title: finalTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_US",
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: finalTitle }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Organization + LegalService + LocalBusiness combined schema. Emitted
 * once globally from app/[locale]/layout.tsx so Google can attach
 * every page to a single Organization identity.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Verde Law, PLLC",
  alternateName: "Verde Law",
  description:
    "Miami-based immigration law firm serving all 50 states. Deportation defense, asylum, bond hearings, family petitions, VAWA, U-Visa, naturalization, and more.",
  url: SITE_URL,
  telephone: "+1-305-786-3003",
  email: "info@verdelaw.com",
  image: `${SITE_URL}/images/verde-law-logo.png`,
  logo: `${SITE_URL}/images/verde-law-logo.png`,
  foundingDate: "2024",
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "United States" },
  serviceArea: { "@type": "Country", name: "United States" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "850 NW 42nd Ave, Suite 306",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33126",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.7711, longitude: -80.2388 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  founder: {
    "@type": "Person",
    name: "Rafael Verde",
    jobTitle: "Managing Attorney",
    image: `${SITE_URL}/images/team/rafael.png`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "130",
    bestRating: "5",
  },
  sameAs: [
    "https://www.tiktok.com/@verdelawfirm",
    "https://www.instagram.com/verdelaw",
    "https://www.youtube.com/@VerdeLawyers",
    "https://www.facebook.com/verdelaw",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Immigration Legal Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Deportation Defense" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Asylum Representation" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Bond Hearings" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Family Petitions" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "VAWA Self-Petition" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "U-Visa" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Naturalization" } },
      { "@type": "Offer", itemOffered: { "@type": "LegalService", name: "Work Permit" } },
    ],
  },
};

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function attorneySchema(params: {
  name: string;
  jobTitle: string;
  image: string;
  alumniOf?: string[];
  knowsLanguage?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: params.name,
    jobTitle: params.jobTitle,
    image: params.image.startsWith("http")
      ? params.image
      : `${SITE_URL}${params.image}`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    ...(params.alumniOf && {
      alumniOf: params.alumniOf.map((a) => ({
        "@type": "CollegeOrUniversity",
        name: a,
      })),
    }),
    ...(params.knowsLanguage && { knowsLanguage: params.knowsLanguage }),
  };
}
