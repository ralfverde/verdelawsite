"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type Props = { children: ReactNode };

/**
 * Route-aware page transition. Wraps each rendered page so that on
 * pathname change the previous page fades out and the next one fades
 * + slides up into place. Also restores scroll to top on navigation
 * — Next.js App Router sometimes preserves scroll across client
 * transitions, which is the wrong default for marketing pages.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
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
