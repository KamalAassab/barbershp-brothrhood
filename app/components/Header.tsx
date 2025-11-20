"use client";

import React, { useCallback, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendar, FaBars, FaTimes } from "react-icons/fa";
import { handleScrollClick } from "@/app/utils/scroll";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  brandName: string;
  logoSrc?: string;
  navLinks?: NavLink[];
}

const defaultNavLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#reviews" },
  { label: "Contact", href: "#contact" }
];

function Header({ brandName, logoSrc = "/brotherhood-white.png", navLinks = defaultNavLinks }: HeaderProps) {
  const [open, setOpen] = React.useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleScrollClick(e, href);
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-4" suppressHydrationWarning>
        <nav 
          aria-label="Primary" 
          className="flex items-center justify-center md:justify-center lg:justify-between bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-3 shadow-2xl relative"
          suppressHydrationWarning
        >
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent m-0 p-0 flex-shrink-0 active:scale-95 transition-transform relative"
            style={{ lineHeight: 0, width: 'auto', height: 'auto' }} 
            aria-label="Home"
            suppressHydrationWarning
          >
            <Image 
              src={logoSrc} 
              alt={`${brandName} logo`} 
              width={196}
              height={170}
              priority
              quality={90}
              className="h-11 w-49 sm:h-14 sm:w-49 md:h-16 md:w-49 lg:h-20 lg:w-59 xl:h-24 xl:w-59 object-contain object-center" 
              style={{ display: 'block', lineHeight: 0, verticalAlign: 'top', maxHeight: '100%', width: 'auto', height: 'auto' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8" suppressHydrationWarning>
            {navLinks.map((l) => (
              <a 
                key={l.href} 
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-xs xl:text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative group px-1"
              >
                {l.label}
                <span className="absolute -bottom-1 left-1 right-1 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
            <a 
              href="#booking"
              onClick={(e) => handleNavClick(e, "#booking")}
              className="ml-2 xl:ml-4 inline-flex items-center gap-1.5 xl:gap-2 bg-white text-neutral-900 px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg text-xs xl:text-sm font-semibold hover:bg-neutral-100 transition-colors duration-200 whitespace-nowrap"
            >
              <FaCalendar className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            aria-label="Open menu" 
            aria-controls="mobile-menu" 
            aria-expanded={open} 
            onClick={() => setOpen((v) => !v)} 
            className="lg:hidden absolute right-4 sm:right-5 md:right-6 inline-flex items-center justify-center p-2.5 sm:p-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg hover:bg-white/10 active:scale-95 transition-all min-w-[44px] min-h-[44px]"
          >
            {open ? <FaTimes className="h-6 w-6 sm:h-7 sm:w-7" /> : <FaBars className="h-6 w-6 sm:h-7 sm:w-7" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 sm:mt-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                {navLinks.map((l) => (
                  <a 
                    key={l.href} 
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="px-4 sm:px-5 py-3.5 sm:py-4 text-base sm:text-base font-medium text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-white/10 active:bg-white/15 active:scale-[0.98] transition-all min-h-[48px] flex items-center" 
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-2 sm:mt-3 pt-3 sm:pt-4 border-t border-white/10">
                  <a 
                    href="#booking"
                    onClick={(e) => handleNavClick(e, "#booking")}
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-neutral-900 px-5 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold w-full hover:bg-neutral-50 active:scale-95 transition-all shadow-lg min-h-[48px]"
                  >
                    <FaCalendar className="h-4 w-4 sm:h-4" />
                    <span>Book Now</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default memo(Header);
