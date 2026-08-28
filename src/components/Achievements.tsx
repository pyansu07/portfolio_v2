import { motion, Variants } from 'framer-motion';
import { Trophy, Medal, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Counter from './Counter';
import { links } from '../data/links';
import { DUR, EASE, SPRING, viewportOnce } from '../lib/motion';
import { useCoarsePointer } from '../lib/hooks';

const awards = [
  {
    icon: Trophy,
    color: 'text-yellow-400',
    ring: 'ring-yellow-400/20',
    title: 'Amazon ML Challenge 2024',
    desc: 'Ranked 165 out of 18,720+ teams for a multi-modal ResNet-50 + BERT pipeline.',
    tag: 'Rank #165',
  },
  {
    icon: Medal,
    color: 'text-purple-400',
    ring: 'ring-purple-400/20',
    title: 'Imagen AI Hackathon',
    desc: 'Finalist in the AI hackathon organized by IIT Delhi.',
    tag: 'Finalist',
  },
];

const cp = [
  {
    platform: 'LeetCode',
    href: links.leetcode,
    rating: 1745,
    accent: 'text-amber-400',
    barColor: 'from-amber-400 to-yellow-500',
    pct: 90,
    lines: [
      ['Percentile', 'Top 10% globally'],
      ['Weekly Contest 421', '#2,836 / 27,902'],
    ],
  },
  {
    platform: 'Codeforces',
    href: links.codeforces,
    rating: 1390,
    accent: 'text-sky-400',
    barColor: 'from-sky-400 to-cyan-500',
    pct: 62,
    lines: [
      ['Rank', 'Specialist track'],
      ['Global Round 27', '#2,179 / 22,518'],
    ],
  },
];

const awardV: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  hover: { y: -3, transition: SPRING },
};

const medalV: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: SPRING },
  hover: { scale: 1.08, rotate: 0, transition: SPRING },
};

const lineV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.sm, ease: EASE } },
};

/** Stat card: container settles, then number, bar and rows follow. */
const statV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
  hover: { y: -4, transition: SPRING },
};

const barV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.xl, ease: EASE } },
};

const Achievements = () => {
  // Tap-latched hover states look broken on touch; skip the gesture there.
  const coarse = useCoarsePointer();

  return (
    <section id="achievements" className="py-24 scroll-mt-20">
      <SectionHeading number="04" title="Achievements" />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Awards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {awards.map((a) => (
            <motion.div
              key={a.title}
              variants={awardV}
              initial="hidden"
              whileInView="show"
              whileHover={coarse ? undefined : 'hover'}
              viewport={viewportOnce}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors duration-300 hover:border-cyan-400/30"
            >
              <motion.div
                variants={medalV}
                className={`shrink-0 rounded-full bg-slate-800 p-3 ring-1 ${a.ring} ${a.color}`}
              >
                <a.icon size={22} />
              </motion.div>
              <div>
                <motion.div
                  variants={lineV}
                  className="flex flex-wrap items-center gap-2"
                >
                  <h4 className="font-display text-lg font-bold text-slate-100">
                    {a.title}
                  </h4>
                  <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-mono text-[11px] text-cyan-400">
                    {a.tag}
                  </span>
                </motion.div>
                <motion.p
                  variants={lineV}
                  className="mt-1.5 text-sm leading-relaxed text-slate-400"
                >
                  {a.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitive programming */}
        <div className="grid gap-5 sm:grid-cols-2">
          {cp.map((c) => (
            <motion.a
              key={c.platform}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={statV}
              initial="hidden"
              whileInView="show"
              whileHover={coarse ? undefined : 'hover'}
              viewport={viewportOnce}
              className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors duration-300 hover:border-cyan-400/40"
            >
              <motion.div
                variants={lineV}
                className="mb-4 flex items-center justify-between"
              >
                <span className="font-mono text-sm text-slate-300">
                  {c.platform}
                </span>
                <ExternalLink
                  size={15}
                  className="text-slate-600 transition-all duration-300 group-hover:text-cyan-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.div>

              <motion.div variants={lineV} className="flex items-baseline gap-2">
                {/* Counter has its own in-view trigger, so it still fires once. */}
                <Counter
                  to={c.rating}
                  className={`font-display text-4xl font-bold ${c.accent}`}
                />
                <span className="font-mono text-xs text-slate-500">rating</span>
              </motion.div>

              <div className="my-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  variants={barV}
                  style={{ width: `${c.pct}%` }}
                  className={`h-full origin-left rounded-full bg-gradient-to-r ${c.barColor}`}
                />
              </div>

              <dl className="mt-auto space-y-1.5">
                {c.lines.map(([label, value]) => (
                  <motion.div
                    key={label}
                    variants={lineV}
                    className="flex items-center justify-between text-xs"
                  >
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="font-mono text-slate-300">{value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
