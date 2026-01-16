import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Journey", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Awards", id: "achievements" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-slate-800/50' : 'bg-transparent py-6'}`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-cyan-400 font-mono font-bold text-2xl tracking-tighter hover:text-cyan-300 transition-colors">
          PN<span className="text-slate-100">.</span>
        </a>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-mono text-slate-400">
          {navLinks.map((link, i) => (
            <li key={i}>
              <button 
                onClick={() => scrollToSection(link.id)} 
                className="hover:text-cyan-400 transition-colors"
              >
                <span className="text-cyan-400 mr-1">0{i + 1}.</span> {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* <a 
            href="/resume.pdf" 
            target="_blank"
            className="hidden md:block px-4 py-2 text-sm font-mono text-cyan-400 border border-cyan-400 rounded hover:bg-cyan-400/10 transition-colors"
        >
            Resume
        </a> */}
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
           {navLinks.map((link, i) => (
            <button 
              key={i}
              onClick={() => scrollToSection(link.id)} 
              className="text-left text-slate-300 hover:text-cyan-400 font-mono"
            >
              <span className="text-cyan-400 mr-2">0{i + 1}.</span> {link.name}
            </button>
          ))}
          {/* <a href="/resume.pdf" className="text-cyan-400 font-mono border border-cyan-400 rounded px-4 py-2 text-center mt-2">Resume</a> */}
        </div>
      )}
    </header>
  );
};

export default Header;