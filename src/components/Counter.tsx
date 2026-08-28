import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animates from 0 to `to` the first time it scrolls into view, then stops.
 *
 * Writes to `textContent` directly rather than through state — a counter at
 * 60fps for 1.6s would otherwise trigger ~96 React renders per instance.
 */
const Counter = ({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    // Reduced motion: land on the value without counting up to it.
    if (reduce) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix, reduce]);

  // Rendered once with the zero state; the effect owns the text from then on.
  return (
    <span ref={ref} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  );
};

export default Counter;
