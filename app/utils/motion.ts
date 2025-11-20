/**
 * Utility functions for motion animations with reduced motion support
 */

export const motionConfig = {
  // Default animation config that respects prefers-reduced-motion
  default: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  fast: {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  slow: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation variants that respect reduced motion preference
 */
export function getMotionVariants() {
  const reduced = prefersReducedMotion();
  
  return {
    fadeIn: {
      initial: { opacity: reduced ? 1 : 0 },
      animate: { opacity: 1 },
      exit: { opacity: reduced ? 1 : 0 },
    },
    slideUp: {
      initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    },
    scale: {
      initial: { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.9 },
    },
  };
}

