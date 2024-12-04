import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const header = document.querySelector('header');
    const headerOffset = header?.offsetHeight || 0;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-4">
      <nav className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              P N
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-6 py-2 text-gray-300 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 mt-2">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-1 text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;