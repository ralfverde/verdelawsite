export type TeamMember = {
  id: string;
  name: string;
  role: "attorney" | "paralegal" | "support";
  initials: string;
  titleKey: string;
  bioKey?: string;
  linkedin?: string;
  languages?: string[];
};

export const attorneys: TeamMember[] = [
  {
    id: "rafael-verde",
    name: "Rafael Verde",
    role: "attorney",
    initials: "RV",
    titleKey: "attorneys.rafael.title",
    bioKey: "attorneys.rafael.bio",
    linkedin: "https://www.linkedin.com/in/rafaelverde",
    languages: ["English", "Español"],
  },
  {
    id: "jennifer-colon",
    name: "Jennifer Colón Rodríguez",
    role: "attorney",
    initials: "JC",
    titleKey: "attorneys.jennifer.title",
    bioKey: "attorneys.jennifer.bio",
    languages: ["English", "Español"],
  },
];

export const paralegals: TeamMember[] = [
  { id: "aniela", name: "Aniela Miguel Paz", role: "paralegal", initials: "AM", titleKey: "paralegal" },
  { id: "mayerli", name: "Mayerli Zepeda", role: "paralegal", initials: "MZ", titleKey: "paralegal" },
  { id: "flor", name: "Flor Fernandez", role: "paralegal", initials: "FF", titleKey: "paralegal" },
  { id: "alba", name: "Alba Mosqueda", role: "paralegal", initials: "AM", titleKey: "paralegal" },
];

export const support: TeamMember[] = [
  { id: "daliana", name: "Daliana Vega", role: "support", initials: "DV", titleKey: "support.officeManager" },
  { id: "jeanine", name: "Jeanine Velasquez", role: "support", initials: "JV", titleKey: "support.intakeSupervisor" },
  { id: "yunetsy", name: "Yunetsy De La Cruz", role: "support", initials: "YC", titleKey: "support.billing" },
  { id: "vianney", name: "Vianney Davila", role: "support", initials: "VD", titleKey: "support.marketing" },
];
