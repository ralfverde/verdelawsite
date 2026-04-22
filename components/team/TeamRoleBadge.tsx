"use client";

import { motion } from "framer-motion";

/**
 * Solid gold role pill overlaid on the team-card photo. Readable at
 * every photo background (all 16 headshots have verde green backdrops,
 * which the previous `bg-gold-500/20` tint was barely distinguishable
 * from) and slides in from the left on scroll so the grid animates
 * card-by-card as the user reaches the section.
 */
export function TeamRoleBadge({ role }: { role: string }) {
  return (
    <motion.div
      className="absolute bottom-3 left-3 z-10"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500 text-verde-950 text-xs font-heading font-semibold tracking-wide shadow-lg shadow-gold-500/20">
        {role}
      </span>
    </motion.div>
  );
}
