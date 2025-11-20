"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendar, FaArrowRight, FaCut, FaUser, FaPalette, FaHeart, FaChild, FaPen, FaStar, FaBookOpen } from "react-icons/fa";
import { GiScissors, GiRazor, GiMustache, GiTie } from "react-icons/gi";
import { handleScrollClick } from "@/app/utils/scroll";

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    "mdi:scissors-cutting": FaCut,
    "mdi:mustache": GiMustache,
    "mdi:star": FaStar,
    "mdi:face-child": FaChild,
    "mdi:content-cut": GiScissors,
    "mdi:razor-double-edge": GiRazor,
    "mdi:draw-pen": FaPen,
    "mdi:palette": FaPalette,
    "mdi:tie": GiTie,
    "mdi:heart": FaHeart,
    "mdi:book-open-variant": FaBookOpen,
    "mdi:account": FaUser,
  };
  return iconMap[iconName] || FaCut;
};

export interface Service {
  title: string;
  price: string;
  description: string;
  icon?: string;
  duration?: string;
}

export interface ServiceCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    title: string;
    icon: string;
    description: string;
  };
  services: Service[];
}

export default function ServiceCategoryModal({
  isOpen,
  onClose,
  category,
  services
}: ServiceCategoryModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  // Render modal content
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Higher z-index to ensure it's above all content including gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
            onClick={onClose}
            style={{ isolation: 'isolate' }}
          />

          {/* Modal - Highest z-index to ensure it's above backdrop and all content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
            style={{ isolation: 'isolate' }}
          >
            <div className="relative w-full max-w-6xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="relative border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent p-3 sm:p-4 flex-shrink-0">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 active:scale-95 transition-all shadow-lg z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <FaTimes className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </motion.button>

                <div className="flex items-center gap-3 sm:gap-4 mb-3 pr-10 sm:pr-12">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 border border-white/20 flex-shrink-0">
                    {(() => {
                      const CategoryIcon = getIconComponent(category.icon);
                      return <CategoryIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />;
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{category.title}</h2>
                    {category.description && (
                      <p className="text-sm sm:text-base text-neutral-300 mt-1">{category.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-3 sm:p-4">
                <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {services.map((service, index) => {
                    const ServiceIcon = service.icon ? getIconComponent(service.icon) : null;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-3 sm:p-4 backdrop-blur-sm hover:border-white/20 active:scale-[0.98] transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {ServiceIcon && (
                              <div className="p-1.5 rounded-lg bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors flex-shrink-0">
                                <ServiceIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base font-bold text-white">{service.title}</h3>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-xs sm:text-sm font-semibold text-white">{service.price}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{service.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 bg-gradient-to-r from-transparent to-white/5 p-3 sm:p-4 flex-shrink-0">
                <a
                  href="#booking"
                  onClick={(e) => {
                    handleScrollClick(e, "#booking");
                    onClose();
                  }}
                  className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 sm:px-8 py-4 sm:py-4 text-neutral-900 text-sm sm:text-base font-semibold hover:bg-neutral-50 active:scale-95 transition-all shadow-lg hover:shadow-xl min-h-[52px]"
                >
                  <FaCalendar className="h-5 w-5" />
                  <span>Book {category.title} Service</span>
                  <FaArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level to avoid stacking context issues
  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}

