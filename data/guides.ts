/**
 * Free immigration guides available for download from the Education
 * page. Visitors fill a short opt-in (name + email + phone + terms)
 * before the PDF is served; the submission also flows into the GHL
 * CRM so the team can follow up.
 *
 * PDFs live in public/guides/ and are referenced by absolute paths
 * so <a href={pdf} download> resolves cleanly. `cover` is a
 * placeholder for the future real cover image — until it's set,
 * GuidesGrid renders a styled verde card with the guide title.
 */

export type Locale = "en" | "es";

export type Guide = {
  id: string;
  cover: string | null;
  pdf: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const guides: Guide[] = [
  {
    id: "asylum",
    cover: null,
    pdf: "/guides/guide-1.pdf",
    title: {
      en: "Complete Guide to Asylum in the United States",
      es: "Guía Completa del Asilo en Estados Unidos",
    },
    description: {
      en: "Everything you need to know about the asylum process, eligibility, and how to prepare your case.",
      es: "Todo lo que necesita saber sobre el proceso de asilo, elegibilidad, y cómo preparar su caso.",
    },
  },
  {
    id: "legal-representation",
    cover: null,
    pdf: "/guides/guide-2.pdf",
    title: {
      en: "Legal Representation in Immigration Court",
      es: "Representación Legal en la Corte de Inmigración",
    },
    description: {
      en: "What to expect in immigration court and how legal representation changes your outcome.",
      es: "Qué esperar en la corte de inmigración y cómo la representación legal cambia su resultado.",
    },
  },
  {
    id: "bond",
    cover: null,
    pdf: "/guides/guide-3.pdf",
    title: {
      en: "Complete Immigration Bond Guide",
      es: "Fianza de Inmigración: Guía Completa",
    },
    description: {
      en: "How bond hearings work, what judges look for, and how to prepare the strongest case for release.",
      es: "Cómo funcionan las audiencias de fianza, qué buscan los jueces, y cómo preparar el caso más fuerte para la liberación.",
    },
  },
  {
    id: "cancellation",
    cover: null,
    pdf: "/guides/guide-4.pdf",
    title: {
      en: "Cancellation of Removal Guide",
      es: "Cancelación de la Deportación: Guía Completa",
    },
    description: {
      en: "Who qualifies for cancellation of removal and what the process looks like from start to finish.",
      es: "Quién califica para cancelación de la deportación y cómo es el proceso de principio a fin.",
    },
  },
  {
    id: "family",
    cover: null,
    pdf: "/guides/guide-5.pdf",
    title: {
      en: "Family Reunification in the United States",
      es: "Reunificación Familiar en Estados Unidos",
    },
    description: {
      en: "A step-by-step guide to family-based petitions, adjustment of status, and consular processing.",
      es: "Una guía paso a paso sobre peticiones familiares, ajuste de estatus, y procesamiento consular.",
    },
  },
  {
    id: "vawa-u",
    cover: null,
    pdf: "/guides/guide-6.pdf",
    title: {
      en: "Immigration Guide for Victims of Abuse, Crime, or Trafficking",
      es: "Guía Migratoria para Víctimas de Abuso, Crimen o Tráfico Humano en EE.UU.",
    },
    description: {
      en: "VAWA, U-Visa, and T-Visa options for survivors. Your rights, the process, and how to apply safely.",
      es: "Opciones de VAWA, Visa U, y Visa T para sobrevivientes. Sus derechos, el proceso, y cómo aplicar de forma segura.",
    },
  },
];
