import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code2 } from 'lucide-react';
import { links } from '../data/links';
import Counter from './Counter';
import RevealText from './RevealText';
import profileImg from '../icons/profile.jpeg';
import {
  DUR,
  EASE,
  SPRING_SOFT,
  staggerContainer,
  staggerItem,
} from '../lib/motion';
import { useParallax } from '../lib/hooks';

const phrases = [
  'distributed systems.',
  'event-driven APIs.',
  'ML data pipelines.',
];

const stats = [
  { to: 92, suffix: '%', label: 'throughput gain' },
  { to: 60, suffix: 'K+', label: 'samples harvested' },
  { to: 132, label: 'automated tests' },
  { to: 6, suffix: '+', label: 'shipped projects' },
  { to: 165, prefix: '#', label: 'Amazon ML rank' },
];

/**
 * One timeline drives the whole left column, so the intro reads as a single
 * sequence rather than six elements arriving independently. Kept tight
 * (~0.9s end to end) so the page is interactive almost immediately.
 */
const intro = staggerContainer(0.075, 0.05);

const Hero = () => {
  const [phrase, setPhrase] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Terminal card drifts a touch slower than the page as you scroll away.
  const cardY = useParallax(sectionRef, 34);

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
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center pt-28 pb-16"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
        {/* Left — intro */}
        <motion.div variants={intro} initial="hidden" animate="show">
          <motion.div variants={staggerItem} className="mb-7 flex items-center gap-3">
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
            variants={staggerItem}
            className="text-cyan-400 font-mono text-base mb-3 block"
          >
            Hi, I&apos;m
          </motion.span>

          {/* The name gets the masked line reveal — the strongest moment. */}
          <RevealText
            as="h1"
            trigger="inherit"
            text="Pyansu Nahak"
            stagger={0.07}
            className="font-display text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 mb-4"
            accent={<span className="text-cyan-400">.</span>}
          />

          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-400 mb-7 leading-tight"
          >
            I build scalable backends &amp;{' '}
            <span className="relative mt-1 block h-[1.3em] w-full">
              <AnimatePresence>
                <motion.span
                  key={phrase}
                  initial={{
                    opacity: 0,
                    y: 16,
                    filter: reduce ? 'blur(0px)' : 'blur(6px)',
                  }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{
                    opacity: 0,
                    y: -16,
                    filter: reduce ? 'blur(0px)' : 'blur(6px)',
                  }}
                  transition={{ duration: DUR.md, ease: EASE }}
                  className="absolute left-0 top-0 whitespace-nowrap text-gradient animate-gradient-x"
                >
                  {phrases[phrase]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="max-w-xl text-base md:text-lg text-slate-400 mb-9 leading-relaxed"
          >
            Full-Stack &amp; Systems Engineer specializing in event-driven
            microservices and data-intensive pipelines. Currently building
            two-sided onboarding systems at{' '}
            <span className="text-slate-100 font-semibold">Wobbi Logix</span>
            .
          </motion.p>

          {/* CTAs get their own nested stagger so the button leads the socials. */}
          <motion.div
            variants={staggerContainer(0.06)}
            className="flex flex-wrap gap-5 items-center"
          >
            <motion.button
              variants={staggerItem}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SOFT}
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-mono text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)]"
            >
              View my work
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            <motion.div
              variants={staggerContainer(0.05)}
              className="flex gap-1.5 text-slate-400"
            >
              {[
                { href: links.github, label: 'GitHub', Icon: Github },
                { href: links.linkedin, label: 'LinkedIn', Icon: Linkedin },
                { href: `mailto:${links.email}`, label: 'Email', Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  variants={staggerItem}
                  href={href}
                  {...(href.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_SOFT}
                  className="p-2.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — terminal card. Outer node owns parallax, inner owns entrance,
            so the two transforms never fight over `y`. */}
        <motion.div style={{ y: cardY }} className="relative will-change-transform">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING_SOFT, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR.xl, delay: 0.45, ease: EASE }}
              className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-transparent to-indigo-500/20 blur-2xl"
            />
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
                  <span className="text-emerald-300">&apos;Wobbi Logix&apos;</span>
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
        </motion.div>
      </div>

      {/* Stats strip — arrives last, cells cascade left to right. */}
      <motion.div
        variants={staggerContainer(0.09, 0.55)}
        initial="hidden"
        animate="show"
        className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden rounded-xl border border-slate-800/70 bg-slate-800/40"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className={`bg-slate-900/50 px-4 py-6 text-center ${
              // Last cell spans the row on mobile only, so 5 items in a
              // 2-column grid don't strand a lone orphan cell.
              i === stats.length - 1 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <Counter
              to={s.to}
              prefix={s.prefix}
              suffix={s.suffix}
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient"
            />
            <div className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
