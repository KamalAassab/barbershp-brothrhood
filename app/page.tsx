'use client';

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/app/components/Hero";
import { FaBookOpen, FaStar, FaCut, FaArrowRight, FaCalendar, FaClock, FaUserCheck, FaCreditCard, FaEnvelope, FaQuestionCircle, FaChild, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { GiMustache } from "react-icons/gi";
import { handleScrollClick } from "@/app/utils/scroll";
import type { Service } from "@/app/components/ServiceCategoryModal";
import { REVIEWS } from "@/app/constants/reviews";
import { SERVICE_CATEGORIES } from "@/app/constants/services";
import { FAQS } from "@/app/constants/faqs";

// Lazy load heavy components for better initial page load
const ReviewsCarousel = dynamic(() => import("@/app/components/ReviewsCarousel"), {
  loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-2xl" />,
  ssr: true
});

const MapEmbed = dynamic(() => import("@/app/components/MapEmbed"), {
  loading: () => <div className="h-[280px] animate-pulse bg-white/5 rounded-xl" />,
  ssr: true
});

const GalleryGrid = dynamic(() => import("@/app/components/GalleryGrid"), {
  loading: () => <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="aspect-square animate-pulse bg-white/5 rounded-xl" />
    ))}
  </div>,
  ssr: true
});

const FAQAccordion = dynamic(() => import("@/app/components/FAQAccordion"), {
  loading: () => <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="h-20 animate-pulse bg-white/5 rounded-xl" />
    ))}
  </div>,
  ssr: true
});

const BookingForm = dynamic(() => import("@/app/components/BookingForm"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-2xl" />,
  ssr: true
});

const ServiceCategoryModal = dynamic(() => import("@/app/components/ServiceCategoryModal"), {
  ssr: false
});

