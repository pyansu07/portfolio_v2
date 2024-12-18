import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const text = "Hi, I'm Pyansu Nahak";
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px] bg-[linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px]" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full Stack Developer specializing in building exceptional digital experiences
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="https://github.com/pyansu07"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
            >
              <Github className="w-7 h-7 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/pyansu-nahak/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://x.com/algo_rizz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
            >
              <Twitter className="w-6 h-6 text-white" />
            </a>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className="group relative px-8 py-4 text-lg text-white rounded-lg transition-all duration-300 ease-out hover:scale-105 font-medium overflow-hidden"
              onClick={() => {}}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Resume</span>
            </button>
            <button
              className="group relative px-8 py-4 text-lg text-white rounded-lg transition-all duration-300 ease-out hover:scale-105 font-medium overflow-hidden backdrop-blur-sm"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800/50 via-gray-700/50 to-gray-600/50"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700/50 via-gray-600/50 to-gray-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Contact Me</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
