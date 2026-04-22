"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Item = { id: string; question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="border-b border-verde-950/[0.06] last:border-0 py-5"
          >
            <button
              className="flex w-full items-center justify-between gap-4 text-left text-base font-medium text-verde-950 hover:text-verde-800 transition-colors"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.question}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-gold-500 shrink-0"
              >
                <Plus size={20} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 pr-8 text-sm text-verde-950/60 leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
