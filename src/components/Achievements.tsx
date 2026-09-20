import { motion, Variants } from 'framer-motion';
import { Trophy, Medal, ExternalLink } from 'lucide-react';
import SectionHeading, { SubHeading } from './SectionHeading';
import Counter from './Counter';
import { links } from '../data/links';
import { DUR, EASE, SPRING, viewportOnce } from '../lib/motion';
import { useCoarsePointer } from '../lib/hooks';

const awards = [
  {
    icon: Trophy,
    title: 'Amazon ML Challenge 2024',
    desc: 'AIR 165 out of 18,720+ teams for a multi-modal ResNet-50 + BERT pipeline.',
    tag: 'AIR 165',
  },
  {
    icon: Medal,
    title: 'Imagen AI Hackathon',
    desc: 'Finalist in the AI hackathon organized by IIT Delhi.',
    tag: 'Finalist',
  },
];

const cp = [
  {
    platform: 'LeetCode',
    href: links.leetcode,
    rating: 1810,
    pct: 93,
    lines: [
      ['Percentile', 'Top 7% globally'],
      ['Biweekly Contest 191', '#970 / 39,596'],
    ],
  },
  {
    platform: 'Codeforces',
    href: links.codeforces,
    rating: 1390,
    pct: 62,
    lines: [
      ['Rank', 'Specialist track'],
      ['Global Round 27', '#2,179 / 22,518'],
    ],
  },
];

const cardV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.md,
      ease: EASE,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  hover: { y: -4, transition: SPRING },
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

const barV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.xl, ease: EASE } },
};

const Achievements = () => {
  // Tap-latched hover states look broken on touch; skip the gesture there.
  const coarse = useCoarsePointer();

  return (
    <section id="achievements" className="scroll-mt-24 py-16">
      <SectionHeading
        title="Achievements"
        intro="Competition results and competitive-programming standings."
      />

      <div className="space-y-4 xl:max-w-3xl">
        {awards.map((a) => (
          <motion.div
            key={a.title}
            variants={cardV}
            initial="hidden"
            whileInView="show"
            whileHover={coarse ? undefined : 'hover'}
            viewport={viewportOnce}
            className="flex items-start gap-4 rounded-xl bg-surface p-6 ring-1 ring-line/70 transition-colors duration-300 hover:ring-accent/40"
          >
            <motion.div variants={medalV} className="shrink-0 text-accent">
              <a.icon size={22} />
            </motion.div>
            <div>
              <motion.div
                variants={lineV}
                className="flex flex-wrap items-center gap-x-2.5 gap-y-1"
              >
                <h4 className="text-[15px] font-bold text-body">{a.title}</h4>
                <span className="font-mono text-[11px] font-semibold text-accent">
                  {a.tag}
                </span>
              </motion.div>
              <motion.p
                variants={lineV}
                className="mt-1.5 text-[14px] leading-relaxed text-muted"
              >
                {a.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 xl:max-w-3xl">
        <SubHeading title="Competitive Programming" />

        <div className="grid gap-4 sm:grid-cols-2">
          {cp.map((c) => (
            <motion.a
              key={c.platform}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardV}
              initial="hidden"
              whileInView="show"
              whileHover={coarse ? undefined : 'hover'}
              viewport={viewportOnce}
              className="group flex flex-col rounded-xl bg-surface p-6 ring-1 ring-line/70 transition-colors duration-300 hover:ring-accent/40"
            >
              <motion.div
                variants={lineV}
                className="mb-3 flex items-center justify-between"
              >
                <span className="text-[14px] font-semibold text-body">
                  {c.platform}
                </span>
                <ExternalLink
                  size={14}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </motion.div>

              <motion.div variants={lineV} className="flex items-baseline gap-2">
                {/* Counter has its own in-view trigger, so it still fires once. */}
                <Counter
                  to={c.rating}
                  className="text-[2rem] font-extrabold tracking-tight text-accent"
                />
                <span className="text-[12px] text-muted">rating</span>
              </motion.div>

              <div className="my-4 h-1 w-full overflow-hidden rounded-full bg-line">
                <motion.div
                  variants={barV}
                  style={{ width: `${c.pct}%` }}
                  className="h-full origin-left rounded-full bg-accent"
                />
              </div>

              <dl className="mt-auto space-y-1.5">
                {c.lines.map(([label, value]) => (
                  <motion.div
                    key={label}
                    variants={lineV}
                    className="flex items-center justify-between text-[12.5px]"
                  >
                    <dt className="text-muted/80">{label}</dt>
                    <dd className="font-mono text-body/90">{value}</dd>
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
