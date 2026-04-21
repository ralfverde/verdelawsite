"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Item = { id: string; question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-black/10">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="py-2">
            <button
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="font-display text-xl md:text-2xl text-[var(--verde-950)]">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[var(--gold-500)] shrink-0"
              >
                <Plus size={24} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-8 text-[var(--text-dark-secondary)] leading-relaxed max-w-3xl">
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
