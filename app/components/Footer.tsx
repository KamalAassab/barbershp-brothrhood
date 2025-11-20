"use client";

import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { handleScrollClick } from "@/app/utils/scroll";
import PolicyModal from "@/app/components/PolicyModal";

import type { IconType } from "react-icons";

export interface FooterProps {
  address?: string;
  phone?: string;
  email?: string;
  social?: { name: string; href: string; icon: IconType }[];
}

const CURRENT_YEAR = new Date().getUTCFullYear();

export default function Footer({ 
  address, 
  phone, 
  email, 
  social = [
    { name: "Instagram", href: "#", icon: FaInstagram },
    { name: "Facebook", href: "#", icon: FaFacebook },
    { name: "YouTube", href: "#", icon: FaYoutube }
  ] 
}: FooterProps) {
  const [openModal, setOpenModal] = React.useState<"privacy" | "terms" | null>(null);

  const privacyContent = (
    <div className="space-y-4 sm:space-y-6 text-neutral-200">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">1. Information We Collect</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We collect information that you provide directly to us, including your name, email address, phone number, and appointment preferences when you book a service through our website.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">2. How We Use Your Information</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We use the information we collect to process your bookings, communicate with you about your appointments, send you service updates, and improve our services.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">3. Information Sharing</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We do not sell, trade, or rent your personal information to third parties. We may share your information only with service providers who assist us in operating our business, subject to confidentiality agreements.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">4. Data Security</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">5. Your Rights</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          You have the right to access, update, or delete your personal information at any time. Please contact us if you wish to exercise these rights.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">6. Contact Us</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at {email || "barbershop@brotherhood.com"}.
        </p>
      </div>
    </div>
  );

  const termsContent = (
    <div className="space-y-4 sm:space-y-6 text-neutral-200">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">1. Acceptance of Terms</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          By accessing and using our website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">2. Services</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We provide barbershop services including haircuts, beard trims, and styling. All services are subject to availability and our standard pricing. We reserve the right to refuse service to anyone.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">3. Appointments and Cancellations</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Appointments can be booked through our website or by phone. We require at least 24 hours notice for cancellations. Late cancellations or no-shows may result in a fee.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">4. Payment</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Payment is due at the time of service. We accept cash and major credit cards. All prices are subject to change without notice.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">5. Limitation of Liability</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">6. Changes to Terms</h3>
        <p className="text-sm sm:text-base leading-relaxed">
          We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );

  return (
    <footer className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-32 border-t border-white/10 bg-gradient-to-b from-neutral-950 to-neutral-900" suppressHydrationWarning>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" suppressHydrationWarning></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20" suppressHydrationWarning>
        <div className="grid gap-10 sm:gap-12 md:gap-12 md:grid-cols-2 lg:grid-cols-6" suppressHydrationWarning>
          {/* Brand Section */}
          <div suppressHydrationWarning>
            <a 
              href="#home"
              onClick={(e) => handleScrollClick(e, "#home")}
              className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg mb-5 sm:mb-6 md:mb-6 transition-transform hover:scale-105 active:scale-95"
              aria-label="Home"
              suppressHydrationWarning
            >
              <img 
                src="/favicon.png" 
                alt="Barbershop logo" 
                className="h-24 w-49 sm:h-26 sm:w-49 md:h-30 md:w-49 lg:h-30 lg:w-49 object-contain" 
                loading="lazy" 
              />
            </a>
            <div className="flex items-center gap-3 sm:gap-4" suppressHydrationWarning>
              {social.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a 
                    key={s.name} 
                    aria-label={s.name} 
                    href={s.href} 
                    className="p-3 sm:p-3 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-90 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <IconComponent className="h-5 w-5 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div suppressHydrationWarning>
            <h3 className="text-sm sm:text-sm font-semibold text-white uppercase tracking-wider mb-5 sm:mb-6 md:mb-6">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href="#about" onClick={(e) => handleScrollClick(e, "#about")} className="text-sm sm:text-sm text-neutral-400 hover:text-white active:scale-95 transition-all inline-block py-1">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollClick(e, "#services")} className="text-sm sm:text-sm text-neutral-400 hover:text-white active:scale-95 transition-all inline-block py-1">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleScrollClick(e, "#gallery")} className="text-sm sm:text-sm text-neutral-400 hover:text-white active:scale-95 transition-all inline-block py-1">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => handleScrollClick(e, "#booking")} className="text-sm sm:text-sm text-neutral-400 hover:text-white active:scale-95 transition-all inline-block py-1">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2" suppressHydrationWarning>
            <h3 className="text-sm sm:text-sm font-semibold text-white uppercase tracking-wider mb-5 sm:mb-6 md:mb-6">Contact</h3>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start gap-3 sm:gap-3.5">
                <FaMapMarkerAlt className="h-5 w-5 sm:h-5 sm:w-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-sm text-neutral-300 leading-relaxed">
                  {address || "123 Placeholder St, Your City, ST 00000"}
                </span>
              </li>
              <li>
                <a 
                  href={`tel:${phone || "+18953456578"}`} 
                  className="inline-flex items-center gap-3 sm:gap-3.5 text-sm sm:text-sm text-neutral-300 hover:text-white active:scale-95 transition-all group py-1"
                >
                  <FaPhone className="h-5 w-5 sm:h-5 sm:w-5 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" />
                  <span>{phone || "+1 (895) 345-6578"}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${email || "barbershop@brotherhood.com"}`} 
                  className="inline-flex items-center gap-3 sm:gap-3.5 text-sm sm:text-sm text-neutral-300 hover:text-white active:scale-95 transition-all group py-1"
                >
                  <FaEnvelope className="h-5 w-5 sm:h-5 sm:w-5 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" />
                  <span className="break-all">{email || "barbershop@brotherhood.com"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2 lg:col-start-5" suppressHydrationWarning>
            <h3 className="text-sm sm:text-sm font-semibold text-white uppercase tracking-wider mb-5 sm:mb-6 md:mb-6">Hours</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-sm">
              <li className="flex justify-between items-center gap-3">
                <span className="text-neutral-400">Monday - Friday</span>
                <span className="text-white font-medium whitespace-nowrap ml-2">9:00am - 6:00pm</span>
              </li>
              <li className="flex justify-between items-center gap-3">
                <span className="text-neutral-400">Saturday</span>
                <span className="text-white font-medium whitespace-nowrap ml-2">10:00am - 4:00pm</span>
              </li>
              <li className="flex justify-between items-center gap-3">
                <span className="text-neutral-400">Sunday</span>
                <span className="text-white font-medium whitespace-nowrap ml-2">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar - At Bottom After Footer Content */}
      <div className="relative border-t border-white/10 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 backdrop-blur-sm" suppressHydrationWarning>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-3 gap-3 sm:gap-0" suppressHydrationWarning>
          <p className="text-xs sm:text-xs text-neutral-400 font-medium text-center sm:text-left" suppressHydrationWarning>&copy; {CURRENT_YEAR} BROTHRHOOD. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-4" suppressHydrationWarning>
            <button 
              onClick={() => setOpenModal("privacy")}
              className="text-xs sm:text-xs text-neutral-400 hover:text-white active:scale-95 transition-all cursor-pointer font-medium py-1 min-h-[32px]"
            >
              Privacy
            </button>
            <span className="text-neutral-600 text-xs">|</span>
            <button 
              onClick={() => setOpenModal("terms")}
              className="text-xs sm:text-xs text-neutral-400 hover:text-white active:scale-95 transition-all cursor-pointer font-medium py-1 min-h-[32px]"
            >
              Terms
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      <PolicyModal
        isOpen={openModal === "privacy"}
        onClose={() => setOpenModal(null)}
        type="privacy"
        title="Privacy Policy"
        content={privacyContent}
      />

      {/* Terms Modal */}
      <PolicyModal
        isOpen={openModal === "terms"}
        onClose={() => setOpenModal(null)}
        type="terms"
        title="Terms & Conditions"
        content={termsContent}
      />
    </footer>
  );
}
