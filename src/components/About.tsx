import { ReactNode, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Briefcase, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Project = {
  title: string;
  summary: string;
  points: ReactNode[];
  stack: string[];
};

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  points?: ReactNode[];
  stack?: string[];
  projects?: Project[];
};

const hrLogixProjects: Project[] = [
  {
    title: 'CMS',
    summary:
      'Full-stack CMS built from scratch across 3 repos — 30+ REST APIs powering content, blog, and Find & Replace across 22 live pages.',
    points: [
      <>
        Built a full-stack CMS from scratch (3 repos,{' '}
        <span className="text-slate-200">Node.js/MongoDB/React</span>) —{' '}
        <span className="text-cyan-400">30+ REST APIs</span> across content,
        blog, and Find &amp; Replace spanning 22 pages, gated by a
        transactional approval workflow backed by MongoDB transactions.
      </>,
      <>
        Designed blog as a separate content model from page content since a
        locale-keyed field map didn&apos;t fit structured articles; built
        Find &amp; Replace across all 22 pages with transactional
        preview-then-execute, re-validated server-side rather than trusting
        the client.
      </>,
      <>
        Added a <span className="text-cyan-400">30s TTL in-memory cache</span>{' '}
        auto-invalidated on every write; profiled the admin dashboard firing
        ~40 parallel requests on load (22 pages × 2 queries) and designed a
        server-side fan-out endpoint to collapse it to 2 calls.
      </>,
      <>
        Integrated <span className="text-slate-200">gRPC</span> (FileService)
        to delegate S3 presigning to an internal microservice — the CMS
        backend holds zero AWS credentials; browsers PUT directly to S3 via
        the returned presigned URL.
      </>,
      <>
        Adopted a CDN URL storage strategy so every stored image resolves
        through <span className="text-slate-200">Cloudflare&apos;s resize Lambda</span>{' '}
        with automatic AVIF/WebP/JPEG negotiation.
      </>,
    ],
    stack: ['Node.js', 'MongoDB', 'React', 'gRPC', 'Cloudflare', 'MongoDB Transactions'],
  },
  {
    title: 'Carrier Onboarding',
    summary:
      'A config-driven onboarding platform — operators author the entire form structure, and every carrier submission is safely versioned against it.',
    points: [
      <>
        Designed a config-driven onboarding platform — operators author
        steps, fields, and documents through a Settings UI and publish
        versioned configs; each carrier is pinned to their signup-time
        version so republishing never reshapes an in-flight submission.
      </>,
      <>
        Designed the{' '}
        <span className="text-slate-200">
          MongoDB schema for a single embedded carrier document
        </span>{' '}
        and implemented{' '}
        <span className="text-slate-200">optimistic concurrency control</span>{' '}
        via guarded <span className="font-mono text-cyan-400/90">findOneAndUpdate</span>{' '}
        operations on both contractor and operator writes, preventing race
        conditions on status transitions, backed by an append-only audit
        trail for compliance.
      </>,
      <>
        Built <span className="text-slate-200">dual JWT authentication systems</span>{' '}
        (contractor vs. internal operator) with IDOR-safe data scoping, and
        integrated AWS S3 uploads via presigned PUT URLs plus base64
        signature capture for compliance documents.
      </>,
      <>
        Guarded operator review writes with atomic status-conditioned updates
        to prevent lost concurrent updates, and fixed a self-found race
        condition silently dropping a user&apos;s keystrokes on submit.
      </>,
    ],
    stack: ['TypeScript', 'MongoDB', 'JWT Auth', 'AWS S3', 'Optimistic Concurrency'],
  },
  {
    title: 'Driver Onboarding',
    summary:
      'A curriculum authoring system for driver training — versioned content, backed by 132 automated tests including real concurrency scenarios.',
    points: [
      <>
        Built a Driver Onboarding curriculum system (Module → Version →
        Topic → Lesson tree) with draft-publish versioning enforced by a{' '}
        <span className="text-slate-200">DB-level partial unique index</span>{' '}
        — makes the &ldquo;only one approved version&rdquo; rule impossible
        to violate even under concurrent requests.
      </>,
      <>
        Validated the system with{' '}
        <span className="text-cyan-400">132 automated checks</span> across 5
        test scripts, covering normal-path, edge-case, HTTP-level,
        upload-wiring, and concurrency scenarios — confirmed via a real
        concurrency test where two simultaneous publishes both return 200,
        with exactly one ending up approved.
      </>,
      <>
        Pinned each driver&apos;s progress to the specific module version
        they started on, so an admin publishing a new version mid-course
        never invalidates or confuses a driver partway through the old one.
      </>,
    ],
    stack: ['MongoDB', 'Mongoose', 'Versioning', 'Automated Testing'],
  },
];

