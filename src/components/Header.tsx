import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Contrast } from 'lucide-react';
import { links } from '../data/links';
import { useTheme } from '../lib/theme';
import { DUR, EASE, SPRING_SOFT, staggerContainer, staggerItem } from '../lib/motion';

const navLinks = [
  { name: 'Journey', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Awards', id: 'achievements' },
  { name: 'Contact', id: 'contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const { theme, toggle } = useTheme();

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.lg, ease: EASE }}
      className="fixed top-0 z-50 w-full bg-ink/85 backdrop-blur-md"
    >
      <motion.nav
        variants={staggerContainer(0.05, 0.15)}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10"
      >
        {/* Wordmark: two accent slashes + initials */}
        <motion.button
          variants={staggerItem}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={SPRING_SOFT}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex items-baseline gap-1.5 text-2xl font-extrabold tracking-tight text-body"
        >
          <span className="text-accent" aria-hidden>
            //
          </span>
          PN
        </motion.button>

        <div className="flex items-center gap-7">
          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <motion.li key={link.id} variants={staggerItem}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active === link.id
                      ? 'text-accent'
                      : 'text-muted hover:text-body'
                  }`}
                >
                  {link.name}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Icon cluster */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 text-muted"
          >
            <motion.a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING_SOFT}
              className="transition-colors hover:text-body"
            >
              <Github size={19} />
            </motion.a>
            <motion.a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING_SOFT}
              className="transition-colors hover:text-body"
            >
              <Linkedin size={19} />
            </motion.a>
            <motion.button
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={SPRING_SOFT}
              className="transition-colors hover:text-body"
            >
              <Contrast size={19} />
            </motion.button>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={SPRING_SOFT}
              className="text-accent md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: DUR.xs, ease: EASE }}
                  className="block"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -12 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: DUR.xs,
                  ease: EASE,
                  staggerChildren: 0.045,
                  delayChildren: 0.06,
                },
              },
              exit: { opacity: 0, y: -12, transition: { duration: 0.16 } },
            }}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex w-full flex-col gap-4 border-t border-line bg-ink px-6 pb-7 pt-5 md:hidden"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: DUR.sm, ease: EASE },
                  },
                }}
                whileTap={{ scale: 0.97, x: 2 }}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
