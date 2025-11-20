"use client";

import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaCut, FaPaperPlane } from "react-icons/fa";

export interface BookingFormProps {
  whatsappNumber?: string;
}

export default function BookingForm({ whatsappNumber = "+18953456578" }: BookingFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    service: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Calculate min and max dates (today to 7 days from today)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  
  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Generate time slots based on selected date
  const timeSlots = useMemo(() => {
    if (!formData.preferredDate) {
      return [];
    }
    
    const selectedDate = new Date(formData.preferredDate);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    if (dayOfWeek === 0) {
      // Sunday - Closed
      return [];
    }
    
    const slots: { value: string; label: string }[] = [];
    
    // Helper function to format hour to 12-hour format
    const formatHour = (hour: number): string => {
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:00 AM`;
      return `${hour - 12}:00 PM`;
    };

    if (dayOfWeek === 6) {
      // Saturday - 10:00 AM to 4:00 PM
      for (let hour = 10; hour < 16; hour++) {
        const startHour = hour;
        const endHour = hour + 1;
        slots.push({
          value: `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`,
          label: `${formatHour(startHour)} -> ${formatHour(endHour)}`
        });
      }
    } else {
      // Monday-Friday - 9:00 AM to 6:00 PM
      for (let hour = 9; hour < 18; hour++) {
        const startHour = hour;
        const endHour = hour + 1;
        slots.push({
          value: `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`,
          label: `${formatHour(startHour)} -> ${formatHour(endHour)}`
        });
      }
    }
    
    return slots;
  }, [formData.preferredDate]);

  // Check if selected date is Sunday
  const isSunday = formData.preferredDate ? new Date(formData.preferredDate).getDay() === 0 : false;

  const serviceOptions = [
    "Haircut",
    "Beard Trim",
    "Haircut & Beard",
    "Skin Fade",
    "Speciality Design",
    "Kids Cut",
    "Other"
  ];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const formattedDate = formData.preferredDate 
      ? new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'Not specified';
    
    // Format time slot for WhatsApp message
    const formatHourForMessage = (hourStr: string): string => {
      const [hours, minutes] = hourStr.split(':');
      const hour = parseInt(hours);
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:${minutes} AM`;
      return `${hour - 12}:${minutes} PM`;
    };

    const formattedTime = formData.preferredTime 
      ? formData.preferredTime.split('-').map(formatHourForMessage).join(' - ')
      : 'Not specified';

    const message = `*New Booking Request*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A` +
      `*Preferred Date:* ${encodeURIComponent(formattedDate)}%0A` +
      `*Preferred Time:* ${encodeURIComponent(formattedTime)}%0A` +
      `*Service:* ${encodeURIComponent(formData.service || 'Not specified')}%0A` +
      `*Additional Notes:* ${encodeURIComponent(formData.notes || 'None')}`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        preferredDate: "",
        preferredTime: "",
        service: "",
        notes: ""
      });
      setIsSubmitting(false);
    }, 1000);
  }, [formData, whatsappNumber]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-6">
      {/* Full Name and Phone Number Row */}
      <div className="grid gap-5 sm:grid-cols-2" suppressHydrationWarning>
        <div suppressHydrationWarning>
          <label htmlFor="name" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaUser className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Full Name *</span>
            </div>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all min-h-[48px]"
            placeholder="Enter your full name"
          />
        </div>
        <div suppressHydrationWarning>
          <label htmlFor="phone" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaPhone className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Phone Number *</span>
            </div>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all min-h-[48px]"
            placeholder="+1 (000) 000-0000"
          />
        </div>
      </div>

      {/* Email Address and Preferred Date Row */}
      <div className="grid gap-5 sm:grid-cols-2" suppressHydrationWarning>
        <div suppressHydrationWarning>
          <label htmlFor="email" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaEnvelope className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Email Address *</span>
            </div>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all min-h-[48px]"
            placeholder="your@email.com"
          />
        </div>
        <div suppressHydrationWarning>
          <label htmlFor="preferredDate" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaCalendar className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Preferred Date</span>
            </div>
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={(e) => {
              const selectedDate = e.target.value;
              if (!selectedDate) {
                handleChange(e);
                setFormData(prev => ({ ...prev, preferredTime: "" }));
                return;
              }
              
              const dateObj = new Date(selectedDate);
              const dayOfWeek = dateObj.getDay();
              
              // Prevent Sunday selection
              if (dayOfWeek === 0) {
                setFormData(prev => ({ ...prev, preferredDate: "", preferredTime: "" }));
                return;
              }
              
              handleChange(e);
              setFormData(prev => ({ ...prev, preferredTime: "" }));
            }}
            onBlur={(e) => {
              if (e.target.value) {
                const dateObj = new Date(e.target.value);
                if (dateObj.getDay() === 0) {
                  setFormData(prev => ({ ...prev, preferredDate: "", preferredTime: "" }));
                }
              }
            }}
            min={minDateStr}
            max={maxDateStr}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all min-h-[48px]"
          />
          {isSunday && (
            <p className="text-xs sm:text-sm text-yellow-400 mt-2">⚠️ We are closed on Sundays. Please select another date.</p>
          )}
          {formData.preferredDate && !isSunday && (
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              {new Date(formData.preferredDate).getDay() === 6 
                ? "Available: 10:00 AM - 4:00 PM"
                : "Available: 9:00 AM - 6:00 PM"}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Time and Service Type Row */}
      <div className="grid gap-5 sm:grid-cols-2" suppressHydrationWarning>
        <div suppressHydrationWarning>
          <label htmlFor="preferredTime" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaClock className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Preferred Time</span>
            </div>
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            disabled={!formData.preferredDate || isSunday}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
          >
            <option value="" className="bg-neutral-900">
              {!formData.preferredDate 
                ? "Select a date first" 
                : isSunday 
                ? "Closed on Sundays" 
                : "Select a time slot"}
            </option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value} className="bg-neutral-900">
                {slot.label}
              </option>
            ))}
          </select>
          {formData.preferredDate && !isSunday && timeSlots.length === 0 && (
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">Please select a valid date</p>
          )}
        </div>
        <div suppressHydrationWarning>
          <label htmlFor="service" className="block text-sm sm:text-sm font-medium text-white mb-3">
            <div className="flex items-center gap-2.5" suppressHydrationWarning>
              <FaCut className="h-4 w-4 sm:h-4 sm:w-4" />
              <span>Service Type</span>
            </div>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all min-h-[48px]"
          >
            <option value="" className="bg-neutral-900">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service} className="bg-neutral-900">
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Notes or Special Requests */}
      <div suppressHydrationWarning>
        <label htmlFor="notes" className="block text-sm sm:text-sm font-medium text-white mb-3">
          <span>Additional Notes or Special Requests</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          value={formData.notes}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm px-5 py-3.5 sm:py-3.5 text-base sm:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none"
          placeholder="Any special requests or additional information..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 sm:px-8 py-4 sm:py-4 text-neutral-900 text-base sm:text-base font-semibold hover:bg-neutral-50 active:scale-[0.97] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FaPaperPlane className="h-5 w-5" />
            </motion.div>
            <span>Opening WhatsApp...</span>
          </>
        ) : (
          <>
            <span>BOOK NOW</span>
            <FaPaperPlane className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </motion.button>

      <p className="text-xs sm:text-sm text-neutral-400 text-center mt-5 sm:mt-6">
        By submitting, you&apos;ll be redirected to WhatsApp to send your booking request.
      </p>
    </form>
  );
}
