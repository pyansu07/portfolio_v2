import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  DUR,
  EASE,
  SPRING_SNAPPY,
  SPRING_SOFT,
  staggerContainer,
  staggerItem,
} from '../lib/motion';

const navLinks = [
  { name: 'Journey', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Awards', id: 'achievements' },
  { name: 'Contact', id: 'contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.lg, ease: EASE }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass py-3.5 border-b border-slate-800/60 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <motion.nav
        variants={staggerContainer(0.06, 0.15)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <motion.button
          variants={staggerItem}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={SPRING_SOFT}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-2xl tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
        >
          <span className="text-gradient">PN</span>
          <span className="text-cyan-400">.</span>
        </motion.button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1 text-sm font-mono">
          {navLinks.map((link, i) => (
            <motion.li key={link.id} variants={staggerItem}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-2 rounded-md transition-colors ${
                  active === link.id
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <span className="text-cyan-500/80 mr-1">0{i + 1}.</span>
                {link.name}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-md bg-cyan-400/10 ring-1 ring-cyan-400/20"
                    transition={SPRING_SNAPPY}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <motion.button
          variants={staggerItem}
          whileTap={{ scale: 0.88 }}
          transition={SPRING_SOFT}
          className="md:hidden text-cyan-400 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Cross-fade + quarter turn between the two glyphs. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: DUR.xs, ease: EASE }}
              className="block"
            >
              {menuOpen ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
      />

      {/* Mobile dropdown — container opens, then the items cascade in. */}
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
            className="md:hidden absolute top-full left-0 w-full glass border-b border-slate-800 p-6 flex flex-col gap-3 shadow-2xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0, transition: { duration: DUR.sm, ease: EASE } },
                }}
                whileTap={{ scale: 0.97, x: 2 }}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-slate-300 hover:text-cyan-400 font-mono py-1.5 transition-colors"
              >
                <span className="text-cyan-400 mr-2">0{i + 1}.</span>
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
