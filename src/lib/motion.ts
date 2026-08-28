import type { Transition, Variants } from 'framer-motion';

/**
 * Central motion system.
 *
 * Every variant here animates only `transform` / `opacity` (and occasionally a
 * short-lived `filter`) so the compositor owns the work and nothing triggers
 * layout. Components import these instead of redeclaring animation objects.
 */

type Bezier = [number, number, number, number];

/** Expo-ish ease-out — quick departure, long gentle settle. The "premium" curve. */
export const EASE: Bezier = [0.22, 1, 0.36, 1];
/** Symmetric curve for things that open AND close (expand/collapse, menus). */
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

export const DUR = {
  xs: 0.2,
  sm: 0.32,
  md: 0.45,
  lg: 0.6,
  xl: 0.75,
} as const;

/** Springs, for elements that should read as physical rather than timed. */
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.7,
};
export const SPRING_SOFT: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
  mass: 0.9,
};
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
};

/** One viewport config site-wide: fire once, just before fully on screen. */
export const viewportOnce = {
  once: true,
  margin: '-10% 0px -8% 0px',
} as const;

const tween = (duration: number = DUR.md, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/* ------------------------------------------------------------------ *
 * Directional reveals — pick the one that matches the section's flow. *
 * ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: tween() },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: tween() },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: tween() },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: tween() },
};

/** For large visual blocks — cards, panels, imagery. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { ...SPRING_SOFT } },
};

/** Soft focus-in. Use sparingly: `filter` is the most expensive thing here. */
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: tween(DUR.lg),
  },
};

/** Horizontal wipe for accent rules / dividers. Pair with `origin-left`. */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: DUR.lg, ease: EASE, delay: 0.12 },
  },
};

/* ---------------------------------------- *
 * Orchestration                            *
 * ---------------------------------------- */

/**
 * Parent that sequences its children. Children must use `show`/`hidden` keys —
 * they inherit the state, so they need no `whileInView` of their own.
 */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default child of a `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: tween(DUR.md) },
};

/**
 * Masked line reveal — the inner element slides up from behind a clipped
 * parent. Apply to a child of an `overflow-hidden` wrapper (see `RevealText`).
 */
export const maskChild: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DUR.xl, ease: EASE } },
};
