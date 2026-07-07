import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Network,
  ScanEye,
  Keyboard,
  Terminal,
  BarChart3,
  Youtube,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { links } from '../data/links';

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
    featured: true,
  },
  {
    title: 'Code Cortex',
    type: 'Multi-Modal ML Pipeline',
    description:
      'Ranked 165 / 18,720+ teams in the Amazon ML Challenge. A multi-modal pipeline fusing ResNet-50 (visual) and BERT (textual) with a custom Tesseract + Regex OCR layer to extract product dimensions from images.',
    tech: ['Python', 'TensorFlow', 'BERT', 'OpenCV', 'OCR'],
    github: 'https://github.com/pyansu07/Amazon-ML-Challenge',
    live: null,
    icon: ScanEye,
    featured: true,
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
    featured: true,
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
    featured: false,
  },
  {
    title: 'Profit Pulse',
    type: 'FinTech Analytics',
    description:
      'Financial analytics app with ML-powered ROI prediction, real-time inventory optimization, and interactive business-metric dashboards.',
    tech: ['React', 'Flask', 'Python', 'Firebase'],
    github: 'https://github.com/pyansu07/Profit-Pulse',
    live: null,
    icon: BarChart3,
    featured: false,
  },
  {
    title: 'Nirvana',
    type: 'Computer Vision',
    description:
      'Low-light lunar image enhancement for Smart India Hackathon. Applied CLAHE & Gamma Correction to reveal crater detail in permanently shadowed regions.',
    tech: ['Python', 'OpenCV', 'Flask', 'React'],
    github: 'https://github.com/pyansu07/Nirvana',
    live: 'https://youtu.be/ef7uSElfpqg?si=IQj01LfCzdmq0LpH',
    icon: Youtube,
    featured: false,
  },
];

type Project = (typeof projects)[number];

const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-cyan-400/40"
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx) var(--my), rgba(34,211,238,0.09), transparent 65%)',
        }}
      />

      <div className="relative mb-6 flex items-start justify-between">
        <span className="rounded-lg border border-slate-700 bg-slate-800/70 p-3 text-cyan-400">
          <project.icon size={22} />
        </span>
        <div className="flex gap-3 text-slate-400">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="transition-colors hover:text-cyan-400"
          >
            <Github size={20} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live`}
              className="transition-colors hover:text-cyan-400"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <div className="relative mb-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-400/80">
          {project.type}
        </span>
        <h3 className="font-display text-lg font-bold text-slate-100 transition-colors group-hover:text-cyan-400">
          {project.title}
        </h3>
      </div>

      <p className="relative mb-6 flex-grow text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <div className="relative mt-auto flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded border border-cyan-900/50 bg-cyan-950/30 px-2 py-1 font-mono text-[10px] text-cyan-400/80"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <SectionHeading number="03" title="Featured Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-cyan-400/30 pb-1 font-mono text-sm text-cyan-400 transition-all hover:border-cyan-400"
        >
          View full project archive
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
};

export default Projects;
