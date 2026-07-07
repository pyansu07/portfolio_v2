import { motion } from 'framer-motion';
import { Trophy, Medal, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Counter from './Counter';
import { links } from '../data/links';

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

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 scroll-mt-20">
      <SectionHeading number="04" title="Achievements" />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Awards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {awards.map((a) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-cyan-400/30"
            >
              <div
                className={`shrink-0 rounded-full bg-slate-800 p-3 ring-1 ${a.ring} ${a.color}`}
              >
                <a.icon size={22} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-lg font-bold text-slate-100">
                    {a.title}
                  </h4>
                  <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-mono text-[11px] text-cyan-400">
                    {a.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {a.desc}
                </p>
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-cyan-400/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-sm text-slate-300">
                  {c.platform}
                </span>
                <ExternalLink
                  size={15}
                  className="text-slate-600 transition-colors group-hover:text-cyan-400"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <Counter
                  to={c.rating}
                  className={`font-display text-4xl font-bold ${c.accent}`}
                />
                <span className="font-mono text-xs text-slate-500">rating</span>
              </div>

              <div className="my-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${c.barColor}`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>

              <dl className="mt-auto space-y-1.5">
                {c.lines.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between text-xs"
                  >
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="font-mono text-slate-300">{value}</dd>
                  </div>
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
