/**
 * Verde Law team roster.
 *
 * Roles and bios are inlined per-locale rather than kept in the
 * translation shards because this data is small, tightly coupled to
 * the photos, and easier to audit in one place. The our-team page
 * picks the right variant from each `{ en, es }` block at render.
 */

export type Locale = "en" | "es";

export type TeamMember = {
  name: string;
  role: Record<Locale, string>;
  photo: string;
  bio: Record<Locale, string>;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Rafael Verde",
    role: { en: "Managing Attorney", es: "Abogado Principal" },
    photo: "/images/team/rafael.png",
    bio: {
      en: "Founded Verde Law straight out of law school with one mission: give every immigrant family the representation they deserve. Reviews every new case personally.",
      es: "Fundó Verde Law recién salido de la facultad de derecho con una misión: darle a cada familia inmigrante la representación que merece. Revisa cada caso nuevo personalmente.",
    },
  },
  {
    name: "Jennifer Colon",
    role: { en: "Associate Attorney", es: "Abogada Asociada" },
    photo: "/images/team/jennifer.png",
    bio: {
      en: "Specializes in VAWA, U-Visa, and humanitarian cases. Clients say she's the first attorney who made them feel safe enough to tell their full story.",
      es: "Especialista en VAWA, Visa U y casos humanitarios. Los clientes dicen que es la primera abogada que les hizo sentir lo suficientemente seguros para contar su historia completa.",
    },
  },
  {
    name: "Daliana Vega",
    role: { en: "Supervising Paralegal", es: "Paralegal Supervisora" },
    photo: "/images/team/daliana.png",
    bio: {
      en: "Keeps every case on track from day one. Coordinates between clients, attorneys, and the court so nothing falls through the cracks.",
      es: "Mantiene cada caso al día desde el primer momento. Coordina entre clientes, abogados y la corte para que nada se pierda.",
    },
  },
  {
    name: "Mayerli Zepeda",
    role: { en: "Paralegal", es: "Paralegal" },
    photo: "/images/team/mayerli.png",
    bio: {
      en: "Handles asylum and VAWA case preparation with care and precision. Known for making clients feel supported through the hardest parts of the process.",
      es: "Maneja la preparación de casos de asilo y VAWA con cuidado y precisión. Conocida por hacer que los clientes se sientan apoyados en los momentos más difíciles del proceso.",
    },
  },
  {
    name: "Giselle Martinez",
    role: { en: "Paralegal", es: "Paralegal" },
    photo: "/images/team/giselle.png",
    bio: {
      en: "Supports the legal team with case research, document preparation, and client communication. Detail-oriented and always one step ahead.",
      es: "Apoya al equipo legal con investigación de casos, preparación de documentos y comunicación con clientes. Detallista y siempre un paso adelante.",
    },
  },
  {
    name: "Karla Rojas",
    role: { en: "Intake Coordinator", es: "Coordinadora de Intake" },
    photo: "/images/team/karla.png",
    bio: {
      en: "Often the first person you'll speak with at Verde Law. Walks you through your situation with patience and makes sure you feel heard from the very first call.",
      es: "Frecuentemente la primera persona con la que hablará en Verde Law. Le guía por su situación con paciencia y se asegura de que se sienta escuchado desde la primera llamada.",
    },
  },
  {
    name: "Gustavo Ortiz",
    role: { en: "Intake Coordinator", es: "Coordinador de Intake" },
    photo: "/images/team/gustavo.png",
    bio: {
      en: "Helps families understand their options from the first conversation. Focused on making the intake process clear, fast, and stress-free.",
      es: "Ayuda a las familias a entender sus opciones desde la primera conversación. Enfocado en que el proceso de intake sea claro, rápido y sin estrés.",
    },
  },
  {
    name: "Yunetsy De La Cruz",
    role: { en: "Billing Coordinator", es: "Coordinadora de Facturación" },
    photo: "/images/team/yunetsy.png",
    bio: {
      en: "Manages billing, payment plans, and financial coordination. Makes sure every client has a plan that works for their budget.",
      es: "Maneja la facturación, planes de pago y coordinación financiera. Se asegura de que cada cliente tenga un plan que funcione para su presupuesto.",
    },
  },
  {
    name: "Flor Fernandez",
    role: { en: "Paralegal", es: "Paralegal" },
    photo: "/images/team/flor.png",
    bio: {
      en: "Supports removal defense and court preparation. Keeps case files organized and attorneys prepared for every hearing.",
      es: "Apoya la defensa contra la deportación y la preparación para corte. Mantiene los expedientes organizados y a los abogados preparados para cada audiencia.",
    },
  },
  {
    name: "Alba Mosqueda",
    role: { en: "Paralegal", es: "Paralegal" },
    photo: "/images/team/alba.png",
    bio: {
      en: "Focuses on evidence gathering, country condition reports, and document coordination. Precise and essential to every case she touches.",
      es: "Se enfoca en recopilación de evidencia, reportes de condiciones de país y coordinación de documentos. Precisa y esencial en cada caso que toca.",
    },
  },
  {
    name: "Jeanine Velasquez",
    role: { en: "Intake Supervisor", es: "Supervisora de Intake" },
    photo: "/images/team/jeanine.png",
    bio: {
      en: "Runs the intake team and makes sure every lead gets a timely, personal response. If you've reached out to Verde Law, Jeanine made sure someone got back to you.",
      es: "Dirige el equipo de intake y se asegura de que cada lead reciba una respuesta oportuna y personal. Si se comunicó con Verde Law, Jeanine se aseguró de que alguien le respondiera.",
    },
  },
  {
    name: "Gladys Maldonado",
    role: { en: "Customer Care", es: "Atención al Cliente" },
    photo: "/images/team/gladys.png",
    bio: {
      en: "Follows up with clients and leads to make sure no one is left waiting. Persistent, warm, and genuinely invested in every conversation.",
      es: "Da seguimiento a clientes y leads para asegurarse de que nadie se quede esperando. Persistente, cálida y genuinamente interesada en cada conversación.",
    },
  },
  {
    name: "Aniela Miguel Paz",
    role: { en: "Paralegal", es: "Paralegal" },
    photo: "/images/team/aniela.png",
    bio: {
      en: "One of the most experienced paralegals on the team. Handles a high volume of cases with consistency and care that clients notice and appreciate.",
      es: "Una de las paralegales con más experiencia en el equipo. Maneja un alto volumen de casos con consistencia y cuidado que los clientes notan y aprecian.",
    },
  },
  {
    name: "Yorlady Garzon",
    role: { en: "Customer Care", es: "Atención al Cliente" },
    photo: "/images/team/yorlady.png",
    bio: {
      en: "Keeps communication flowing between the firm and its clients. Always available, always responsive, always with a kind word.",
      es: "Mantiene la comunicación fluyendo entre la firma y sus clientes. Siempre disponible, siempre atenta, siempre con una palabra amable.",
    },
  },
  {
    name: "Gabriel Beltran",
    role: { en: "Intake Coordinator", es: "Coordinador de Intake" },
    photo: "/images/team/gabriel.png",
    bio: {
      en: "Connects with families from the first call and helps them take the first step toward legal representation.",
      es: "Conecta con las familias desde la primera llamada y les ayuda a dar el primer paso hacia la representación legal.",
    },
  },
  {
    name: "Andy Bebelagua",
    role: { en: "Software Developer", es: "Desarrollador de Software" },
    photo: "/images/team/andy.png",
    bio: {
      en: "Builds the technology behind Verde Law's operations and the Verde+ platform. Making immigration law more accessible through software.",
      es: "Construye la tecnología detrás de las operaciones de Verde Law y la plataforma Verde+. Haciendo la ley de inmigración más accesible a través del software.",
    },
  },
];
