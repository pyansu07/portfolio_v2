import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { links } from '../data/links';
import {
  DUR,
  EASE,
  SPRING_SOFT,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '../lib/motion';

const socials = [
  { icon: Github, href: links.github, label: 'GitHub' },
  { icon: Linkedin, href: links.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: links.leetcode, label: 'LeetCode' },
  { icon: Mail, href: `mailto:${links.email}`, label: 'Email' },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 scroll-mt-20 text-center">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.p
          variants={staggerItem}
          className="font-mono text-sm text-cyan-400"
        >
          05. What&apos;s Next?
        </motion.p>

        {/* Deliberately a plain fade rather than the masked reveal: welding
            "fast." onto the previous word makes one unbreakable box that
            overflows a 320px viewport at this type size. */}
        <motion.h2
          variants={staggerItem}
          className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-slate-100 md:text-5xl"
        >
          Let&apos;s build something{' '}
          <span className="text-gradient animate-gradient-x">fast</span>.
        </motion.h2>

        <motion.p
          variants={staggerItem}
          className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-slate-400"
        >
          I&apos;m open to full-time SWE roles and interesting backend
          challenges. Whether you have a question or just want to say hi, my
          inbox is always open.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href={`mailto:${links.email}`}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_SOFT}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-3.5 font-mono text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)]"
          >
            <Mail size={16} /> Say Hello
          </motion.a>
        </motion.div>
      </motion.div>

      <footer className="mt-24 border-t border-slate-800/60 pt-8">
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                variants={staggerItem}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING_SOFT}
                className="rounded-lg p-2.5 text-slate-500 transition-colors hover:bg-slate-800/50 hover:text-cyan-400"
              >
                <s.icon size={20} />
              </motion.a>
            ))}
          </div>
          <motion.p
            variants={staggerItem}
            transition={{ duration: DUR.md, ease: EASE }}
            className="font-mono text-xs text-slate-600"
          >
            Designed &amp; built by Pyansu Nahak · React + Tailwind
          </motion.p>
        </motion.div>
      </footer>
    </section>
  );
};

export default Contact;
