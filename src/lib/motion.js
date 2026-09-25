/**
 * House motion tokens — DUOTONE personality (web-motion-system):
 * bouncy, energetic, commerce-forward. Change only these numbers.
 */
export const M = {
  ease: {
    entrance: "back.out(1.4)",
    exit: "power2.in",
    move: "power3.inOut",
    scrub: "none", // scroll-linked motion is ALWAYS linear
  },
  duration: { fast: 0.35, base: 0.5, slow: 0.8 },
  stagger: { tight: 0.06, loose: 0.12 },
  distance: { near: 24, far: 40 },
};

/* Motion (motion/react) equivalents */
export const MM = {
  ease: {
    entrance: [0.34, 1.56, 0.64, 1], // ≈ back.out(1.4)
    exit: [0.55, 0, 1, 0.45],
    move: [0.65, 0, 0.35, 1],
  },
  spring: { type: "spring", stiffness: 380, damping: 32 },
  duration: { fast: 0.35, base: 0.5, slow: 0.8 },
};
