import { RefObject, useEffect, useState } from 'react';
import {
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * True on touch / stylus devices. Used to skip hover-only affordances
 * (pointer spotlight, lift-on-hover) rather than leaving them stuck "on"
 * after a tap.
 */
export const useCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return coarse;
};

/**
 * Springy scroll-linked offset for decorative elements only.
 * Returns a MotionValue in px, pinned to 0 when the user prefers reduced motion.
 */
export const useParallax = (
  ref: RefObject<HTMLElement>,
  distance = 40
): MotionValue<number> => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const d = reduce ? 0 : distance;
  const raw = useTransform(scrollYProgress, [0, 1], [d, -d]);

  return useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });
};

/** Same idea, but driven by whole-page scroll — for fixed background layers. */
export const usePageParallax = (distance = 60): MotionValue<number> => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const d = reduce ? 0 : distance;
  const raw = useTransform(scrollYProgress, [0, 1], [0, d]);

  return useSpring(raw, { stiffness: 70, damping: 28, mass: 0.5 });
};