// Icon mapping function for service categories
const getCategoryIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    "mdi:scissors-cutting": FaCut,
    "mdi:mustache": GiMustache,
    "mdi:star": FaStar,
    "mdi:face-child": FaChild,
  };
  return iconMap[iconName] || FaCut;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<{
    title: string;
    icon: string;
    blurb: string;
    services: Service[];
  } | null>(null);

  const [galleryImages, setGalleryImages] = React.useState<Array<{ src: string; alt: string }>>([]);

  // Fetch gallery images dynamically from the API
  React.useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (data.images && Array.isArray(data.images)) {
          setGalleryImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to empty array if API fails
        setGalleryImages([]);
      }
    };

    fetchGalleryImages();
  }, []);

  const serviceCategories = SERVICE_CATEGORIES;
  const faqs = FAQS;

  return (
    <div className="flex flex-col relative overflow-x-hidden">
      {/* Sticky Background for all sections */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/barber-background.png"
          alt="Barbershop background"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-950/70"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="scroll-mt-20 relative z-0">
        <Hero
          title="Cuts that hit hard. Fades that stay sharp."
          subtitle="Bold barbershop energy precision fades, razor finishes, no nonsense."
          backgroundSrc="https://images.unsplash.com/photo-1635531748077-54c8d53283f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          backgroundAlt="Barber using clippers in a dark shop"
          primaryCta={{ label: "Book Now", href: "#booking" }}
          secondaryCta={{ label: "WhatsApp", href: "https://wa.me/10000000000" }}
        />
      </section>

      {/* About Section */}
      <section id="about" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 sm:mb-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">About Brotherhood Barbershop</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 leading-relaxed font-light px-4 sm:px-5">
              Where tradition meets excellence, and every cut tells a story of brotherhood.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden active:scale-[0.98] w-full text-center h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 mb-4 sm:mb-5 group-hover:bg-white/20 transition-all duration-500"
                >
                  <FaBookOpen className="h-6 w-6 sm:h-6 sm:w-6 text-white" />
                </motion.div>
                <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Our Story</h3>
                <div className="space-y-3 sm:space-y-3.5 max-w-2xl">
                  <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">
                    Brotherhood Barbershop was founded on the principle that a great haircut is more than just a service—it&apos;s a bond between barber and client, a moment of trust and transformation.
                  </p>
                  <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">
                    We&apos;ve built our reputation through word of mouth, one satisfied client at a time. Our barbers are craftsmen who take pride in their work, treating every cut as a masterpiece and every client as family.
                  </p>
                  <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">
                    At Brotherhood, we believe in the power of community. This isn&apos;t just a barbershop—it&apos;s a place where men come together, share stories, and leave looking and feeling their absolute best.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden active:scale-[0.98] w-full text-center h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 mb-4 sm:mb-5 group-hover:bg-white/20 transition-all duration-500"
                >
                  <FaStar className="h-6 w-6 sm:h-6 sm:w-6 text-white" />
                </motion.div>
                <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Our Values</h3>
                <div className="space-y-3.5 sm:space-y-4 max-w-2xl">
                  <div className="group/item">
                    <h4 className="text-base sm:text-base md:text-base font-bold text-white mb-2 group-hover/item:text-white transition-colors">Brotherhood</h4>
                    <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">We foster a sense of community and belonging. Every client is part of our brotherhood, and we treat them with respect, loyalty, and genuine care.</p>
                  </div>
                  <div className="group/item">
                    <h4 className="text-base sm:text-base md:text-base font-bold text-white mb-2 group-hover/item:text-white transition-colors">Excellence</h4>
                    <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">We never compromise on quality. Every cut, every shave, every service is executed with precision and attention to detail that sets the standard.</p>
                  </div>
                  <div className="group/item">
                    <h4 className="text-base sm:text-base md:text-base font-bold text-white mb-2 group-hover/item:text-white transition-colors">Tradition</h4>
                    <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">We honor the timeless art of barbering while embracing modern techniques. Classic service, contemporary style—the best of both worlds.</p>
                  </div>
                  <div className="group/item">
                    <h4 className="text-base sm:text-base md:text-base font-bold text-white mb-2 group-hover/item:text-white transition-colors">Integrity</h4>
                    <p className="text-sm sm:text-sm md:text-sm text-neutral-200 leading-relaxed">Honest service, fair pricing, and genuine relationships. We build trust through consistency and transparency in everything we do.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3 }}
            className="mb-8 sm:mb-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">Services</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-300 leading-relaxed px-4 sm:px-5">
              Professional grooming services tailored to your style
            </p>
          </motion.header>

          <div className="grid gap-5 sm:gap-6 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {serviceCategories.map((c, i) => {
              const CategoryIcon = getCategoryIcon(c.icon);
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedCategory(c)}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm hover:border-white/30 active:scale-[0.98] transition-all duration-500 overflow-hidden text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 min-h-[200px] sm:min-h-[220px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full items-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center justify-center p-4 sm:p-4 rounded-2xl bg-white/10 border border-white/20 mb-4 sm:mb-5 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-500"
                    >
                      <CategoryIcon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-3.5 group-hover:text-white transition-colors">{c.title}</h3>
                    <div className="mt-auto flex items-center justify-center gap-2 text-sm sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                      <span>View Services</span>
                      <FaArrowRight className="h-4 w-4 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Service Category Modal */}
          {selectedCategory && (
            <ServiceCategoryModal
              isOpen={!!selectedCategory}
              onClose={() => setSelectedCategory(null)}
              category={{
                title: selectedCategory.title,
                icon: selectedCategory.icon,
                description: selectedCategory.blurb
              }}
              services={selectedCategory.services}
            />
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 sm:mb-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">Gallery</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 leading-relaxed font-light px-4 sm:px-5">
              A look at our work and shop vibes
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <GalleryGrid images={galleryImages} defaultInstagramUrl="https://instagram.com" />
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-10 sm:py-12 md:py-12 lg:py-16 z-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 sm:mb-10 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">What Clients Say</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-5">
              Real feedback from our satisfied customers
            </p>
          </motion.header>

          <div className="w-full px-0 sm:px-0">
            <ReviewsCarousel reviews={REVIEWS} />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 sm:mb-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">Book an Appointment</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 leading-relaxed mb-5 sm:mb-6 font-light px-4 sm:px-5">
              Fill out the form below and we&apos;ll get back to you shortly to confirm your appointment.
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm shadow-2xl mb-8 sm:mb-10"
          >
            <BookingForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: FaClock, title: "Flexible Scheduling", desc: "Reschedule or cancel anytime" },
              { icon: FaUserCheck, title: "Walk-ins Welcome", desc: "Available when time permits" },
              { icon: FaCreditCard, title: "Easy Payment", desc: "Cash and cards accepted" }
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 sm:p-6 md:p-8 backdrop-blur-sm text-center hover:border-white/30 transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 mb-4 sm:mb-5 md:mb-6 group-hover:bg-white/20 transition-all duration-500"
                  >
                    <ItemIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 sm:mb-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">Contact Us</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 leading-relaxed font-light px-4 sm:px-5">
              Get in touch with us. We typically reply quickly.
            </p>
          </motion.header>

          <div className="grid gap-6 sm:gap-7 md:gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm"
            >
              <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white/10 border border-white/20 mb-5 sm:mb-6">
                <FaMapMarkerAlt className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Visit Us</h3>
              <p className="text-sm sm:text-base md:text-base text-neutral-300 mb-5 sm:mb-6 leading-relaxed">
                123 Placeholder St, Your City, ST 00000
              </p>
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <MapEmbed height={280} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 md:p-8 backdrop-blur-sm"
            >
              <div className="inline-flex items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 mb-5 sm:mb-6">
                <FaPhone className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 active:scale-[0.98] transition-transform">
                  <FaPhone className="h-5 w-5 sm:h-5 sm:w-5 text-white mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-xs text-neutral-400 mb-1.5 uppercase tracking-wider">Phone</p>
                    <a href="tel:+18953456578" className="text-sm sm:text-base font-semibold text-white hover:text-neutral-200 active:scale-95 transition-all inline-block">
                      +1 (895) 345-6578
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 active:scale-[0.98] transition-transform">
                  <FaEnvelope className="h-5 w-5 sm:h-5 sm:w-5 text-white mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-xs text-neutral-400 mb-1.5 uppercase tracking-wider">Email</p>
                    <a href="mailto:barbershop@brotherhood.com" className="text-sm sm:text-base font-semibold text-white hover:text-neutral-200 active:scale-95 transition-all inline-block break-all">
                      barbershop@brotherhood.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
                  <FaClock className="h-5 w-5 sm:h-5 sm:w-5 text-white mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-xs text-neutral-400 mb-1.5 uppercase tracking-wider">Hours</p>
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="text-sm sm:text-sm text-white">Mon–Fri: 9:00am – 6:00pm</p>
                      <p className="text-sm sm:text-sm text-white">Sat: 10:00am – 4:00pm</p>
                      <p className="text-sm sm:text-sm text-white">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-10 sm:py-12 md:py-12 lg:py-16 scroll-mt-20 z-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-12 md:mb-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight px-4 sm:px-5">FAQ</h2>
            <p className="text-sm sm:text-base md:text-base text-neutral-200 leading-relaxed max-w-2xl mx-auto font-light px-4 sm:px-5">
              Find answers to common questions about our services
            </p>
          </motion.header>

          <div className="grid gap-6 sm:gap-7 md:gap-6 lg:grid-cols-2">
            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-1"
            >
              <FAQAccordion items={faqs} />
            </motion.div>

            {/* Still Have Questions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-1"
            >
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-center">
                <div className="text-center mb-7 sm:mb-8">
                  <div className="inline-flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 mb-5 sm:mb-6">
                    <FaQuestionCircle className="h-9 w-9 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Still Have Questions?</h3>
                  <p className="text-sm sm:text-sm md:text-base text-neutral-200 leading-relaxed font-light max-w-md mx-auto">
                    Can&apos;t find what you&apos;re looking for? Get in touch and we&apos;ll be happy to help.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-4">
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollClick(e, "#contact")}
                    className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 sm:px-8 py-3.5 sm:py-3.5 text-neutral-900 text-sm sm:text-sm font-semibold hover:bg-neutral-50 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-white/30 overflow-hidden min-h-[48px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                    <FaEnvelope className="h-5 w-5 sm:h-5 sm:w-5 relative z-10" />
                    <span className="relative z-10">Contact Us</span>
                    <FaArrowRight className="h-5 w-5 sm:h-5 sm:w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#booking"
                    onClick={(e) => handleScrollClick(e, "#booking")}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-white/40 bg-white/5 backdrop-blur-md px-7 sm:px-8 py-3.5 sm:py-3.5 text-sm sm:text-sm font-semibold text-white hover:bg-white/15 hover:border-white/60 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px]"
                  >
                    <FaCalendar className="h-5 w-5 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>Book Appointment</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
