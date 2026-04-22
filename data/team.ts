export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  /** translation key under team.* for the role label on the badge */
  titleKey: string;
  /** translation key under team.* for the bio text. For attorneys this
   *  is a prefix with .p1/.p2/.p3 children; for everyone else a single
   *  string under team.teamBios.{id}. */
  bioKey: string;
  /** attorneys only — rendered in the credentials dl at bottom of card */
  credentials?: readonly ("education" | "barAdmissions" | "languages")[];
  linkedin?: string;
  /** tailwind gradient utility classes — varied per person so the
   *  placeholder photos feel distinct until real headshots are in. */
  gradient: string;
};

export const team: TeamMember[] = [
  {
    id: "rafael-verde",
    name: "Rafael Verde",
    initials: "RV",
    titleKey: "attorneys.rafael.title",
    bioKey: "bios.rafael-verde",
    credentials: ["education", "barAdmissions", "languages"],
    linkedin: "https://www.linkedin.com/in/rafaelverde",
    gradient: "bg-gradient-to-br from-verde-600 via-verde-700 to-verde-900",
  },
  {
    id: "jennifer-colon",
    name: "Jennifer Colón Rodríguez",
    initials: "JC",
    titleKey: "attorneys.jennifer.title",
    bioKey: "bios.jennifer-colon",
    credentials: ["education", "barAdmissions", "languages"],
    gradient: "bg-gradient-to-bl from-verde-600 via-verde-700 to-verde-950",
  },
  {
    id: "aniela",
    name: "Aniela Miguel Paz",
    initials: "AM",
    titleKey: "paralegal",
    bioKey: "teamBios.aniela",
    gradient: "bg-gradient-to-br from-verde-500 via-verde-700 to-verde-900",
  },
  {
    id: "mayerli",
    name: "Mayerli Zepeda",
    initials: "MZ",
    titleKey: "paralegal",
    bioKey: "teamBios.mayerli",
    gradient: "bg-gradient-to-tr from-verde-600 to-verde-900",
  },
  {
    id: "flor",
    name: "Flor Fernandez",
    initials: "FF",
    titleKey: "paralegal",
    bioKey: "teamBios.flor",
    gradient: "bg-gradient-to-tl from-verde-600 to-verde-800",
  },
  {
    id: "alba",
    name: "Alba Mosqueda",
    initials: "AM",
    titleKey: "paralegal",
    bioKey: "teamBios.alba",
    gradient: "bg-gradient-to-b from-verde-600 to-verde-900",
  },
  {
    id: "daliana",
    name: "Daliana Vega",
    initials: "DV",
    titleKey: "support.officeManager",
    bioKey: "teamBios.daliana",
    gradient: "bg-gradient-to-br from-verde-700 to-verde-900",
  },
  {
    id: "jeanine",
    name: "Jeanine Velasquez",
    initials: "JV",
    titleKey: "support.intakeSupervisor",
    bioKey: "teamBios.jeanine",
    gradient: "bg-gradient-to-bl from-verde-700 via-verde-800 to-verde-950",
  },
  {
    id: "yunetsy",
    name: "Yunetsy De La Cruz",
    initials: "YC",
    titleKey: "support.billing",
    bioKey: "teamBios.yunetsy",
    gradient: "bg-gradient-to-tr from-verde-700 to-verde-950",
  },
  {
    id: "vianney",
    name: "Vianney Davila",
    initials: "VD",
    titleKey: "support.marketing",
    bioKey: "teamBios.vianney",
    gradient: "bg-gradient-to-r from-verde-700 to-verde-900",
  },
];
