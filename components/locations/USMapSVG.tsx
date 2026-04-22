"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/**
 * Stylized US coverage map — decorative, not geographically accurate.
 * The dots represent "states we serve" and reveal their name on hover
 * via the native title attribute.
 */
const STATE_DOTS: Array<{ x: number; y: number; name: string }> = [
  { x: 140, y: 150, name: "Washington" },
  { x: 180, y: 140, name: "Montana" },
  { x: 230, y: 175, name: "Idaho" },
  { x: 280, y: 160, name: "North Dakota" },
  { x: 330, y: 150, name: "Minnesota" },
  { x: 390, y: 155, name: "Wisconsin" },
  { x: 460, y: 160, name: "Michigan" },
  { x: 520, y: 170, name: "New York" },
  { x: 580, y: 180, name: "Massachusetts" },
  { x: 640, y: 200, name: "Maine" },
  { x: 700, y: 230, name: "Vermont" },
  { x: 200, y: 220, name: "Oregon" },
  { x: 260, y: 230, name: "Nevada" },
  { x: 320, y: 225, name: "Utah" },
  { x: 380, y: 240, name: "Colorado" },
  { x: 440, y: 250, name: "Kansas" },
  { x: 510, y: 260, name: "Missouri" },
  { x: 580, y: 280, name: "Illinois" },
  { x: 240, y: 290, name: "California" },
  { x: 320, y: 300, name: "Arizona" },
  { x: 400, y: 320, name: "Texas" },
  { x: 490, y: 330, name: "Louisiana" },
  { x: 580, y: 340, name: "Georgia" },
  { x: 670, y: 320, name: "North Carolina" },
];

export function USMapSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-verde-900 border border-gold-500/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-800),var(--verde-950)_70%)]" />

      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="United States coverage map"
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

        {/* State dots with hover tooltip */}
        {STATE_DOTS.map((d) => (
          <g key={d.name}>
            <circle
              cx={d.x}
              cy={d.y}
              r="3"
              className="fill-gold-500/50 hover:fill-gold-500 transition-colors duration-200"
            />
            <circle cx={d.x} cy={d.y} r="10" fill="transparent">
              <title>{d.name}</title>
            </circle>
          </g>
        ))}
      </svg>

      {/* Miami pin — our office */}
      <div className="absolute" style={{ left: "72%", top: "74%" }}>
        <span className="relative grid place-items-center">
          <span
            className="absolute w-10 h-10 rounded-full bg-gold-500/30 animate-ping"
            aria-hidden
          />
          <span
            className="grid place-items-center rounded-full bg-gold-500 text-verde-950 shadow-lg"
            style={{ width: 32, height: 32 }}
            title="Verde Law — Miami, FL"
          >
            <MapPin size={16} />
          </span>
        </span>
      </div>
    </motion.div>
  );
}
