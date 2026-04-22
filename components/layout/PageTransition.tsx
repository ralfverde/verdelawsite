"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode };

/**
 * Route-aware page transition. On the FIRST render we skip the initial
 * opacity:0 so server-rendered content is visible the moment the HTML
 * arrives — if JS ever fails to hydrate the page is still readable.
 * On subsequent client-side route changes the previous page fades out
 * and the next one slides up into place.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        initial={firstRender.current ? false : { opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
