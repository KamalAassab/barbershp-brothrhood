"use client";

import React, { useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((v) => (v === index ? null : index));
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {items.map((it, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden shadow-lg hover:border-white/20 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
        >
          <button
            className="flex w-full items-center justify-between px-5 sm:px-6 md:px-8 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 group min-h-[64px] sm:min-h-[72px]"
            aria-expanded={openIndex === i}
            onClick={() => handleToggle(i)}
          >
            <span className="text-base sm:text-base md:text-base font-semibold text-white pr-4 group-hover:text-white transition-colors flex-1 text-left leading-relaxed">{it.question}</span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 active:scale-90 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {openIndex === i ? (
                <FaMinus className="h-5 w-5 sm:h-5 sm:w-5 text-white" />
              ) : (
                <FaPlus className="h-5 w-5 sm:h-5 sm:w-5 text-white" />
              )}
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 overflow-hidden border-t border-white/10"
              >
                <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed font-light pt-4 sm:pt-5">{it.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default memo(FAQAccordion);
