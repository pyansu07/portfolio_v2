import { ReactNode, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  Variants,
} from 'framer-motion';
import { Briefcase, ChevronDown, MapPin } from 'lucide-react';
import SectionHeading, { SubHeading } from './SectionHeading';
import {
  DUR,
  EASE,
  EASE_IN_OUT,
  SPRING,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '../lib/motion';

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
        <span className="text-body">Node.js/MongoDB/React</span>) —{' '}
        <span className="text-accent">30+ REST APIs</span> across content,
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
        Added a <span className="text-accent">30s TTL in-memory cache</span>{' '}
        auto-invalidated on every write; profiled the admin dashboard firing
        ~40 parallel requests on load (22 pages × 2 queries) and designed a
        server-side fan-out endpoint to collapse it to 2 calls.
      </>,
      <>
        Integrated <span className="text-body">gRPC</span> (FileService)
        to delegate S3 presigning to an internal microservice — the CMS
        backend holds zero AWS credentials; browsers PUT directly to S3 via
        the returned presigned URL.
      </>,
      <>
        Adopted a CDN URL storage strategy so every stored image resolves
        through <span className="text-body">Cloudflare&apos;s resize Lambda</span>{' '}
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
        <span className="text-body">
          MongoDB schema for a single embedded carrier document
        </span>{' '}
        and implemented{' '}
        <span className="text-body">optimistic concurrency control</span>{' '}
        via guarded <span className="font-mono text-accent">findOneAndUpdate</span>{' '}
        operations on both contractor and operator writes, preventing race
        conditions on status transitions, backed by an append-only audit
        trail for compliance.
      </>,
      <>
        Built <span className="text-body">dual JWT authentication systems</span>{' '}
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
        <span className="text-body">DB-level partial unique index</span>{' '}
        — makes the &ldquo;only one approved version&rdquo; rule impossible
        to violate even under concurrent requests.
      </>,
      <>
        Validated the system with{' '}
        <span className="text-accent">132 automated checks</span> across 5
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
    role: 'Full Stack Developer',
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
        <span className="text-body">
          multi-threaded producer–consumer model
        </span>{' '}
        with thread-safe locking and JSON checkpointing, increasing throughput
        by <span className="text-accent">92%</span> with zero data corruption
        across multi-day runs.
      </>,
      <>
        Engineered <span className="text-body">thread-safe Lock primitives</span>{' '}
        and JSON-based checkpointing, enabling{' '}
        <span className="text-accent">autonomous 24/7 operation</span> with
        zero data corruption.
      </>,
      <>
        Bypassed the 1,000-post API pagination limit with a{' '}
        <span className="text-body">&ldquo;Keyword Slicing&rdquo;</span>{' '}
        algorithm to force deep-archive retrieval, harvesting{' '}
        <span className="text-accent">90,000+ unique samples</span>.
      </>,
      <>
        Deployed an NGINX reverse proxy on AWS EC2 with SSL/TLS via
        Let&apos;s Encrypt, securing the production FastAPI backend.
      </>,
      <>
        Ran backend security audits with{' '}
        <span className="text-body">OWASP ZAP</span>, identifying 5+
        vulnerabilities (XSS / CSRF).
      </>,
      <>
        Converted Figma designs into production pages end-to-end using{' '}
        <span className="text-body">React and Framer Motion</span>,
        applying memoization and code-splitting to keep animated,
        pixel-accurate UI performant.
      </>,
    ],
  },
];

const cardV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE } },
  hover: { y: -3, transition: SPRING },
};

/** Revealed bullets cascade instead of appearing as one block of text. */
const bulletV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.sm, ease: EASE } },
};

const Bullet = ({ children }: { children: ReactNode }) => (
  <motion.li variants={bulletV} className="flex gap-2.5">
    <span className="mt-[0.6em] h-[3px] w-[3px] shrink-0 rounded-full bg-muted/70" />
    <span>{children}</span>
  </motion.li>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <motion.span
    variants={bulletV}
    className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
  >
    {children}
  </motion.span>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={cardV}
      whileHover="hover"
      className="rounded-xl bg-surface p-5 ring-1 ring-line/70 transition-colors duration-300 hover:ring-accent/40"
    >
      <h5 className="text-[15px] font-bold text-body">{project.title}</h5>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        {project.summary}
      </p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-opacity hover:opacity-75"
      >
        {open ? 'Hide technical details' : 'View technical details'}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={SPRING}
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
            transition={{
              height: { duration: DUR.md, ease: EASE_IN_OUT },
              opacity: { duration: DUR.sm, ease: EASE_IN_OUT },
            }}
            className="overflow-hidden"
          >
            <motion.ul
              variants={staggerContainer(0.05, 0.08)}
              initial="hidden"
              animate="show"
              className="mt-4 space-y-2 text-[14px] leading-relaxed text-muted"
            >
              {project.points.map((point, i) => (
                <Bullet key={i}>{point}</Bullet>
              ))}
            </motion.ul>

            <motion.div
              variants={staggerContainer(0.025, 0.16)}
              initial="hidden"
              animate="show"
              className="mt-4 flex flex-wrap gap-2"
            >
              {project.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/** Timeline entry: slides in, then cascades its own header lines. */
const entryV: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const markerV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: SPRING },
};

