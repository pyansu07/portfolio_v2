import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';

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

const Skills = () => {
  return (
    <section id="skills" className="py-24 scroll-mt-20">
      <SectionHeading number="02" title="Technical Skills" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className={`group rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-cyan-400/30 ${
              idx === 4 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg border border-slate-700 bg-slate-800/70 p-2 text-cyan-400 transition-colors group-hover:border-cyan-400/40">
                <cat.icon size={18} />
              </span>
              <h3 className="font-display font-semibold text-slate-100">
                {cat.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-slate-800 bg-slate-800/40 px-2.5 py-1 font-mono text-[12px] text-slate-400 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
