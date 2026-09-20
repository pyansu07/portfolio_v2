import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { links } from '../data/links';
import Counter from './Counter';
import Squiggle from './Squiggle';
import {
  SPRING_SOFT,
  maskChild,
  staggerContainer,
  staggerItem,
} from '../lib/motion';

const stats = [
  { to: 92, suffix: '%', label: 'throughput gain' },
  { to: 90, suffix: 'K+', label: 'samples harvested' },
  { to: 132, label: 'automated tests' },
  { to: 6, suffix: '+', label: 'shipped projects' },
  { to: 165, prefix: 'AIR ', label: 'Amazon ML Challenge' },
];

const socials = [
  { icon: Github, href: links.github, label: 'GitHub' },
  { icon: Linkedin, href: links.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: links.leetcode, label: 'LeetCode' },
];

const maskWord =
  'mr-[0.25em] inline-block overflow-hidden pb-[0.16em] align-bottom -mb-[0.16em]';

const Hero = () => (
  <section id="home" className="pb-20 pt-36 sm:pt-44">
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="hidden"
      animate="show"
      // Two columns only from xl up. At lg the shell isn't yet wide enough to
      // split without making column 1 narrower than the mobile measure, which
      // would wrap the intro lines worse than a single column does.
      className="xl:grid xl:grid-cols-[1fr_340px] xl:gap-x-16"
    >
      {/* Column 1, row 1 — the headline block */}
      <div className="xl:col-start-1 xl:row-start-1">
        {/* Greeting — masked word reveal, name in the accent colour. */}
        <h1 className="text-[2.6rem] font-extrabold leading-[1.1] tracking-tight text-body sm:text-[3.4rem]">
          {['Hey,', "I'm"].map((word) => (
            <span key={word} className={maskWord}>
              <motion.span variants={maskChild} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
          {['Pyansu', 'Nahak!'].map((word) => (
            <span key={word} className={maskWord}>
              <motion.span
                variants={maskChild}
                className="inline-block text-accent"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Three standalone lines, as in the reference. */}
        <motion.p
          variants={staggerItem}
          className="mt-7 text-lg leading-[1.85] text-muted sm:text-xl"
        >
          A Full-Stack &amp; Systems Engineer based in Delhi, India.
          <br />
          I specialize in event-driven microservices and data-intensive
          pipelines.
          <br />
          Currently, I&apos;m building two-sided onboarding systems at{' '}
          <span className="font-semibold text-body">Wobbi Logix</span>.
        </motion.p>

        <Squiggle className="mt-7" />
      </div>

      {/* Column 2 — stats rail on desktop, plain stacked grid on mobile */}
      <motion.dl
        variants={staggerContainer(0.07, 0.15)}
        className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:mt-2 xl:grid-cols-1 xl:gap-y-7 xl:border-l xl:border-line xl:pl-12"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={staggerItem}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <Counter
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block text-2xl font-extrabold tracking-tight text-accent sm:text-[1.6rem]"
              />
              <span className="mt-1 block text-[13px] leading-snug text-muted">
                {s.label}
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Column 1, row 2 — links */}
      <div className="xl:col-start-1 xl:row-start-2">
        <motion.h2
          variants={staggerItem}
          className="mt-14 text-lg font-bold tracking-tight text-body"
        >
          Find me on
        </motion.h2>
        <motion.div
          variants={staggerContainer(0.05, 0.05)}
          className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              variants={staggerItem}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SOFT}
              className="group inline-flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-body sm:text-base"
            >
              <s.icon
                size={19}
                className="transition-colors group-hover:text-accent"
              />
              {s.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.h2
          variants={staggerItem}
          className="mt-12 text-lg font-bold tracking-tight text-body"
        >
          Contact
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base"
        >
          You can reach me out anytime at{' '}
          <a href={`mailto:${links.email}`} className="link-accent">
            <Mail size={15} className="mr-1 inline-block align-[-2px]" />
            {links.email}
          </a>
        </motion.p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
