"use client";

import React, { useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Review {
  name: string;
  role?: string;
  text: string;
  avatarId?: string;
  rating?: number;
}

export interface ReviewsCarouselProps {
  reviews: Review[];
}

function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [startIndex, setStartIndex] = React.useState(0);
  
  // Safety check: ensure reviews array exists and has items
  const safeReviews = useMemo(() => reviews || [], [reviews]);
  const reviewsLength = safeReviews.length;
  
  // Responsive cards per page: 1 on mobile, 2 on tablet, 3 on desktop
  const [cardsPerView, setCardsPerView] = React.useState(1);
  
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards (but we keep responsive below lg)
      }
    };
    
    updateCardsPerView();
    
    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateCardsPerView, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const next = useCallback(() => {
    if (reviewsLength === 0) return;
    setStartIndex((i) => {
      const nextIndex = i + cardsPerView;
      const maxIndex = Math.max(0, reviewsLength - cardsPerView);
      return nextIndex >= reviewsLength ? 0 : Math.min(nextIndex, maxIndex);
    });
  }, [reviewsLength, cardsPerView]);

  const prev = useCallback(() => {
    if (reviewsLength === 0) return;
    setStartIndex((i) => {
      const prevIndex = i - cardsPerView;
      const maxIndex = Math.max(0, reviewsLength - cardsPerView);
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  }, [reviewsLength, cardsPerView]);

  React.useEffect(() => {
    if (reviewsLength === 0) return;
    
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next, reviewsLength]);
  
  // Reset startIndex when cardsPerView changes
  React.useEffect(() => {
    const maxIndex = Math.max(0, reviewsLength - cardsPerView);
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [cardsPerView, reviewsLength, startIndex]);

  // Early return after hooks if no reviews
  if (reviewsLength === 0) {
    return null;
  }

  // Get current page of reviews (memoized)
  const currentReviews = useMemo(
    () => safeReviews.slice(startIndex, startIndex + cardsPerView),
    [safeReviews, startIndex, cardsPerView]
  );
  const totalPages = useMemo(
    () => Math.ceil(reviewsLength / cardsPerView),
    [reviewsLength, cardsPerView]
  );
  const currentPage = useMemo(
    () => Math.floor(startIndex / cardsPerView) + 1,
    [startIndex, cardsPerView]
  );

  // Create a memoized mapping of review index to unique portrait ID
  // This ensures each review gets a different male avatar (ages 20-40) with no duplicates
  const avatarMapping = useMemo(() => {
    const mapping = new Map<number, number>();
    const usedIds = new Set<number>();
    
    // Generate unique portrait IDs for each review index (1-99 range)
    safeReviews.forEach((review, index) => {
      // Generate a unique seed from avatarId or name
      let seed: number;
      if (review.avatarId) {
        seed = review.avatarId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      } else {
        seed = review.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      }
      
      // Start with a candidate portrait ID based on seed and index
      let candidateId = ((seed + index * 97) % 99) + 1;
      
      // If already used, find the next available ID (wrap around if needed)
      if (usedIds.has(candidateId)) {
        // Find next available ID by cycling through 1-99
        for (let offset = 1; offset < 99; offset++) {
          candidateId = ((candidateId + offset - 1) % 99) + 1;
          if (!usedIds.has(candidateId)) {
            break;
          }
        }
      }
      
      usedIds.add(candidateId);
      mapping.set(index, candidateId);
    });
    
    return mapping;
  }, [safeReviews]);

  // Function to get unique men's avatar (ages 20-40) for each review
  // Uses randomuser.me portraits with guaranteed unique IDs per review
  const getMaleAvatar = (index: number) => {
    // Get the unique portrait ID for this review index
    const portraitId = avatarMapping.get(index) || ((index % 99) + 1);
    // Return unique male portrait URL (men portraits 1-99 typically represent ages 20-40)
    return `https://randomuser.me/api/portraits/men/${portraitId}.jpg`;
  };

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Navigation Arrows */}
      <div className="flex items-center justify-between mb-6 sm:mb-8" suppressHydrationWarning>
        <motion.button 
          onClick={prev} 
          aria-label="Previous reviews" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 flex-shrink-0 z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          <FaChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
        
        <div className="text-sm sm:text-base text-neutral-400 font-medium px-4" suppressHydrationWarning>
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        <motion.button 
          onClick={next} 
          aria-label="Next reviews" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 flex-shrink-0 z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          <FaChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-6" suppressHydrationWarning>
        <AnimatePresence mode="wait">
          {currentReviews.map((review, idx) => {
            const globalIndex = startIndex + idx;
            const rating = review.rating || 5;
            // Use globalIndex to get the unique avatar for this review
            const uniqueAvatarUrl = getMaleAvatar(globalIndex);
            
            return (
              <motion.div
                key={`${startIndex}-${globalIndex}-${review.name}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-7 backdrop-blur-sm hover:border-white/30 active:scale-[0.98] transition-all duration-500 overflow-hidden"
                suppressHydrationWarning
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" suppressHydrationWarning></div>
                
                <div className="relative z-10" suppressHydrationWarning>
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5" suppressHydrationWarning>
                    <motion.img 
                      src={uniqueAvatarUrl} 
                      alt={`${review.name} avatar`} 
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-white/30 object-cover shadow-lg flex-shrink-0" 
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        // Fallback to a unique male avatar using the mapping
                        const fallbackPortraitId = avatarMapping.get(globalIndex) || ((globalIndex % 99) + 1);
                        (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/men/${fallbackPortraitId}.jpg`;
                      }}
                    />
                    <div className="flex-1 min-w-0" suppressHydrationWarning>
                      <p className="text-base sm:text-base font-bold text-white mb-1.5 truncate">{review.name}</p>
                      {review.role && <p className="text-sm sm:text-sm text-neutral-300 mb-2.5 truncate">{review.role}</p>}
                      <div className="flex items-center gap-1" suppressHydrationWarning>
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`h-4 w-4 sm:h-4 sm:w-4 ${i < rating ? 'text-yellow-400' : 'text-neutral-600'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-sm sm:text-sm md:text-sm text-neutral-100 leading-relaxed font-light line-clamp-4">
                    "{review.text}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-8 sm:mt-10" suppressHydrationWarning>
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageIndex = i * cardsPerView;
          const isActive = Math.floor(startIndex / cardsPerView) === i;
          
          return (
            <button
              key={i}
              onClick={() => setStartIndex(pageIndex)}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 active:scale-90 ${
                isActive 
                  ? 'w-10 sm:w-12 bg-white shadow-lg' 
                  : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ReviewsCarousel);
