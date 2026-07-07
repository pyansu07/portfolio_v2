import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code2 } from 'lucide-react';
import { links } from '../data/links';
import Counter from './Counter';
import profileImg from '../icons/profile.jpeg';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const phrases = [
  'distributed systems.',
  'event-driven APIs.',
  'ML data pipelines.',
];

const stats = [
  { to: 92, suffix: '%', label: 'throughput gain' },
  { to: 60, suffix: 'K+', label: 'samples harvested' },
  { to: 165, prefix: '#', label: 'Amazon ML rank' },
];

const Hero = () => {
  const [phrase, setPhrase] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setPhrase((p) => (p + 1) % phrases.length),
      2800
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-28 pb-16"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
        {/* Left — intro */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-7 flex items-center gap-3">
            <div className="relative">
              <img
                src={profileImg}
                alt="Pyansu Nahak"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-cyan-400/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-emerald-400" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulseRing" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs text-emerald-300/90 tracking-wide">
                Open to Software roles
              </span>
            </div>
          </motion.div>

          <motion.span
            variants={item}
            className="text-cyan-400 font-mono text-base mb-3 block"
          >
            Hi, I&apos;m
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 mb-4"
          >
            Pyansu Nahak
            <span className="text-cyan-400">.</span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-400 mb-7 leading-tight"
          >
            I build scalable backends &amp;{' '}
            <span className="relative mt-1 block h-[1.3em] w-full">
              <AnimatePresence>
                <motion.span
                  key={phrase}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute left-0 top-0 whitespace-nowrap text-gradient animate-gradient-x"
                >
                  {phrases[phrase]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-xl text-base md:text-lg text-slate-400 mb-9 leading-relaxed"
          >
            Full-Stack &amp; Systems Engineer specializing in event-driven
            microservices and data-intensive pipelines. Currently building
            two-sided onboarding systems at{' '}
            <span className="text-slate-100 font-semibold">HR Logix</span>
            .
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-5 items-center"
          >
            <button
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-mono text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)]"
            >
              View my work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <div className="flex gap-1.5 text-slate-400">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={`mailto:${links.email}`}
                aria-label="Email"
                className="p-2.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — terminal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-transparent to-indigo-500/20 blur-2xl" />
          <div className="relative animate-float rounded-xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-500">
                <Code2 size={13} /> pyansu.ts
              </span>
            </div>
            {/* Code body */}
            <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
              <code>
                <span className="text-pink-400">const</span>{' '}
                <span className="text-cyan-300">engineer</span>{' '}
                <span className="text-slate-500">=</span>{' '}
                <span className="text-slate-500">{'{'}</span>
                {'\n'}
                {'  '}
                <span className="text-sky-300">role</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-emerald-300">
                  &apos;Full-Stack &amp; Systems&apos;
                </span>
                <span className="text-slate-500">,</span>
                {'\n'}
                {'  '}
                <span className="text-sky-300">focus</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-slate-500">[</span>
                <span className="text-emerald-300">&apos;backends&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;pipelines&apos;</span>
                <span className="text-slate-500">],</span>
                {'\n'}
                {'  '}
                <span className="text-sky-300">stack</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-slate-500">[</span>
                <span className="text-emerald-300">&apos;Node&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;TypeScript&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;Kafka&apos;</span>
                <span className="text-slate-500">],</span>
                {'\n'}
                {'  '}
                <span className="text-sky-300">currentlyAt</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-emerald-300">&apos;HR Logix&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                {'  '}
                <span className="text-sky-300">openToWork</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-amber-300">true</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-500">{'}'}</span>
                <span className="text-slate-500">;</span>
                {'\n'}
                <span className="inline-block w-2 h-4 translate-y-0.5 bg-cyan-400 animate-blink" />
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-slate-800/70 bg-slate-800/40"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-900/50 px-5 py-6 text-center">
            <Counter
              to={s.to}
              prefix={s.prefix}
              suffix={s.suffix}
              className="font-display text-2xl md:text-3xl font-bold text-gradient"
            />
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
