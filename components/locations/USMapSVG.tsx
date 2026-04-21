"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/**
 * Stylized US coverage map. Not geographically accurate — a decorative
 * dot-grid with a highlighted Miami pin. Good enough for marketing.
 */
export function USMapSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--verde-900)] border border-[var(--gold-500)]/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-800),var(--verde-950)_70%)]" />
      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="rgba(255,255,255,0.12)" />
          </pattern>
          <radialGradient id="usa" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="rgba(90,173,138,0.38)" />
            <stop offset="100%" stopColor="rgba(61,139,110,0.05)" />
          </radialGradient>
        </defs>
        <rect width="800" height="450" fill="url(#dotgrid)" />
        {/* Approx USA outline */}
        <path
          d="M60 120 L220 90 L320 70 L420 85 L520 100 L630 120 L720 180 L760 230 L720 310 L660 360 L540 400 L420 410 L320 395 L220 370 L130 330 L60 260 Z"
          fill="url(#usa)"
          stroke="rgba(200,169,81,0.45)"
          strokeWidth="1.2"
        />
        {/* State dots */}
        {[
          [140, 150], [180, 140], [230, 175], [280, 160], [330, 150], [390, 155],
          [460, 160], [520, 170], [580, 180], [640, 200], [700, 230], [200, 220],
          [260, 230], [320, 225], [380, 240], [440, 250], [510, 260], [580, 280],
          [240, 290], [320, 300], [400, 320], [490, 330], [580, 340], [670, 320],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="var(--gold-500)"
            opacity="0.5"
          />
        ))}
      </svg>
      {/* Miami pin */}
      <div className="absolute" style={{ left: "72%", top: "74%" }}>
        <span className="relative grid place-items-center">
          <span className="absolute w-10 h-10 rounded-full bg-[var(--gold-500)]/30 animate-ping" aria-hidden />
          <span className="grid place-items-center rounded-full bg-[var(--gold-500)] text-[var(--verde-950)] shadow-lg" style={{ width: 32, height: 32 }}>
            <MapPin size={16} />
          </span>
        </span>
      </div>
    </motion.div>
  );
}
