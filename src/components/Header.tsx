import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass py-3.5 border-b border-slate-800/60 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-2xl tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
        >
          <span className="text-gradient">PN</span>
          <span className="text-cyan-400">.</span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1 text-sm font-mono">
          {navLinks.map((link, i) => (
            <li key={link.id}>
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
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cyan-400 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
      />

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full glass border-b border-slate-800 p-6 flex flex-col gap-3 shadow-2xl"
          >
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-slate-300 hover:text-cyan-400 font-mono py-1.5 transition-colors"
              >
                <span className="text-cyan-400 mr-2">0{i + 1}.</span>
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
