import { useEffect, useState } from 'react';

/**
 * True on touch / stylus devices. Used to skip hover-only affordances
 * (lift-on-hover, accent rings) rather than leaving them stuck "on"
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
