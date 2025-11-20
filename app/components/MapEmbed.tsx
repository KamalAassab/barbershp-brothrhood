"use client";

import React, { useCallback, memo } from "react";

export interface MapEmbedProps {
  src?: string;
  height?: number;
}

const DEFAULT_MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sYour%20Barbershop!5e0!3m2!1sen!2sus!4v0000000000000";

function MapEmbed({ src = DEFAULT_MAP_SRC, height = 420 }: MapEmbedProps) {
  // Use responsive height based on screen size - start with mobile height for SSR consistency
  const [responsiveHeight, setResponsiveHeight] = React.useState(280);
  const [isClient, setIsClient] = React.useState(false);
  
  const updateHeight = useCallback(() => {
    if (window.innerWidth < 640) {
      setResponsiveHeight(280); // Mobile: smaller height
    } else {
      setResponsiveHeight(height); // Tablet+: use provided height
    }
  }, [height]);
  
  React.useEffect(() => {
    setIsClient(true);
    updateHeight();
    
    // Throttle resize events
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateHeight]);
  
  // Use client-side calculated height or default for SSR
  const displayHeight = isClient ? responsiveHeight : 280;
  
  return (
    <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm w-full" suppressHydrationWarning>
      <iframe
        title="Map location"
        src={src}
        width="100%"
        height={displayHeight}
        style={{ border: 0, filter: 'grayscale(100%) brightness(0.8) contrast(1.2)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
        allowFullScreen
        suppressHydrationWarning
      />
    </div>
  );
}

export default memo(MapEmbed);
