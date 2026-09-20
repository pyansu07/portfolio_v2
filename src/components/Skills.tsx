import { motion, Variants } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { DUR, EASE, viewportOnce } from '../lib/motion';

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
    items: ['Docker', 'Docker Compose', 'GitHub Actions (CI/CD)', 'Apache Kafka', 'gRPC', 'AWS (EC2, S3)', 'Kubernetes', 'Git', 'Postman', 'Vercel', 'Render'],
  },
];

/** Each group is its own variant root so lower rows trigger on their own scroll. */
const groupV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const chipV: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.sm, ease: EASE } },
};

const Skills = () => (
  <section id="skills" className="scroll-mt-24 py-16">
    <SectionHeading
      title="Skills"
      intro="Here are the frameworks, libraries, services and runtimes I have experience with. This is not a complete list — I'm constantly gaining new skills, and hence it can be a little bit outdated."
    />

    <div className="space-y-9">
      {categories.map((cat) => (
        <motion.div
          key={cat.title}
          variants={groupV}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h3
            variants={chipV}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted/80"
          >
            <cat.icon size={14} className="text-accent" />
            {cat.title}
          </motion.h3>

          <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2.5">
            {cat.items.map((skill) => (
              <motion.span
                key={skill}
                variants={chipV}
                className="group inline-flex items-center gap-2 text-[14.5px] text-muted transition-colors hover:text-body"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/50 transition-colors group-hover:bg-accent" />
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