const experiences: Experience[] = [
  {
    role: 'Full Stack Intern',
    company: 'Wobbi Logix',
    location: 'Remote — Australia',
    period: 'May 2026 — Present',
    current: true,
    projects: hrLogixProjects,
  },
  {
    role: 'Software Engineering Intern',
    company: 'DetectifAI',
    location: 'Remote',
    period: 'Sep 2025 — Apr 2026',
    current: false,
    stack: ['Python', 'FastAPI', 'AWS EC2', 'NGINX', 'OWASP ZAP', 'React', 'Framer Motion'],
    points: [
      <>
        Architected a high-performance Python data engine using a{' '}
        <span className="text-slate-200">
          multi-threaded producer–consumer model
        </span>{' '}
        with thread-safe locking and JSON checkpointing, increasing throughput
        by <span className="text-cyan-400">92%</span> with zero data corruption
        across multi-day runs.
      </>,
      <>
        Engineered <span className="text-slate-200">thread-safe Lock primitives</span>{' '}
        and JSON-based checkpointing, enabling{' '}
        <span className="text-cyan-400">autonomous 24/7 operation</span> with
        zero data corruption.
      </>,
      <>
        Bypassed the 1,000-post API pagination limit with a{' '}
        <span className="text-slate-200">&ldquo;Keyword Slicing&rdquo;</span>{' '}
        algorithm to force deep-archive retrieval, harvesting{' '}
        <span className="text-cyan-400">60,000+ unique samples</span>.
      </>,
      <>
        Deployed an NGINX reverse proxy on AWS EC2 with SSL/TLS via
        Let&apos;s Encrypt, securing the production FastAPI backend.
      </>,
      <>
        Ran backend security audits with{' '}
        <span className="text-slate-200">OWASP ZAP</span>, identifying 5+
        vulnerabilities (XSS / CSRF).
      </>,
      <>
        Converted Figma designs into production pages end-to-end using{' '}
        <span className="text-slate-200">React and Framer Motion</span>,
        applying memoization and code-splitting to keep animated,
        pixel-accurate UI performant.
      </>,
    ],
  },
];

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={cardItem}
      className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-cyan-400/30"
    >
      <h5 className="font-bold text-slate-100">{project.title}</h5>
      <p className="mt-1 text-sm leading-relaxed text-slate-400">
        {project.summary}
      </p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
      >
        {open ? 'Hide technical details' : 'View technical details'}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-slate-400">
              {project.points.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded border border-slate-800 bg-slate-950/60 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 scroll-mt-20">
      <SectionHeading number="01" title="My Journey" />

      <div className="grid lg:grid-cols-[1.55fr_1fr] gap-12">
        {/* Experience timeline */}
        <div>
          <h3 className="text-lg font-mono text-cyan-400 mb-8 flex items-center gap-2">
            <Briefcase size={18} /> Work Experience
          </h3>

          <div className="relative border-l border-slate-800 ml-3 space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="relative pl-8"
              >
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-ink bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.12)]" />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h4 className="text-xl font-bold text-slate-100">
                    {exp.role}
                  </h4>
                  {exp.current && (
                    <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/20">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-0.5 font-mono text-cyan-400">
                  {exp.company}
                  <span className="mx-2 text-slate-600">/</span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <MapPin size={12} /> {exp.location}
                  </span>
                </p>
                <p className="mb-4 font-mono text-xs text-slate-500">
                  {exp.period}
                </p>

                {exp.projects ? (
                  <motion.div
                    variants={cardsContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    className="space-y-4"
                  >
                    {exp.projects.map((project) => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </motion.div>
                ) : (
                  <>
                    <ul className="space-y-2.5 text-[15px] leading-relaxed text-slate-400">
                      {exp.points!.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.stack!.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-slate-800 bg-slate-900/60 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-mono text-cyan-400 mb-8 flex items-center gap-2">
            <GraduationCap size={18} /> Education
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-cyan-400/30"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-100">
                Indian Institute of Information Technology, Nagpur
              </h4>
              <span className="shrink-0 rounded bg-cyan-400/10 px-2 py-1 font-mono text-[11px] text-cyan-400">
                2022 — 26
              </span>
            </div>
            <p className="text-slate-400">B.Tech</p>
            <p className="mt-1 font-mono text-sm text-slate-500">
              Nagpur, Maharashtra
            </p>

            <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">JEE Mains &amp; Advanced 2022</span>
                <span className="font-mono font-bold text-cyan-400">
                  Qualified
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Class XII</span>
                <span className="font-mono font-bold text-cyan-400">96%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Class X</span>
                <span className="font-mono font-bold text-cyan-400">94%</span>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-900/60 to-slate-900/20 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
              Core Concepts
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              OOP · DSA · Operating Systems · DBMS · System Design ·
              Microservices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
