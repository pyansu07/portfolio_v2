import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Animates from 0 to `to` the first time it scrolls into view. */
const Counter = ({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(value)}
      {suffix}
    </span>
  );
};

export default Counter;
