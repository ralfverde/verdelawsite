export const globalFaqIds = [
  "consultation",
  "cost",
  "outsideFlorida",
  "deportationOrder",
  "asylumProcess",
  "bondHearing",
  "timeline",
  "workWhilePending",
  "documents",
  "paymentPlans",
  "vawaEligibility",
  "iceDetention",
  "detainedHelp",
  "uVisa",
  "citizenship",
] as const;

export type GlobalFaqId = (typeof globalFaqIds)[number];

export const practiceFaqIds = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
] as const;
export type PracticeFaqId = (typeof practiceFaqIds)[number];
