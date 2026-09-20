import { motion, Variants } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Network,
  ScanEye,
  Keyboard,
  Terminal,
  Bot,
  Wallet,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { links } from '../data/links';
import { DUR, EASE, SPRING, viewportOnce } from '../lib/motion';
import { useCoarsePointer } from '../lib/hooks';

const projects = [
  {
    title: 'Job-X',
    type: 'Event-Driven Microservices',
    description:
      'Event-driven job platform with 4 independent Node/Express services. Apache Kafka decouples email delivery, and a Transactional Outbox pattern guarantees zero missed notifications during broker outages.',
    tech: ['Node.js', 'Express', 'Kafka', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/pyansu07/Job-X',
    live: null,
    icon: Network,
  },
    {
    title: 'Enroll Assistant',
    type: 'Agentic AI Backend',
    description:
      'Multi-skill agentic backend with LLM intent routing, RAG retrieval, and human-in-the-loop confirmation that pauses and resumes mid-node across server restarts. Raised enrollment-intent accuracy from 47.62% to 100% by diagnosing a systematic router misclassification via a 54-case eval suite.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'Groq'],
    github: 'https://github.com/pyansu07/course-enrollment-agent',
    live: 'https://course-enrollment-agent.vercel.app/',
    icon: Bot,
  },
  {
    title: 'Code Cortex',
    type: 'Multi-Modal ML Pipeline',
    description:
      'AIR 165 / 18,720+ teams in the Amazon ML Challenge. A multi-modal pipeline fusing ResNet-50 (visual) and BERT (textual) with a custom Tesseract + Regex OCR layer to extract product dimensions from images.',
    tech: ['Python', 'TensorFlow', 'BERT', 'OpenCV', 'OCR'],
    github: 'https://github.com/pyansu07/Amazon-ML-Challenge',
    live: null,
    icon: ScanEye,
  },
  {
    title: 'TypeChamp',
    type: 'Real-Time Multiplayer',
    description:
      'Real-time multiplayer typing races over WebSockets (Socket.io) with sub-100ms keystroke sync, room-based matchmaking, and a live chat layer that survives reconnects without state loss.',
    tech: ['React', 'Socket.io', 'Node.js', 'WebSockets'],
    github: 'https://github.com/pyansu07/TypeChamp_v2',
    live: 'https://tc-d-frontend.onrender.com/',
    icon: Keyboard,
  },
  {
    title: 'ProxyNova',
    type: 'Systems / Networking',
    description:
      'High-performance HTTP proxy server in C. Handles concurrent clients via threading and implements LRU caching to optimize network packet handling.',
    tech: ['C', 'Systems', 'Networking', 'Linux'],
    github: 'https://github.com/pyansu07/ProxyNova',
    live: null,
    icon: Terminal,
  },
  {
    title: 'FinSight',
    type: 'Personal Finance Visualizer',
    description:
      'Full-stack finance tracker with a real-time dashboard, monthly-expense and category charts, per-category budgets with overspending alerts, a budget health score, and AI-powered spending insights. Dark/light mode, glass-morphism UI.',
    tech: ['Next.js 14', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/pyansu07/FinSight',
    live: 'https://personal-finance-visualizer-alpha-livid.vercel.app/',
    icon: Wallet,
  },
];

type Project = (typeof projects)[number];

const cardV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
  hover: { y: -4, transition: SPRING },
};

const iconV: Variants = {
  show: { scale: 1, rotate: 0, transition: SPRING },
  hover: { scale: 1.08, rotate: -4, transition: SPRING },
};

const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => {
  const coarse = useCoarsePointer();

  return (
    <motion.div
      variants={cardV}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      whileHover={coarse ? undefined : 'hover'}
      transition={{ duration: DUR.md, ease: EASE, delay: (idx % 3) * 0.07 }}
      className="flex flex-col rounded-xl bg-surface p-6 ring-1 ring-line/70 transition-colors duration-300 hover:ring-accent/40"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <motion.span variants={iconV} className="text-accent">
          <project.icon size={22} />
        </motion.span>

        <div className="flex gap-3 text-muted">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            whileHover={{ y: -2, scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={SPRING}
            className="transition-colors hover:text-accent"
          >
            <Github size={18} />
          </motion.a>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live`}
              whileHover={{ y: -2, scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
              className="transition-colors hover:text-accent"
            >
              <ExternalLink size={18} />
            </motion.a>
          )}
        </div>
      </div>

      <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-accent/85">
        {project.type}
      </p>
      <h3 className="mt-1 text-[17px] font-bold text-body">{project.title}</h3>

      <p className="mt-2.5 flex-grow text-[14px] leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="scroll-mt-24 py-16">
    <SectionHeading
      title="Projects"
      intro="A selection of things I've designed and built — from event-driven backends and agentic AI to ML pipelines and low-level systems work."
    />

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, idx) => (
        <ProjectCard key={project.title} project={project} idx={idx} />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DUR.md, ease: EASE }}
      className="mt-8"
    >
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-[15px] link-accent"
      >
        View full project archive
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </motion.div>
  </section>
);

export default Projects;
