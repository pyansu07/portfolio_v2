import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SPRING, SPRING_SOFT } from '../lib/motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only re-render on the threshold crossing, not on every scroll frame.
    const onScroll = () => {
      const next = window.scrollY > 600;
      setVisible((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 14 }}
          transition={SPRING}
          // Label (not an inline object) so the arrow inside can respond too.
          variants={{ hover: { y: -3, scale: 1.07, transition: SPRING_SOFT } }}
          whileHover="hover"
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-50 rounded-full border border-slate-700 bg-slate-900/80 p-3 text-cyan-400 backdrop-blur-md transition-colors hover:border-cyan-400/50 hover:bg-slate-800 hover:shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]"
        >
          <motion.span
            className="block"
            variants={{ hover: { y: -2, transition: SPRING_SOFT } }}
          >
            <ArrowUp size={20} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
