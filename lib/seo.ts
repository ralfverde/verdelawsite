import type { Metadata } from "next";

export const SITE_URL = "https://verdelaw.com";

export function buildMetadata(params: {
  locale: "en" | "es";
  title: string;
  description: string;
  path: string;
  alternatePaths?: { en: string; es: string };
  ogImage?: string;
}): Metadata {
  const { locale, title, description, path, alternatePaths, ogImage } = params;
  const fullTitle = `${title} | Verde Law, PLLC`;
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

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Verde Law",
      locale: locale === "es" ? "es_US" : "en_US",
      type: "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Verde Law, PLLC",
  description:
    "Humanitarian immigration law firm serving Spanish-speaking immigrants across all 50 states.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  image: `${SITE_URL}/og/home.png`,
  telephone: "+1-305-786-3003",
  email: "info@verdelaw.com",
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "United States" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "850 NW 42nd Ave, Suite 306",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33126",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.778, longitude: -80.301 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.tiktok.com/@verdelawfirm",
    "https://www.instagram.com/verdelaw",
    "https://www.youtube.com/@VerdeLawyers",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
  },
};
