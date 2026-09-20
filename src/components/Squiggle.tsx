import { motion } from 'framer-motion';
import { EASE, viewportOnce } from '../lib/motion';

/**
 * The accent wave that separates a section's intro from its body.
 * Draws itself left-to-right via stroke-dashoffset.
 */
const WAVE = 6;
const PERIOD = 30;
const path =
  'M2 11' + ` c5-8 10-8 15 0 c5 8 10 8 15 0`.repeat(WAVE);

const Squiggle = ({ className = '' }: { className?: string }) => (
  <motion.svg
    aria-hidden
    width={PERIOD * WAVE + 4}
    height="22"
    viewBox={`0 0 ${PERIOD * WAVE + 4} 22`}
    fill="none"
    className={`text-accent ${className}`}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    <motion.path
      d={path}
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.9, ease: EASE },
        },
      }}
    />
  </motion.svg>
);

export default Squiggle;
