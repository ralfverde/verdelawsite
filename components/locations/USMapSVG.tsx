"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import topology from "us-atlas/states-10m.json";

type StateProperties = { name: string };

const TOP_STATES = new Set([
  "Florida",
  "Texas",
  "California",
  "New York",
  "Illinois",
  "Georgia",
  "Arizona",
  "Nevada",
]);

const MIAMI_COORDS: [number, number] = [-80.1918, 25.7617];

const WIDTH = 975;
const HEIGHT = 610;

export function USMapSVG() {
  const [hovered, setHovered] = useState<string | null>(null);

  const { paths, miamiXY } = useMemo(() => {
    const states = feature(
      topology as unknown as Topology,
      (topology as unknown as Topology).objects.states,
    ) as unknown as FeatureCollection<Geometry, StateProperties>;

    const projection = geoAlbersUsa()
      .scale(1300)
      .translate([WIDTH / 2, HEIGHT / 2]);
    const path = geoPath(projection);

    const paths = states.features.map((f) => ({
      id: (f.id ?? f.properties.name) as string,
      name: f.properties.name,
      d: path(f as Feature<Geometry, StateProperties>) ?? "",
    }));

    const projected = projection(MIAMI_COORDS);
    const miamiXY: [number, number] | null = projected
      ? [projected[0], projected[1]]
      : null;

    return { paths, miamiXY };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl overflow-hidden bg-verde-900 border border-gold-500/20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-800),var(--verde-950)_70%)]"
      />

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="relative w-full h-auto"
        role="img"
        aria-label="United States coverage map"
      >
        {paths.map((p) => {
          const isTop = TOP_STATES.has(p.name);
          const isHovered = hovered === p.name;
          const fill = isHovered
            ? isTop
              ? "rgba(200,169,81,0.55)"
              : "rgba(61,139,110,0.45)"
            : isTop
              ? "rgba(200,169,81,0.28)"
              : "rgba(61,139,110,0.18)";
          return (
            <path
              key={p.id}
              d={p.d}
              fill={fill}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.6}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ transition: "fill 0.3s ease", cursor: "pointer" }}
            >
              <title>{p.name}</title>
            </path>
          );
        })}

        {miamiXY && (
          <g transform={`translate(${miamiXY[0]}, ${miamiXY[1]})`}>
            <circle r={6} fill="#C8A951" stroke="#fff" strokeWidth={2} />
            <circle r={12} fill="none" stroke="#C8A951" strokeWidth={1} opacity={0.4}>
              <animate
                attributeName="r"
                from="8"
                to="22"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.45"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </svg>

      {hovered && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-verde-950/90 backdrop-blur-sm border border-white/10 text-sm font-heading font-medium text-white/80 pointer-events-none">
          {hovered}
        </div>
      )}
    </motion.div>
  );
}
