"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCookie, FaCheck, FaTimes, FaShieldAlt, FaChartLine, FaTachometerAlt } from "react-icons/fa";
import PolicyModal from "@/app/components/PolicyModal";

export interface CookieBannerProps {
  message?: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
}

const COOKIE_CATEGORIES = {
  essential: {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, booking form data, and user preferences. These cookies cannot be disabled.",
    icon: FaShieldAlt,
    required: true
  },
  analytics: {
    name: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and user experience.",
    icon: FaChartLine,
    required: false
  },
  performance: {
    name: "Performance Cookies",
    description: "These cookies help us improve website performance by collecting information about how visitors use our site, such as which pages are visited most often and if users get error messages.",
    icon: FaTachometerAlt,
    required: false
  }
};

export default function CookieBanner({ message = "We use cookies to enhance your experience, analyze site performance, and assist with booking services. You can customize your cookie preferences below." }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    performance: false
  });

  React.useEffect(() => {
    setMounted(true);
    try {
      const consent = window.localStorage.getItem("cookie-consent");
      if (!consent) {
        setVisible(true);
        // Load saved preferences if they exist
        const savedPrefs = window.localStorage.getItem("cookie-preferences");
        if (savedPrefs) {
          try {
            const parsed = JSON.parse(savedPrefs);
            // Remove marketing if it exists (for backward compatibility)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { marketing, ...cleanPrefs } = parsed;
            setPreferences({ ...cleanPrefs, essential: true }); // Always keep essential on
          } catch {
            // Invalid JSON, use defaults
          }
        }
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      window.localStorage.setItem("cookie-consent", "accepted");
      window.localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
      
      // Trigger custom event for other components to listen to
      window.dispatchEvent(new CustomEvent("cookiePreferencesUpdated", { detail: prefs }));
    } catch (error) {
      console.error("Failed to save cookie preferences:", error);
    }
  };

  const handleAccept = () => {
    // Save current user preferences (whatever they have enabled)
    savePreferences(preferences);
    setVisible(false);
  };

  const handleDecline = () => {
    // Decline all optional cookies, keep only essential
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      performance: false
    };
    setPreferences(onlyEssential);
    savePreferences(onlyEssential);
    setVisible(false);
  };

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === "essential") return; // Can't toggle essential
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

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
          If you have any questions about this Privacy Policy, please contact us at barbershop@brotherhood.com.
        </p>
      </div>
    </div>
  );

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex items-end justify-end p-2 sm:p-3 md:p-4 lg:p-5 pointer-events-none">
      {/* Cookie Banner */}
      <motion.div
        initial={{ opacity: 0, y: 100, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 100, x: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm pointer-events-auto"
      >
        <div className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40"></div>
          
          <div className="relative z-10 p-3 sm:p-4 md:p-5">
            {/* Header */}
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20"
              >
                <FaCookie className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">
                  Cookie Preferences
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-200 leading-relaxed line-clamp-2">
                  {message}
                </p>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Close cookie banner"
              >
                <FaTimes className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
            </div>

            {/* Cookie Categories - Each on its own line */}
            <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">
              {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => {
                const isEnabled = preferences[key as keyof CookiePreferences];
                const isRequired = category.required;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center justify-between gap-2 sm:gap-3"
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-white flex-1">
                      {category.name}
                      {isRequired && (
                        <span className="ml-1 text-[9px] sm:text-[10px] text-neutral-400">- Required</span>
                      )}
                    </span>
                    {!isRequired && (
                      <button
                        onClick={() => toggleCategory(key as keyof CookiePreferences)}
                        className={`flex-shrink-0 relative w-9 h-5 sm:w-10 sm:h-6 rounded-full transition-all duration-300 ${
                          isEnabled 
                            ? 'bg-white shadow-md' 
                            : 'bg-white/10 border border-white/20'
                        }`}
                        aria-label={`Toggle ${category.name}`}
                      >
                        <motion.div
                          className={`absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                            isEnabled ? 'bg-neutral-900' : 'bg-neutral-300'
                          }`}
                          animate={{
                            x: isEnabled ? 18 : 0
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </button>
                    )}
                    {isRequired && (
                      <div className="flex-shrink-0 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 border border-white/20">
                        <FaCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2 sm:gap-2.5">
              <motion.button
                onClick={handleAccept}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-neutral-900 text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition-all shadow-md hover:shadow-lg"
              >
                <FaCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Accept</span>
              </motion.button>
              
              <motion.button
                onClick={handleDecline}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <FaTimes className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Decline</span>
              </motion.button>
            </div>

            {/* Footer Link */}
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
              <p className="text-[9px] sm:text-[10px] text-neutral-400 text-center leading-relaxed">
                By continuing, you agree to our use of cookies.{" "}
                <button 
                  className="text-white/80 hover:text-white underline underline-offset-1 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyModal(true);
                  }}
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Privacy Policy Modal */}
      <PolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        type="privacy"
        title="Privacy Policy"
        content={privacyContent}
      />
    </div>
  );
}
