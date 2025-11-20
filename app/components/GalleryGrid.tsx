"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export interface GalleryImage {
  src: string;
  alt: string;
  instagramUrl?: string;
}

export interface GalleryGridProps {
  images: GalleryImage[];
  defaultInstagramUrl?: string;
}

function GalleryGrid({ images, defaultInstagramUrl = "https://instagram.com" }: GalleryGridProps) {
  return (
    <div suppressHydrationWarning>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6" suppressHydrationWarning>
        {images.map((img, i) => {
          const instagramUrl = img.instagramUrl || defaultInstagramUrl;
          return (
            <motion.a
              key={img.src}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group relative aspect-square focus:outline-none overflow-hidden rounded-xl sm:rounded-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 active:scale-95 transition-transform" 
              aria-label={`View ${img.alt} on Instagram`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                loading="lazy"
                quality={85}
                className="object-cover border border-white/10 transition-transform duration-500 group-hover:scale-110 group-active:scale-105" 
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-all duration-300 group-hover:scale-110">
                <div className="p-3.5 sm:p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                  <FaInstagram className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
              <span className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/10"></span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

export default memo(GalleryGrid);
