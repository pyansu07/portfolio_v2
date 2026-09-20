import { motion } from 'framer-motion';
import { links } from '../data/links';
import RevealText from './RevealText';
import Squiggle from './Squiggle';
import { staggerContainer, staggerItem, viewportOnce } from '../lib/motion';

const Contact = () => (
  <section id="contact" className="scroll-mt-24 py-16 xl:max-w-3xl">
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <RevealText
        as="h2"
        trigger="inherit"
        text="Get in touch"
        className="text-[2.2rem] font-extrabold tracking-tight text-body sm:text-[2.6rem]"
      />

      <motion.p
        variants={staggerItem}
        className="mt-4 text-lg leading-relaxed text-muted"
      >
        Do you have an exciting project? Let&apos;s talk!
      </motion.p>

      <Squiggle className="mt-5" />

      <motion.p
        variants={staggerItem}
        className="mt-10 text-[15px] leading-[2] text-muted sm:text-base"
      >
        You can reach me out anytime at{' '}
        <a href={`mailto:${links.email}`} className="link-accent">
          {links.email}
        </a>
        <br />
        As a backup option, you can{' '}
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
        >
          DM me on LinkedIn
        </a>
      </motion.p>

      <motion.p
        variants={staggerItem}
        className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base"
      >
        I&apos;m open to full-time SWE roles and interesting backend challenges.
        I usually respond right away on business days.
      </motion.p>
    </motion.div>
  </section>
);

export default Contact;
