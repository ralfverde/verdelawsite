/**
 * Real 5-star Google reviews. Do NOT translate these — the bilingual
 * mix (English + Spanish, preserved as written) IS the social proof.
 * Display order is intentional: opens in English (Paola B.), pivots
 * immediately to a long-form Spanish review (Alfonso A.) to signal
 * the firm serves both languages, alternates for rhythm, and closes
 * with Maricel C. naming Rafael + Daliana to reinforce attribution.
 */
export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  stars: 5;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "I was so lost on where to start with my residency case, but Attorney Verde broke down the process for me! I was so stressed going into this process but Verde Law made it so easy. No questions went unanswered! I truly thank their entire team, I wouldn't have been able to achieve my residency without their help.",
    name: "Paola B.",
    stars: 5,
  },
  {
    id: 2,
    quote:
      "Quiero agradecer profundamente al abogado Verde por el excelente trabajo y apoyo durante todo mi proceso de asilo. Desde el primer día me brindó confianza, orientación y un trato humano que hizo toda la diferencia. Siempre estuvo disponible para responder mis preguntas y explicar cada paso con claridad. Gracias a su profesionalismo y dedicación, pude presentar mi caso con tranquilidad. Lo recomiendo 100% a cualquier persona que necesite un abogado comprometido y con gran experiencia.",
    name: "Alfonso A.",
    stars: 5,
  },
  {
    id: 3,
    quote:
      "Verde Law is truly outstanding! From start to finish, they made the entire process smooth and stress free. She was incredibly kind, patient, and always made sure I understood every step. The whole team was professional, caring, and genuinely wanted to help. You can tell they really care about their clients. Highly recommend Verde Law to anyone looking for a firm that treats you like family and delivers great results!",
    name: "Brandon C.",
    stars: 5,
  },
  {
    id: 4,
    quote:
      "Estoy muy agradecido con el equipo de Verde Law. Me acompañaron con paciencia, profesionalismo y dedicación durante todo mi proceso migratorio. Me sentí apoyado y seguro en cada etapa. Siempre respondieron rápido, explicaron todo con claridad y mostraron verdadero interés en mi caso. Gracias por ayudarme a cumplir este sueño, los recomiendo al 100%.",
    name: "Oscar C.",
    stars: 5,
  },
  {
    id: 5,
    quote:
      "Tuve un caso de inmigración en corte y gracias al abogado Rafael Verde pude defenderme de la mejor manera. Daliana Vega siempre estuvo al tanto de fechas, documentos y preparación. Me sentí acompañado durante todo el proceso. Excelente representación, los recomiendo 100%.",
    name: "Yelian Z.",
    stars: 5,
  },
  {
    id: 6,
    quote:
      "The Verde Law Team helped me obtain my residency, and I'm extremely grateful for their support. They walked me through the entire process and kept me informed every step of the way. Mr. Rafael Verde was kind and always available to answer my questions. I highly recommend them to anyone and everyone!",
    name: "Olivia R.",
    stars: 5,
  },
  {
    id: 7,
    quote:
      "Tuve una excelente experiencia con Verde Law. Desde el primer contacto fueron profesionales, claros y muy atentos a cada detalle del proceso. Me brindaron orientación precisa, estuvieron siempre disponibles para responder mis dudas y se aseguraron de que entendiera cada paso. Su nivel de organización, transparencia y compromiso realmente los distingue. Los recomiendo sin duda para cualquier trámite migratorio, un servicio impecable y humano.",
    name: "Nardis L.",
    stars: 5,
  },
  {
    id: 8,
    quote:
      "Excellent service, great human empathy, and a genuine desire to find the best solution for the client.",
    name: "Javier S.",
    stars: 5,
  },
  {
    id: 9,
    quote:
      "Excellent work from the entire team. My Adjustment of Status process was fast and efficient, with an exceptional result. From the beginning, they demonstrated dedication, professionalism, and total commitment to my case. Without a doubt, hiring Verde Law was the best decision. Highly recommended!",
    name: "Karla R.",
    stars: 5,
  },
  {
    id: 10,
    quote:
      "Desde el primer día fueron muy atentos y respetuosos. Me explicaron todo con paciencia y claridad. Siempre respondieron mis llamadas y mensajes. Me mantuvieron informada durante todo el proceso. Los recomiendo 100%. Sin duda volvería a contratar sus servicios.",
    name: "Paola M.",
    stars: 5,
  },
  {
    id: 11,
    quote:
      "Excelente servicio profesional. Desde el primer momento me ofrecieron una atención clara, honesta y comprometida. El equipo se mostró siempre disponible para responder mis dudas y llevar mi caso con seriedad y eficacia. Me sentí acompañada y respaldada en todo momento. Profesionales con calidez humana que realmente se preocupan por ti.",
    name: "Magdey C.",
    stars: 5,
  },
  {
    id: 12,
    quote:
      "Verde Law is an outstanding firm that truly cares about its clients. The team is professional and knowledgeable. Communication is clear. Highly recommend Verde Law to anyone looking for reliable and dedicated legal help.",
    name: "Melody M.",
    stars: 5,
  },
  {
    id: 13,
    quote:
      "I had an excellent experience with Verde Law Firm and would highly recommend their services to anyone in need of legal assistance. From the very first consultation, the team demonstrated professionalism, expertise, and a genuine commitment to my case. They were responsive to all of my questions, kept me informed throughout the process, and ensured I understood every step along the way.",
    name: "Paula C.",
    stars: 5,
  },
  {
    id: 14,
    quote:
      "Verde Law es un despacho legal excepcional. El equipo es muy profesional, atento y siempre dispuesto a ayudar. Se toman el tiempo para explicar cada paso del proceso y hacen que todo sea mucho más claro y menos estresante. Se nota que realmente se preocupan por sus clientes. Recomiendo ampliamente a Verde Law por su dedicación y excelente servicio.",
    name: "Wendy M.",
    stars: 5,
  },
  {
    id: 15,
    quote:
      "Quiero expresar mi más profundo agradecimiento al abogado Rafael Verde y a su asistente Daliana Vega por el excelente servicio que me brindaron durante todo el proceso de mi residencia permanente en los Estados Unidos. Su profesionalismo, dedicación y acompañamiento constante hicieron que cada etapa fuera clara y manejable. Gracias por su compromiso y por ayudarme a cumplir este importante sueño. ¡Los recomiendo ampliamente!",
    name: "Maricel C.",
    stars: 5,
  },
];
