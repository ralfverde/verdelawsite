import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      es: "/es",
    },
  },
  pathnames: {
    "/": "/",
    "/practice-areas": {
      en: "/practice-areas",
      es: "/areas-de-practica",
    },
    "/practice-areas/[slug]": {
      en: "/practice-areas/[slug]",
      es: "/areas-de-practica/[slug]",
    },
    "/about": {
      en: "/about",
      es: "/sobre-nosotros",
    },
    "/our-team": {
      en: "/our-team",
      es: "/nuestro-equipo",
    },
    "/locations": {
      en: "/locations",
      es: "/ubicaciones",
    },
    "/education": {
      en: "/education",
      es: "/educacion",
    },
    "/verde-plus": "/verde-plus",
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
    "/privacy": {
      en: "/privacy",
      es: "/privacidad",
    },
    "/terms": {
      en: "/terms",
      es: "/terminos",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
