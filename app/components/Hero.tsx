"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCut, FaCalendar, FaArrowRight, FaClock, FaUsers, FaStar, FaChevronDown } from "react-icons/fa";
import { handleScrollClick } from "@/app/utils/scroll";

export interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  backgroundSrc?: string;
  backgroundAlt?: string;
}

export default function Hero({
  title,
  subtitle = "Modern barbershop with classic service.",
  primaryCta = { label: "Book Now", href: "#booking" },
  secondaryCta: _secondaryCta,
  imageSrc: _imageSrc,
  imageAlt: _imageAlt,
  backgroundSrc,
  backgroundAlt = "Barbershop background"
}: HeroProps) {
  // Suppress unused variable warnings - these props are part of the interface but not used in this implementation
  void _secondaryCta;
  void _imageSrc;
  void _imageAlt;
  const hasBg = Boolean(backgroundSrc);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-24 pb-16 sm:pb-20 md:pb-20 lg:pb-24" suppressHydrationWarning>
      {/* Background image (full-bleed) */}
      {hasBg && backgroundSrc && (
        <div className="absolute inset-0 -z-10" suppressHydrationWarning>
          {backgroundSrc.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={backgroundSrc}
              alt={backgroundAlt}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <Image
              src={backgroundSrc}
              alt={backgroundAlt}
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-neutral-950/70 to-neutral-950/80" suppressHydrationWarning>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/8 via-white/4 to-transparent opacity-50" suppressHydrationWarning></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/6 via-transparent to-transparent opacity-40" suppressHydrationWarning></div>
          </div>
        </div>
      )}

      {/* Professional gradient overlay when no bg provided */}
      {!hasBg && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" suppressHydrationWarning>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-white/5 to-transparent opacity-70" suppressHydrationWarning></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/7 via-transparent to-transparent opacity-60" suppressHydrationWarning></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_0%,_white/4_50%,_transparent_100%)] opacity-50" suppressHydrationWarning></div>
        </div>
      )}

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex flex-col items-center justify-center text-center" suppressHydrationWarning>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 md:px-4 py-1.5 sm:py-2 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg mb-6 sm:mb-7 md:mb-8 lg:mb-8 xl:mb-10"
          >
            <FaCut className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-white" />
            <span className="text-[10px] sm:text-xs md:text-xs font-semibold text-white/95 uppercase tracking-wider">Premium Barbershop</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-normal tracking-tight text-white leading-[1.1] sm:leading-[1.15] md:leading-tight max-w-5xl mx-auto px-4 sm:px-5 mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-lg text-neutral-200/90 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-5 mb-8 sm:mb-9 md:mb-8 lg:mb-9 xl:mb-10"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-5" suppressHydrationWarning
          >
            <a
              href={primaryCta.href}
              onClick={(e) => handleScrollClick(e, primaryCta.href)}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl bg-white px-7 sm:px-8 md:px-7 lg:px-8 py-3.5 sm:py-3.5 md:py-3 text-neutral-900 text-sm sm:text-base md:text-base font-semibold hover:bg-neutral-50 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-white/30 min-w-[160px] sm:min-w-[180px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
              <FaCalendar className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 relative z-10" />
              <span className="relative z-10 whitespace-nowrap">{primaryCta.label}</span>
              <FaArrowRight className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats - Positioned at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-14 xl:bottom-16 left-0 right-0 z-10" suppressHydrationWarning
      >
        <div className="flex flex-row flex-nowrap justify-center items-center gap-2 sm:gap-8 md:gap-12 lg:gap-16 w-full max-w-5xl mx-auto px-1 sm:px-4" suppressHydrationWarning>
          {[
            { value: "10+", label: "Years Experience", icon: FaClock },
            { value: "5K+", label: "Happy Clients", icon: FaUsers },
            { value: "4.9+", label: "Average Rating", icon: FaStar }
          ].map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-center group flex flex-col items-center" suppressHydrationWarning
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1" suppressHydrationWarning>
                  <IconComponent className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white/70 group-hover:text-white transition-colors" />
                  <div className="text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300" suppressHydrationWarning>{stat.value}</div>
                </div>
                <div className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm text-neutral-300/90 font-medium whitespace-nowrap" suppressHydrationWarning>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20" suppressHydrationWarning
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          suppressHydrationWarning
        >
          <FaChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