const Dot = () => (
  <span className="text-muted/40" aria-hidden>
    •
  </span>
);

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The connector line draws itself as the timeline scrolls past, tying the
  // entries together instead of leaving them as unrelated floating cards.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <section id="about" className="scroll-mt-24 py-16 xl:max-w-3xl">
      <SectionHeading
        title="My Journey"
        intro="A summary of my professional experience and education. Expand any project below for the technical detail behind it."
      />

      <SubHeading
        title="Work History"
        intro="Below you will find a summary of my past employment experience."
      />

      <div ref={timelineRef} className="relative">
        {/* Static track + the progress line that draws over it. */}
        <div
          aria-hidden
          className="absolute bottom-2 left-1 top-2 w-px bg-line"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute bottom-2 left-1 top-2 w-px origin-top bg-accent/60"
        />

        <div className="space-y-11">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={entryV}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="relative pl-8"
            >
              <motion.span
                variants={markerV}
                className="absolute left-0 top-[7px] h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-ink"
              />

              <motion.h4
                variants={staggerItem}
                className="text-[15px] font-bold text-body"
              >
                {exp.role}
              </motion.h4>

              <motion.div
                variants={staggerItem}
                className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted"
              >
                <span className="font-medium text-body/90">{exp.company}</span>
                <Dot />
                <span className="inline-flex items-center gap-1">
                  <MapPin size={11} /> {exp.location}
                </span>
                {exp.current && (
                  <>
                    <Dot />
                    <span className="font-semibold text-accent">Current</span>
                  </>
                )}
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="mt-1 text-[12.5px] text-muted/75"
              >
                {exp.period}
              </motion.p>

              {exp.projects ? (
                // Its own trigger — these sit well below the entry header and
                // shouldn't animate while still off-screen.
                <motion.div
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="mt-4 space-y-3"
                >
                  {exp.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={staggerContainer(0.05)}>
                  <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted">
                    {exp.points!.map((point, i) => (
                      <Bullet key={i}>{point}</Bullet>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.stack!.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-16">
        <SubHeading title="Education" />

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: DUR.md,
                ease: EASE,
                staggerChildren: 0.06,
                delayChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="rounded-xl bg-surface p-6 ring-1 ring-line/70"
        >
          <motion.div
            variants={bulletV}
            className="flex flex-wrap items-start justify-between gap-3"
          >
            <div>
              <h4 className="text-[15px] font-bold text-body">
                Indian Institute of Information Technology, Nagpur
              </h4>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
                B.Tech <Dot />
                <span className="inline-flex items-center gap-1">
                  <MapPin size={11} /> Nagpur, Maharashtra
                </span>
              </p>
            </div>
            <span className="shrink-0 font-mono text-[12px] text-accent">
              2022 — 26
            </span>
          </motion.div>

          <div className="mt-5 space-y-2 border-t border-line pt-5">
            {[
              ['JEE Mains & Advanced 2022', 'Qualified'],
              ['Class XII', '96%'],
              ['Class X', '94%'],
            ].map(([label, value]) => (
              <motion.div
                key={label}
                variants={bulletV}
                className="flex items-center justify-between text-[13.5px]"
              >
                <span className="text-muted">{label}</span>
                <span className="font-semibold text-accent">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: DUR.md, ease: EASE, delay: 0.08 }}
          className="mt-4 rounded-xl bg-surface p-6 ring-1 ring-line/70"
        >
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted/80">
            <Briefcase size={13} /> Core Concepts
          </p>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
            OOPs · DSA · OS · DBMS · Computer Networks · Computer Architecture · System Design · Microservices · LLM Agents · RAG · LangGraph
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
