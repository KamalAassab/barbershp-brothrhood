"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShieldAlt, FaFileContract } from "react-icons/fa";

export interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms";
  title: string;
  content: React.ReactNode;
}

export default function PolicyModal({
  isOpen,
  onClose,
  type,
  title,
  content
}: PolicyModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
    return undefined;
  }, [isOpen, onClose]);

  const IconComponent = type === "privacy" ? FaShieldAlt : FaFileContract;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl pointer-events-auto flex flex-col">
              {/* Header */}
              <div className="relative border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent p-4 sm:p-6 md:p-8 flex-shrink-0">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all shadow-lg z-10"
                  aria-label="Close modal"
                >
                  <FaTimes className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </motion.button>

                <div className="flex items-center gap-3 sm:gap-4 pr-12 sm:pr-16">
                  <div className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 flex-shrink-0">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                      {type === "privacy" ? "Last updated: January 2025" : "Effective date: January 2025"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto overflow-x-hidden flex-1 p-4 sm:p-6 md:p-8">
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                  {content}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

