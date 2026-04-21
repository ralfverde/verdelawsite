export const testimonialIds = ["carlos", "maria", "jose", "elena", "pedro"] as const;
export type TestimonialId = (typeof testimonialIds)[number];
