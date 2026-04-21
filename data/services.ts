export type ServiceCategory =
  | "deportation"
  | "asylum"
  | "bond"
  | "appeals"
  | "family"
  | "humanitarian"
  | "employment"
  | "administrative";

export type Service = {
  id: string;
  slug: { en: string; es: string };
  category: ServiceCategory;
  price: number;
  icon:
    | "Shield"
    | "Home"
    | "Scale"
    | "Users"
    | "Heart"
    | "Award"
    | "FileText"
    | "Briefcase"
    | "Gavel"
    | "PenLine"
    | "RefreshCw"
    | "AlertTriangle";
  featured?: boolean;
};

export const services: Service[] = [
  // Deportation defense
  { id: "deportation-defense", slug: { en: "deportation-defense", es: "defensa-de-deportacion" }, category: "deportation", price: 8000, icon: "Shield", featured: true },
  { id: "deportation-detained", slug: { en: "deportation-detained", es: "defensa-de-deportacion-detenido" }, category: "deportation", price: 9000, icon: "Shield" },
  { id: "deportation-adjustment", slug: { en: "deportation-adjustment", es: "deportacion-ajuste-de-estatus" }, category: "deportation", price: 10000, icon: "Shield" },
  { id: "cancellation-of-removal", slug: { en: "cancellation-of-removal", es: "cancelacion-de-deportacion" }, category: "deportation", price: 9000, icon: "Gavel" },
  { id: "master-calendar", slug: { en: "master-calendar", es: "audiencia-maestra-individual" }, category: "deportation", price: 3000, icon: "FileText" },
  { id: "individual-hearing", slug: { en: "individual-hearing", es: "audiencia-individual" }, category: "deportation", price: 6000, icon: "Gavel" },

  // Asylum
  { id: "asylum", slug: { en: "asylum", es: "asilo" }, category: "asylum", price: 5000, icon: "Home", featured: true },
  { id: "credible-fear-interview", slug: { en: "credible-fear-interview", es: "entrevista-de-miedo-creible" }, category: "asylum", price: 3000, icon: "AlertTriangle" },

  // Bond
  { id: "bond-hearing", slug: { en: "bond-hearing", es: "audiencia-de-fianza" }, category: "bond", price: 5000, icon: "Scale", featured: true },
  { id: "bond-deportation-package", slug: { en: "bond-deportation-package", es: "fianza-deportacion-paquete" }, category: "bond", price: 11000, icon: "Scale" },
  { id: "bond-habeas", slug: { en: "bond-habeas", es: "fianza-habeas-corpus" }, category: "bond", price: 11000, icon: "Scale" },

  // Appeals
  { id: "bia-appeal", slug: { en: "bia-appeal", es: "apelacion-bia" }, category: "appeals", price: 4000, icon: "FileText" },
  { id: "motion-to-reopen", slug: { en: "motion-to-reopen", es: "mocion-para-reabrir" }, category: "appeals", price: 3000, icon: "RefreshCw" },
  { id: "motion-to-terminate", slug: { en: "motion-to-terminate", es: "mocion-para-terminar" }, category: "appeals", price: 2500, icon: "PenLine" },
  { id: "change-of-venue", slug: { en: "change-of-venue", es: "cambio-de-jurisdiccion" }, category: "appeals", price: 1500, icon: "PenLine" },
  { id: "circuit-appeal", slug: { en: "circuit-appeal", es: "apelacion-corte-de-circuito" }, category: "appeals", price: 10000, icon: "Gavel" },
  { id: "habeas-corpus", slug: { en: "habeas-corpus", es: "habeas-corpus" }, category: "appeals", price: 8000, icon: "Scale" },

  // Family
  { id: "family-petitions", slug: { en: "family-petitions", es: "peticiones-familiares" }, category: "family", price: 2500, icon: "Users", featured: true },
  { id: "adjustment-of-status", slug: { en: "adjustment-of-status", es: "ajuste-de-estatus" }, category: "family", price: 2500, icon: "FileText" },
  { id: "family-package", slug: { en: "family-package", es: "paquete-familiar" }, category: "family", price: 5000, icon: "Users" },
  { id: "provisional-waiver", slug: { en: "provisional-waiver", es: "perdon-provisional" }, category: "family", price: 6500, icon: "FileText" },

  // Humanitarian
  { id: "vawa", slug: { en: "vawa", es: "vawa" }, category: "humanitarian", price: 7000, icon: "Heart", featured: true },
  { id: "u-visa", slug: { en: "u-visa", es: "visa-u" }, category: "humanitarian", price: 7000, icon: "Heart", featured: true },

  // Employment & Status
  { id: "work-permit", slug: { en: "work-permit", es: "permiso-de-trabajo" }, category: "employment", price: 750, icon: "Briefcase", featured: true },
  { id: "work-permit-addon", slug: { en: "work-permit-addon", es: "permiso-de-trabajo-add-on" }, category: "employment", price: 350, icon: "Briefcase" },
  { id: "naturalization", slug: { en: "naturalization", es: "naturalizacion" }, category: "employment", price: 2500, icon: "Award", featured: true },
  { id: "green-card-renewal", slug: { en: "green-card-renewal", es: "renovacion-de-residencia" }, category: "employment", price: 1200, icon: "RefreshCw" },

  // Administrative
  { id: "foia-request", slug: { en: "foia-request", es: "solicitud-foia" }, category: "administrative", price: 750, icon: "FileText" },
  { id: "rfe-response", slug: { en: "rfe-response", es: "respuesta-rfe" }, category: "administrative", price: 1500, icon: "PenLine" },
  { id: "ice-checkin", slug: { en: "ice-checkin", es: "representacion-ice-checkin" }, category: "administrative", price: 2000, icon: "ShieldCheck" as never },
];

export function getService(slug: string, locale: "en" | "es" = "en"): Service | undefined {
  return services.find((s) => s.slug[locale] === slug || s.slug.en === slug);
}

export const categoryOrder: ServiceCategory[] = [
  "deportation",
  "asylum",
  "bond",
  "appeals",
  "family",
  "humanitarian",
  "employment",
  "administrative",
];
