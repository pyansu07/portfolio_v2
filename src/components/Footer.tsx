import { motion } from 'framer-motion';
import { Heart, Github, GitBranch } from 'lucide-react';
import { links } from '../data/links';
import { DUR, EASE, viewportOnce } from '../lib/motion';

const Footer = () => (
  <footer className="mt-10 border-t border-line">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: DUR.lg, ease: EASE }}
      className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-7 text-[13px] text-muted sm:flex-row md:px-10"
    >
      <p className="flex items-center gap-1.5">
        © {new Date().getFullYear()} Built with
        <Heart size={13} className="fill-red-500 text-red-500" />
        by Pyansu Nahak
      </p>

      <div className="flex items-center gap-6">
        <a href="#skills" className="link">
          Tech Stack
        </a>
        <a href="#projects" className="link">
          Projects
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition-colors hover:text-accent"
        >
          <Github size={15} />
        </a>
        <a
          href={`${links.github}/portfolio_v2`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Source of this site"
          className="transition-colors hover:text-accent"
        >
          <GitBranch size={15} />
        </a>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
