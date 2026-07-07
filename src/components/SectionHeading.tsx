import { motion } from 'framer-motion';

interface Props {
  number: string;
  title: string;
}

const SectionHeading = ({ number, title }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap tracking-tight">
        <span className="text-cyan-400 font-mono text-lg sm:text-xl mr-2 align-middle">
          {number}.
        </span>
        {title}
      </h2>
      <div className="h-px flex-grow bg-gradient-to-r from-slate-700 via-slate-800 to-transparent" />
    </motion.div>
  );
};

export default SectionHeading;
