import { motion, Variants } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { DUR, EASE, SPRING, viewportOnce } from '../lib/motion';
import { useCoarsePointer } from '../lib/hooks';

const categories = [
  {
    title: 'Languages',
    icon: Code2,
    items: ['JavaScript', 'TypeScript', 'C++', 'Python', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: Layout,
    items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Node.js', 'NestJS', 'Express.js', 'Flask', 'FastAPI', 'REST APIs', 'GraphQL (Apollo)'],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Redis'],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    items: ['Docker', 'Docker Compose', 'Apache Kafka', 'gRPC', 'Kubernetes', 'Git', 'Postman', 'Vercel', 'Render'],
  },
];

/**
 * Each card is its own variant root: it triggers on its own scroll position
 * (so the lower rows don't animate off-screen) and then cascades its chips.
 */
const cardV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.022,
      delayChildren: 0.14,
    },
  },
  hover: { y: -4, transition: SPRING },
};

const iconV: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: SPRING },
  hover: { scale: 1.1, rotate: -5, transition: SPRING },
};

const chipV: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.sm, ease: EASE } },
};

const Skills = () => {
  // Without this a tap latches the hover variant until the next tap elsewhere.
  const coarse = useCoarsePointer();

  return (
    <section id="skills" className="py-24 scroll-mt-20">
      <SectionHeading number="02" title="Technical Skills" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            variants={cardV}
            initial="hidden"
            whileInView="show"
            whileHover={coarse ? undefined : 'hover'}
            viewport={viewportOnce}
            className={`group rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-colors duration-300 hover:border-cyan-400/30 ${
              idx === 4 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                variants={iconV}
                className="rounded-lg border border-slate-700 bg-slate-800/70 p-2 text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400/40"
              >
                <cat.icon size={18} />
              </motion.span>
              <motion.h3
                variants={chipV}
                className="font-display font-semibold text-slate-100"
              >
                {cat.title}
              </motion.h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <motion.span
                  key={skill}
                  variants={chipV}
                  className="rounded-md border border-slate-800 bg-slate-800/40 px-2.5 py-1 font-mono text-[12px] text-slate-400 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
