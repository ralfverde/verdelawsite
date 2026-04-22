"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode };

/**
 * Route-aware page transition.
 *
 * Critical design rules (each one is here because an earlier version
 * shipped a visible bug):
 *   - `initial={false}` on the very first render so the SSR'd HTML is
 *     visible at opacity:1 without waiting for JS to hydrate. (A
 *     prior commit shipped a hydration gap that hid the whole page.)
 *   - `mode="wait"` so the exiting page fully unmounts before the
 *     new one enters. Without this AnimatePresence keeps both nodes
 *     in the DOM, stacked; the exiting height pushed the new page
 *     below the fold and looked like a blank gap at the top.
 *   - Opacity-only animation (no y transform). Any transform on the
 *     wrapper creates measurable layout gaps during the transition.
 *   - 180ms duration — short enough that users don't perceive the
 *     gap, long enough that the crossfade still feels intentional.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  const isFirst = firstRender.current;
  if (firstRender.current) firstRender.current = false;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={isFirst ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
