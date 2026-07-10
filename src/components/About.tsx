import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';

const experiences = [
{
    role: 'Full Stack Intern',
    company: 'HR Logix',
    location: 'Remote — Australia',
    period: 'Apr 2026 — Present',
    current: true,
    stack: ['Node.js', 'NestJS', 'Express', 'TypeORM', 'TypeScript', 'MongoDB', 'PostgreSQL', 'React', 'AWS S3', 'gRPC', 'Cloudflare', 'Kubernetes'],
    points: [
      <>
        Built a full-stack{' '}
        <span className="text-slate-200">CMS from scratch across 3 repos</span>{' '}
        (Node.js, MongoDB, React) — <span className="text-cyan-400">17 REST APIs</span>{' '}
        and <span className="text-cyan-400">22 per-page content collections</span>{' '}
        via a Mongoose model factory, with an approval workflow backed by{' '}
        <span className="text-slate-200">multi-document MongoDB transactions</span>.
      </>,
      <>
        Designed the CMS approval pipeline — content edits create pending{' '}
        <span className="font-mono text-cyan-400/90">ChangeRequest</span> documents
        (proposed value + pre-change snapshot) instead of writing directly;
        approving applies the change atomically and invalidates cache, with
        automatic <span className="text-slate-200">supersede handling</span>{' '}
        for stacked pending edits on the same key.
      </>,
      <>
        Added a{' '}
        <span className="text-slate-200">30s TTL in-memory cache</span>{' '}
        auto-invalidated on every write; profiled the admin dashboard firing{' '}
        <span className="text-cyan-400">~40 parallel requests</span> on load
        (22 pages × 2 queries) and designed a server-side fan-out endpoint to
        collapse it to 2 calls.
      </>,
      <>
        Integrated <span className="text-cyan-400">gRPC</span> (FileService) to
        delegate S3 presigning to an internal microservice — the CMS backend
        holds <span className="text-slate-200">zero AWS credentials</span>;
        browsers PUT directly to S3 via the returned presigned URL.
      </>,
      <>
        Adopted a{' '}
        <span className="text-slate-200">CDN URL storage strategy</span> so
        every stored image resolves through Cloudflare's resize Lambda with
        automatic <span className="text-cyan-400">AVIF/WebP/JPEG</span>{' '}
        negotiation — browsers get the smallest format they support, zero
        per-image work required.
      </>,
      <>
        Built a two-sided{' '}
        <span className="text-slate-200">Carrier Onboarding backend</span> — a
        4-step contractor flow with independent operator review, governed
        end-to-end by a custom{' '}
        <span className="text-cyan-400">state machine</span> enforcing
        submission-driven unlocks and sequential review gating.
      </>,
      <>
        Designed the{' '}
        <span className="text-slate-200">
          MongoDB schema for a single embedded carrier document
        </span>{' '}
        and implemented{' '}
        <span className="text-slate-200">optimistic concurrency control</span>{' '}
        via guarded <span className="font-mono text-cyan-400/90">findOneAndUpdate</span>{' '}
        operations on both contractor and operator writes to prevent race
        conditions on status transitions, backed by an append-only{' '}
        <span className="text-cyan-400">audit trail</span> for compliance.
      </>,
      <>
        Built{' '}
        <span className="text-slate-200">dual JWT authentication</span>{' '}
        systems (contractor vs. internal operator) with{' '}
        <span className="text-cyan-400">IDOR-safe data scoping</span>, and
        integrated AWS S3 uploads via presigned PUT URLs plus{' '}
        <span className="text-slate-200">base64 signature capture</span> for
        compliance documents.
      </>,
      <>
        Shipped{' '}
        <span className="text-cyan-400">14 REST API endpoints</span> across
        Company Details, Pickup Locations, and Shipping Label Configs using{' '}
        <span className="text-slate-200">NestJS + TypeORM</span>, backed by
        hand-written TypeORM migrations designed and executed on{' '}
        <span className="text-slate-200">Supabase PostgreSQL</span>.
      </>,
      <>
        Built <span className="text-cyan-400">5 production React components</span>
        , including a unified Add/Edit Pickup Location modal with{' '}
        <span className="text-slate-200">Google Places API</span> autocomplete
        and a live Shipping Label preview panel.
      </>,
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'DetectifAI',
    location: 'Remote',
    period: 'Sep 2025 — Apr 2026',
    current: false,
    stack: ['Python', 'FastAPI', 'AWS EC2', 'NGINX', 'OWASP ZAP'],
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
    ],
  },
];

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

                <ul className="space-y-2.5 text-[15px] leading-relaxed text-slate-400">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-slate-800 bg-slate-900/60 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
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
