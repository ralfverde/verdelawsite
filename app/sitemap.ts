import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";

type ChangeFreq = "daily" | "weekly" | "monthly" | "yearly";

type Entry = {
  en: string;
  es: string;
  changeFrequency?: ChangeFreq;
  priority?: number;
};

const staticEntries: Entry[] = [
  { en: "/", es: "/es", changeFrequency: "weekly", priority: 1.0 },
  { en: "/practice-areas", es: "/es/areas-de-practica", changeFrequency: "weekly", priority: 0.9 },
  { en: "/about", es: "/es/sobre-nosotros", changeFrequency: "monthly", priority: 0.7 },
  { en: "/our-team", es: "/es/nuestro-equipo", changeFrequency: "monthly", priority: 0.7 },
  { en: "/locations", es: "/es/ubicaciones", changeFrequency: "monthly", priority: 0.7 },
  { en: "/education", es: "/es/educacion", changeFrequency: "weekly", priority: 0.8 },
  { en: "/verde-plus", es: "/es/verde-plus", changeFrequency: "monthly", priority: 0.7 },
  { en: "/contact", es: "/es/contacto", changeFrequency: "monthly", priority: 0.8 },
  { en: "/privacy", es: "/es/privacidad", changeFrequency: "yearly", priority: 0.3 },
  { en: "/terms", es: "/es/terminos", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const practiceEntries: Entry[] = services.map((s) => ({
    en: `/practice-areas/${s.slug.en}`,
    es: `/es/areas-de-practica/${s.slug.es}`,
    changeFrequency: "monthly",
    priority: s.featured ? 0.8 : 0.6,
  }));

  const all: Entry[] = [...staticEntries, ...practiceEntries];

  return all.map(({ en, es, changeFrequency, priority }) => ({
    url: `${SITE_URL}${en}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${SITE_URL}${en}`,
        "es-US": `${SITE_URL}${es}`,
        "x-default": `${SITE_URL}${en}`,
      },
    },
  }));
}
