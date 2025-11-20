import type { Service } from "@/app/components/ServiceCategoryModal";

export interface ServiceCategory {
  title: string;
  icon: string;
  blurb: string;
  services: Service[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { 
    title: "Haircuts", 
    icon: "mdi:scissors-cutting", 
    blurb: "",
    services: [
      { title: "Classic Haircut", price: "$30", description: "Traditional barbershop cut with clippers and scissors.", icon: "mdi:content-cut" },
      { title: "Skin Fade", price: "$35", description: "Sharp, clean fade that blends seamlessly to the skin.", icon: "mdi:content-cut" },
      { title: "Taper Fade", price: "$32", description: "Gradual fade that maintains length on top.", icon: "mdi:content-cut" },
      { title: "Pompadour", price: "$40", description: "Classic voluminous style with precise styling.", icon: "mdi:content-cut" },
      { title: "Buzz Cut", price: "$22", description: "Quick, clean clipper cut for a fresh look.", icon: "mdi:account" },
      { title: "Long Hair Trim", price: "$35", description: "Professional trim for longer hairstyles.", icon: "mdi:content-cut" }
    ]
  },
  { 
    title: "Beards", 
    icon: "mdi:mustache", 
    blurb: "",
    services: [
      { title: "Beard Trim", price: "$15", description: "Expert shaping and maintenance of your beard.", icon: "mdi:mustache" },
      { title: "Hot Towel Shave", price: "$30", description: "Traditional straight razor shave with hot towel treatment.", icon: "mdi:razor-double-edge" },
      { title: "Line Up", price: "$12", description: "Precise edge work and line definition.", icon: "mdi:content-cut" },
      { title: "Full Beard Service", price: "$25", description: "Complete beard grooming including trim, shape, and styling.", icon: "mdi:mustache" },
      { title: "Mustache Trim", price: "$10", description: "Precise mustache shaping and styling.", icon: "mdi:mustache" }
    ]
  },
  { 
    title: "Speciality", 
    icon: "mdi:star", 
    blurb: "",
    services: [
      { title: "Hair Design", price: "$45", description: "Custom designs and patterns cut into your hair.", icon: "mdi:draw-pen" },
      { title: "Color Service", price: "$60", description: "Professional hair coloring and highlights.", icon: "mdi:palette" },
      { title: "Hair & Beard Combo", price: "$40", description: "Complete grooming package for hair and beard.", icon: "mdi:scissors-cutting" },
      { title: "Executive Cut", price: "$50", description: "Premium service with hot towel and styling.", icon: "mdi:tie" },
      { title: "Wedding Package", price: "$75", description: "Special occasion grooming with premium styling.", icon: "mdi:heart" }
    ]
  },
  { 
    title: "Kids", 
    icon: "mdi:face-child", 
    blurb: "",
    services: [
      { title: "Kids Cut (12 & under)", price: "$25", description: "Gentle, professional cut designed for children.", icon: "mdi:face-child" },
      { title: "First Haircut", price: "$30", description: "Special first haircut experience with certificate.", icon: "mdi:star" },
      { title: "Kids Fade", price: "$28", description: "Clean fade style for kids.", icon: "mdi:content-cut" },
      { title: "Kids Design", price: "$35", description: "Fun designs and patterns for kids.", icon: "mdi:draw-pen" }
    ]
  }
];


