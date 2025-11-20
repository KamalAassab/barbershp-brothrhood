export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  { 
    question: "Do you accept walk-ins?", 
    answer: "Yes, when time allows. Booking ahead guarantees your slot and ensures you get the time that works best for you. Walk-ins are welcome based on availability." 
  },
  { 
    question: "What payment methods do you take?", 
    answer: "We accept cash and all major credit cards. Contactless payments are also available for your convenience." 
  },
  { 
    question: "Can I cancel or reschedule?", 
    answer: "Yes, absolutely. Use the Calendly link in your confirmation email to reschedule or cancel. We appreciate at least 24 hours notice when possible." 
  },
  { 
    question: "Do you cut kids hair?", 
    answer: "Yes, we offer kids cuts for ages 12 and under. Our barbers are experienced with children and make the experience comfortable and fun." 
  },
  {
    question: "How long does a typical haircut take?",
    answer: "Most standard haircuts take 30-45 minutes. Specialty cuts, fades, and full services may take 45-60 minutes. We take our time to ensure quality."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, gift cards are available for purchase in-store or online. They make perfect gifts for any occasion."
  }
];


