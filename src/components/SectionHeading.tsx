import { motion } from 'framer-motion';
import RevealText from './RevealText';
import { lineReveal, viewportOnce } from '../lib/motion';

interface Props {
  number: string;
  title: string;
}

const SectionHeading = ({ number, title }: Props) => {
  return (
    <div className="flex items-center gap-4 mb-12">
      <RevealText
        as="h2"
        text={title}
        className="font-display text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap tracking-tight"
        lead={
          <span className="text-cyan-400 font-mono text-lg sm:text-xl mr-2 align-middle">
            {number}.
          </span>
        }
      />

      {/* Accent rule wipes in just behind the words. */}
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="h-px flex-grow origin-left bg-gradient-to-r from-slate-700 via-slate-800 to-transparent"
      />
    </div>
  );
};

export default SectionHeading;
